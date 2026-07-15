import { motion } from "framer-motion";
import {
  GraduationCap,
  Wallet,
  Calculator,
  BookOpen,
  Building2,
  Users,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Admissions Info",
    desc: "Eligibility criteria, application deadlines, and merit requirements.",
  },
  {
    icon: Wallet,
    title: "Fee Structure",
    desc: "Semester fees, hostel charges, and payment plans.",
  },
  {
    icon: Calculator,
    title: "Aggregate Calculator",
    desc: "Calculate your admission merit score in seconds.",
  },
  {
    icon: BookOpen,
    title: "Academic Queries",
    desc: "Courses, exams, CGPA, registration, and grading.",
  },
  {
    icon: Building2,
    title: "Hostel & Facilities",
    desc: "Room allocation, mess menu, gym, and transport info.",
  },
  {
    icon: Users,
    title: "Campus Life",
    desc: "Societies, events, library hours, and gate pass procedures.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-blue-400 font-mono">
            Features
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            What Can I Help You With?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Six knowledge areas — one assistant. Ask anything and get an answer.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass-card glow-border rounded-2xl p-7 cursor-default"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.2))" }}
              >
                <f.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
