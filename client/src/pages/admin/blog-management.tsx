import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { 
  Edit3, 
  Plus, 
  Trash2,
  Save,
  X,
  FileText,
  Calendar,
  User,
  Eye,
  EyeOff
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  shortDescription: string;
  content: string;
  tags: string[];
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
  author: string;
}

export default function BlogManagement() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    imageUrl: "",
    shortDescription: "",
    content: "",
    tags: "",
    status: "draft" as "draft" | "published"
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const blogsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as BlogPost[];
      
      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBlog = async () => {
    if (!editingBlog) return;

    try {
      const updateData = {
        title: formData.title,
        slug: formData.slug,
        imageUrl: formData.imageUrl,
        shortDescription: formData.shortDescription,
        content: formData.content,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        status: formData.status,
        updatedAt: new Date()
      };

      await updateDoc(doc(db, "blogs", editingBlog.id), updateData);
      
      setBlogs(blogs.map(blog => 
        blog.id === editingBlog.id ? { ...blog, ...updateData, updatedAt: new Date() } : blog
      ));
      
      setEditingBlog(null);
      resetForm();
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleAddBlog = async () => {
    try {
      const newBlog = {
        title: formData.title,
        slug: formData.slug,
        imageUrl: formData.imageUrl,
        shortDescription: formData.shortDescription,
        content: formData.content,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        status: formData.status,
        createdAt: new Date(),
        updatedAt: new Date(),
        author: "Admin"
      };

      const docRef = await addDoc(collection(db, "blogs"), newBlog);
      
      setBlogs([{ ...newBlog, id: docRef.id }, ...blogs]);
      setShowAddForm(false);
      resetForm();
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      await deleteDoc(doc(db, "blogs", blogId));
      setBlogs(blogs.filter(blog => blog.id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleToggleStatus = async (blogId: string, currentStatus: "draft" | "published") => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    
    try {
      await updateDoc(doc(db, "blogs", blogId), { 
        status: newStatus,
        updatedAt: new Date()
      });
      
      setBlogs(blogs.map(blog => 
        blog.id === blogId ? { ...blog, status: newStatus, updatedAt: new Date() } : blog
      ));
    } catch (error) {
      console.error("Error updating blog status:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      imageUrl: "",
      shortDescription: "",
      content: "",
      tags: "",
      status: "draft"
    });
  };

  const startEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      imageUrl: blog.imageUrl,
      shortDescription: blog.shortDescription,
      content: blog.content,
      tags: blog.tags.join(', '),
      status: blog.status
    });
  };

  const cancelEdit = () => {
    setEditingBlog(null);
    setShowAddForm(false);
    resetForm();
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
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
              Blog Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create, edit, and manage blog posts
            </p>
          </div>
          <Button onClick={() => setShowAddForm(true)} disabled={showAddForm || editingBlog}>
            <Plus className="h-4 w-4 mr-2" />
            New Blog Post
          </Button>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingBlog) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setFormData({
                        ...formData, 
                        title,
                        slug: generateSlug(title)
                      });
                    }}
                    placeholder="Blog post title"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    placeholder="url-friendly-slug"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="imageUrl">Featured Image URL</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                  placeholder="Brief description for previews..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <ReactQuill
                  value={formData.content}
                  onChange={(content) => setFormData({...formData, content})}
                  placeholder="Write your blog post content here..."
                  style={{ height: '300px', marginBottom: '50px' }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="pdf, tools, productivity"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as "draft" | "published"})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={editingBlog ? handleSaveBlog : handleAddBlog}>
                  <Save className="h-4 w-4 mr-2" />
                  {editingBlog ? "Save Changes" : "Create Post"}
                </Button>
                <Button variant="outline" onClick={cancelEdit}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Blog Posts List */}
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <Card key={blog.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{blog.title}</h3>
                      <Badge variant={blog.status === "published" ? "default" : "secondary"}>
                        {blog.status}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {blog.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {blog.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleStatus(blog.id, blog.status)}
                    >
                      {blog.status === "published" ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(blog)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {blogs.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No blog posts yet. Create your first post!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}