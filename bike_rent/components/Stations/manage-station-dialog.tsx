"use client"

import React from "react"
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
      {/* Main Dialog */}
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
            {/* Location Info */}
            <Card className="border-0 shadow-sm bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPinned className="h-5 w-5 text-primary" />
                  Location Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: "edit-locationName", name: "locationName", label: "Station Name", required: true, maxLength: 100 },
                  { id: "edit-address", name: "address", label: "Address", required: true, maxLength: 255 },
                  { id: "edit-city", name: "city", label: "City", required: true, maxLength: 50 },
                  { id: "edit-phoneNumber", name: "phoneNumber", label: "Phone Number", required: false, maxLength: 20 },
                ].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id}>
                      {field.label} {field.required && <span className="text-destructive">*</span>}
                    </Label>
                    <Input
                      id={field.id}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={onInputChange}
                      disabled={!isEditMode}
                      required={field.required}
                      maxLength={field.maxLength}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Capacity */}
            <Card className="border-0 shadow-sm bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bike className="h-5 w-5 text-primary" />
                  Capacity Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="edit-capacity">Total Bike Capacity</Label>
                  <Input
                    id="edit-capacity"
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={onInputChange}
                    disabled={!isEditMode}
                    min={1}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Current Status */}
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
                    {[
                      { label: "Available", value: station.available, color: "text-success" },
                      { label: "Rented", value: station.rented, color: "text-primary" },
                      { label: "Maintenance", value: station.maintenance, color: "text-warning" },
                      { label: "Utilization", value: `${station.utilization}%`, color: "" },
                    ].map((stat) => (
                      <div key={stat.label} className="space-y-1">
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  <Progress value={station.utilization} className="h-3 pt-2" />
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              {!isEditMode ? (
                <>
                  <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
                    Close
                  </Button>
                  <Button type="button" variant="outline" className="flex-1 gap-2" onClick={() => setIsEditMode(true)}>
                    <Pencil className="h-4 w-4" /> Edit
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    className="flex-1 gap-2"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setIsEditMode(false)}>
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

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this station?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the station "{station?.name}" and remove all
              associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete()
                setIsDeleteDialogOpen(false)
                onOpenChange(false)
              }}
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
