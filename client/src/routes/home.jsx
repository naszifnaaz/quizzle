import { useEffect } from "react";
import { NavBar } from "../components/shared/navbar";
import { HeroSection } from "../components/home/hero-section";
import { FeaturesSection } from "../components/home/feature-section";
import { CreateQuizSection } from "../components/home/create-section";
import { PublishSection } from "../components/home/publish-section";
import { TakeQuizSection } from "../components/home/attempt-section";
import { CTASection } from "../components/home/cta-section";
import { Footer } from "../components/shared/footer";

export default function QuizBuilderLandingPage() {
  useEffect(() => {
    document.body.classList.add(
      "bg-gradient-to-br",
      "from-indigo-900",
      "to-purple-900",
      "text-white"
    );

    return () => {
      document.body.classList.remove(
        "bg-gradient-to-br",
        "from-indigo-900",
        "to-purple-900",
        "text-white"
      );
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <NavBar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CreateQuizSection />
        <PublishSection />
        <TakeQuizSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
