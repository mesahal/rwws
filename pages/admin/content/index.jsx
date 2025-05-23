"use client";

import { useState, useEffect } from "react";
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
import { getAll, create, update, remove } from "../../../lib/api";
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
  Home,
} from "lucide-react";
import AdminLayout from "../layout";
import { title } from "process";
import { auth } from "@/lib/auth";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const checkAuth = async () => {
  try {
    const isValid = await auth.checkTokenExpiry();
    if (!isValid) {
      auth.logout();
      return false;
    }
    return true;
  } catch (error) {
    auth.logout();
    return false;
  }
};

export default function ContentManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [contentItems, setContentItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const pageSize = 6;
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when tab changes
  }, [activeTab]);

  const [formData, setFormData] = useState({
    title: "",
    category_id: 1,
  });

  const contentTypes = {
    news: {
      categories: ["1", "2", "3"],
      title: "News Articles",
      icon: <Newspaper className="h-4 w-4 mr-2" />,
    },
    program: {
      categories: ["1", "2", "3"],
      title: "Programs",
      icon: <BookOpen className="h-4 w-4 mr-2" />,
    },
    story: {
      categories: ["1", "2", "3"],
      title: "Impact Stories",
      icon: <Heart className="h-4 w-4 mr-2" />,
    },
    home: {
      title: "Home Content",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
  };
  const requiredFieldsByType = {
    news: ["title", "excerpt", "image"],
    story: ["title", "excerpt", "content", "location", "video", "image"],
    program: [
      "title",
      "description",
      "longDescription",
      "goals",
      "achievements",
      "locations",
      "status",
      "start_date",
    ],
    home: [
      "hero_headline",
      "cta_text",
      "mission",
      "vision",
      "hero_image",
      "images",
      "videos",
    ],
  };
  useEffect(() => {
    fetchContent();
  }, [currentPage, activeTab]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await getAll(currentPage, pageSize, activeTab);
      const data = response.data;
      if (activeTab == "news") setContentItems(data.newsList);
      else if (activeTab == "story") setContentItems(data.storyList);
      else if (activeTab == "program") setContentItems(data.programList);
      else if (activeTab == "home") setContentItems(data.content);
      setTotalPages(Math.ceil(data.total_count / pageSize));
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

  const categoryMap = {
    news: 1,
    story: 2,
    program: 3,
  };

  const constructFormData = () => {
    const formDataToSend = new FormData();
    let baseData = {};
    let typeSpecificData = {};

    // Include baseData only if it's NOT "home"
    if (activeTab !== "home") {
      baseData = {
        title: formData.title,
        category_id: formData.category,
      };
    }
    switch (activeTab) {
      case "news":
        typeSpecificData = {
          title: formData.title,
          excerpt: formData.excerpt,
        };
        break;

      case "story":
        typeSpecificData = {
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          location: formData.location,
          video: formData.video,
        };
        break;

      case "program":
        typeSpecificData = {
          title: formData.title,
          description: formData.description,
          long_description: formData.longDescription,
          goals: formData.goals,
          achievements: formData.achievements,
          locations: formData.locations,
          video: formData.video,
          status: formData.status,
          start_date: formData.start_date,
        };
        break;
      case "home":
        typeSpecificData = {
          hero_headline: formData.hero_headline,
          cta_text: formData.cta_text,
          mission: formData.mission,
          vision: formData.vision,
          video_urls: formData.videos,
        };
        if (formData.hero_image) {
          formDataToSend.append("hero_image", formData.hero_image);
        }
        if (formData.images) {
          formData.images.forEach((image, index) => {
            formDataToSend.append(`images`, image);
          });
        }
        break;
    }

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    formDataToSend.append(
      "jsonData",
      JSON.stringify({
        ...baseData,
        ...typeSpecificData,
      })
    );
    return formDataToSend;
  };

  const validateForm = () => {
    const requiredFields = {
      news: ["title", "excerpt", "image"],
      story: ["title", "excerpt", "content", "location", "video", "image"],
      program: [
        "title",
        "description",
        "description",
        "longDescription",
        "goals",
        "achievements",
        "locations",
        "status",
        "start_date",
      ],
      home: [
        "hero_headline",
        "cta_text",
        "mission",
        "vision",
        "hero_image",
        "images",
        "videos",
      ],
    };

    const missingFields = requiredFields[activeTab].filter(
      (field) => !formData[field]
    );

    if (missingFields.length > 0) {
      toast({
        title: "Error",
        description: `Missing required fields: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleCreate = async (activeTab) => {
    if (activeTab !== "home") {
      formData.category = categoryMap[activeTab] || null;
    }
    if (!validateForm()) return;
    setIsProcessing(true); // Start loading

    try {
      const formDataToSend = constructFormData();
      const response = await create(formDataToSend, activeTab);
      const data = response;
      if (data.success) {
        toast({
          title: "Success",
          description: "Content created successfully",
        });
        fetchContent();
        setIsCreateDialogOpen(false);
        resetForm();
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create content",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false); // Ensures it stops processing in both success & error cases
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

  const handleUpdate = async () => {
    formData.category = categoryMap[activeTab] || null;

    if (!selectedItem || !validateForm()) return;
    setIsProcessing(true);

    try {
      const formDataToSend = constructFormData();
      const response = await update(selectedItem.id, formDataToSend, activeTab);
      const data = response;

      if (data.success) {
        toast({
          title: "Success",
          description: "Content updated successfully",
        });
        fetchContent();
        setIsEditDialogOpen(false);
        resetForm();
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update content",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false); // Ensures it stops processing in both success & error cases
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) {
      return;
    }
    setIsProcessing(true);

    try {
      const response = await remove(id, activeTab);
      const data = response;

      if (data.success) {
        toast({
          title: "Success",
          description: "Content deleted successfully",
        });
        fetchContent();
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete content",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false); // Ensures it stops processing in both success & error cases
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      status: "draft",
      image: null,
    });
    setSelectedItem(null);
  };

  const getFormFields = () => {
    switch (activeTab) {
      case "news":
        return (
          <>
            <div>
              <Label htmlFor="title">
                Title{" "}
                {requiredFieldsByType[activeTab].includes("title") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
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
              <Label htmlFor="excerpt">
                Content{" "}
                {requiredFieldsByType[activeTab].includes("excerpt") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                placeholder="Enter content"
              />
            </div>
            {/* <div>
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
            </div> */}
            <div>
              <Label htmlFor="image">
                Image{" "}
                {requiredFieldsByType[activeTab].includes("image") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.files?.[0] || null,
                  })
                }
              />
            </div>
          </>
        );

      case "story":
        return (
          <>
            <div>
              <Label htmlFor="title">
                Title{" "}
                {requiredFieldsByType[activeTab].includes("title") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
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
              <Label htmlFor="excerpt">
                Excerpt{" "}
                {requiredFieldsByType[activeTab].includes("excerpt") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                placeholder="Enter short description"
              />
            </div>
            <div>
              <Label htmlFor="content">
                Content{" "}
                {requiredFieldsByType[activeTab].includes("content") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
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
            {/* <div>
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
                  {contentTypes.story.categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
            <div>
              <Label htmlFor="location">
                Location{" "}
                {requiredFieldsByType[activeTab].includes("location") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
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
              <Label htmlFor="video">
                Video URL{" "}
                {requiredFieldsByType[activeTab].includes("video") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
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
              <Label htmlFor="image">
                Image{" "}
                {requiredFieldsByType[activeTab].includes("image") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.files?.[0] || null,
                  })
                }
              />
            </div>
          </>
        );

      case "program":
        return (
          <>
            <div>
              <Label htmlFor="title">
                Title{" "}
                {requiredFieldsByType[activeTab].includes("title") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
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
              <Label htmlFor="description">
                Short Description{" "}
                {requiredFieldsByType[activeTab].includes("description") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter short description"
              />
            </div>
            <div>
              <Label htmlFor="longDescription">
                Long Description{" "}
                {requiredFieldsByType[activeTab].includes(
                  "longDescription"
                ) && <span className="text-red-500">*</span>}
              </Label>
              <Textarea
                id="longDescription"
                value={formData.longDescription}
                onChange={(e) =>
                  setFormData({ ...formData, longDescription: e.target.value })
                }
                placeholder="Enter long description"
                className="min-h-[200px]"
              />
            </div>
            {/* <div>
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
                  {contentTypes.program.categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
            <div>
              <Label htmlFor="goals">
                Goals{" "}
                {requiredFieldsByType[activeTab].includes("goals") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Textarea
                id="goals"
                value={formData.goals?.join("\n")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    goals: e.target.value.split("\n"),
                  })
                }
                placeholder="Enter goals (one per line)"
              />
            </div>
            <div>
              <Label htmlFor="achievements">
                Achievements{" "}
                {requiredFieldsByType[activeTab].includes("achievements") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Textarea
                id="achievements"
                value={formData.achievements?.join("\n")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    achievements: e.target.value.split("\n"),
                  })
                }
                placeholder="Enter achievements (one per line)"
              />
            </div>
            <div>
              <Label htmlFor="locations">
                Locations{" "}
                {requiredFieldsByType[activeTab].includes("locations") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Textarea
                id="locations"
                value={formData.locations?.join("\n")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    locations: e.target.value.split("\n"),
                  })
                }
                placeholder="Enter locations (one per line)"
              />
            </div>
            <div>
              <Label htmlFor="video">
                Video URL{" "}
                {requiredFieldsByType[activeTab].includes("video") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
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
              <Label htmlFor="status">
                Status{" "}
                {requiredFieldsByType[activeTab].includes("status") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
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
                  <SelectItem value="Proposed">Proposed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="start_date">
                Start Date{" "}
                {requiredFieldsByType[activeTab].includes("start_date") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="image">
                Image{" "}
                {requiredFieldsByType[activeTab].includes("image") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.files?.[0] || null,
                  })
                }
              />
            </div>
          </>
        );

      case "home":
        return (
          <>
            <div>
              <Label htmlFor="hero_headline">
                Hero Headline{" "}
                {requiredFieldsByType[activeTab].includes("hero_headline") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Input
                id="hero_headline"
                value={formData.hero_headline}
                onChange={(e) =>
                  setFormData({ ...formData, hero_headline: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="cta_text">
                CTA Text{" "}
                {requiredFieldsByType[activeTab].includes("cta_text") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Textarea
                id="cta_text"
                value={formData.cta_text}
                onChange={(e) =>
                  setFormData({ ...formData, cta_text: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="mission">
                Mission Statement{" "}
                {requiredFieldsByType[activeTab].includes("mission") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Textarea
                id="mission"
                value={formData.mission}
                onChange={(e) =>
                  setFormData({ ...formData, mission: e.target.value })
                }
                className="min-h-[100px]"
              />
            </div>
            <div>
              <Label htmlFor="vision">
                Vision Statement{" "}
                {requiredFieldsByType[activeTab].includes("vision") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Textarea
                id="vision"
                value={formData.vision}
                onChange={(e) =>
                  setFormData({ ...formData, vision: e.target.value })
                }
                className="min-h-[100px]"
              />
            </div>
            <div>
              <Label htmlFor="hero_image">
                Hero Image{" "}
                {requiredFieldsByType[activeTab].includes("hero_image") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero_image: e.target.files?.[0],
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="images">
                Mission Vission Images{" "}
                {requiredFieldsByType[activeTab].includes("images") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    images: Array.from(e.target.files),
                  })
                }
              />
            </div>
            <div>
              <Label className="mr-2">
                Videos{" "}
                {requiredFieldsByType[activeTab].includes("videos") && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <div className="space-y-2">
                {formData.videos?.map((video, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      value={video}
                      className="flex-1"
                      onChange={(e) => {
                        const newVideos = [...formData.videos];
                        newVideos[index] = e.target.value;
                        setFormData({ ...formData, videos: newVideos });
                      }}
                      placeholder="Enter video URL"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const newVideos = formData.videos.filter(
                          (_, i) => i !== index
                        );
                        setFormData({ ...formData, videos: newVideos });
                      }}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                className="mt-2"
                onClick={() =>
                  setFormData({
                    ...formData,
                    videos: [...(formData.videos || []), ""],
                  })
                }
              >
                Add Video URL
              </Button>
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
    <AdminLayout>
      <div className="space-y-8">
        {/* <div>
          <h1 className="text-3xl font-bold mb-2">Content Management</h1>
          <p className="text-muted-foreground">
            Manage all your website content in one place.
          </p>
        </div> */}

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <h1 className="text-2xl font-bold mb-2">Content Management</h1>
            {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            /> */}
          </div>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={(open) => {
              setIsCreateDialogOpen(open);
              if (!open) {
                setIsProcessing(false);
                resetForm();
              }
            }}
          >
            <DialogTrigger asChild>
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  if (!(await checkAuth())) return;
                  setIsCreateDialogOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" /> Create New
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[1200px] w-full max-h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>
                  Create {contentTypes[activeTab].title}
                </DialogTitle>
              </DialogHeader>
              <div className="overflow-y-auto flex-1 px-1">
                <div className="space-y-4 mt-4">
                  {getFormFields()}
                  <Button
                    onClick={() => handleCreate(activeTab)}
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      `Create ${contentTypes[activeTab].title}`
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs
          defaultValue="news"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="flex w-full overflow-x-auto md:overflow-visible">
            <TabsTrigger
              value="home"
              className="text-sm sm:text-base px-2 sm:px-4 flex items-center whitespace-nowrap"
            >
              <Home className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger
              value="news"
              className="text-sm sm:text-base px-2 sm:px-4 flex items-center whitespace-nowrap"
            >
              <Newspaper className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">News</span>
            </TabsTrigger>
            <TabsTrigger
              value="program"
              className="text-sm sm:text-base px-2 sm:px-4 flex items-center whitespace-nowrap"
            >
              <BookOpen className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Programs</span>
            </TabsTrigger>
            <TabsTrigger
              value="story"
              className="text-sm sm:text-base px-2 sm:px-4 flex items-center whitespace-nowrap"
            >
              <Heart className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Stories</span>
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
                          <th className="text-left py-3 px-2 sm:px-4 w-[45%]">
                            Title
                          </th>
                          <th className="text-left py-3 px-2 sm:px-4 w-[30%]">
                            Date
                          </th>
                          <th className="text-right py-3 px-2 sm:px-4 w-[25%]">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {contentItems.map((item) => (
                          <tr key={item.id} className="border-b">
                            <td className="py-3 px-2 sm:px-4 whitespace-normal align-top">
                              <div className="break-words max-w-[95%]">
                                {activeTab === "home"
                                  ? item.hero_headline
                                  : item.title}
                              </div>
                            </td>
                            <td className="py-3 px-2 sm:px-4 whitespace-normal align-top">
                              <div className="break-words">
                                {formatDate(item.updated_at)}
                              </div>
                            </td>
                            <td className="py-3 px-2 sm:px-4  align-top">
                              <div className="flex flex-col sm:flex-row justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={async () => {
                                    if (!(await checkAuth())) return;
                                    handleEdit(item);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={async () => {
                                    if (!(await checkAuth())) return;
                                    handleDelete(item.id);
                                  }}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-center mt-4 space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={async () => {
                        if (!(await checkAuth())) return;
                        setCurrentPage((prev) => prev - 1);
                      }}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={async () => {
                        if (!(await checkAuth())) return;
                        setCurrentPage((prev) => prev + 1);
                      }}
                    >
                      Next
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Edit Dialog */}
        <Dialog
          open={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            if (!open) {
              setIsProcessing(false);
              resetForm();
            }
          }}
        >
          <DialogContent className="max-w-[1200px] w-full max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Edit {contentTypes[activeTab].title}</DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 px-1">
              <div className="space-y-4 mt-4">
                {getFormFields()}
                <Button
                  onClick={handleUpdate}
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    `Update ${contentTypes[activeTab].title}`
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
