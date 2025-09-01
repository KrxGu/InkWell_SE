import { Card } from "@/components/ui/card";
import { Upload, Cog, Download, Eye, FileText, Languages, CheckCircle } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      step: 1,
      icon: Upload,
      title: "Upload Your PDF",
      description: "Drag and drop any PDF document. We support both digital PDFs and scanned documents with OCR processing.",
      details: ["Supports up to 100MB files", "Digital and scanned PDFs", "Automatic format detection"]
    },
    {
      step: 2,
      icon: Languages,
      title: "Select Languages",
      description: "Choose your source and target languages from 100+ supported languages including RTL and CJK scripts.",
      details: ["Auto-detect source language", "100+ language pairs", "RTL & CJK script support"]
    },
    {
      step: 3,
      icon: Cog,
      title: "AI Processing",
      description: "Our advanced AI extracts text, preserves layout, translates with context, and rebuilds the PDF perfectly.",
      details: ["Text extraction & analysis", "Context-aware translation", "Layout preservation engine"]
    },
    {
      step: 4,
      icon: Eye,
      title: "Quality Check",
      description: "Automated QA checks ensure translation accuracy and layout integrity before delivering your result.",
      details: ["Visual layout verification", "Translation quality scoring", "Formatting consistency check"]
    },
    {
      step: 5,
      icon: Download,
      title: "Download Result",
      description: "Get your translated PDF with perfect layout preservation, ready to use immediately.",
      details: ["Pixel-perfect formatting", "Original fonts & styling", "Instant download"]
    }
  ];

  const showcaseFeatures = [
    {
      icon: FileText,
      title: "Layout Intelligence",
      description: "Advanced algorithms detect and preserve complex layouts including tables, forms, and multi-column text."
    },
    {
      icon: Languages,
      title: "Script Expertise", 
      description: "Specialized handling for Arabic, Hebrew, Chinese, Japanese, Korean, and Indic scripts with proper directionality."
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description: "Multi-layer QA including visual diff analysis, overflow detection, and terminology consistency checks."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How InkWell Translate Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our advanced AI-powered pipeline ensures perfect translation while maintaining your document's original formatting and visual appeal.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLastStep = index === steps.length - 1;
              
              return (
                <div key={step.step} className="relative">
                  <Card className="p-6 text-center shadow-document hover:shadow-floating transition-all duration-300">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    
                    <div className="space-y-1">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground">
                          • {detail}
                        </div>
                      ))}
                    </div>
                  </Card>
                  
                  {/* Connection arrow */}
                  {!isLastStep && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Technology Showcase */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {showcaseFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 text-center shadow-document">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Live Demo Preview */}
        <Card className="p-8 lg:p-12 shadow-floating">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              See It In Action
            </h3>
            <p className="text-lg text-muted-foreground">
              Watch how our technology transforms complex documents while preserving every detail
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
                <div className="font-medium text-foreground mb-1">Original PDF</div>
                <div className="text-sm text-muted-foreground">Complex layout with tables, images, and mixed formatting</div>
              </div>
              <div className="flex items-center justify-center py-4">
                <div className="text-2xl text-primary">↓</div>
              </div>
              <div className="p-4 bg-success/10 rounded-lg border-l-4 border-success">
                <div className="font-medium text-foreground mb-1">Translated PDF</div>
                <div className="text-sm text-muted-foreground">Perfect layout preservation with accurate translation</div>
              </div>
            </div>
            
            <div className="bg-gradient-primary rounded-xl p-6 text-white">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-white/90">Layout Accuracy</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold">100+</div>
                  <div className="text-white/80">Languages</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">10x</div>
                  <div className="text-white/80">Faster</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">SOC 2</div>
                  <div className="text-white/80">Compliant</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Free</div>
                  <div className="text-white/80">To Use</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default HowItWorksSection;