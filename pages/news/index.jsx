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
import { getAll, getHome } from "../../lib/api";

export const metadata = {
  title: "News & Updates - RWWS",
  description:
    "Stay informed about our latest initiatives, events, and impact stories",
};
const BASE_URL = process.env.NEXT_PUBLIC_API_IMAGE_URL;

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const pageSize = 6;

export async function getStaticProps() {
  const page = 1;
  try {
    const homeData = await getHome(1, 10);
    const response = await getAll(page, pageSize, "news");
    const { newsList, total_count } = response.data; // ✅ Correct Destructuring
    // Add slug generation
    const newsWithSlugs = newsList.map((item) => ({
      ...item,
      slug: item.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
    }));

    return {
      props: {
        newsItems: newsWithSlugs,
        totalPages: Math.ceil(total_count / pageSize),
        page,
        homeContent: homeData.content[0] || null,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return {
      props: { newsItems: [], totalPages: 1, page: 1, homeContent: homeData },
    };
  }
}

export default function NewsPage({ newsItems, totalPages, page, homeContent }) {
  const currentItems = newsItems;
  if (!homeContent) {
    return <div className="text-center py-8">Failed to load content</div>;
  }
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-chart-3 text-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <Image
            src={`${BASE_URL}${homeContent.hero_image}`}
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
                      src={`${BASE_URL}${newsItems[0].image}`}
                      alt={newsItems[0].title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    {/* <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      {newsItems[0].category_name}
                    </div> */}
                  </div>
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {formatDate(newsItems[0].updated_at)}
                        </span>
                        <span className="mx-2">•</span>
                        {/* <span className="text-sm">{newsItems[0].author}</span> */}
                      </div>
                      <h2 className="text-2xl font-bold mb-4">
                        {newsItems[0].title}
                      </h2>
                      <p className="text-muted-foreground mb-6 line-clamp-2">
                        {newsItems[0].excerpt}
                      </p>
                    </div>
                    <Button asChild>
                      <Link href={`/news/${newsItems[0].slug}`}>
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
              <Card key={item.slug} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`${BASE_URL}${item.image}`}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  {/* <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    {item.category_name}
                  </div> */}
                </div>
                <CardHeader>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {formatDate(item.updated_at)}
                    </span>
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-2">
                    {item.excerpt}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="w-full">
                    <Link href={`/news/${item.slug}`}>
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
    </div>
  );
}
