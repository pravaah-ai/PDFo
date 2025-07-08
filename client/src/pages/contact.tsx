import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Mail, MessageSquare, HelpCircle, Bug, Lightbulb, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We'd love to hear from you! Whether you have questions, feedback, or need support, 
            we're here to help make your PDF experience better.
          </p>
        </div>

        <div className="space-y-8">
          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-pdfo-blue hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <HelpCircle className="h-12 w-12 text-pdfo-blue mx-auto mb-2" />
                <CardTitle className="text-pdfo-blue">General Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Need help using our tools or have questions about features?
                </p>
                <Button 
                  className="bg-pdfo-blue hover:bg-pdfo-blue/90 text-white"
                  onClick={() => window.location.href = 'mailto:support@pdfo.com?subject=General Support - PDFo'}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  support@pdfo.com
                </Button>
              </CardContent>
            </Card>

            <Card className="border-red-500 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Bug className="h-12 w-12 text-red-500 mx-auto mb-2" />
                <CardTitle className="text-red-500">Bug Reports</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Found a bug or experiencing technical issues?
                </p>
                <Button 
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  onClick={() => window.location.href = 'mailto:bugs@pdfo.com?subject=Bug Report - PDFo'}
                >
                  <Bug className="h-4 w-4 mr-2" />
                  bugs@pdfo.com
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-500 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Lightbulb className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <CardTitle className="text-green-500">Feature Requests</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Have ideas for new features or improvements?
                </p>
                <Button 
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  onClick={() => window.location.href = 'mailto:feedback@pdfo.com?subject=Feature Request - PDFo'}
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  feedback@pdfo.com
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Business Inquiries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6" />
                <span>Business & Partnership Inquiries</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-pdfo-blue">Enterprise Solutions</h3>
                  <p className="text-gray-600 mb-4">
                    Interested in enterprise-level PDF processing solutions or API access? 
                    We'd love to discuss how PDFo can meet your business needs.
                  </p>
                  <Button 
                    variant="outline"
                    className="border-pdfo-blue text-pdfo-blue hover:bg-pdfo-blue hover:text-white"
                    onClick={() => window.location.href = 'mailto:business@pdfo.com?subject=Enterprise Inquiry - PDFo'}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    business@pdfo.com
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-purple-600">Partnerships</h3>
                  <p className="text-gray-600 mb-4">
                    Looking to integrate PDFo into your platform or explore partnership opportunities? 
                    Let's explore how we can work together.
                  </p>
                  <Button 
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                    onClick={() => window.location.href = 'mailto:partnerships@pdfo.com?subject=Partnership Inquiry - PDFo'}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    partnerships@pdfo.com
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Legal */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Legal Matters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Privacy Concerns</h3>
                  <p className="text-gray-600 mb-4">
                    Questions about our privacy practices, data protection, or exercising your rights 
                    under GDPR, CCPA, or India's DPDP Act?
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Email:</strong> privacy@pdfo.com<br/>
                    <strong>Response Time:</strong> 30 days (or as required by law)
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Legal & Compliance</h3>
                  <p className="text-gray-600 mb-4">
                    Legal inquiries, terms of service questions, or compliance-related matters.
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Email:</strong> legal@pdfo.com<br/>
                    <strong>Response Time:</strong> 3-5 business days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Response Times & Expectations */}
          <Card className="bg-blue-50 border-pdfo-blue">
            <CardHeader>
              <CardTitle className="text-pdfo-blue">What to Expect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Response Times</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• <strong>General Support:</strong> 24-48 hours</li>
                    <li>• <strong>Bug Reports:</strong> 2-4 hours (critical), 24-48 hours (general)</li>
                    <li>• <strong>Feature Requests:</strong> 3-5 business days</li>
                    <li>• <strong>Business Inquiries:</strong> 1-2 business days</li>
                    <li>• <strong>Privacy/Legal:</strong> As required by applicable law</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">How to Help Us Help You</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Include specific details about your issue</li>
                    <li>• Mention which tool you were using</li>
                    <li>• Describe what you expected vs. what happened</li>
                    <li>• Include your browser and operating system</li>
                    <li>• Attach screenshots if relevant (no personal content)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community & Social */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-6 w-6" />
                <span>Join Our Community</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Stay updated with the latest features, tips, and community discussions:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Newsletter</h3>
                  <p className="text-sm text-gray-600 mb-3">Get monthly updates and PDF tips</p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.location.href = 'mailto:newsletter@pdfo.com?subject=Newsletter Subscription'}
                  >
                    Subscribe
                  </Button>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Feature Updates</h3>
                  <p className="text-sm text-gray-600 mb-3">Be first to know about new tools</p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.location.href = 'mailto:updates@pdfo.com?subject=Feature Updates Subscription'}
                  >
                    Follow
                  </Button>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">User Stories</h3>
                  <p className="text-sm text-gray-600 mb-3">Share how PDFo helps you</p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.location.href = 'mailto:stories@pdfo.com?subject=PDFo User Story'}
                  >
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}