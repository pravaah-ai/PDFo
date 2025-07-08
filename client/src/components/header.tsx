import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Coffee, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoPng from "@assets/logo_1751964519607.png";

export function Header() {
  const [location] = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/#tools" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <img src={logoPng} alt="PDFo Logo" className="h-8 w-auto" />
              <span className="text-2xl font-bold text-pdfo-dark-grey">PDFo</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span
                  className={`transition-colors cursor-pointer ${
                    isActive(item.href)
                      ? "text-pdfo-blue font-medium"
                      : "text-pdfo-dark-grey hover:text-pdfo-blue"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              asChild
              className="bg-pdfo-warning hover:bg-yellow-500 text-white"
            >
              <a
                href="https://buymeacoffee.com/pravaah"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Coffee className="mr-2 h-4 w-4" />
                Donate
              </a>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <span
                        className={`block px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                          isActive(item.href)
                            ? "text-pdfo-blue bg-blue-50 font-medium"
                            : "text-pdfo-dark-grey hover:text-pdfo-blue hover:bg-gray-50"
                        }`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
