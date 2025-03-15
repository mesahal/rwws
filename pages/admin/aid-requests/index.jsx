"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  FileText,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data - replace with API calls
const mockRequests = [
  {
    id: 1,
    name: "Sarah Wilson",
    type: "Medical Aid",
    amount: 5000,
    status: "Pending",
    date: "2025-03-15",
    urgency: "High",
  },
  {
    id: 2,
    name: "Mike Brown",
    type: "Education Support",
    amount: 2500,
    status: "Approved",
    date: "2025-03-14",
    urgency: "Medium",
  },
  {
    id: 3,
    name: "Lisa Davis",
    type: "Emergency Relief",
    amount: 1000,
    status: "Rejected",
    date: "2025-03-13",
    urgency: "High",
  },
  {
    id: 4,
    name: "John Smith",
    type: "Housing Assistance",
    amount: 3500,
    status: "Pending",
    date: "2025-03-12",
    urgency: "Medium",
  },
  {
    id: 5,
    name: "Emma Johnson",
    type: "Food Support",
    amount: 800,
    status: "Pending",
    date: "2025-03-11",
    urgency: "Low",
  },
];

export default function AidRequestManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [requests] = useState(mockRequests);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        // Continuing with the aid-requests page code exactly where we left off:

        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Aid Request Management</h1>
        <p className="text-muted-foreground">
          Review and process aid applications.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" /> Advanced Filters
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aid Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Applicant</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Urgency</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="border-b">
                    <td className="py-3 px-4">
                      <div className="font-medium">{request.name}</div>
                    </td>
                    <td className="py-3 px-4">{request.type}</td>
                    <td className="py-3 px-4">${request.amount}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {getStatusIcon(request.status)}
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getUrgencyColor(
                          request.urgency
                        )}`}
                      >
                        {request.urgency}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {request.date}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                        {request.status === "Pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-green-500"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
