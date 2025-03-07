import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, Globe, BookOpen, Users, Heart, Shield } from 'lucide-react'

export const metadata = {
  title: 'Programs & Initiatives - Hope Foundation',
  description: 'Explore our ongoing and past projects focused on sustainable development and humanitarian aid',
}

// Mock data (would come from API in production)
const programs = [
  {
    id: 1,
    title: "Clean Water Initiative",
    description: "Providing sustainable clean water solutions to communities facing water scarcity and contamination.",
    longDescription: "Our Clean Water Initiative focuses on developing sustainable water solutions for communities facing severe water scarcity and contamination. Through a combination of well-drilling, rainwater harvesting systems, and water purification technologies, we ensure that communities have reliable access to safe drinking water. Each project includes community training on maintenance and water management to ensure long-term sustainability.",
    image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Water & Sanitation",
    status: "Ongoing",
    locations: ["East Africa", "South Asia", "Latin America"],
    beneficiaries: "500,000+ people across 100+ communities",
    startDate: "January 2018",
    goals: [
      "Provide clean water access to 1 million people by 2026",
      "Reduce waterborne diseases by 80% in target communities",
      "Train 1,000 local technicians in water system maintenance"
    ],
    achievements: [
      "Completed 100 water projects serving over 500,000 people",
      "Reduced waterborne diseases by 65% in completed project areas",
      "Trained 450 local technicians in water system maintenance"
    ],
    icon: <Globe className="h-10 w-10 text-chart-1" />
  },
  {
    id: 2,
    title: "Education for All",
    description: "Ensuring quality education for underprivileged children through school construction, teacher training, and educational resources.",
    longDescription: "Our Education for All program works to break the cycle of poverty through quality education. We build and renovate schools, train teachers, provide educational materials, and implement innovative teaching methodologies. Our holistic approach addresses not just academic needs but also nutrition, health, and community engagement to ensure children can learn effectively.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Education",
    status: "Ongoing",
    locations: ["West Africa", "South Asia", "Southeast Asia"],
    beneficiaries: "250,000+ children in 500+ schools",
    startDate: "March 2015",
    goals: [
      "Provide quality education to 500,000 children by 2027",
      "Achieve 95% literacy rate in target communities",
      "Train 10,000 teachers in modern teaching methodologies"
    ],
    achievements: [
      "Built or renovated 500 schools serving 250,000+ children",
      "Increased school attendance by 40% in project areas",
      "Trained 5,000+ teachers in modern teaching methodologies"
    ],
    icon: <BookOpen className="h-10 w-10 text-chart-2" />
  },
  {
    id: 3,
    title: "Community Healthcare",
    description: "Bringing essential healthcare services to remote areas through mobile clinics, health worker training, and preventive care.",
    longDescription: "Our Community Healthcare program focuses on making quality healthcare accessible to all, especially in remote and underserved areas. We operate mobile clinics, train community health workers, establish permanent health centers, and implement preventive health education programs. Our approach emphasizes building local capacity for sustainable healthcare systems.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Healthcare",
    status: "Ongoing",
    locations: ["East Africa", "South Asia", "Southeast Asia"],
    beneficiaries: "750,000+ people across 300+ communities",
    startDate: "June 2016",
    goals: [
      "Provide healthcare access to 1.5 million people by 2028",
      "Reduce maternal and child mortality by 70% in target areas",
      "Train 5,000 community health workers"
    ],
    achievements: [
      "Established 50 permanent health centers and 30 mobile clinics",
      "Reduced maternal mortality by 45% in project areas",
      "Trained 2,200 community health workers"
    ],
    icon: <Users className="h-10 w-10 text-chart-3" />
  },
  {
    id: 4,
    title: "Women's Empowerment",
    description: "Supporting women through skills training, microfinance, and advocacy to promote gender equality and economic independence.",
    longDescription: "Our Women's Empowerment program works to create opportunities for women to achieve economic independence and social equality. Through vocational training, microfinance initiatives, leadership development, and advocacy, we help women build sustainable livelihoods and become agents of change in their communities.",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Economic Development",
    status: "Ongoing",
    locations: ["West Africa", "South Asia", "Latin America"],
    beneficiaries: "100,000+ women across 200+ communities",
    startDate: "September 2017",
    goals: [
      "Empower 250,000 women economically by 2026",
      "Achieve 50% female representation in community leadership",
      "Establish 1,000 women-led businesses"
    ],
    achievements: [
      "Trained 100,000+ women in vocational skills",
      "Provided microloans to 50,000+ women entrepreneurs",
      "Established 450+ women-led businesses"
    ],
    icon: <Heart className="h-10 w-10 text-chart-4" />
  },
  {
    id: 5,
    title: "Emergency Relief",
    description: "Providing immediate assistance to communities affected by natural disasters, conflicts, and humanitarian crises.",
    longDescription: "Our Emergency Relief program delivers rapid response to communities affected by natural disasters, conflicts, and other humanitarian crises. We provide immediate necessities like food, water, shelter, and medical care, while also implementing early recovery initiatives to help communities rebuild and become more resilient to future disasters.",
    image: "https://images.unsplash.com/photo-1469571486292-b53601010376?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Humanitarian Aid",
    status: "Ongoing",
    locations: ["Global"],
    beneficiaries: "2 million+ people across 20+ countries",
    startDate: "January 2010",
    goals: [
      "Respond to emergencies within 72 hours",
      "Provide comprehensive relief to 500,000 people annually",
      "Implement disaster preparedness in 1,000 vulnerable communities"
    ],
    achievements: [
      "Responded to 50+ major disasters across 25 countries",
      "Provided emergency relief to 2 million+ people",
      "Implemented disaster preparedness in 500+ communities"
    ],
    icon: <Shield className="h-10 w-10 text-chart-5" />
  },
  {
    id: 6,
    title: "Sustainable Agriculture",
    description: "Promoting food security through climate-smart farming techniques, training, and market access for small-scale farmers.",
    longDescription: "Our Sustainable Agriculture program works to enhance food security and farmer livelihoods through climate-smart agricultural practices. We provide training in sustainable farming techniques, distribute improved seeds and tools, facilitate market access, and implement irrigation systems to help farmers increase productivity while preserving natural resources.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Food Security",
    status: "Ongoing",
    locations: ["East Africa", "West Africa", "South Asia"],
    beneficiaries: "300,000+ farmers across 500+ communities",
    startDate: "April 2014",
    goals: [
      "Train 500,000 farmers in sustainable agriculture by 2027",
      "Increase crop yields by 100% in target communities",
      "Establish 200 farmer cooperatives for improved market access"
    ],
    achievements: [
      "Trained 300,000+ farmers in sustainable agriculture",
      "Increased average crop yields by 65% in project areas",
      "Established 120 farmer cooperatives"
    ],
    icon: <Globe className="h-10 w-10 text-chart-1" />
  }
]

