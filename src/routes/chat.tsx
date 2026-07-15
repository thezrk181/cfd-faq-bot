import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/chat")({
  component: ChatRoute,
});

function ChatRoute() {
  useEffect(() => {
    document.body.classList.add("full-screen-chat-active");

    // Make sure the container div exists before Botpress tries to find it
    const container = document.getElementById("bp-embedded-webchat");
    if (!container) return;

    let injectScript: HTMLScriptElement | null = null;

    // Only inject if botpress isn't already loaded
    const doInit = () => {
      const bp = (window as any).botpress;
      if (!bp) return;

      // On open, remove the loading placeholder
      bp.on("webchat:opened", () => {
        const placeholder = document.getElementById("chat-loading-placeholder");
        if (placeholder) placeholder.style.display = "none";
      });

      // The full configuration taken from the Botpress dashboard (all fields)
      // We own this init call — no stale external script needed.
      bp.init({
        botId: "31f8fc4e-5c59-43c7-b5fd-61cf7fa46507",
        clientId: "46da5237-8f0b-471a-8997-2ddd0a08de39",
        configuration: {
          version: "v2",
          botName: "Fast CFD FAQ Bot",
          color: "#3276EA",
          variant: "solid",
          headerVariant: "solid",
          themeMode: "dark",
          fontFamily: "inter",
          radius: 4,
          feedbackEnabled: false,
          soundEnabled: false,
          proactiveMessageEnabled: false,
          conversationHistory: true,
          homePageEnabled: false,
          mainCardEnabled: false,
          conversationStartersEnabled: false,
          footer: "[⚡ by Botpress](https://botpress.com/?from=webchat)",
          // Pass our stylesheet so FAB is hidden from inside Botpress
          stylesheet: `${window.location.origin}/botpress-override.css`,
        },
      });
    };

    if ((window as any).botpress) {
      // Already loaded from a previous navigation, re-init
      doInit();
    } else {
      injectScript = document.createElement("script");
      injectScript.src = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
      injectScript.async = false;
      injectScript.onload = doInit;
      document.body.appendChild(injectScript);
    }

    return () => {
      document.body.classList.remove("full-screen-chat-active");

      if (injectScript && document.body.contains(injectScript)) {
        document.body.removeChild(injectScript);
      }

      // Remove all Botpress injected elements
      document.querySelectorAll("[id^='bp-web-widget']").forEach((el) => el.remove());
      document.querySelectorAll(".bpWebchat, .bpFab, .bp-widget-web").forEach((el) => el.remove());

      if (typeof window !== "undefined") {
        (window as any).botpress = undefined;
      }
    };
  }, []);

  return (
    <div className="flex flex-col bg-[#0a0f1e] text-foreground" style={{ height: "100dvh", width: "100vw", overflow: "hidden" }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 border-b border-white/10 bg-[#0d1428] shadow-md z-10 shrink-0"
        style={{ height: "64px" }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft size={18} />
          <span className="font-medium text-sm">Back to Website</span>
        </Link>

        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="FAST CFD Chatbot" className="w-8 h-8 rounded-full border border-white/20 object-cover" />
          <h1 className="font-semibold text-white tracking-wide text-sm">FAST CFD FAQ Bot</h1>
        </div>

        <div className="w-36" />
      </header>

      {/* Botpress renders INTO this div when Embedded mode is configured in dashboard */}
      <div
        id="bp-embedded-webchat"
        style={{
          flex: 1,
          width: "100%",
          height: "calc(100dvh - 64px)",
          position: "relative",
          background: "#070b17",
          overflow: "hidden",
        }}
      >
        {/* Loading placeholder — hidden once webchat:opened fires */}
        <div
          id="chat-loading-placeholder"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            color: "rgba(255,255,255,0.4)",
            pointerEvents: "none",
          }}
        >
          <img
            src="/logo.jpg"
            alt="Loading"
            style={{ width: "64px", height: "64px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", objectFit: "cover" }}
            className="animate-pulse"
          />
          <p style={{ fontSize: "0.875rem", letterSpacing: "0.05em" }}>Initializing CFD Assistant...</p>
        </div>
      </div>
    </div>
  );
}
