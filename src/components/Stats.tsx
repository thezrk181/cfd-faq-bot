import { motion } from "framer-motion";

const stats = [
  { value: "3", label: "Knowledge Bases" },
  { value: "24/7", label: "Available" },
  { value: "∞", label: "Instant Answers" },
];

export function Stats() {
  return (
    <section
      className="relative py-20 px-6 border-y border-white/5"
      style={{
        background:
          "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(124,58,237,0.08)), #070b17",
      }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="font-mono font-bold text-6xl md:text-7xl gradient-text">
              {s.value}
            </div>
            <div className="mt-3 text-sm uppercase tracking-widest text-muted-foreground">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
