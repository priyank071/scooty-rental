import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell } from "lucide-react";

interface Notification {
  id: number;
  type: "booking" | "message" | "document";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  userDetails?: {
    name: string;
    email: string;
    phone: string;
  };
  scootyModel?: string;
  bookingId?: number;
}

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onStartChat: (bookingId: number) => void;
}

export function NotificationPanel({ notifications, onMarkAsRead, onStartChat }: NotificationPanelProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] bg-gradient-card">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            Stay updated with your scooty bookings and messages
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <Card key={notification.id} className={`${notification.read ? "opacity-70" : "border-primary"} bg-background/50`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-sm font-medium">{notification.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        {notification.userDetails && (
                          <div className="mt-2 space-y-1">
                            <p className="text-xs text-muted-foreground">
                              <strong>User:</strong> {notification.userDetails.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <strong>Contact:</strong> {notification.userDetails.email} | {notification.userDetails.phone}
                            </p>
                            {notification.scootyModel && (
                              <p className="text-xs text-muted-foreground">
                                <strong>Scooty:</strong> {notification.scootyModel}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                        {!notification.read && (
                          <Badge variant="destructive" className="h-2 w-2 p-0 rounded-full" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex gap-2">
                      {!notification.read && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onMarkAsRead(notification.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                      {notification.bookingId && (
                        <Button 
                          size="sm" 
                          variant="gradient"
                          onClick={() => onStartChat(notification.bookingId)}
                        >
                          Start Chat
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}