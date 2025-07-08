import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { getAllTools, getToolIcon } from "@/lib/tools-config";
import { trackEvent } from "@/lib/analytics";

export function ToolsGrid() {
  const tools = getAllTools();

  const handleToolClick = (toolId: string) => {
    trackEvent('tool_click', 'navigation', toolId);
  };

  return (
    <section id="tools" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-pdfo-dark-grey dark:text-white mb-4">Choose Your Tool</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Select from our comprehensive suite of professional PDF tools designed to handle all your document needs</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Link key={tool.id} href={tool.path}>
              <Card 
                className="tool-card cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-sm dark:bg-gray-700 dark:border-gray-600"
                onClick={() => handleToolClick(tool.id)}
              >
                <CardContent className="p-6">
                  <div className={`flex items-center justify-center w-16 h-16 rounded-xl mb-4 transition-colors ${tool.bgColor} group-hover:scale-110`}>
                    {getToolIcon(tool.id, tool.iconColor)}
                  </div>
                  <h3 className="text-lg font-semibold text-pdfo-dark-grey dark:text-white mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
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
