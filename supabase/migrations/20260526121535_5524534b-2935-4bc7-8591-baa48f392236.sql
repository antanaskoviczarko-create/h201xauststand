
ALTER TABLE public.cohort_applications
  ADD COLUMN IF NOT EXISTS company text,
  ADD COLUMN IF NOT EXISTS eligibility_confirmed boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS heard_from text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS referral_name text,
  ADD COLUMN IF NOT EXISTS heard_from_other text;

-- Update RLS insert policy to also validate company + eligibility
DROP POLICY IF EXISTS "Anyone can submit an application" ON public.cohort_applications;

CREATE POLICY "Anyone can submit an application"
ON public.cohort_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(name)) BETWEEN 1 AND 200
  AND length(trim(email)) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(trim(role)) BETWEEN 1 AND 200
  AND (company IS NULL OR length(trim(company)) <= 200)
  AND eligibility_confirmed = true
);
