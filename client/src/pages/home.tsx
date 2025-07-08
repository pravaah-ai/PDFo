import { useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { ToolsGrid } from "@/components/tools-grid";
import { FeaturesSection } from "@/components/features-section";
import { DonateButton } from "@/components/donate-button";
import { trackPageView } from "@/lib/analytics";

export default function Home() {
  useEffect(() => {
    // Update meta tags for SEO
    document.title = "PDFo - Free Online PDF Tools | Merge, Split, Convert PDF Files";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Free online PDF tools to merge, split, compress, convert, and edit PDF files. Fast, secure, and easy to use PDF converter and editor.'
      );
    }

    // Track page view
    trackPageView('/');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ToolsGrid />
        <FeaturesSection />
        
        {/* Donate Section */}
        <section className="py-16 bg-pdfo-light-grey">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-pdfo-dark-grey mb-4">
              Support PDFo
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Help us keep these tools free and continuously improve them
            </p>
            <DonateButton size="lg" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
