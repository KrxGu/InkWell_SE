import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Languages, 
  Shield, 
  Zap, 
  Eye, 
  Settings, 
  Users, 
  BarChart3,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

const FeaturesSection = () => {
  const features = [
    {
      icon: FileText,
      title: "Perfect Layout Preservation",
      description: "Maintains exact formatting, fonts, images, and visual elements with pixel-perfect accuracy across all document types.",
      color: "primary",
      badge: "Core Feature",
      stats: "99.9% accuracy"
    },
    {
      icon: Languages,
      title: "109+ Language Pairs",
      description: "Comprehensive support for Latin, Indic, RTL, and CJK scripts with intelligent script detection and bidirectional text handling.",
      color: "accent",
      badge: "Popular",
      stats: "40+ new languages"
    },
    {
      icon: Eye,
      title: "Advanced OCR Engine",
      description: "Automatically detects and processes scanned documents with confidence scoring and layout reconstruction.",
      color: "success",
      badge: "AI Powered",
      stats: "95% OCR accuracy"
    },
    {
      icon: Sparkles,
      title: "Enterprise Translation",
      description: "Advanced MT engines with glossary enforcement, translation memory, and context-aware translations.",
      color: "warning",
      badge: "Pro Feature",
      stats: "Neural MT"
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "SOC 2 compliant infrastructure with end-to-end encryption, audit trails, and data residency controls.",
      color: "primary",
      badge: "Enterprise",
      stats: "SOC 2 Type II"
    },
    {
      icon: Settings,
      title: "Advanced Workflow Controls",
      description: "Custom glossaries, translation memories, style guides, and approval workflows for enterprise-grade consistency.",
      color: "accent",
      badge: "Workflow",
      stats: "Custom workflows"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Comprehensive insights into translation quality, processing times, cost analysis, and team productivity metrics.",
      color: "success",
      badge: "Insights",
      stats: "Real-time data"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Multi-user workspaces with role-based access, project management, and collaborative review workflows.",
      color: "warning",
      badge: "Teams",
      stats: "Unlimited users"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Layout Accuracy", icon: CheckCircle },
    { value: "109+", label: "Languages", icon: Languages },
    { value: "10x", label: "Faster Processing", icon: Zap },
    { value: "SOC 2", label: "Security Certified", icon: Shield }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: "bg-blue-50 border-blue-200 text-blue-700",
      accent: "bg-purple-50 border-purple-200 text-purple-700", 
      success: "bg-green-50 border-green-200 text-green-700",
      warning: "bg-orange-50 border-orange-200 text-orange-700"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            Powerful Features
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Everything You Need for Perfect PDF Translation
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Professional-grade translation technology that preserves your document's integrity 
            while delivering accurate, contextual translations at enterprise scale.
          </p>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="text-center group hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <Card 
                key={index} 
                className="group relative p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white overflow-hidden"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Icon and Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                      getColorClasses(feature.color)
                    )}>
                      <Icon className="w-7 h-7" />
                    </div>
                    {feature.badge && (
                      <Badge variant="secondary" className="text-xs font-medium">
                        {feature.badge}
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  {/* Stats */}
                  {feature.stats && (
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                      <Star className="w-4 h-4" />
                      {feature.stats}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="inline-block p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white shadow-2xl border-0">
            <div className="flex items-center gap-4 max-w-lg">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
                <p className="text-blue-100 mb-4">Transform your PDFs with AI-powered translation</p>
                <div className="flex items-center gap-2 text-sm font-medium text-white hover:text-blue-100 transition-colors cursor-pointer">
                  Try it free now <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;