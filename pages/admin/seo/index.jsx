"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search,
  Globe,
  BarChart,
  Share2,
  Save,
  RefreshCw
} from 'lucide-react'

// Mock data - replace with API calls
const mockSeoData = {
  pages: [
    {
      id: 1,
      path: "/",
      title: "Hope Foundation - Empowering Communities",
      description: "Join us in our mission to create lasting change and empower communities worldwide through sustainable development and humanitarian aid.",
      keywords: "charity, nonprofit, humanitarian aid, community development",
      lastUpdated: "2025-03-15"
    },
    {
      id: 2,
      path: "/about",
      title: "About Us - Hope Foundation",
      description: "Learn about our mission, vision, team, and the impact we're making around the world through various humanitarian programs.",
      keywords: "about us, mission, vision, team, impact",
      lastUpdated: "2025-03-14"
    },
    {
      id: 3,
      path: "/programs",
      title: "Our Programs - Hope Foundation",
      description: "Explore our diverse range of programs focused on clean water, education, healthcare, and community development.",
      keywords: "programs, initiatives, water, education, healthcare",
      lastUpdated: "2025-03-13"
    }
  ],
  analytics: {
    totalVisits: 25000,
    avgTimeOnSite: "3:45",
    bounceRate: "35%",
    topPages: [
      { path: "/", visits: 8500 },
      { path: "/donate", visits: 5200 },
      { path: "/programs", visits: 3800 }
    ]
  }
}

export default function SeoManagement() {
  const [seoData] = useState(mockSeoData)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">SEO & Analytics</h1>
        <p className="text-muted-foreground">
          Manage your website's SEO settings and view analytics.
        </p>
      </div>

      <Tabs defaultValue="pages">
        <TabsList>
          <TabsTrigger value="pages">
            <Globe className="h-4 w-4 mr-2" /> Pages
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart className="h-4 w-4 mr-2" /> Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-6">
          <div className="flex justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search pages..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh Meta
            </Button>
          </div>

          <div className="grid gap-6">
            {seoData.pages.map((page) => (
              <Card key={page.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{page.path}</span>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" /> View Page
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Meta Title</label>
                      <Input defaultValue={page.title} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Meta Description</label>
                      <Textarea defaultValue={page.description} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Keywords</label>
                      <Input defaultValue={page.keywords} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Last updated: {page.lastUpdated}
                      </span>
                      <Button>
                        <Save className="h-4 w-4 mr-2" /> Save Changes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold mb-1">{seoData.analytics.totalVisits}</div>
                <p className="text-muted-foreground">Total Visits</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold mb-1">{seoData.analytics.avgTimeOnSite}</div>
                <p className="text-muted-foreground">Avg. Time on Site</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold mb-1">{seoData.analytics.bounceRate}</div>
                <p className="text-muted-foreground">Bounce Rate</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seoData.analytics.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{page.path}</span>
                    <span>{page.visits.toLocaleString()} visits</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}