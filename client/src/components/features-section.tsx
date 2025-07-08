import { Shield, Zap, Smartphone } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "100% Secure",
      description: "Your files are processed securely and deleted after processing. Your privacy is our priority.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process your PDF files in seconds with our optimized servers and advanced algorithms.",
    },
    {
      icon: Smartphone,
      title: "Works Everywhere",
      description: "Use PDFo on any device - desktop, tablet, or mobile. No installation required.",
    },
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-pdfo-dark-grey mb-4">
            Why Choose PDFo?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fast, secure, and completely free PDF tools designed for modern workflows
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-4 mx-auto">
                <feature.icon className="text-pdfo-blue text-2xl h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-pdfo-dark-grey mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
