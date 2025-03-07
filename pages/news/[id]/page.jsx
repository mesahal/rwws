import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Calendar, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import NewsDetail from '@/components/NewsDetail'

// Mock data (would come from API in production)
const newsItems = [
  {
    id: 1,
    title: "Annual Fundraising Gala Raises $2 Million",
    date: "June 15, 2025",
    author: "Sarah Johnson",
    authorRole: "Communications Director",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    excerpt: "Our annual gala exceeded expectations with record-breaking donations that will fund our clean water initiatives across three continents.",
    content: `
      <p>The Hope Foundation's Annual Charity Gala, held last Saturday at the Grand Metropolitan Hotel, raised an unprecedented $2 million for our global initiatives. The event, attended by over 500 supporters, corporate partners, and community leaders, exceeded our fundraising goal by 25%.</p>
      
      <p>"We are overwhelmed by the generosity of our supporters," said Dr. James Anderson, Executive Director of Hope Foundation. "These funds will allow us to expand our clean water initiative to 50 additional villages across Africa, Asia, and Latin America, impacting approximately 250,000 lives."</p>
      
      <h3>Record-Breaking Support</h3>
      
      <p>The evening featured a silent auction with items donated by local and international businesses, a live appeal, and testimonials from community members who have benefited from Hope Foundation's programs. The highlight of the evening was a surprise matching gift announcement from the Global Impact Fund, which pledged to match all donations made during the event up to $500,000.</p>
      
      <p>Corporate sponsors included TechForward, Global Bank, and Sustainable Futures, each contributing significant support to make the event possible and ensure that all proceeds go directly to program implementation.</p>
      
      <h3>Impact of Funds Raised</h3>
      
      <p>The $2 million raised will be allocated as follows:</p>
      
      <ul>
        <li>$1.2 million for the Clean Water Initiative, funding 50 new water projects</li>
        <li>$500,000 for the Education for All program, supporting 20 schools and teacher training</li>
        <li>$300,000 for Healthcare Outreach, including 10 new mobile clinics</li>
      </ul>
      
      <p>"Access to clean water is a fundamental human right and the foundation for community development," said Maria Sanchez, Director of Water Programs. "With these funds, we can implement sustainable water solutions that will serve communities for generations."</p>
      
      <h3>Looking Forward</h3>
      
      <p>Planning is already underway for next year's gala, with a goal to raise $2.5 million to further expand our impact. The date has been set for June 10, 2026, and early bird tickets will be available in January.</p>
      
      <p>We extend our heartfelt gratitude to all attendees, donors, volunteers, and staff who made this event a tremendous success. Your support is transforming lives around the world.</p>
    `,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    ],
    category: "Events",
    tags: ["Fundraising", "Gala", "Clean Water", "Donations"],
    relatedNews: [2, 4, 6]
  },
  {
    id: 2,
    title: "New Partnership with Global Health Initiative",
    date: "May 28, 2025",
    author: "Michael Chen",
    authorRole: "Partnerships Director",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    excerpt: "Strategic partnership will expand our healthcare programs to 5 new countries, providing essential medical services to underserved communities.",
    content: `
      <p>Hope Foundation is proud to announce a groundbreaking partnership with the Global Health Initiative (GHI), an international organization dedicated to improving healthcare access in developing regions. This collaboration will enable us to expand our healthcare programs to five new countries over the next three years.</p>
      
      <p>"This partnership represents a significant step forward in our mission to provide quality healthcare to underserved communities," said Dr. Mei Lin, Director of Healthcare Programs at Hope Foundation. "By combining our expertise and resources with GHI, we can reach more people with life-saving services."</p>
      
      <h3>Expanding Healthcare Access</h3>
      
      <p>The partnership will focus on establishing sustainable healthcare infrastructure in rural and underserved areas of Southeast Asia and Sub-Saharan Africa. Key components include:</p>
      
      <ul>
        <li>Establishing 25 new community health centers</li>
        <li>Training 200 local healthcare workers</li>
        <li>Implementing telemedicine programs to connect remote areas with medical specialists</li>
        <li>Developing preventive health education programs</li>
        <li>Creating sustainable supply chains for essential medicines and equipment</li>
      </ul>
      
      <p>The first phase of the program will launch in Myanmar, Ethiopia, and Honduras in September 2025, with expansion to two additional countries planned for 2026.</p>
      
      <h3>Innovative Approach</h3>
      
      <p>"What makes this partnership unique is our focus on building local capacity rather than creating dependency," explained Dr. James Peterson, CEO of Global Health Initiative. "We're not just providing services; we're empowering communities to manage their own healthcare systems for the long term."</p>
      
      <p>The program will utilize innovative approaches such as mobile health clinics, community health worker networks, and digital health technologies to overcome infrastructure challenges in remote areas.</p>
      
      <h3>Impact and Measurement</h3>
      
      <p>The partnership aims to provide access to essential healthcare services for approximately 1.5 million people over the next five years. Progress will be measured through rigorous monitoring and evaluation, with regular reports shared publicly to ensure transparency and accountability.</p>
      
      <p>Key metrics will include:</p>
      
      <ul>
        <li>Number of patients served</li>
        <li>Improvement in key health indicators</li>
        <li>Number of healthcare workers trained</li>
        <li>Sustainability of established health centers</li>
      </ul>
      
      <p>"We believe that access to quality healthcare is a fundamental right, not a privilege," said Dr. Lin. "This partnership brings us one step closer to making that belief a reality for millions more people."</p>
    `,
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    ],
    category: "Partnerships",
    tags: ["Healthcare", "Global Health", "Partnership", "Medical Services"],
    relatedNews: [3, 8, 1]
  },
  // Additional news items would be here
]

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
  return newsItems.map((item) => ({
    id: item.id.toString(),
  }))
}

export default function NewsDetailPage({ params }) {
  const newsItem = newsItems.find(item => item.id === parseInt(params.id))
  
  if (!newsItem) {
    return notFound()
  }
  
  return <NewsDetail newsItem={newsItem} />
}