import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function HeroSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-pdfo-dark-grey mb-6">
          Every PDF tool you need in one place
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Every tool you need to work with PDFs at your fingertips. All are 100% FREE and easy to use! 
          Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="#tools">
            <Button
              size="lg"
              className="bg-pdfo-blue hover:bg-pdfo-blue-light text-white px-8 py-3"
            >
              Get Started
            </Button>
          </Link>
          <Link href="#features">
            <Button
              variant="outline"
              size="lg"
              className="border-pdfo-blue text-pdfo-blue hover:bg-pdfo-blue hover:text-white px-8 py-3"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
