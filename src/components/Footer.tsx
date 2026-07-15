import { Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/5 bg-[#070b17] px-6 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl btn-glow flex items-center justify-center overflow-hidden border border-white/10">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-display font-bold text-lg">
              CFD <span className="gradient-text">Assistant</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Your AI-powered guide to FAST-NUCES Chiniot-Faisalabad Campus.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-foreground mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="https://cfd.nu.edu.pk" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
                Campus Website
              </a>
            </li>
            <li>
              <a href="https://cfd.nu.edu.pk" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
                Admissions
              </a>
            </li>
            <li>
              <a href="https://flex.nu.edu.pk" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
                FLEX Portal
              </a>
            </li>
            <li>
              <a href="https://slate.nu.edu.pk" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
                SLATE LMS
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-foreground mb-4">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <a href="mailto:admissions.cfd@nu.edu.pk" className="hover:text-foreground transition">
                admissions.cfd@nu.edu.pk
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" />
              <a href="tel:+924111128128" className="hover:text-foreground transition">
                (041) 111 128 128
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 text-center text-xs text-muted-foreground">
        Built for FAST-NUCES CFD Students
      </div>
    </footer>
  );
}
