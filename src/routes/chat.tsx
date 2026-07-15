import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/chat")({
  component: ChatRoute,
});

const BOT_ID = "31f8fc4e-5c59-43c7-b5fd-61cf7fa46507";
const CLIENT_ID = "46da5237-8f0b-471a-8997-2ddd0a08de39";
const HEADER_HEIGHT = 64;

function ChatRoute() {
  useEffect(() => {
    document.body.classList.add("full-screen-chat-active");

    let injectScript: HTMLScriptElement | null = null;
    let configScript: HTMLScriptElement | null = null;

    const forceFullScreen = () => {
      // Hide the floating bubble
      document.querySelectorAll<HTMLElement>(
        '.bpFab, [class*="Fab"], button[aria-label="Open chat"]'
      ).forEach((el) => {
        el.style.setProperty("display", "none", "important");
        el.style.setProperty("visibility", "hidden", "important");
      });

      // Force chat panel to fill the screen below header
      document.querySelectorAll<HTMLElement>(
        '.bpWebchat, #bp-web-widget, [id^="bp-web-widget"]'
      ).forEach((el) => {
        el.style.setProperty("position", "fixed", "important");
        el.style.setProperty("top", `${HEADER_HEIGHT}px`, "important");
        el.style.setProperty("left", "0", "important");
        el.style.setProperty("right", "0", "important");
        el.style.setProperty("bottom", "0", "important");
        el.style.setProperty("width", "100vw", "important");
        el.style.setProperty("height", `calc(100vh - ${HEADER_HEIGHT}px)`, "important");
        el.style.setProperty("max-width", "100vw", "important");
        el.style.setProperty("max-height", `calc(100vh - ${HEADER_HEIGHT}px)`, "important");
        el.style.setProperty("border-radius", "0", "important");
        el.style.setProperty("border", "none", "important");
        el.style.setProperty("box-shadow", "none", "important");
        el.style.setProperty("z-index", "9999", "important");
        el.style.setProperty("margin", "0", "important");
      });
    };

    const observer = new MutationObserver(forceFullScreen);

    const doInit = () => {
      const bp = (window as any).botpress;
      if (!bp) return;

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class"],
      });

      bp.on("webchat:initialized", () => {
        bp.open();
        [0, 100, 300, 600, 1000].forEach((ms) => setTimeout(forceFullScreen, ms));
      });
      bp.on("webchat:opened", () => {
        const placeholder = document.getElementById("chat-loading-placeholder");
        if (placeholder) placeholder.style.display = "none";
        [0, 100, 300].forEach((ms) => setTimeout(forceFullScreen, ms));
      });

      bp.init({
        botId: BOT_ID,
        clientId: CLIENT_ID,
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
        },
      });
    };

    injectScript = document.createElement("script");
    injectScript.src = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
    injectScript.async = false;
    injectScript.onload = doInit;
    document.body.appendChild(injectScript);

    return () => {
      observer.disconnect();
      document.body.classList.remove("full-screen-chat-active");
      if (injectScript && document.body.contains(injectScript)) document.body.removeChild(injectScript);
      if (configScript && document.body.contains(configScript)) document.body.removeChild(configScript);
      document.querySelectorAll(".bpWebchat, .bpFab, [id^='bp-web-widget']").forEach((el) => el.remove());
      if (typeof window !== "undefined") (window as any).botpress = undefined;
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh", width: "100vw", overflow: "hidden", background: "#0a0f1e" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: `${HEADER_HEIGHT}px`, minHeight: `${HEADER_HEIGHT}px`, flexShrink: 0, borderBottom: "1px solid rgba(255,255,255,0.1)", background: "#0d1428", position: "relative", zIndex: 10001 }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.7)", textDecoration: "none", padding: "8px 12px", borderRadius: "8px" }}>
          <ArrowLeft size={18} />
          <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Back to Website</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/logo.jpg" alt="FAST CFD Chatbot" style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", objectFit: "cover" }} />
          <h1 style={{ fontSize: "0.875rem", fontWeight: 600, margin: 0, color: "white" }}>FAST CFD FAQ Bot</h1>
        </div>
        <div style={{ width: "144px" }} />
      </header>

      <div style={{ flex: 1, width: "100%", position: "relative", background: "#070b17" }}>
        <div id="chat-loading-placeholder" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", color: "rgba(255,255,255,0.4)", pointerEvents: "none" }}>
          <img src="/logo.jpg" alt="Loading" className="animate-pulse" style={{ width: "64px", height: "64px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", objectFit: "cover" }} />
          <p style={{ fontSize: "0.875rem", letterSpacing: "0.05em" }}>Initializing CFD Assistant...</p>
        </div>
      </div>
    </div>
  );
}
