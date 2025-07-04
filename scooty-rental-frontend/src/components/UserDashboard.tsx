import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScootyCard } from "./ScootyCard";
import { BookingModal } from "./BookingModal";
import { ChatModal } from "./ChatModal";

interface UserDashboardProps {
  onLogout: () => void;
}

export function UserDashboard({ onLogout }: UserDashboardProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScooty, setSelectedScooty] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Mock data for scooties
  const scooties = [
    {
      id: 1,
      model: "Honda Activa 6G",
      image: "/placeholder.svg",
      hourlyRate: 80,
      distance: 0.5,
      fuelType: "Petrol",
      available: true,
      rating: 4.5,
      location: "MG Road"
    },
    {
      id: 2,
      model: "TVS Jupiter",
      image: "/placeholder.svg",
      hourlyRate: 75,
      distance: 0.8,
      fuelType: "Petrol",
      available: true,
      rating: 4.3,
      location: "Brigade Road"
    },
    {
      id: 3,
      model: "Hero Destini 125",
      image: "/placeholder.svg",
      hourlyRate: 70,
      distance: 1.2,
      fuelType: "Petrol",
      available: false,
      rating: 4.1,
      location: "Koramangala"
    }
  ];

  const bookings = [
    {
      id: 1,
      scootyModel: "Honda Activa 6G",
      startTime: "2024-01-15 10:00",
      endTime: "2024-01-15 14:00",
      status: "completed",
      amount: 320,
      needsLicenseVerification: false
    },
    {
      id: 2,
      scootyModel: "TVS Jupiter",
      startTime: "2024-01-16 09:00",
      endTime: "2024-01-16 12:00",
      status: "ongoing",
      amount: 225,
      needsLicenseVerification: true
    }
  ];

  const handleStartChat = (bookingId: number) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setSelectedBooking({
        id: booking.id,
        userEmail: "user@example.com",
        scootyModel: booking.scootyModel,
        ownerName: "Owner Name"
      });
      setShowChatModal(true);
    }
  };

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("Location access denied:", error);
        }
      );
    }
  }, []);

  const handleBookScooty = (scooty: any) => {
    setSelectedScooty(scooty);
    setShowBookingModal(true);
  };

  const filteredScooties = scooties.filter(scooty =>
    scooty.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scooty.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success";
      case "ongoing": return "warning";
      case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-card shadow-soft border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ScootyRentals
              </h1>
              {location && (
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  📍 Location Detected
                </Badge>
              )}
            </div>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="discover" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-96">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            {/* Search and Filters */}
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🔍 Find Scooties Near You
                </CardTitle>
                <CardDescription>
                  Discover available scooties in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    placeholder="Search by model or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="secondary">
                    Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Scooties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScooties.map((scooty) => (
                <ScootyCard
                  key={scooty.id}
                  scooty={scooty}
                  onBook={() => handleBookScooty(scooty)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>Track your current and past rides</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg bg-background">
                      <div className="flex-1">
                        <h3 className="font-semibold">{booking.scootyModel}</h3>
                        <p className="text-sm text-muted-foreground">
                          {booking.startTime} - {booking.endTime}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusColor(booking.status) as any}>
                            {booking.status.toUpperCase()}
                          </Badge>
                          {booking.needsLicenseVerification && (
                            <Badge variant="outline" className="text-orange-600 border-orange-600">
                              License Required
                            </Badge>
                          )}
                        </div>
                        <span className="font-semibold">₹{booking.amount}</span>
                        {booking.needsLicenseVerification && (
                          <Button 
                            size="sm" 
                            variant="gradient"
                            onClick={() => handleStartChat(booking.id)}
                          >
                            Chat with Owner
                          </Button>
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

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        scooty={selectedScooty}
      />

      {showChatModal && selectedBooking && (
        <ChatModal
          isOpen={showChatModal}
          onClose={() => setShowChatModal(false)}
          bookingDetails={selectedBooking}
          currentUserType="user"
          currentUserName="User Name"
        />
      )}
    </div>
  );
}