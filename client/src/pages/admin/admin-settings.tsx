import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Settings, Bell, Code, Globe } from "lucide-react";

interface AdminSettings {
  announcements: {
    enabled: boolean;
    message: string;
    type: "info" | "warning" | "success" | "error";
    showOnPages: string[];
  };
  popup: {
    enabled: boolean;
    title: string;
    content: string;
    showOnHomepage: boolean;
    showDelay: number;
    showOncePerSession: boolean;
  };
  footer: {
    companyDescription: string;
    socialLinks: {
      twitter: string;
      facebook: string;
      linkedin: string;
      instagram: string;
    };
    customText: string;
  };
  analytics: {
    googleAnalyticsId: string;
    facebookPixelId: string;
    enableCookieConsent: boolean;
  };
  maintenance: {
    enabled: boolean;
    message: string;
    allowedPaths: string[];
  };
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const docRef = doc(db, "admin_settings", "main");
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setSettings(docSnap.data() as AdminSettings);
      } else {
        // Initialize with default values
        const defaultSettings: AdminSettings = {
          announcements: {
            enabled: false,
            message: "",
            type: "info",
            showOnPages: ["home"]
          },
          popup: {
            enabled: false,
            title: "",
            content: "",
            showOnHomepage: true,
            showDelay: 3000,
            showOncePerSession: true
          },
          footer: {
            companyDescription: "PDFo provides free online PDF tools to help you work with documents efficiently.",
            socialLinks: {
              twitter: "",
              facebook: "",
              linkedin: "",
              instagram: ""
            },
            customText: ""
          },
          analytics: {
            googleAnalyticsId: "",
            facebookPixelId: "",
            enableCookieConsent: false
          },
          maintenance: {
            enabled: false,
            message: "PDFo is currently undergoing maintenance. We'll be back soon!",
            allowedPaths: ["/pdfo_pravaah_aite"]
          }
        };
        
        setSettings(defaultSettings);
      }
    } catch (error) {
      console.error("Error fetching admin settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    setSaving(true);
    try {
      const docRef = doc(db, "admin_settings", "main");
      await setDoc(docRef, settings);
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error saving settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const updateSettings = (section: keyof AdminSettings, field: string, value: any) => {
    if (!settings) return;
    
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value
      }
    });
  };

  const updateNestedSettings = (section: keyof AdminSettings, nestedField: string, field: string, value: any) => {
    if (!settings) return;
    
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [nestedField]: {
          ...(settings[section] as any)[nestedField],
          [field]: value
        }
      }
    });
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
              Admin Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Configure site-wide settings and preferences
            </p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>

        <Tabs defaultValue="announcements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="popup">Popup</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="announcements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Site Announcements</span>
                </CardTitle>
                <CardDescription>
                  Configure site-wide announcement banners
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="announcements-enabled"
                    checked={settings?.announcements.enabled || false}
                    onCheckedChange={(enabled) => updateSettings("announcements", "enabled", enabled)}
                  />
                  <Label htmlFor="announcements-enabled">Enable Announcements</Label>
                </div>

                <div>
                  <Label htmlFor="announcement-message">Announcement Message</Label>
                  <Textarea
                    id="announcement-message"
                    value={settings?.announcements.message || ""}
                    onChange={(e) => updateSettings("announcements", "message", e.target.value)}
                    placeholder="Enter your announcement message..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="announcement-type">Announcement Type</Label>
                  <select
                    id="announcement-type"
                    value={settings?.announcements.type || "info"}
                    onChange={(e) => updateSettings("announcements", "type", e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="info">Info (Blue)</option>
                    <option value="success">Success (Green)</option>
                    <option value="warning">Warning (Yellow)</option>
                    <option value="error">Error (Red)</option>
                  </select>
                </div>

                <div>
                  <Label>Show on Pages</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["home", "tools", "about", "contact", "dashboard"].map(page => (
                      <div key={page} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`page-${page}`}
                          checked={settings?.announcements.showOnPages.includes(page) || false}
                          onChange={(e) => {
                            const currentPages = settings?.announcements.showOnPages || [];
                            const newPages = e.target.checked
                              ? [...currentPages, page]
                              : currentPages.filter(p => p !== page);
                            updateSettings("announcements", "showOnPages", newPages);
                          }}
                        />
                        <Label htmlFor={`page-${page}`} className="capitalize">{page}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="popup">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Homepage Popup</span>
                </CardTitle>
                <CardDescription>
                  Configure popup modals for user engagement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="popup-enabled"
                    checked={settings?.popup.enabled || false}
                    onCheckedChange={(enabled) => updateSettings("popup", "enabled", enabled)}
                  />
                  <Label htmlFor="popup-enabled">Enable Popup</Label>
                </div>

                <div>
                  <Label htmlFor="popup-title">Popup Title</Label>
                  <Input
                    id="popup-title"
                    value={settings?.popup.title || ""}
                    onChange={(e) => updateSettings("popup", "title", e.target.value)}
                    placeholder="Welcome to PDFo!"
                  />
                </div>

                <div>
                  <Label htmlFor="popup-content">Popup Content</Label>
                  <Textarea
                    id="popup-content"
                    value={settings?.popup.content || ""}
                    onChange={(e) => updateSettings("popup", "content", e.target.value)}
                    placeholder="Enter your popup content..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="popup-delay">Show Delay (ms)</Label>
                    <Input
                      id="popup-delay"
                      type="number"
                      value={settings?.popup.showDelay || 3000}
                      onChange={(e) => updateSettings("popup", "showDelay", parseInt(e.target.value))}
                      placeholder="3000"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="popup-once"
                      checked={settings?.popup.showOncePerSession || false}
                      onCheckedChange={(once) => updateSettings("popup", "showOncePerSession", once)}
                    />
                    <Label htmlFor="popup-once">Show Once Per Session</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="footer">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Footer Configuration</span>
                </CardTitle>
                <CardDescription>
                  Customize footer content and social links
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="footer-description">Company Description</Label>
                  <Textarea
                    id="footer-description"
                    value={settings?.footer.companyDescription || ""}
                    onChange={(e) => updateSettings("footer", "companyDescription", e.target.value)}
                    placeholder="Brief description of your company..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Social Media Links</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={settings?.footer.socialLinks.twitter || ""}
                        onChange={(e) => updateNestedSettings("footer", "socialLinks", "twitter", e.target.value)}
                        placeholder="https://twitter.com/yourhandle"
                      />
                    </div>
                    <div>
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        value={settings?.footer.socialLinks.facebook || ""}
                        onChange={(e) => updateNestedSettings("footer", "socialLinks", "facebook", e.target.value)}
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={settings?.footer.socialLinks.linkedin || ""}
                        onChange={(e) => updateNestedSettings("footer", "socialLinks", "linkedin", e.target.value)}
                        placeholder="https://linkedin.com/company/yourcompany"
                      />
                    </div>
                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={settings?.footer.socialLinks.instagram || ""}
                        onChange={(e) => updateNestedSettings("footer", "socialLinks", "instagram", e.target.value)}
                        placeholder="https://instagram.com/yourhandle"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="footer-custom">Custom Footer Text</Label>
                  <Textarea
                    id="footer-custom"
                    value={settings?.footer.customText || ""}
                    onChange={(e) => updateSettings("footer", "customText", e.target.value)}
                    placeholder="Additional footer content..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Analytics & Tracking</span>
                </CardTitle>
                <CardDescription>
                  Configure analytics and tracking systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="google-analytics">Google Analytics ID</Label>
                  <Input
                    id="google-analytics"
                    value={settings?.analytics.googleAnalyticsId || ""}
                    onChange={(e) => updateSettings("analytics", "googleAnalyticsId", e.target.value)}
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>

                <div>
                  <Label htmlFor="facebook-pixel">Facebook Pixel ID</Label>
                  <Input
                    id="facebook-pixel"
                    value={settings?.analytics.facebookPixelId || ""}
                    onChange={(e) => updateSettings("analytics", "facebookPixelId", e.target.value)}
                    placeholder="123456789012345"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="cookie-consent"
                    checked={settings?.analytics.enableCookieConsent || false}
                    onCheckedChange={(enabled) => updateSettings("analytics", "enableCookieConsent", enabled)}
                  />
                  <Label htmlFor="cookie-consent">Enable Cookie Consent Banner</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Maintenance Mode</span>
                </CardTitle>
                <CardDescription>
                  Configure site maintenance mode
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="maintenance-enabled"
                    checked={settings?.maintenance.enabled || false}
                    onCheckedChange={(enabled) => updateSettings("maintenance", "enabled", enabled)}
                  />
                  <Label htmlFor="maintenance-enabled">Enable Maintenance Mode</Label>
                </div>

                <div>
                  <Label htmlFor="maintenance-message">Maintenance Message</Label>
                  <Textarea
                    id="maintenance-message"
                    value={settings?.maintenance.message || ""}
                    onChange={(e) => updateSettings("maintenance", "message", e.target.value)}
                    placeholder="Site is undergoing maintenance..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="allowed-paths">Allowed Paths (comma separated)</Label>
                  <Input
                    id="allowed-paths"
                    value={settings?.maintenance.allowedPaths.join(", ") || ""}
                    onChange={(e) => updateSettings("maintenance", "allowedPaths", e.target.value.split(",").map(p => p.trim()))}
                    placeholder="/pdfo_pravaah_aite, /api/health"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Paths that remain accessible during maintenance
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}