"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

// Mock data (would come from API in production)
const blogPosts = [
  {
    id: 1,
    slug: "sustainable-water-solutions",
    title: "Sustainable Water Solutions for Rural Communities",
    date: "June 20, 2025",
    author: "Dr. Maria Sanchez",
    authorRole: "Water Programs Director",
    authorImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    excerpt:
      "Exploring innovative and sustainable approaches to providing clean water access in rural communities facing water scarcity.",
    content: `
      <p>Access to clean water remains one of the most pressing challenges for rural communities worldwide. According to the World Health Organization, over 2 billion people lack access to safely managed drinking water services, with the majority living in rural areas. This article explores innovative and sustainable approaches to addressing water scarcity in these communities.</p>
      
      <h3>Understanding the Challenge</h3>
      
      <p>Rural water challenges are complex and multifaceted, involving not just the physical availability of water but also issues of quality, accessibility, affordability, and sustainability. Traditional approaches to water provision have often failed because they don't adequately address these interconnected factors.</p>
      
      <p>Key challenges include:</p>
      
      <ul>
        <li>Geographic isolation and difficult terrain</li>
        <li>Limited financial resources for infrastructure</li>
        <li>Lack of technical expertise for maintenance</li>
        <li>Climate change impacts on water sources</li>
        <li>Contamination from agricultural and industrial activities</li>
      </ul>
      
      <h3>Innovative Approaches</h3>
      
      <p>Our work across three continents has identified several promising approaches that address these challenges in sustainable ways:</p>
      
      <h4>1. Community-Managed Water Systems</h4>
      
      <p>Community ownership and management of water systems has proven to be one of the most effective approaches to ensuring sustainability. When local communities are involved in the planning, implementation, and management of water systems, they develop a sense of ownership that leads to better maintenance and longevity.</p>
      
      <p>In our projects in East Africa, we've seen 85% of community-managed systems still functioning after five years, compared to just 35% of systems implemented without strong community involvement.</p>
      
      <h4>2. Appropriate Technology Solutions</h4>
      
      <p>The most effective technologies are those that match the local context, resources, and capabilities. These include:</p>
      
      <ul>
        <li><strong>Solar-powered pumps:</strong> Eliminating the need for expensive fuel or unreliable electricity</li>
        <li><strong>Rainwater harvesting systems:</strong> Capturing and storing rainwater for use during dry periods</li>
        <li><strong>Hand pumps with locally available spare parts:</strong> Ensuring repairs can be made quickly and affordably</li>
        <li><strong>Gravity-fed systems:</strong> Using natural topography to distribute water without energy costs</li>
      </ul>
      
      <h4>3. Integrated Water Resource Management</h4>
      
      <p>Sustainable water solutions must consider the entire water cycle and ecosystem. This means protecting water sources, managing watershed areas, and balancing competing water needs (agriculture, domestic use, industry).</p>
      
      <p>Our projects in South Asia have demonstrated that combining water provision with reforestation and soil conservation efforts leads to more reliable water sources and reduced contamination.</p>
      
      <h3>Case Study: Mwanzo Village, Tanzania</h3>
      
      <p>Mwanzo Village faced severe water challenges, with women and children walking up to 5 miles daily to collect water from contaminated sources. Working with the community, we implemented a comprehensive solution that included:</p>
      
      <ul>
        <li>A deep borehole with solar-powered pump</li>
        <li>A water storage tank and distribution network</li>
        <li>A community water committee with trained technicians</li>
        <li>A pay-as-you-go system for financial sustainability</li>
        <li>Watershed protection measures</li>
      </ul>
      
      <p>Three years later, the system continues to provide clean water to all 500 families in the village. Waterborne diseases have decreased by 80%, and school attendance has increased as children no longer spend hours collecting water.</p>
      
      <h3>The Way Forward</h3>
      
      <p>As we look to the future, several emerging approaches show promise for further improving rural water access:</p>
      
      <ul>
        <li><strong>Remote monitoring systems:</strong> Using sensors and mobile technology to track system performance and anticipate problems</li>
        <li><strong>Microfinance for household connections:</strong> Enabling families to spread the cost of connecting to water systems</li>
        <li><strong>Public-private partnerships:</strong> Combining public oversight with private sector efficiency</li>
        <li><strong>Climate-resilient design:</strong> Building systems that can withstand changing climate conditions</li>
      </ul>
      
      <p>The key to success in all these approaches is recognizing that sustainable water solutions must be holistic, addressing not just the technical aspects of water provision but also the social, economic, and environmental factors that affect long-term sustainability.</p>
      
      <p>By combining innovative technologies with community engagement and integrated resource management, we can make significant progress in ensuring that rural communities worldwide have reliable access to clean water.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1543076499-a6133cb932fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1551731409-43eb3e517a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1519113464667-8b3e8fc21a60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    ],
    category: "Research",
    tags: ["Water", "Sustainability", "Rural Development"],
    relatedPosts: [3, 4, 6],
  },
  {
    id: 2,
    slug: "education-digital-age",
    title: "Education in the Digital Age: Bridging the Technology Gap",
    date: "May 15, 2025",
    author: "James Wilson",
    authorRole: "Education Specialist",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    excerpt:
      "How digital technologies can transform education in underserved communities while addressing challenges of access and equity.",
    content: `
      <p>The digital revolution has transformed education worldwide, offering unprecedented opportunities for learning and skills development. However, this transformation has not been equally distributed, with many underserved communities left behind due to lack of access to technology, connectivity, and digital skills. This article explores how we can bridge this digital divide and harness technology to improve educational outcomes in marginalized communities.</p>
      
      <h3>The Digital Divide in Education</h3>
      
      <p>The educational digital divide manifests in multiple ways:</p>
      
      <ul>
        <li><strong>Access gap:</strong> Many students lack access to devices, reliable internet, or electricity</li>
        <li><strong>Usage gap:</strong> Even with access, there are disparities in how technology is used for learning</li>
        <li><strong>Skills gap:</strong> Teachers and students may lack the digital literacy needed to leverage technology effectively</li>
        <li><strong>Content gap:</strong> Educational content may not be relevant to local contexts or available in local languages</li>
      </ul>
      
      <p>These gaps have been starkly highlighted during the COVID-19 pandemic, which forced education systems worldwide to shift to remote learning. In many low-resource settings, this shift widened existing inequalities, with the most vulnerable students falling further behind.</p>
      
      <h3>Innovative Approaches to Digital Education</h3>
      
      <p>Despite these challenges, we've seen remarkable innovations that are helping bridge the digital divide:</p>
      
      <h4>1. Low-Tech and No-Tech Solutions</h4>
      
      <p>Not all digital education requires high-speed internet or expensive devices. Effective approaches include:</p>
      
      <ul>
        <li><strong>Offline digital libraries:</strong> Preloaded content on tablets or servers that don't require internet access</li>
        <li><strong>SMS-based learning:</strong> Educational content delivered via basic mobile phones</li>
        <li><strong>Radio and TV instruction:</strong> Broadcast educational programming to reach students without internet</li>
        <li><strong>Hybrid approaches:</strong> Combining digital resources with printed materials</li>
      </ul>
      
      <h4>2. Community Technology Hubs</h4>
      
      <p>Centralized technology centers can provide access to digital resources for entire communities. These hubs can be established in schools, libraries, or community centers, offering:</p>
      
      <ul>
        <li>Shared computers and internet access</li>
        <li>Technical support and training</li>
        <li>Safe spaces for collaborative learning</li>
        <li>Additional services like printing and scanning</li>
      </ul>
      
      <h4>3. Teacher Training and Support</h4>
      
      <p>Technology is only as effective as the teachers who use it. Comprehensive teacher training programs should focus on:</p>
      
      <ul>
        <li>Basic digital literacy skills</li>
        <li>Pedagogical approaches for technology integration</li>
        <li>Content creation and adaptation</li>
        <li>Ongoing mentoring and peer learning</li>
      </ul>
      
      <h3>Case Study: Digital Learning in Rural India</h3>
      
      <p>In partnership with local organizations, we implemented a digital learning program in 50 rural schools in India. The program included:</p>
      
      <ul>
        <li>Solar-powered tablets preloaded with curriculum-aligned content</li>
        <li>Teacher training on effective technology integration</li>
        <li>Community technology hubs for after-school access</li>
        <li>Locally relevant content in regional languages</li>
      </ul>
      
      <p>After two years, we observed a 40% improvement in learning outcomes, particularly in mathematics and science. Teacher confidence and enthusiasm also increased significantly, with 85% reporting that technology had transformed their teaching practices.</p>
      
      <h3>Addressing Equity Concerns</h3>
      
      <p>As we implement digital education initiatives, we must be vigilant about equity considerations:</p>
      
      <ul>
        <li><strong>Gender equity:</strong> Ensuring girls have equal access to technology and addressing cultural barriers</li>
        <li><strong>Disability inclusion:</strong> Using assistive technologies and universal design principles</li>
        <li><strong>Language and cultural relevance:</strong> Adapting content to local contexts and languages</li>
        <li><strong>Economic factors:</strong> Considering the total cost of ownership, including maintenance and upgrades</li>
      </ul>
      
      <h3>The Way Forward</h3>
      
      <p>As we look to the future, several principles should guide our approach to digital education in underserved communities:</p>
      
      <ol>
        <li><strong>Start with pedagogy, not technology:</strong> Focus on learning objectives first, then identify appropriate technologies</li>
        <li><strong>Build on existing systems:</strong> Integrate technology into existing educational frameworks rather than creating parallel systems</li>
        <li><strong>Prioritize sustainability:</strong> Develop models that can be maintained and scaled with local resources</li>
        <li><strong>Measure impact:</strong> Collect data on learning outcomes to continuously improve approaches</li>
        <li><strong>Collaborate across sectors:</strong> Partner with governments, private sector, and civil society for comprehensive solutions</li>
      </ol>
      
      <p>By following these principles and building on the innovative approaches described above, we can harness the power of digital technology to create more equitable, effective, and resilient education systems that serve all learners, regardless of their circumstances.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1516627145497-ae6968895b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    ],
    category: "Opinion",
    tags: ["Education", "Technology", "Digital Divide"],
    relatedPosts: [5, 8, 3],
  },
  // Additional blog posts would be here
];

