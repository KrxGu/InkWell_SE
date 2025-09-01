import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Languages, Shield, Zap } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-subtle flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Free • No Sign-up Required
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Translate PDFs,
              <span className="bg-gradient-hero bg-clip-text text-transparent"> Preserve</span>
              <br />
              Perfect Layout
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              Transform your documents with AI-powered translation that maintains exact formatting, 
              fonts, and visual elements across 100+ languages. No registration needed - just upload and translate.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4 h-auto">
                Try It Free Now <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
                See How It Works
              </Button>
            </div>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Layout Preserved</div>
                  <div className="text-sm text-muted-foreground">Pixel-perfect formatting</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Languages className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">100+ Languages</div>
                  <div className="text-sm text-muted-foreground">Including RTL & CJK</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-success" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Enterprise Security</div>
                  <div className="text-sm text-muted-foreground">SOC 2 compliant</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Illustration */}
          <div className="lg:block animate-slide-up">
            <div className="relative">
              <img 
                src={heroIllustration} 
                alt="PDF Translation Process Illustration" 
                className="w-full h-auto rounded-2xl shadow-floating"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-hero rounded-xl shadow-glow animate-pulse-glow opacity-80"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;