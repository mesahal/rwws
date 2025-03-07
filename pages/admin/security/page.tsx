"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Shield,
  Download,
  RefreshCw,
  Lock,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'

// Mock data - replace with API calls
const mockSecurityData = {
  lastBackup: "2025-03-15 10:30 AM",
  nextScheduledBackup: "2025-03-16 10:30 AM",
  securityUpdates: [
    {
      id: 1,
      type: "System Update",
      status: "Completed",
      date: "2025-03-15 09:00 AM"
    },
    {
      id: 2,
      type: "Security Patch",
      status: "Pending",
      date: "2025-03-16 03:00 PM"
    },
    {
      id: 3,
      type: "Vulnerability Fix",
      status: "In Progress",
      date: "2025-03-15 02:30 PM"
    }
  ],
  securityMetrics: {
    failedLogins: 23,
    activeUsers: 45,
    pendingUpdates: 2,
    securityScore: 92
  }
}

export default function SecurityManagement() {
  const [securityData] = useState(mockSecurityData)

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in progress':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-red-100 text-red-800'
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Security & Backups</h1>
        <p className="text-muted-foreground">
          Manage system security and backup settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <span className={`px-2 py-1 rounded-full text-sm ${
                securityData.securityMetrics.securityScore >= 90 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                Score: {securityData.securityMetrics.securityScore}%
              </span>
            </div>
            <h3 className="font-medium">Security Score</h3>
            <p className="text-sm text-muted-foreground">Overall system security rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <span className="text-lg font-bold">{securityData.securityMetrics.activeUsers}</span>
            </div>
            <h3 className="font-medium">Active Users</h3>
            <p className="text-sm text-muted-foreground">Currently logged in users</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <span className="text-lg font-bold">{securityData.securityMetrics.failedLogins}</span>
            </div>
            <h3 className="font-medium">Failed Logins</h3>
            <p className="text-sm text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <span className="text-lg font-bold">{securityData.securityMetrics.pendingUpdates}</span>
            </div>
            <h3 className="font-medium">Pending Updates</h3>
            <p className="text-sm text-muted-foreground">Security updates needed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Backups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium">Last Backup</p>
                    <p className="text-sm text-muted-foreground">{securityData.lastBackup}</p>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Next Scheduled Backup</p>
                    <p className="text-sm text-muted-foreground">{securityData.nextScheduledBackup}</p>
                  </div>
                  <Button>
                    <RefreshCw className="h-4 w-4 mr-2" /> Backup Now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityData.securityUpdates.map((update) => (
                <div key={update.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(update.status)}
                    <div className="ml-3">
                      <p className="font-medium">{update.type}</p>
                      <p className="text-sm text-muted-foreground">{update.date}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(update.status)}`}>
                    {update.status}
                  </span>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                <Lock className="h-4 w-4 mr-2" /> Check for Updates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}