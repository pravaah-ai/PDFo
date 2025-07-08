import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/SEOHead";
import { pagesData } from "@/lib/seo-data";
import { Shield, Clock, Trash2, Globe, Eye, Lock, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEOHead data={pagesData.privacy} />
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy & Data Protection
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Learn how PDFo protects your privacy and complies with global data protection laws
          </p>
        </div>

        <div className="space-y-6">
          {/* Quick Overview */}
          <Card className="border-pdfo-blue bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-pdfo-blue">
                <Shield className="h-6 w-6" />
                <span>Privacy at a Glance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Temporary Processing</p>
                  <p className="text-sm text-gray-600">Files auto-deleted after 1 hour</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Trash2 className="h-8 w-8 text-red-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Zero Permanent Storage</p>
                  <p className="text-sm text-gray-600">No documents saved long-term</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-8 w-8 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Global Compliance</p>
                  <p className="text-sm text-gray-600">GDPR, CCPA & DPDP compliant</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>What Data We Collect</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">File Processing Data</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• PDF files you upload for processing (temporarily stored only)</li>
                  <li>• File metadata (size, type, processing tool used)</li>
                  <li>• Processing status and error logs (for debugging)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Usage Analytics (Optional)</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Tool usage statistics (which PDF tools are used)</li>
                  <li>• Performance metrics (processing times, success rates)</li>
                  <li>• General location data (country/region only)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Legal Compliance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Legal Compliance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">GDPR (European Union)</h3>
                <p className="text-sm text-gray-600 mb-2">Under the General Data Protection Regulation, you have these rights:</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Right to access your personal data</li>
                  <li>• Right to rectification and erasure</li>
                  <li>• Right to data portability</li>
                  <li>• Right to withdraw consent at any time</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">CCPA (California)</h3>
                <p className="text-sm text-gray-600 mb-2">California residents have additional rights:</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Right to know what personal information is collected</li>
                  <li>• Right to delete personal information</li>
                  <li>• Right to opt-out of the sale of personal information</li>
                  <li>• Right to non-discrimination for exercising privacy rights</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">India DPDP Act (2023)</h3>
                <p className="text-sm text-gray-600 mb-2">Under India's Digital Personal Data Protection Act:</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Right to access and correction of personal data</li>
                  <li>• Right to data portability and erasure</li>
                  <li>• Right to grievance redressal</li>
                  <li>• Protection against automated decision-making</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Security Measures */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Security & Data Protection</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Technical Safeguards</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 25MB file size limit for security</li>
                    <li>• Encrypted file transmission (HTTPS)</li>
                    <li>• Automatic cleanup scheduler</li>
                    <li>• No permanent database storage</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Operational Safeguards</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Files processed in isolated environments</li>
                    <li>• Regular security audits and updates</li>
                    <li>• Minimal data collection practices</li>
                    <li>• Transparent privacy controls</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                If you have questions about our privacy practices or want to exercise your rights under applicable data protection laws, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm"><strong>Email:</strong> privacy@pdfo.com</p>
                <p className="text-sm"><strong>Response Time:</strong> 30 days (or as required by applicable law)</p>
                <p className="text-sm"><strong>Last Updated:</strong> July 2025</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}