import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, 
  Plus, 
  Edit3, 
  Trash2,
  Save,
  X,
  Tag,
  ToggleLeft,
  ToggleRight
} from "lucide-react";

interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  enabled: boolean;
  tags: string[];
  order: number;
  category: string;
}

export default function ToolsManagement() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    enabled: true,
    tags: "",
    category: "Organize Tools"
  });

  const categories = [
    "Organize Tools",
    "Edit Tools", 
    "Security & Optimization",
    "Conversion Tools",
    "Other Formats to PDF"
  ];

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tools"));
      const toolsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Tool[];
      
      toolsData.sort((a, b) => (a.order || 0) - (b.order || 0));
      setTools(toolsData);
    } catch (error) {
      console.error("Error fetching tools:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleEnabled = async (toolId: string, enabled: boolean) => {
    try {
      await updateDoc(doc(db, "tools", toolId), { enabled });
      setTools(tools.map(tool => 
        tool.id === toolId ? { ...tool, enabled } : tool
      ));
    } catch (error) {
      console.error("Error updating tool:", error);
    }
  };

  const handleSaveTool = async () => {
    if (!editingTool) return;

    try {
      const updateData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        enabled: formData.enabled,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        category: formData.category
      };

      await updateDoc(doc(db, "tools", editingTool.id), updateData);
      
      setTools(tools.map(tool => 
        tool.id === editingTool.id ? { ...tool, ...updateData } : tool
      ));
      
      setEditingTool(null);
      resetForm();
    } catch (error) {
      console.error("Error saving tool:", error);
    }
  };

  const handleAddTool = async () => {
    try {
      const newTool = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        enabled: formData.enabled,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        category: formData.category,
        order: tools.length,
        createdAt: new Date()
      };

      const docRef = await addDoc(collection(db, "tools"), newTool);
      
      setTools([...tools, { ...newTool, id: docRef.id }]);
      setShowAddForm(false);
      resetForm();
    } catch (error) {
      console.error("Error adding tool:", error);
    }
  };

  const handleDeleteTool = async (toolId: string) => {
    if (!confirm("Are you sure you want to delete this tool?")) return;

    try {
      await deleteDoc(doc(db, "tools", toolId));
      setTools(tools.filter(tool => tool.id !== toolId));
    } catch (error) {
      console.error("Error deleting tool:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      enabled: true,
      tags: "",
      category: "Organize Tools"
    });
  };

  const startEdit = (tool: Tool) => {
    setEditingTool(tool);
    setFormData({
      name: tool.name,
      slug: tool.slug,
      description: tool.description,
      enabled: tool.enabled,
      tags: tool.tags.join(', '),
      category: tool.category
    });
  };

  const cancelEdit = () => {
    setEditingTool(null);
    setShowAddForm(false);
    resetForm();
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
              Tool Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage PDF tools, descriptions, and availability
            </p>
          </div>
          <Button onClick={() => setShowAddForm(true)} disabled={showAddForm || editingTool}>
            <Plus className="h-4 w-4 mr-2" />
            Add Tool
          </Button>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingTool) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {editingTool ? "Edit Tool" : "Add New Tool"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Tool Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Merge PDF"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    placeholder="e.g., merge-pdf"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Short description of the tool..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="pdf, merge, combine"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enabled"
                  checked={formData.enabled}
                  onCheckedChange={(enabled) => setFormData({...formData, enabled})}
                />
                <Label htmlFor="enabled">Tool Enabled</Label>
              </div>

              <div className="flex space-x-2">
                <Button onClick={editingTool ? handleSaveTool : handleAddTool}>
                  <Save className="h-4 w-4 mr-2" />
                  {editingTool ? "Save Changes" : "Add Tool"}
                </Button>
                <Button variant="outline" onClick={cancelEdit}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tools List */}
        <div className="space-y-4">
          {categories.map(category => {
            const categoryTools = tools.filter(tool => tool.category === category);
            if (categoryTools.length === 0) return null;

            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>{category}</span>
                    <Badge variant="secondary">{categoryTools.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryTools.map((tool) => (
                      <div key={tool.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium">{tool.name}</h3>
                            <Badge variant={tool.enabled ? "default" : "secondary"}>
                              {tool.enabled ? "Enabled" : "Disabled"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {tool.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {tool.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleEnabled(tool.id, !tool.enabled)}
                          >
                            {tool.enabled ? (
                              <ToggleRight className="h-4 w-4 text-green-600" />
                            ) : (
                              <ToggleLeft className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEdit(tool)}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTool(tool.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}