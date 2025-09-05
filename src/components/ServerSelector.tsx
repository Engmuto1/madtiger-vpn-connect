import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Wifi, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Server {
  id: string;
  name: string;
  country: string;
  flag: string;
  latency: string;
  load: number;
  premium?: boolean;
}

const servers: Server[] = [
  { id: "us-east", name: "US East", country: "New York", flag: "🇺🇸", latency: "12ms", load: 23 },
  { id: "us-west", name: "US West", country: "Los Angeles", flag: "🇺🇸", latency: "8ms", load: 45 },
  { id: "uk", name: "UK", country: "London", flag: "🇬🇧", latency: "34ms", load: 67 },
  { id: "de", name: "Germany", country: "Frankfurt", flag: "🇩🇪", latency: "28ms", load: 34 },
  { id: "jp", name: "Japan", country: "Tokyo", flag: "🇯🇵", latency: "156ms", load: 12 },
  { id: "sg", name: "Singapore", country: "Singapore", flag: "🇸🇬", latency: "178ms", load: 56, premium: true },
];

interface ServerSelectorProps {
  selectedServer: string;
  onSelectServer: (server: string) => void;
  disabled?: boolean;
}

export const ServerSelector = ({ selectedServer, onSelectServer, disabled }: ServerSelectorProps) => {
  const getLoadColor = (load: number) => {
    if (load < 30) return "text-success";
    if (load < 70) return "text-warning";
    return "text-destructive";
  };

  const getLoadBg = (load: number) => {
    if (load < 30) return "bg-success/20";
    if (load < 70) return "bg-warning/20";
    return "bg-destructive/20";
  };

  return (
    <Card className="p-6 shadow-card border-border/50">
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Server Locations</h3>
      </div>
      
      <div className="space-y-2">
        {servers.map((server) => (
          <Button
            key={server.id}
            variant={selectedServer === server.name ? "default" : "ghost"}
            onClick={() => onSelectServer(server.name)}
            disabled={disabled}
            className={cn(
              "w-full justify-start p-3 h-auto transition-smooth",
              selectedServer === server.name && "glow-primary"
            )}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <span className="text-lg">{server.flag}</span>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{server.name}</span>
                    {server.premium && (
                      <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                        Pro
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{server.country}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <Wifi className="w-3 h-3" />
                  <span>{server.latency}</span>
                </div>
                <div className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded",
                  getLoadBg(server.load)
                )}>
                  <Zap className={cn("w-3 h-3", getLoadColor(server.load))} />
                  <span className={getLoadColor(server.load)}>{server.load}%</span>
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="text-xs text-muted-foreground">
          <div className="flex items-center justify-between mb-1">
            <span>Fastest server:</span>
            <span className="text-success">US West (8ms)</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Recommended:</span>
            <span className="text-primary">Auto-Select</span>
          </div>
        </div>
      </div>
    </Card>
  );
};