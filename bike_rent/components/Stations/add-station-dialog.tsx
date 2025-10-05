"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPinned, Bike, Plus } from "lucide-react"

interface AddStationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formData: {
    locationName: string
    address: string
    city: string
    phoneNumber: string
    capacity: string
  }
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
}

export function AddStationDialog({ open, onOpenChange, formData, onInputChange, onSubmit }: AddStationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Plus className="h-6 w-6 text-white" />
            </div>
            Add New Station
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6 pt-4">
          <Card className="border-0 shadow-sm bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPinned className="h-5 w-5 text-primary" />
                Location Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="locationName">
                  Station Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="locationName"
                  name="locationName"
                  placeholder="e.g., Central Park Station"
                  value={formData.locationName}
                  onChange={onInputChange}
                  required
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Main Street"
                  value={formData.address}
                  onChange={onInputChange}
                  required
                  maxLength={255}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">
                  City <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="New York"
                  value={formData.city}
                  onChange={onInputChange}
                  required
                  maxLength={50}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phoneNumber}
                  onChange={onInputChange}
                  maxLength={20}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bike className="h-5 w-5 text-primary" />
                Capacity Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Total Bike Capacity</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  placeholder="50"
                  value={formData.capacity}
                  onChange={onInputChange}
                  min="1"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-accent">
              Add Station
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
