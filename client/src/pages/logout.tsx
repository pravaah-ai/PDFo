import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useLocation } from "wouter";
import { Header } from "@/components/header";

export default function Logout() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        setLocation("/");
      } catch (error) {
        console.error("Logout failed:", error);
        setLocation("/");
      }
    };

    handleLogout();
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pdfo-blue mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Signing out...</p>
        </div>
      </div>
    </div>
  );
}