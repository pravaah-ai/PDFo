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
    {
      icon: Shield,
      title: "Free Forever",
      description: "All our PDF tools are completely free to use with no hidden costs or subscription fees.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-6 mx-auto">
                <feature.icon className="text-pdfo-blue h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-pdfo-dark-grey mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
