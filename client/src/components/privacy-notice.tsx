import { Shield, Clock, Trash2, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PrivacyNotice() {
  return (
    <Card className="mb-6 border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-pdfo-blue">
          <Shield className="h-5 w-5" />
          <span>Privacy & Data Protection</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start space-x-2">
            <Clock className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-800">Temporary Processing</p>
              <p className="text-gray-600">Files deleted automatically after 1 hour</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Trash2 className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-800">No Permanent Storage</p>
              <p className="text-gray-600">Your documents are never saved permanently</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Globe className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-800">Global Compliance</p>
              <p className="text-gray-600">GDPR, CCPA & India DPDP Act compliant</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-700 bg-white p-3 rounded border-l-4 border-pdfo-blue">
          <strong>Your Privacy Rights:</strong> Under GDPR, CCPA, and India's DPDP Act (2023), you have the right to know what data we collect, 
          request deletion, and control how your information is used. PDFo processes files locally with no permanent storage, 
          ensuring maximum privacy protection. File size limit: 25MB for optimal processing speed and security.
        </p>
      </CardContent>
    </Card>
  );
}