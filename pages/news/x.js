"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { newsService, type News } from '@/lib/news'
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
  Heart
} from 'lucide-react'

// Content type interfaces
interface ContentItem {
  id: string
  title: string
  excerpt: string
  content: string
  image?: File | null
  category: string
  status: string
  date: string
  author: string
}

interface ContentFormData {
  title: string
  excerpt: string
  content: string
  category: string
  status: string
  image: File | null
}

export default function ContentManagement() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('news')
  const [contentItems, setContentItems] = useState<ContentItem[]>([])

  // Form states
  const [formData, setFormData] = useState<ContentFormData>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    status: 'draft',
    image: null
  })

  // Content type specific configurations
  const contentTypes = {
    news: {
      categories: ['Breaking News', 'Press Release', 'Update', 'Announcement'],
      title: 'News Articles',
      icon: <Newspaper className="h-4 w-4 mr-2" />
    },
    blogs: {
      categories: ['Impact Stories', 'Field Reports', 'Opinion', 'Analysis'],
      title: 'Blog Posts',
      icon: <FileText className="h-4 w-4 mr-2" />
    },
    programs: {
      categories: ['Water & Sanitation', 'Education', 'Healthcare', 'Economic Development'],
      title: 'Programs',
      icon: <BookOpen className="h-4 w-4 mr-2" />
    },
    reports: {
      categories: ['Annual Report', 'Financial Report', 'Impact Report', 'Project Report'],
      title: 'Reports',
      icon: <FileSpreadsheet className="h-4 w-4 mr-2" />
    },
    impact: {
      categories: ['Community Stories', 'Project Outcomes', 'Testimonials', 'Case Studies'],
      title: 'Impact Stories',
      icon: <Heart className="h-4 w-4 mr-2" />
    }
  }

  useEffect(() => {
    fetchContent()
  }, [currentPage, activeTab])

  const fetchContent = async () => {
    setLoading(true)
    try {
      // In a real app, this would be an API call specific to each content type
      const response = await fetch(`/api/${activeTab}?page=${currentPage}`)
      const data = await response.json()
      setContentItems(data.items)
      setTotalPages(data.totalPages)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch content",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!formData.title || !formData.excerpt || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      })
      return
    }

    const formDataToSend = new FormData()
    if (formData.image) {
      formDataToSend.append('image', formData.image)
    }
    formDataToSend.append('jsonData', JSON.stringify({
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      status: formData.status
    }))

    try {
      // In a real app, this would be an API call specific to each content type
      const response = await fetch(`/api/${activeTab}`, {
        method: 'POST',
        body: formDataToSend
      })
      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Content created successfully",
        })
        fetchContent()
        setIsCreateDialogOpen(false)
        resetForm()
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create content",
        variant: "destructive",
      })
    }
  }

  const handleUpdate = async () => {
    if (!selectedItem || !formData.title || !formData.excerpt || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      })
      return
    }

    const formDataToSend = new FormData()
    if (formData.image) {
      formDataToSend.append('image', formData.image)
    }
    formDataToSend.append('jsonData', JSON.stringify({
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      status: formData.status
    }))

    try {
      // In a real app, this would be an API call specific to each content type
      const response = await fetch(`/api/${activeTab}/${selectedItem.id}`, {
        method: 'PUT',
        body: formDataToSend
      })
      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Content updated successfully",
        })
        fetchContent()
        setIsEditDialogOpen(false)
        resetForm()
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update content",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return
    }

    try {
      // In a real app, this would be an API call specific to each content type
      const response = await fetch(`/api/${activeTab}/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Content deleted successfully",
        })
        fetchContent()
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete content",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      status: 'draft',
      image: null
    })
    setSelectedItem(null)
  }

  const openEditDialog = (item: ContentItem) => {
    setSelectedItem(item)
    setFormData({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      status: item.status,
      image: null
    })
    setIsEditDialogOpen(true)
  }

  const ContentForm = ({ mode }: { mode: 'create' | 'edit' }) => (
    <div className="space-y-4 mt-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter title"
        />
      </div>
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          placeholder="Enter excerpt"
        />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Enter content"
          className="min-h-[200px]"
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select 
          value={formData.category} 
          onValueChange={(value) => setFormData({ ...formData, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {contentTypes[activeTab as keyof typeof contentTypes].categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select 
          value={formData.status} 
          onValueChange={(value) => setFormData({ ...formData, status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="image">Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
        />
      </div>
      <Button onClick={mode === 'create' ? handleCreate : handleUpdate} className="w-full">
        {mode === 'create' ? 'Create' : 'Update'} {contentTypes[activeTab as keyof typeof contentTypes].title}
      </Button>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
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
              <DialogTitle>Create {contentTypes[activeTab as keyof typeof contentTypes].title}</DialogTitle>
            </DialogHeader>
            <ContentForm mode="create" />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="news" value={activeTab} onValueChange={setActiveTab}>
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
          <TabsTrigger value="impact">
            <Heart className="h-4 w-4 mr-2" /> Impact Stories
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileSpreadsheet className="h-4 w-4 mr-2" /> Reports
          </TabsTrigger>
        </TabsList>

        {Object.keys(contentTypes).map((type) => (
          <TabsContent key={type} value={type}>
            <Card>
              <CardHeader>
                <CardTitle>{contentTypes[type as keyof typeof contentTypes].title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Title</th>
                        <th className="text-left py-3 px-4">Category</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contentItems.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-3 px-4">{item.title}</td>
                          <td className="py-3 px-4">{item.category}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              item.status === 'published' ? 'bg-green-100 text-green-800' :
                              item.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">{item.date}</td>
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
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {contentTypes[activeTab as keyof typeof contentTypes].title}</DialogTitle>
          </DialogHeader>
          <ContentForm mode="edit" />
        </DialogContent>
      </Dialog>
    </div>
  )
}