import { Link } from "wouter";
import logoPng from "@assets/logo_1751964519607.png";

export function Footer() {
  const pdfTools = [
    { name: "Merge PDF", href: "/merge-pdf" },
    { name: "Split PDF", href: "/split-pdf" },
    { name: "Rotate PDF", href: "/rotate-pdf" },
    { name: "Watermark PDF", href: "/watermark-pdf" },
  ];

  const converters = [
    { name: "PDF to Word", href: "/pdf-to-word" },
    { name: "PDF to Excel", href: "/pdf-to-excel" },
    { name: "PDF to JPG", href: "/pdf-to-jpg" },
    { name: "Word to PDF", href: "/word-to-pdf" },
  ];

  const support = [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="bg-pdfo-dark-grey text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/">
              <div className="flex items-center space-x-3 mb-4 cursor-pointer">
                <img src={logoPng} alt="PDFo Logo" className="h-8 w-auto" />
                <span className="text-xl font-bold">PDFo</span>
              </div>
            </Link>
            <p className="text-gray-400">
              Your complete PDF toolkit for all your document needs.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">PDF Tools</h4>
            <ul className="space-y-2 text-gray-400">
              {pdfTools.map((tool) => (
                <li key={tool.name}>
                  <Link href={tool.href}>
                    <span className="hover:text-white transition-colors cursor-pointer">
                      {tool.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Converters</h4>
            <ul className="space-y-2 text-gray-400">
              {converters.map((converter) => (
                <li key={converter.name}>
                  <Link href={converter.href}>
                    <span className="hover:text-white transition-colors cursor-pointer">
                      {converter.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              {support.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <span className="hover:text-white transition-colors cursor-pointer">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PDFo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
