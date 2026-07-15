import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/chat")({
  component: ChatRoute,
});

function ChatRoute() {
  useEffect(() => {
    document.body.classList.add("full-screen-chat-active");

    // Inject the Botpress scripts on mount
    const injectScript = document.createElement("script");
    injectScript.src = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
    injectScript.async = true;
    document.body.appendChild(injectScript);

    const configScript = document.createElement("script");
    configScript.src = "https://files.bpcontent.cloud/2026/07/14/10/20260714101910-9DIHQS5L.js";
    configScript.async = true;
    document.body.appendChild(configScript);

    return () => {
      document.body.classList.remove("full-screen-chat-active");
      
      // Cleanup scripts on unmount to prevent double rendering if user navigates back and forth
      if (document.body.contains(injectScript)) {
        document.body.removeChild(injectScript);
      }
      if (document.body.contains(configScript)) {
        document.body.removeChild(configScript);
      }
      
      // Remove any botpress injected styles or elements that it adds to head/body
      const container = document.getElementById("bp-embedded-webchat");
      if (container) {
        container.innerHTML = '';
      }
      
      // Clean up global to force fresh initialization on next visit
      if (typeof window !== 'undefined') {
        (window as any).botpress = undefined;
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-[#0a0f1e] text-foreground">
      {/* Header section */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d1428] shadow-md z-10 shrink-0">
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
        
        <div className="w-32">{/* Empty spacer for flex alignment */}</div>
      </header>

      {/* Chat Container where Botpress will render */}
      <div id="bp-embedded-webchat" className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center bg-black/20">
         {/* Loading placeholder before botpress takes over */}
         <div className="flex flex-col items-center gap-4 text-white/50 animate-pulse">
            <img src="/logo.jpg" alt="Loading" className="w-16 h-16 rounded-full border border-white/10 object-cover" />
            <p className="tracking-wide">Initializing CFD Assistant...</p>
         </div>
      </div>
    </div>
  );
}
