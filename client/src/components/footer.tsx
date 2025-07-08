import { Link } from "wouter";
import { Twitter, Linkedin, Facebook } from "lucide-react";
import logoPng from "@assets/logo_1751964519607.png";

export function Footer() {
  const pdfTools = [
    { name: "Merge PDF", href: "/merge-pdf" },
    { name: "Split PDF", href: "/split-pdf" },
    { name: "Convert PDF", href: "/pdf-to-word" },
    { name: "Edit PDF", href: "/rotate-pdf" },
    { name: "Compress PDF", href: "/compress-pdf" },
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Contact", href: "/contact" },
    { name: "Support Us", href: "https://buymeacoffee.com/pravaah" },
  ];

  return (
    <footer className="bg-slate-900 dark:bg-gray-950 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and Description */}
        <div className="mb-6">
          <Link href="/">
            <div className="mb-3 cursor-pointer">
              <svg 
                width="144" 
                height="48" 
                viewBox="0 0 120 40" 
                className="h-12 w-auto"
                aria-label="PDFo Logo"
              >
                <defs>
                  <linearGradient id="pdfBlueFooter" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#0066cc', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#0052a3', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                
                {/* Lightning bolt icon */}
                <path
                  d="M8 8 L20 8 L20 16 L28 16 L16 32 L16 20 L8 20 Z"
                  fill="url(#pdfBlueFooter)"
                  stroke="white"
                  strokeWidth="1"
                />
                
                {/* P letter */}
                <path
                  d="M32 8 L32 32 L36 32 L36 22 L44 22 C48 22 50 20 50 16 C50 12 48 8 44 8 L32 8 Z M36 12 L44 12 C46 12 46 14 46 16 C46 18 46 18 44 18 L36 18 Z"
                  fill="url(#pdfBlueFooter)"
                />
                
                {/* D letter */}
                <path
                  d="M54 8 L54 32 L62 32 C68 32 72 28 72 20 C72 12 68 8 62 8 L54 8 Z M58 12 L62 12 C66 12 68 14 68 20 C68 26 66 28 62 28 L58 28 Z"
                  fill="url(#pdfBlueFooter)"
                />
                
                {/* F letter */}
                <path
                  d="M76 8 L76 32 L80 32 L80 22 L88 22 L88 18 L80 18 L80 12 L90 12 L90 8 L76 8 Z"
                  fill="url(#pdfBlueFooter)"
                />
                
                {/* o letter */}
                <circle
                  cx="100"
                  cy="20"
                  r="8"
                  fill="#333333"
                  stroke="white"
                  strokeWidth="1"
                />
                <circle
                  cx="100"
                  cy="20"
                  r="4"
                  fill="white"
                />
              </svg>
            </div>
          </Link>
          <p className="text-slate-400 dark:text-gray-400 text-base max-w-2xl">
            Your complete PDF toolkit for all your document needs. Fast, secure, and completely free online PDF tools to merge, split, convert, and edit your PDF files with professional quality.
          </p>
          <p className="text-slate-400 dark:text-gray-400 text-sm mt-3">
            Proudly developed by <strong>Pravaah AI Tech</strong>
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-start space-x-4 mb-6">
          <a href="#" className="text-slate-400 hover:text-white transition-colors">
            <Facebook className="h-6 w-6" />
          </a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">
            <Linkedin className="h-6 w-6" />
          </a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">
            <Twitter className="h-6 w-6" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* PDF Tools Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">PDF Tools</h3>
            <ul className="space-y-3 text-slate-400">
              {pdfTools.map((tool) => (
                <li key={tool.name}>
                  <Link href={tool.href}>
                    <span className="hover:text-white transition-colors cursor-pointer text-base">
                      {tool.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Company</h3>
            <ul className="space-y-3 text-slate-400">
              {company.map((item) => (
                <li key={item.name}>
                  {item.href.startsWith('http') ? (
                    <a 
                      href={item.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors text-base"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link href={item.href}>
                      <span className="hover:text-white transition-colors cursor-pointer text-base">
                        {item.name}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 dark:border-gray-800 mt-6 pt-4 text-center">
          <p className="text-slate-400 dark:text-gray-400 text-sm">
            &copy; 2025 PDFo | Made with ❤️ by Pravaah AI Tech
          </p>
        </div>
      </div>
    </footer>
  );
}
