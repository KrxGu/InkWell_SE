import { Languages } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Languages className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">InkWell Translate</span>
            </div>
            <p className="text-background/70 mb-4 max-w-md">
              Professional PDF translation that preserves perfect layout and formatting 
              across 100+ languages with enterprise-grade security.
            </p>
            <div className="text-sm text-background/50">
              © 2024 InkWell Translate. All rights reserved.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-background/70">
              <li><a href="#features" className="hover:text-background transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-background transition-colors">Pricing</a></li>
              <li><a href="#api" className="hover:text-background transition-colors">API</a></li>
              <li><a href="#integrations" className="hover:text-background transition-colors">Integrations</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-background/70">
              <li><a href="#docs" className="hover:text-background transition-colors">Documentation</a></li>
              <li><a href="#help" className="hover:text-background transition-colors">Help Center</a></li>
              <li><a href="#contact" className="hover:text-background transition-colors">Contact</a></li>
              <li><a href="#status" className="hover:text-background transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/50 text-sm">
          Built with ❤️ for global communication
        </div>
      </div>
    </footer>
  );
};

export default Footer;