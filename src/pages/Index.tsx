import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Users,
  Building2,
  Award,
  GraduationCap,
  Target,
  CheckCircle2,
  ArrowRight,
  ScrollText,
  Globe2,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import hub201Logo from "@/assets/hub201-logo.png";
import austrianStandardsLogo from "@/assets/austrian-standards-logo.svg";
import ApplyForm from "@/components/ApplyForm";

const AUSTRIAN_STANDARDS_URL =
  "https://www.austrian-standards.at/en/products-solutions/apply-standards/certification#anchor-zertifizierung-digitalisierung";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 bg-brand-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container flex items-center justify-between h-16">
          <img src={hub201Logo} alt="Hub201" className="h-8 w-auto brightness-0 invert" />
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
            <a href="#program" className="hover:text-white transition-smooth">Program</a>
            <a href="#tracks" className="hover:text-white transition-smooth">Tracks</a>
            <a href="#certification" className="hover:text-white transition-smooth">Certification</a>
            <a href="#audience" className="hover:text-white transition-smooth">Who it's for</a>
          </nav>
          <Button variant="hero" size="sm" asChild>
            <a href="#apply">Apply</a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-brand-black"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(0 0% 4% / 0.85) 0%, hsl(0 0% 8% / 0.75) 50%, hsl(355 70% 18% / 0.7) 100%), url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-radial-red pointer-events-none" />
        <div className="container relative z-10">
          {/* Large logo lockup */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-14 mb-12">
            <img
              src={hub201Logo}
              alt="Hub201"
              className="h-20 md:h-28 w-auto brightness-0 invert"
            />
            <div className="hidden sm:block h-20 md:h-24 w-px bg-white/25" />
            <img
              src={austrianStandardsLogo}
              alt="Austrian Standards"
              className="h-20 md:h-28 w-auto"
            />
          </div>
          <p className="text-center text-xs md:text-sm uppercase tracking-[0.25em] text-white/60 mb-12">
            Hub201 <span className="text-brand-red mx-2">×</span>{" "}
            <a href={AUSTRIAN_STANDARDS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white underline-offset-4 hover:underline">Austrian Standards</a>
          </p>

          <div className="max-w-4xl mx-auto text-center">
             <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6">
               Training Program for
               <br />
               <span className="text-brand-red">NIS2 Officer Certification</span>
             </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light mb-4 max-w-3xl mx-auto">
              Prepare for NIS2 Officer certification issued by{" "}
              <a href={AUSTRIAN_STANDARDS_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">Austrian Standards</a>.
            </p>
            <p className="text-base md:text-lg text-white/60 mb-10 max-w-2xl mx-auto">
              Structured training designed to help you understand NIS2 requirements, prepare for the certification exam, and apply them in practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
              <Button variant="hero" size="xl" asChild>
                <a href="#apply">
                  Apply for the next cohort
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a href="#apply">Request program details</a>
              </Button>
            </div>

            {/* Audit notice */}
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-md bg-white/5 backdrop-blur border border-white/15 text-xs text-white/70 leading-relaxed">
              Training by <span className="text-white font-semibold">Hub201</span>
              <span className="text-brand-red">·</span>
              Certification by{" "}
              <a href={AUSTRIAN_STANDARDS_URL} target="_blank" rel="noopener noreferrer" className="text-white font-semibold underline-offset-4 hover:underline">Austrian Standards</a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY NIS2 */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 text-brand-red text-xs font-semibold uppercase tracking-wider mb-4">
                <AlertTriangle className="w-3.5 h-3.5" />
                Why NIS2 matters
              </div>
              <h2 className="text-4xl md:text-5xl mb-6">
                Cybersecurity is now an
                <span className="text-brand-red"> organizational responsibility</span>.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                NIS2 introduces a structured approach to cybersecurity risk management and organizational responsibility. The challenge is not only implementation, but understanding what is required and who is responsible.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: ShieldCheck, text: "Implement risk management measures" },
                { icon: Users, text: "Define clear responsibilities" },
                { icon: AlertTriangle, text: "Report significant incidents" },
                { icon: FileCheck, text: "Align with recognized standards" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-4 p-5 bg-secondary border-l-4 border-brand-red rounded-r-md transition-smooth hover:translate-x-1">
                  <item.icon className="w-5 h-5 text-brand-red mt-0.5 shrink-0" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REGULATORY CONTEXT */}
      <section className="py-24 bg-surface-dark text-surface-dark-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
        <div className="container relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-semibold uppercase tracking-wider mb-4">
              <Globe2 className="w-3.5 h-3.5" />
              NIS2 and Regulatory Context
            </div>
            <h2 className="text-4xl md:text-5xl text-white mb-8">
              Built on the European framework, evolving across the region.
            </h2>
            <div className="space-y-6 text-lg text-white/70 leading-relaxed">
              <p>
                NIS2 builds on the European regulatory framework for cybersecurity, expanding its scope and introducing stricter requirements.
              </p>
              <p>
                While Serbia is not a member of the European Union, its regulatory framework is evolving in alignment with European standards. The <span className="text-white font-medium">Law on Information Security</span> establishes the national foundation for cybersecurity obligations, while NIS2 provides a reference model for further development of responsibilities, risk management, and incident handling processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM OVERVIEW */}
      <section id="program" className="py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-semibold uppercase tracking-wider mb-4">
              <ScrollText className="w-3.5 h-3.5" />
              Program Overview
            </div>
            <h2 className="text-4xl md:text-5xl mb-6">
              Prepares candidates for certification under{" "}
              <a href={AUSTRIAN_STANDARDS_URL} target="_blank" rel="noopener noreferrer" className="text-brand-red underline-offset-4 hover:underline">Austrian Standards</a>.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              { num: "01", title: "NIS2 Requirements", desc: "Understanding key NIS2 requirements (Articles 20–24)." },
              { num: "02", title: "Governance & Responsibility", desc: "How accountability is structured across the organization." },
              { num: "03", title: "Risk Management", desc: "Measures to identify, assess, and treat cybersecurity risk." },
              { num: "04", title: "Incident Reporting", desc: "Obligations and processes for significant incidents." },
              { num: "05", title: "Exam Structure", desc: "Certification exam structure and terminology." },
              { num: "06", title: "Practical Application", desc: "How to apply requirements in your day-to-day operations." },
            ].map((item) => (
              <Card key={item.num} className="p-7 border-2 hover:border-brand-red transition-smooth group">
                <div className="text-4xl font-bold text-brand-red/30 group-hover:text-brand-red transition-smooth mb-3">{item.num}</div>
                <h3 className="text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM TRACKS */}
      <section id="tracks" className="py-24 bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-semibold uppercase tracking-wider mb-4">
              <GraduationCap className="w-3.5 h-3.5" />
               WHO IS IT FOR? 
            </div>
             <h2 className="text-4xl md:text-5xl">For those making NIS2 work in practice.</h2>
          </div>
          <div className="grid gap-6 max-w-3xl mx-auto">
            {/* Officer */}
            <Card className="p-8 md:p-10 bg-brand-black text-white border-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-red/20 rounded-full blur-3xl" />
              <div className="relative">
                <div className="inline-block px-3 py-1 bg-brand-red text-xs font-bold uppercase tracking-wider rounded mb-4">
                  Primary Program
                </div>
                <h3 className="text-3xl md:text-4xl mb-2">NIS2 Officer</h3>
                 <p className="text-white/60 mb-6">4 days · ≈ 24 hours of guided training</p>

                <p className="uppercase text-xs font-semibold text-brand-red mb-3 tracking-wider">Designed for</p>
                <ul className="space-y-2 mb-6 text-white/80">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-brand-red mt-1 shrink-0" />Cybersecurity professionals</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-brand-red mt-1 shrink-0" />IT and security managers</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-brand-red mt-1 shrink-0" />Compliance and risk roles</li>
                </ul>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="uppercase text-xs font-semibold text-brand-red mb-3 tracking-wider">Focus</p>
                    <ul className="space-y-2 text-white/80">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-brand-red mt-1 shrink-0" />Implementation of NIS2 requirements</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-brand-red mt-1 shrink-0" />Risk management</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-brand-red mt-1 shrink-0" />Incident reporting</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-brand-red mt-1 shrink-0" />Certification exam preparation</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-white/15 bg-white/5 p-5">
                    <p className="uppercase text-xs font-semibold text-brand-red mb-3 tracking-wider">What you get</p>
                    <ul className="space-y-2 text-white/90 text-sm">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-brand-red mt-1 shrink-0" />4-day intensive certification preparation program</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-brand-red mt-1 shrink-0" />6 instructional hours per training day</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-brand-red mt-1 shrink-0" />Serbian-language training delivery</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-brand-red mt-1 shrink-0" />Continuous Serbian / English terminology alignment</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-brand-red mt-1 shrink-0" />Governance, risk management, and operational resilience focus</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-brand-red mt-1 shrink-0" />Certification-style exam simulations</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-brand-red mt-1 shrink-0" />Online certification exam conducted by Austrian Standards</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-2.5 py-1 bg-brand-red text-white text-sm font-bold uppercase tracking-wider rounded">−20%</span>
                    <span className="text-5xl font-extrabold text-white/50 line-through leading-none">€2.000</span>
                    <span className="text-3xl font-extrabold text-white leading-none">€1.600</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-red text-white rounded-full text-xs font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    Only 12 spots
                  </div>
                </div>
                <p className="text-base text-brand-red font-bold mt-3 uppercase tracking-wider">Discount for first cohort</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CERTIFICATION PROCESS */}
      <section id="certification" className="py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-semibold uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5" />
              Certification Process
            </div>
             <h2 className="text-4xl md:text-5xl mb-6">A structured path from training to certification.</h2>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-12 relative">
            {[
              { step: "01", title: "Training", by: "Hub201", icon: GraduationCap, href: null as string | null },
              { step: "02", title: "Examination", by: "Austrian Standards", icon: ScrollText, href: AUSTRIAN_STANDARDS_URL },
              { step: "03", title: "Certification", by: "Austrian Standards", icon: Award, href: AUSTRIAN_STANDARDS_URL },
            ].map((s) => (
              <div key={s.step} className="relative p-8 bg-secondary rounded-md border-t-4 border-brand-red">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-brand-red tracking-widest">STEP {s.step}</span>
                  <s.icon className="w-6 h-6 text-brand-red" />
                </div>
                <h3 className="text-2xl mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">
                  by{" "}
                  {s.href ? (
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground underline-offset-4 hover:underline">{s.by}</a>
                  ) : (
                    <span className="font-semibold text-foreground">{s.by}</span>
                  )}
                </p>
              </div>
            ))}
          </div>

          <Card className="max-w-5xl mx-auto p-8 bg-brand-black text-white border-0">
            <h4 className="text-xl mb-4 text-brand-red">The certification exam</h4>
            <div className="grid md:grid-cols-3 gap-6 text-white/80">
              <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-red mt-0.5 shrink-0" /><span>Conducted in English</span></div>
              <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-red mt-0.5 shrink-0" /><span>Single-choice questions</span></div>
              <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-red mt-0.5 shrink-0" /><span>Supervised conditions</span></div>
            </div>
          </Card>
        </div>
      </section>

      {/* LEARN MORE */}
      <section className="py-24 bg-secondary">
        <div className="container max-w-4xl">
          <div className="inline-flex items-center gap-2 text-brand-red text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            Austrian Standards
          </div>
          <img
            src={austrianStandardsLogo}
            alt="Austrian Standards"
            className="h-16 md:h-20 w-auto mb-6"
          />
          <h2 className="text-4xl md:text-5xl mb-6">Learn more about certification</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            <a href={AUSTRIAN_STANDARDS_URL} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:text-brand-red">Austrian Standards</a>{" "}
            is an independent and neutral certification body operating in accordance with national and international standards. Certification is conducted and issued separately by{" "}
            <a href={AUSTRIAN_STANDARDS_URL} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:text-brand-red">Austrian Standards</a>.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            For more information about{" "}
            <a href={AUSTRIAN_STANDARDS_URL} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:text-brand-red">Austrian Standards</a>{" "}
            certification, visit:
          </p>
          <Button variant="outline" asChild>
            <a
              href="https://www.austrian-standards.at/en/products-solutions/apply-standards/certification#anchor-zertifizierung-digitalisierung"
              target="_blank"
              rel="noopener noreferrer"
            >
              Austrian Standards Certification
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* CERTIFICATION VALIDITY */}
      <section className="py-24">
        <div className="container max-w-4xl">
          <div className="inline-flex items-center gap-2 text-brand-red text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            Certification lifecycle
          </div>
          <h2 className="text-4xl md:text-5xl mb-6">Certification lifecycle</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Certification issued by{" "}
            <a href={AUSTRIAN_STANDARDS_URL} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:text-brand-red">Austrian Standards</a>{" "}
            is valid for three years.
          </p>
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              To support continued professional development and alignment with evolving NIS2 requirements, Hub201 organizes annual update sessions in the form of webinars and seminars throughout the certification period.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              These sessions help participants stay informed about regulatory developments, implementation challenges, and emerging best practices.
            </p>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section id="audience" className="py-24 bg-secondary">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-2 text-brand-red text-xs font-semibold uppercase tracking-wider mb-4">
                <Building2 className="w-3.5 h-3.5" />
                Who this is for
              </div>
              <h2 className="text-4xl md:text-5xl mb-6">Built for organizations operating under critical responsibility.</h2>
              <p className="text-muted-foreground mb-6">This program is relevant for organizations that:</p>
              <ul className="space-y-3">
                {[
                  "Operate in sectors covered by NIS2",
                  "Manage critical or digital infrastructure",
                  "Require structured cybersecurity responsibility",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-lg">
                    <CheckCircle2 className="w-5 h-5 text-brand-red mt-1 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-red mb-6">Typical participants</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: ShieldCheck, label: "IT and security managers" },
                  { icon: FileCheck, label: "Risk and compliance professionals" },
                  { icon: Target, label: "Technical leads" },
                  { icon: Users, label: "Decision-makers" },
                ].map((p) => (
                  <div key={p.label} className="p-5 bg-background rounded-md border-2 border-transparent hover:border-brand-red transition-smooth">
                    <p.icon className="w-6 h-6 text-brand-red mb-3" />
                    <p className="font-semibold">{p.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU WILL GAIN */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-semibold uppercase tracking-wider mb-4">
              <Target className="w-3.5 h-3.5" />
              What you will gain
            </div>
            <h2 className="text-4xl md:text-5xl">Outcomes that translate into capability.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              "Clear understanding of NIS2 obligations",
              "Defined roles and responsibilities",
              "Structured approach to risk management",
              "Readiness for certification exam",
              "Ability to respond to incidents",
              "Practical alignment with recognized standards",
            ].map((g) => (
              <div key={g} className="flex items-start gap-3 p-6 bg-secondary rounded-md">
                <CheckCircle2 className="w-5 h-5 text-brand-red mt-0.5 shrink-0" />
                <span className="font-medium">{g}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        id="apply"
        className="py-24 md:py-32 bg-brand-black text-white relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(0 0% 4% / 0.92) 0%, hsl(355 70% 18% / 0.85) 100%), url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container relative text-center">
          <h2 className="text-4xl md:text-6xl text-white mb-6 max-w-3xl mx-auto">
            Prepare for <span className="text-brand-red">NIS2 certification</span>.
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Join the next training cohort or request detailed program information.
          </p>
          <div className="max-w-3xl mx-auto">
            <ApplyForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-background">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-brand-red/30 bg-brand-red/5 text-brand-red text-xs font-semibold uppercase tracking-wider rounded-sm">
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently asked <span className="text-brand-red">questions</span>
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about the NIS2 Officer Certification Preparation Program.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "What is the NIS2 Officer Certification Preparation Program?",
                a: "The program is a four-day intensive onsite training designed to prepare participants for the Austrian Standards NIS2 Officer certification exam while developing practical understanding of governance, risk management, and operational resilience concepts.",
              },
              {
                q: "How long does the training last?",
                a: "The program lasts 4 training days, with 6 instructional hours per day.",
              },
              {
                q: "In which language is the training delivered?",
                a: "The training is delivered in Serbian, with continuous Serbian / English terminology alignment to prepare participants for the English-language certification exam. The official certification exam is conducted in English.",
              },
              {
                q: "Is the training onsite or online?",
                a: "The training is delivered onsite. Hybrid options may be available depending on organizational requirements.",
              },
              {
                q: "Is the certification exam included?",
                a: "The training includes full certification preparation, mock questions, and exam simulations. The official certification exam is conducted separately by Austrian Standards.",
              },
              {
                q: "How is the certification exam conducted?",
                a: "The official certification exam is conducted online and individually. Participants schedule their own exam session directly with Austrian Standards. Hub201 may also organize group exam sessions at arranged dates and times for participating cohorts.",
              },
              {
                q: "Who issues the certification?",
                a: "The certification is issued exclusively by Austrian Standards upon successful completion of the exam.",
              },
              {
                q: "What is Austrian Standards?",
                a: "Austrian Standards is Austria's national standards organization and one of the leading certification and standardization institutions in the region. The organization is internationally recognized for its work in standardization, governance, compliance, and professional certification programs. The NIS2 Officer certification is designed around European regulatory and governance principles and carries strong professional relevance for organizations working on cybersecurity governance, resilience, and regulatory readiness initiatives.",
              },
              {
                q: "Does Hub201 issue the certificate?",
                a: "No. Hub201 delivers the preparation training program, while Austrian Standards acts as the independent certification body responsible for examination and certification issuance.",
              },
              {
                q: "Is prior technical cybersecurity experience required?",
                a: "No advanced technical background is required. The program focuses primarily on governance, risk management, resilience, and organizational cybersecurity responsibilities.",
              },
              {
                q: "What happens after completing the training?",
                a: "After completing the training, participants may independently schedule the official certification exam with Austrian Standards. Successful candidates receive the official NIS2 Officer certification.",
              },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-brand-red hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-surface-dark text-surface-dark-foreground py-12 border-t border-white/10">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex items-center gap-6">
              <img src={hub201Logo} alt="Hub201" className="h-10 w-auto brightness-0 invert" />
              <div className="h-10 w-px bg-white/20" />
              <img src={austrianStandardsLogo} alt="Austrian Standards" className="h-10 w-auto" />
            </div>
            <div className="md:text-right text-sm text-white/70 leading-relaxed">
              <p>
                <span className="text-white font-semibold">Hub201</span> provides training and preparation only.
              </p>
              <p>
                Certification is issued by{" "}
                <a href={AUSTRIAN_STANDARDS_URL} target="_blank" rel="noopener noreferrer" className="text-white font-semibold underline-offset-4 hover:underline">Austrian Standards</a>.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/40 text-center">
            © {new Date().getFullYear()} Hub201. Empowering innovation. Securing the future.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
