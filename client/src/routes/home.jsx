import { useEffect } from "react";
import { HeroSection } from "../components/home/hero-section";
import { FeaturesSection } from "../components/home/feature-section";
import { CreateQuizSection } from "../components/home/create-section";
import { PublishSection } from "../components/home/publish-section";
import { TakeQuizSection } from "../components/home/attempt-section";
import { CTASection } from "../components/home/cta-section";
import { Footer } from "../components/shared/footer";

export default function QuizBuilderLandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
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
