"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { getById } from "@/lib/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_IMAGE_URL;

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function ImpactStoryDetail({ params }) {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await getById(params.id, "story");
        if (response.success) {
          setStory(response.data);
        } else {
          setStory(null);
        }
      } catch (error) {
        console.error("Error fetching story:", error);
        setStory(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Story Not Found</h1>
        <p className="mb-8">
          The impact story you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/impact-stories">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Impact Stories
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
            src={`${BASE_URL}${story.image}`}
            alt={story.title}
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
              <Link href="/impact-stories">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Impact Stories
              </Link>
            </Button>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                {story.category_name}
              </span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <MapPin className="h-3 w-3 mr-1" /> {story.location}
              </span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Calendar className="h-3 w-3 mr-1" />{" "}
                {formatDate(story.created_at)}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{story.title}</h1>
            <p className="text-xl mb-0">{story.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                {story.content.split("\n").map((line, index) => (
                  <p key={index} className="text-xl mb-4">
                    {line}
                  </p>
                ))}
              </div>

              {/* Video Section */}
              {story.video && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Video</h3>
                  <div className="aspect-video">
                    <iframe
                      src={story.video}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Share buttons */}
              <div className="mt-8 flex items-center">
                <span className="mr-4 font-medium">Share this story:</span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Call to Action */}
              <Card className="bg-primary text-primary-foreground mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Support Our Work</h3>
                  <p className="mb-6">
                    Your donation helps us continue making a difference in
                    communities worldwide.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-white text-primary hover:bg-gray-100"
                  >
                    <Link href="/donate">Donate Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
