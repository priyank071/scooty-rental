import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScootyCardProps {
  scooty: {
    id: number;
    model: string;
    image: string;
    hourlyRate: number;
    distance: number;
    fuelType: string;
    available: boolean;
    rating: number;
    location: string;
  };
  onBook: () => void;
}

export function ScootyCard({ scooty, onBook }: ScootyCardProps) {
  return (
    <Card className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-glow bg-gradient-card">
      <CardHeader className="pb-4">
        <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
          <span className="text-4xl">🛴</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{scooty.model}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              📍 {scooty.location} • {scooty.distance}km away
            </CardDescription>
          </div>
          <Badge variant={scooty.available ? "success" : "secondary" as any}>
            {scooty.available ? "Available" : "Busy"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Fuel Type</span>
            <span>{scooty.fuelType}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Rating</span>
            <span>⭐ {scooty.rating}</span>
          </div>
          <div className="flex items-center justify-between font-semibold">
            <span>₹{scooty.hourlyRate}/hour</span>
          </div>
          <Button 
            variant={scooty.available ? "gradient" : "outline"}
            className="w-full"
            onClick={onBook}
            disabled={!scooty.available}
          >
            {scooty.available ? "Book Now" : "Not Available"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}