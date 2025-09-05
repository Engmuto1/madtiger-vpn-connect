import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Power, Shield, ShieldCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ConnectionState = "disconnected" | "connecting" | "connected";

interface ConnectionStatusProps {
  state: ConnectionState;
  onConnect: () => void;
  selectedServer: string;
}

export const ConnectionStatus = ({ state, onConnect, selectedServer }: ConnectionStatusProps) => {
  const getStatusColor = () => {
    switch (state) {
      case "connected":
        return "text-success";
      case "connecting":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusText = () => {
    switch (state) {
      case "connected":
        return "Connected";
      case "connecting":
        return "Connecting...";
      default:
        return "Disconnected";
    }
  };

  const getStatusIcon = () => {
    switch (state) {
      case "connected":
        return <ShieldCheck className="w-12 h-12 text-success" />;
      case "connecting":
        return <Loader2 className="w-12 h-12 text-warning animate-spin" />;
      default:
        return <Shield className="w-12 h-12 text-muted-foreground" />;
    }
  };

  return (
    <Card className="p-8 shadow-card border-border/50 text-center">
      <div className="space-y-6">
        {/* Status Icon with Pulse Effect */}
        <div className="relative flex justify-center">
          <div className={cn(
            "relative",
            state === "connected" && "glow-success"
          )}>
            {getStatusIcon()}
            {state === "connected" && (
              <div className="absolute inset-0 rounded-full border-2 border-success/30 pulse-ring" />
            )}
          </div>
        </div>

        {/* Status Text */}
        <div>
          <h2 className={cn("text-3xl font-bold mb-2", getStatusColor())}>
            {getStatusText()}
          </h2>
          <p className="text-muted-foreground">
            {state === "connected" 
              ? `Secured via ${selectedServer}` 
              : "Your connection is not protected"
            }
          </p>
        </div>

        {/* Connect Button */}
        <Button
          onClick={onConnect}
          disabled={state === "connecting"}
          size="lg"
          className={cn(
            "w-full max-w-xs mx-auto h-12 transition-smooth",
            state === "connected" 
              ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" 
              : "gradient-primary hover:opacity-90 glow-primary"
          )}
        >
          <Power className="w-5 h-5 mr-2" />
          {state === "connecting" 
            ? "Connecting..." 
            : state === "connected" 
              ? "Disconnect" 
              : "Connect"
          }
        </Button>

        {/* Connection Time */}
        {state === "connected" && (
          <div className="text-sm text-muted-foreground">
            Connected for 2h 34m
          </div>
        )}
      </div>
    </Card>
  );
};