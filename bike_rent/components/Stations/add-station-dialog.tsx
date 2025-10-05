"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPinned, Bike, Plus } from "lucide-react"
import { toast } from "sonner"

interface AddStationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddStationDialog({ open, onOpenChange }: AddStationDialogProps) {
  const [formData, setFormData] = useState({
    locationName: "",
    address: "",
    city: "",
    phoneNumber: "",
    capacity: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.locationName.trim()) newErrors.locationName = "Station Name is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (formData.capacity && Number(formData.capacity) <= 0)
      newErrors.capacity = "Capacity must be greater than 0"
    return newErrors
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    const toastId = toast.loading("Adding station...")

    try {
      const res = await fetch("http://localhost:3000/api/stations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          capacity: Number(formData.capacity),
        }),
      })

      const data = await res.json()
      console.log("Response:", res.status, data)

      if (res.ok && data.success) {
        toast.success("Station added successfully!", { id: toastId })
        setFormData({ locationName: "", address: "", city: "", phoneNumber: "", capacity: "" })
        setErrors({})
        onOpenChange(false)
      } else {
        toast.error(`Failed to add station: ${data.error || "Unknown error"}`, { id: toastId })
      }
    } catch (err) {
      console.error("Network or server error:", err)
      toast.error("Unexpected error occurred.", { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  const renderError = (field: string) =>
    errors[field] ? <p className="text-destructive text-sm mt-1">{errors[field]}</p> : null

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
          {/* Location Information Card */}
          <Card className="border-0 shadow-sm bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPinned className="h-5 w-5 text-primary" />
                Location Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {["locationName", "address", "city", "phoneNumber"].map((field) => (
                <div className="space-y-2" key={field}>
                  <Label htmlFor={field}>
                    {field === "locationName"
                      ? "Station Name"
                      : field === "phoneNumber"
                      ? "Phone Number"
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                    {field !== "phoneNumber" && <span className="text-destructive">*</span>}
                  </Label>
                  <Input
                    id={field}
                    name={field}
                    placeholder={
                      field === "locationName"
                        ? "Central Park Station"
                        : field === "address"
                        ? "123 Main Street"
                        : field === "city"
                        ? "New York"
                        : "+1 (555) 123-4567"
                    }
                    value={(formData as any)[field]}
                    onChange={onInputChange}
                    maxLength={
                      field === "phoneNumber"
                        ? 20
                        : field === "city"
                        ? 50
                        : field === "address"
                        ? 255
                        : 100
                    }
                  />
                  {renderError(field)}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Capacity Card */}
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
                {renderError("capacity")}
              </div>
            </CardContent>
          </Card>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-accent flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading && (
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loading ? "Adding..." : "Add Station"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
