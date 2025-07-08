import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-pink-200 via-pink-100 to-rose-100 py-20 lg:py-32 pb-40 lg:pb-60 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-rose-300 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-200 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-rose-200 rounded-full blur-xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl lg:text-6xl font-bold text-pdfo-dark-grey mb-6 leading-tight">
          Professional PDF Tools
          <br />
          <span className="text-pdfo-blue">Made Simple</span>
        </h1>
        <p className="text-lg lg:text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
          Merge, split, convert, and edit your PDF files with our comprehensive suite of professional tools. Fast, secure, and completely free.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <Link href="#tools">
            <Button
              size="lg"
              className="bg-pdfo-blue hover:bg-pdfo-blue-light text-white px-8 py-4 text-lg font-medium rounded-lg w-full sm:w-auto shadow-lg"
            >
              Explore Tools
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="border-gray-400 text-gray-700 hover:bg-white/50 px-8 py-4 text-lg font-medium rounded-lg w-full sm:w-auto bg-white/30 backdrop-blur-sm"
            asChild
          >
            <a
              href="https://buymeacoffee.com/pravaah"
              target="_blank"
              rel="noopener noreferrer"
            >
              ☕ Support Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
