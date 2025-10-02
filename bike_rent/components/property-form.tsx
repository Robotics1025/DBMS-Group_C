"use client"

import { useState } from "react"
import { Building2, Save, X, MapPin, Hash, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Property {
  id?: string
  name?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  propertyType?: "apartment" | "house" | "condo" | "commercial"
  totalUnits?: number
}

interface PropertyFormProps {
  property?: Property
  onSave: (property: Partial<Property>) => void
  onCancel?: () => void
}

export default function PropertyFormDialog({ onSave }: { onSave: (property: Partial<Property>) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Property>({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    propertyType: "apartment",
    totalUnits: 1,
  })

  const handleChange = (field: keyof Property, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    setOpen(false) // close dialog
    setFormData({
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      propertyType: "apartment",
      totalUnits: 1,
    })
  }

  const handleCancel = () => {
    setOpen(false)
    setFormData({
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      propertyType: "apartment",
      totalUnits: 1,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:opacity-90 text-white shadow-property-button">
          Add Property
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <Card className="rounded-lg border-0 shadow-lg">
          <CardHeader className="bg-primary p-6 text-white flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">Add New Property</DialogTitle>
              <DialogDescription className="text-white/80">
                Enter property details to expand your real estate portfolio
              </DialogDescription>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-property-primary" />
                    Property Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Sunset Apartments"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyType" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-property-primary" />
                    Property Type
                  </Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => handleChange("propertyType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">🏢 Apartment</SelectItem>
                      <SelectItem value="house">🏠 House</SelectItem>
                      <SelectItem value="condo">🏘️ Condo</SelectItem>
                      <SelectItem value="commercial">🏪 Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-property-primary" />
                  Address
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="123 Main Street"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleChange("zipCode", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalUnits" className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-property-primary" />
                  Total Units
                </Label>
                <Input
                  id="totalUnits"
                  type="number"
                  min={1}
                  value={formData.totalUnits}
                  onChange={(e) => handleChange("totalUnits", Number(e.target.value) || 1)}
                  required
                />
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" className="flex-1 bg-primary text-white hover:opacity-90">
                  <Save className="h-4 w-4 mr-2" /> Add Property
                </Button>
                <Button type="button" variant="outline" className="flex-1" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" /> Cancel
                </Button>
              </DialogFooter>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
