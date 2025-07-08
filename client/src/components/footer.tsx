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
              <img 
                src={logoPng} 
                alt="PDFo Logo" 
                className="h-12 w-auto"
                loading="eager"
                decoding="sync"
                fetchpriority="high"
                style={{ display: 'block' }}
              />
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
