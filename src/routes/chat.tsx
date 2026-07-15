import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/chat")({
  component: ChatRoute,
});

// Bot credentials
const BOT_ID = "31f8fc4e-5c59-43c7-b5fd-61cf7fa46507";
const CLIENT_ID = "46da5237-8f0b-471a-8997-2ddd0a08de39";

// Direct Botpress-hosted full-screen chat URL (iframe fallback)
const IFRAME_CHAT_URL = `https://cdn.botpress.cloud/webchat/v3.6/shareable.html?botId=${BOT_ID}&clientId=${CLIENT_ID}`;

function ChatRoute() {
  const [useIframeFallback, setUseIframeFallback] = useState(false);

  useEffect(() => {
    document.body.classList.add("full-screen-chat-active");

    // Timeout: if Botpress widget hasn't rendered in 5 seconds, switch to iframe
    const fallbackTimer = setTimeout(() => {
      const container = document.getElementById("bp-embedded-webchat");
      // Check if botpress rendered anything inside our container
      const hasContent = container && container.children.length > 1; // >1 because our placeholder is child[0]
      if (!hasContent) {
        setUseIframeFallback(true);
      }
    }, 5000);

    let injectScript: HTMLScriptElement | null = null;

    const doInit = () => {
      const bp = (window as any).botpress;
      if (!bp) return;

      bp.on("webchat:opened", () => {
        clearTimeout(fallbackTimer);
        const placeholder = document.getElementById("chat-loading-placeholder");
        if (placeholder) placeholder.style.display = "none";
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
          footer: "[⚡ by Botpress](https://botpress.com/?from=webchat)",
          stylesheet: `${window.location.origin}/botpress-override.css`,
        },
      });
    };

    if ((window as any).botpress) {
      doInit();
    } else {
      injectScript = document.createElement("script");
      injectScript.src = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
      injectScript.async = false;
      injectScript.onload = doInit;
      document.body.appendChild(injectScript);
    }

    return () => {
      clearTimeout(fallbackTimer);
      document.body.classList.remove("full-screen-chat-active");

      if (injectScript && document.body.contains(injectScript)) {
        document.body.removeChild(injectScript);
      }

      document.querySelectorAll("[id^='bp-web-widget']").forEach((el) => el.remove());
      document.querySelectorAll(".bpWebchat, .bpFab, .bp-widget-web").forEach((el) => el.remove());

      if (typeof window !== "undefined") {
        (window as any).botpress = undefined;
      }
    };
  }, []);

  return (
    <div
      className="flex flex-col bg-[#0a0f1e] text-foreground"
      style={{ height: "100dvh", width: "100vw", overflow: "hidden" }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 border-b border-white/10 bg-[#0d1428] shadow-md shrink-0"
        style={{ height: "64px", zIndex: 10000 }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft size={18} />
          <span className="font-medium text-sm">Back to Website</span>
        </Link>

        <div className="flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt="FAST CFD Chatbot"
            className="w-8 h-8 rounded-full border border-white/20 object-cover"
          />
          <h1 className="font-semibold text-white tracking-wide text-sm">
            FAST CFD FAQ Bot
          </h1>
        </div>

        <div className="w-36" />
      </header>

      {/* Chat area */}
      <div
        style={{
          flex: 1,
          width: "100%",
          height: "calc(100dvh - 64px)",
          position: "relative",
          background: "#070b17",
          overflow: "hidden",
        }}
      >
        {useIframeFallback ? (
          /* --- IFRAME FALLBACK: direct Botpress-hosted full-screen chat --- */
          <iframe
            src={IFRAME_CHAT_URL}
            title="FAST CFD FAQ Bot"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
            }}
            allow="microphone; camera"
          />
        ) : (
          /* --- PRIMARY: Botpress widget embedded in this div --- */
          <div
            id="bp-embedded-webchat"
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            {/* Loading placeholder */}
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
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.1)",
                  objectFit: "cover",
                }}
                className="animate-pulse"
              />
              <p style={{ fontSize: "0.875rem", letterSpacing: "0.05em" }}>
                Initializing CFD Assistant...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
