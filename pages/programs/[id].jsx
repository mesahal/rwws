"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Calendar, MapPin, Users, Heart, Check, ArrowRight } from 'lucide-react'

// Mock data (would come from API in production)
const programs = [
  {
    id: 1,
    title: "Clean Water Initiative",
    description: "Providing sustainable clean water solutions to communities facing water scarcity and contamination.",
    longDescription: "Our Clean Water Initiative focuses on developing sustainable water solutions for communities facing severe water scarcity and contamination. Through a combination of well-drilling, rainwater harvesting systems, and water purification technologies, we ensure that communities have reliable access to safe drinking water. Each project includes community training on maintenance and water management to ensure long-term sustainability.",
    image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&
  }
]