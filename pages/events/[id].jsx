"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Calendar, Clock, MapPin, Users, Share2, Download } from 'lucide-react'

// Mock data (would come from API in production)
const events = [
  {
    id: 1,
    title: "Annual Charity Gala",
    description: "Join us for an evening of inspiration and giving at our annual fundraising gala. The event includes dinner, entertainment, silent auction, and inspiring stories from the communities we serve.",
    longDescription: `
      <p>The RWWS's Annual Charity Gala is our premier fundraising event of the year, bringing together supporters, partners, and community leaders for an evening of inspiration, connection, and giving.</p>
      
      <h3>Event Details</h3>
      
      <p>This black-tie optional event will feature:</p>
      
      <ul>
        <li>Welcome reception with cocktails and hors d'oeuvres</li>
        <li>Gourmet dinner prepared by award-winning chefs</li>
        <li>Keynote address from renowned humanitarian Dr. Jane Mitchell</li>
        <li>Live entertainment by the Metropolitan String Quartet</li>
        <li>Silent and live auctions featuring unique items and experiences</li>
        <li>Inspiring stories and videos from the communities we serve</li>
        <li>Presentation of the annual Hope Humanitarian Award</li>
      </ul>
      
      <p>All proceeds from the event will support our global initiatives, with a special focus on our Clean Water for All campaign, which aims to provide sustainable clean water solutions to 50 additional communities in the coming year.</p>
      
      <h3>Ticket Information</h3>
      
      <p>Individual tickets: $250<br>
      Table of 10: $2,250 (10% discount)<br>
      VIP tickets (includes exclusive pre-event reception): $350</p>
      
      <p>A portion of your ticket purchase is tax-deductible. Tax receipts will be provided after the event.</p>
      
      <h3>Sponsorship Opportunities</h3>
      
      <p>Various sponsorship packages are available, offering recognition and benefits for your company or organization. Please contact our events team at events@hopefoundation.org for more information.</p>
      
      <h3>Auction Donations</h3>
      
      <p>We are currently accepting donations of items and experiences for our silent and live auctions. If you would like to contribute, please contact auctions@hopefoundation.org.</p>
      
      <h3>Accommodations</h3>
      
      <p>A block of rooms has been reserved at the Grand Metropolitan Hotel at a special rate for gala attendees. Please mention the RWWS Gala when booking.</p>
    `,
    date: "July 15, 2025",
    time: "6:00 PM - 10:00 PM",
    location: "Grand Metropolitan Hotel, New York",
    address: "123 Park Avenue, New York, NY 10022",
    type: "Fundraiser",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    ],
    attendees: 250,
    registration: true,
    organizer: "RWWS Events Team",
    contact: "events@hopefoundation.org",
    phone: "(555) 123-4567"
  },
  {
    id: 2,
    title: "Volunteer Training Workshop",
    description: "A comprehensive training session for new volunteers joining our global initiatives. Learn about our programs, policies, and how to make the most impact in your volunteer role.",
    longDescription: `
      <p>Thank you for your interest in volunteering with RWWS! This comprehensive training workshop is designed to prepare you for your volunteer role and help you make the most meaningful impact in our programs.</p>
      
      <h3>Workshop Overview</h3>
      
      <p>This full-day training session will cover:</p>
      
      <ul>
        <li>Introduction to RWWS's mission, vision, and programs</li>
        <li>Understanding the communities we serve and cultural sensitivity</li>
        <li>Volunteer policies, procedures, and code of conduct</li>
        <li>Health and safety guidelines</li>
        <li>Specific skills training relevant to your volunteer assignment</li>
        <li>Communication and teamwork strategies</li>
        <li>Problem-solving and adaptability in challenging environments</li>
        <li>Self-care and managing expectations</li>
      </ul>
      
      <p>The workshop will be facilitated by experienced staff members and veteran volunteers who will share their knowledge and insights from the field.</p>
      
      <h3>Who Should Attend</h3>
      
      <p>This workshop is required for:</p>
      <ul>
        <li>All new volunteers who have been accepted to our programs</li>
        <li>Current volunteers who have not previously completed formal training</li>
        <li>Returning volunteers who have not volunteered within the past two years</li>
      </ul>
      
      <p>The workshop is also open to individuals who are considering volunteering and want to learn more about our work before applying.</p>
      
      <h3>What to Bring</h3>
      
      <ul>
        <li>Notebook and pen</li>
        <li>Reusable water bottle</li>
        <li>Any pre-workshop materials you received by email</li>
        <li>Questions and an open mind!</li>
      </ul>
      
      <h3>Meals</h3>
      
      <p>Lunch and refreshments will be provided. Please let us know if you have any dietary restrictions when you register.</p>
      
      <h3>Follow-Up</h3>
      
      <p>After completing the workshop, you will receive a certificate of completion and be assigned a mentor who will support you as you begin your volunteer journey with RWWS.</p>
    `,
    date: "August 5, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "RWWS Headquarters, Chicago",
    address: "456 Hope Street, Chicago, IL 60601",
    type: "Training",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    ],
    attendees: 50,
    registration: true,
    organizer: "Volunteer Coordination Team",
    contact: "volunteer@hopefoundation.org",
    phone: "(555) 987-6543"
  },
  {
    id: 3,
    title: "Community Health Fair",
    description: "Free health screenings and education for underserved communities. Services include blood pressure checks, diabetes screening, nutrition counseling, and more.",
    longDescription: `
      <p>RWWS is proud to present our Community Health Fair, a free event designed to provide essential health services and education to underserved communities. This event is open to all community members, regardless of insurance status or ability to pay.</p>
      
      <h3>Services Offered</h3>
      
      <p>The health fair will provide a wide range of free services, including:</p>
      
      <ul>
        <li>Blood pressure screenings</li>
        <li>Blood glucose (diabetes) screenings</li>
        <li>Cholesterol screenings</li>
        <li>BMI calculations and weight management advice</li>
        <li>Vision screenings</li>
        <li>Dental check-ups</li>
        <li>Mental health resources</li>
        <li>Nutrition counseling</li>
        <li>Physical activity demonstrations</li>
        <li>Health insurance information and enrollment assistance</li>
      </ul>
      
      <p>Medical professionals will be available to discuss screening results and provide referrals for follow-up care if needed.</p>
      
      <h3>Educational Workshops</h3>
      
      <p>Throughout the day, we will offer educational workshops on various health topics:</p>
      
      <ul>
        <li>10:30 AM - Healthy Eating on a Budget</li>
        <li>11:30 AM - Managing Chronic Conditions</li>
        <li>12:30 PM - Mental Health Awareness</li>
        <li>1:30 PM - Physical Activity for All Abilities</li>
        <li>2:30 PM - Preventive Health Screenings: What You Need to Know</li>
      </ul>
      
      <h3>Additional Information</h3>
      
      <p>No appointments are necessary - simply drop in during the event hours. All services are provided on a first-come, first-served basis. Interpreters will be available for Spanish, Mandarin, and Vietnamese speakers.</p>
      
      <p>Free parking is available at the community center, and the location is accessible by public transportation (Bus routes 12, 15, and 28).</p>
      
      <p>For more information, please contact our Community Health Team at health@hopefoundation.org or call (555) 456-7890.</p>
    `,
    date: "September 20, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Central Park Community Center, Los Angeles",
    address: "789 Community Drive, Los Angeles, CA 90001",
    type: "Community Event",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    ],
    attendees: 500,
    registration: false,
    organizer: "Community Health Team",
    contact: "health@hopefoundation.org",
    phone: "(555) 456-7890"
  },
  {
    id: 4,
    title: "Global Water Summit",
    description: "A conference bringing together experts, practitioners, and advocates to discuss innovative solutions to the global water crisis.",
    longDescription: `
      <p>The Global Water Summit is a three-day conference that brings together experts, practitioners, policymakers, and advocates from around the world to address the pressing challenges of water scarcity, quality, and access. This year's theme is "Sustainable Solutions for a Water-Secure Future."</p>
      
      <h3>Conference Highlights</h3>
      
      <ul>
        <li>Keynote addresses from world-renowned experts and leaders in the water sector</li>
        <li>Panel discussions on innovative approaches to water management</li>
        <li>Technical workshops on water treatment technologies, conservation strategies, and policy frameworks</li>
        <li>Case study presentations from successful water projects around the world</li>
        <li>Networking opportunities with professionals from diverse sectors</li>
        <li>Exhibition showcasing the latest technologies and solutions</li>
      </ul>
      
      <h3>Key Topics</h3>
      
      <ul>
        <li>Climate change adaptation and water resilience</li>
        <li>Water governance and policy reform</li>
        <li>Financing water infrastructure in developing regions</li>
        <li>Community-led water management approaches</li>
  }
]