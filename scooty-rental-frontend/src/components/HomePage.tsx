import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserDashboard } from "./UserDashboard";
import { OwnerDashboard } from "./OwnerDashboard";
import { AdminDashboard } from "./AdminDashboard";
import { AuthModal } from "./AuthModal";

type UserRole = "user" | "owner" | "admin" | null;

export function HomePage() {
  const [currentRole, setCurrentRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role);
    setShowAuth(true);
  };

  const handleAuth = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
  };

  if (isAuthenticated && currentRole) {
    switch (currentRole) {
      case "user":
        return <UserDashboard onLogout={() => { setIsAuthenticated(false); setCurrentRole(null); }} />;
      case "owner":
        return <OwnerDashboard onLogout={() => { setIsAuthenticated(false); setCurrentRole(null); }} />;
      case "admin":
        return <AdminDashboard onLogout={() => { setIsAuthenticated(false); setCurrentRole(null); }} />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent animate-float">
              ScootyRentals
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Your Urban Mobility Solution
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card 
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-glow bg-gradient-card border-2 border-transparent hover:border-primary/20"
              onClick={() => handleRoleSelect("user")}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
                  <span className="text-2xl">🛴</span>
                </div>
                <CardTitle className="text-2xl text-primary">I'm a User</CardTitle>
                <CardDescription className="text-base">
                  Find and rent scooties near you
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li>• Discover nearby scooties</li>
                  <li>• Real-time availability</li>
                  <li>• Easy booking & payment</li>
                  <li>• Track your rides</li>
                </ul>
                <Button variant="hero" className="w-full">
                  Start Riding
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-glow bg-gradient-card border-2 border-transparent hover:border-secondary/20"
              onClick={() => handleRoleSelect("owner")}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
                  <span className="text-2xl">🏪</span>
                </div>
                <CardTitle className="text-2xl text-secondary">I'm an Owner</CardTitle>
                <CardDescription className="text-base">
                  List and manage your scooty fleet
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li>• List your scooties</li>
                  <li>• Manage bookings</li>
                  <li>• Track earnings</li>
                  <li>• Real-time fleet status</li>
                </ul>
                <Button variant="secondary" className="w-full">
                  Start Earning
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-glow bg-gradient-card border-2 border-transparent hover:border-accent/20"
              onClick={() => handleRoleSelect("admin")}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
                  <span className="text-2xl">⚙️</span>
                </div>
                <CardTitle className="text-2xl text-primary">I'm an Admin</CardTitle>
                <CardDescription className="text-base">
                  Manage platform operations
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li>• Approve new owners</li>
                  <li>• Monitor platform metrics</li>
                  <li>• Manage users & owners</li>
                  <li>• View analytics</li>
                </ul>
                <Button variant="default" className="w-full">
                  Access Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Why Choose ScootyRentals?</h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">⚡</span>
                </div>
                <h3 className="font-semibold mb-2">Instant Access</h3>
                <p className="text-sm text-muted-foreground">Find and book scooties in seconds</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">📍</span>
                </div>
                <h3 className="font-semibold mb-2">Live Tracking</h3>
                <p className="text-sm text-muted-foreground">Real-time location and availability</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">💰</span>
                </div>
                <h3 className="font-semibold mb-2">Best Prices</h3>
                <p className="text-sm text-muted-foreground">Competitive rates for everyone</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🔒</span>
                </div>
                <h3 className="font-semibold mb-2">Safe & Secure</h3>
                <p className="text-sm text-muted-foreground">Verified owners and secure payments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onAuth={handleAuth}
        mode={authMode}
        onModeChange={setAuthMode}
        role={currentRole}
      />
    </div>
  );
}