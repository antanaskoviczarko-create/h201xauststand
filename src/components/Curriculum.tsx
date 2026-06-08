import { Calendar, Clock, User, BookOpen } from "lucide-react";

type Block = {
  block: string;
  time: string;
  topic: string;
  content: string;
  duration: string;
};

type Day = {
  num: string;
  title: string;
  subtitle: string;
  instructor: string;
  initials: string;
  blocks: Block[];
};

const DAYS: Day[] = [
  {
    num: "DAY 1",
    title: "Governance, regulatory framework and management accountability",
    subtitle: "Why NIS2 changes the way organizations think about cybersecurity",
    instructor: "Nikola Budanović",
    initials: "NB",
    blocks: [
      { block: "INTRO", time: "08:30 – 09:00", topic: "Introduction to Day 1", content: "Training objectives; structure of the four-day program; mental framework of the NIS2 Officer role; who is accountable for cybersecurity.", duration: "30 min" },
      { block: "MODULE 1", time: "09:00 – 11:00", topic: "Regulatory framework of the NIS2 Directive", content: "How the EU views cyber risk (WannaCry, NotPetya, SolarWinds); from NIS1 to NIS2 and the three goals of the directive; Directive vs. Regulation, transposition, Serbia and NIS2; CIA triad; Essential vs. Important Entities; sanctions regime up to €10M / 2%; key NIS2 articles.", duration: "120 min" },
      { block: "BREAK", time: "11:00 – 11:15", topic: "Break", content: "—", duration: "15 min" },
      { block: "MODULE 2", time: "11:15 – 12:30", topic: "Management accountability and governance model", content: "Article 20 NIS2 – management accountability; accountability vs. responsibility (Equifax case); governance vs. operations layer; Management System approach (Policy → Process → Control → Evidence → Review); Security Culture and the human factor.", duration: "75 min" },
      { block: "LUNCH", time: "12:30 – 13:15", topic: "Lunch break", content: "—", duration: "45 min" },
      { block: "MODULE 3", time: "13:15 – 14:30", topic: "Cyber risk management", content: "Threat × Vulnerability = Risk; risk matrix; risk treatment options (mitigate, transfer, accept, avoid); residual risk and management approval; asset management and classification; Maersk / NotPetya as an example of critical dependencies.", duration: "75 min" },
      { block: "BREAK", time: "14:30 – 14:45", topic: "Break", content: "—", duration: "15 min" },
      { block: "MODULE 4", time: "14:45 – 15:45", topic: "Institutional framework and incident reporting", content: "Three-phase reporting model: Early Warning 24h → Notification 72h → Final Report 1 month; roles of CSIRT, Competent Authority, ENISA, CyCLONe; criteria for a significant incident; escalation logic; Colonial Pipeline example.", duration: "60 min" },
      { block: "TEST", time: "15:45 – 16:15", topic: "Knowledge check and wrap-up", content: "6 certification-format questions with explanations; key takeaways per module; preview of Day 2.", duration: "30 min" },
    ],
  },
  {
    num: "DAY 2",
    title: "Technical and operational cybersecurity measures",
    subtitle: "How organizations technically implement cyber protection",
    instructor: "Ivan Barać",
    initials: "IB",
    blocks: [
      { block: "INTRO", time: "08:30 – 09:00", topic: "Introduction to Day 2", content: "Bridge between governance and technical controls; the principle of proportionality; how a regulatory obligation becomes a security measure.", duration: "30 min" },
      { block: "MODULE 1", time: "09:00 – 10:30", topic: "Network security and segmentation", content: "Defense in Depth; types of controls; network segmentation and zones; firewall and DMZ; IDS/IPS; lateral movement and blast radius.", duration: "90 min" },
      { block: "BREAK", time: "10:30 – 10:45", topic: "Break", content: "—", duration: "15 min" },
      { block: "MODULE 2", time: "10:45 – 12:15", topic: "Identity & Access Management", content: "The four IAM pillars; access control models (RBAC, MAC, DAC, ABAC); Least Privilege; MFA factors; Joiner-Mover-Leaver lifecycle; Privileged Access Management.", duration: "90 min" },
      { block: "LUNCH", time: "12:15 – 13:00", topic: "Lunch break", content: "—", duration: "45 min" },
      { block: "MODULE 3", time: "13:00 – 14:30", topic: "Secure Configuration, Change Management and Auditability", content: "Hardening and CIS Benchmarks; patch management and CVSS timelines; change management as a security control; security testing; logging, SIEM and auditability.", duration: "90 min" },
      { block: "BREAK", time: "14:30 – 14:45", topic: "Break", content: "—", duration: "15 min" },
      { block: "MODULE 4", time: "14:45 – 15:45", topic: "Secure Development and Supplier Governance", content: "Security by Design; SDLC phases; secure coding practices; OWASP Top 10 prevention; supplier assessment; contractual controls; continuous improvement.", duration: "60 min" },
      { block: "TEST", time: "15:45 – 16:15", topic: "Knowledge check and wrap-up", content: "6 certification-format questions with explanations; key takeaways per module; preview of Day 3.", duration: "30 min" },
    ],
  },
  {
    num: "DAY 3",
    title: "Incident Response, Operational Resilience and Continuity Management",
    subtitle: "How organizations react during a cyber incident and continue operating",
    instructor: "Nenad Nikolovski",
    initials: "NN",
    blocks: [
      { block: "INTRO", time: "08:30 – 09:00", topic: "Introduction to Day 3", content: "Synthesis of Day 1 and Day 2; central idea of Day 3 – no organization can guarantee that an incident will not happen; incident response in the NIS2 regulatory context.", duration: "30 min" },
      { block: "MODULE 1", time: "09:00 – 10:30", topic: "Incident Response Lifecycle", content: "Event vs. incident distinction; the six phases of the IR Lifecycle (Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned); IR as an auditable process; team roles and responsibilities; IR Policy and Playbooks; SolarWinds and Uber breach examples.", duration: "90 min" },
      { block: "BREAK", time: "10:30 – 10:45", topic: "Break", content: "—", duration: "15 min" },
      { block: "MODULE 2", time: "10:45 – 12:15", topic: "Business Continuity and Disaster Recovery", content: "BCP vs. DRP distinction; RTO, RPO, MTD, MTTR, MTBF metrics; Business Impact Analysis (BIA); backup strategies (full, incremental, differential, immutable); the 3-2-1-1 rule; recovery testing as a NIS2 obligation; British Airways and Conti examples.", duration: "90 min" },
      { block: "LUNCH", time: "12:15 – 13:00", topic: "Lunch break", content: "—", duration: "45 min" },
      { block: "MODULE 3", time: "13:00 – 14:00", topic: "Supply Chain Resilience", content: "Types of supply chain attacks (software, MSP, hardware, open source, third-party); Shared Responsibility Model and NIS2 accountability; integrating suppliers into the IR plan; SolarWinds, Kaseya, XZ Utils and Target examples.", duration: "60 min" },
      { block: "BREAK", time: "14:00 – 14:15", topic: "Break", content: "—", duration: "15 min" },
      { block: "MODULE 4", time: "14:15 – 15:15", topic: "Physical security and Environmental Controls", content: "Physical-digital integration per NIS2 Article 21; environmental controls (UPS, HVAC, fire suppression, water detection); physical security during incident response; Clean Desk Policy; OVHcloud fire and rogue USB scenarios.", duration: "60 min" },
      { block: "TEST", time: "15:15 – 16:15", topic: "Knowledge check, wrap-up and Day 4 preview", content: "6 certification-format questions with detailed explanations; synthesis of the three days as a single framework; key takeaways per module; overview of Day 4 (integration, audit mindset, mock exam).", duration: "60 min" },
    ],
  },
  {
    num: "DAY 4",
    title: "Knowledge integration, audit mindset and exam preparation",
    subtitle: "Everything we have learned – now applied together",
    instructor: "Nikola Budanović",
    initials: "NB",
    blocks: [
      { block: "INTRO", time: "08:30 – 09:00", topic: "Introduction to Day 4 – Synthesis and exam", content: "What the NIS2 Officer mindset really means; integration matrix across all four days; the difference between a technical candidate and a regulatory-mature NIS2 Officer; structure of the final day.", duration: "30 min" },
      { block: "MODULE 0", time: "09:00 – 11:00", topic: "Audit Principles, Governance Verification & Certification Logic", content: "Audit mindset as a mental framework; what an audit is and is not; Objective Evidence as the foundation of compliance; Conformity, Major/Minor Nonconformity, Observation; Governance Verification – what an auditor really looks at; Proportionality as a filter for exam answers.", duration: "120 min" },
      { block: "BREAK", time: "11:00 – 11:15", topic: "Break", content: "—", duration: "15 min" },
      { block: "MODULE 1", time: "11:15 – 12:30", topic: "Integrated Governance & Security Model", content: "The four days as a unified model; accountability during an incident (RACI logic); NIS2 Article 21 and the ten categories of measures as an integration framework; Risk Prioritization with a business orientation.", duration: "75 min" },
      { block: "LUNCH", time: "12:30 – 13:15", topic: "Lunch break", content: "—", duration: "45 min" },
      { block: "MODULE 2", time: "13:15 – 14:15", topic: "Exam strategy and question interpretation", content: "Types of exam traps (Governance vs. Technical, Accountability vs. Responsibility, Best First Action, Reporting Timing, Outsourcing); Decision Tree approach to questions; quick reference guide through key concepts of all four days.", duration: "60 min" },
      { block: "BREAK", time: "14:15 – 14:30", topic: "Break", content: "—", duration: "15 min" },
      { block: "MODULE 3", time: "14:30 – 15:45", topic: "Mock Exam – 20 certification-format questions", content: "Exam simulation: 20 questions across all areas (Article 20, sanctions €10M/2%, IR Lifecycle, BCP/DRP, MFA, JML, supply chain, 3-2-1-1, proportionality); detailed explanations of why answers A/B/C/D are correct or incorrect.", duration: "75 min" },
      { block: "CLOSING", time: "15:45 – 16:15", topic: "Final recap and exam preparation", content: "Key truths of the NIS2 Officer program; three control questions for every exam question; review of the Master glossary with 70+ terms; logistics of the certification exam.", duration: "30 min" },
    ],
  },
];

