"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Plus, Search, Bike, TrendingUp, Clock, Phone, Navigation } from "lucide-react";
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Station Network
          </h1>
          <p className="text-muted-foreground mt-2">Manage your bike stations and monitor real-time capacity</p>
        </div>
        <Button
          className="gap-2 bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl transition-all"
          onClick={() => setIsAddStationOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Station
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Total Stations */}
        <Card className="border-0 shadow-elevated relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20" />
          <CardHeader className="pb-3 flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Stations</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stations.length}</div>
            <p className="text-xs text-muted-foreground mt-1">{totalCapacity} total capacity</p>
          </CardContent>
        </Card>

        {/* Available Bikes */}
        <Card className="border-0 shadow-elevated relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20" />
          <CardHeader className="pb-3 flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Bikes</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center">
              <Bike className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{totalAvailable}</div>
            <p className="text-xs text-muted-foreground mt-1">Ready to rent</p>
          </CardContent>
        </Card>

        {/* Avg Utilization */}
        <Card className="border-0 shadow-elevated relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-warning/5 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20" />
          <CardHeader className="pb-3 flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Utilization</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">{avgUtilization}%</div>
            <p className="text-xs text-muted-foreground mt-1">Across all stations</p>
          </CardContent>
        </Card>

        {/* Active Rentals */}
        <Card className="border-0 shadow-elevated relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20" />
          <CardHeader className="pb-3 flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Rentals</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{totalRented}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently rented</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-elevated">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search stations by name, address, or city..." className="pl-9 h-11" />
          </div>
        </CardHeader>
      </Card>

      {/* Station Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {stations.map((station) => (
          <Card
            key={station.id}
            className="hover:shadow-elevated transition-all duration-300 group border-0 bg-gradient-to-br from-card to-card/50 relative overflow-hidden"
          >
            <CardHeader className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MapPin className="h-7 w-7 text-white" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg">{station.name}</h3>
                  <p className="text-sm text-muted-foreground">{station.address}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {station.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Navigation className="h-3 w-3" />
                      {station.coordinates || "-"}
                    </span>
                  </div>
                </div>
              </div>

              <Badge variant={station.utilization > 60 ? "default" : "secondary"} className="gap-1">
                {station.utilization}% Used
              </Badge>
            </CardHeader>

            <CardContent className="flex gap-2">
              <Button size="sm" onClick={() => handleViewDetails(station)}>
                View Details
              </Button>
              <Button size="sm" onClick={() => handleManageStation(station)}>
                Manage Station
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialogs */}
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
    </div>
  );
}
