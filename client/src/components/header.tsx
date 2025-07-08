import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Coffee, Menu, User, LogIn } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import logoPng from "@assets/logo_1751964519607.png";

export function Header() {
  const [location] = useLocation();
  const { user, loading } = useAuth();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/#tools" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy", href: "/privacy" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <svg 
                width="120" 
                height="40" 
                viewBox="0 0 120 40" 
                className="h-10 w-auto"
                aria-label="PDFo Logo"
              >
                <defs>
                  <linearGradient id="pdfBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#0066cc', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#0052a3', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                
                {/* Lightning bolt icon */}
                <path
                  d="M8 8 L20 8 L20 16 L28 16 L16 32 L16 20 L8 20 Z"
                  fill="url(#pdfBlue)"
                  stroke="white"
                  strokeWidth="1"
                />
                
                {/* P letter */}
                <path
                  d="M32 8 L32 32 L36 32 L36 22 L44 22 C48 22 50 20 50 16 C50 12 48 8 44 8 L32 8 Z M36 12 L44 12 C46 12 46 14 46 16 C46 18 46 18 44 18 L36 18 Z"
                  fill="url(#pdfBlue)"
                />
                
                {/* D letter */}
                <path
                  d="M54 8 L54 32 L62 32 C68 32 72 28 72 20 C72 12 68 8 62 8 L54 8 Z M58 12 L62 12 C66 12 68 14 68 20 C68 26 66 28 62 28 L58 28 Z"
                  fill="url(#pdfBlue)"
                />
                
                {/* F letter */}
                <path
                  d="M76 8 L76 32 L80 32 L80 22 L88 22 L88 18 L80 18 L80 12 L90 12 L90 8 L76 8 Z"
                  fill="url(#pdfBlue)"
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

          <div className="flex items-center space-x-6">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navigation.slice(1).map((item) => (
                item.href.startsWith('/#') ? (
                  <a 
                    key={item.name} 
                    href={item.href}
                    onClick={(e) => {
                      if (item.href === '/#tools' && window.location.pathname === '/') {
                        e.preventDefault();
                        const element = document.getElementById('tools');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    className={`transition-colors cursor-pointer text-sm font-medium ${
                      isActive(item.href)
                        ? "text-pdfo-blue"
                        : "text-gray-600 dark:text-gray-300 hover:text-pdfo-blue"
                    }`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link key={item.name} href={item.href}>
                    <span
                      className={`transition-colors cursor-pointer text-sm font-medium ${
                        isActive(item.href)
                          ? "text-pdfo-blue"
                          : "text-gray-600 dark:text-gray-300 hover:text-pdfo-blue"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                )
              ))}
            </nav>

            {/* Authentication Actions */}
            {!loading && (
              <div className="hidden lg:flex items-center space-x-4">
                {user ? (
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button size="sm">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    item.href.startsWith('/#') ? (
                      <a 
                        key={item.name} 
                        href={item.href}
                        onClick={(e) => {
                          if (item.href === '/#tools' && window.location.pathname === '/') {
                            e.preventDefault();
                            const element = document.getElementById('tools');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }
                        }}
                        className={`block px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                          isActive(item.href)
                            ? "text-pdfo-blue bg-blue-50 dark:bg-blue-900/20 font-medium"
                            : "text-pdfo-dark-grey dark:text-gray-300 hover:text-pdfo-blue hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link key={item.name} href={item.href}>
                        <span
                          className={`block px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                            isActive(item.href)
                              ? "text-pdfo-blue bg-blue-50 dark:bg-blue-900/20 font-medium"
                              : "text-pdfo-dark-grey dark:text-gray-300 hover:text-pdfo-blue hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          {item.name}
                        </span>
                      </Link>
                    )
                  ))}
                  
                  {/* Mobile Authentication Links */}
                  {!loading && (
                    <div className="border-t pt-4 mt-4">
                      {user ? (
                        <div className="space-y-2">
                          <Link href="/dashboard">
                            <span className="block px-4 py-2 rounded-lg transition-colors cursor-pointer text-pdfo-dark-grey dark:text-gray-300 hover:text-pdfo-blue hover:bg-gray-50 dark:hover:bg-gray-800">
                              <User className="h-4 w-4 mr-2 inline" />
                              Dashboard
                            </span>
                          </Link>
                          <Link href="/logout">
                            <span className="block px-4 py-2 rounded-lg transition-colors cursor-pointer text-pdfo-dark-grey dark:text-gray-300 hover:text-pdfo-blue hover:bg-gray-50 dark:hover:bg-gray-800">
                              Logout
                            </span>
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Link href="/login">
                            <span className="block px-4 py-2 rounded-lg transition-colors cursor-pointer text-pdfo-dark-grey dark:text-gray-300 hover:text-pdfo-blue hover:bg-gray-50 dark:hover:bg-gray-800">
                              <LogIn className="h-4 w-4 mr-2 inline" />
                              Login
                            </span>
                          </Link>
                          <Link href="/signup">
                            <span className="block px-4 py-2 rounded-lg transition-colors cursor-pointer text-pdfo-dark-grey dark:text-gray-300 hover:text-pdfo-blue hover:bg-gray-50 dark:hover:bg-gray-800">
                              Sign Up
                            </span>
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
