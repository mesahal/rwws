"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  FileText, 
  Newspaper, 
  BookOpen, 
  FileSpreadsheet,
  Plus,
  Search,
  Edit,
  Trash,
  Eye
} from 'lucide-react'

// Mock data - replace with API calls
const mockContent = {
  blogs: [
    { id: 1, title: "Clean Water Initiative Success", status: "Published", date: "2025-03-15" },
    { id: 2, title: "Education Program Expansion", status: "Draft", date: "2025-03-14" },
    { id: 3, title: "Healthcare Outreach Results", status: "Published", date: "2025-03-13" }
  ],
  news: [
    { id: 1, title: "Annual Gala Raises $2M", status: "Published", date: "2025-03-15" },
    { id: 2, title: "New Partnership Announcement", status: "Scheduled", date: "2025-03-16" },
    { id: 3, title: "Community Impact Report", status: "Draft", date: "2025-03-14" }
  ],
  programs: [
    { id: 1, title: "Clean Water Initiative", status: "Active", date: "2025-01-01" },
    { id: 2, title: "Education for All", status: "Active", date: "2025-02-01" },
    { id: 3, title: "Healthcare Outreach", status: "Planning", date: "2025-04-01" }
  ],
  reports: [
    { id: 1, title: "Q1 2025 Impact Report", status: "Published", date: "2025-04-01" },
    { id: 2, title: "Annual Report 2024", status: "Published", date: "2025-02-15" },
    { id: 3, title: "Donor Impact Summary", status: "Draft", date: "2025-03-10" }
  ]
}

export default function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState('')

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'planning':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const ContentTable = ({ items }) => (
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
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-3 px-4">{item.title}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4">{item.date}</td>
                <td className="py-3 px-4">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
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
    </div>
  )

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
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Create New
        </Button>
      </div>

      <Tabs defaultValue="blogs">
        <TabsList>
          <TabsTrigger value="blogs">
            <FileText className="h-4 w-4 mr-2" /> Blogs
          </TabsTrigger>
          <TabsTrigger value="news">
            <Newspaper className="h-4 w-4 mr-2" /> News
          </TabsTrigger>
          <TabsTrigger value="programs">
            <BookOpen className="h-4 w-4 mr-2" /> Programs
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileSpreadsheet className="h-4 w-4 mr-2" /> Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blogs">
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <ContentTable items={mockContent.blogs} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news">
          <Card>
            <CardHeader>
              <CardTitle>News Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <ContentTable items={mockContent.news} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs">
          <Card>
            <CardHeader>
              <CardTitle>Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <ContentTable items={mockContent.programs} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <ContentTable items={mockContent.reports} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}