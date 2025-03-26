"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Download,
  FileText,
  Calendar,
  ChevronRight,
} from "lucide-react";

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
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    content: `
      <h2>Executive Summary</h2>
      <p>The year 2024 marked significant growth and impact for RWWS. Through the generous support of our donors and the dedication of our team, we expanded our reach to serve more communities in need while maintaining high standards of efficiency and transparency.</p>

      <h2>Financial Highlights</h2>
      <ul>
        <li>Total Revenue: $12,000,000 (35% increase from 2023)</li>
        <li>Program Expenses: $10,200,000 (85% of total expenses)</li>
        <li>Administrative Costs: $1,200,000 (10% of total expenses)</li>
        <li>Fundraising Expenses: $600,000 (5% of total expenses)</li>
      </ul>

      <h2>Program Impact</h2>
      <ul>
        <li>Clean Water Initiative: 100 new water projects completed</li>
        <li>Education Program: 50 schools built or renovated</li>
        <li>Healthcare Outreach: 100,000 medical consultations provided</li>
        <li>Emergency Relief: Responded to 5 major disasters</li>
      </ul>

      <h2>Organizational Growth</h2>
      <ul>
        <li>Expanded operations to 5 new countries</li>
        <li>Increased full-time staff from 150 to 200</li>
        <li>Trained 500 new community volunteers</li>
        <li>Established 10 new strategic partnerships</li>
      </ul>
    `,
    financialBreakdown: {
      income: [
        { category: "Individual Donations", amount: 5000000 },
        { category: "Corporate Partnerships", amount: 3000000 },
        { category: "Grants", amount: 2500000 },
        { category: "Events", amount: 1000000 },
        { category: "Other Income", amount: 500000 },
      ],
      expenses: [
        { category: "Program Services", amount: 10200000 },
        { category: "Administrative", amount: 1200000 },
        { category: "Fundraising", amount: 600000 },
      ],
    },
    keyMetrics: [
      {
        label: "Program Efficiency",
        value: "85%",
        description: "Percentage of expenses directed to programs",
      },
      {
        label: "Year-over-Year Growth",
        value: "35%",
        description: "Increase in total revenue from previous year",
      },
      {
        label: "Lives Impacted",
        value: "2M+",
        description: "Number of beneficiaries served",
      },
      {
        label: "Countries Served",
        value: "50+",
        description: "Geographic reach of our programs",
      },
    ],
  },
  // Additional reports would be here
];

export default function FinancialReportDetail({ params }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchReport = () => {
      const foundReport = financialReports.find(
        (r) => r.id === parseInt(params.id)
      );
      setReport(foundReport);
      setLoading(false);
    };

    fetchReport();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Report Not Found</h1>
        <p className="mb-8">
          The financial report you're looking for doesn't exist or has been
          removed.
        </p>
        <Button asChild>
          <Link href="/financial-reports">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Financial Reports
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-chart-3 text-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <Image
            src={report.image}
            alt={report.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="mb-6 border-white text-white hover:bg-white hover:text-primary"
            >
              <Link href="/financial-reports">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Financial Reports
              </Link>
            </Button>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                {report.type}
              </span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Calendar className="h-3 w-3 mr-1" /> {report.date}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{report.title}</h1>
            <p className="text-xl mb-6">{report.description}</p>
            <div className="flex gap-4">
              <Button className="bg-white text-primary hover:bg-gray-100">
                <Download className="mr-2 h-4 w-4" /> Download Report
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <FileText className="mr-2 h-4 w-4" /> View Full Report
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {report.keyMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {metric.value}
                  </div>
                  <h3 className="font-medium mb-1">{metric.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Breakdown */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Financial Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Income */}
            <div>
              <h3 className="text-xl font-bold mb-6">Income Sources</h3>
              <div className="space-y-4">
                {report.financialBreakdown.income.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <ChevronRight className="h-4 w-4 text-primary mr-2" />
                      <span>{item.category}</span>
                    </div>
                    <span className="font-medium">
                      ${(item.amount / 1000000).toFixed(1)}M
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expenses */}
            <div>
              <h3 className="text-xl font-bold mb-6">Expense Allocation</h3>
              <div className="space-y-4">
                {report.financialBreakdown.expenses.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <ChevronRight className="h-4 w-4 text-primary mr-2" />
                      <span>{item.category}</span>
                    </div>
                    <span className="font-medium">
                      ${(item.amount / 1000000).toFixed(1)}M
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Content */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: report.content }}
          ></div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Download Full Report</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Access the complete financial report including detailed statements,
            notes, and auditor's opinion.
          </p>
          <Button size="lg">
            <Download className="mr-2 h-5 w-5" /> Download PDF (
            {report.fileSize})
          </Button>
        </div>
      </section>
    </div>
  );
}
