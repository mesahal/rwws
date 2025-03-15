"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/auth";
import {
  Shield,
  Download,
  RefreshCw,
  Lock,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Key,
} from "lucide-react";

const mockSecurityData = {
  lastBackup: "2025-03-15 10:30 AM",
  nextScheduledBackup: "2025-03-16 10:30 AM",
  securityUpdates: [
    {
      id: 1,
      type: "System Update",
      status: "Completed",
      date: "2025-03-15 09:00 AM",
    },
    {
      id: 2,
      type: "Security Patch",
      status: "Pending",
      date: "2025-03-16 03:00 PM",
    },
    {
      id: 3,
      type: "Vulnerability Fix",
      status: "In Progress",
      date: "2025-03-15 02:30 PM",
    },
  ],
  securityMetrics: {
    failedLogins: 23,
    activeUsers: 45,
    pendingUpdates: 2,
    securityScore: 92,
  },
};

export default function SecurityManagement() {
  const [securityData] = useState(mockSecurityData);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { toast } = useToast();

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in progress":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsChangingPassword(true);
    try {
      const response = await auth.changePassword(oldPassword, newPassword);
      if (response.success) {
        toast({
          title: "Success",
          description: "Password changed successfully",
        });
        setOldPassword("");
        setNewPassword("");
      } else {
        throw new Error(response.message || "Failed to change password");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to change password",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-2">Security & Backups</h1>
      <p className="text-muted-foreground">
        Manage system security and backup settings.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Security Metrics Cards */}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Change Password & Backups Section */}
      </div>
    </div>
  );
}
