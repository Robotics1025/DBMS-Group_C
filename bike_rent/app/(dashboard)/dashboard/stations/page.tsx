"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Plus, Search, Bike, TrendingUp, Clock, Phone, Navigation, MoreHorizontal, Eye, Settings } from "lucide-react";
import Image from "next/image";
import { AddStationDialog } from "@/components/Stations/add-station-dialog";
import { ViewDetailsDialog } from "@/components/Stations/view-details-dialog";
import { ManageStationDialog } from "@/components/Stations/manage-station-dialog";

interface Station {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  capacity: number;
  available: number;
  rented: number;
  maintenance: number;
  utilization: number;
  todayRentals?: number;
  revenue?: string;
  coordinates?: string;
}

export default function Stations() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddStationOpen, setIsAddStationOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    locationName: "",
    address: "",
    city: "",
    phoneNumber: "",
    capacity: "",
  });

  // Fetch stations from API
  useEffect(() => {
    async function fetchStations() {
      try {
        const res = await fetch("/api/station_bikes"); // <-- updated API
        if (!res.ok) throw new Error("Failed to fetch stations");
        const data = await res.json();
        if (data.success) setStations(data.stations);
        else setError(data.error || "Failed to load stations");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStations();
  }, []);

  // Summary stats
  const totalCapacity = stations.reduce((sum, s) => sum + (s.capacity || 0), 0);
  const totalAvailable = stations.reduce((sum, s) => sum + (s.available || 0), 0);
  const totalRented = stations.reduce((sum, s) => sum + (s.rented || 0), 0);
  const avgUtilization = stations.length
    ? Math.round(stations.reduce((sum, s) => sum + (s.utilization || 0), 0) / stations.length)
    : 0;

  const handleViewDetails = (station: Station) => {
    setSelectedStation(station);
    setIsDetailsOpen(true);
  };

  const handleManageStation = (station: Station) => {
    setSelectedStation(station);
    setFormData({
      locationName: station.name,
      address: station.address,
      city: station.city,
      phoneNumber: station.phone,
      capacity: station.capacity?.toString() || "",
    });
    setIsEditMode(false);
    setIsManageOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsAddStationOpen(false);
    setFormData({ locationName: "", address: "", city: "", phoneNumber: "", capacity: "" });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Station updated:", { id: selectedStation?.id, ...formData });
    setIsManageOpen(false);
    setIsEditMode(false);
  };

  const handleDelete = () => {
    console.log("Station deleted:", selectedStation?.id);
    setIsDeleteDialogOpen(false);
    setIsManageOpen(false);
  };

  if (loading) return <p>Loading stations...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

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
              Station Network
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Manage your bike stations and monitor real-time capacity
            </p>
          </div>
          <Button
            className="gap-2 bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl transition-all"
            onClick={() => setIsAddStationOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add Station
          </Button>
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
            title: "Total Stations",
            value: stations.length,
            subtitle: `${totalCapacity} total capacity`,
            icon: MapPin,
            bg: "bg-gradient-to-br from-blue-100 to-blue-50",
            iconBg: "bg-blue-500",
            textColor: "text-blue-700",
            valueColor: "text-blue-800"
          },
          {
            title: "Available Bikes", 
            value: totalAvailable,
            subtitle: "Ready to rent",
            icon: Bike,
            bg: "bg-gradient-to-br from-green-100 to-green-50",
            iconBg: "bg-green-500",
            textColor: "text-green-700", 
            valueColor: "text-green-800"
          },
          {
            title: "Avg Utilization",
            value: `${avgUtilization}%`,
            subtitle: "Across all stations",
            icon: TrendingUp,
            bg: "bg-gradient-to-br from-orange-100 to-orange-50",
            iconBg: "bg-orange-500",
            textColor: "text-orange-700",
            valueColor: "text-orange-800"
          },
          {
            title: "Active Rentals",
            value: totalRented,
            subtitle: "Currently rented", 
            icon: Clock,
            bg: "bg-gradient-to-br from-purple-100 to-purple-50",
            iconBg: "bg-purple-500",
            textColor: "text-purple-700",
            valueColor: "text-purple-800"
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
                      <pattern id={`dots-stats-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1" fill="currentColor"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#dots-stats-${index})`}/>
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

      {/* Enhanced Search */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 opacity-5 rotate-45">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <CardHeader className="relative z-10">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search stations by name, address, or city..." 
              className="pl-12 h-12 bg-background/50 backdrop-blur-sm border-muted/50 focus:border-primary/50 transition-colors" 
            />
          </div>
        </CardHeader>
      </Card>

      {/* Beautiful Stations Table */}
      <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-0 shadow-lg relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt=""
            fill
            className="object-contain"
          />
        </div>
        
        <CardHeader className="bg-gradient-to-r from-primary/5 to-blue-500/5 border-b relative z-10">
          <CardTitle className="flex items-center gap-2 text-xl">
            <MapPin className="h-6 w-6 text-primary" />
            Station Network Overview
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0 relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Station</th>
                  <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Location</th>
                  <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Contact</th>
                  <th className="text-center p-4 font-semibold text-sm text-muted-foreground">Capacity</th>
                  <th className="text-center p-4 font-semibold text-sm text-muted-foreground">Available</th>
                  <th className="text-center p-4 font-semibold text-sm text-muted-foreground">Utilization</th>
                  <th className="text-center p-4 font-semibold text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stations.map((station, index) => (
                  <tr 
                    key={station.id} 
                    className={`border-b hover:bg-muted/30 transition-colors ${
                      index % 2 === 0 ? 'bg-background/50' : 'bg-muted/10'
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                          <MapPin className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-base">{station.name}</h4>
                          <p className="text-sm text-muted-foreground">{station.city}</p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{station.address}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Navigation className="h-3 w-3" />
                          <span>{station.coordinates || "No coordinates"}</span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{station.phone}</span>
                      </div>
                    </td>
                    
                    <td className="p-4 text-center">
                      <div className="text-lg font-bold">{station.capacity}</div>
                      <div className="text-xs text-muted-foreground">bikes</div>
                    </td>
                    
                    <td className="p-4 text-center">
                      <div className="text-lg font-bold text-green-600">{station.available}</div>
                      <div className="text-xs text-muted-foreground">ready</div>
                    </td>
                    
                    <td className="p-4 text-center">
                      <div className="space-y-2">
                        <Badge 
                          variant={station.utilization > 60 ? "default" : "secondary"}
                          className={`${
                            station.utilization > 80 
                              ? "bg-red-500/20 text-red-700 hover:bg-red-500/30" 
                              : station.utilization > 60 
                              ? "bg-orange-500/20 text-orange-700 hover:bg-orange-500/30"
                              : "bg-green-500/20 text-green-700 hover:bg-green-500/30"
                          }`}
                        >
                          {station.utilization}%
                        </Badge>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              station.utilization > 80 
                                ? "bg-gradient-to-r from-red-500 to-red-600"
                                : station.utilization > 60 
                                ? "bg-gradient-to-r from-orange-500 to-orange-600"
                                : "bg-gradient-to-r from-green-500 to-green-600"
                            } ${
                              station.utilization >= 90 ? "w-full" :
                              station.utilization >= 80 ? "w-[90%]" :
                              station.utilization >= 70 ? "w-[80%]" :
                              station.utilization >= 60 ? "w-[70%]" :
                              station.utilization >= 50 ? "w-[60%]" :
                              station.utilization >= 40 ? "w-1/2" :
                              station.utilization >= 30 ? "w-[40%]" :
                              station.utilization >= 20 ? "w-[30%]" :
                              station.utilization >= 10 ? "w-1/5" : "w-[10%]"
                            }`}
                          />
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleViewDetails(station)}
                          className="h-8 w-8 p-0 hover:bg-primary/20"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleManageStation(station)}
                          className="h-8 w-8 p-0 hover:bg-primary/20"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-primary/20"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {stations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <MapPin className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No stations found</h3>
              <p className="text-muted-foreground mb-4">Start by adding your first bike station</p>
              <Button onClick={() => setIsAddStationOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Station
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <>
        <AddStationDialog open={isAddStationOpen} onOpenChange={setIsAddStationOpen} />
        <ViewDetailsDialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen} station={selectedStation} />
        <ManageStationDialog
          open={isManageOpen}
          onOpenChange={setIsManageOpen}
          station={selectedStation}
          formData={formData}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          onInputChange={handleInputChange}
          onUpdate={handleUpdate}
          isDeleteDialogOpen={isDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          onDelete={handleDelete}
        />
      </>
    </div>
  );
}
