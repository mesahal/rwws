"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  ArrowLeft,
  Calendar,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { getAll } from "../lib/api";

export default function NewsDetail({ newsItem }) {
  // const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchRelated = async () => {
  //     try {
  //       // Fetch all news to find related items
  //       const { items } = await getAll();
  //       const related = items
  //         .filter(
  //           (item) =>
  //             item.id !== newsItem.id && item.category === newsItem.category
  //         )
  //         .slice(0, 3);

  //       setRelatedNews(related);
  //     } catch (error) {
  //       console.error("Error fetching related news:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchRelated();
  // }, [newsItem]);

  if (!newsItem) {
    return <div className="text-center py-8">News item not found</div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
            src={newsItem.image}
            alt={newsItem.title}
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
              className="mb-6 border-white text-white hover:bg-white hover:text-primary"
            >
              <Link href="/news">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
              </Link>
            </Button>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                {newsItem.category_name}
              </span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Calendar className="h-3 w-3 mr-1" /> {newsItem.updated_at}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{newsItem.title}</h1>
            <p className="text-xl mb-0">{newsItem.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Author info */}
              {/* <div className="flex items-center mb-8 p-4 bg-muted rounded-lg">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={newsItem.authorImage}
                    alt={newsItem.author}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <p className="font-medium">{newsItem.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {newsItem.authorRole}
                  </p>
                </div>
              </div> */}

              {/* Article content */}
              {/* <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: newsItem.content }}
              ></div> */}

              {/* Tags */}
              {/* <div className="mt-8">
                <h3 className="text-lg font-medium mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {newsItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-muted px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div> */}

              {/* Share buttons */}
              <div className="mt-8 flex items-center">
                <span className="mr-4 font-medium">Share this article:</span>
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

            {/* Photo Gallery */}
            <div>
              {/* <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Photo Gallery</h3>
                <div className="grid grid-cols-1 gap-4">
                  {newsItem.gallery &&
                    newsItem.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative h-48 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          style={{ objectFit: "cover" }}
                          className="hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                </div>
              </div> */}

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

              {/* Newsletter Signup */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                  <p className="mb-4 text-muted-foreground">
                    Subscribe to our newsletter to receive the latest news and
                    updates.
                  </p>
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-3 py-2 border border-border rounded-md"
                    />
                    <Button className="w-full">Subscribe</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related News */}
      {/* {relatedNews.length > 0 && (
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Related News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedNews.map((item) => (
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
                  <div className="p-4">
                    <div className="flex items-center text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{item.date}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {item.excerpt}
                    </p>
                    <Button asChild variant="ghost" className="w-full">
                      <Link href={`/news/${item.id}`}>Read Full Article</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )} */}
    </div>
  );
}
