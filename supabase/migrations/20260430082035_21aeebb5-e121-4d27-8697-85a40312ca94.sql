-- Explicitly restrict all read/update/delete access on cohort_applications.
-- INSERT remains allowed via existing policy. No SELECT/UPDATE/DELETE policies
-- means no rows are returned/affected for anon or authenticated roles.

CREATE POLICY "No public reads of applications"
ON public.cohort_applications
FOR SELECT
TO anon, authenticated
USING (false);

CREATE POLICY "No public updates of applications"
ON public.cohort_applications
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "No public deletes of applications"
ON public.cohort_applications
FOR DELETE
TO anon, authenticated
USING (false);