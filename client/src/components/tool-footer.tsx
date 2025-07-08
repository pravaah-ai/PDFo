import { AdSenseAd } from "./adsense-ad";

export function ToolFooter() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Description */}
        <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-4xl mx-auto">
          PDFo is a free online PDF tool by Pravaah AI Tech. We respect your privacy—files are processed securely and automatically deleted after processing.
        </p>
        
        {/* Advertisement */}
        <div className="mb-8">
          <AdSenseAd 
            adSlot="your-ad-slot-id"
            adFormat="rectangle"
            className="mx-auto"
          />
        </div>
        
        {/* Copyright and Credits */}
        <p className="text-slate-400 text-base">
          © 2025 PDFo | Made with <span className="text-red-400">❤️</span> by Pravaah AI Tech
        </p>
      </div>
    </footer>
  );
}