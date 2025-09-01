import { Card } from "@/components/ui/card";
import { 
  FileText, 
  Languages, 
  Shield, 
  Zap, 
  Eye, 
  Settings, 
  Users, 
  BarChart3,
  Lock,
  Globe2,
  Sparkles,
  CheckCircle
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: FileText,
      title: "Layout Preservation",
      description: "Maintains exact formatting, fonts, images, and visual elements with pixel-perfect accuracy.",
      color: "primary"
    },
    {
      icon: Languages,
      title: "100+ Languages",
      description: "Support for Latin, Indic, RTL, and CJK scripts with intelligent script detection.",
      color: "accent"
    },
    {
      icon: Eye,
      title: "OCR Fallback",
      description: "Automatically detects and processes scanned documents with confidence scoring.",
      color: "success"
    },
    {
      icon: Sparkles,
      title: "AI-Powered Quality",
      description: "Advanced MT engines with glossary enforcement and translation memory.",
      color: "warning"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 compliant with end-to-end encryption and audit trails.",
      color: "primary"
    },
    {
      icon: Settings,
      title: "Advanced Controls",
      description: "Glossaries, translation memories, and style guides for consistent results.",
      color: "accent"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Layout Accuracy" },
    { value: "100+", label: "Languages" },
    { value: "10x", label: "Faster Than Manual" },
    { value: "SOC 2", label: "Security Compliant" }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Powerful Features
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Everything You Need for Perfect PDF Translation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional-grade translation technology that preserves your document's integrity 
            while delivering accurate, contextual translations.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorMap = {
              primary: "text-primary bg-primary/10",
              accent: "text-accent bg-accent/10", 
              success: "text-success bg-success/10",
              warning: "text-warning bg-warning/10"
            };
            
            return (
              <Card key={index} className="p-6 shadow-document hover:shadow-floating transition-all duration-300 hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-xl ${colorMap[feature.color as keyof typeof colorMap]} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Technical Excellence */}
        <Card className="p-8 lg:p-12 shadow-floating bg-gradient-primary">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Technical Excellence
              </h3>
              <p className="text-white/90 text-lg mb-6 leading-relaxed">
                Built on cutting-edge PDF processing technology with enterprise-grade 
                scalability and security. Our architecture handles complex layouts, 
                multiple scripts, and large documents with ease.
              </p>
              <div className="space-y-3">
                {[
                  "PyMuPDF for precise text extraction",
                  "HarfBuzz for advanced typography",
                  "Real-time processing with WebSocket updates",
                  "Scalable worker architecture"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:text-right">
              <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="space-y-2">
                  <div className="text-white/70 text-sm">Processing Speed</div>
                  <div className="text-2xl font-bold text-white">1000+ pages/hour</div>
                </div>
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FeaturesSection;