import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  MapPin,
  Target,
} from "lucide-react";
import { getById } from "@/lib/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_IMAGE_URL;

export async function getStaticPaths() {
  try {
    const response = await getAll(1, 6, "program");
    const data = response.data;
    const items = data.programList;

    const paths = items.map((item) => ({
      params: { id: String(item.id) },
    }));

    return { paths, fallback: "blocking" };
  } catch (error) {
    return { paths: [], fallback: true };
  }
}

const getEmbedUrl = (url) => {
  try {
    // Handle YouTube URLs
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    // Add other video platforms here if needed
    return url;
  } catch {
    return null;
  }
};

export async function getStaticProps({ params }) {
  try {
    const response = await getById("program", params.id);
    if (!response.success) return { notFound: true };

    return {
      props: { program: response.data },
      revalidate: 86400, // 1 day
    };
  } catch (error) {
    return { notFound: true };
  }
}

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function ProgramDetailPage({ program }) {
  if (!program) {
    return (
      <div className="text-center py-8">
        Program not found
        <Button asChild className="mt-4">
          <Link href="/programs">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Programs
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-chart-3 text-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <Image
            src={`${BASE_URL}${program.image}`}
            alt={program.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="bg-white hover:bg-gray-100 text-primary dark:bg-black dark:text-primary"
            >
              <Link href="/programs">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Programs
              </Link>
            </Button>
            <div className="flex flex-wrap gap-2 my-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(program.start_date)}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {program.status}
              </span>
              {/* <span className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {program.category_name}
              </span> */}
            </div>
            <h1 className="text-4xl font-bold mb-4">{program.title}</h1>
            <p className="text-xl">{program.description}</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Program Details */}
              <div className="prose prose-lg max-w-none">
                {program.longDescription.split("\n\n").map((para, index) => (
                  <p key={index} className="text-xl mb-4">
                    {para}
                  </p>
                ))}
              </div>

              {/* Video Section */}
              {program.video && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Video</h3>
                  <div className="aspect-video">
                    <iframe
                      src={getEmbedUrl(program.video)}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      title="Story video"
                    />
                  </div>
                  {!getEmbedUrl(program.video) && (
                    <p className="text-red-500 mt-2">
                      Could not load video. Please check the URL.
                    </p>
                  )}
                </div>
              )}

              {/* Program Highlights */}
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center">
                    <Target className="h-5 w-5 mr-2" /> Goals
                  </h3>
                  <ul className="space-y-2">
                    {program.goals.map((goal, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">•</span>
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Locations</h3>
                  <ul className="space-y-2">
                    {program.locations.map((location, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">•</span>
                        {location}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Achievements</h3>
                  <ul className="space-y-2">
                    {program.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Support This Program
                  </h3>
                  <p className="mb-6">
                    Your contribution helps us continue this important work.
                  </p>
                  <Button
                    asChild
                    className="bg-white hover:bg-gray-100 text-primary dark:bg-black dark:text-primary"
                  >
                    <Link href="/donate">Donate Now</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Quick Facts</h3>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Started: {formatDate(program.start_date)}
                    </p>
                    {/* <p className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Category: {program.category_name}
                    </p> */}
                    <p className="flex items-center">
                      <Target className="h-4 w-4 mr-2" />
                      Status: {program.status}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
