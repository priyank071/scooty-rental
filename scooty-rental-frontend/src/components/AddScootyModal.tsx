import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddScootyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (scooty: any) => void;
}

export function AddScootyModal({ isOpen, onClose, onAdd }: AddScootyModalProps) {
  const [model, setModel] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [location, setLocation] = useState("");
  const [fuelType, setFuelType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newScooty = {
      model,
      plateNumber,
      hourlyRate: Number(hourlyRate),
      location,
      fuelType,
      available: true
    };
    onAdd(newScooty);
    // Reset form
    setModel("");
    setPlateNumber("");
    setHourlyRate("");
    setLocation("");
    setFuelType("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-card">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🛴</span>
          </div>
          <DialogTitle className="text-2xl">Add New Scooty</DialogTitle>
          <DialogDescription>
            Add a new scooty to your fleet
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model">Scooty Model</Label>
            <Input
              id="model"
              type="text"
              placeholder="e.g., Honda Activa 6G"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plate">Plate Number</Label>
            <Input
              id="plate"
              type="text"
              placeholder="e.g., KA01AB1234"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate">Hourly Rate (₹)</Label>
            <Input
              id="rate"
              type="number"
              placeholder="e.g., 80"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              placeholder="e.g., MG Road"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuel">Fuel Type</Label>
            <Select value={fuelType} onValueChange={setFuelType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="petrol">Petrol</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
                <SelectItem value="cng">CNG</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1">
              Add Scooty
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}