import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bike, Clock, DollarSign, TrendingUp, MapPin, Users } from "lucide-react";

const stats = [
  {
    title: "Total Bikes",
    value: "156",
    change: "12 available",
    icon: Bike,
    status: "success",
  },
  {
    title: "Active Rentals",
    value: "48",
    change: "+8 today",
    icon: Clock,
    status: "warning",
  },
  {
    title: "Revenue Today",
    value: "$1,248",
    change: "+18.2%",
    icon: DollarSign,
    status: "success",
  },
  {
    title: "Total Customers",
    value: "892",
    change: "+24 this week",
    icon: Users,
    status: "default",
  },
];

const recentRentals = [
  { id: "R-001", customer: "Sarah Johnson", bike: "Mountain Pro X1", station: "Central Park", time: "10 mins ago", status: "active" },
  { id: "R-002", customer: "Mike Chen", bike: "City Cruiser", station: "Downtown", time: "25 mins ago", status: "active" },
  { id: "R-003", customer: "Emma Davis", bike: "Electric Swift", station: "Riverside", time: "1 hour ago", status: "returned" },
  { id: "R-004", customer: "James Wilson", bike: "Hybrid Comfort", station: "Park Avenue", time: "2 hours ago", status: "returned" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your bike rental operations in real-time
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-elevated transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <span className="text-primary font-medium">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Rentals */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Rentals</CardTitle>
            <CardDescription>
              Latest bike rental activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRentals.map((rental) => (
                <div key={rental.id} className="flex items-center gap-4 pb-4 border-b last:border-0">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bike className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium leading-none truncate">
                        {rental.customer}
                      </p>
                      <Badge variant={rental.status === "active" ? "default" : "secondary"} className="text-xs">
                        {rental.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {rental.bike}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="hidden sm:inline">{rental.station}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{rental.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>
              Performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Utilization Rate</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Maintenance Due</span>
                <span className="font-medium">8 bikes</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-warning rounded-full" style={{ width: '5%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Customer Satisfaction</span>
                <span className="font-medium">4.8/5.0</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-success rounded-full" style={{ width: '96%' }} />
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                <span className="text-sm font-medium">Add New Bike</span>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <span className="text-sm font-medium">View All Rentals</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
