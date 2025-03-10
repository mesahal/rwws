import Link from "next/link";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { ArrowRight, Calendar, Filter, Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { fetchNews } from "../../lib/api";

export const metadata = {
  title: "News & Updates - Hope Foundation",
  description:
    "Stay informed about our latest initiatives, events, and impact stories",
};

// Mock data (would come from API in production)
// const newsItems = [
//   {
//     id: 1,
//     title: "Annual Fundraising Gala Raises $2 Million",
//     date: "June 15, 2025",
//     excerpt:
//       "Our annual gala exceeded expectations with record-breaking donations that will fund our clean water initiatives across three continents.",
//     image:
//       "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     category: "Events",
//     author: "Sarah Johnson",
//   },
//   {
//     id: 2,
//     title: "New Partnership with Global Health Initiative",
//     date: "May 28, 2025",
//     excerpt:
//       "Strategic partnership will expand our healthcare programs to 5 new countries, providing essential medical services to underserved communities.",
//     image:
//       "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     category: "Partnerships",
//     author: "Michael Chen",
//   },
//   {
//     id: 3,
//     title: "Hope Foundation Receives Humanitarian Award",
//     date: "April 10, 2025",
//     excerpt:
//       "Recognized for outstanding contributions to community development and sustainable solutions for poverty alleviation worldwide.",
//     image:
//       "https://images.unsplash.com/photo-1569937372578-d4239796fa08?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     category: "Awards",
//     author: "Amara Okafor",
//   },
//   {
//     id: 4,
//     title: "Clean Water Initiative Reaches 100th Village",
//     date: "March 22, 2025",
//     excerpt:
//       "Our flagship clean water program has now provided safe drinking water to over 500,000 people across 100 villages in rural areas.",
//     image:
//       "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     category: "Programs",
//     author: "James Rodriguez",
//   },
//   {
//     id: 5,
//     title: "Education Program Expands to 10 New Schools",
//     date: "February 15, 2025",
//     excerpt:
//       "Our Education for All initiative is expanding to 10 additional schools, providing quality education to 5,000 more children.",
//     image:
//       "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     category: "Programs",
//     author: "Dr. Mei Lin",
//   },
//   {
//     id: 6,
//     title: "Annual Report Shows 35% Growth in Impact",
//     date: "January 30, 2025",
//     excerpt:
//       "Our 2024 annual report reveals significant growth in all program areas and improved efficiency in resource allocation.",
//     image:
//       "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     category: "Reports",
//     author: "Robert Kenyatta",
//   },
//   {
//     id: 7,
//     title: "Emergency Response Team Deployed After Flooding",
//     date: "December 12, 2024",
//     excerpt:
//       "Our emergency response team has been deployed to provide immediate relief to communities affected by severe flooding in Southeast Asia.",
//     image:
//       "https://images.unsplash.com/photo-1469571486292-b53601010376?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     category: "Emergency Relief",
//     author: "Sarah Johnson",
//   },
//   {
//     id: 8,
//     title: "New Mobile Health Clinics Launch in Rural Areas",
//     date: "November 5, 2024",
//     excerpt:
//       "Five new mobile health clinics will bring essential healthcare services to remote communities with limited access to medical facilities.",
//     image:
//       "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     category: "Healthcare",
//     author: "Dr. Mei Lin",
//   },
// ];

const categories = [
  "All Categories",
  "Events",
  "Partnerships",
  "Awards",
  "Programs",
  "Reports",
  "Emergency Relief",
  "Healthcare",
];
const years = ["All Years", "2025", "2024", "2023", "2022"];
// ✅ Fetch news on each request (SSR)
export async function getServerSideProps(context) {
  const page = context.query.page ? parseInt(context.query.page) : 1;
  try {
    const { items: newsItems, totalPages } = await fetchNews(page);
    return { props: { newsItems, totalPages, page } };
  } catch (error) {
    console.error("Error fetching news:", error);
    return { props: { newsItems: [], totalPages: 1, page: 1 } };
  }
}
export default function NewsPage({ newsItems, totalPages, page }) {
  // const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  // const { items: newsItems, totalPages } = await fetchNews(page);
  const itemsPerPage = 6;
  // const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  // Calculate the items to display on the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = newsItems.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-chart-3 text-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <Image
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="News and updates"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">News & Updates</h1>
            <p className="text-xl mb-0">
              Stay informed about our latest initiatives, events, and impact
              stories.
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
                <Input placeholder="Search news..." className="pl-10" />
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

      {/* News Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured News (first item) */}
          {page === 1 && newsItems.length > 0 && (
            <div className="mb-12">
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={newsItems[0].image}
                      alt={newsItems[0].title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      {newsItems[0].category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">{newsItems[0].date}</span>
                        <span className="mx-2">•</span>
                        <span className="text-sm">{newsItems[0].author}</span>
                      </div>
                      <h2 className="text-2xl font-bold mb-4">
                        {newsItems[0].title}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        {newsItems[0].excerpt}
                      </p>
                    </div>
                    <Button asChild>
                      <Link href={`/news/${newsItems[0].id}`}>
                        Read Full Article{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    {item.category}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{item.date}</span>
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.excerpt}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="w-full">
                    <Link href={`/news/${item.id}`}>
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
                    <PaginationPrevious href={`/news?page=${page - 1}`} />
                  </PaginationItem>
                )}

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href={`/news?page=${i + 1}`}
                      isActive={page === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {page < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={`/news?page=${page + 1}`} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Subscribe to our newsletter to receive the latest news and updates
            directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Your email address"
              type="email"
              className="flex-grow"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
