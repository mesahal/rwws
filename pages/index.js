import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ArrowRight,
  Heart,
  Users,
  Globe,
  BookOpen,
  Calendar,
  Newspaper,
} from "lucide-react";
import { getHome, getAll } from "@/lib/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_IMAGE_URL;
// Add this at the top of getStaticProps
const page = 1;
const pageSize = 3; // Or whatever number you want per section
export async function getStaticProps() {
  try {
    const homeData = await getHome(1, 10);
    const storyContent = await getAll(page, pageSize, "story");
    const programContent = await getAll(page, pageSize, "program");
    const newsContent = await getAll(page, pageSize, "news");

    return {
      props: {
        homeContent: homeData.content[0] || null,
        programs: programContent.data.programList,
        impactStories: storyContent.data.storyList,
        newsItems: newsContent.data.newsList,
      },
      revalidate: 3600, // ISR revalidation
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        homeContent: null,
      },
    };
  }
}

export default function Home({
  homeContent,
  programs,
  impactStories,
  newsItems,
}) {
  const [loading, setLoading] = useState(true);
  console.log(newsItems);

  // The loading state only checks homeContent, but other content might be missing
  useEffect(() => {
    if (homeContent && programs && impactStories && newsItems) {
      setLoading(false);
    }
  }, [homeContent, programs, impactStories, newsItems]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!homeContent) {
    return <div className="text-center py-8">Failed to load content</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-chart-3 text-white py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          {homeContent.hero_image && (
            <Image
              src={`${BASE_URL}${homeContent.hero_image}`}
              alt={homeContent.hero_headline}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          )}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {homeContent.hero_headline}
            </h1>
            <p className="text-xl md:text-2xl mb-8">{homeContent.cta_text}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white hover:bg-gray-100 text-primary dark:bg-black dark:text-primary"
              >
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white hover:bg-gray-100 text-primary dark:bg-black dark:text-primary"
              >
                <Link href="/apply-for-aid">Apply for Aid</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>
              <p className="text-lg mb-6">{homeContent.mission}</p>
              <p className="text-lg mb-6">{homeContent.vision}</p>
              <Button asChild variant="outline">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={`${BASE_URL}${homeContent.images[0]}`}
                alt="Community gathering"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Impact Stories</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Real stories of how our programs are changing lives and
              communities around the world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStories.map((story) => (
              <Card key={story.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`${BASE_URL}${story.image}`}
                    alt={story.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  {/* <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    {story.category}
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
                    <Link href={`/impact-stories/${story.id}`}>
                      Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link href="/impact-stories">View All Impact Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Latest News</h2>
            <Button asChild variant="ghost">
              <Link href="/news">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <Card key={item.id}>
                <div className="relative h-48">
                  <Image
                    src={`${BASE_URL}${item.image}`}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Newspaper className="h-4 w-4 mr-2" />
                    <span className="text-sm">{item.date}</span>
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground mb-6 line-clamp-2">
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
        </div>
      </section>

      {/* Programs & Initiatives */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Our Programs & Initiatives
            </h2>
            <p className="text-lg max-w-3xl mx-auto">
              Discover how we're making a difference through our various
              programs and initiatives.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Card key={program.id} className="text-center">
                <div className="relative h-48">
                  <Image
                    src={`${BASE_URL}${program.image}`}
                    alt={program.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <CardHeader>
                  <div className="mx-auto mb-4">{program.icon}</div>
                  <CardTitle>{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{program.description}</CardDescription>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button asChild variant="ghost">
                    <Link href={`/programs/${program.id}`}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link href="/programs">View All Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether you want to donate, volunteer, or apply for aid, there are
            many ways to get involved with RWWS.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white hover:bg-gray-100 text-primary dark:bg-black dark:text-primary"
            >
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white hover:bg-gray-100 text-primary dark:bg-black dark:text-primary"
            >
              <Link href="/apply-for-aid">Apply for Aid</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white hover:bg-gray-100 text-primary dark:bg-black dark:text-primary"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      {/* <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary mb-2">50+</p>
              <p className="text-lg">Countries Served</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">2M+</p>
              <p className="text-lg">Lives Impacted</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">500+</p>
              <p className="text-lg">Projects Completed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">10K+</p>
              <p className="text-lg">Volunteers Worldwide</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Upcoming Events */}
      {/* <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <Button asChild variant="ghost">
              <Link href="/events">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">July 15, 2025</span>
                </div>
                <CardTitle>Annual Charity Gala</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join us for an evening of inspiration and giving at our annual
                  fundraising gala.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/events/1">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">August 5, 2025</span>
                </div>
                <CardTitle>Volunteer Training Workshop</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  A comprehensive training session for new volunteers joining
                  our global initiatives.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/events/2">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">September 20, 2025</span>
                </div>
                <CardTitle>Community Health Fair</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Free health screenings and education for underserved
                  communities.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/events/3">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section> */}
    </div>
  );
}
