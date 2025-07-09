import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/SEOHead";
import { pagesData } from "@/lib/seo-data";
import { Mail, MessageSquare, HelpCircle, Bug, Lightbulb, Send, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  category: z.enum(["general", "bug", "feature", "business", "privacy"], {
    required_error: "Please select a category",
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      category: "general",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 24-48 hours.",
        });
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "general": return "General Support";
      case "bug": return "Bug Report";
      case "feature": return "Feature Request";
      case "business": return "Business Inquiry";
      case "privacy": return "Privacy Concern";
      default: return category;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "general": return <HelpCircle className="h-5 w-5" />;
      case "bug": return <Bug className="h-5 w-5" />;
      case "feature": return <Lightbulb className="h-5 w-5" />;
      case "business": return <MessageSquare className="h-5 w-5" />;
      case "privacy": return <Mail className="h-5 w-5" />;
      default: return <Mail className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEOHead data={pagesData.contact} />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="order-2 lg:order-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-pdfo-blue" />
                <span>Send us a message</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Thank you for contacting us. We'll get back to you within 24-48 hours.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Support</SelectItem>
                              <SelectItem value="bug">Bug Report</SelectItem>
                              <SelectItem value="feature">Feature Request</SelectItem>
                              <SelectItem value="business">Business Inquiry</SelectItem>
                              <SelectItem value="privacy">Privacy Concern</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Brief description of your inquiry" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please provide details about your inquiry..."
                              rows={6}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-pdfo-blue hover:bg-pdfo-blue/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Direct Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-pdfo-blue">Direct Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-pdfo-blue" />
                  <div>
                    <p className="font-medium">General Inquiries</p>
                    <a href="mailto:info@pdfo.io" className="text-pdfo-blue hover:underline">
                      info@pdfo.io
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <HelpCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Technical Support</p>
                    <a href="mailto:support@pdfo.io" className="text-pdfo-blue hover:underline">
                      support@pdfo.io
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Times */}
            <Card>
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">General Support:</span>
                    <span className="font-medium">24-48 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bug Reports:</span>
                    <span className="font-medium">2-4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Feature Requests:</span>
                    <span className="font-medium">3-5 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Business Inquiries:</span>
                    <span className="font-medium">1-2 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Help Us Help You</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Include specific details about your issue</li>
                  <li>• Mention which tool you were using</li>
                  <li>• Describe what you expected vs. what happened</li>
                  <li>• Include your browser and operating system</li>
                  <li>• Attach screenshots if relevant</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}