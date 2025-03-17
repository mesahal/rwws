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
import { newsService } from "@/lib/news";
import { getAll, create, update } from "../../../lib/api";
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
} from "lucide-react";
import AdminLayout from "../layout";

export default function ContentManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categoryId, setCategoryId] = useState("1");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchNews();
  }, [currentPage]);

  const fetchNews = async () => {
    try {
      const response = await getAll(currentPage, 10);
      setNews(response.data.newsList);
      setTotalPages(Math.ceil(response.data.total_count) / 10);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch news",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!title || !excerpt || !categoryId || !image) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append(
      "jsonData",
      JSON.stringify({
        title,
        excerpt,
        category_id: parseInt(categoryId),
      })
    );

    try {
      const response = await create(formData);
      if (response.success) {
        toast({
          title: "Success",
          description: "News created successfully",
        });
        fetchNews();
        setIsCreateDialogOpen(false);
        resetForm();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create news",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async () => {
    if (!selectedNews || !title || !excerpt || !categoryId) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append(
      "jsonData",
      JSON.stringify({
        title,
        excerpt,
        category_id: parseInt(categoryId),
      })
    );

    try {
      const response = await newsService.update(selectedNews.id, formData);
      if (response.success) {
        toast({
          title: "Success",
          description: "News updated successfully",
        });
        fetchNews();
        setIsEditDialogOpen(false);
        resetForm();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update news",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this news item?")) {
      return;
    }

    try {
      const response = await newsService.delete(id);
      if (response.success) {
        toast({
          title: "Success",
          description: "News deleted successfully",
        });
        fetchNews();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete news",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setTitle("");
    setExcerpt("");
    setCategoryId("1");
    setImage(null);
    setSelectedNews(null);
  };

  const openEditDialog = (news) => {
    setSelectedNews(news);
    setTitle(news.title);
    setExcerpt(news.excerpt);
    setCategoryId(news.category_id.toString());
    setIsEditDialogOpen(true);
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
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Create New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create News</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter news title"
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Enter news excerpt"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Category 1</SelectItem>
                      <SelectItem value="2">Category 2</SelectItem>
                      <SelectItem value="3">Category 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                  />
                </div>
                <Button onClick={handleCreate} className="w-full">
                  Create News
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="news">
          <TabsList>
            <TabsTrigger value="news">
              <Newspaper className="h-4 w-4 mr-2" /> News
            </TabsTrigger>
            <TabsTrigger value="blogs">
              <FileText className="h-4 w-4 mr-2" /> Blogs
            </TabsTrigger>
            <TabsTrigger value="programs">
              <BookOpen className="h-4 w-4 mr-2" /> Programs
            </TabsTrigger>
            <TabsTrigger value="reports">
              <FileSpreadsheet className="h-4 w-4 mr-2" /> Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="news">
            <Card>
              <CardHeader>
                <CardTitle>News Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Title</th>
                        <th className="text-left py-3 px-4">Excerpt</th>
                        <th className="text-left py-3 px-4">Category</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {news.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-3 px-4">{item.title}</td>
                          <td className="py-3 px-4">{item.excerpt}</td>
                          <td className="py-3 px-4">
                            Category {item.category_id}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditDialog(item)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(item.id)}
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
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blogs">
            <Card>
              <CardHeader>
                <CardTitle>Blog Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Title</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-right py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>{/* Blog content will go here */}</tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="programs">
            <Card>
              <CardHeader>
                <CardTitle>Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Title</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-right py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>{/* Programs content will go here */}</tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Title</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-right py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>{/* Reports content will go here */}</tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit News</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter news title"
                />
              </div>
              <div>
                <Label htmlFor="edit-excerpt">Excerpt</Label>
                <Textarea
                  id="edit-excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Enter news excerpt"
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Category 1</SelectItem>
                    <SelectItem value="2">Category 2</SelectItem>
                    <SelectItem value="3">Category 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-image">Image (Optional)</Label>
                <Input
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </div>
              <Button onClick={handleUpdate} className="w-full">
                Update News
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
