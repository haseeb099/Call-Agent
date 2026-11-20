CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS vector;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'ringwise_migrator') THEN
    CREATE ROLE ringwise_migrator NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'ringwise_auth') THEN
    CREATE ROLE ringwise_auth NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'ringwise_app') THEN
    CREATE ROLE ringwise_app NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'ringwise_worker') THEN
    CREATE ROLE ringwise_worker NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'ringwise_dispatcher') THEN
    CREATE ROLE ringwise_dispatcher NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'ringwise_readonly') THEN
    CREATE ROLE ringwise_readonly NOLOGIN;
  END IF;
END
$$;

ALTER ROLE ringwise_app NOBYPASSRLS;
ALTER ROLE ringwise_worker NOBYPASSRLS;
ALTER ROLE ringwise_dispatcher NOBYPASSRLS;
ALTER ROLE ringwise_readonly NOBYPASSRLS;

GRANT USAGE ON SCHEMA public TO ringwise_auth, ringwise_app, ringwise_worker, ringwise_dispatcher, ringwise_readonly;
