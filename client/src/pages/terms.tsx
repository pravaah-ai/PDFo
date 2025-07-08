import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/SEOHead";
import { pagesData } from "@/lib/seo-data";
import { FileText, Shield, AlertCircle, Users, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEOHead data={pagesData.terms} />
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Please read these terms carefully before using PDFo
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <strong>Last Updated:</strong> July 2025
          </p>
        </div>

        <div className="space-y-6">
          {/* Quick Summary */}
          <Card className="border-pdfo-blue bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-pdfo-blue">
                <FileText className="h-6 w-6" />
                <span>Terms Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-semibold mb-1">Free Service</p>
                  <p className="text-gray-600">PDFo is provided free of charge for personal and commercial use</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">No Registration</p>
                  <p className="text-gray-600">Use all features without creating an account</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">File Privacy</p>
                  <p className="text-gray-600">Your files are processed securely and deleted automatically</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acceptance of Terms */}
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                By accessing and using PDFo ("the Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not 
                use this service.
              </p>
              <p className="text-gray-600">
                These Terms of Service apply to all users of the Service, including without limitation users 
                who are browsers, vendors, customers, merchants, and/or contributors of content.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle>2. Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                PDFo provides online PDF processing tools including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>PDF merging, splitting, and page manipulation</li>
                <li>PDF to image conversion (JPG, PNG, TIFF)</li>
                <li>Document format conversion (Word, Excel, PowerPoint to PDF)</li>
                <li>PDF security features (password protection, removal)</li>
                <li>PDF compression and optimization</li>
                <li>Text extraction and document editing</li>
              </ul>
              <p className="text-gray-600">
                All processing is performed on our servers with temporary file storage that is automatically 
                deleted after processing completion or after 1 hour, whichever comes first.
              </p>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>3. User Responsibilities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Acceptable Use</h3>
                <p className="text-gray-600 mb-3">You agree to use PDFo only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                  <li>Upload malicious, copyrighted, or illegal content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use the service to process extremely large files that could impact performance</li>
                  <li>Violate any applicable local, state, national, or international law</li>
                  <li>Reverse engineer or attempt to extract source code from our service</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">File Size Limits</h3>
                <p className="text-gray-600">
                  Files are limited to 25MB per file for optimal processing performance and security. 
                  Larger files will be rejected automatically.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Data Protection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>4. Privacy & Data Protection</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">File Processing</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                  <li>Files are processed temporarily and deleted automatically after 1 hour</li>
                  <li>We do not permanently store, access, or analyze your document content</li>
                  <li>All file transmission uses HTTPS encryption</li>
                  <li>Processing occurs in isolated, secure environments</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Analytics & Cookies</h3>
                <p className="text-gray-600">
                  We use minimal analytics to improve our service. You can opt-out of analytics cookies 
                  through our cookie consent banner. Essential cookies are required for basic functionality.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Compliance</h3>
                <p className="text-gray-600">
                  Our service complies with GDPR (EU), CCPA (California), and India's Digital Personal 
                  Data Protection Act (2023). See our Privacy Policy for detailed information.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>5. Disclaimers & Limitations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Service Availability</h3>
                <p className="text-gray-600">
                  We strive to maintain high availability but cannot guarantee uninterrupted service. 
                  We reserve the right to modify, suspend, or discontinue the service at any time.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Content Accuracy</h3>
                <p className="text-gray-600">
                  While we use advanced processing algorithms, we cannot guarantee perfect accuracy in 
                  all conversions and processing. Users should verify output quality for their specific needs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Limitation of Liability</h3>
                <p className="text-gray-600">
                  PDFo shall not be liable for any indirect, incidental, special, consequential, or punitive 
                  damages, including without limitation, loss of profits, data, use, goodwill, or other 
                  intangible losses.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Scale className="h-5 w-5" />
                <span>6. Intellectual Property</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Your Content</h3>
                <p className="text-gray-600">
                  You retain all rights to your uploaded files and processed documents. We claim no 
                  ownership over your content and delete it automatically after processing.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Our Service</h3>
                <p className="text-gray-600">
                  The PDFo service, including its design, functionality, and underlying technology, 
                  is protected by copyright and other intellectual property laws.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>7. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We reserve the right to modify these Terms of Service at any time. Changes will be 
                effective immediately upon posting. Your continued use of PDFo after changes constitutes 
                acceptance of the new terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>8. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm"><strong>Email:</strong> legal@pdfo.com</p>
                <p className="text-sm"><strong>Subject Line:</strong> Terms of Service Inquiry</p>
                <p className="text-sm"><strong>Response Time:</strong> 3-5 business days</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}