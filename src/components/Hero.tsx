import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg pt-20">
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full animate-float-slow"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.35), transparent 70%)" }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full animate-float-slow"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)",
            animationDelay: "5s",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-40 h-40 rotate-45 animate-float-slow opacity-20"
          style={{
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            animationDelay: "10s",
          }}
        />
        {/* grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-white/10 mb-8"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-medium text-muted-foreground">
            AI-powered • FAST-NUCES CFD Campus
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]"
        >
          Your Smart <br />
          <span className="gradient-text">Campus Assistant</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Get instant answers about admissions, academics, hostel, and campus life at
          FAST-NUCES CFD Campus.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <Link
            to="/chat"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-glow text-white font-semibold text-base"
          >
            Chat Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass-card border border-white/10 text-foreground font-semibold hover:border-white/20 transition"
          >
            Explore Features
          </a>
        </motion.div>
      </div>
    </section>
  );
}
