import { Button } from "@/components/ui/button";
import { Shield, Lock, Trash2, Zap } from "lucide-react";

export function SecuritySection() {
  const securityFeatures = [
    {
      icon: Shield,
      title: "File Validation",
      description: "PDF verification",
      bgColor: "bg-green-500",
    },
    {
      icon: Lock,
      title: "Data Encryption", 
      description: "HTTPS secure",
      bgColor: "bg-blue-500",
    },
    {
      icon: Trash2,
      title: "Auto Deletion",
      description: "1 hour cleanup",
      bgColor: "bg-purple-500",
    },
    {
      icon: Zap,
      title: "GDPR Compliant",
      description: "Privacy by design",
      bgColor: "bg-orange-500",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Trusted & Secure
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Your security and privacy are protected by enterprise-grade measures
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {securityFeatures.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.bgColor} mb-4`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <Button
          variant="outline"
          size="lg"
          className="bg-slate-700 hover:bg-slate-800 text-white border-slate-700 px-8 py-3"
        >
          <Shield className="w-5 h-5 mr-2" />
          View Security Details
        </Button>
      </div>
    </section>
  );
}