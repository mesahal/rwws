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
import {
  Heart,
  Users,
  Globe,
  Award,
  Calendar,
  Building,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
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
  if (!homeContent) {
    return <div className="text-center py-8">Failed to load content</div>;
  }
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
              Learn about our mission, vision, and the impact we're making
              around the world.
            </p>
          </div>
        </div>
      </section>
      {/* About Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">About Us</h2>
          <p className="mb-6">
            Women are vital to our society, and their empowerment is key to
            national progress. Recognizing this, Razia Sultana, along with a
            group of dedicated lawyers, teachers, and social activists, founded
            RW Welfare Society (RWWS) in 2018 to create a platform for uplifting
            underprivileged women and marginalized communities. RWWS is a
            non-profit organization committed to women's rights, social welfare,
            and sustainable development.
          </p>
          <p className="mb-6">
            In Bangladesh and across South Asia, women continue to face
            deep-rooted challenges—social discrimination, limited access to
            education, economic dependency, and systemic inequality. Aligning
            with the goal, RWWS works to break these barriers by promoting
            education, economic independence, and equal opportunities for women.
            Our mission is rooted in the belief that empowering women leads to
            stronger families, communities, and nations.
          </p>
          <p className="mb-6">
            We strive to create a society where women can thrive with dignity,
            free from oppression and discrimination. Through advocacy,
            skill-building programs, leadership training, psychosocial support,
            and community support initiatives, we aim to foster resilience and
            self-reliance among women, enabling them to participate fully in
            social, economic, and political decision-making.
          </p>
          <p className="mb-6">
            At RWWS, we believe that true progress begins when every woman is
            given the chance to rise. Join us in building a world where
            equality, justice, and opportunity are not just ideals—but realities
            for all.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-primary/10 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Vision</h3>
            <p className="text-lg">Equal for All</p>
          </div>
          <div className="bg-chart-1/10 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Mission</h3>
            <p className="text-lg">
              RWWS aims to empower women through resilience building and
              leadership to ensure they have equal opportunities and the
              capacity to participate in the decision-making process fully.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 border-t pt-12">
          <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start">
              <Phone className="h-6 w-6 mr-4 mt-1" />
              <div>
                <p className="font-medium">Phone</p>
                <p>+880-1730 79 4514</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="h-6 w-6 mr-4 mt-1" />
              <div>
                <p className="font-medium">Email</p>
                <p>rowwsbd@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-6 w-6 mr-4 mt-1" />
              <div>
                <p className="font-medium">Address</p>
                <p>
                  889/B (Ground Floor) Nur Ahmed Road,
                  <br />
                  Jamal Khan, Chittagong
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
