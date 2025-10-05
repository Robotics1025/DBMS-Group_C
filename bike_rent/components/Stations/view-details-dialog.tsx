"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MapPin, MapPinned, Bike, TrendingUp, Users } from "lucide-react"

interface Station {
  id: number
  name: string
  address: string
  city: string
  phone: string
  capacity: number
  available: number
  rented: number
  maintenance: number
  utilization: number
  todayRentals: number
  revenue: string
  coordinates: string
}

interface ViewDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  station: Station | null
}

export function ViewDetailsDialog({ open, onOpenChange, station }: ViewDetailsDialogProps) {
  if (!station) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            {station.name}
          </DialogTitle>
        </DialogHeader>

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
                  <p className="font-medium">{station.address}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="font-medium">{station.city}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{station.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Coordinates</p>
                  <p className="font-medium">{station.coordinates}</p>
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
                  <p className="text-2xl font-bold">{station.capacity}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-2xl font-bold text-success">{station.available}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Rented</p>
                  <p className="text-2xl font-bold text-primary">{station.rented}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Maintenance</p>
                  <p className="text-2xl font-bold text-warning">{station.maintenance}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Progress value={station.utilization} className="h-3" />
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
                  <p className="text-3xl font-bold text-primary">{station.todayRentals}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <p className="text-sm">Today's Revenue</p>
                  </div>
                  <p className="text-3xl font-bold text-success">{station.revenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button className="flex-1">Manage Station</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
