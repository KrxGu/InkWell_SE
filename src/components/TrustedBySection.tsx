import { Card } from "@/components/ui/card";

const TrustedBySection = () => {
  const companies = [
    { name: "Accenture", logo: "🏢" },
    { name: "Microsoft", logo: "🔷" },
    { name: "Adobe", logo: "🟥" },
    { name: "Salesforce", logo: "☁️" },
    { name: "IBM", logo: "🔵" },
    { name: "Oracle", logo: "🔴" },
  ];

  return (
    <section className="py-16 border-t border-border/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-lg mb-8">
            Trusted by leading companies worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {companies.map((company, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 group opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {company.logo}
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance metrics like Warp */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border border-primary/20 text-center">
            <div className="text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              #1
            </div>
            <div className="text-xl font-semibold text-foreground mb-2">
              Translation Accuracy
            </div>
            <div className="text-muted-foreground">
              Ranked highest in layout preservation benchmarks
            </div>
          </Card>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border border-accent/20 text-center">
            <div className="text-6xl font-bold text-accent mb-4">
              99%
            </div>
            <div className="text-xl font-semibold text-foreground mb-2">
              Format Retention
            </div>
            <div className="text-muted-foreground">
              Pixel-perfect layout preservation across all languages
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;