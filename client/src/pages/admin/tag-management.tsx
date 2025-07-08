import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Tag, 
  Plus, 
  Edit3, 
  Trash2,
  Save,
  X,
  Search,
  Filter
} from "lucide-react";

interface TagItem {
  id: string;
  name: string;
  type: "blog" | "tool" | "seo";
  visible: boolean;
  color: string;
  createdAt: Date;
  usageCount: number;
}

export default function TagManagement() {
  const [tags, setTags] = useState<TagItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTag, setEditingTag] = useState<TagItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "blog" | "tool" | "seo">("all");
  const [formData, setFormData] = useState({
    name: "",
    type: "blog" as "blog" | "tool" | "seo",
    visible: true,
    color: "#0066cc"
  });

  const tagColors = [
    "#0066cc", "#00cc66", "#cc6600", "#cc0066", "#6600cc",
    "#00cccc", "#cccc00", "#ff6600", "#ff0066", "#6600ff"
  ];

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tags"));
      const tagsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as TagItem[];
      
      // Sort by name
      tagsData.sort((a, b) => a.name.localeCompare(b.name));
      setTags(tagsData);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTag = async () => {
    if (!editingTag) return;

    try {
      const updateData = {
        name: formData.name,
        type: formData.type,
        visible: formData.visible,
        color: formData.color
      };

      await updateDoc(doc(db, "tags", editingTag.id), updateData);
      
      setTags(tags.map(tag => 
        tag.id === editingTag.id ? { ...tag, ...updateData } : tag
      ));
      
      setEditingTag(null);
      resetForm();
    } catch (error) {
      console.error("Error saving tag:", error);
    }
  };

  const handleAddTag = async () => {
    try {
      const newTag = {
        name: formData.name,
        type: formData.type,
        visible: formData.visible,
        color: formData.color,
        createdAt: new Date(),
        usageCount: 0
      };

      const docRef = await addDoc(collection(db, "tags"), newTag);
      
      setTags([...tags, { ...newTag, id: docRef.id }]);
      setShowAddForm(false);
      resetForm();
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    if (!confirm("Are you sure you want to delete this tag? This action cannot be undone.")) return;

    try {
      await deleteDoc(doc(db, "tags", tagId));
      setTags(tags.filter(tag => tag.id !== tagId));
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  const handleToggleVisibility = async (tagId: string, visible: boolean) => {
    try {
      await updateDoc(doc(db, "tags", tagId), { visible });
      setTags(tags.map(tag => 
        tag.id === tagId ? { ...tag, visible } : tag
      ));
    } catch (error) {
      console.error("Error updating tag visibility:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "blog",
      visible: true,
      color: "#0066cc"
    });
  };

  const startEdit = (tag: TagItem) => {
    setEditingTag(tag);
    setFormData({
      name: tag.name,
      type: tag.type,
      visible: tag.visible,
      color: tag.color
    });
  };

  const cancelEdit = () => {
    setEditingTag(null);
    setShowAddForm(false);
    resetForm();
  };

  const filteredTags = tags.filter(tag => {
    const matchesSearch = tag.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || tag.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const tagsByType = {
    blog: tags.filter(tag => tag.type === "blog").length,
    tool: tags.filter(tag => tag.type === "tool").length,
    seo: tags.filter(tag => tag.type === "seo").length
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
              Tag Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage tags for blogs, tools, and SEO organization
            </p>
          </div>
          <Button onClick={() => setShowAddForm(true)} disabled={showAddForm || editingTag}>
            <Plus className="h-4 w-4 mr-2" />
            Add Tag
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Tags</p>
                  <p className="text-2xl font-bold">{tags.length}</p>
                </div>
                <Tag className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Blog Tags</p>
                  <p className="text-2xl font-bold">{tagsByType.blog}</p>
                </div>
                <Badge style={{ backgroundColor: "#0066cc" }}>Blog</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tool Tags</p>
                  <p className="text-2xl font-bold">{tagsByType.tool}</p>
                </div>
                <Badge style={{ backgroundColor: "#00cc66" }}>Tool</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">SEO Tags</p>
                  <p className="text-2xl font-bold">{tagsByType.seo}</p>
                </div>
                <Badge style={{ backgroundColor: "#cc6600" }}>SEO</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingTag) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {editingTag ? "Edit Tag" : "Add New Tag"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Tag Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., productivity, merge"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Tag Type</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as "blog" | "tool" | "seo"})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="blog">Blog</option>
                    <option value="tool">Tool</option>
                    <option value="seo">SEO</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="color">Tag Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="color"
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      className="w-12 h-8"
                    />
                    <div className="flex flex-wrap gap-1">
                      {tagColors.map(color => (
                        <button
                          key={color}
                          onClick={() => setFormData({...formData, color})}
                          className="w-6 h-6 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="visible"
                    checked={formData.visible}
                    onCheckedChange={(visible) => setFormData({...formData, visible})}
                  />
                  <Label htmlFor="visible">Visible</Label>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={editingTag ? handleSaveTag : handleAddTag}>
                  <Save className="h-4 w-4 mr-2" />
                  {editingTag ? "Save Changes" : "Add Tag"}
                </Button>
                <Button variant="outline" onClick={cancelEdit}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center space-x-2 flex-1">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as "all" | "blog" | "tool" | "seo")}
              className="border rounded-md px-3 py-2"
            >
              <option value="all">All Types</option>
              <option value="blog">Blog</option>
              <option value="tool">Tool</option>
              <option value="seo">SEO</option>
            </select>
          </div>
        </div>

        {/* Tags List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTags.map((tag) => (
            <Card key={tag.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge 
                        style={{ backgroundColor: tag.color }}
                        className="text-white"
                      >
                        {tag.name}
                      </Badge>
                      <Badge variant="outline">{tag.type}</Badge>
                      {!tag.visible && (
                        <Badge variant="secondary">Hidden</Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Used {tag.usageCount} times
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleVisibility(tag.id, !tag.visible)}
                    >
                      {tag.visible ? "👁️" : "🙈"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(tag)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTag(tag.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredTags.length === 0 && (
            <div className="col-span-full">
              <Card>
                <CardContent className="text-center py-8">
                  <Tag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">
                    {searchTerm || filterType !== "all" 
                      ? "No tags found matching your criteria" 
                      : "No tags created yet. Add your first tag!"}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}