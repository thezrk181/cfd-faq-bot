import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, MessageSquare, Send, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ChatSection() {
  const mockMessages = [
    {
      sender: "user",
      text: "What are the admission requirements for BS Computer Science?",
      time: "12:00 PM",
    },
    {
      sender: "bot",
      text: "For BS Computer Science at FAST-NUCES CFD campus, you need:\n\n• At least 60% marks in Matriculation / O-Levels.\n• At least 50% marks in F.Sc (Pre-Engineering) / ICS / A-Levels (with Mathematics).\n• Selection is based on the FAST Admission Test or SAT scores.",
      time: "12:01 PM",
    },
  ];

  const sampleQuestions = [
    "BS CS Fee Structure",
    "Hostel facilities & fees",
    "Transport routes",
    "Admission entry test date",
  ];

  return (
    <section id="chat" className="relative py-24 px-6 bg-[#070b17]/30 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-widest text-blue-400 font-mono">
            Smart Companion
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            Chat with CFD Assistant
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Get instant answers to all your FAST-NUCES campus questions—academics, fees, admissions, and campus life.
          </p>
        </motion.div>

        {/* Mock Interface Teaser */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-12 max-w-2xl mx-auto"
        >
          {/* Animated gradient border */}
          <div
            className="absolute -inset-[2px] rounded-3xl opacity-50 blur-md animate-pulse-ring"
            style={{
              background: "linear-gradient(135deg, #2563eb, #7c3aed, #2563eb)",
              backgroundSize: "200% 200%",
            }}
          />

          <div className="relative glass-card rounded-3xl overflow-hidden border border-white/10 flex flex-col h-[480px]">
            {/* Header bar of mock chat */}
            <div className="px-6 py-4 border-b border-white/5 bg-[#0a0f1e]/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10">
                  <img src="/logo.jpg" alt="Bot Logo" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    Fast CFD FAQ Bot
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  <div className="text-[10px] text-muted-foreground">Always active</div>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-blue-400" />
            </div>

            {/* Messages area */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto text-left scrollbar-thin">
              {mockMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#2563eb] text-white rounded-tr-none"
                        : "glass-card border border-white/10 text-foreground rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input area mockup */}
            <div className="p-4 bg-[#0a0f1e]/40 border-t border-white/5 flex items-center gap-2">
              <div className="flex-1 bg-white/5 rounded-xl border border-white/5 px-4 py-3 text-left text-xs text-muted-foreground flex items-center justify-between">
                <span>Type your message here...</span>
                <Send className="w-4 h-4 opacity-50" />
              </div>
              <Link
                to="/chat"
                className="w-10 h-10 rounded-xl btn-glow flex items-center justify-center text-white"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Suggestion Chips */}
        <div className="mt-8 flex flex-wrap gap-2 justify-center max-w-xl mx-auto">
          {sampleQuestions.map((q, idx) => (
            <Link
              key={idx}
              to="/chat"
              className="text-xs px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 text-muted-foreground hover:text-white transition-all"
            >
              {q}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-10">
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-glow text-white font-semibold text-base"
          >
            <MessageSquare className="w-5 h-5" />
            Open Fullscreen Chat App
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Available 24/7 • Mobile Responsive
        </p>

        <div className="mt-8 max-w-2xl mx-auto flex items-start gap-3 p-4 rounded-xl glass-card border border-amber-500/20 text-left">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-amber-400">Disclaimer:</strong> This assistant is
            AI-powered and trained on campus data. Always verify critical academic or fee
            information with the relevant university department.
          </p>
        </div>
      </div>
    </section>
  );
}
