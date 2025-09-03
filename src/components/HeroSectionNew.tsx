import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Languages, Shield, Zap, Star, Globe, Clock } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const HeroSection = () => {
  const scrollToUpload = () => {
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/5 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20">
              <Zap className="w-4 h-4" />
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent font-semibold">
                Free • No Sign-up Required
              </span>
            </div>
            
            {/* Main headline */}
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Translate PDFs,
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                Preserve
              </span>
              <br />
              Perfect Layout
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              Transform your documents with AI-powered translation that maintains exact formatting, 
              fonts, and visual elements across <span className="font-semibold text-primary">100+ languages</span>. 
              No registration needed - just upload and translate.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                onClick={scrollToUpload}
                size="lg" 
                className="text-lg px-8 py-6 h-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <FileText className="w-5 h-5 mr-2" />
                Try It Free Now 
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 h-auto border-2 hover:bg-primary/5 transition-all duration-300"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Globe className="w-5 h-5 mr-2" />
                See How It Works
              </Button>
            </div>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Layout Preserved</h3>
                  <p className="text-xs text-muted-foreground">Perfect formatting</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Languages className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">100+ Languages</h3>
                  <p className="text-xs text-muted-foreground">Global support</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Fast & Secure</h3>
                  <p className="text-xs text-muted-foreground">Enterprise-grade</p>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Illustration */}
          <div className="relative animate-fade-in-delayed">
            <div className="relative">
              {/* Floating elements */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-bounce">
                <Languages className="w-8 h-8 text-primary" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center animate-bounce delay-300">
                <FileText className="w-10 h-10 text-accent" />
              </div>
              
              {/* Main illustration */}
              <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border border-border/20">
                <img 
                  src={heroIllustration} 
                  alt="PDF Translation Illustration" 
                  className="w-full h-auto max-w-md mx-auto transform hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-3xl pointer-events-none"></div>
              </div>
              
              {/* Progress indicator mockup */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3 border border-border/20 shadow-lg">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">Translating to Spanish...</span>
                  <span className="ml-auto text-primary font-medium">89%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1 mt-2">
                  <div className="bg-gradient-to-r from-primary to-primary/80 h-1 rounded-full w-[89%] transition-all duration-1000"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
