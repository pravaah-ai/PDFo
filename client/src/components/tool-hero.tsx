import { getToolIcon } from "@/lib/tools-config";
import { Check } from "lucide-react";

interface ToolHeroProps {
  toolId: string;
  title: string;
  description: string;
  iconColor: string;
  bgColor: string;
}

export function ToolHero({ toolId, title, description, iconColor, bgColor }: ToolHeroProps) {
  const features = [
    "Fast Processing",
    "Secure & Private", 
    "Free to Use"
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Tool Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-500 mb-6">
          {getToolIcon(toolId, "text-white w-8 h-8")}
        </div>
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        
        {/* Description */}
        <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          {description}
        </p>
        
        {/* Features - Vertical List */}
        <div className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center justify-center gap-2">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                <Check className="w-3 h-3 text-green-500" />
              </div>
              <span className="text-gray-600 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}