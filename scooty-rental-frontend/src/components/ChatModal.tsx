import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileImage, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  senderId: string;
  senderName: string;
  senderType: "user" | "owner";
  content: string;
  timestamp: string;
  type: "text" | "image" | "document";
  fileName?: string;
  fileUrl?: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    id: number;
    userEmail: string;
    scootyModel: string;
    ownerName: string;
  };
  currentUserType: "user" | "owner";
  currentUserName: string;
}

export function ChatModal({ isOpen, onClose, bookingDetails, currentUserType, currentUserName }: ChatModalProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      senderId: "system",
      senderName: "System",
      senderType: "owner",
      content: "Chat started for license verification. Please upload your driving license and other required documents.",
      timestamp: new Date().toLocaleTimeString(),
      type: "text"
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      senderId: currentUserType === "user" ? "user123" : "owner456",
      senderName: currentUserName,
      senderType: currentUserType,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      type: "text"
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload only JPG, PNG, or PDF files.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload files smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    // Create file message
    const message: Message = {
      id: Date.now(),
      senderId: currentUserType === "user" ? "user123" : "owner456",
      senderName: currentUserName,
      senderType: currentUserType,
      content: `Uploaded ${file.name}`,
      timestamp: new Date().toLocaleTimeString(),
      type: file.type.startsWith('image/') ? "image" : "document",
      fileName: file.name,
      fileUrl: URL.createObjectURL(file)
    };

    setMessages(prev => [...prev, message]);
    
    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded successfully.`,
    });

    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] bg-gradient-card">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <DialogTitle>License Verification Chat</DialogTitle>
              <DialogDescription>
                Booking #{bookingDetails.id} - {bookingDetails.scootyModel}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Chat Area */}
        <div className="flex flex-col h-[500px]">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4 bg-background/30 rounded-lg">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderType === currentUserType ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderType === currentUserType
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium">{message.senderName}</span>
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        {message.senderType}
                      </Badge>
                    </div>
                    
                    {message.type === "text" && (
                      <p className="text-sm">{message.content}</p>
                    )}
                    
                    {message.type === "image" && (
                      <div className="space-y-2">
                        <p className="text-sm">{message.content}</p>
                        {message.fileUrl && (
                          <img 
                            src={message.fileUrl} 
                            alt={message.fileName}
                            className="max-w-full h-auto rounded border"
                          />
                        )}
                      </div>
                    )}
                    
                    {message.type === "document" && (
                      <div className="space-y-2">
                        <p className="text-sm">{message.content}</p>
                        <Card className="bg-background/20">
                          <CardContent className="p-2 flex items-center gap-2">
                            <FileImage className="h-4 w-4" />
                            <span className="text-xs">{message.fileName}</span>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                    
                    <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="mt-4 space-y-3">
            {/* File Upload */}
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <FileImage className="h-4 w-4" />
                Upload Document
              </Button>
              <span className="text-xs text-muted-foreground">
                Upload driving license, ID, or other documents (JPG, PNG, PDF - Max 5MB)
              </span>
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" variant="gradient">
                Send
              </Button>
            </form>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close Chat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}