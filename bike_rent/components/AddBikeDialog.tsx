"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Bike, MapPin, Hash } from "lucide-react";
import { toast, Toaster } from "sonner";

export function AddBikeDialog() {
  const [open, setOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");
  const [locations, setLocations] = useState<{ id: string; name: string }[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(true);

  interface Bike {
  id: string;
  serial: string;
  name: string;
  type: string;
  status: string;
  lastMaintenance: string | null;
  rate: string;
  locationId: string;
  locationName: string;
  image: string;
}

interface BikesApiResponse {
  success: boolean;
  bikes: Bike[];
}

useEffect(() => {
  async function fetchLocations() {
    try {
      const res = await fetch("/api/bikes");
      if (!res.ok) throw new Error("Failed to fetch bikes");

      const data: BikesApiResponse = await res.json(); // <- type assertion

      if (data.success && data.bikes) {
        const uniqueLocations = Array.from(
          new Map(
            data.bikes.map((b) => [b.locationId, { id: b.locationId, name: b.locationName }])
          ).values()
        );

        setLocations(uniqueLocations);
      } else {
        toast.error("Failed to load locations");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching locations");
    } finally {
      setLoadingLocations(false);
    }
  }

  fetchLocations();
}, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("bike_image") as File | null;

    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Invalid file type. Please select an image.", { duration: 5000 });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image is too large. Max size is 5MB.", { duration: 5000 });
        return;
      }
    }

    try {
      const response = await fetch("/api/bikes", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok || data.error) {
        toast.error(data.error || "Failed to add bike. Try again.", { duration: 5000 });
        return;
      }

      toast.success(`${formData.get("Model")} has been added!`, {
        description: "Bike added successfully",
        duration: 5000,
      });

      form.reset();
      setPreviewSrc("");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add bike. Try again.", { duration: 5000 });
    }
  };

  return (
    <>
      <Toaster richColors />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2 bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl transition-all">
            <Plus className="h-4 w-4" />
            Add New Bike
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bike className="h-5 w-5 text-primary" />
              </div>
              Add New Bike
            </DialogTitle>
            <DialogDescription>
              Fill in the details of the new bike. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 pt-4" encType="multipart/form-data">
            {/* Serial Number and Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serial" className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Serial Number *
                </Label>
                <Input id="serial" name="BikeSerialNumber" placeholder="e.g., B-2024-001" className="h-11" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model" className="flex items-center gap-2">
                  <Bike className="h-4 w-4" />
                  Model *
                </Label>
                <Input id="model" name="Model" placeholder="e.g., Mountain Pro X1" className="h-11" required />
              </div>
            </div>

            {/* Bike Type and Current Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Bike Type *</Label>
                <Select name="BikeType" required>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select bike type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mountain">🏔️ Mountain</SelectItem>
                    <SelectItem value="City">🏙️ City</SelectItem>
                    <SelectItem value="Electric">⚡ Electric</SelectItem>
                    <SelectItem value="Road">🏁 Road</SelectItem>
                    <SelectItem value="Hybrid">🔄 Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Current Status *</Label>
                <Select name="CurrentStatus" required>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Rented">Rented</SelectItem>
                    <SelectItem value="In Maintenance">In Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Last Maintenance Date and Rental Rate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastMaintenance">Last Maintenance Date</Label>
                <Input id="lastMaintenance" name="LastMaintenanceDate" type="date" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate">Rental Rate (per minute in UGX) *</Label>
                <Input id="rate" name="RentalRatePerMinute" type="number" step="0.01" placeholder="500" className="h-11" required />
              </div>
            </div>

            {/* Location Selection */}
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location *
              </Label>
              <Select name="LocationID" required>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder={loadingLocations ? "Loading locations..." : "Select location"} />
                </SelectTrigger>
                <SelectContent>
                  {loadingLocations ? (
                    <SelectItem value="loading" disabled>Loading locations...</SelectItem>
                  ) : locations.length > 0 ? (
                    locations.map((loc) => (
                      <SelectItem key={loc.id} value={loc.id.toString()}>
                        {loc.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-locations" disabled>No locations available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Bike Image */}
            <div className="space-y-2">
              <Label htmlFor="bikeImage">Bike Image</Label>
              <Input
                id="bikeImage"
                name="bike_image"
                type="file"
                accept="image/*"
                className="h-11"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  if (!file.type.startsWith("image/")) {
                    toast.error("Invalid file type. Please select an image.", { duration: 5000 });
                    e.target.value = "";
                    setPreviewSrc("");
                    return;
                  }
                  if (file.size > 5 * 1024 * 1024) {
                    toast.error("Image is too large. Max size is 5MB.", { duration: 5000 });
                    e.target.value = "";
                    setPreviewSrc("");
                    return;
                  }

                  const reader = new FileReader();
                  reader.onload = () => setPreviewSrc(reader.result as string);
                  reader.readAsDataURL(file);
                }}
              />
              {previewSrc && (
                <img
                  src={previewSrc}
                  className="mt-2 h-40 w-40 object-cover rounded border shadow-sm"
                  alt="Bike Preview"
                />
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1 h-11">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 h-11 bg-gradient-to-r from-primary to-accent">
                <Plus className="h-4 w-4 mr-2" />
                Add Bike
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
