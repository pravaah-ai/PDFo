import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAdmin } from "@/contexts/AdminContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { 
  Menu, 
  Home, 
  FileText, 
  MessageSquare, 
  Settings, 
  Users,
  TrendingUp,
  Activity,
  Plus,
  Edit3,
  Tag,
  Search,
  Shield,
  LogOut
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const { user } = useAdmin();
  const [, setLocation] = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/pdfo_pravaah_aite", icon: Home },
    { name: "Tool Management", href: "/pdfo_pravaah_aite/tools", icon: FileText },
    { name: "Blog Manager", href: "/pdfo_pravaah_aite/blogs", icon: Edit3 },
    { name: "SEO Manager", href: "/pdfo_pravaah_aite/seo", icon: Search },
    { name: "Tag Management", href: "/pdfo_pravaah_aite/tags", icon: Tag },
    { name: "Feedback", href: "/pdfo_pravaah_aite/feedback", icon: MessageSquare },
    { name: "Settings", href: "/pdfo_pravaah_aite/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLocation("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (href: string) => {
    if (href === "/pdfo_pravaah_aite") return location === "/pdfo_pravaah_aite";
    return location.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-2 p-6 border-b">
        <Shield className="h-8 w-8 text-pdfo-blue" />
        <div>
          <h2 className="text-lg font-semibold">Admin Panel</h2>
          <p className="text-sm text-gray-500">PDFo Management</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive(item.href) ? "default" : "ghost"}
                className="w-full justify-start"
                size="sm"
              >
                <Icon className="h-4 w-4 mr-2" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-pdfo-blue rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.email}</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-white lg:dark:bg-gray-800 lg:border-r lg:border-gray-200 lg:dark:border-gray-700">
        <SidebarContent />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-pdfo-blue" />
          <h1 className="text-lg font-semibold">Admin Panel</h1>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 overflow-auto">
        {children}
      </div>
    </div>
  );
}