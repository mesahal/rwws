// "use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  CreditCard,
  Heart,
  DollarSign,
  Calendar,
  Users,
  Globe,
  BookOpen,
} from "lucide-react";
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

export default function DonatePage({ homeContent }) {
  const { toast } = useToast();
  const [donationAmount, setDonationAmount] = useState("50");
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("one-time");
  const [selectedProgram, setSelectedProgram] = useState("general");

  const handleDonationSubmit = (e) => {
    e.preventDefault();

    // In a real app, this would connect to a payment processor
    toast({
      title: "Donation Submitted",
      description: `Thank you for your ${
        donationType === "one-time" ? "one-time" : "monthly"
      } donation of $${customAmount || donationAmount}.`,
    });
  };

  const handleAmountChange = (value) => {
    setDonationAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setDonationAmount("custom");
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
            alt="People helping each other"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Make a Donation</h1>
            <p className="text-xl mb-0">
              Your generosity helps us create lasting change in communities
              worldwide.
            </p>
          </div>
        </div>
      </section>
      <h3 className="text-6xl text-center font-bold mt-60">Coming Soon</h3>

      {/* Donation Form */}
      {/* <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Donation</CardTitle>
                  <CardDescription>
                    Choose an amount and payment frequency to support our work.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDonationSubmit}>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-base">Donation Type</Label>
                        <RadioGroup
                          defaultValue="one-time"
                          className="grid grid-cols-2 gap-4 mt-2"
                          value={donationType}
                          onValueChange={setDonationType}
                        >
                          <div>
                            <RadioGroupItem
                              value="one-time"
                              id="one-time"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="one-time"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <DollarSign className="mb-3 h-6 w-6" />
                              One-time Donation
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="monthly"
                              id="monthly"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="monthly"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <Calendar className="mb-3 h-6 w-6" />
                              Monthly Donation
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label className="text-base">Donation Amount</Label>
                        <RadioGroup
                          defaultValue="50"
                          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2"
                          value={donationAmount}
                          onValueChange={handleAmountChange}
                        >
                          <div>
                            <RadioGroupItem
                              value="25"
                              id="amount-25"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="amount-25"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              $25
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="50"
                              id="amount-50"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="amount-50"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              $50
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="100"
                              id="amount-100"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="amount-100"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              $100
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="custom"
                              id="amount-custom"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="amount-custom"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              Custom
                            </Label>
                          </div>
                        </RadioGroup>

                        {donationAmount === "custom" && (
                          <div className="mt-4">
                            <Label htmlFor="custom-amount">
                              Custom Amount ($)
                            </Label>
                            <Input
                              id="custom-amount"
                              type="number"
                              placeholder="Enter amount"
                              value={customAmount}
                              onChange={handleCustomAmountChange}
                              min="1"
                              className="mt-1"
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <Label className="text-base">
                          Allocate Your Donation
                        </Label>
                        <RadioGroup
                          defaultValue="general"
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2"
                          value={selectedProgram}
                          onValueChange={setSelectedProgram}
                        >
                          <div>
                            <RadioGroupItem
                              value="general"
                              id="general"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="general"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <Heart className="mb-3 h-6 w-6" />
                              General Fund
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="water"
                              id="water"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="water"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <Globe className="mb-3 h-6 w-6" />
                              Clean Water Initiative
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="education"
                              id="education"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="education"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <BookOpen className="mb-3 h-6 w-6" />
                              Education Programs
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="healthcare"
                              id="healthcare"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="healthcare"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <Users className="mb-3 h-6 w-6" />
                              Healthcare Outreach
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label className="text-base">
                          Personal Information
                        </Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                          <div>
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone (Optional)</Label>
                            <Input id="phone" className="mt-1" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-base">Payment Information</Label>
                        <Tabs defaultValue="card" className="mt-2">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="card">Credit Card</TabsTrigger>
                            <TabsTrigger value="paypal">PayPal</TabsTrigger>
                          </TabsList>
                          <TabsContent value="card" className="space-y-4 mt-4">
                            <div>
                              <Label htmlFor="card-number">Card Number</Label>
                              <Input
                                id="card-number"
                                placeholder="1234 5678 9012 3456"
                                className="mt-1"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input
                                  id="expiry"
                                  placeholder="MM/YY"
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvc">CVC</Label>
                                <Input
                                  id="cvc"
                                  placeholder="123"
                                  className="mt-1"
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="card-name">Name on Card</Label>
                              <Input id="card-name" className="mt-1" />
                            </div>
                          </TabsContent>
                          <TabsContent value="paypal" className="mt-4">
                            <p className="text-muted-foreground mb-4">
                              You will be redirected to PayPal to complete your
                              donation.
                            </p>
                          </TabsContent>
                        </Tabs>
                      </div>

                      <div>
                        <Label htmlFor="comments">
                          Additional Comments (Optional)
                        </Label>
                        <Textarea id="comments" className="mt-1" />
                      </div>

                      <Button type="submit" className="w-full">
                        {donationType === "one-time"
                          ? `Donate $${customAmount || donationAmount}`
                          : `Donate $${customAmount || donationAmount} Monthly`}
                      </Button>

                      <p className="text-sm text-muted-foreground text-center">
                        Your donation is secure and encrypted. By donating, you
                        agree to our{" "}
                        <Link href="/terms" className="underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy-policy" className="underline">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Your Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">$25</h4>
                      <p className="text-sm text-muted-foreground">
                        Provides clean water to a family for a month
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">$50</h4>
                      <p className="text-sm text-muted-foreground">
                        Supplies educational materials for 10 children
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">$100</h4>
                      <p className="text-sm text-muted-foreground">
                        Provides medical care for 5 individuals
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium">
                      Is my donation tax-deductible?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, RWWS is a registered 501(c)(3) organization. Your
                      donation is tax-deductible to the extent allowed by law.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">How is my donation used?</h4>
                    <p className="text-sm text-muted-foreground">
                      85% of your donation goes directly to our programs, with
                      10% for administrative costs and 5% for fundraising.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">
                      Can I cancel my monthly donation?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, you can cancel your monthly donation at any time by
                      logging into your account or contacting our support team.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Will I receive a receipt?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, you will receive an email receipt immediately after
                      your donation is processed.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/faq">View All FAQs</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      {/* <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Donors Support Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                      alt="Donor"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <p className="italic mb-4">
                    "I've been donating monthly for two years now. The
                    transparency and impact reports help me see exactly how my
                    contributions are making a difference."
                  </p>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">
                    Monthly Donor since 2023
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                      alt="Donor"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <p className="italic mb-4">
                    "After visiting one of the communities supported by RWWS, I
                    saw firsthand the incredible impact they're making. I'm
                    proud to support their work."
                  </p>
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">
                    Corporate Partner
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                      alt="Donor"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <p className="italic mb-4">
                    "I appreciate how RWWS focuses on sustainable solutions
                    rather than just temporary aid. They're creating lasting
                    change in communities."
                  </p>
                  <p className="font-medium">Amara Okafor</p>
                  <p className="text-sm text-muted-foreground">Annual Donor</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}
    </div>
  );
}
