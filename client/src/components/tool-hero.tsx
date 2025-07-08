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
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Tool Icon */}
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 ${bgColor.replace('group-hover:bg-', 'hover:bg-')}`}>
          {getToolIcon(toolId, `${iconColor} w-10 h-10`)}
        </div>
        
        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-pdfo-dark-grey mb-4">
          {title}
        </h1>
        
        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        
        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}