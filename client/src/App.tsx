import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import Home from "@/pages/home";
import ToolPage from "@/pages/tool-page";
import NotFound from "@/pages/not-found";

function Router() {
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/merge-pdf" component={() => <ToolPage toolType="merge-pdf" />} />
      <Route path="/split-pdf" component={() => <ToolPage toolType="split-pdf" />} />
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
      <Route component={NotFound} />
    </Switch>
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
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
