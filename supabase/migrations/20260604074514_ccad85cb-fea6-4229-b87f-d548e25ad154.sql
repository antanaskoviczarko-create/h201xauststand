ALTER TABLE public.cohort_applications ADD COLUMN phone text;

DROP POLICY IF EXISTS "Anyone can submit an application" ON public.cohort_applications;
CREATE POLICY "Anyone can submit an application"
ON public.cohort_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(both from name)) >= 1 AND length(trim(both from name)) <= 200
  AND length(trim(both from email)) >= 3 AND length(trim(both from email)) <= 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(trim(both from role)) >= 1 AND length(trim(both from role)) <= 200
  AND (company IS NULL OR length(trim(both from company)) <= 200)
  AND (phone IS NULL OR length(trim(both from phone)) <= 50)
  AND eligibility_confirmed = true
);