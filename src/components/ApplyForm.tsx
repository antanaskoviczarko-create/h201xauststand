import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const HEARD_OPTIONS = [
  "LinkedIn",
  "Instagram",
  "Referral (please specify the name of the person who referred you)",
  "A&S Adria",
  "Other (please specify)",
] as const;

const applicationSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").max(200, "Name is too long"),
    email: z
      .string()
      .trim()
      .min(3, "Email is required")
      .max(320, "Email is too long")
      .email("Please enter a valid email address"),
    role: z.string().trim().min(1, "Role is required").max(200, "Role is too long"),
    company: z.string().trim().min(1, "Company is required").max(200, "Company is too long"),
    eligibility: z.literal(true, {
      errorMap: () => ({ message: "You must confirm eligibility to apply" }),
    }),
    heardFrom: z.array(z.string()).min(1, "Please select at least one option"),
    referralName: z.string().trim().max(200).optional(),
    heardFromOther: z.string().trim().max(500).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.heardFrom.some((o) => o.startsWith("Referral")) && !data.referralName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["referralName"],
        message: "Please name the person who referred you",
      });
    }
    if (data.heardFrom.some((o) => o.startsWith("Other")) && !data.heardFromOther?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["heardFromOther"],
        message: "Please specify",
      });
    }
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
    company: "",
    eligibility: false,
    heardFrom: [] as string[],
    referralName: "",
    heardFromOther: "",
  });

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleHeard = (option: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      heardFrom: checked
        ? [...prev.heardFrom, option]
        : prev.heardFrom.filter((o) => o !== option),
    }));
    setErrors((prev) => ({ ...prev, heardFrom: undefined }));
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
      company: parsed.data.company,
      eligibility_confirmed: parsed.data.eligibility,
      heard_from: parsed.data.heardFrom,
      referral_name: parsed.data.heardFrom.some((o) => o.startsWith("Referral"))
        ? parsed.data.referralName ?? null
        : null,
      heard_from_other: parsed.data.heardFrom.some((o) => o.startsWith("Other"))
        ? parsed.data.heardFromOther ?? null
        : null,
      track: "officer",
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
    setForm({
      name: "",
      email: "",
      role: "",
      company: "",
      eligibility: false,
      heardFrom: [],
      referralName: "",
      heardFromOther: "",
    });
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

      <div className="space-y-2">
        <Label htmlFor="company" className="text-white">Company</Label>
        <Input
          id="company"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          placeholder="Company name"
          maxLength={200}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-brand-red"
          aria-invalid={!!errors.company}
        />
        {errors.company && <p className="text-sm text-brand-red">{errors.company}</p>}
      </div>

      <div className="space-y-3 rounded-md border border-white/15 bg-white/5 p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="eligibility"
            checked={form.eligibility}
            onCheckedChange={(c) =>
              setForm((prev) => ({ ...prev, eligibility: c === true }))
            }
            className="mt-1 border-white/40 data-[state=checked]:bg-brand-red data-[state=checked]:border-brand-red"
          />
          <Label htmlFor="eligibility" className="text-white/90 text-sm leading-relaxed font-normal cursor-pointer">
            I have two years of professional experience in the field of network and information
            security (legal, organizational, or technical), or relevant vocational training
            (e.g., technical college), or a university degree.
          </Label>
        </div>
        {errors.eligibility && <p className="text-sm text-brand-red">{errors.eligibility}</p>}
      </div>

      <div className="space-y-3">
        <Label className="text-white">How did you hear about this program?</Label>
        <div className="space-y-2">
          {HEARD_OPTIONS.map((option) => (
            <div key={option} className="space-y-2">
              <div className="flex items-center gap-3">
                <Checkbox
                  id={`heard-${option}`}
                  checked={form.heardFrom.includes(option)}
                  onCheckedChange={(c) => toggleHeard(option, c === true)}
                  className="border-white/40 data-[state=checked]:bg-brand-red data-[state=checked]:border-brand-red"
                />
                <Label
                  htmlFor={`heard-${option}`}
                  className="text-white/90 font-normal cursor-pointer"
                >
                  {option}
                </Label>
              </div>
              {option.startsWith("Referral") && form.heardFrom.includes(option) && (
                <div className="pl-7 space-y-1">
                  <Input
                    value={form.referralName}
                    onChange={(e) => update("referralName", e.target.value)}
                    placeholder="Name of the person who referred you"
                    maxLength={200}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-brand-red"
                    aria-invalid={!!errors.referralName}
                  />
                  {errors.referralName && (
                    <p className="text-sm text-brand-red">{errors.referralName}</p>
                  )}
                </div>
              )}
              {option.startsWith("Other") && form.heardFrom.includes(option) && (
                <div className="pl-7 space-y-1">
                  <Input
                    value={form.heardFromOther}
                    onChange={(e) => update("heardFromOther", e.target.value)}
                    placeholder="Please specify"
                    maxLength={500}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-brand-red"
                    aria-invalid={!!errors.heardFromOther}
                  />
                  {errors.heardFromOther && (
                    <p className="text-sm text-brand-red">{errors.heardFromOther}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {errors.heardFrom && <p className="text-sm text-brand-red">{errors.heardFrom}</p>}
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