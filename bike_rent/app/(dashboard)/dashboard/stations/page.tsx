"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Plus,
  Search,
  Bike,
  TrendingUp,
  Users,
  Clock,
  Phone,
  Navigation,
  MapPinned,
  Info,
  Pencil,
  Trash2,
} from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const stations = [
  {
    id: 1,
    name: "Central Park Station",
    address: "123 Park Avenue, Central District",
    city: "New York",
    phone: "+1 (555) 123-4567",
    capacity: 50,
    available: 28,
    rented: 18,
    maintenance: 4,
    utilization: 44,
    todayRentals: 142,
    revenue: "$2,840",
    coordinates: "40.7829° N, 73.9654° W",
    description:
      "Prime location in the heart of Central Park, serving tourists and daily commuters. High foot traffic area with excellent visibility and accessibility. Features covered bike parking and 24/7 security monitoring.",
  },
  {
    id: 2,
    name: "Downtown Hub",
    address: "456 Main Street, Downtown",
    city: "New York",
    phone: "+1 (555) 234-5678",
    capacity: 75,
    available: 45,
    rented: 25,
    maintenance: 5,
    utilization: 40,
    todayRentals: 198,
    revenue: "$3,960",
    coordinates: "40.7580° N, 73.9855° W",
    description:
      "Largest station in the downtown business district. Strategically positioned near major office buildings and public transit hubs. Equipped with electric bike charging stations and real-time availability displays.",
  },
  {
    id: 3,
    name: "Riverside Point",
    address: "789 River Road, Waterfront",
    city: "New York",
    phone: "+1 (555) 345-6789",
    capacity: 40,
    available: 12,
    rented: 24,
    maintenance: 4,
    utilization: 70,
    todayRentals: 167,
    revenue: "$3,340",
    coordinates: "40.7489° N, 73.9680° W",
    description:
      "Scenic waterfront location popular with recreational riders and fitness enthusiasts. Adjacent to the riverside bike path with stunning views. High demand during weekends and evenings.",
  },
  {
    id: 4,
    name: "Park Avenue",
    address: "321 Park Avenue South",
    city: "New York",
    phone: "+1 (555) 456-7890",
    capacity: 60,
    available: 38,
    rented: 18,
    maintenance: 4,
    utilization: 37,
    todayRentals: 124,
    revenue: "$2,480",
    coordinates: "40.7489° N, 73.9750° W",
    description:
      "Upscale residential area station catering to local residents and visitors. Well-maintained facility with premium bike options. Convenient access to shopping districts and cultural venues.",
  },
  {
    id: 5,
    name: "North Station",
    address: "654 Northern Boulevard",
    city: "New York",
    phone: "+1 (555) 567-8901",
    capacity: 45,
    available: 30,
    rented: 12,
    maintenance: 3,
    utilization: 33,
    todayRentals: 98,
    revenue: "$1,960",
    coordinates: "40.8089° N, 73.9654° W",
    description:
      "Suburban connector station linking residential neighborhoods to the city center. Family-friendly location with child seat attachments available. Serves as a key commuter hub during rush hours.",
  },
  {
    id: 6,
    name: "Beach Side",
    address: "987 Ocean Drive, Beachfront",
    city: "New York",
    phone: "+1 (555) 678-9012",
    capacity: 35,
    available: 8,
    rented: 22,
    maintenance: 5,
    utilization: 77,
    todayRentals: 189,
    revenue: "$3,780",
    coordinates: "40.5889° N, 73.9550° W",
    description:
      "Beachfront destination station with highest seasonal demand. Popular tourist attraction with beach cruiser options. Features weather-resistant bike storage and proximity to boardwalk attractions.",
  },
]

