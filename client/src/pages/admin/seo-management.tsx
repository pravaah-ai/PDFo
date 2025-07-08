import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Search, Globe, FileText } from "lucide-react";

interface SEOConfig {
  global: {
    siteName: string;
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string;
    favicon: string;
    ogImage: string;
    twitterCard: string;
    robotsTxt: string;
    canonicalBase: string;
  };
  pages: {
    [key: string]: {
      title: string;
      description: string;
      keywords: string;
      ogTitle: string;
      ogDescription: string;
      ogImage: string;
      canonical: string;
    };
  };
}

export default function SEOManagement() {
  const [seoConfig, setSeoConfig] = useState<SEOConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("global");

  const predefinedPages = [
    { key: "home", label: "Homepage", path: "/" },
    { key: "tools", label: "Tools Page", path: "/tools" },
    { key: "about", label: "About Page", path: "/about" },
    { key: "contact", label: "Contact Page", path: "/contact" },
    { key: "privacy", label: "Privacy Policy", path: "/privacy" },
    { key: "terms", label: "Terms of Service", path: "/terms" },
    { key: "login", label: "Login Page", path: "/login" },
    { key: "signup", label: "Sign Up Page", path: "/signup" },
    { key: "dashboard", label: "User Dashboard", path: "/dashboard" }
  ];

  useEffect(() => {
    fetchSEOConfig();
  }, []);

  const fetchSEOConfig = async () => {
    try {
      const docRef = doc(db, "seo_config", "main");
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setSeoConfig(docSnap.data() as SEOConfig);
      } else {
        // Initialize with default values
        const defaultConfig: SEOConfig = {
          global: {
            siteName: "PDFo - Free PDF Tools",
            defaultTitle: "PDFo - Free Online PDF Tools",
            defaultDescription: "Free online PDF tools to merge, split, compress, convert, and edit PDF files. Fast, secure, and easy to use.",
            defaultKeywords: "PDF tools, merge PDF, split PDF, compress PDF, convert PDF, edit PDF, free PDF tools",
            favicon: "/favicon.ico",
            ogImage: "/og-image.jpg",
            twitterCard: "summary_large_image",
            robotsTxt: "User-agent: *\nDisallow: /api/\nDisallow: /pdfo_pravaah_aite/\nSitemap: https://pdfo.com/sitemap.xml",
            canonicalBase: "https://pdfo.com"
          },
          pages: {}
        };
        
        setSeoConfig(defaultConfig);
      }
    } catch (error) {
      console.error("Error fetching SEO config:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!seoConfig) return;

    setSaving(true);
    try {
      const docRef = doc(db, "seo_config", "main");
      await setDoc(docRef, seoConfig);
      alert("SEO configuration saved successfully!");
    } catch (error) {
      console.error("Error saving SEO config:", error);
      alert("Error saving SEO configuration. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const updateGlobalSEO = (field: keyof SEOConfig['global'], value: string) => {
    if (!seoConfig) return;
    
    setSeoConfig({
      ...seoConfig,
      global: {
        ...seoConfig.global,
        [field]: value
      }
    });
  };

  const updatePageSEO = (pageKey: string, field: string, value: string) => {
    if (!seoConfig) return;
    
    setSeoConfig({
      ...seoConfig,
      pages: {
        ...seoConfig.pages,
        [pageKey]: {
          ...seoConfig.pages[pageKey],
          [field]: value
        }
      }
    });
  };

  const getPageSEO = (pageKey: string) => {
    return seoConfig?.pages[pageKey] || {
      title: "",
      description: "",
      keywords: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      canonical: ""
    };
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pdfo-blue"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              SEO Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage global SEO settings and page-specific meta tags
            </p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save All Changes"}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="global">Global SEO</TabsTrigger>
            <TabsTrigger value="pages">Page SEO</TabsTrigger>
            <TabsTrigger value="technical">Technical SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Global SEO Settings</span>
                </CardTitle>
                <CardDescription>
                  Default SEO settings that apply across the entire website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={seoConfig?.global.siteName || ""}
                      onChange={(e) => updateGlobalSEO("siteName", e.target.value)}
                      placeholder="PDFo - Free PDF Tools"
                    />
                  </div>
                  <div>
                    <Label htmlFor="canonicalBase">Canonical Base URL</Label>
                    <Input
                      id="canonicalBase"
                      value={seoConfig?.global.canonicalBase || ""}
                      onChange={(e) => updateGlobalSEO("canonicalBase", e.target.value)}
                      placeholder="https://pdfo.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="defaultTitle">Default Title</Label>
                  <Input
                    id="defaultTitle"
                    value={seoConfig?.global.defaultTitle || ""}
                    onChange={(e) => updateGlobalSEO("defaultTitle", e.target.value)}
                    placeholder="PDFo - Free Online PDF Tools"
                  />
                </div>

                <div>
                  <Label htmlFor="defaultDescription">Default Description</Label>
                  <Textarea
                    id="defaultDescription"
                    value={seoConfig?.global.defaultDescription || ""}
                    onChange={(e) => updateGlobalSEO("defaultDescription", e.target.value)}
                    placeholder="Free online PDF tools to merge, split, compress, convert, and edit PDF files..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="defaultKeywords">Default Keywords</Label>
                  <Input
                    id="defaultKeywords"
                    value={seoConfig?.global.defaultKeywords || ""}
                    onChange={(e) => updateGlobalSEO("defaultKeywords", e.target.value)}
                    placeholder="PDF tools, merge PDF, split PDF, compress PDF"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ogImage">Open Graph Image URL</Label>
                    <Input
                      id="ogImage"
                      value={seoConfig?.global.ogImage || ""}
                      onChange={(e) => updateGlobalSEO("ogImage", e.target.value)}
                      placeholder="/og-image.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitterCard">Twitter Card Type</Label>
                    <select
                      id="twitterCard"
                      value={seoConfig?.global.twitterCard || ""}
                      onChange={(e) => updateGlobalSEO("twitterCard", e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="summary">Summary</option>
                      <option value="summary_large_image">Summary Large Image</option>
                      <option value="app">App</option>
                      <option value="player">Player</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pages" className="mt-6">
            <div className="space-y-4">
              {predefinedPages.map((page) => {
                const pageSEO = getPageSEO(page.key);
                return (
                  <Card key={page.key}>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="h-5 w-5" />
                        <span>{page.label}</span>
                        <span className="text-sm text-gray-500">({page.path})</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`${page.key}-title`}>Page Title</Label>
                          <Input
                            id={`${page.key}-title`}
                            value={pageSEO.title}
                            onChange={(e) => updatePageSEO(page.key, "title", e.target.value)}
                            placeholder={`${page.label} - PDFo`}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`${page.key}-canonical`}>Canonical URL</Label>
                          <Input
                            id={`${page.key}-canonical`}
                            value={pageSEO.canonical}
                            onChange={(e) => updatePageSEO(page.key, "canonical", e.target.value)}
                            placeholder={`https://pdfo.com${page.path}`}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor={`${page.key}-description`}>Meta Description</Label>
                        <Textarea
                          id={`${page.key}-description`}
                          value={pageSEO.description}
                          onChange={(e) => updatePageSEO(page.key, "description", e.target.value)}
                          placeholder={`Description for ${page.label}...`}
                          rows={2}
                        />
                      </div>

                      <div>
                        <Label htmlFor={`${page.key}-keywords`}>Keywords</Label>
                        <Input
                          id={`${page.key}-keywords`}
                          value={pageSEO.keywords}
                          onChange={(e) => updatePageSEO(page.key, "keywords", e.target.value)}
                          placeholder="specific, keywords, for, this, page"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`${page.key}-ogTitle`}>Open Graph Title</Label>
                          <Input
                            id={`${page.key}-ogTitle`}
                            value={pageSEO.ogTitle}
                            onChange={(e) => updatePageSEO(page.key, "ogTitle", e.target.value)}
                            placeholder={`${page.label} - PDFo`}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`${page.key}-ogImage`}>Open Graph Image</Label>
                          <Input
                            id={`${page.key}-ogImage`}
                            value={pageSEO.ogImage}
                            onChange={(e) => updatePageSEO(page.key, "ogImage", e.target.value)}
                            placeholder="/og-image.jpg"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="technical" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Technical SEO</span>
                </CardTitle>
                <CardDescription>
                  Configure robots.txt and other technical SEO settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="robotsTxt">Robots.txt Content</Label>
                  <Textarea
                    id="robotsTxt"
                    value={seoConfig?.global.robotsTxt || ""}
                    onChange={(e) => updateGlobalSEO("robotsTxt", e.target.value)}
                    placeholder="User-agent: *&#10;Disallow: /api/&#10;Disallow: /pdfo_pravaah_aite/&#10;Sitemap: https://pdfo.com/sitemap.xml"
                    rows={8}
                    className="font-mono"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    This content will be served at /robots.txt
                  </p>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h3 className="font-medium mb-2">SEO Best Practices</h3>
                  <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• Keep titles under 60 characters</li>
                    <li>• Keep descriptions under 160 characters</li>
                    <li>• Use unique titles and descriptions for each page</li>
                    <li>• Include relevant keywords naturally</li>
                    <li>• Always set canonical URLs to prevent duplicate content</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}