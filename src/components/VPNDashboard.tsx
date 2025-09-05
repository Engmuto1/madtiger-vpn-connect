import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Power, Globe, Wifi, Lock, Zap } from "lucide-react";
import { ConnectionStatus } from "./ConnectionStatus";
import { ServerSelector } from "./ServerSelector";

type ConnectionState = "disconnected" | "connecting" | "connected";

export const VPNDashboard = () => {
  const [connectionState, setConnectionState] = useState<ConnectionState>("disconnected");
  const [selectedServer, setSelectedServer] = useState("US East");

  const handleConnect = () => {
    if (connectionState === "disconnected") {
      setConnectionState("connecting");
      setTimeout(() => setConnectionState("connected"), 2000);
    } else {
      setConnectionState("disconnected");
    }
  };

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl gradient-primary">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">MADTIGER</h1>
                <p className="text-xs text-muted-foreground">VPN Protection</p>
              </div>
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary">
              Premium
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Connection Panel */}
          <div className="lg:col-span-2 space-y-6">
            <ConnectionStatus 
              state={connectionState}
              onConnect={handleConnect}
              selectedServer={selectedServer}
            />
            
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 shadow-card border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Wifi className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Speed</p>
                    <p className="font-semibold">
                      {connectionState === "connected" ? "95.2 Mbps" : "-- Mbps"}
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 shadow-card border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Encryption</p>
                    <p className="font-semibold">AES-256</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 shadow-card border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <Zap className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Protocol</p>
                    <p className="font-semibold">WireGuard</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Features */}
            <Card className="p-6 shadow-card border-border/50">
              <h3 className="text-lg font-semibold mb-4">Active Protection</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Kill Switch</span>
                  <Badge variant={connectionState === "connected" ? "default" : "secondary"}>
                    {connectionState === "connected" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">DNS Leak Protection</span>
                  <Badge variant={connectionState === "connected" ? "default" : "secondary"}>
                    {connectionState === "connected" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-Connect</span>
                  <Badge variant="outline">Enabled</Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ServerSelector 
              selectedServer={selectedServer}
              onSelectServer={setSelectedServer}
              disabled={connectionState === "connecting"}
            />
            
            <Card className="p-6 shadow-card border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Your IP Address</h3>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Current IP:</div>
                <div className="font-mono text-sm bg-muted/50 p-2 rounded">
                  {connectionState === "connected" ? "198.51.100.42" : "192.168.1.105"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {connectionState === "connected" 
                    ? `Location: ${selectedServer}` 
                    : "Location: Your ISP"
                  }
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};