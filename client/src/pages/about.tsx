import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/SEOHead";
import { pagesData } from "@/lib/seo-data";
import { Users, Target, Shield, Zap, Globe, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEOHead data={pagesData.about} />
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About PDFo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Your trusted companion for all PDF processing needs. We're committed to making document 
            management simple, secure, and accessible to everyone.
          </p>
        </div>

        <div className="space-y-8">
          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-pdfo-blue">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-pdfo-blue">
                  <Target className="h-6 w-6" />
                  <span>Our Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  To democratize PDF processing by providing free, secure, and powerful tools that 
                  anyone can use without technical expertise. We believe document management shouldn't 
                  be complicated or expensive.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-600">
                  <Heart className="h-6 w-6" />
                  <span>Our Values</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Privacy-first design, user-centric experience, and transparent operations. We process 
                  your documents with the highest security standards and never store them permanently.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* What Makes Us Different */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">What Makes PDFo Special</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-pdfo-blue mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Privacy by Design</h3>
                  <p className="text-sm text-gray-600">
                    Your files are processed securely and deleted automatically. We comply with GDPR, 
                    CCPA, and India's DPDP Act.
                  </p>
                </div>
                <div className="text-center">
                  <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-sm text-gray-600">
                    Advanced processing algorithms ensure your PDFs are handled quickly and efficiently, 
                    with real-time progress tracking.
                  </p>
                </div>
                <div className="text-center">
                  <Globe className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Always Available</h3>
                  <p className="text-sm text-gray-600">
                    Access our 23 PDF tools anytime, anywhere. No software installation required - 
                    just your browser and an internet connection.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Complete PDF Toolkit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-pdfo-blue">Organize & Structure</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Merge multiple PDFs into one document</li>
                    <li>• Split PDFs into separate files</li>
                    <li>• Remove unwanted pages easily</li>
                    <li>• Reorder pages with drag-and-drop</li>
                    <li>• Add page numbers and organize content</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-green-600">Convert & Transform</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Convert PDFs to images (JPG, PNG, TIFF)</li>
                    <li>• Transform PDFs to editable formats</li>
                    <li>• Create PDFs from Word, Excel, PowerPoint</li>
                    <li>• Extract text and data from documents</li>
                    <li>• Convert images to PDF format</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-purple-600">Secure & Protect</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Password protect sensitive documents</li>
                    <li>• Remove password protection safely</li>
                    <li>• Compress files to reduce size</li>
                    <li>• Add watermarks for brand protection</li>
                    <li>• Edit metadata and document properties</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-orange-600">Edit & Enhance</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Rotate pages to correct orientation</li>
                    <li>• Add annotations and comments</li>
                    <li>• Edit document properties</li>
                    <li>• Optimize for web viewing</li>
                    <li>• Batch process multiple files</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team & Technology */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-6 w-6" />
                <span>Built with Care</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                PDFo is developed by a team of passionate engineers who understand the daily challenges 
                of working with PDF documents. We've built PDFo using modern web technologies to ensure 
                reliability, security, and performance.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Technology Stack</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-pdfo-blue">Frontend</p>
                    <p className="text-gray-600">React, TypeScript, Tailwind CSS</p>
                  </div>
                  <div>
                    <p className="font-medium text-pdfo-blue">Backend</p>
                    <p className="text-gray-600">Node.js, Express, PDF-lib</p>
                  </div>
                  <div>
                    <p className="font-medium text-pdfo-blue">Security</p>
                    <p className="text-gray-600">HTTPS, Temporary Storage, Privacy Compliance</p>
                  </div>
                  <div>
                    <p className="font-medium text-pdfo-blue">Performance</p>
                    <p className="text-gray-600">Optimized Processing, Real-time Updates</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future Vision */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-pdfo-blue">
            <CardHeader>
              <CardTitle className="text-pdfo-blue">Our Commitment to You</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                We're continuously improving PDFo based on user feedback and evolving needs. Our roadmap includes:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <ul className="space-y-2">
                  <li>• Enhanced mobile experience</li>
                  <li>• Additional file format support</li>
                  <li>• Advanced editing capabilities</li>
                </ul>
                <ul className="space-y-2">
                  <li>• API access for developers</li>
                  <li>• Improved batch processing</li>
                  <li>• Better accessibility features</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Meet Our Team
          </h2>
          <div className="max-w-md mx-auto">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="mb-6">
                  <img 
                    src="/attached_assets/image_1751993053503.jpg" 
                    alt="Purvish Patel - Founder of Pravaah AI Tech"
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-500"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Purvish Patel
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                  Founder & Developer
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Khambhat, Gujarat, India
                </p>
                <div className="space-y-3 text-left">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Company:</strong> Pravaah AI Tech
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Purvish is the visionary founder of Pravaah AI Tech and the sole developer behind PDFo. 
                    With a passion for creating user-friendly digital tools, he has single-handedly built 
                    this comprehensive PDF processing platform to help users worldwide manage their documents 
                    efficiently and securely.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Based in Khambhat, Gujarat, Purvish combines technical expertise with entrepreneurial 
                    vision to deliver innovative solutions that simplify complex document workflows for 
                    millions of users.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}