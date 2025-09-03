import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Cog, Download, Eye, FileText, Languages, CheckCircle, ArrowRight, Sparkles, Zap, Clock } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      step: 1,
      icon: Upload,
      title: "Upload Your PDF",
      description: "Drag and drop any PDF document. We support both digital PDFs and scanned documents with advanced OCR processing.",
      details: ["Supports up to 100MB files", "Digital and scanned PDFs", "Automatic format detection", "Secure file handling"],
      duration: "< 10 seconds",
      color: "bg-blue-500"
    },
    {
      step: 2,
      icon: Languages,
      title: "Select Languages",
      description: "Choose your source and target languages from 109+ supported languages including RTL, CJK, and Indic scripts.",
      details: ["Auto-detect source language", "109+ language pairs", "RTL & CJK script support", "Custom glossaries"],
      duration: "Instant",
      color: "bg-purple-500"
    },
    {
      step: 3,
      icon: Cog,
      title: "AI Processing",
      description: "Our enterprise AI extracts text, preserves layout, translates with context awareness, and rebuilds the PDF perfectly.",
      details: ["Neural text extraction", "Context-aware translation", "Layout preservation engine", "Quality validation"],
      duration: "30-120 seconds",
      color: "bg-green-500"
    },
    {
      step: 4,
      icon: Eye,
      title: "Quality Assurance",
      description: "Automated QA checks ensure translation accuracy and visual layout integrity before delivering your result.",
      details: ["Visual layout verification", "Translation quality scoring", "Formatting consistency", "Error detection"],
      duration: "< 15 seconds",
      color: "bg-orange-500"
    },
    {
      step: 5,
      icon: Download,
      title: "Download Result",
      description: "Get your translated PDF with perfect layout preservation, maintaining all original formatting and styling.",
      details: ["Pixel-perfect formatting", "Original fonts & styling", "Instant download", "Multiple format options"],
      duration: "Instant",
      color: "bg-indigo-500"
    }
  ];

  const showcaseFeatures = [
    {
      icon: FileText,
      title: "Layout Intelligence",
      description: "Advanced algorithms detect and preserve complex layouts including tables, forms, charts, and multi-column text with precision.",
      highlight: "99.9% accuracy"
    },
    {
      icon: Languages,
      title: "Script Expertise",
      description: "Specialized handling for Arabic, Hebrew, Chinese, Japanese, Korean, and Indic scripts with proper directionality and cultural context.",
      highlight: "40+ scripts"
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description: "Multi-layer QA including visual diff analysis, overflow detection, terminology consistency, and automated review workflows.",
      highlight: "Enterprise grade"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
            <Zap className="w-4 h-4" />
            Simple Process
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-6">
            How InkWell Translate Works
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our enterprise AI-powered pipeline ensures perfect translation while maintaining your document's 
            original formatting, fonts, and visual appeal with industry-leading accuracy.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLastStep = index === steps.length - 1;
              
              return (
                <div key={step.step} className="relative group">
                  {/* Connection Line */}
                  {!isLastStep && (
                    <div className="hidden lg:block absolute top-8 left-full w-6 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 z-0" />
                  )}
                  
                  <Card className="relative z-10 p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-blue-50">
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {step.step}
                      </div>
                      <Badge variant="secondary" className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.duration}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Feature details */}
                    <div className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Showcase Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {showcaseFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                {feature.highlight && (
                  <Badge variant="secondary" className="mb-3">
                    {feature.highlight}
                  </Badge>
                )}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="inline-block p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl border-0">
            <div className="flex items-center gap-4">
              <Sparkles className="w-12 h-12" />
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-2">Ready to Experience Perfect Translation?</h3>
                <p className="text-blue-100 mb-4">Start translating your PDFs with zero setup required</p>
                <div className="flex items-center gap-2 text-lg font-medium cursor-pointer hover:text-blue-100 transition-colors">
                  Try It Free Now <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;