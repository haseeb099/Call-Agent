<p align="center">

# Ringwise

### Your AI front desk that never misses a call

Ringwise answers the phone, books appointments, and hands the urgent calls to a person. Run it for your own business, or host it and sell it to clients under your name.

</p>

## What you get

- Inbound voice receptionist on OpenAI realtime audio, through Twilio or Telnyx SIP
- Appointment booking with Google Calendar, Cal.com, or Calendly
- Dashboard for calls, texts, contacts, recordings, and transcripts
- Website widget for chat and browser calls
- MCP server so an assistant can read calls and book appointments
- Docker Compose deployment, with mock providers for local development

## Set your domain

`ringwise.example` is a placeholder, not a domain this product owns. Before you expose a deployment, set:

- `APP_BASE_URL` and `NEXT_PUBLIC_APP_URL` to your real origin, such as `https://app.example.com`
- `MARKETING_HOSTS` to the hostnames that should serve the marketing site
- `NEXT_PUBLIC_LANDING_SITE_URL`, `NEXT_PUBLIC_TERMS_URL`, `NEXT_PUBLIC_PRIVACY_URL`, `NEXT_PUBLIC_DOCS_SITE_URL`, and `NEXT_PUBLIC_CONTACT_EMAIL`
- The MCP remote URL in `server.json` (`https://app.ringwise.example/api/mcp`) to `https://<your-domain>/api/mcp`

Until those are set, links fall back to `https://ringwise.example`. See [DEPLOY.md](./DEPLOY.md) for the accounts you still have to create.

## Run it locally

Requires Node.js 26 or newer and pnpm 10 or newer.

```bash
cp .env.example .env
pnpm install
docker compose up -d postgres redis
pnpm db:migrate
pnpm dev
```

The admin listens on port 13000. Recordings and uploads stay in `.ringwise/storage`. Leave the live provider keys empty to use the mock providers.

```bash
pnpm typecheck
pnpm build
pnpm test
```

## Deploy

[DEPLOY.md](./DEPLOY.md) covers a VPS with Docker Compose, Railway, and Render. Polar billing and PostHog analytics stay off until you add your own accounts. There is no hosted Ringwise cloud in this repository.

## MCP server

| Setting | Value |
| --- | --- |
| Server URL | `https://<your-domain>/api/mcp` |
| Transport | Streamable HTTP |
| Authentication | Sign in with Ringwise (OAuth), or `Authorization: Bearer <API key>` |
| Registry name | `io.github.haseeb099/ringwise` |

The tools live in `apps/admin/src/lib/mcp/`.

## Upstream

Ringwise is based on [LobbyStack](https://github.com/lobbystack/lobbystack), an MIT-licensed open-source AI receptionist.

Copyright (c) 2026 LobbyStack contributors

The original copyright and permission notice are in [LICENSE](./LICENSE). Modifications in this repository are Copyright (c) 2026 Ringwise (haseeb099). See [NOTICE](./NOTICE).

## License

MIT. See [LICENSE](./LICENSE).
