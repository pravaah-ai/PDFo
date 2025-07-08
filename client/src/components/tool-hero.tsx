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
    <section className="bg-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Tool Icon */}
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${bgColor}`}>
          {getToolIcon(toolId, iconColor + " w-7 h-7")}
        </div>
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {title}
        </h1>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed text-sm">
          {description}
        </p>
        
        {/* Features - Horizontal List */}
        <div className="flex items-center justify-center gap-6 mb-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <div className="flex items-center justify-center w-4 h-4 rounded-full bg-green-100">
                <Check className="w-2.5 h-2.5 text-green-500" />
              </div>
              <span className="text-gray-600 text-xs font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}