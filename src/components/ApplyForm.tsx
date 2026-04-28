import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const applicationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(3, "Email is required")
    .max(320, "Email is too long")
    .email("Please enter a valid email address"),
  role: z.string().trim().min(1, "Role is required").max(200, "Role is too long"),
  track: z.enum(["officer", "director"], {
    required_error: "Please select a track",
  }),
});

type FormErrors = Partial<Record<keyof z.infer<typeof applicationSchema>, string>>;

export const ApplyForm = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    track: "" as "" | "officer" | "director",
  });

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = applicationSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("cohort_applications").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      role: parsed.data.role,
      track: parsed.data.track,
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
      return;
    }

    setSubmitted(true);
    toast({
      title: "Application received",
      description: "Thank you. We will be in touch shortly.",
    });
    setForm({ name: "", email: "", role: "", track: "" });
  };

  if (submitted) {
    return (
      <div className="bg-white/5 backdrop-blur border border-white/15 rounded-lg p-10 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-red/20 text-brand-red mb-5">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-2xl text-white mb-3">Application received</h3>
        <p className="text-white/70 max-w-md mx-auto mb-6">
          Thank you for applying to the next NIS2 cohort. Our team will review your
          submission and contact you with the next steps.
        </p>
        <Button variant="heroOutline" onClick={() => setSubmitted(false)}>
          Submit another application
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white/5 backdrop-blur border border-white/15 rounded-lg p-6 md:p-10 text-left space-y-6"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">Full name</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Jane Doe"
            maxLength={200}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-brand-red"
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-sm text-brand-red">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="jane@company.com"
            maxLength={320}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-brand-red"
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-sm text-brand-red">{errors.email}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="role" className="text-white">Role / job title</Label>
        <Input
          id="role"
          value={form.role}
          onChange={(e) => update("role", e.target.value)}
          placeholder="e.g. CISO, IT Manager, Compliance Officer"
          maxLength={200}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-brand-red"
          aria-invalid={!!errors.role}
        />
        {errors.role && <p className="text-sm text-brand-red">{errors.role}</p>}
      </div>

      <div className="space-y-3">
        <Label className="text-white">Selected track</Label>
        <RadioGroup
          value={form.track}
          onValueChange={(value) => update("track", value)}
          className="grid sm:grid-cols-2 gap-3"
        >
          <label
            htmlFor="track-officer"
            className={`flex items-start gap-3 p-4 rounded-md border-2 cursor-pointer transition-smooth ${
              form.track === "officer"
                ? "border-brand-red bg-brand-red/10"
                : "border-white/15 bg-white/5 hover:border-white/30"
            }`}
          >
            <RadioGroupItem
              value="officer"
              id="track-officer"
              className="mt-1 border-white/40 text-brand-red"
            />
            <div>
              <p className="font-semibold text-white">NIS2 Officer</p>
              <p className="text-xs text-white/60 mt-0.5">4 days · ≈ 18–20 hours</p>
            </div>
          </label>
          <label
            htmlFor="track-director"
            className={`flex items-start gap-3 p-4 rounded-md border-2 cursor-pointer transition-smooth ${
              form.track === "director"
                ? "border-brand-red bg-brand-red/10"
                : "border-white/15 bg-white/5 hover:border-white/30"
            }`}
          >
            <RadioGroupItem
              value="director"
              id="track-director"
              className="mt-1 border-white/40 text-brand-red"
            />
            <div>
              <p className="font-semibold text-white">NIS2 Director</p>
              <p className="text-xs text-white/60 mt-0.5">1 day · ≈ 6–8 hours</p>
            </div>
          </label>
        </RadioGroup>
        {errors.track && <p className="text-sm text-brand-red">{errors.track}</p>}
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="hero"
          size="xl"
          disabled={submitting}
          className="w-full sm:w-auto"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              Submit application
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
        <p className="text-xs text-white/50 mt-4">
          By submitting, you agree to be contacted about the NIS2 Certification Preparation Program.
        </p>
      </div>
    </form>
  );
};

export default ApplyForm;