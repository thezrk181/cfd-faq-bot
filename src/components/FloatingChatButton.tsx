import { Link } from "@tanstack/react-router";

export function FloatingChatButton() {
  return (
    <Link
      to="/chat"
      aria-label="Open chat"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full btn-glow animate-pulse-ring overflow-hidden border border-white/20 hover:scale-105 transition-transform"
    >
      <img
        src="/logo.jpg"
        alt="Chatbot Avatar"
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback if image fails to load
          e.currentTarget.style.display = "none";
        }}
      />
    </Link>
  );
}
