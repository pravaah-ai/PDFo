import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function HeroSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-pdfo-dark-grey mb-6 leading-tight">
          Professional PDF Tools
          <br />
          <span className="text-pdfo-blue">Made Simple</span>
        </h1>
        <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Merge, split, convert, and edit your PDF files with our comprehensive suite of professional tools. Fast, secure, and completely free.
        </p>
        <div className="max-w-sm mx-auto">
          <Link href="#tools">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-lg w-full shadow-sm"
            >
              Explore Tools
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
