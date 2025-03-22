import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - RWWS",
  description:
    "Our commitment to protecting your privacy and personal information",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button asChild variant="outline" className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>

        <Card>
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

            <div className="prose prose-lg max-w-none">
              <p className="lead">Last updated: March 15, 2025</p>

              <h2>1. Introduction</h2>
              <p>
                These Terms of Service ("Terms") govern your use of RWWS
                services, website, and applications. By accessing or using our
                services, you agree to comply with these Terms.
              </p>

              <h2>2. Use of Services</h2>
              <p>
                You agree to use our services for lawful purposes only. You must
                not:
              </p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Engage in fraudulent or deceptive practices</li>
                <li>Interfere with the functionality of our services</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>

              <h2>3. Account Responsibilities</h2>
              <p>
                If you create an account with us, you are responsible for
                maintaining its security. You must notify us immediately if you
                suspect unauthorized access or use of your account.
              </p>

              <h2>4. Intellectual Property</h2>
              <p>
                All content, trademarks, and intellectual property associated
                with RWWS remain the property of RWWS and its licensors. You may
                not use, copy, or distribute our content without prior written
                consent.
              </p>

              <h2>5. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your access to our
                services if you violate these Terms, engage in harmful
                activities, or pose a risk to our community.
              </p>

              <h2>6. Limitation of Liability</h2>
              <p>
                RWWS is not liable for any indirect, incidental, or
                consequential damages arising from the use or inability to use
                our services.
              </p>

              <h2>7. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time. We will notify you
                of any changes by posting the new Terms on this page and
                updating the "Last updated" date.
              </p>

              <h2>8. Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the
                laws of Charity City, without regard to conflict of law
                principles.
              </p>

              <h2>9. Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please
                contact us at:
              </p>
              <p>
                RWWS
                <br />
                123 Hope Street
                <br />
                Charity City, CC 12345
                <br />
                Email: support@hopefoundation.org
                <br />
                Phone: (555) 123-4567
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
