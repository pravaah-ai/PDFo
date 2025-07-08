import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { getAllTools } from "@/lib/tools-config";
import { trackEvent } from "@/lib/analytics";

export function ToolsGrid() {
  const tools = getAllTools();

  const handleToolClick = (toolId: string) => {
    trackEvent('tool_click', 'navigation', toolId);
  };

  return (
    <section id="tools" className="py-16 bg-pdfo-light-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-pdfo-dark-grey mb-4">PDF Tools</h2>
          <p className="text-gray-600">Choose from our comprehensive suite of PDF tools</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Link key={tool.id} href={tool.path}>
              <Card 
                className="tool-card cursor-pointer group hover:shadow-lg transition-all duration-300"
                onClick={() => handleToolClick(tool.id)}
              >
                <CardContent className="p-6">
                  <div className={`flex items-center justify-center w-16 h-16 rounded-lg mb-4 transition-colors ${tool.bgColor}`}>
                    <i className={`${tool.icon} ${tool.iconColor} text-2xl`}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-pdfo-dark-grey mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
