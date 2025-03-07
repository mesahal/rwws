"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Calendar, MapPin, Share2 } from 'lucide-react'

// Mock data (would come from API in production)
const impactStories = [
  {
    id: 1,
    title: "Clean Water for Rural Village",
    excerpt: "How our water project transformed the lives of 500 families in a remote village.",
    content: `
      <p>Access to clean water is something many of us take for granted, but for the residents of Mwanzo Village, it was a luxury they couldn't afford. For generations, women and children would walk up to 5 miles each day to collect water from a contaminated river, leading to widespread waterborne diseases and limiting educational opportunities for children.</p>
      
      <p>In January 2024, Hope Foundation partnered with local leaders to implement a comprehensive water solution for the village. The project included:</p>
      
      <ul>
        <li>Drilling a deep borehole to access clean groundwater</li>
        <li>Installing a solar-powered pump system</li>
        <li>Building a water storage tank and distribution network</li>
        <li>Training community members in maintenance and water management</li>
        <li>Providing education on hygiene and sanitation practices</li>
      </ul>
      
      <p>Today, all 500 families in Mwanzo Village have access to clean, safe drinking water within a short walk from their homes. The impact has been transformative:</p>
      
      <ul>
        <li>Waterborne diseases have decreased by 80%</li>
        <li>School attendance has increased by 35% as children no longer spend hours collecting water</li>
        <li>Women have more time for income-generating activities and caring for their families</li>
        <li>The community has started small agricultural projects using the reliable water source</li>
      </ul>
      
      <p>"Before the water project, I spent 4 hours every day collecting water for my family," says Maria, a mother of four. "Now I use that time to grow vegetables and sell them at the market. My children are healthier and attending school regularly. This project has changed our lives."</p>
      
      <p>The success of this project demonstrates the power of sustainable solutions that address basic needs while empowering communities to maintain and build upon these improvements for generations to come.</p>
    `,
    image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1543076499-a6133cb932fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1551731409-43eb3e517a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1519113464667-8b3e8fc21a60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    ],
    category: "Water & Sanitation",
    location: "East Africa",
    date: "March 15, 2025",
    relatedStories: [2, 4, 6]
  },
  {
    id: 2,
    title: "Education for All Initiative",
    excerpt: "Providing quality education to 1,000 underprivileged children in urban areas.",
    content: `
      <p>In the crowded urban slums of Dharavi, access to quality education has long been a challenge for thousands of children. Overcrowded government schools, lack of qualified teachers, and inadequate learning materials have resulted in high dropout rates and limited opportunities for the next generation.</p>
      
      <p>Hope Foundation's Education for All Initiative was launched in September 2023 with the goal of providing quality education to 1,000 underprivileged children in this area. The program takes a holistic approach to education, addressing not just academic needs but also the broader challenges that prevent children from learning effectively.</p>
      
      <p>Key components of the initiative include:</p>
      
      <ul>
        <li>Establishing five community learning centers in strategic locations</li>
        <li>Recruiting and training qualified teachers from the local community</li>
        <li>Developing a curriculum that combines academic fundamentals with practical skills</li>
        <li>Providing nutritious meals to address hunger and improve concentration</li>
        <li>Offering after-school programs for additional support and enrichment</li>
        <li>Engaging parents and community members in the educational process</li>
      </ul>
      
      <p>After just 18 months, the results have been remarkable:</p>
      
      <ul>
        <li>School attendance has increased by 65%</li>
        <li>Academic performance has improved across all subjects</li>
        <li>Dropout rates have decreased by 70%</li>
        <li>Parents report increased engagement and enthusiasm for learning</li>
        <li>30 local residents have been employed as teachers and support staff</li>
      </ul>
      
      <p>"Before joining this program, I had given up on school," says 12-year-old Priya. "The classes were too crowded, and I couldn't understand the lessons. Now, I love coming to the learning center. The teachers help me understand, and I'm even thinking about becoming a teacher myself someday."</p>
      
      <p>The Education for All Initiative demonstrates that with the right approach and resources, quality education can be accessible to all children, regardless of their economic background. By investing in education today, we're helping to build a brighter future for these communities.</p>
    `,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1516627145497-ae6968895b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    ],
    category: "Education",
    location: "South Asia",
    date: "February 10, 2025",
    relatedStories: [1, 3, 5]
  },
  // Additional stories would be here
]

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
  return impactStories.map((story) => ({
    id: story.id.toString(),
  }))
}

export default function ImpactStoryDetail({ params }) {
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchStory = () => {
      const foundStory = impactStories.find(s => s.id === parseInt(params.id))
      setStory(foundStory)
      setLoading(false)
    }
    
    fetchStory()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Story Not Found</h1>
        <p className="mb-8">The impact story you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/impact-stories">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Impact Stories
          </Link>
        </Button>
      </div>
    )
  }

  const relatedStories = story.relatedStories
    ? impactStories.filter(s => story.relatedStories.includes(s.id))
    : []

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-chart-3 text-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <Image 
            src={story.image} 
            alt={story.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Button asChild variant="outline" size="sm" className="mb-6 border-white text-white hover:bg-white hover:text-primary">
              <Link href="/impact-stories">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Impact Stories
              </Link>
            </Button>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                {story.category}
              </span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <MapPin className="h-3 w-3 mr-1" /> {story.location}
              </span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Calendar className="h-3 w-3 mr-1" /> {story.date}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{story.title}</h1>
            <p className="text-xl mb-0">
              {story.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: story.content }}></div>
              
              {/* Share buttons */}
              <div className="mt-8 flex items-center">
                <span className="mr-4 font-medium">Share this story:</span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              {/* Photo Gallery */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Photo Gallery</h3>
                <div className="grid grid-cols-1 gap-4">
                  {story.gallery && story.gallery.map((image, index) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                      <Image 
                        src={image} 
                        alt={`Gallery image ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Call to Action */}
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Support Our Work</h3>
                  <p className="mb-6">Your donation helps us continue making a difference in communities like this one.</p>
                  <Button asChild className="w-full bg-white text-primary hover:bg-gray-100">
                    <Link href="/donate">Donate Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Related Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedStories.map((relatedStory) => (
                <Card key={relatedStory.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image 
                      src={relatedStory.image} 
                      alt={relatedStory.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      {relatedStory.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{relatedStory.title}</h3>
                    <p className="text-muted-foreground mb-4">{relatedStory.excerpt}</p>
                    <Button asChild variant="ghost" className="w-full">
                      <Link href={`/impact-stories/${relatedStory.id}`}>
                        Read Full Story
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
  )
}