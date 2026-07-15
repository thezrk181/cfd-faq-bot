import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, lazy, Suspense } from "react";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/chat")({
  component: ChatRoute,
});

const CLIENT_ID = "46da5237-8f0b-471a-8997-2ddd0a08de39";
const HEADER_HEIGHT = 64;

// Lazy-load Botpress so it only runs in the browser (never during SSR)
const BotpressChat = lazy(() =>
  import("@botpress/webchat").then((mod) => ({
    default: function BotpressInner() {
      const { Webchat, WebchatProvider } = mod;
      return (
        <WebchatProvider clientId={CLIENT_ID}>
          <Webchat
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 0,
              border: "none",
              boxShadow: "none",
            }}
          />
        </WebchatProvider>
      );
    },
  }))
);

function ChatRoute() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        width: "100vw",
        overflow: "hidden",
        background: "#0a0f1e",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          height: `${HEADER_HEIGHT}px`,
          minHeight: `${HEADER_HEIGHT}px`,
          flexShrink: 0,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          background: "#0d1428",
          zIndex: 10,
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
            padding: "8px 12px",
            borderRadius: "8px",
          }}
        >
          <ArrowLeft size={18} />
          <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
            Back to Website
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="/logo.jpg"
            alt="FAST CFD Chatbot"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              objectFit: "cover",
            }}
          />
          <h1
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              margin: 0,
              color: "white",
            }}
          >
            FAST CFD FAQ Bot
          </h1>
        </div>

        <div style={{ width: "144px" }} />
      </header>

      {/* Chat area — only rendered client-side to avoid SSR issues */}
      <div
        style={{
          flex: 1,
          width: "100%",
          height: `calc(100dvh - ${HEADER_HEIGHT}px)`,
          overflow: "hidden",
          position: "relative",
          background: "#070b17",
        }}
      >
        {mounted ? (
          <Suspense
            fallback={
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                <img
                  src="/logo.jpg"
                  alt="Loading"
                  className="animate-pulse"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.1)",
                    objectFit: "cover",
                  }}
                />
                <p style={{ fontSize: "0.875rem", letterSpacing: "0.05em" }}>
                  Initializing CFD Assistant...
                </p>
              </div>
            }
          >
            <BotpressChat />
          </Suspense>
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <img
              src="/logo.jpg"
              alt="Loading"
              className="animate-pulse"
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.1)",
                objectFit: "cover",
              }}
            />
            <p style={{ fontSize: "0.875rem", letterSpacing: "0.05em" }}>
              Initializing CFD Assistant...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
