ALTER ROLE ringwise_migrator SET search_path = public, app, pg_catalog;
ALTER ROLE ringwise_auth SET search_path = public, app, pg_catalog;
ALTER ROLE ringwise_app SET search_path = public, app, pg_catalog;
ALTER ROLE ringwise_worker SET search_path = public, app, pg_catalog;
ALTER ROLE ringwise_dispatcher SET search_path = public, app, pg_catalog;
ALTER ROLE ringwise_readonly SET search_path = public, app, pg_catalog;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.outbox_messages TO ringwise_dispatcher;
