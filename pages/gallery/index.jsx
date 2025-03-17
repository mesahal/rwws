import Link from "next/link";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Play, Download, X, ChevronLeft, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Media Gallery - RWWS",
  description:
    "Browse photos and videos from our projects, events, and initiatives around the world",
};

// Mock data (would come from API in production)
const mediaItems = [
  {
    id: 1,
    title: "Clean Water Project in Tanzania",
    description:
      "Installation of a new water well providing clean water to over 500 families.",
    type: "image",
    category: "Projects",
    location: "Tanzania",
    date: "June 2025",
    url: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  },
  {
    id: 2,
    title: "Education Program Launch",
    description: "Opening ceremony of our new school building in rural India.",
    type: "image",
    category: "Events",
    location: "India",
    date: "May 2025",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  },
  {
    id: 3,
    title: "Healthcare Outreach in Remote Villages",
    description:
      "Mobile clinic providing essential healthcare services to isolated communities.",
    type: "image",
    category: "Projects",
    location: "Myanmar",
    date: "April 2025",
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  },
  {
    id: 4,
    title: "Annual Fundraising Gala",
    description:
      "Our annual gala that raised $2 million for global initiatives.",
    type: "image",
    category: "Events",
    location: "United States",
    date: "March 2025",
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  },
  {
    id: 5,
    title: "Sustainable Farming Initiative",
    description:
      "Training local farmers in sustainable agricultural practices.",
    type: "image",
    category: "Projects",
    location: "Kenya",
    date: "February 2025",
    url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  },
  {
    id: 6,
    title: "Women's Empowerment Workshop",
    description:
      "Skills training and microfinance program for women entrepreneurs.",
    type: "image",
    category: "Projects",
    location: "Bangladesh",
    date: "January 2025",
    url: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  },
  {
    id: 7,
    title: "Emergency Response After Flooding",
    description:
      "Providing immediate relief to communities affected by natural disasters.",
    type: "image",
    category: "Emergency Relief",
    location: "Philippines",
    date: "December 2024",
    url: "https://images.unsplash.com/photo-1469571486292-b53601010376?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  },
  {
    id: 8,
    title: "Clean Water Impact",
    description:
      "How our clean water initiatives are transforming communities.",
    type: "video",
    category: "Projects",
    location: "Multiple",
    date: "November 2024",
    url: "https://www.youtube.com/embed/XyNh1JRuZdg",
    thumbnail:
      "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 9,
    title: "Education Impact Stories",
    description: "Stories of transformation through our education programs.",
    type: "video",
    category: "Impact Stories",
    location: "Global",
    date: "October 2024",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 10,
    title: "Healthcare Program Overview",
    description: "Overview of our healthcare initiatives and their impact.",
    type: "video",
    category: "Projects",
    location: "Global",
    date: "September 2024",
    url: "https://www.youtube.com/embed/M7lc1UVf-VE",
    thumbnail:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-chart-3 text-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <Image
            src="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Media Gallery"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Media Gallery</h1>
            <p className="text-xl mb-0">
              Browse photos and videos from our projects, events, and
              initiatives around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mediaItems.map((item) => (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <Card className="overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                        <div className="relative h-64">
                          <Image
                            src={
                              item.type === "video" ? item.thumbnail : item.url
                            }
                            alt={item.title}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                          {item.type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Play className="h-12 w-12 text-white" />
                            </div>
                          )}
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                            {item.category}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                          <div className="flex items-center mt-2 text-sm text-muted-foreground">
                            <span>{item.location}</span>
                            <span className="mx-2">•</span>
                            <span>{item.date}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{item.title}</DialogTitle>
                        <DialogDescription>
                          {item.description}
                        </DialogDescription>
                      </DialogHeader>
                      {item.type === "video" ? (
                        <div className="relative aspect-video">
                          <iframe
                            src={item.url}
                            title={item.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="relative aspect-video">
                          <Image
                            src={item.url}
                            alt={item.title}
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-lg"
                          />
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-muted-foreground">
                          <p>
                            {item.location} • {item.date}
                          </p>
                        </div>
                        {item.type === "image" && (
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" /> Download
                          </Button>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="projects">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mediaItems
                  .filter((item) => item.category === "Projects")
                  .map((item) => (
                    <Dialog key={item.id}>
                      <DialogTrigger asChild>
                        <Card className="overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                          <div className="relative h-64">
                            <Image
                              src={
                                item.type === "video"
                                  ? item.thumbnail
                                  : item.url
                              }
                              alt={item.title}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                            {item.type === "video" && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <Play className="h-12 w-12 text-white" />
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-bold mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                            <div className="flex items-center mt-2 text-sm text-muted-foreground">
                              <span>{item.location}</span>
                              <span className="mx-2">•</span>
                              <span>{item.date}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>{item.title}</DialogTitle>
                          <DialogDescription>
                            {item.description}
                          </DialogDescription>
                        </DialogHeader>
                        {item.type === "video" ? (
                          <div className="relative aspect-video">
                            <iframe
                              src={item.url}
                              title={item.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full"
                            />
                          </div>
                        ) : (
                          <div className="relative aspect-video">
                            <Image
                              src={item.url}
                              alt={item.title}
                              fill
                              style={{ objectFit: "cover" }}
                              className="rounded-lg"
                            />
                          </div>
                        )}
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm text-muted-foreground">
                            <p>
                              {item.location} • {item.date}
                            </p>
                          </div>
                          {item.type === "image" && (
                            <Button variant="outline">
                              <Download className="h-4 w-4 mr-2" /> Download
                            </Button>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mediaItems
                  .filter((item) => item.category === "Events")
                  .map((item) => (
                    <Dialog key={item.id}>
                      <DialogTrigger asChild>
                        <Card className="overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                          <div className="relative h-64">
                            <Image
                              src={
                                item.type === "video"
                                  ? item.thumbnail
                                  : item.url
                              }
                              alt={item.title}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                            {item.type === "video" && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <Play className="h-12 w-12 text-white" />
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-bold mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                            <div className="flex items-center mt-2 text-sm text-muted-foreground">
                              <span>{item.location}</span>
                              <span className="mx-2">•</span>
                              <span>{item.date}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>{item.title}</DialogTitle>
                          <DialogDescription>
                            {item.description}
                          </DialogDescription>
                        </DialogHeader>
                        {item.type === "video" ? (
                          <div className="relative aspect-video">
                            <iframe
                              src={item.url}
                              title={item.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full"
                            />
                          </div>
                        ) : (
                          <div className="relative aspect-video">
                            <Image
                              src={item.url}
                              alt={item.title}
                              fill
                              style={{ objectFit: "cover" }}
                              className="rounded-lg"
                            />
                          </div>
                        )}
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm text-muted-foreground">
                            <p>
                              {item.location} • {item.date}
                            </p>
                          </div>
                          {item.type === "image" && (
                            <Button variant="outline">
                              <Download className="h-4 w-4 mr-2" /> Download
                            </Button>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mediaItems
                  .filter((item) => item.type === "video")
                  .map((item) => (
                    <Dialog key={item.id}>
                      <DialogTrigger asChild>
                        <Card className="overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                          <div className="relative h-64">
                            <Image
                              src={item.thumbnail}
                              alt={item.title}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Play className="h-12 w-12 text-white" />
                            </div>
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                              {item.category}
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-bold mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                            <div className="flex items-center mt-2 text-sm text-muted-foreground">
                              <span>{item.location}</span>
                              <span className="mx-2">•</span>
                              <span>{item.date}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>{item.title}</DialogTitle>
                          <DialogDescription>
                            {item.description}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="relative aspect-video">
                          <iframe
                            src={item.url}
                            title={item.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                          />
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm text-muted-foreground">
                            <p>
                              {item.location} • {item.date}
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Share Your Story</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Have photos or videos from our projects or events? Share them with
            us and help tell the story of our impact.
          </p>
          <Button asChild>
            <Link href="/contact">Submit Media</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
