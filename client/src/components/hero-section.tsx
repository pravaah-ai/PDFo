import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-blue-50 via-slate-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-pdfo-dark-grey dark:text-white mb-6 leading-tight">
          Professional PDF Tools
          <br />
          <span className="text-pdfo-blue">Made Simple</span>
        </h1>
        <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Merge, split, convert, and edit your PDF files with our comprehensive suite of professional tools. Fast, secure, and completely free.
        </p>
        <div className="max-w-sm mx-auto space-y-4">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium rounded-lg w-full shadow-sm"
            onClick={() => {
              const toolsSection = document.getElementById('tools');
              if (toolsSection) {
                toolsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Explore Tools
          </Button>
          
          <div className="flex justify-center">
            <a
              href="https://www.buymeacoffee.com/pravaahaitech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition-colors shadow-sm w-full justify-center"
            >
              <span className="mr-2">☕</span>
              Buy me a coffee
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
