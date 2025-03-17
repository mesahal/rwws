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

// Mock data (would come from API in production)
const impactStories = [
  {
    id: 1,
    title: "Clean Water for Rural Village",
    excerpt:
      "How our water project transformed the lives of 500 families in a remote village.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image:
      "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Water & Sanitation",
    location: "East Africa",
  },
  {
    id: 2,
    title: "Education for All Initiative",
    excerpt:
      "Providing quality education to 1,000 underprivileged children in urban areas.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Education",
    location: "South Asia",
  },
  {
    id: 3,
    title: "Healthcare Outreach Program",
    excerpt:
      "Mobile clinics bringing essential healthcare to remote communities.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Healthcare",
    location: "Latin America",
  },
  {
    id: 4,
    title: "Sustainable Farming Project",
    excerpt:
      "Teaching sustainable farming techniques to improve food security.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Agriculture",
    location: "West Africa",
  },
  {
    id: 5,
    title: "Women's Empowerment Program",
    excerpt: "Providing skills training and microloans to women entrepreneurs.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image:
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Economic Development",
    location: "South Asia",
  },
  {
    id: 6,
    title: "Disaster Relief Efforts",
    excerpt:
      "Providing emergency aid to communities affected by natural disasters.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image:
      "https://images.unsplash.com/photo-1469571486292-b53601010376?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Emergency Relief",
    location: "Southeast Asia",
  },
];

const categories = [
  "All",
  "Water & Sanitation",
  "Education",
  "Healthcare",
  "Agriculture",
  "Economic Development",
  "Emergency Relief",
];
const locations = [
  "All",
  "East Africa",
  "West Africa",
  "South Asia",
  "Southeast Asia",
  "Latin America",
];

export const metadata = {
  title: "Impact Stories - RWWS",
  description:
    "Real stories of how our programs are changing lives and communities around the world",
};

export default function ImpactStories() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-chart-3 text-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <Image
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
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

      {/* Filters */}
      <section className="py-8 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              <h2 className="text-lg font-medium">Filter Stories</h2>
            </div>
            <div className="w-full md:w-auto">
              <Tabs defaultValue="category" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="category">By Category</TabsTrigger>
                  <TabsTrigger value="location">By Location</TabsTrigger>
                </TabsList>
                <TabsContent value="category" className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={category === "All" ? "default" : "outline"}
                        size="sm"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="location" className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {locations.map((location) => (
                      <Button
                        key={location}
                        variant={location === "All" ? "default" : "outline"}
                        size="sm"
                      >
                        {location}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStories.map((story) => (
              <Card key={story.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    {story.category}
                  </div>
                  <div className="absolute bottom-2 left-2 bg-background/80 text-foreground px-2 py-1 rounded text-xs font-medium">
                    {story.location}
                  </div>
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
          <Button asChild size="lg">
            <Link href="/donate">Donate Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
