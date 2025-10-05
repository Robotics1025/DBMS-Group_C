"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bike, MapPin, Search, Filter, Battery, Wrench, CheckCircle2 } from "lucide-react";
import { AddBikeDialog } from "@/components/AddBikeDialog";

interface BikeType {
  BikeID: number | string;
  BikeSerialNumber: string;
  Model: string;
  BikeType: string;
  CurrentStatus: string;
  LastMaintenanceDate: string | null;
  RentalRatePerMinute: number;
  LocationID: number;
  bike_image: string;
  location_name: string;
  location_address: string;
  location_city: string;
  location_phone: string;
  battery?: number; // optional, default to 100
}

const getStatusConfig = (status: string) => {
  switch (status.toLowerCase()) {
    case "available":
      return { variant: "default" as const, icon: CheckCircle2, label: "Available", bgColor: "bg-success/10", textColor: "text-success" };
    case "rented":
      return { variant: "secondary" as const, icon: Bike, label: "Rented", bgColor: "bg-primary/10", textColor: "text-primary" };
    case "maintenance":
      return { variant: "destructive" as const, icon: Wrench, label: "Maintenance", bgColor: "bg-destructive/10", textColor: "text-destructive" };
    default:
      return { variant: "outline" as const, icon: Bike, label: status, bgColor: "bg-muted", textColor: "text-muted-foreground" };
  }
};

const getBikeTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "mountain": return "🏔️";
    case "city": return "🏙️";
    case "electric": return "⚡";
    case "road": return "🏁";
    case "hybrid": return "🔄";
    default: return "🚲";
  }
};

export default function Bikes() {
  const [bikes, setBikes] = useState<BikeType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBikes() {
      try {
        const res = await fetch("/api/bike_all");
        if (!res.ok) throw new Error("Failed to fetch bikes");
        const data = await res.json();
        if (data.success) {
          // Default battery to 100 if missing
          const bikesWithBattery = data.bikes.map((b: BikeType) => ({ ...b, battery: b.battery ?? 100 }));
          setBikes(bikesWithBattery);
        } else {
          console.error("API Error:", data.error);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBikes();
  }, []);

  if (loading) return <div className="text-center py-10">Loading bikes...</div>;

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
            <div className="text-3xl font-bold text-success">
              {bikes.filter(b => b.CurrentStatus.toLowerCase() === "available").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Ready to rent</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rented</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {bikes.filter(b => b.CurrentStatus.toLowerCase() === "rented").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Currently in use</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">
              {bikes.filter(b => b.CurrentStatus.toLowerCase() === "maintenance").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Under service</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-accent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Fleet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{bikes.length}</div>
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
          const statusConfig = getStatusConfig(bike.CurrentStatus);
          const StatusIcon = statusConfig.icon;
          const typeIcon = getBikeTypeIcon(bike.BikeType);

          return (
            <Card 
              key={bike.BikeID} 
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
                      <p className="text-xs text-muted-foreground">{bike.BikeSerialNumber}</p>
                      <h3 className="font-semibold text-base mt-1">{bike.Model}</h3>
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
                  <span className="text-sm font-medium text-muted-foreground">{bike.BikeType}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{bike.location_name}</span>
                </div>

                {bike.battery && (
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
                        className={`h-full rounded-full transition-all ${bike.battery > 70 ? 'bg-success' : bike.battery > 30 ? 'bg-warning' : 'bg-destructive'}`}
                        style={{ width: `${bike.battery}%` }}
                      />
                    </div>
                  </div>
                )}

                <Button 
                  variant={bike.CurrentStatus.toLowerCase() === "available" ? "default" : "outline"} 
                  className="w-full"
                  size="sm"
                >
                  {bike.CurrentStatus.toLowerCase() === "available" ? "Rent Out" : "View Details"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
