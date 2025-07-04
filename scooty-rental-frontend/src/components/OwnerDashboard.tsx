import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { AddScootyModal } from "./AddScootyModal";
import { NotificationPanel } from "./NotificationPanel";
import { ChatModal } from "./ChatModal";
import { useToast } from "@/hooks/use-toast";

interface OwnerDashboardProps {
  onLogout: () => void;
}

export function OwnerDashboard({ onLogout }: OwnerDashboardProps) {
  const { toast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [scooties, setScooties] = useState([
    {
      id: 1,
      model: "Honda Activa 6G",
      plateNumber: "KA01AB1234",
      hourlyRate: 80,
      available: true,
      location: "MG Road",
      totalBookings: 15,
      earnings: 4800
    },
    {
      id: 2,
      model: "TVS Jupiter",
      plateNumber: "KA02CD5678",
      hourlyRate: 75,
      available: false,
      location: "Brigade Road",
      totalBookings: 12,
      earnings: 3600
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "booking" as const,
      title: "New Booking Request",
      message: "A new user has requested to book your Honda Activa 6G",
      timestamp: "2 min ago",
      read: false,
      userDetails: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+91 9876543210"
      },
      scootyModel: "Honda Activa 6G",
      bookingId: 1
    },
    {
      id: 2,
      type: "message" as const,
      title: "Document Uploaded",
      message: "User has uploaded driving license for verification",
      timestamp: "5 min ago",
      read: false,
      bookingId: 2
    }
  ]);

  const bookings = [
    {
      id: 1,
      userEmail: "user@example.com",
      scootyModel: "Honda Activa 6G",
      startTime: "2024-01-16 10:00",
      endTime: "2024-01-16 14:00",
      status: "confirmed",
      amount: 320
    },
    {
      id: 2,
      userEmail: "rider@example.com",
      scootyModel: "TVS Jupiter",
      startTime: "2024-01-16 15:00",
      endTime: "2024-01-16 18:00",
      status: "pending",
      amount: 225
    }
  ];

  const toggleAvailability = (scootyId: number) => {
    setScooties(scooties.map(scooty =>
      scooty.id === scootyId
        ? { ...scooty, available: !scooty.available }
        : scooty
    ));
  };

  const updateBookingStatus = (bookingId: number, newStatus: string) => {
    // Update booking status logic would go here
    console.log(`Updated booking ${bookingId} to ${newStatus}`);
    toast({
      title: "Booking Updated",
      description: `Booking ${bookingId} has been ${newStatus}`,
    });
  };

  const handleMarkAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleStartChat = (bookingId: number) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setSelectedBooking({
        id: booking.id,
        userEmail: booking.userEmail,
        scootyModel: booking.scootyModel,
        ownerName: "Owner Name" // This would come from auth context
      });
      setShowChatModal(true);
    }
  };

  const totalEarnings = scooties.reduce((sum, scooty) => sum + scooty.earnings, 0);
  const totalBookings = scooties.reduce((sum, scooty) => sum + scooty.totalBookings, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-card shadow-soft border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
              Owner Dashboard
            </h1>
            <div className="flex items-center gap-3">
              <NotificationPanel 
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onStartChat={handleStartChat}
              />
              <Button variant="outline" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Scooties</p>
                  <p className="text-2xl font-bold">{scooties.length}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-lg">🛴</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{totalBookings}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <span className="text-lg">📅</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold">₹{totalEarnings.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                  <span className="text-lg">💰</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available Now</p>
                  <p className="text-2xl font-bold">{scooties.filter(s => s.available).length}</p>
                </div>
                <div className="w-10 h-10 bg-warning rounded-full flex items-center justify-center">
                  <span className="text-lg">✅</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="fleet" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-96">
            <TabsTrigger value="fleet">My Fleet</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="fleet" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Your Scooties</h2>
              <Button variant="gradient" onClick={() => setShowAddModal(true)}>
                Add New Scooty
              </Button>
            </div>

            <div className="grid gap-6">
              {scooties.map((scooty) => (
                <Card key={scooty.id} className="bg-gradient-card shadow-medium">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{scooty.model}</h3>
                        <p className="text-muted-foreground">{scooty.plateNumber}</p>
                        <p className="text-sm text-muted-foreground">📍 {scooty.location}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Hourly Rate</p>
                          <p className="font-semibold">₹{scooty.hourlyRate}/hr</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Earnings</p>
                          <p className="font-semibold">₹{scooty.earnings}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Available</span>
                          <Switch
                            checked={scooty.available}
                            onCheckedChange={() => toggleAvailability(scooty.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Manage incoming booking requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg bg-background">
                      <div className="flex-1">
                        <h3 className="font-semibold">{booking.scootyModel}</h3>
                        <p className="text-sm text-muted-foreground">{booking.userEmail}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.startTime} - {booking.endTime}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={booking.status === "confirmed" ? "success" : "warning" as any}>
                          {booking.status.toUpperCase()}
                        </Badge>
                        <span className="font-semibold">₹{booking.amount}</span>
                        {booking.status === "pending" && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="success"
                              onClick={() => updateBookingStatus(booking.id, "confirmed")}
                            >
                              Confirm
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => updateBookingStatus(booking.id, "rejected")}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AddScootyModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={(newScooty) => {
          setScooties([...scooties, { ...newScooty, id: Date.now(), totalBookings: 0, earnings: 0 }]);
          setShowAddModal(false);
        }}
      />

      {showChatModal && selectedBooking && (
        <ChatModal
          isOpen={showChatModal}
          onClose={() => setShowChatModal(false)}
          bookingDetails={selectedBooking}
          currentUserType="owner"
          currentUserName="Owner Name"
        />
      )}
    </div>
  );
}