export default function ProgramsPage() {
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
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Programs & Initiatives</h1>
            <p className="text-xl mb-0">
              Explore our ongoing and past projects focused on sustainable development and humanitarian aid.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
            <p className="text-lg max-w-3xl mx-auto">
              We implement sustainable, community-led programs that address immediate needs while building long-term resilience and self-sufficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <Users className="h-10 w-10 text-chart-1" />
                </div>
                <CardTitle>Community-Led</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We work directly with communities to understand their unique needs and priorities, ensuring local ownership and sustainability of all projects.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <Globe className="h-10 w-10 text-chart-2" />
                </div>
                <CardTitle>Sustainable Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our programs are designed to create lasting change by addressing root causes, not just symptoms, and building local capacity for continued progress.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <Heart className="h-10 w-10 text-chart-3" />
                </div>
                <CardTitle>Holistic Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We recognize the interconnected nature of development challenges and implement integrated programs that address multiple aspects of community wellbeing.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Programs</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Explore our diverse range of programs addressing critical needs in communities worldwide.
            </p>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="all">All Programs</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs.map((program) => (
                  <Card key={program.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image 
                        src={program.image} 
                        alt={program.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                        {program.category}
                      </div>
                      <div className="absolute bottom-2 left-2 bg-background/80 text-foreground px-2 py-1 rounded text-xs font-medium">
                        {program.status}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{program.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{program.description}</CardDescription>
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
            </TabsContent>
            
            <TabsContent value="ongoing">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs.filter(p => p.status === "Ongoing").map((program) => (
                  <Card key={program.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image 
                        src={program.image} 
                        alt={program.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                        {program.category}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{program.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{program.description}</CardDescription>
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
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs.filter(p => p.status === "Completed").length > 0 ? (
                  programs.filter(p => p.status === "Completed").map((program) => (
                    <Card key={program.id} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image 
                          src={program.image} 
                          alt={program.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                          {program.category}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>{program.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{program.description}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="ghost" className="w-full">
                          <Link href={`/programs/${program.id}`}>
                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-muted-foreground">No completed programs to display at this time.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Through our programs, we've made a significant difference in communities worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">2M+</div>
                <p className="text-muted-foreground">Lives Impacted</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <p className="text-muted-foreground">Countries Served</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Projects Completed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <p className="text-muted-foreground">Years of Service</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            There are many ways to support our programs and make a difference in communities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link href="/contact">Volunteer</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link href="/contact">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}