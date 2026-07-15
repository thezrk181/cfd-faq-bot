import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Stats } from "@/components/Stats";
import { ChatSection } from "@/components/ChatSection";
import { Footer } from "@/components/Footer";
import { FloatingChatButton } from "@/components/FloatingChatButton";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Stats />
        <HowItWorks />
        <ChatSection />
      </main>
      <Footer />
      <FloatingChatButton />
    </div>
  );
}
