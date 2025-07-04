import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth: () => void;
  mode: "login" | "register";
  onModeChange: (mode: "login" | "register") => void;
  role: "user" | "owner" | "admin" | null;
}

export function AuthModal({ isOpen, onClose, onAuth, mode, onModeChange, role }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    onAuth();
  };

  const getRoleTitle = () => {
    switch (role) {
      case "user": return "User";
      case "owner": return "Scooty Owner";
      case "admin": return "Admin";
      default: return "";
    }
  };

  const getRoleIcon = () => {
    switch (role) {
      case "user": return "🛴";
      case "owner": return "🏪";
      case "admin": return "⚙️";
      default: return "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-card">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">{getRoleIcon()}</span>
          </div>
          <DialogTitle className="text-2xl">
            {mode === "login" ? "Welcome Back" : "Join Us"}
          </DialogTitle>
          <DialogDescription>
            {mode === "login" ? `Sign in to your ${getRoleTitle()} account` : `Create your ${getRoleTitle()} account`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" variant="gradient" className="w-full" size="lg">
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => onModeChange(mode === "login" ? "register" : "login")}
              className="text-sm text-primary hover:underline"
            >
              {mode === "login" 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}