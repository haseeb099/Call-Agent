# Deploy Ringwise

Ringwise runs as three processes plus PostgreSQL (with pgvector) and Redis:

| Piece | Role |
| --- | --- |
| `admin` | Next.js dashboard, marketing site, HTTP API, MCP server |
| `worker` | Jobs, outbound work, and live phone calls |
| `migrator` | Database migrations, then it exits |
| Postgres | Source of truth |
| Redis | BullMQ and short-lived coordination |

`docker compose` also starts MinIO (S3-compatible storage), Caddy (TLS), and Mailpit (local SMTP). Production can use your own S3 bucket and your own SMTP server instead.

`DEPLOYMENT_MODE` defaults to `self_hosted_standard`. Leave the Polar product ids empty and nobody is billed through a hosted store. Fill those ids only after you create products in **your** Polar organization. PostHog stays off until `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` is set. Do not reuse another product's analytics project.

## What you still have to supply

Create these accounts yourself. This repository does not include keys for them.

| Need | Where it goes | What it is for |
| --- | --- | --- |
| A domain and DNS | `APP_BASE_URL`, `NEXT_PUBLIC_APP_URL`, `MARKETING_HOSTS`, `PASSKEY_RP_ID` | Public origin. `ringwise.example` is only a placeholder. |
| OpenAI | `OPENAI_API_KEY`, `OPENAI_WEBHOOK_SECRET`, `OPENAI_PROJECT_ID` | Voice and chat. Point the realtime webhook at `https://<your-domain>/api/webhooks/openai/live`. |
| Twilio **or** Telnyx | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_SIP_TRUNK_SID` or `TELNYX_API_KEY` and the voice profile ids | Phone numbers and SIP. See `docs/voice/runtime.md`. |
| SMTP | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `EMAIL_FROM` | Verification codes, password resets, invites. |
| Google Cloud OAuth | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google sign-in and Google Calendar. Redirect URI: `https://<your-domain>/api/calendar/google/callback`. |
| Secrets | `BETTER_AUTH_SECRET`, `ENCRYPTION_KEY`, `INTERNAL_SERVICE_SECRET`, database passwords | Generate long random values. `node scripts/generate-env.mjs` fills the internal ones. |
| Optional Polar | `POLAR_ACCESS_TOKEN` and the `POLAR_*_PRODUCT_ID` values | Only if you want to charge plans yourself. |
| Optional PostHog | `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`, `POSTHOG_PROJECT_ID`, `POSTHOG_SOURCEMAP_API_KEY` | Only if you want your own product analytics. |
| Optional Stripe Connect | `STRIPE_CONNECT_SECRET_KEY` | Only if partners bill their own clients through Stripe. |
| Optional S3 | `STORAGE_PROVIDER=s3` and `S3_*` | Recordings and uploads. Local disk is the default (`.ringwise/storage`). |

Also update `server.json` so the MCP remote URL is `https://<your-domain>/api/mcp`.

## Docker Compose on a VPS

1. Install Docker, Node.js 26, and pnpm 10 or newer.
2. Clone this repository and create the env file.

```bash
cp .env.example .env
node scripts/generate-env.mjs
```

3. Edit `.env`. Set at least:

- `APP_BASE_URL=https://app.example.com`
- `NEXT_PUBLIC_APP_URL` to the same origin
- `POSTGRES_PASSWORD` (generate-env replaces the placeholder)
- `OPENAI_API_KEY`
- Twilio or Telnyx credentials
- SMTP settings and `EMAIL_FROM`
- `NEXT_PUBLIC_LANDING_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`, and the terms and privacy URLs

4. Build and start.

```bash
docker compose --env-file .env up -d --build
```

The admin is published on `127.0.0.1:${ADMIN_PORT:-3000}`. Put Caddy or another proxy in front of it and set `APP_BASE_URL` to the public `https` origin. For Caddy's on-demand certificates, also set `COMPOSE_FILE=docker-compose.yml:docker-compose.tls.yml`, `HTTP_BIND_ADDRESS=0.0.0.0`, and `CADDY_ON_DEMAND_TLS=true`.

5. Open the admin URL, create the owner account, and finish onboarding. With `BRAND_APP_NAME` unset, the first owner can set the name clients see.

Health checks: `GET /api/health/live` on the admin.

## Railway

There is no one-click template for this product. Create a project with:

1. A PostgreSQL database with the pgvector extension. Put its URL in `DATABASE_URL`. The migrator, admin, and worker also need the role passwords from `.env.example` (`RINGWISE_APP_PASSWORD` and the rest) if you use the SQL role setup in `docker/postgres`.
2. Redis. Set `REDIS_URL`.
3. Three services built from this repo:
   - Migrator: `Dockerfile.migrator`. Run it before the admin serves traffic.
   - Admin: `Dockerfile.admin`. Set `PORT` as Railway provides it. Give the service every `NEXT_PUBLIC_*` variable at **build** time, because Next.js inlines them.
   - Worker: `Dockerfile.worker`.
4. A volume or an S3 bucket for `STORAGE_PROVIDER`.
5. The same provider keys listed above. Set `APP_BASE_URL` to the admin's public Railway domain, then replace it with your custom domain.

## Render

Use the same split as Railway:

- A Render PostgreSQL instance (enable pgvector) and a Render Key Value (Redis) instance
- A web service from `Dockerfile.admin`
- A background worker from `Dockerfile.worker`
- A one-off job or pre-deploy command from `Dockerfile.migrator`
- Environment variables from `.env.example`, with `APP_BASE_URL` set to the public `https` URL

`NEXT_PUBLIC_*` values must be present when the admin image is built.

## After it is up

- Confirm `https://<your-domain>/api/health/live` returns success.
- In the OpenAI dashboard, set the realtime webhook to `https://<your-domain>/api/webhooks/openai/live` and store the secret as `OPENAI_WEBHOOK_SECRET`.
- Point Twilio voice and SMS webhooks at the admin, or finish the Telnyx SIP connection described in `docs/voice/runtime.md`.
- Send a password reset to confirm SMTP.
- Connect Google Calendar with the OAuth client whose redirect URI matches `GOOGLE_REDIRECT_URI`.
- Replace every `ringwise.example` link before you send the product to a client.
