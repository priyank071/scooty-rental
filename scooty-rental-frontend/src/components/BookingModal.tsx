import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  scooty: any;
}

export function BookingModal({ isOpen, onClose, scooty }: BookingModalProps) {
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(2);

  if (!scooty) return null;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking creation and notification to owner
    alert("Booking confirmed! Owner has been notified via SMS and will contact you for license verification.");
    
    // In a real app, this would trigger:
    // 1. SMS notification to owner
    // 2. Create notification in owner's panel
    // 3. Set up chat channel between user and owner
    
    onClose();
  };

  const totalAmount = duration * scooty.hourlyRate;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-card">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🛴</span>
          </div>
          <DialogTitle className="text-2xl">Book {scooty.model}</DialogTitle>
          <DialogDescription>
            Complete your booking details
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleBooking} className="space-y-6">
          {/* Scooty Details */}
          <Card className="bg-background/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{scooty.model}</h3>
                  <p className="text-sm text-muted-foreground">📍 {scooty.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{scooty.hourlyRate}/hour</p>
                  <p className="text-sm text-muted-foreground">{scooty.distance}km away</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (hours)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              max="24"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              required
            />
          </div>

          {/* Price Summary */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Hourly Rate</span>
                  <span>₹{scooty.hourlyRate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Duration</span>
                  <span>{duration} hours</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1">
              Confirm Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}