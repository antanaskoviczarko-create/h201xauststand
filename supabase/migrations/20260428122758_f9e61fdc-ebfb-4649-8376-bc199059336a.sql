
CREATE TYPE public.nis2_track AS ENUM ('officer', 'director');

CREATE TABLE public.cohort_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  track public.nis2_track NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.cohort_applications ENABLE ROW LEVEL SECURITY;

-- Public can submit applications (anonymous users)
CREATE POLICY "Anyone can submit an application"
ON public.cohort_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(name)) BETWEEN 1 AND 200
  AND length(trim(email)) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(trim(role)) BETWEEN 1 AND 200
);

-- No SELECT/UPDATE/DELETE policies = nobody can read or modify from client