const INSTRUCTORS = [
  {
    name: "Nikola Budanović",
    initials: "NB",
    role: "Program Author",
    assignment: "Day 1 (intro) + Day 4",
    bio: "Nikola Budanović is the author of the program and one of the leaders of Hub201's educational initiatives in cybersecurity, NIS2 compliance and digital resilience. His experience combines research, communication and strategic work across the cybersecurity ecosystem – from curriculum and program development to cooperation with the public sector, industry and the professional community. Within the NIS2 Officer training, Nikola leads the opening part of Day 1 and the final day of the program, focusing on understanding NIS2 logic, the governance approach, the audit mindset, scenario-based interpretation of questions and preparing participants for the certification exam.",
  },
  {
    name: "Aleksandar Mastilović",
    initials: "AM",
    role: "Digital Transformation · Regulatory Context",
    assignment: "Regulatory and institutional context",
    bio: "Aleksandar Mastilović is an expert in digital transformation, telecommunications and the development of modern technological ecosystems. His interdisciplinary experience covers the implementation of 5G technologies, telecom market analysis, smart city concept development, and digital transformation projects in public administration and SMEs. Within the NIS2 Officer training, Aleksandar contributes to the understanding of the regulatory, institutional and organizational context of digital security, with a particular focus on the application of European rules, change management, and practical challenges of aligning organizations with new digital resilience requirements.",
  },
  {
    name: "Ivan Barać",
    initials: "IB",
    role: "Engineering Development Lead | PULSEC",
    assignment: "Day 2",
    bio: "Ivan Barać is a cybersecurity expert with more than 20 years of experience in the field, acquired through work in large public and private systems and through implementing a wide range of cybersecurity projects. He serves as Engineering Development Lead at PULSEC and as the head of the PULSEC CyberLab internship program, which trains new talent in cybersecurity. Within the company he focuses on engineering career development in the Engineering Division, including education, certification and career guidance. Within the NIS2 Officer training, Ivan leads Day 2, with the task of bringing security controls derived from NIS2 requirements closer to participants and explaining them clearly.",
  },
  {
    name: "Nenad Nikolovski",
    initials: "NN",
    role: "IT and Engineering Consultant",
    assignment: "Day 3",
    bio: "Nenad Nikolovski is an IT and engineering consultant with more than 20 years of experience in the IT industry. Throughout his career he has covered different levels of IT management – from technical and operational roles to leading teams and managing complex processes. He has significant experience working with incident response teams and managing real-world incidents, ranging from everyday operational issues to large-scale incidents. Within the NIS2 Officer training, Nenad leads Day 3, dedicated to incident response, operational resilience, business continuity and the practical management of crisis situations.",
  },
];

