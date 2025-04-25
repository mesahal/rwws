// "use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
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

export default function AidApplicationPage({ homeContent }) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isEligible, setIsEligible] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (step === 1) {
      // Check eligibility based on form data
      const eligible = checkEligibility(data);
      setIsEligible(eligible);
      if (eligible) {
        setStep(2);
      }
    } else if (step === 2) {
      // Submit application
      toast({
        title: "Application Submitted",
        description: "We'll review your application and contact you soon.",
      });
      // In a real app, this would send the data to an API
      console.log("Application data:", data);
    }
  };

  const checkEligibility = (data) => {
    // This would contain actual eligibility logic
    return true;
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
            alt="Apply for Aid"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Apply for Aid</h1>
            <p className="text-xl mb-0">
              Complete our application process to request assistance from Hope
              Foundation.
            </p>
          </div>
        </div>
      </section>

      <h3 className="text-6xl text-center font-bold mt-60">Coming Soon</h3>

      {/* Application Form */}
      {/* <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center ${
                  step >= 1 ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold">
                  1
                </div>
                <span className="ml-2">Eligibility Check</span>
              </div>
              <div className="flex-1 border-t-2 mx-4"></div>
              <div
                className={`flex items-center ${
                  step >= 2 ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold">
                  2
                </div>
                <span className="ml-2">Application Details</span>
              </div>
            </div>
          </div>

          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Check</CardTitle>
                <CardDescription>
                  Please answer these questions to determine your eligibility
                  for aid.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>
                        Are you requesting aid for yourself or on behalf of
                        someone else?
                      </Label>
                      <RadioGroup defaultValue="self" className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="self" id="self" />
                          <Label htmlFor="self">Myself</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Someone else</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>What type of assistance are you seeking?</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select assistance type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medical">Medical Aid</SelectItem>
                          <SelectItem value="education">
                            Education Support
                          </SelectItem>
                          <SelectItem value="housing">
                            Housing Assistance
                          </SelectItem>
                          <SelectItem value="food">Food Support</SelectItem>
                          <SelectItem value="emergency">
                            Emergency Relief
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>What is your current employment status?</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select employment status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unemployed">Unemployed</SelectItem>
                          <SelectItem value="part-time">
                            Part-time employed
                          </SelectItem>
                          <SelectItem value="full-time">
                            Full-time employed
                          </SelectItem>
                          <SelectItem value="self-employed">
                            Self-employed
                          </SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>What is your monthly household income?</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select income range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1000">$0 - $1,000</SelectItem>
                          <SelectItem value="1001-2000">
                            $1,001 - $2,000
                          </SelectItem>
                          <SelectItem value="2001-3000">
                            $2,001 - $3,000
                          </SelectItem>
                          <SelectItem value="3001-4000">
                            $3,001 - $4,000
                          </SelectItem>
                          <SelectItem value="4001+">$4,001+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Check Eligibility <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {isEligible === false && (
            <Card>
              <CardContent className="p-6 text-center">
                <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Not Eligible</h2>
                <p className="text-muted-foreground mb-6">
                  Based on your responses, you may not be eligible for aid at
                  this time. However, we encourage you to explore our other
                  resources and support services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="outline">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/resources">View Resources</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
                <CardDescription>
                  Please provide detailed information about your aid request.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" required />
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" required />
                  </div>

                  <div>
                    <Label htmlFor="amount">Amount Requested ($)</Label>
                    <Input id="amount" type="number" required />
                  </div>

                  <div>
                    <Label htmlFor="purpose">Purpose of Aid Request</Label>
                    <Textarea
                      id="purpose"
                      placeholder="Please describe why you need this assistance and how it will help you..."
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="timeline">
                      When do you need this assistance?
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediately</SelectItem>
                        <SelectItem value="1-week">Within 1 week</SelectItem>
                        <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button type="submit" className="flex-1">
                      Submit Application
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section> */}

      {/* Additional Information */}
      {/* <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Demonstrated financial need</li>
                  <li>• Valid identification</li>
                  <li>• Proof of residence</li>
                  <li>• Income verification</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Government-issued ID</li>
                  <li>• Proof of income</li>
                  <li>• Utility bills</li>
                  <li>• Medical records (if applicable)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Processing Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Initial review: 1-2 business days</li>
                  <li>• Document verification: 3-5 days</li>
                  <li>• Final decision: 5-7 business days</li>
                  <li>• Emergency cases: 24-48 hours</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}
    </div>
  );
}