export default function Stations() {
  const [selectedStation, setSelectedStation] = useState<(typeof stations)[0] | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isAddStationOpen, setIsAddStationOpen] = useState(false)
  const [isManageOpen, setIsManageOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [formData, setFormData] = useState({
    locationName: "",
    address: "",
    city: "",
    phoneNumber: "",
    capacity: "",
  })

  const totalCapacity = stations.reduce((sum, s) => sum + s.capacity, 0)
  const totalAvailable = stations.reduce((sum, s) => sum + s.available, 0)
  const totalRented = stations.reduce((sum, s) => sum + s.rented, 0)
  const avgUtilization = Math.round(stations.reduce((sum, s) => sum + s.utilization, 0) / stations.length)

  const handleViewDetails = (station: (typeof stations)[0]) => {
    setSelectedStation(station)
    setIsDetailsOpen(true)
  }

  const handleManageStation = (station: (typeof stations)[0]) => {
    setSelectedStation(station)
    setFormData({
      locationName: station.name,
      address: station.address,
      city: station.city,
      phoneNumber: station.phone,
      capacity: station.capacity.toString(),
    })
    setIsEditMode(false)
    setIsManageOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    setIsAddStationOpen(false)
    setFormData({
      locationName: "",
      address: "",
      city: "",
      phoneNumber: "",
      capacity: "",
    })
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Station updated:", { id: selectedStation?.id, ...formData })
    setIsManageOpen(false)
    setIsEditMode(false)
  }

  const handleDelete = () => {
    console.log("[v0] Station deleted:", selectedStation?.id)
    setIsDeleteDialogOpen(false)
    setIsManageOpen(false)
  }

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
        <Card className="border-0 shadow-elevated relative overflow-hidden group">
          <div
            className="absolute top-0 right-0 w-32 h-32 opacity-10 transition-opacity group-hover:opacity-20"
            style={{ background: "radial-gradient(circle at center, hsl(var(--primary)), transparent)" }}
          />
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Stations</CardTitle>
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stations.length}</div>
            <p className="text-xs text-muted-foreground mt-1">{totalCapacity} total capacity</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-elevated relative overflow-hidden group">
          <div
            className="absolute top-0 right-0 w-32 h-32 opacity-10 transition-opacity group-hover:opacity-20"
            style={{ background: "radial-gradient(circle at center, hsl(var(--success)), transparent)" }}
          />
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Available Bikes</CardTitle>
              <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center">
                <Bike className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{totalAvailable}</div>
            <p className="text-xs text-muted-foreground mt-1">Ready to rent</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-elevated relative overflow-hidden group">
          <div
            className="absolute top-0 right-0 w-32 h-32 opacity-10 transition-opacity group-hover:opacity-20"
            style={{ background: "radial-gradient(circle at center, hsl(var(--warning)), transparent)" }}
          />
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Utilization</CardTitle>
              <div className="h-10 w-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-warning" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">{avgUtilization}%</div>
            <p className="text-xs text-muted-foreground mt-1">Across all stations</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-elevated relative overflow-hidden group">
          <div
            className="absolute top-0 right-0 w-32 h-32 opacity-10 transition-opacity group-hover:opacity-20"
            style={{ background: "radial-gradient(circle at center, hsl(var(--accent)), transparent)" }}
          />
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Rentals</CardTitle>
              <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-accent" />
              </div>
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

      {/* Stations Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {stations.map((station) => (
          <Card
            key={station.id}
            className="hover:shadow-elevated transition-all duration-300 group border-0 bg-gradient-to-br from-card to-card/50 relative overflow-hidden"
          >
            <div
              className="absolute top-0 right-0 w-40 h-40 opacity-5 transition-opacity group-hover:opacity-10"
              style={{ background: "radial-gradient(circle at center, hsl(var(--primary)), transparent)" }}
            />

            <CardHeader>
              <div className="flex items-start justify-between">
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
                        {station.coordinates}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant={station.utilization > 60 ? "default" : "secondary"} className="gap-1">
                  {station.utilization}% Used
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Capacity Bar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Capacity Status</span>
                  <span className="font-medium">
                    {station.available + station.rented} / {station.capacity}
                  </span>
                </div>
                <Progress value={station.utilization} className="h-3" />
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-success" />
                    Available: <span className="font-medium">{station.available}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    Rented: <span className="font-medium">{station.rented}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-warning" />
                    Maintenance: <span className="font-medium">{station.maintenance}</span>
                  </span>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Today's Rentals
                  </p>
                  <p className="text-2xl font-bold text-primary">{station.todayRentals}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Revenue
                  </p>
                  <p className="text-2xl font-bold text-success">{station.revenue}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  size="sm"
                  onClick={() => handleViewDetails(station)}
                >
                  View Details
                </Button>
                <Button className="flex-1" size="sm" onClick={() => handleManageStation(station)}>
                  Manage Station
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isAddStationOpen} onOpenChange={setIsAddStationOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="space-y-4 pb-6 border-b">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-xl">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-1">
                <DialogTitle className="text-3xl font-bold">Add New Station</DialogTitle>
                <DialogDescription className="text-base">
                  Create a new bike station location in your network
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-8 pt-6">
            {/* Location Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPinned className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Location Details</h3>
                  <p className="text-sm text-muted-foreground">Where will this station be located?</p>
                </div>
              </div>

              <div className="space-y-5 pl-13">
                <div className="space-y-2.5">
                  <Label htmlFor="locationName" className="text-sm font-medium">
                    Station Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="locationName"
                    name="locationName"
                    placeholder="e.g., Central Park Station"
                    value={formData.locationName}
                    onChange={handleInputChange}
                    required
                    maxLength={100}
                    className="h-11"
                  />
                  <p className="text-xs text-muted-foreground pl-1">Choose a unique, memorable name</p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2.5">
                    <Label htmlFor="address" className="text-sm font-medium">
                      Street Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 Main Street"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      maxLength={255}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <Label htmlFor="city" className="text-sm font-medium">
                      City <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      maxLength={50}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="phoneNumber" className="text-sm font-medium">
                    Contact Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      maxLength={20}
                      className="h-11 pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground pl-1">Optional - for customer support</p>
                </div>
              </div>
            </div>

            {/* Capacity Configuration Section */}
            <div className="space-y-6 pt-6 border-t">
              <div className="flex items-center gap-3 pb-2">
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Bike className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Capacity Setup</h3>
                  <p className="text-sm text-muted-foreground">Configure the station's bike capacity</p>
                </div>
              </div>

              <div className="space-y-2.5 pl-13">
                <Label htmlFor="capacity" className="text-sm font-medium">
                  Total Bike Capacity
                </Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  placeholder="50"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  min="1"
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground pl-1">
                  Maximum number of bikes this station can hold (optional)
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-11 bg-transparent"
                onClick={() => setIsAddStationOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 h-11 bg-gradient-to-r from-primary to-accent shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Create Station
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              {selectedStation?.name}
            </DialogTitle>
            <DialogDescription>Complete location details and performance metrics</DialogDescription>
          </DialogHeader>

          {selectedStation && (
            <div className="space-y-6 pt-4">
              {/* Location Information */}
              <Card className="border-0 shadow-sm bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPinned className="h-5 w-5 text-primary" />
                    Location Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{selectedStation.address}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">City</p>
                      <p className="font-medium">{selectedStation.city}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                      <p className="font-medium">{selectedStation.phone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Coordinates</p>
                      <p className="font-medium">{selectedStation.coordinates}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Description</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{selectedStation.description}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Capacity Details */}
              <Card className="border-0 shadow-sm bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bike className="h-5 w-5 text-primary" />
                    Capacity & Availability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Capacity</p>
                      <p className="text-2xl font-bold">{selectedStation.capacity}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Available</p>
                      <p className="text-2xl font-bold text-success">{selectedStation.available}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Rented</p>
                      <p className="text-2xl font-bold text-primary">{selectedStation.rented}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Maintenance</p>
                      <p className="text-2xl font-bold text-warning">{selectedStation.maintenance}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Progress value={selectedStation.utilization} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="border-0 shadow-sm bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <p className="text-sm">Today's Rentals</p>
                      </div>
                      <p className="text-3xl font-bold text-primary">{selectedStation.todayRentals}</p>
                      <p className="text-xs text-muted-foreground">Total transactions today</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        <p className="text-sm">Today's Revenue</p>
                      </div>
                      <p className="text-3xl font-bold text-success">{selectedStation.revenue}</p>
                      <p className="text-xs text-muted-foreground">Gross revenue generated</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsDetailsOpen(false)}>
                  Close
                </Button>
                <Button className="flex-1">Manage Station</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Manage Station Dialog */}
      <Dialog open={isManageOpen} onOpenChange={setIsManageOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              Manage Station
            </DialogTitle>
            <DialogDescription>
              {isEditMode ? "Edit station details" : "View and manage station information"}
            </DialogDescription>
          </DialogHeader>

          {selectedStation && (
            <form onSubmit={handleUpdate} className="space-y-6 pt-4">
              {/* Location Information */}
              <Card className="border-0 shadow-sm bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPinned className="h-5 w-5 text-primary" />
                    Location Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-locationName">
                      Station Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="edit-locationName"
                      name="locationName"
                      value={formData.locationName}
                      onChange={handleInputChange}
                      disabled={!isEditMode}
                      required
                      maxLength={100}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-address">
                      Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="edit-address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditMode}
                      required
                      maxLength={255}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-city">
                      City <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="edit-city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={!isEditMode}
                      required
                      maxLength={50}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-phoneNumber">Phone Number</Label>
                    <Input
                      id="edit-phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      disabled={!isEditMode}
                      maxLength={20}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Capacity Configuration */}
              <Card className="border-0 shadow-sm bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bike className="h-5 w-5 text-primary" />
                    Capacity Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-capacity">Total Bike Capacity</Label>
                    <Input
                      id="edit-capacity"
                      name="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      disabled={!isEditMode}
                      min="1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Current Status (Read-only) */}
              {!isEditMode && (
                <Card className="border-0 shadow-sm bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Current Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Available</p>
                        <p className="text-2xl font-bold text-success">{selectedStation.available}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Rented</p>
                        <p className="text-2xl font-bold text-primary">{selectedStation.rented}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Maintenance</p>
                        <p className="text-2xl font-bold text-warning">{selectedStation.maintenance}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Utilization</p>
                        <p className="text-2xl font-bold">{selectedStation.utilization}%</p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <Progress value={selectedStation.utilization} className="h-3" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                {!isEditMode ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setIsManageOpen(false)}
                    >
                      Close
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2 bg-transparent"
                      onClick={() => setIsEditMode(true)}
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      className="gap-2"
                      onClick={() => setIsDeleteDialogOpen(true)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => {
                        setIsEditMode(false)
                        setFormData({
                          locationName: selectedStation.name,
                          address: selectedStation.address,
                          city: selectedStation.city,
                          phoneNumber: selectedStation.phone,
                          capacity: selectedStation.capacity.toString(),
                        })
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-accent">
                      Save Changes
                    </Button>
                  </>
                )}
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this station?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the station "{selectedStation?.name}" and
              remove all associated data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Station
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
