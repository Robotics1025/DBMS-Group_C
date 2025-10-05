"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MapPin, MapPinned, Bike, TrendingUp, Pencil, Trash2 } from "lucide-react"
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

interface ManageStationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  station: Station | null
  formData: {
    locationName: string
    address: string
    city: string
    phoneNumber: string
    capacity: string
  }
  isEditMode: boolean
  setIsEditMode: (value: boolean) => void
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUpdate: (e: React.FormEvent) => void
  isDeleteDialogOpen: boolean
  setIsDeleteDialogOpen: (value: boolean) => void
  onDelete: () => void
}

export function ManageStationDialog({
  open,
  onOpenChange,
  station,
  formData,
  isEditMode,
  setIsEditMode,
  onInputChange,
  onUpdate,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  onDelete,
}: ManageStationDialogProps) {
  if (!station) return null

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              Manage Station
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={onUpdate} className="space-y-6 pt-4">
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
                    onChange={onInputChange}
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
                    onChange={onInputChange}
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
                    onChange={onInputChange}
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
                    onChange={onInputChange}
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
                    onChange={onInputChange}
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
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Utilization</p>
                      <p className="text-2xl font-bold">{station.utilization}%</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Progress value={station.utilization} className="h-3" />
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
                    onClick={() => onOpenChange(false)}
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
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this station?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the station "{station.name}" and remove all
              associated data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Station
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
