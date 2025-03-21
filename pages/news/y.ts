"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { newsService, type News } from "@/lib/news";
import {
  FileText,
  Newspaper,
  BookOpen,
  FileSpreadsheet,
  Plus,
  Search,
  Edit,
  Trash,
  Eye,
  Loader2,
  Heart,
} from "lucide-react";

// Content type interfaces
interface ContentFormData {
  title: string;
  excerpt?: string;
  content?: string;
  description?: string;
  long_description?: string;
  category_id: number;
  location?: string;
  locations?: string[];
  video?: string;
  goals?: string[];
  achievements?: string[];
  status?: string;
  start_date?: string;
}

export default function ContentManagement() {
  const { toast } = useToast();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedItem, setSelectedItem] = useState<ContentFormData | null>(
    null
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("news");
  const [contentItems, setContentItems] = useState([]);

  // Form states
  const [formData, setFormData] = useState<ContentFormData>({
    title: "",
    category_id: 1,
  });

  // Content type specific configurations
  const contentTypes = {
    news: {
      categories: [
        { id: 1, name: "Breaking News" },
        { id: 2, name: "Press Release" },
        { id: 3, name: "Update" },
        { id: 4, name: "Announcement" },
      ],
      title: "News Articles",
      icon: <Newspaper className="h-4 w-4 mr-2" />,
      viewPath: "/news",
    },
    impact: {
      categories: [
        { id: 5, name: "Water & Sanitation" },
        { id: 6, name: "Education" },
        { id: 7, name: "Healthcare" },
        { id: 8, name: "Economic Development" },
      ],
      title: "Impact Stories",
      icon: <Heart className="h-4 w-4 mr-2" />,
      viewPath: "/impact-stories",
    },
    programs: {
      categories: [
        { id: 9, name: "Clean Water" },
        { id: 10, name: "Education" },
        { id: 11, name: "Healthcare" },
        { id: 12, name: "Economic Development" },
      ],
      title: "Programs",
      icon: <BookOpen className="h-4 w-4 mr-2" />,
      viewPath: "/programs",
    },
  };

  useEffect(() => {
    fetchContent();
  }, [currentPage, activeTab]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call specific to each content type
      const response = await fetch(`/api/${activeTab}?page=${currentPage}`);
      const data = await response.json();
      setContentItems(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      // Validate required fields based on content type
      if (!formData.title || !formData.category_id) {
        throw new Error("Please fill all required fields");
      }

      // Additional validation for specific content types
      if (activeTab === "impact" && (!formData.content || !formData.location)) {
        throw new Error("Please fill all required fields for impact story");
      }

      if (
        activeTab === "programs" &&
        (!formData.description ||
          !formData.long_description ||
          !formData.status ||
          !formData.start_date)
      ) {
        throw new Error("Please fill all required fields for program");
      }

      // In a real app, this would be an API call specific to each content type
      const response = await fetch(`/api/${activeTab}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Content created successfully",
        });
        fetchContent();
        setIsCreateDialogOpen(false);
        resetForm();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create content",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async () => {
    try {
      // Validate required fields based on content type
      if (!formData.title || !formData.category_id) {
        throw new Error("Please fill all required fields");
      }

      // Additional validation for specific content types
      if (activeTab === "impact" && (!formData.content || !formData.location)) {
        throw new Error("Please fill all required fields for impact story");
      }

      if (
        activeTab === "programs" &&
        (!formData.description ||
          !formData.long_description ||
          !formData.status ||
          !formData.start_date)
      ) {
        throw new Error("Please fill all required fields for program");
      }

      // In a real app, this would be an API call specific to each content type
      const response = await fetch(`/api/${activeTab}/${selectedItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Content updated successfully",
        });
        fetchContent();
        setIsEditDialogOpen(false);
        resetForm();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update content",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      ...item,
      category_id: item.category_id || 1,
    });
    setIsEditDialogOpen(true);
  };

  const handleView = (item) => {
    const viewPath = contentTypes[activeTab].viewPath;
    router.push(`${viewPath}/${item.id}`);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category_id: 1,
    });
    setSelectedItem(null);
  };

  const getFormFields = () => {
    switch (activeTab) {
      case "news":
        return (
          <>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter title"
              />
            </div>
            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                placeholder="Enter excerpt"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category_id.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, category_id: parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.news.categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "impact":
        return (
          <>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter title"
              />
            </div>
            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                placeholder="Enter excerpt"
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Enter content"
                className="min-h-[200px]"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category_id.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, category_id: parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.impact.categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="Enter location"
              />
            </div>
            <div>
              <Label htmlFor="video">Video URL</Label>
              <Input
                id="video"
                value={formData.video}
                onChange={(e) =>
                  setFormData({ ...formData, video: e.target.value })
                }
                placeholder="Enter video URL"
              />
            </div>
          </>
        );

      case "programs":
        return (
          <>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter title"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter description"
              />
            </div>
            <div>
              <Label htmlFor="long_description">Long Description</Label>
              <Textarea
                id="long_description"
                value={formData.long_description}
                onChange={(e) =>
                  setFormData({ ...formData, long_description: e.target.value })
                }
                placeholder="Enter long description"
                className="min-h-[200px]"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category_id.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, category_id: parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.programs.categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="goals">Goals</Label>
              <Textarea
                id="goals"
                value={formData.goals?.join("\n")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    goals: e.target.value.split("\n").filter(Boolean),
                  })
                }
                placeholder="Enter goals (one per line)"
              />
            </div>
            <div>
              <Label htmlFor="achievements">Achievements</Label>
              <Textarea
                id="achievements"
                value={formData.achievements?.join("\n")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    achievements: e.target.value.split("\n").filter(Boolean),
                  })
                }
                placeholder="Enter achievements (one per line)"
              />
            </div>
            <div>
              <Label htmlFor="locations">Locations</Label>
              <Textarea
                id="locations"
                value={formData.locations?.join("\n")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    locations: e.target.value.split("\n").filter(Boolean),
                  })
                }
                placeholder="Enter locations (one per line)"
              />
            </div>
            <div>
              <Label htmlFor="video">Video URL</Label>
              <Input
                id="video"
                value={formData.video}
                onChange={(e) =>
                  setFormData({ ...formData, video: e.target.value })
                }
                placeholder="Enter video URL"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Planned">Planned</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Content Management</h1>
        <p className="text-muted-foreground">
          Manage all your website content in one place.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Create New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create {contentTypes[activeTab].title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {getFormFields()}
              <Button onClick={handleCreate} className="w-full">
                Create {contentTypes[activeTab].title}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="news" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="news">
            <Newspaper className="h-4 w-4 mr-2" /> News
          </TabsTrigger>
          <TabsTrigger value="impact">
            <Heart className="h-4 w-4 mr-2" /> Impact Stories
          </TabsTrigger>
          <TabsTrigger value="programs">
            <BookOpen className="h-4 w-4 mr-2" /> Programs
          </TabsTrigger>
        </TabsList>

        {Object.keys(contentTypes).map((type) => (
          <TabsContent key={type} value={type}>
            <Card>
              <CardHeader>
                <CardTitle>{contentTypes[type].title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Title</th>
                        <th className="text-left py-3 px-4">Category</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contentItems.map((item: any) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-3 px-4">{item.title}</td>
                          <td className="py-3 px-4">{item.category}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                item.status === "published"
                                  ? "bg-green-100 text-green-800"
                                  : item.status === "draft"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleView(item)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(item)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {contentTypes[activeTab].title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {getFormFields()}
            <Button onClick={handleUpdate} className="w-full">
              Update {contentTypes[activeTab].title}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
