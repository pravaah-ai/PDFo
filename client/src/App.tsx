import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminRoute } from "@/components/AdminRoute";

import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import Home from "@/pages/home";
import ToolPage from "@/pages/tool-page";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import About from "@/pages/about";
import Terms from "@/pages/terms";
import Contact from "@/pages/contact";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Dashboard from "@/pages/dashboard";
import Logout from "@/pages/logout";
import AdminLogin from "@/pages/admin/admin-login";
import AdminDashboard from "@/pages/admin/admin-dashboard";
import ToolsManagement from "@/pages/admin/tools-management";
import BlogManagement from "@/pages/admin/blog-management";
import FeedbackManagement from "@/pages/admin/feedback-management";
import SEOManagement from "@/pages/admin/seo-management";
import TagManagement from "@/pages/admin/tag-management";
import AdminSettings from "@/pages/admin/admin-settings";

// Component to scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  useAnalytics();
  
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
      <Route path="/merge-pdf" component={() => <ToolPage toolType="merge-pdf" />} />
      <Route path="/split-pdf" component={() => <ToolPage toolType="split-pdf" />} />
      <Route path="/tool/split-pdf" component={() => <ToolPage toolType="split-pdf" />} />
      <Route path="/delete-pdf-pages" component={() => <ToolPage toolType="delete-pdf-pages" />} />
      <Route path="/rotate-pdf" component={() => <ToolPage toolType="rotate-pdf" />} />
      <Route path="/watermark-pdf" component={() => <ToolPage toolType="watermark-pdf" />} />
      <Route path="/page-numbers-pdf" component={() => <ToolPage toolType="page-numbers-pdf" />} />
      <Route path="/pdf-editor" component={() => <ToolPage toolType="pdf-editor" />} />
      <Route path="/pdf-to-jpg" component={() => <ToolPage toolType="pdf-to-jpg" />} />
      <Route path="/pdf-to-png" component={() => <ToolPage toolType="pdf-to-png" />} />
      <Route path="/pdf-to-tiff" component={() => <ToolPage toolType="pdf-to-tiff" />} />
      <Route path="/pdf-to-json" component={() => <ToolPage toolType="pdf-to-json" />} />
      <Route path="/pdf-to-word" component={() => <ToolPage toolType="pdf-to-word" />} />
      <Route path="/pdf-to-ppt" component={() => <ToolPage toolType="pdf-to-ppt" />} />
      <Route path="/pdf-to-txt" component={() => <ToolPage toolType="pdf-to-txt" />} />
      <Route path="/pdf-to-excel" component={() => <ToolPage toolType="pdf-to-excel" />} />
      <Route path="/png-to-pdf" component={() => <ToolPage toolType="png-to-pdf" />} />
      <Route path="/word-to-pdf" component={() => <ToolPage toolType="word-to-pdf" />} />
      <Route path="/lock-pdf" component={() => <ToolPage toolType="lock-pdf" />} />
      <Route path="/unlock-pdf" component={() => <ToolPage toolType="unlock-pdf" />} />
      <Route path="/compress-pdf" component={() => <ToolPage toolType="compress-pdf" />} />
      <Route path="/reorder-pages" component={() => <ToolPage toolType="reorder-pages" />} />
      <Route path="/edit-metadata" component={() => <ToolPage toolType="edit-metadata" />} />
      <Route path="/excel-to-pdf" component={() => <ToolPage toolType="excel-to-pdf" />} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/about" component={About} />
      <Route path="/terms" component={Terms} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/logout" component={Logout} />
      <Route path="/dashboard" component={() => (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      )} />
      <Route path="/pdfo_pravaah_aite/login" component={AdminLogin} />
      <Route path="/pdfo_pravaah_aite" component={() => (
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      )} />
      <Route path="/pdfo_pravaah_aite/tools" component={() => (
        <AdminRoute>
          <ToolsManagement />
        </AdminRoute>
      )} />
      <Route path="/pdfo_pravaah_aite/blogs" component={() => (
        <AdminRoute>
          <BlogManagement />
        </AdminRoute>
      )} />
      <Route path="/pdfo_pravaah_aite/feedback" component={() => (
        <AdminRoute>
          <FeedbackManagement />
        </AdminRoute>
      )} />
      <Route path="/pdfo_pravaah_aite/seo" component={() => (
        <AdminRoute>
          <SEOManagement />
        </AdminRoute>
      )} />
      <Route path="/pdfo_pravaah_aite/tags" component={() => (
        <AdminRoute>
          <TagManagement />
        </AdminRoute>
      )} />
      <Route path="/pdfo_pravaah_aite/settings" component={() => (
        <AdminRoute>
          <AdminSettings />
        </AdminRoute>
      )} />
      <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <AdminProvider>
            <TooltipProvider>
              <Router />
              <Toaster />
            </TooltipProvider>
          </AdminProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
