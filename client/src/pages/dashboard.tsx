import { useState, useEffect } from "react";
import { signOut, deleteUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLocation, Link } from "wouter";
import { 
  User, 
  LogOut, 
  Shield, 
  FileText, 
  MessageSquare, 
  Bug, 
  Mail,
  Trash2,
  Activity,
  Clock
} from "lucide-react";

// Tool configuration data
const toolsConfig = [
  // Organize Tools (1-7)
  { id: "merge-pdf", title: "Merge PDF", description: "Combines multiple PDFs into one", category: "Organize Tools" },
  { id: "split-pdf", title: "Split PDF", description: "Extract specific pages from a PDF", category: "Organize Tools" },
  { id: "rotate-pdf", title: "Rotate PDF", description: "Rotate pages in any direction", category: "Organize Tools" },
  { id: "delete-pages", title: "Delete Pages", description: "Remove unwanted pages from PDF", category: "Organize Tools" },
  { id: "reorder-pages", title: "Reorder Pages", description: "Reorganize pages in custom order", category: "Organize Tools" },
  { id: "add-page-numbers", title: "Add Page Numbers", description: "Insert page numbers with custom formatting", category: "Organize Tools" },
  { id: "add-watermark", title: "Add Watermark", description: "Add text or image watermarks", category: "Organize Tools" },
  
  // Edit Tools (8-9)
  { id: "edit-pdf", title: "Edit PDF", description: "Modify text, images, and annotations", category: "Edit Tools" },
  { id: "edit-metadata", title: "Edit Metadata", description: "Update PDF properties and information", category: "Edit Tools" },
  
  // Security & Optimization (10-12)
  { id: "lock-pdf", title: "Lock PDF", description: "Password protect your documents", category: "Security & Optimization" },
  { id: "unlock-pdf", title: "Unlock PDF", description: "Remove password protection", category: "Security & Optimization" },
  { id: "compress-pdf", title: "Compress PDF", description: "Reduce file size while maintaining quality", category: "Security & Optimization" },
  
  // Conversion Tools (13-20)
  { id: "pdf-to-word", title: "PDF to Word", description: "Convert PDF to editable Word document", category: "Conversion Tools" },
  { id: "pdf-to-excel", title: "PDF to Excel", description: "Extract data to Excel spreadsheet", category: "Conversion Tools" },
  { id: "pdf-to-powerpoint", title: "PDF to PowerPoint", description: "Convert PDF to presentation format", category: "Conversion Tools" },
  { id: "pdf-to-images", title: "PDF to Images", description: "Convert PDF pages to image files", category: "Conversion Tools" },
  { id: "pdf-to-text", title: "PDF to Text", description: "Extract text content from PDF", category: "Conversion Tools" },
  { id: "pdf-to-html", title: "PDF to HTML", description: "Convert PDF to web-friendly HTML", category: "Conversion Tools" },
  { id: "pdf-to-epub", title: "PDF to EPUB", description: "Convert PDF to e-book format", category: "Conversion Tools" },
  { id: "pdf-to-rtf", title: "PDF to RTF", description: "Convert PDF to Rich Text Format", category: "Conversion Tools" },
  
  // Other Formats to PDF (21-23)
  { id: "word-to-pdf", title: "Word to PDF", description: "Convert Word documents to PDF", category: "Other Formats to PDF" },
  { id: "excel-to-pdf", title: "Excel to PDF", description: "Convert Excel spreadsheets to PDF", category: "Other Formats to PDF" },
  { id: "images-to-pdf", title: "Images to PDF", description: "Combine images into a single PDF", category: "Other Formats to PDF" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    lastToolUsed: null as string | null,
    totalFilesProcessed: 0,
    sessionStartTime: Date.now()
  });

  useEffect(() => {
    // Load session stats from sessionStorage
    const savedStats = sessionStorage.getItem('pdfo-session-stats');
    if (savedStats) {
      try {
        setSessionStats(JSON.parse(savedStats));
      } catch (e) {
        console.error('Error parsing session stats:', e);
      }
    }
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setLocation("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await deleteUser(user);
      setLocation("/");
    } catch (error) {
      console.error("Account deletion failed:", error);
      // Handle re-authentication required error
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const getSessionDuration = () => {
    const duration = Date.now() - sessionStats.sessionStartTime;
    const minutes = Math.floor(duration / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  const groupedTools = toolsConfig.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof toolsConfig>);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back to PDFo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your personal dashboard for all PDF tools and account management
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Section */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Display Name</p>
                  <p className="font-medium">{user.displayName || "Not set"}</p>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Your account is private and secure</strong> — PDFo never stores your files.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleLogout}
                    disabled={loading}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {loading ? "Signing out..." : "Sign out"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full text-red-600 border-red-300 hover:bg-red-50"
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Session Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Session Info</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Session Duration</span>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{getSessionDuration()}</span>
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Files Processed</span>
                  <Badge variant="outline">{sessionStats.totalFilesProcessed}</Badge>
                </div>
                
                {sessionStats.lastToolUsed && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Last Tool Used</span>
                    <Badge variant="secondary">{sessionStats.lastToolUsed}</Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Privacy Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>We Respect Your Privacy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• PDFo never stores your uploaded files</li>
                  <li>• Everything is processed in real time</li>
                  <li>• Files are automatically deleted after processing</li>
                  <li>• We log nothing — you are completely anonymous</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Tools Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>PDF Tools</span>
                </CardTitle>
                <CardDescription>
                  Quick access to all 23 PDF processing tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(groupedTools).map(([category, tools]) => (
                    <div key={category}>
                      <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                        {category}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tools.map((tool) => (
                          <Card key={tool.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900 dark:text-white">
                                    {tool.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {tool.description}
                                  </p>
                                </div>
                                <Link href={`/${tool.id}`}>
                                  <Button size="sm" variant="outline">
                                    Open
                                  </Button>
                                </Link>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      {category !== "Other Formats to PDF" && <Separator className="mt-6" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Feedback Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Feedback</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center space-x-2"
                    onClick={() => window.open("mailto:support@pdfo.com?subject=Tool Suggestion", "_blank")}
                  >
                    <Mail className="h-4 w-4" />
                    <span>Suggest a Tool</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center space-x-2"
                    onClick={() => window.open("mailto:support@pdfo.com?subject=Bug Report", "_blank")}
                  >
                    <Bug className="h-4 w-4" />
                    <span>Report a Bug</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Footer Links */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4 justify-center text-sm">
                  <Link href="/privacy">
                    <span className="text-pdfo-blue hover:text-pdfo-blue/80 cursor-pointer">
                      Privacy Policy
                    </span>
                  </Link>
                  <Link href="/terms">
                    <span className="text-pdfo-blue hover:text-pdfo-blue/80 cursor-pointer">
                      Terms of Use
                    </span>
                  </Link>
                  <Link href="/contact">
                    <span className="text-pdfo-blue hover:text-pdfo-blue/80 cursor-pointer">
                      Contact Us
                    </span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4">
            <CardHeader>
              <CardTitle className="text-red-600">Delete Account</CardTitle>
              <CardDescription>
                This action cannot be undone. Are you sure you want to delete your account?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleDeleteAccount}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete Account"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}