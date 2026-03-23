import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoStrip from "@/components/LogoStrip";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CropInsights from "@/components/CropInsights";
import PredictionDashboard from "@/components/PredictionDashboard";
import HistorySection from "@/components/HistorySection";
import MarketTrends from "@/components/MarketTrends";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import { useLenis } from "@/hooks/use-lenis";

const Index = () => {
  useLenis();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <LoadingScreen />
      <Navbar />
      <HeroSection />
      <LogoStrip />
      <FeaturesSection />
      <HowItWorksSection />
      <CropInsights />
      <PredictionDashboard />
      <HistorySection />
      <MarketTrends />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
