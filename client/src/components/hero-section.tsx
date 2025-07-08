import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-pdfo-dark-grey mb-6 leading-tight">
          Professional PDF Tools
          <br />
          <span className="text-pdfo-blue">Made Simple</span>
        </h1>
        <p className="text-lg lg:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Merge, split, convert, and edit your PDF files with our comprehensive suite of professional tools. Fast, secure, and completely free.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <Link href="#tools">
            <Button
              size="lg"
              className="bg-pdfo-blue hover:bg-pdfo-blue-light text-white px-8 py-4 text-lg font-medium rounded-lg w-full sm:w-auto"
            >
              Explore Tools
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="border-gray-300 text-gray-600 hover:bg-gray-50 px-8 py-4 text-lg font-medium rounded-lg w-full sm:w-auto"
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
