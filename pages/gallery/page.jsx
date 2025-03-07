"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Play, Download, X, ChevronLeft, ChevronRight } from 'lucide-react'

export const metadata = {
  title: 'Media Gallery - Hope Foundation',
  description: 'Browse photos and videos from our projects, events, and initiatives around the world',
}

// Mock data (would come from API in production)
const mediaItems = [
  {
    id: 1,
    title: "Clean Water Project in Tanzania",
    description: "Installation of a new water well providing clean water to over 500 families.",
    type: "image",
    category: "Projects",
    location: "Tanzania",
    date: "June 2025",
    url: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: 2,
    title: "Education Program Launch",
    description: "Opening ceremony of our new school building in rural India.",
    type: "image",
    category: "Events",
    location: "India",
    date: "May 2025",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: 3,
    title: "Healthcare Outreach in Remote Villages",
    description: "Mobile clinic providing essential healthcare services to isolated communities.",
    type: "image",
    category: "Projects",
    location: "Myanmar",
    date: "April 2025",
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: 4,
    title: "Annual Fundraising Gala",
    description: "Our annual gala that raised $2 million for global initiatives.",
    type: "image",
    category: "Events",
    location: "United States",
    date: "March 2025",
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: 5,
    title: "Sustainable Farming Initiative",
    description: "Training local farmers in sustainable agricultural practices.",
    type: "image",
    category: "Projects",
    location: "Kenya",
    date: "February 2025",
    url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: 6,
    title: "Women's Empowerment Workshop",
    description: "Skills training and microfinance program for women entrepreneurs.",
    type: "image",
    category: "Projects",
    location: "Bangladesh",
    date: "January 2025",
    url: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: 7,
    title: "Emergency Response After Flooding",
    description: "Providing immediate relief to communities affected by severe flooding.",
    type: "image",
    category: "Emergency Relief",
    location: "Philippines",
    date: "December 2024",
    url: "https://images.unsplash.com/photo-1469571486292-b53601010376?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: 8,
    title: "Clean Water Impact",
    description: "How our clean water initiatives are transforming communities.",
    type: "video",
    category: "Projects",
    location: "Multiple",
    date: "November 2024",
    url: "https://www.youtube.com/embed/XyNh1JRuZdg",
    thumbnail: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 9
  }
]