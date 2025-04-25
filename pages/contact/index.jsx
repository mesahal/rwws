// "use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { useToast } from "../../hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
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
export default function ContactPage({ homeContent }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
    preferredContact: "email",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, preferredContact: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // In a real app, this would send the form data to an API
    toast({
      title: "Message Sent",
      description: "Thank you for your inquiry. We'll get back to you soon.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      message: "",
      preferredContact: "email",
    });
  };
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
            alt="Contact us"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl mb-0">
              Have questions or want to get involved? We'd love to hear from
              you.
            </p>
          </div>
        </div>
      </section>
      <h3 className="text-6xl text-center font-bold mt-60">Coming Soon</h3>

      {/* Contact Form and Info */}
      {/* <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="inquiryType">Inquiry Type</Label>
                        <Select
                          value={formData.inquiryType}
                          onValueChange={(value) =>
                            handleSelectChange("inquiryType", value)
                          }
                          required
                        >
                          <SelectTrigger id="inquiryType" className="mt-1">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">
                              General Inquiry
                            </SelectItem>
                            <SelectItem value="donation">
                              Donation Question
                            </SelectItem>
                            <SelectItem value="volunteer">
                              Volunteer Opportunities
                            </SelectItem>
                            <SelectItem value="partnership">
                              Partnership Proposal
                            </SelectItem>
                            <SelectItem value="media">Media Inquiry</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="mt-1"
                        rows={5}
                      />
                    </div>

                    <div>
                      <Label className="mb-2 block">
                        Preferred Contact Method
                      </Label>
                      <RadioGroup
                        value={formData.preferredContact}
                        onValueChange={handleRadioChange}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="email" id="contact-email" />
                          <Label htmlFor="contact-email">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="phone" id="contact-phone" />
                          <Label htmlFor="contact-phone">Phone</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Address</h3>
                        <p className="text-muted-foreground">
                          123 Hope Street
                          <br />
                          Charity City, CC 12345
                          <br />
                          United States
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-muted-foreground">
                          +1 (555) 123-4567
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-muted-foreground">
                          info@hopefoundation.org
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Office Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Friday: 9:00 AM - 5:00 PM
                          <br />
                          Saturday - Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-0">
                  <div className="relative h-64 w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                      alt="Map location"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="default">
                        <Link
                          href="https://maps.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on Google Maps
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/faq"
                        className="text-primary hover:underline"
                      >
                        Frequently Asked Questions
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/donate"
                        className="text-primary hover:underline"
                      >
                        Make a Donation
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/apply-for-aid"
                        className="text-primary hover:underline"
                      >
                        Apply for Aid
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="text-primary hover:underline"
                      >
                        About Our Organization
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Preview */}
      {/* <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg max-w-3xl mx-auto">
              Find quick answers to common questions about our organization and
              programs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">
                  How can I volunteer with RWWS?
                </h3>
                <p className="text-muted-foreground">
                  We offer various volunteer opportunities both locally and
                  internationally. Visit our volunteer page to learn about
                  current opportunities and submit an application.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">
                  Is my donation tax-deductible?
                </h3>
                <p className="text-muted-foreground">
                  Yes, RWWS is a registered 501(c)(3) non-profit organization.
                  Your donations are tax-deductible to the extent allowed by
                  law.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">
                  How can I apply for aid from RWWS?
                </h3>
                <p className="text-muted-foreground">
                  You can apply for aid through our online application portal.
                  Visit our "Apply for Aid" page to learn about eligibility
                  requirements and submit your application.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">
                  How is my donation used?
                </h3>
                <p className="text-muted-foreground">
                  85% of donations go directly to our programs, with 10% for
                  administrative costs and 5% for fundraising. We publish
                  detailed financial reports annually.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/faq">View All FAQs</Link>
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  );
}
