import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bike, Clock, DollarSign, TrendingUp, MapPin, Users } from "lucide-react";
import Image from "next/image";

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
  { id: "R-001", customer: "Sarah Johnson", bike: "Mountain Pro X1", station: "Central Park", time: "10 mins ago", status: "active", avatar: "/assets/images/avatar/avatar-1.webp" },
  { id: "R-002", customer: "Mike Chen", bike: "City Cruiser", station: "Downtown", time: "25 mins ago", status: "active", avatar: "/assets/images/avatar/avatar-2.webp" },
  { id: "R-003", customer: "Emma Davi s", bike: "Electric Swift", station: "Riverside", time: "1 hour ago", status: "returned", avatar: "/assets/images/avatar/avatar-3.webp" },
  { id: "R-004", customer: "James Wilson", bike: "Hybrid Comfort", station: "Park Avenue", time: "2 hours ago", status: "returned", avatar: "/assets/images/avatar/avatar-4.webp" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 relative min-h-screen">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Large shape in top-right */}
        <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.02] rotate-12 animate-pulse">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        
        {/* Medium shape in bottom-left */}
        <div className="absolute bottom-20 left-10 w-60 h-60 opacity-[0.03] -rotate-45 animate-pulse delay-1000">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        
        {/* Small shape in center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-[0.015] rotate-90 animate-pulse delay-2000">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        
        {/* Additional decorative shapes */}
        <div className="absolute top-32 left-1/4 w-32 h-32 opacity-[0.02] rotate-180 animate-pulse delay-500">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        
        <div className="absolute bottom-40 right-1/4 w-48 h-48 opacity-[0.025] -rotate-12 animate-pulse delay-1500">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/50 to-background/20" />
      </div>

      {/* Header with Cool Background */}
      <div className="relative bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 rounded-2xl p-8 border backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Monitor your bike rental operations in real-time
            </p>
          </div>
          <div className="hidden md:block relative w-40 h-40">
            <Image 
              src="/assets/illustrations/illustration-dashboard.webp" 
              alt="Dashboard illustration" 
              fill
              className="object-contain"
            />
          </div>
        </div>
        
        {/* Additional background shapes in header */}
        <div className="absolute top-2 left-2 w-20 h-20 opacity-5 rotate-45">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-2 right-2 w-16 h-16 opacity-5 -rotate-12">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const cardColors = [
            {
              bg: "bg-gradient-to-br from-green-100 to-green-50",
              iconBg: "bg-green-500",
              iconColor: "text-white",
              textColor: "text-green-700",
              valueColor: "text-green-800",
              changeColor: "text-green-600"
            },
            {
              bg: "bg-gradient-to-br from-orange-100 to-orange-50", 
              iconBg: "bg-orange-500",
              iconColor: "text-white",
              textColor: "text-orange-700",
              valueColor: "text-orange-800",
              changeColor: "text-orange-600"
            },
            {
              bg: "bg-gradient-to-br from-blue-100 to-blue-50",
              iconBg: "bg-blue-500", 
              iconColor: "text-white",
              textColor: "text-blue-700",
              valueColor: "text-blue-800",
              changeColor: "text-blue-600"
            },
            {
              bg: "bg-gradient-to-br from-purple-100 to-purple-50",
              iconBg: "bg-purple-500",
              iconColor: "text-white", 
              textColor: "text-purple-700",
              valueColor: "text-purple-800",
              changeColor: "text-purple-600"
            }
          ];
          
          const colors = cardColors[index];
          
          return (
            <Card key={stat.title} className={`${colors.bg} border-0 hover:shadow-lg transition-all duration-300 overflow-hidden relative rounded-2xl`}>
              {/* Dot Pattern Background */}
              <div className="absolute inset-0 opacity-20">
                <div className={`absolute inset-0 ${colors.textColor}`}>
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`dots-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1" fill="currentColor"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#dots-${index})`}/>
                  </svg>
                </div>
              </div>
              
              {/* Shape Pattern */}
              <div className="absolute top-4 right-4 w-16 h-16 opacity-10">
                <Image 
                  src="/assets/background/shape-square.svg" 
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              
              <CardContent className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${colors.iconBg}`}>
                    <Icon className={`h-6 w-6 ${colors.iconColor}`} />
                  </div>
                  <div className="flex items-center gap-1 text-right">
                    <TrendingUp className={`h-4 w-4 ${colors.changeColor}`} />
                    <span className={`text-sm font-medium ${colors.changeColor}`}>
                      {stat.change.includes('+') ? stat.change : `+${stat.change}`}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h3 className={`text-sm font-medium ${colors.textColor}`}>
                    {stat.title}
                  </h3>
                  <div className={`text-3xl font-bold ${colors.valueColor}`}>
                    {stat.value}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Rentals */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-blue-500/5">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Rentals
            </CardTitle>
            <CardDescription>
              Latest bike rental activity
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentRentals.map((rental) => (
                <div key={rental.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors border-b last:border-0">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20">
                    <Image 
                      src={rental.avatar} 
                      alt={rental.customer}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium leading-none truncate">
                        {rental.customer}
                      </p>
                      <Badge 
                        variant={rental.status === "active" ? "default" : "secondary"} 
                        className={`text-xs ${
                          rental.status === "active" 
                            ? "bg-green-500/20 text-green-700 hover:bg-green-500/30" 
                            : "bg-gray-500/20 text-gray-700"
                        }`}
                      >
                        {rental.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Bike className="h-3 w-3" />
                      <span className="truncate">{rental.bike}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                      <MapPin className="h-3 w-3" />
                      <span className="hidden sm:inline">{rental.station}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{rental.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
            <Image 
              src="/assets/background/shape-square.svg" 
              alt=""
              fill
              className="object-contain"
            />
          </div>
          
          <CardHeader className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 relative z-10">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Quick Stats
            </CardTitle>
            <CardDescription>
              Performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Utilization Rate
                </span>
                <span className="font-medium text-primary">78%</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-[78%] transition-all duration-1000" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  Maintenance Due
                </span>
                <span className="font-medium text-yellow-600">8 bikes</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full w-[5%] transition-all duration-1000" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Customer Satisfaction
                </span>
                <span className="font-medium text-green-600">4.8/5.0</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-[96%] transition-all duration-1000" />
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-blue-600 text-primary-foreground hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 transform hover:scale-105 shadow-md">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Bike className="h-4 w-4" />
                  Add New Bike
                </span>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-gradient-to-r from-secondary to-muted hover:from-secondary/80 hover:to-muted/80 transition-all duration-300 transform hover:scale-105 shadow-sm">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  View All Rentals
                </span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
