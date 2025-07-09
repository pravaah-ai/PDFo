import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Clock, 
  CheckCircle, 
  X, 
  Search, 
  Filter,
  MessageSquare,
  HelpCircle,
  Bug,
  Lightbulb,
  Eye,
  MoreHorizontal
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface ContactForm {
  id: number;
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  status: "pending" | "resolved" | "closed";
  createdAt: string;
  resolvedAt?: string;
}

export function ContactManagement() {
  const [contactForms, setContactForms] = useState<ContactForm[]>([]);
  const [filteredForms, setFilteredForms] = useState<ContactForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedForm, setSelectedForm] = useState<ContactForm | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  const fetchContactForms = async () => {
    try {
      const response = await fetch("/api/contact");
      if (response.ok) {
        const data = await response.json();
        setContactForms(data);
        setFilteredForms(data);
      }
    } catch (error) {
      console.error("Error fetching contact forms:", error);
      toast({
        title: "Error",
        description: "Failed to load contact forms",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactForms();
  }, []);

  useEffect(() => {
    let filtered = contactForms;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(form =>
        form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(form => form.status === statusFilter);
    }

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(form => form.category === categoryFilter);
    }

    setFilteredForms(filtered);
  }, [contactForms, searchTerm, statusFilter, categoryFilter]);

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setContactForms(forms =>
          forms.map(form =>
            form.id === id
              ? { ...form, status: newStatus as any, resolvedAt: newStatus === "resolved" ? new Date().toISOString() : form.resolvedAt }
              : form
          )
        );
        toast({
          title: "Success",
          description: `Contact form marked as ${newStatus}`,
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "resolved":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Resolved</Badge>;
      case "closed":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "general":
        return <HelpCircle className="h-4 w-4" />;
      case "bug":
        return <Bug className="h-4 w-4" />;
      case "feature":
        return <Lightbulb className="h-4 w-4" />;
      case "business":
        return <MessageSquare className="h-4 w-4" />;
      case "privacy":
        return <Mail className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "general":
        return "General Support";
      case "bug":
        return "Bug Report";
      case "feature":
        return "Feature Request";
      case "business":
        return "Business Inquiry";
      case "privacy":
        return "Privacy Concern";
      default:
        return category;
    }
  };

  const stats = {
    total: contactForms.length,
    pending: contactForms.filter(f => f.status === "pending").length,
    resolved: contactForms.filter(f => f.status === "resolved").length,
    closed: contactForms.filter(f => f.status === "closed").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contact Forms</h1>
        <Button onClick={fetchContactForms} variant="outline">
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Closed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.closed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search forms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="general">General Support</SelectItem>
            <SelectItem value="bug">Bug Report</SelectItem>
            <SelectItem value="feature">Feature Request</SelectItem>
            <SelectItem value="business">Business Inquiry</SelectItem>
            <SelectItem value="privacy">Privacy Concern</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Contact Forms List */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Forms ({filteredForms.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading contact forms...</div>
          ) : filteredForms.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No contact forms found
            </div>
          ) : (
            <div className="space-y-4">
              {filteredForms.map((form) => (
                <div key={form.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getCategoryIcon(form.category)}
                        <span className="font-medium">{form.subject}</span>
                        {getStatusBadge(form.status)}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">{form.name}</span> ({form.email})
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Category: {getCategoryLabel(form.category)}
                      </div>
                      <div className="text-sm text-gray-500">
                        <Clock className="inline h-3 w-3 mr-1" />
                        {format(new Date(form.createdAt), "MMM d, yyyy 'at' h:mm a")}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedForm(form)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Contact Form Details</DialogTitle>
                          </DialogHeader>
                          {selectedForm && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Name</label>
                                  <p className="text-sm">{selectedForm.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Email</label>
                                  <p className="text-sm">{selectedForm.email}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Category</label>
                                  <p className="text-sm">{getCategoryLabel(selectedForm.category)}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Status</label>
                                  <div className="mt-1">
                                    {getStatusBadge(selectedForm.status)}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Subject</label>
                                <p className="text-sm">{selectedForm.subject}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Message</label>
                                <Textarea
                                  value={selectedForm.message}
                                  readOnly
                                  className="min-h-[100px]"
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                  Submitted: {format(new Date(selectedForm.createdAt), "MMM d, yyyy 'at' h:mm a")}
                                </div>
                                <div className="flex space-x-2">
                                  {selectedForm.status === "pending" && (
                                    <Button
                                      onClick={() => {
                                        updateStatus(selectedForm.id, "resolved");
                                        setIsDetailsOpen(false);
                                      }}
                                      size="sm"
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      Mark Resolved
                                    </Button>
                                  )}
                                  {selectedForm.status !== "closed" && (
                                    <Button
                                      onClick={() => {
                                        updateStatus(selectedForm.id, "closed");
                                        setIsDetailsOpen(false);
                                      }}
                                      size="sm"
                                      variant="outline"
                                    >
                                      Close
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {form.status === "pending" && (
                            <DropdownMenuItem onClick={() => updateStatus(form.id, "resolved")}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark Resolved
                            </DropdownMenuItem>
                          )}
                          {form.status !== "closed" && (
                            <DropdownMenuItem onClick={() => updateStatus(form.id, "closed")}>
                              <X className="h-4 w-4 mr-2" />
                              Close
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => window.location.href = `mailto:${form.email}?subject=Re: ${form.subject}`}>
                            <Mail className="h-4 w-4 mr-2" />
                            Reply via Email
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}