CREATE OR REPLACE FUNCTION app.current_actor_type()
RETURNS text
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = pg_catalog
AS $$
  SELECT CASE COALESCE(NULLIF(current_setting('app.actor_type', true), ''), 'none')
    WHEN 'operator' THEN CASE WHEN current_user = 'ringwise_app' THEN 'operator' ELSE 'none' END
    WHEN 'system' THEN CASE WHEN current_user = 'ringwise_app' THEN 'system' ELSE 'none' END
    WHEN 'worker' THEN CASE WHEN current_user = 'ringwise_worker' THEN 'worker' ELSE 'none' END
    WHEN 'dispatcher' THEN CASE WHEN current_user = 'ringwise_dispatcher' THEN 'dispatcher' ELSE 'none' END
    ELSE 'none'
  END
$$;

REVOKE ALL ON FUNCTION app.current_actor_type() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION app.current_actor_type() TO ringwise_app, ringwise_worker, ringwise_dispatcher, ringwise_readonly;

CREATE OR REPLACE FUNCTION app.can_access_business(target_business_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, app, pg_catalog
AS $$
  SELECT target_business_id = app.current_business_id()
    AND app.has_business_membership(target_business_id)
$$;

REVOKE ALL ON FUNCTION app.can_access_business(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION app.can_access_business(uuid) TO ringwise_app, ringwise_worker, ringwise_dispatcher, ringwise_readonly;

DROP POLICY IF EXISTS businesses_tenant_isolation ON public.businesses;
CREATE POLICY businesses_tenant_isolation ON public.businesses
  TO ringwise_app, ringwise_worker
  USING (app.can_access_business(id) OR (app.current_actor_type() IN ('system', 'worker') AND id = app.current_business_id()))
  WITH CHECK ((app.current_actor_type() IN ('system', 'worker') AND id = app.current_business_id()) OR app.can_access_business(id));
