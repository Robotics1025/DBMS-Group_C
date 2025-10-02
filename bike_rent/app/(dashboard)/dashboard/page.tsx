"use client"

import { useState, useEffect } from "react"
import { Building2, Users, FileText, DollarSign, AlertCircle, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import PropertyFormDialog from "@/components/property-form"
import { HeroBanner } from "@/components/HeroBanner"

export default function Dashboard() {
  const [properties, setProperties] = useState<any[]>([])
  const [units, setUnits] = useState<any[]>([])
  const [tenants, setTenants] = useState<any[]>([])
  const [leases, setLeases] = useState<any[]>([])
  const [rentSchedules, setRentSchedules] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/dashboard")
        const data = await res.json()
        setProperties(data.properties)
        setUnits(data.units)
        setTenants(data.tenants)
        setLeases(data.leases)
        setRentSchedules(data.rentSchedules)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className="p-6 text-center">Loading dashboard...</div>

  // Metrics
  const totalProperties = properties.length
  const totalUnits = units.length
  const occupiedUnits = units.filter((unit) => unit.status === "occupied").length
  const availableUnits = units.filter((unit) => unit.status === "available").length
  const totalTenants = tenants.length
  const activeLeases = leases.filter((lease) => lease.status === "active").length
  const overduePayments = rentSchedules.filter((schedule) => schedule.status === "overdue").length
  const pendingPayments = rentSchedules.filter((schedule) => schedule.status === "pending").length
  const totalMonthlyRent = leases.reduce((sum, lease) => sum + Number(lease.rent_amount || 0), 0)
  const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0

  return (
      <div className="p-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your property overview.</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              {overduePayments} Overdue
            </Badge>
           <PropertyFormDialog
  onSave={(property) => {
    console.log("Property saved:", property)
    // here you can call your API or update state
  }}
/>

          </div>
        </div>
<div className="p-6 space-y-6">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalProperties}</div>
              <p className="text-xs text-muted-foreground">{totalUnits} total units</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{occupancyRate}%</div>
              <p className="text-xs text-muted-foreground">
                {occupiedUnits} of {totalUnits} units occupied
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalTenants}</div>
              <p className="text-xs text-muted-foreground">{activeLeases} active leases</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${totalMonthlyRent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Expected monthly income</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common property management tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Building2 className="h-5 w-5" />
                  <span className="text-xs">Add Property</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Users className="h-5 w-5" />
                  <span className="text-xs">Add Tenant</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <FileText className="h-5 w-5" />
                  <span className="text-xs">New Lease</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-xs">Record Payment</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {overduePayments > 0 && (
                <div className="flex items-center gap-3 p-3 bg-destructive/10 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-destructive">
                      {overduePayments} Overdue Payment{overduePayments > 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-muted-foreground">Requires immediate attention</p>
                  </div>
                </div>
              )}

              {pendingPayments > 0 && (
                <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                  <DollarSign className="h-4 w-4 text-accent" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-accent">
                      {pendingPayments} Pending Payment{pendingPayments > 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-muted-foreground">Due soon</p>
                  </div>
                </div>
              )}

              {availableUnits > 0 && (
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                  <Building2 className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-primary">
                      {availableUnits} Available Unit{availableUnits > 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-muted-foreground">Ready for new tenants</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Properties */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Properties</CardTitle>
            <CardDescription>Overview of your property portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {properties.map((property) => {
                const propertyUnits = units.filter((unit) => unit.property_id === property.id)
                const occupiedCount = propertyUnits.filter((unit) => unit.status === "occupied").length
                const propertyOccupancy = propertyUnits.length > 0 ? Math.round((occupiedCount / propertyUnits.length) * 100) : 0

                return (
                  <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{property.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {property.address}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={propertyOccupancy === 100 ? "default" : "secondary"}>
                          {propertyOccupancy}% Occupied
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {occupiedCount}/{propertyUnits.length} units
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
  )
}
