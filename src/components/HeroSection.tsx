import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Languages, Shield, Zap } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-dark flex items-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-purple opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 animate-glow">
              <Zap className="w-4 h-4" />
              Next-Generation PDF Translation
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
              Translate PDFs,
              <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent animate-glow">Preserve Perfection</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
              Revolutionary AI-powered translation that maintains exact formatting, fonts, 
              and visual elements across 100+ languages. Built for the modern enterprise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <Button variant="hero" size="lg" className="text-lg px-10 py-5 h-auto shadow-purple-glow hover:shadow-purple-glow">
                Start Translating <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-10 py-5 h-auto border-border/50 hover:border-primary/50 backdrop-blur-sm">
                Watch Demo
              </Button>
            </div>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-lg">Layout Preserved</div>
                  <div className="text-muted-foreground">Pixel-perfect formatting</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Languages className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-lg">100+ Languages</div>
                  <div className="text-muted-foreground">Including RTL & CJK</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-accent/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-accent/30">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-lg">Enterprise Security</div>
                  <div className="text-muted-foreground">SOC 2 compliant</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Illustration */}
          <div className="lg:block animate-slide-up">
            <div className="relative group">
              <img 
                src={heroIllustration} 
                alt="PDF Translation Process Illustration" 
                className="w-full h-auto rounded-3xl shadow-purple-glow group-hover:shadow-purple-glow transition-all duration-500 border border-primary/20"
              />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-hero rounded-2xl shadow-purple-glow animate-pulse-glow opacity-90"></div>
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-accent/30 backdrop-blur-sm rounded-2xl border border-accent/40 animate-float"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;