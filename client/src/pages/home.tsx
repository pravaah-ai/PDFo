import { useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { ToolsGrid } from "@/components/tools-grid";
import { FeaturesSection } from "@/components/features-section";
import { DonateButton } from "@/components/donate-button";
import { AdSenseAd } from "@/components/adsense-ad";
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
        
        {/* AdSense Ad Section */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Advertisement</p>
            </div>
            <AdSenseAd 
              adSlot="1111111111"
              adFormat="auto"
              className="bg-white rounded-lg shadow-sm"
              style={{ minHeight: "300px", padding: "20px" }}
            />
          </div>
        </div>
        
        {/* Donate Section */}
        <div className="bg-yellow-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Support PDFo
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Keep PDFo free and ad-free for everyone!
              </p>
              <DonateButton size="lg" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