export default function BlogDetail({ params }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchPost = () => {
      const foundPost = blogPosts.find((p) => p.slug === params.slug);
      setPost(foundPost);
      setLoading(false);
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="mb-8">
          The blog article you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

  const relatedPosts = post.relatedPosts
    ? blogPosts.filter((p) => post.relatedPosts.includes(p.id))
    : [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-chart-3 text-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <Image
            src={post.image}
            alt={post.title}
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
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Link>
            </Button>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              {/* <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Calendar className="h-3 w-3 mr-1" /> {post.date}
              </span> */}
            </div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl mb-0">{post.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Author info */}
              <div className="flex items-center mb-8 p-4 bg-muted rounded-lg">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {post.authorRole}
                  </p>
                </div>
              </div>

              {/* Article content */}
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>

              {/* Tags */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center bg-muted px-3 py-1 rounded-full text-sm"
                    >
                      <Tag className="h-4 w-4 mr-2" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

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

            <div>
              {/* Photo Gallery */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Photo Gallery</h3>
                <div className="grid grid-cols-1 gap-4">
                  {post.gallery &&
                    post.gallery.map((image, index) => (
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
              </div>

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
                    Subscribe to our newsletter to receive the latest articles
                    and updates.
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

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      {relatedPost.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-muted-foreground mb-2">
                      {/* <Calendar className="h-4 w-4 mr-2" /> */}
                      <span className="text-sm">{relatedPost.date}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <Button asChild variant="ghost" className="w-full">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        Read Full Article
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
