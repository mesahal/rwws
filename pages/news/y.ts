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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowRight, Calendar } from "lucide-react";
import { getAll } from "@/lib/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_IMAGE_URL;

export const metadata = {
  title: "Programs & Initiatives - RWWS",
  description:
    "Explore our ongoing and past projects focused on sustainable development and humanitarian aid",
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const pageSize = 6;

export async function getServerSideProps(context) {
  const page = context.query.page ? parseInt(context.query.page) : 1;
  try {
    const response = await getAll(page, pageSize, "program");
    const { programList, total_count } = response.data;
    return {
      props: {
        programs: programList,
        totalPages: Math.ceil(total_count / pageSize),
        page,
      },
    };
  } catch (error) {
    console.error("Error fetching programs:", error);
    return { props: { programs: [], totalPages: 1, page: 1 } };
  }
}

export default function ProgramsPage({ programs, totalPages, page }) {
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

      {/* Programs Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Program (first item) */}
          {page === 1 && programs.length > 0 && (
            <div className="mb-12">
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={`${BASE_URL}${programs[0].image}`}
                      alt={programs[0].title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          Started {formatDate(programs[0].start_date)}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="text-sm">{programs[0].status}</span>
                      </div>
                      <h2 className="text-2xl font-bold mb-4">
                        {programs[0].title}
                      </h2>
                      <p className="text-muted-foreground mb-6 line-clamp-2">
                        {programs[0].description}
                      </p>
                    </div>
                    <Button asChild>
                      <Link href={`/programs/${programs[0].id}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Card key={program.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`${BASE_URL}${program.image}`}
                    alt={program.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute bottom-2 left-2 bg-background/80 text-foreground px-2 py-1 rounded text-xs font-medium">
                    {program.status}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {formatDate(program.start_date)}
                    </span>
                  </div>
                  <CardTitle>{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-2">
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
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                {page > 1 && (
                  <PaginationItem>
                    <PaginationPrevious href={`/programs?page=${page - 1}`} />
                  </PaginationItem>
                )}

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href={`/programs?page=${i + 1}`}
                      isActive={page === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {page < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={`/programs?page=${page + 1}`} />
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
