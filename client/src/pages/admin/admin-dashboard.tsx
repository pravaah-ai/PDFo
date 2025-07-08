import { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  FileText, 
  MessageSquare, 
  Settings, 
  Users,
  TrendingUp,
  Activity,
  Plus,
  Edit3,
  Tag,
  Search
} from "lucide-react";

interface DashboardStats {
  activeTools: number;
  publishedBlogs: number;
  recentFeedback: number;
  totalUsers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    activeTools: 0,
    publishedBlogs: 0,
    recentFeedback: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch active tools
        const toolsQuery = query(
          collection(db, "tools"),
          where("enabled", "==", true)
        );
        const toolsSnapshot = await getDocs(toolsQuery);
        const activeTools = toolsSnapshot.size;

        // Fetch published blogs
        const blogsQuery = query(
          collection(db, "blogs"),
          where("status", "==", "published")
        );
        const blogsSnapshot = await getDocs(blogsQuery);
        const publishedBlogs = blogsSnapshot.size;

        // Fetch recent feedback (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const feedbackQuery = query(
          collection(db, "feedback"),
          where("createdAt", ">=", thirtyDaysAgo)
        );
        const feedbackSnapshot = await getDocs(feedbackQuery);
        const recentFeedback = feedbackSnapshot.size;

        // Fetch total users
        const usersSnapshot = await getDocs(collection(db, "users"));
        const totalUsers = usersSnapshot.size;

        setStats({
          activeTools,
          publishedBlogs,
          recentFeedback,
          totalUsers
        });

        // Fetch recent activity (blogs + feedback)
        const recentBlogs = await getDocs(
          query(
            collection(db, "blogs"),
            orderBy("createdAt", "desc"),
            // limit(3)
          )
        );
        
        const recentFeedbackDocs = await getDocs(
          query(
            collection(db, "feedback"),
            orderBy("createdAt", "desc"),
            // limit(3)
          )
        );

        const activity = [
          ...recentBlogs.docs.slice(0, 3).map(doc => ({
            id: doc.id,
            type: "blog",
            title: doc.data().title,
            createdAt: doc.data().createdAt?.toDate(),
            status: doc.data().status
          })),
          ...recentFeedbackDocs.docs.slice(0, 3).map(doc => ({
            id: doc.id,
            type: "feedback",
            title: `Message from ${doc.data().name || "Anonymous"}`,
            createdAt: doc.data().createdAt?.toDate(),
            status: doc.data().resolved ? "resolved" : "pending"
          }))
        ].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)).slice(0, 5);

        setRecentActivity(activity);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatDate = (date: Date | null) => {
    if (!date) return "Unknown";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pdfo-blue mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage PDFo content, settings, and user feedback
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tools</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeTools}</div>
              <p className="text-xs text-muted-foreground">
                PDF tools currently enabled
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published Blogs</CardTitle>
              <Edit3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.publishedBlogs}</div>
              <p className="text-xs text-muted-foreground">
                Live blog posts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentFeedback}</div>
              <p className="text-xs text-muted-foreground">
                Messages in last 30 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Registered accounts
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription>
                Common admin tasks and management options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/pdfo_pravaah_aite/tools">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Manage Tools
                  </Button>
                </Link>
                
                <Link href="/pdfo_pravaah_aite/blogs/new">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    New Blog Post
                  </Button>
                </Link>

                <Link href="/pdfo_pravaah_aite/seo">
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="h-4 w-4 mr-2" />
                    SEO Settings
                  </Button>
                </Link>

                <Link href="/pdfo_pravaah_aite/feedback">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View Feedback
                  </Button>
                </Link>

                <Link href="/pdfo_pravaah_aite/tags">
                  <Button variant="outline" className="w-full justify-start">
                    <Tag className="h-4 w-4 mr-2" />
                    Manage Tags
                  </Button>
                </Link>

                <Link href="/pdfo_pravaah_aite/settings">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Settings
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>
                Latest blogs and feedback submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No recent activity
                  </p>
                ) : (
                  recentActivity.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {item.type === "blog" ? (
                          <Edit3 className="h-4 w-4 text-blue-500" />
                        ) : (
                          <MessageSquare className="h-4 w-4 text-green-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-gray-500">
                            {formatDate(item.createdAt)}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={item.status === "published" || item.status === "resolved" ? "default" : "secondary"}
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}