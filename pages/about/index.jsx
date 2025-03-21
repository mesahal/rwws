import Link from "next/link";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Heart, Users, Globe, Award, Calendar, Building } from "lucide-react";
import {
  fetchTeamMembers,
  fetchPartners,
  fetchMilestones,
} from "../../lib/api";
import { getHome } from "@/lib/api"; // Import your API function

const BASE_URL = process.env.NEXT_PUBLIC_API_IMAGE_URL;

export async function getStaticProps() {
  try {
    const homeData = await getHome(1, 10);
    return {
      props: {
        homeContent: homeData.content[0] || null,
      },
      revalidate: 3600, // ISR revalidation
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        homeContent: null,
      },
    };
  }
}
export const metadata = {
  title: "About Us - RWWS",
  description:
    "Learn about our mission, vision, team, and the impact we're making around the world",
};

export default function AboutPage({ homeContent }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-chart-3 text-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <Image
            src={`${BASE_URL}${homeContent.hero_image}`}
            alt="Team working together"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">About RWWS</h1>
            <p className="text-xl mb-0">
              Learn about our mission, vision, team, and the impact we're making
              around the world.
            </p>
          </div>
        </div>
      </section>
      <h3 className="text-6xl text-center font-bold mt-60">Coming Soon</h3>

      {/* <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                Our Purpose
              </div>
              <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To empower communities through sustainable development
                      programs and immediate relief efforts, creating lasting
                      change and building resilience in the face of challenges.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                    <p className="text-muted-foreground">
                      A world where every person has access to the basic
                      necessities of life, quality education, healthcare, and
                      the opportunity to thrive in a sustainable environment.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Our Values</h3>
                    <p className="text-muted-foreground">
                      Integrity, Compassion, Sustainability, Collaboration,
                      Innovation, and Accountability guide all our work and
                      relationships with communities, partners, and supporters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                alt="Community gathering"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              How We Work
            </div>
            <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
            <p className="text-lg max-w-3xl mx-auto">
              We believe in sustainable, community-led development that
              addresses immediate needs while building long-term resilience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community-Led</h3>
                <p className="text-muted-foreground">
                  We work directly with communities to understand their unique
                  needs and priorities, ensuring local ownership and
                  sustainability of all projects.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Sustainable Solutions
                </h3>
                <p className="text-muted-foreground">
                  Our programs are designed to create lasting change by
                  addressing root causes, not just symptoms, and building local
                  capacity for continued progress.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Global Collaboration</h3>
                <p className="text-muted-foreground">
                  We partner with local organizations, governments, and
                  international institutions to leverage resources and expertise
                  for maximum impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              Meet Our Team
            </div>
            <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Our dedicated team brings decades of experience in international
              development, humanitarian work, and non-profit management.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary mb-2">{member.role}</p>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/about/team">View Full Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              Our Journey
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Our History & Milestones
            </h2>
            <p className="text-lg max-w-3xl mx-auto">
              Since our founding in 2005, RWWS has grown from a small grassroots
              organization to a global non-profit making an impact in over 50
              countries.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1"></div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                    <Calendar className="h-4 w-4 text-primary-foreground" />
                  </div>

                  <div className="flex-1">
                    <Card
                      className={`max-w-md ${
                        index % 2 === 0 ? "ml-auto mr-8" : "ml-8"
                      }`}
                    >
                      <CardContent className="p-6">
                        <span className="text-primary font-bold text-xl">
                          {milestone.year}
                        </span>
                        <h3 className="text-lg font-bold mt-1 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              Collaborations
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Our Partners & Supporters
            </h2>
            <p className="text-lg max-w-3xl mx-auto">
              We collaborate with a diverse network of organizations to maximize
              our impact and reach.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="all">All Partners</TabsTrigger>
              <TabsTrigger value="ngo">NGOs</TabsTrigger>
              <TabsTrigger value="corporate">Corporate</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
                {partners.map((partner) => (
                  <div key={partner.id} className="flex flex-col items-center">
                    <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden mb-2">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <h3 className="text-sm font-medium text-center">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-muted-foreground text-center">
                      {partner.type}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="ngo">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
                {partners
                  .filter((p) => p.type === "NGO")
                  .map((partner) => (
                    <div
                      key={partner.id}
                      className="flex flex-col items-center"
                    >
                      <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden mb-2">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <h3 className="text-sm font-medium text-center">
                        {partner.name}
                      </h3>
                      <p className="text-xs text-muted-foreground text-center">
                        {partner.type}
                      </p>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="corporate">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
                {partners
                  .filter((p) => p.type === "Corporate Partner")
                  .map((partner) => (
                    <div
                      key={partner.id}
                      className="flex flex-col items-center"
                    >
                      <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden mb-2">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <h3 className="text-sm font-medium text-center">
                        {partner.name}
                      </h3>
                      <p className="text-xs text-muted-foreground text-center">
                        {partner.type}
                      </p>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <h3 className="text-xl font-bold mb-4">Become a Partner</h3>
            <p className="text-lg max-w-3xl mx-auto mb-6">
              We're always looking for new partnerships to expand our impact. If
              your organization shares our values and mission, we'd love to
              explore collaboration opportunities.
            </p>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                Accountability
              </div>
              <h2 className="text-3xl font-bold mb-6">
                Financial Transparency
              </h2>
              <p className="text-lg mb-6">
                We are committed to transparency and accountability in all our
                operations. 85% of every dollar donated goes directly to our
                programs, with 10% for administrative costs and 5% for
                fundraising.
              </p>
              <p className="text-lg mb-6">
                Our financial statements are audited annually by independent
                auditors, and we publish detailed reports on our website.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link href="/financial-reports">View Financial Reports</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/about/accountability">
                    Our Accountability Practices
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    85%
                  </div>
                  <p className="text-muted-foreground">Program Services</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    10%
                  </div>
                  <p className="text-muted-foreground">Administration</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">5%</div>
                  <p className="text-muted-foreground">Fundraising</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">4★</div>
                  <p className="text-muted-foreground">Charity Navigator</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether you want to donate, volunteer, or apply for aid, there are
            many ways to get involved with RWWS.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
            >
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              <Link href="/contact">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  );
}
