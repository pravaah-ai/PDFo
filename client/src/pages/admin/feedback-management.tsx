import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Mail, 
  User, 
  Calendar,
  Check,
  Trash2,
  Filter,
  Search
} from "lucide-react";

interface FeedbackItem {
  id: string;
  name: string;
  email: string;
  message: string;
  type: string;
  resolved: boolean;
  createdAt: Date;
}

export default function FeedbackManagement() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "resolved" | "pending">("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const q = query(collection(db, "feedback"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const feedbackData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as FeedbackItem[];
      
      setFeedback(feedbackData);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkResolved = async (feedbackId: string, resolved: boolean) => {
    try {
      await updateDoc(doc(db, "feedback", feedbackId), { resolved });
      
      setFeedback(feedback.map(item => 
        item.id === feedbackId ? { ...item, resolved } : item
      ));
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  const handleDeleteFeedback = async (feedbackId: string) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;

    try {
      await deleteDoc(doc(db, "feedback", feedbackId));
      setFeedback(feedback.filter(item => item.id !== feedbackId));
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
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

  const filteredFeedback = feedback.filter(item => {
    const matchesFilter = filter === "all" || 
      (filter === "resolved" && item.resolved) ||
      (filter === "pending" && !item.resolved);
    
    const matchesSearch = searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: feedback.length,
    resolved: feedback.filter(item => item.resolved).length,
    pending: feedback.filter(item => !item.resolved).length
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Feedback Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage user feedback and contact form submissions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Feedback</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Resolved</p>
                  <p className="text-2xl font-bold">{stats.resolved}</p>
                </div>
                <Check className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as "all" | "resolved" | "pending")}
              className="border rounded-md px-3 py-1"
            >
              <option value="all">All Feedback</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2 flex-1">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-md px-3 py-1 flex-1"
            />
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {filteredFeedback.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      {item.email && (
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{item.email}</span>
                        </div>
                      )}
                      <Badge variant={item.resolved ? "default" : "secondary"}>
                        {item.resolved ? "Resolved" : "Pending"}
                      </Badge>
                      {item.type && (
                        <Badge variant="outline">{item.type}</Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-3 whitespace-pre-wrap">
                      {item.message}
                    </p>
                    
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMarkResolved(item.id, !item.resolved)}
                    >
                      <Check className={`h-4 w-4 ${item.resolved ? 'text-green-600' : 'text-gray-400'}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteFeedback(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredFeedback.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">
                  {searchTerm || filter !== "all" 
                    ? "No feedback found matching your criteria" 
                    : "No feedback submissions yet"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}