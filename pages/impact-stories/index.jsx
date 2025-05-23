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
import { ArrowRight, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { getAll, getHome } from "../../lib/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_IMAGE_URL;

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const metadata = {
  title: "Impact Stories - RWWS",
  description:
    "Real stories of how our programs are changing lives and communities around the world",
};
const pageSize = 6;

export async function getStaticProps() {
  const page = 1;
  try {
    const homeData = await getHome(1, 10);
    const response = await getAll(page, pageSize, "story");
    const { storyList, total_count } = response.data;

    // Add slug generation
    const storiesWithSlugs = storyList.map((item) => ({
      ...item,
      slug: item.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
    }));

    return {
      props: {
        storyItems: storiesWithSlugs,
        totalPages: Math.ceil(total_count / pageSize),
        page,
        homeContent: homeData.content[0] || null,
      },
      revalidate: 3600,
    };
  } catch (error) {
    return {
      props: { storyItems: [], totalPages: 1, page: 1, homeContent: homeData },
    };
  }
}
export default function ImpactStories({
  storyItems,
  totalPages,
  page,
  homeContent,
}) {
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
            alt="People helping each other"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Impact Stories</h1>
            <p className="text-xl mb-0">
              Real stories of how our programs are changing lives and
              communities around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storyItems.map((story) => (
              <Card key={story.slug} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`${BASE_URL}${story.image}`}
                    alt={story.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  {/* <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    {story.category}
                  </div>
                  <div className="absolute bottom-2 left-2 bg-background/80 text-foreground px-2 py-1 rounded text-xs font-medium">
                    {story.location}
                  </div> */}
                </div>
                <CardHeader>
                  <CardTitle>{story.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{story.excerpt}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="w-full">
                    <Link href={`/impact-stories/${story.slug}`}>
                      Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
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
                    <PaginationPrevious
                      href={`/impact-stories?page=${page - 1}`}
                    />
                  </PaginationItem>
                )}

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href={`/impact-stories?page=${i + 1}`}
                      isActive={page === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {page < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={`/impact-stories?page=${page + 1}`} />
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
          <h2 className="text-3xl font-bold mb-6">
            Help Us Create More Success Stories
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Your support enables us to continue making a positive impact in
            communities around the world.
          </p>
          {/* <Button asChild size="lg">
            <Link href="/donate">Donate Now</Link>
          </Button> */}
        </div>
      </section>
    </div>
  );
}
