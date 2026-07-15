import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How It Works" },
  { href: "/chat", label: "Chat", isRoute: true },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#0a0f1e]/70 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative w-9 h-9 rounded-xl btn-glow flex items-center justify-center overflow-hidden border border-white/10">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            CFD <span className="gradient-text">Assistant</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) =>
            l.isRoute ? (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            )
          )}
          <Link
            to="/chat"
            className="text-sm font-semibold px-4 py-2 rounded-lg btn-glow text-white"
          >
            Chat Now
          </Link>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden backdrop-blur-xl bg-[#0a0f1e]/95 border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {links.map((l) =>
            l.isRoute ? (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            )
          )}
          <Link
            to="/chat"
            onClick={() => setOpen(false)}
            className="text-sm font-semibold px-4 py-2 rounded-lg btn-glow text-white text-center"
          >
            Chat Now
          </Link>
        </div>
      )}
    </header>
  );
}
