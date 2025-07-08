import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Cookie, Shield, Info } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('pdfo-cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('pdfo-cookie-consent', 'all');
    setIsVisible(false);
    // Enable analytics if user accepts
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('pdfo-cookie-consent', 'essential');
    setIsVisible(false);
    // Keep analytics disabled for essential-only
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem('pdfo-cookie-consent', 'rejected');
    setIsVisible(false);
    // Disable all non-essential cookies
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="mx-auto max-w-4xl border-pdfo-blue shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cookie className="h-5 w-5 text-pdfo-blue" />
              <CardTitle className="text-lg">Cookie Preferences</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            We use cookies to enhance your experience on PDFo. Essential cookies are required for basic functionality, 
            while analytics cookies help us improve our service. Your data is processed in compliance with GDPR, CCPA, 
            and India's DPDP Act (2023).
          </p>

          {showDetails && (
            <div className="space-y-3 rounded-lg bg-gray-50 p-4 text-sm">
              <div className="flex items-start space-x-2">
                <Shield className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Essential Cookies</p>
                  <p className="text-gray-600">Required for basic site functionality and security. Cannot be disabled.</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Analytics Cookies</p>
                  <p className="text-gray-600">Help us understand how you use PDFo to improve our service. Can be disabled.</p>
                </div>
              </div>
              <div className="mt-3 p-3 bg-blue-50 rounded border-l-4 border-pdfo-blue">
                <p className="text-xs text-gray-700">
                  <strong>Privacy Compliance:</strong> We comply with GDPR (EU), CCPA (California), and India's DPDP Act 2023. 
                  Your data is processed securely and never stored permanently. Files are automatically deleted after processing.
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={handleAcceptAll}
              className="bg-pdfo-blue hover:bg-pdfo-blue/90 text-white"
            >
              Accept All
            </Button>
            <Button
              variant="outline"
              onClick={handleAcceptEssential}
              className="border-pdfo-blue text-pdfo-blue hover:bg-pdfo-blue hover:text-white"
            >
              Essential Only
            </Button>
            <Button
              variant="ghost"
              onClick={handleReject}
              className="text-gray-600 hover:bg-gray-100"
            >
              Reject All
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowDetails(!showDetails)}
              className="text-pdfo-blue hover:bg-blue-50"
            >
              {showDetails ? 'Hide' : 'Show'} Details
            </Button>
          </div>

          <p className="text-xs text-gray-500 pt-2">
            You can change your preferences anytime in our Privacy Settings. 
            <a href="/privacy" className="text-pdfo-blue hover:underline ml-1">Learn more</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}