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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Download, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Financial Reports - RWWS",
  description:
    "Access our audited financial statements and annual reports for complete transparency",
};

// Mock data (would come from API in production)
const financialReports = [
  {
    id: 1,
    title: "Annual Report 2024",
    type: "Annual Report",
    description:
      "Comprehensive overview of our financial performance, program impacts, and organizational growth in 2024.",
    date: "March 15, 2025",
    fileSize: "2.5 MB",
    highlights: [
      "Total donations increased by 35% to $12M",
      "Program efficiency ratio improved to 85%",
      "Administrative costs reduced to 10%",
      "Impact reached 2 million beneficiaries",
    ],
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    title: "Q4 2024 Financial Statement",
    type: "Quarterly Report",
    description:
      "Detailed financial statements and performance metrics for the fourth quarter of 2024.",
    date: "January 30, 2025",
    fileSize: "1.8 MB",
    highlights: [
      "Quarterly revenue of $3.5M",
      "Project completion rate of 95%",
      "New grants secured worth $2M",
      "Emergency response costs detailed",
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    title: "2024 Audit Report",
    type: "Audit Report",
    description:
      "Independent auditor's assessment of our financial statements and internal controls.",
    date: "February 28, 2025",
    fileSize: "1.2 MB",
    highlights: [
      "Unqualified audit opinion received",
      "Full compliance with regulations",
      "Strong internal controls noted",
      "Recommendations for improvements",
    ],
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 4,
    title: "Impact Report 2024",
    type: "Impact Report",
    description:
      "Detailed analysis of our programs' social impact and beneficiary outcomes.",
    date: "March 1, 2025",
    fileSize: "3.1 MB",
    highlights: [
      "500,000 people gained water access",
      "250 schools built or renovated",
      "100,000 medical consultations provided",
      "Environmental impact metrics",
    ],
    image:
      "https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];

const years = ["All Years", "2024", "2023", "2022", "2021", "2020"];
const types = [
  "All Types",
  "Annual Report",
  "Quarterly Report",
  "Audit Report",
  "Impact Report",
];

export default function FinancialReportsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-chart-3 text-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <Image
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Financial Reports"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Financial Reports</h1>
            <p className="text-xl mb-0">
              Access our audited financial statements and annual reports for
              complete transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">85%</div>
                <p className="text-muted-foreground">Program Efficiency</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">4★</div>
                <p className="text-muted-foreground">
                  Charity Navigator Rating
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">A+</div>
                <p className="text-muted-foreground">Transparency Grade</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Our Commitment to Transparency
            </h2>
            <p className="text-lg max-w-3xl mx-auto">
              We believe in complete transparency in our operations. Our
              financial reports are independently audited and publicly available
              to ensure accountability to our donors and beneficiaries.
            </p>
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search reports..." className="pl-10" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Select defaultValue="All Years">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select defaultValue="All Types">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {financialReports.map((report) => (
              <Card key={report.id} className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-48 md:h-full">
                    <Image
                      src={report.image}
                      alt={report.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      {report.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{report.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {report.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{report.fileSize}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{report.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/financial-reports/${report.id}`}>
                          View Details
                        </Link>
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" /> Download
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Understanding Our Financials
              </h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Our financial reports provide detailed insights into how we
                  allocate and utilize donor funds. Here's a quick guide to
                  understanding our financial statements:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>
                      Program expenses represent direct costs of our
                      humanitarian projects
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>
                      Administrative costs include operational and staff
                      expenses
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>
                      Fundraising expenses help us maintain and grow our donor
                      base
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Have Questions?</h2>
              <p className="text-muted-foreground mb-6">
                Our finance team is happy to answer any questions about our
                financial reports or provide additional information about our
                financial practices.
              </p>
              <Button asChild>
                <Link href="/contact">Contact Our Finance Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
