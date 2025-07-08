import { useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { ToolsGrid } from "@/components/tools-grid";
import { FeaturesSection } from "@/components/features-section";
import { SecuritySection } from "@/components/security-section";

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
        <SecuritySection />
      </main>
      <Footer />
    </div>
  );
}
