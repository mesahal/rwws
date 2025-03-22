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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Globe,
  BookOpen,
  Users,
  Heart,
  Shield,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { getAll } from "../../lib/api";

export const metadata = {
  title: "Programs & Initiatives - RWWS",
  description:
    "Explore our ongoing and past projects focused on sustainable development and humanitarian aid",
};

export default function ProgramsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-chart-3 text-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <Image
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Programs and Initiatives"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Programs & Initiatives</h1>
            <p className="text-xl mb-0">
              Explore our ongoing and past projects focused on sustainable
              development and humanitarian aid.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
            <p className="text-lg max-w-3xl mx-auto">
              We implement sustainable, community-led programs that address
              immediate needs while building long-term resilience and
              self-sufficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <Users className="h-10 w-10 text-chart-1" />
                </div>
                <CardTitle>Community-Led</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We work directly with communities to understand their unique
                  needs and priorities, ensuring local ownership and
                  sustainability of all projects.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <Globe className="h-10 w-10 text-chart-2" />
                </div>
                <CardTitle>Sustainable Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our programs are designed to create lasting change by
                  addressing root causes, not just symptoms, and building local
                  capacity for continued progress.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <Heart className="h-10 w-10 text-chart-3" />
                </div>
                <CardTitle>Holistic Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We recognize the interconnected nature of development
                  challenges and implement integrated programs that address
                  multiple aspects of community wellbeing.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Programs</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Explore our diverse range of programs addressing critical needs in
              communities worldwide.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="all">All Programs</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs.map((program) => (
                  <Card key={program.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                        {program.category}
                      </div>
                      <div className="absolute bottom-2 left-2 bg-background/80 text-foreground px-2 py-1 rounded text-xs font-medium">
                        {program.status}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{program.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{program.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="w-full">
                        <Link href={`/programs/${program.id}`}>
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ongoing">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs
                  .filter((p) => p.status === "Ongoing")
                  .map((program) => (
                    <Card key={program.id} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={program.image}
                          alt={program.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                          {program.category}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>{program.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{program.description}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="ghost" className="w-full">
                          <Link href={`/programs/${program.id}`}>
                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs.filter((p) => p.status === "Completed").length > 0 ? (
                  programs
                    .filter((p) => p.status === "Completed")
                    .map((program) => (
                      <Card key={program.id} className="overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={program.image}
                            alt={program.title}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                            {program.category}
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle>{program.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            {program.description}
                          </CardDescription>
                        </CardContent>
                        <CardFooter>
                          <Button asChild variant="ghost" className="w-full">
                            <Link href={`/programs/${program.id}`}>
                              Learn More <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-muted-foreground">
                      No completed programs to display at this time.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Through our programs, we've made a significant difference in
              communities worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">2M+</div>
                <p className="text-muted-foreground">Lives Impacted</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <p className="text-muted-foreground">Countries Served</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Projects Completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <p className="text-muted-foreground">Years of Service</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            There are many ways to support our programs and make a difference in
            communities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
            >
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              <Link href="/contact">Volunteer</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              <Link href="/contact">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
