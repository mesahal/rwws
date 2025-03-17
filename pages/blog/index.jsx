import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowRight, Calendar, Search, User, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const metadata = {
  title: "Blog & Knowledge Hub - RWWS",
  description:
    "In-depth articles, research findings, and expert opinions on humanitarian issues and sustainable development",
};

// Mock data (would come from API in production)
const blogPosts = [
  {
    id: 1,
    slug: "sustainable-water-solutions",
    title: "Sustainable Water Solutions for Rural Communities",
    date: "June 20, 2025",
    author: "Dr. Maria Sanchez",
    authorRole: "Water Programs Director",
    authorImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    excerpt:
      "Exploring innovative and sustainable approaches to providing clean water access in rural communities facing water scarcity.",
    image:
      "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Research",
    tags: ["Water", "Sustainability", "Rural Development"],
  },
  {
    id: 2,
    slug: "education-digital-age",
    title: "Education in the Digital Age: Bridging the Technology Gap",
    date: "May 15, 2025",
    author: "James Wilson",
    authorRole: "Education Specialist",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    excerpt:
      "How digital technologies can transform education in underserved communities while addressing challenges of access and equity.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Opinion",
    tags: ["Education", "Technology", "Digital Divide"],
  },
  {
    id: 3,
    slug: "climate-resilience-strategies",
    title: "Climate Resilience Strategies for Vulnerable Communities",
    date: "April 22, 2025",
    author: "Dr. Ahmed Khan",
    authorRole: "Climate Adaptation Expert",
    authorImage:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    excerpt:
      "Practical approaches to building climate resilience in communities most vulnerable to the impacts of climate change.",
    image:
      "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Research",
    tags: ["Climate Change", "Resilience", "Adaptation"],
  },
  {
    id: 4,
    slug: "community-led-development",
    title: "The Power of Community-Led Development",
    date: "March 10, 2025",
    author: "Sophia Nguyen",
    authorRole: "Community Engagement Director",
    authorImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    excerpt:
      "Why community-led approaches lead to more sustainable and effective development outcomes, with case studies from our programs.",
    image:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Case Study",
    tags: ["Community Development", "Participation", "Sustainability"],
  },
  {
    id: 5,
    slug: "healthcare-innovation",
    title: "Healthcare Innovation in Resource-Limited Settings",
    date: "February 28, 2025",
    author: "Dr. Mei Lin",
    authorRole: "Healthcare Programs Director",
    authorImage:
      "https://images.unsplash.com/photo-1559582798-678dfc71ccd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    excerpt:
      "Innovative approaches to delivering quality healthcare in areas with limited resources and infrastructure.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Innovation",
    tags: ["Healthcare", "Innovation", "Technology"],
  },
  {
    id: 6,
    slug: "measuring-impact",
    title: "Measuring Impact: Beyond the Numbers",
    date: "January 15, 2025",
    author: "Robert Kenyatta",
    authorRole: "Monitoring & Evaluation Lead",
    authorImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    excerpt:
      "How to effectively measure the true impact of humanitarian and development programs beyond quantitative metrics.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Methodology",
    tags: ["Impact Measurement", "Evaluation", "Data"],
  },
  {
    id: 7,
    slug: "women-empowerment",
    title: "Women's Empowerment as a Catalyst for Community Development",
    date: "December 10, 2024",
    author: "Amara Okafor",
    authorRole: "Gender Programs Specialist",
    authorImage:
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    excerpt:
      "How focusing on women's empowerment creates ripple effects that benefit entire communities and economies.",
    image:
      "https://images.unsplash.com/photo-1573164713712-03790a178651?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Research",
    tags: ["Gender Equality", "Women's Empowerment", "Economic Development"],
  },
  {
    id: 8,
    slug: "humanitarian-tech",
    title: "The Future of Humanitarian Technology",
    date: "November 5, 2024",
    author: "Michael Chen",
    authorRole: "Innovation Director",
    authorImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    excerpt:
      "Emerging technologies that are transforming humanitarian response and development work around the world.",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Technology",
    tags: ["Technology", "Innovation", "Digital Transformation"],
  },
];

const categories = [
  "All Categories",
  "Research",
  "Opinion",
  "Case Study",
  "Innovation",
  "Methodology",
  "Technology",
];
const years = ["All Years", "2025", "2024", "2023"];

export default function BlogPage({ searchParams }) {
  // In a real app, these would come from the URL query params
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const itemsPerPage = 6;
  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);

  // Calculate the items to display on the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = blogPosts.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-chart-3 text-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <Image
            src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Blog and Knowledge Hub"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Blog & Knowledge Hub</h1>
            <p className="text-xl mb-0">
              In-depth articles, research findings, and expert opinions on
              humanitarian issues and sustainable development.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search articles..." className="pl-10" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="w-full sm:w-auto">
                <Select defaultValue="All Categories">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-auto">
                <Select defaultValue="All Years">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post (first item) */}
          {page === 1 && (
            <div className="mb-12">
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      {blogPosts[0].category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">{blogPosts[0].date}</span>
                        <span className="mx-2">•</span>
                        <User className="h-4 w-4 mr-2" />
                        <span className="text-sm">{blogPosts[0].author}</span>
                      </div>
                      <h2 className="text-2xl font-bold mb-4">
                        {blogPosts[0].title}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        {blogPosts[0].excerpt}
                      </p>
                    </div>
                    <Button asChild>
                      <Link href={`/blog/${blogPosts[0].slug}`}>
                        Read Full Article{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    {post.category}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{post.date}</span>
                  </div>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{post.excerpt}</CardDescription>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center bg-muted px-2 py-1 rounded-full text-xs"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="w-full">
                    <Link href={`/blog/${post.slug}`}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                {page > 1 && (
                  <PaginationItem>
                    <PaginationPrevious href={`/blog?page=${page - 1}`} />
                  </PaginationItem>
                )}

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href={`/blog?page=${i + 1}`}
                      isActive={page === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {page < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={`/blog?page=${page + 1}`} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Share Your Expertise</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Are you an expert in humanitarian work, sustainable development, or
            related fields? We welcome guest contributions to our knowledge hub.
          </p>
          <Button asChild>
            <Link href="/contact">Contact Us to Contribute</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
