import { motion } from "framer-motion";
import { MessageSquare, Search, Zap } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Type your question",
    desc: "Ask anything — admissions, fees, academics, hostel life.",
  },
  {
    icon: Search,
    title: "AI searches sources",
    desc: "Our assistant scans official FAST-NUCES CFD data.",
  },
  {
    icon: Zap,
    title: "Get an instant answer",
    desc: "Accurate, contextual responses in seconds.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-blue-400 font-mono">
            Process
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            Get Answers in Seconds
          </h2>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-8">
          {/* connector line */}
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 w-16 h-16 rounded-2xl btn-glow flex items-center justify-center mb-6">
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#0a0f1e] border border-blue-500/60 flex items-center justify-center text-xs font-mono font-bold text-blue-400">
                  {i + 1}
                </span>
                <s.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