const Curriculum = () => {
  return (
    <section id="curriculum" className="py-24 bg-brand-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-red pointer-events-none opacity-50" />
      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-brand-red/40 bg-brand-red/10 text-brand-red text-xs font-semibold uppercase tracking-wider rounded-sm">
            Curriculum
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Complete <span className="text-brand-red">four-day program</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            From governance foundations to the certification exam – a comprehensive path through the NIS2 Directive, technical controls, incident response and exam preparation.
          </p>
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-red" /> 4 days</span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-brand-red" /> 24 hours of instruction</span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-brand-red" /> 16 modules</span>
            <span className="text-white/20">·</span>
            <span>6 hours per day</span>
          </div>
        </div>

        {/* Days */}
        <div className="space-y-12 mb-24">
          {DAYS.map((day) => (
            <div key={day.num} className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02] backdrop-blur">
              <div className="p-6 md:p-8 border-b border-white/10 bg-white/[0.03]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="text-brand-red text-xs font-semibold uppercase tracking-[0.2em] mb-2">{day.num}</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{day.title}</h3>
                    <p className="text-white/60 text-sm md:text-base">{day.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-12 h-12 rounded-full bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-red font-bold">
                      {day.initials}
                    </div>
                    <div className="text-sm">
                      <div className="text-white/50 text-xs uppercase tracking-wider">Lecturer</div>
                      <div className="text-white font-medium">{day.instructor}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/[0.04] text-white/60 uppercase text-xs tracking-wider">
                    <tr>
                      <th className="text-left px-4 md:px-6 py-3 font-semibold">Block</th>
                      <th className="text-left px-4 md:px-6 py-3 font-semibold whitespace-nowrap">Time</th>
                      <th className="text-left px-4 md:px-6 py-3 font-semibold">Topic</th>
                      <th className="text-left px-4 md:px-6 py-3 font-semibold">Content</th>
                      <th className="text-left px-4 md:px-6 py-3 font-semibold whitespace-nowrap">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {day.blocks.map((b, i) => {
                      const isBreak = b.block === "BREAK" || b.block === "LUNCH";
                      return (
                        <tr key={i} className={`border-t border-white/5 ${isBreak ? "text-white/40 italic" : "text-white/85"}`}>
                          <td className="px-4 md:px-6 py-4 align-top">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              isBreak ? "bg-white/5 text-white/40" : "bg-brand-red/15 text-brand-red"
                            }`}>
                              {b.block}
                            </span>
                          </td>
                          <td className="px-4 md:px-6 py-4 align-top whitespace-nowrap font-mono text-xs">{b.time}</td>
                          <td className="px-4 md:px-6 py-4 align-top font-semibold">{b.topic}</td>
                          <td className="px-4 md:px-6 py-4 align-top text-white/65 leading-relaxed min-w-[280px]">{b.content}</td>
                          <td className="px-4 md:px-6 py-4 align-top whitespace-nowrap font-semibold">{b.duration}</td>
                        </tr>
                      );
                    })}
                    <tr className="border-t border-white/10 bg-white/[0.04]">
                      <td colSpan={4} className="px-4 md:px-6 py-3 text-right text-white/70 font-semibold uppercase text-xs tracking-wider">
                        Total instruction time (excluding breaks)
                      </td>
                      <td className="px-4 md:px-6 py-3 text-brand-red font-bold whitespace-nowrap">6 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Instructors */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-brand-red/40 bg-brand-red/10 text-brand-red text-xs font-semibold uppercase tracking-wider rounded-sm">
            Program lecturers
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Interdisciplinary <span className="text-brand-red">team</span>
          </h2>
          <p className="text-lg text-white/70">
            Combining regulatory, technical and operational expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {INSTRUCTORS.map((p) => (
            <div key={p.name} className="bg-white/[0.03] border border-white/10 rounded-lg p-6 md:p-8 hover:border-brand-red/40 transition-colors">
              <div className="flex items-start gap-5 mb-5">
                <div className="w-20 h-20 shrink-0 rounded-full bg-gradient-to-br from-brand-red/30 to-brand-red/5 border-2 border-brand-red/50 flex items-center justify-center text-2xl font-bold text-white">
                  {p.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{p.name}</h3>
                  <p className="text-brand-red text-sm font-semibold mb-1">{p.role}</p>
                  <p className="text-white/50 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3 h-3" /> {p.assignment}
                  </p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{p.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Curriculum;