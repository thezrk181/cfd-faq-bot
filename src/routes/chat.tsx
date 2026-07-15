import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/chat")({
  component: ChatRoute,
});

function ChatRoute() {
  useEffect(() => {
    document.body.classList.add("full-screen-chat-active");

    let injectScript: HTMLScriptElement | null = null;
    let configScript: HTMLScriptElement | null = null;

    // Step 1: Load inject.js
    injectScript = document.createElement("script");
    injectScript.src = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
    injectScript.async = false;

    injectScript.onload = () => {
      const bp = (window as any).botpress;
      if (!bp) return;

      // Listen for initialization events and auto-open
      bp.on("webchat:opened", () => {
        // Chat opened — no action needed
      });
      bp.on("webchat:initialized", () => {
        bp.open();
      });
      bp.on("webchat:ready", () => {
        bp.open();
      });

      // Step 2: Load the Botpress config script AFTER inject.js is ready
      // This script reads the dashboard settings (Embedded mode + element ID)
      configScript = document.createElement("script");
      configScript.src = "https://files.bpcontent.cloud/2026/07/14/10/20260714101910-9DIHQS5L.js";
      configScript.async = false;
      configScript.onload = () => {
        // Force open after config script runs, with multiple fallbacks
        setTimeout(() => { try { bp.open(); } catch (_) {} }, 500);
        setTimeout(() => { try { bp.open(); } catch (_) {} }, 1500);
        setTimeout(() => { try { bp.open(); } catch (_) {} }, 3000);
      };
      document.body.appendChild(configScript);
    };

    document.body.appendChild(injectScript);

    return () => {
      document.body.classList.remove("full-screen-chat-active");

      if (injectScript && document.body.contains(injectScript)) {
        document.body.removeChild(injectScript);
      }
      if (configScript && document.body.contains(configScript)) {
        document.body.removeChild(configScript);
      }

      // Remove any elements Botpress injected into the DOM
      document.querySelectorAll("[id^='bp-']").forEach((el) => el.remove());
      document.querySelectorAll(".bpWebchat, .bpFab").forEach((el) => el.remove());

      // Clear global to allow fresh init next time
      if (typeof window !== "undefined") {
        (window as any).botpress = undefined;
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-[#0a0f1e] text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d1428] shadow-md z-10 shrink-0" style={{ height: "72px" }}>
        <Link
          to="/"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Back to Website</span>
        </Link>

        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="FAST CFD Chatbot" className="w-8 h-8 rounded-full border border-white/20 object-cover" />
          <h1 className="font-semibold text-white tracking-wide">FAST CFD FAQ Bot</h1>
        </div>

        <div className="w-32" />
      </header>

      {/* Container Botpress will embed into (must match Element ID in Botpress dashboard) */}
      <div
        id="bp-embedded-webchat"
        className="flex-1 w-full relative bg-[#070b17]"
        style={{ minHeight: 0 }}
      >
        {/* Loading placeholder */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/40 pointer-events-none">
          <img src="/logo.jpg" alt="Loading" className="w-16 h-16 rounded-full border border-white/10 object-cover animate-pulse" />
          <p className="tracking-wide text-sm">Initializing CFD Assistant...</p>
        </div>
      </div>
    </div>
  );
}
