"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bike, MapPin, Search, Filter, Battery, Wrench, CheckCircle2, TrendingUp, Clock, Eye, Settings } from "lucide-react";
import Image from "next/image";
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
  battery?: number;
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
  const [statusFilter, setStatusFilter] = useState<string>("all-status");
  const [typeFilter, setTypeFilter] = useState<string>("all-types");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Read search query from URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, []);

  const fetchBikes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "all-status") params.append("status", statusFilter);
      if (typeFilter !== "all-types") params.append("type", typeFilter);
      if (searchTerm) params.append("search", searchTerm);

      const res = await fetch(`/api/bike_all?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch bikes");
      const data = await res.json();
      if (data.success) {
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
  };

  useEffect(() => {
    fetchBikes();
  }, [statusFilter, typeFilter, searchTerm]);

  if (loading) return <div className="text-center py-10">Loading bikes...</div>;

  return (
    <div className="space-y-6 relative min-h-screen">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Large shape in top-right */}
        <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.02] rotate-12 animate-pulse">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        
        {/* Medium shape in bottom-left */}
        <div className="absolute bottom-20 left-10 w-60 h-60 opacity-[0.03] -rotate-45 animate-pulse delay-1000">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        
        {/* Small shape in center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-[0.015] rotate-90 animate-pulse delay-2000">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        
        {/* Additional decorative shapes */}
        <div className="absolute top-32 left-1/4 w-32 h-32 opacity-[0.02] rotate-180 animate-pulse delay-500">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        
        <div className="absolute bottom-40 right-1/4 w-48 h-48 opacity-[0.025] -rotate-12 animate-pulse delay-1500">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/50 to-background/20" />
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 rounded-2xl p-8 border backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Bike Fleet Management
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Monitor and manage your entire bike inventory
            </p>
          </div>
          <AddBikeDialog />
        </div>
        
        {/* Additional background shapes in header */}
        <div className="absolute top-2 left-2 w-20 h-20 opacity-5 rotate-45">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-2 right-2 w-16 h-16 opacity-5 -rotate-12">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          {
            title: "Total Bikes",
            value: bikes.length,
            subtitle: "Fleet size",
            icon: Bike,
            bg: "bg-gradient-to-br from-blue-100 to-blue-50",
            iconBg: "bg-blue-500",
            textColor: "text-blue-700",
            valueColor: "text-blue-800"
          },
          {
            title: "Available", 
            value: bikes.filter(b => b.CurrentStatus.toLowerCase() === 'available').length,
            subtitle: "Ready to rent",
            icon: CheckCircle2,
            bg: "bg-gradient-to-br from-green-100 to-green-50",
            iconBg: "bg-green-500",
            textColor: "text-green-700", 
            valueColor: "text-green-800"
          },
          {
            title: "In Use",
            value: bikes.filter(b => b.CurrentStatus.toLowerCase() === 'rented').length,
            subtitle: "Currently rented",
            icon: TrendingUp,
            bg: "bg-gradient-to-br from-orange-100 to-orange-50",
            iconBg: "bg-orange-500",
            textColor: "text-orange-700",
            valueColor: "text-orange-800"
          },
          {
            title: "Maintenance",
            value: bikes.filter(b => b.CurrentStatus.toLowerCase() === 'maintenance').length,
            subtitle: "Need service", 
            icon: Wrench,
            bg: "bg-gradient-to-br from-red-100 to-red-50",
            iconBg: "bg-red-500",
            textColor: "text-red-700",
            valueColor: "text-red-800"
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className={`${stat.bg} border-0 hover:shadow-lg transition-all duration-300 overflow-hidden relative rounded-2xl`}>
              {/* Dot Pattern Background */}
              <div className="absolute inset-0 opacity-20">
                <div className={`absolute inset-0 ${stat.textColor}`}>
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`dots-bikes-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1" fill="currentColor"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#dots-bikes-${index})`}/>
                  </svg>
                </div>
              </div>
              
              {/* Shape Pattern */}
              <div className="absolute top-4 right-4 w-16 h-16 opacity-10">
                <Image 
                  src="/assets/background/shape-square.svg" 
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              
              <CardContent className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h3 className={`text-sm font-medium ${stat.textColor}`}>
                    {stat.title}
                  </h3>
                  <div className={`text-3xl font-bold ${stat.valueColor}`}>
                    {stat.value}
                  </div>
                  <p className={`text-xs ${stat.textColor} opacity-80`}>
                    {stat.subtitle}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enhanced Filters with Material UI Style Search */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 rotate-45">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <CardHeader className="relative z-10">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Material UI Styled Search Bar */}
            <div className="flex-1 relative group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-background/80 backdrop-blur-sm rounded-xl border-2 border-muted/50 hover:border-primary/30 focus-within:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="flex items-center px-4 py-3">
                    <Search className="h-5 w-5 text-muted-foreground mr-3 transition-colors duration-300 group-focus-within:text-primary" />
                    <Input
                      placeholder="Search bikes by ID, model, or location..."
                      className="border-0 bg-transparent text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  {/* Material UI Bottom Border Animation */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-blue-500 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
                </div>
              </div>
              {/* Material UI Helper Text */}
              <div className="mt-2 px-1">
                <p className="text-xs text-muted-foreground">
                  {searchTerm && bikes.length > 0 
                    ? `Found ${bikes.length} bikes matching "${searchTerm}"`
                    : "Type to search across all bike details"
                  }
                </p>
              </div>
            </div>
            
            {/* Enhanced Filter Selects */}
            <div className="flex gap-3">
              <div className="relative group">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] h-12 bg-background/80 backdrop-blur-sm border-2 border-muted/50 hover:border-primary/30 focus:border-primary/50 transition-all duration-300 shadow-md hover:shadow-lg">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2 text-primary" />
                      <SelectValue placeholder="Filter Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="backdrop-blur-sm bg-background/95">
                    <SelectItem value="all-status">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="relative group">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] h-12 bg-background/80 backdrop-blur-sm border-2 border-muted/50 hover:border-primary/30 focus:border-primary/50 transition-all duration-300 shadow-md hover:shadow-lg">
                    <div className="flex items-center">
                      <Bike className="h-4 w-4 mr-2 text-primary" />
                      <SelectValue placeholder="Filter Type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="backdrop-blur-sm bg-background/95">
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
          </div>
        </CardHeader>
      </Card>

      {/* Enhanced Bikes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {bikes.map((bike) => {
          const statusConfig = getStatusConfig(bike.CurrentStatus);
          const StatusIcon = statusConfig.icon;
          const typeIcon = getBikeTypeIcon(bike.BikeType);

          return (
            <Card key={bike.BikeID} className="hover:shadow-xl hover:scale-105 transition-all duration-300 group border-0 bg-gradient-to-br from-card to-card/50 relative overflow-hidden rounded-2xl">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-5 rotate-12">
                <Image 
                  src="/assets/background/shape-square.svg" 
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Bike Image */}
              <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gradient-to-br from-muted/50 to-muted/20">
                <Image
                  src={bike.bike_image || "/bike.jpg"}
                  alt={bike.Model}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Status Badge Overlay */}
                <div className="absolute top-3 left-3">
                  <Badge variant={statusConfig.variant} className={`gap-1.5 shadow-lg backdrop-blur-sm ${statusConfig.bgColor} ${statusConfig.textColor} border-0`}>
                    <StatusIcon className="h-3 w-3" />
                    {statusConfig.label}
                  </Badge>
                </div>
                
                {/* Type Icon Overlay */}
                <div className="absolute top-3 right-3 h-10 w-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-xl shadow-lg">
                  {typeIcon}
                </div>
              </div>

              <CardContent className="p-6 space-y-4 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {bike.BikeSerialNumber}
                    </p>
                    <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                      {bike.BikeType}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg">{bike.Model}</h3>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-2 rounded-lg">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="font-medium truncate">{bike.location_name}</p>
                    <p className="text-xs truncate">{bike.location_city}</p>
                  </div>
                </div>

                {bike.battery && (
                  <div className="space-y-3 bg-muted/20 p-3 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Battery className="h-4 w-4 text-primary" />
                        Battery Level
                      </span>
                      <span className="font-bold text-primary">{bike.battery}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                      <div className={`h-full rounded-full transition-all duration-1000 ${
                        bike.battery >= 90 ? "w-full" :
                        bike.battery >= 80 ? "w-[90%]" :
                        bike.battery >= 70 ? "w-[80%]" :
                        bike.battery >= 60 ? "w-[70%]" :
                        bike.battery >= 50 ? "w-3/5" :
                        bike.battery >= 40 ? "w-2/5" :
                        bike.battery >= 30 ? "w-[30%]" :
                        bike.battery >= 20 ? "w-1/5" : "w-[10%]"
                      } ${
                        bike.battery > 70 
                          ? 'bg-gradient-to-r from-green-500 to-green-600' 
                          : bike.battery > 30 
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                          : 'bg-gradient-to-r from-red-500 to-red-600'
                      }`} />
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    variant={bike.CurrentStatus.toLowerCase() === "available" ? "default" : "outline"} 
                    className="flex-1 font-semibold"
                    size="sm"
                  >
                    {bike.CurrentStatus.toLowerCase() === "available" ? "Rent Out" : "View Details"}
                  </Button>
                  <Button variant="ghost" size="sm" className="px-3 hover:bg-primary/20">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>

                {/* Revenue Info */}
                <div className="text-center pt-2 border-t border-muted/50">
                  <p className="text-xs text-muted-foreground">
                    Rate: <span className="font-semibold text-primary">${bike.RentalRatePerMinute}/min</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {bikes.length === 0 && (
        <Card className="border-0 bg-gradient-to-br from-muted/20 to-muted/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <Image 
              src="/assets/background/shape-square.svg" 
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center relative z-10">
            <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
              <Bike className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No bikes found</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {searchTerm || statusFilter !== "all-status" || typeFilter !== "all-types"
                ? "Try adjusting your search criteria or filters to find bikes."
                : "Start building your fleet by adding your first bike."
              }
            </p>
            <div className="flex gap-3">
              {(searchTerm || statusFilter !== "all-status" || typeFilter !== "all-types") && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all-status");
                    setTypeFilter("all-types");
                  }}
                >
                  Clear Filters
                </Button>
              )}
              <AddBikeDialog />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
