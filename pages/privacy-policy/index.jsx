import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - Hope Foundation",
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
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

            <div className="prose prose-lg max-w-none">
              <p className="lead">Last updated: March 15, 2025</p>

              <h2>1. Introduction</h2>
              <p>
                Hope Foundation ("we," "our," or "us") is committed to
                protecting your privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website, use our services, or interact with us in any
                way.
              </p>

              <h2>2. Information We Collect</h2>
              <h3>2.1 Personal Information</h3>
              <p>
                We may collect personal information that you provide directly to
                us, including:
              </p>
              <ul>
                <li>Name and contact information</li>
                <li>Billing and payment information</li>
                <li>Demographic information</li>
                <li>Information provided in aid applications</li>
                <li>Communication preferences</li>
              </ul>

              <h3>2.2 Automatically Collected Information</h3>
              <p>
                When you visit our website, we may automatically collect certain
                information about your device, including:
              </p>
              <ul>
                <li>IP address</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>Access times</li>
                <li>Pages viewed</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Process your donations and aid applications</li>
                <li>Communicate with you about our programs and services</li>
                <li>Send you updates and newsletters (if you opt-in)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and abuse</li>
              </ul>

              <h2>4. Information Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              <ul>
                <li>Service providers who assist in our operations</li>
                <li>Partner organizations (with your consent)</li>
                <li>Legal authorities when required by law</li>
                <li>Professional advisers and insurers</li>
              </ul>

              <h2>5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>

              <h2>6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent where applicable</li>
              </ul>

              <h2>7. Children's Privacy</h2>
              <p>
                We do not knowingly collect or solicit personal information from
                children under 13. If you are under 13, please do not provide
                any personal information on our website.
              </p>

              <h2>8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date.
              </p>

              <h2>9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <p>
                Hope Foundation
                <br />
                123 Hope Street
                <br />
                Charity City, CC 12345
                <br />
                Email: privacy@hopefoundation.org
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
