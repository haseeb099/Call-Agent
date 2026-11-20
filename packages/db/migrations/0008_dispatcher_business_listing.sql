DROP POLICY IF EXISTS businesses_dispatcher_select ON public.businesses;
CREATE POLICY businesses_dispatcher_select ON public.businesses
  FOR SELECT TO ringwise_dispatcher
  USING (app.current_actor_type() = 'dispatcher');
GRANT SELECT ON public.businesses TO ringwise_dispatcher;
GRANT SELECT (id, active_business_id) ON public.users TO ringwise_app;
