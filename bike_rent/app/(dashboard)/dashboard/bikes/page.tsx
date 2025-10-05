import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bike, MapPin, Search, Filter, Battery, Wrench, CheckCircle2 } from "lucide-react";
import { AddBikeDialog } from "@/components/AddBikeDialog";

const bikes = [
  { id: "B-001", name: "Mountain Pro X1", type: "Mountain", status: "available", location: "Central Park", battery: 100 },
  { id: "B-002", name: "City Cruiser", type: "City", status: "rented", location: "Downtown", battery: 85 },
  { id: "B-003", name: "Electric Swift", type: "Electric", status: "available", location: "Riverside", battery: 92 },
  { id: "B-004", name: "Hybrid Comfort", type: "Hybrid", status: "maintenance", location: "Workshop", battery: 0 },
  { id: "B-005", name: "Road Racer Pro", type: "Road", status: "available", location: "Park Avenue", battery: 100 },
  { id: "B-006", name: "Eco Rider", type: "Electric", status: "rented", location: "Beach Side", battery: 68 },
  { id: "B-007", name: "Urban Explorer", type: "City", status: "available", location: "Central Park", battery: 100 },
  { id: "B-008", name: "Trail Blazer", type: "Mountain", status: "available", location: "North Station", battery: 95 },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "available":
      return { 
        variant: "default" as const, 
        icon: CheckCircle2, 
        label: "Available",
        bgColor: "bg-success/10",
        textColor: "text-success" 
      };
    case "rented":
      return { 
        variant: "secondary" as const, 
        icon: Bike, 
        label: "Rented",
        bgColor: "bg-primary/10",
        textColor: "text-primary" 
      };
    case "maintenance":
      return { 
        variant: "destructive" as const, 
        icon: Wrench, 
        label: "Maintenance",
        bgColor: "bg-destructive/10",
        textColor: "text-destructive" 
      };
    default:
      return { 
        variant: "outline" as const, 
        icon: Bike, 
        label: status,
        bgColor: "bg-muted",
        textColor: "text-muted-foreground" 
      };
  }
};

const getBikeTypeIcon = (type: string) => {
  switch (type) {
    case "Mountain": return "🏔️";
    case "City": return "🏙️";
    case "Electric": return "⚡";
    case "Road": return "🏁";
    case "Hybrid": return "🔄";
    default: return "🚲";
  }
};

export default function Bikes() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Bike Fleet Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage your entire bike inventory
          </p>
        </div>
        <AddBikeDialog />
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">64</div>
            <p className="text-xs text-muted-foreground mt-1">Ready to rent</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rented</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">48</div>
            <p className="text-xs text-muted-foreground mt-1">Currently in use</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">8</div>
            <p className="text-xs text-muted-foreground mt-1">Under service</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-accent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Fleet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">156</div>
            <p className="text-xs text-muted-foreground mt-1">All bikes</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-elevated border-0">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search bikes by ID, name, or location..." className="pl-9 h-11" />
            </div>
            <div className="flex gap-3">
              <Select defaultValue="all-status">
                <SelectTrigger className="w-full sm:w-[160px] h-11">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="rented">Rented</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-types">
                <SelectTrigger className="w-full sm:w-[160px] h-11">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  <SelectItem value="mountain">Mountain</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="city">City</SelectItem>
                  <SelectItem value="road">Road</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Bikes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {bikes.map((bike) => {
          const statusConfig = getStatusConfig(bike.status);
          const StatusIcon = statusConfig.icon;
          const typeIcon = getBikeTypeIcon(bike.type);
          
          return (
            <Card 
              key={bike.id} 
              className="hover:shadow-elevated transition-all duration-300 group border-0 bg-gradient-to-br from-card to-card/50 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transition-opacity group-hover:opacity-10" 
                   style={{ background: 'radial-gradient(circle at center, hsl(var(--primary)), transparent)' }} />
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-xl ${statusConfig.bgColor} flex items-center justify-center text-2xl transition-transform group-hover:scale-110`}>
                      {typeIcon}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{bike.id}</p>
                      <h3 className="font-semibold text-base mt-1">{bike.name}</h3>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={statusConfig.variant} className="gap-1.5">
                    <StatusIcon className="h-3 w-3" />
                    {statusConfig.label}
                  </Badge>
                  <span className="text-sm font-medium text-muted-foreground">{bike.type}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{bike.location}</span>
                </div>

                {bike.battery > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Battery className="h-3 w-3" />
                        Battery
                      </span>
                      <span className="font-medium">{bike.battery}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          bike.battery > 70 ? 'bg-success' : bike.battery > 30 ? 'bg-warning' : 'bg-destructive'
                        }`}
                        style={{ width: `${bike.battery}%` }}
                      />
                    </div>
                  </div>
                )}

                <Button 
                  variant={bike.status === "available" ? "default" : "outline"} 
                  className="w-full"
                  size="sm"
                >
                  {bike.status === "available" ? "Rent Out" : "View Details"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
