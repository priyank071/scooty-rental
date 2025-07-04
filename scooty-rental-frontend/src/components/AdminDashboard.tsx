import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const pendingOwners = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 9876543210",
      businessAddress: "MG Road, Bangalore",
      scootyCount: 5,
      submittedAt: "2024-01-15 10:30"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com", 
      phone: "+91 8765432109",
      businessAddress: "Koramangala, Bangalore",
      scootyCount: 3,
      submittedAt: "2024-01-16 14:20"
    }
  ];

  const platformStats = {
    totalUsers: 1250,
    totalOwners: 89,
    activeBookings: 45,
    totalFleet: 267,
    dailyBookings: 123,
    cancellationRate: 8.5,
    topModel: "Honda Activa 6G"
  };

  const recentUsers = [
    { id: 1, name: "Amit Singh", email: "amit@example.com", status: "active", joinedAt: "2024-01-15" },
    { id: 2, name: "Sneha Patel", email: "sneha@example.com", status: "blocked", joinedAt: "2024-01-14" },
    { id: 3, name: "Ravi Kumar", email: "ravi@example.com", status: "active", joinedAt: "2024-01-13" }
  ];

  const approveOwner = (ownerId: number) => {
    console.log(`Approved owner ${ownerId}`);
    // Here you would typically send approval notification via WhatsApp/SMS
  };

  const rejectOwner = (ownerId: number) => {
    console.log(`Rejected owner ${ownerId}`);
  };

  const contactOwner = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank');
  };

  const toggleUserStatus = (userId: number, currentStatus: string) => {
    console.log(`Toggled user ${userId} from ${currentStatus}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-card shadow-soft border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Admin Control Panel
            </h1>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Platform Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{platformStats.totalUsers.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-lg">👥</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Owners</p>
                  <p className="text-2xl font-bold">{platformStats.totalOwners}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <span className="text-lg">🏪</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Bookings</p>
                  <p className="text-2xl font-bold">{platformStats.activeBookings}</p>
                </div>
                <div className="w-10 h-10 bg-warning rounded-full flex items-center justify-center">
                  <span className="text-lg">🚀</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Fleet</p>
                  <p className="text-2xl font-bold">{platformStats.totalFleet}</p>
                </div>
                <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                  <span className="text-lg">🛴</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="approvals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-96">
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="approvals" className="space-y-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📋 Owner Approval Queue
                  <Badge variant="secondary">{pendingOwners.length} Pending</Badge>
                </CardTitle>
                <CardDescription>Review and approve new scooty owner requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingOwners.map((owner) => (
                    <div key={owner.id} className="border rounded-lg p-4 bg-background">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{owner.name}</h3>
                          <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-muted-foreground">
                            <div>
                              <p>📧 {owner.email}</p>
                              <p>📱 {owner.phone}</p>
                            </div>
                            <div>
                              <p>📍 {owner.businessAddress}</p>
                              <p>🛴 {owner.scootyCount} scooties</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Submitted: {owner.submittedAt}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => contactOwner(owner.phone)}
                          >
                            WhatsApp
                          </Button>
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => approveOwner(owner.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => rejectOwner(owner.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Search and manage platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg bg-background">
                      <div className="flex-1">
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">Joined: {user.joinedAt}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={user.status === "active" ? "success" : "destructive" as any}>
                          {user.status.toUpperCase()}
                        </Badge>
                        <Button
                          size="sm"
                          variant={user.status === "active" ? "destructive" : "success"}
                          onClick={() => toggleUserStatus(user.id, user.status)}
                        >
                          {user.status === "active" ? "Block" : "Unblock"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6">
              <Card className="bg-gradient-card shadow-medium">
                <CardHeader>
                  <CardTitle>📊 Platform Metrics</CardTitle>
                  <CardDescription>Real-time performance insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 border rounded-lg bg-background">
                      <h3 className="text-2xl font-bold text-primary">{platformStats.dailyBookings}</h3>
                      <p className="text-sm text-muted-foreground">Daily Bookings</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg bg-background">
                      <h3 className="text-2xl font-bold text-warning">{platformStats.cancellationRate}%</h3>
                      <p className="text-sm text-muted-foreground">Cancellation Rate</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg bg-background">
                      <h3 className="text-lg font-bold text-secondary">{platformStats.topModel}</h3>
                      <p className="text-sm text-muted-foreground">Most Booked Model</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-medium">
                <CardHeader>
                  <CardTitle>🗺️ Geographic Heat Map</CardTitle>
                  <CardDescription>Demand distribution across the city</CardDescription>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center bg-muted/10 rounded-lg">
                  <p className="text-muted-foreground">Heat map visualization would be integrated here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}