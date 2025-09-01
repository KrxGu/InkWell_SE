import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import FeaturesSection from "@/components/FeaturesSection";
import TrustedBySection from "@/components/TrustedBySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <TrustedBySection />
        <UploadSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
