"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  DollarSign,
  HandHelping,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// Mock data - replace with API calls
const mockDashboardData = {
  totalUsers: 1250,
  totalDonations: 125000,
  pendingRequests: 45,
  monthlyVisits: 25000,
  recentDonations: [
    { id: 1, amount: 1000, donor: "John Doe", date: "2025-03-15" },
    { id: 2, amount: 500, donor: "Jane Smith", date: "2025-03-14" },
    { id: 3, amount: 2500, donor: "Bob Johnson", date: "2025-03-13" },
  ],
  recentRequests: [
    { id: 1, name: "Sarah Wilson", type: "Medical Aid", status: "Pending" },
    { id: 2, name: "Mike Brown", type: "Education Support", status: "Pending" },
    { id: 3, name: "Lisa Davis", type: "Emergency Relief", status: "Pending" },
  ],
};

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(mockDashboardData);

  useEffect(() => {
    // Fetch dashboard data
    const fetchData = async () => {
      try {
        // Replace with actual API call
        setDashboardData(mockDashboardData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: dashboardData.totalUsers,
      icon: <Users className="h-6 w-6" />,
      trend: "up",
      change: "+12%",
    },
    {
      title: "Total Donations",
      value: `$${dashboardData.totalDonations.toLocaleString()}`,
      icon: <DollarSign className="h-6 w-6" />,
      trend: "up",
      change: "+25%",
    },
    {
      title: "Pending Requests",
      value: dashboardData.pendingRequests,
      icon: <HandHelping className="h-6 w-6" />,
      trend: "down",
      change: "-8%",
    },
    {
      title: "Monthly Visits",
      value: dashboardData.monthlyVisits.toLocaleString(),
      icon: <TrendingUp className="h-6 w-6" />,
      trend: "up",
      change: "+15%",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your organization.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-2 rounded-lg">{stat.icon}</div>
                <div
                  className={`flex items-center ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm text-muted-foreground">{stat.title}</h3>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Donations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{donation.donor}</p>
                    <p className="text-sm text-muted-foreground">
                      {donation.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${donation.amount}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Donations
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pending Aid Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Aid Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{request.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {request.type}
                    </p>
                  </div>
                  <Button size="sm">Review</Button>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Requests
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
