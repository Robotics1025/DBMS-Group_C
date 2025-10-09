"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Star, Filter, Search, MapPin, Battery, Clock, CreditCard, Receipt, User, LogOut, Menu, X, ChevronRight, Award, Truck, Shield } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/contexts/AuthContext";
import { useNotify } from "@/hooks/use-notify";
// Removed cart context - using direct rental system
import { NotificationBell } from "@/components/NotificationBell";

interface Bike {
  id: string;
  name: string;
  type: 'Electric' | 'Mountain' | 'City' | 'Hybrid' | 'Racing';
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  hourlyRate: number;
  rating: number;
  reviews: number;
  battery?: number;
  range?: number;
  location: string;
  distance: number;
  image: string;
  available: boolean;
  features: string[];
  description: string;
  isFlashSale?: boolean;
  badge?: string;
}

const mockBikes: Bike[] = [
  {
    id: "BK001",
    name: "Urban E-Cruiser",
    type: "Electric",
    brand: "CityBike",
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    hourlyRate: 15,
    rating: 4.8,
    reviews: 124,
    battery: 85,
    range: 45,
    location: "Central Station",
    distance: 0.5,
    image: "/uploads/1759650691759-cool-bicycle-outdoors.jpg",
    available: true,
    features: ["GPS Tracking", "Electric Motor", "LED Lights", "Phone Holder"],
    description: "Perfect for city commuting with long battery life and comfortable ride.",
    isFlashSale: true,
    badge: "Best Seller"
  },
  {
    id: "BK002", 
    name: "Mountain Explorer",
    type: "Mountain",
    brand: "TrailMaster",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    hourlyRate: 12,
    rating: 4.6,
    reviews: 89,
    location: "North Park Station",
    distance: 1.2,
    image: "/uploads/1759677670759-cool-bicycle-outdoors.jpg",
    available: true,
    features: ["Shock Absorption", "All-Terrain Tires", "Gear System", "Water Bottle"],
    description: "Built for adventures with robust frame and superior grip.",
    isFlashSale: true,
    badge: "Adventure"
  },
  {
    id: "BK003",
    name: "City Commuter",
    type: "City", 
    brand: "ComfortRide",
    price: 599,
    originalPrice: 799,
    discount: 25,
    hourlyRate: 8,
    rating: 4.4,
    reviews: 156,
    location: "Downtown Station",
    distance: 0.8,
    image: "/uploads/1759679918404-cool-bicycle-outdoors.jpg",
    available: true,
    features: ["Lightweight", "Basket", "Comfort Seat", "Chain Guard"],
    description: "Ideal for daily commuting with lightweight design and storage.",
    badge: "Popular"
  },
  {
    id: "BK004",
    name: "Speed Demon E-Bike",
    type: "Electric",
    brand: "SpeedMax",
    price: 1599,
    originalPrice: 2099,
    discount: 24,
    hourlyRate: 20,
    rating: 4.9,
    reviews: 67,
    battery: 92,
    range: 60,
    location: "Tech Hub Station",
    distance: 2.1,
    image: "/uploads/1759681502051-cool-bicycle-outdoors.jpg", 
    available: false,
    features: ["High Speed Motor", "Premium Battery", "Carbon Frame", "Sport Mode"],
    description: "High-performance e-bike for speed enthusiasts.",
    isFlashSale: true,
    badge: "Premium"
  },
  {
    id: "BK005",
    name: "Hybrid Comfort",
    type: "Hybrid",
    brand: "EcoTech",
    price: 749,
    originalPrice: 999,
    discount: 25,
    hourlyRate: 10,
    rating: 4.5,
    reviews: 203,
    location: "Mall Station",
    distance: 1.5,
    image: "/uploads/1759682651471-cool-bicycle-outdoors.jpg",
    available: true,
    features: ["Adjustable Seat", "Multi-Gear", "Puncture Resistant", "Reflectors"],
    description: "Versatile bike combining comfort and performance.",
    badge: "Eco Friendly"
  },
  {
    id: "BK006",
    name: "Racing Pro",
    type: "Racing",
    brand: "SpeedMax",
    price: 1899,
    originalPrice: 2299,
    discount: 17,
    hourlyRate: 22,
    rating: 4.9,
    reviews: 45,
    location: "Sports Complex",
    distance: 1.8,
    image: "/uploads/1759682060322-cool-bicycle-outdoors.jpg",
    available: true,
    features: ["Carbon Fiber", "Racing Wheels", "Aerodynamic Design", "Pro Pedals"],
    description: "Professional racing bike for competitive cyclists.",
    isFlashSale: true,
    badge: "Top Rated"
  }
];

export default function CustomerDashboard() {
  const { user, logout } = useAuth();
  const { notify } = useNotify();
  // Direct rental system - no cart needed
  
  const [bikes] = useState<Bike[]>(mockBikes);
  const [filteredBikes, setFilteredBikes] = useState<Bike[]>(mockBikes);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 3000]);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const categories = [
    { id: "all", name: "All Bikes", icon: "🚴", count: bikes.length },
    { id: "electric", name: "Electric", icon: "⚡", count: bikes.filter(b => b.type === "Electric").length },
    { id: "mountain", name: "Mountain", icon: "🏔️", count: bikes.filter(b => b.type === "Mountain").length },
    { id: "city", name: "City", icon: "🏙️", count: bikes.filter(b => b.type === "City").length },
    { id: "racing", name: "Racing", icon: "🏁", count: bikes.filter(b => b.type === "Racing").length },
    { id: "hybrid", name: "Hybrid", icon: "🔄", count: bikes.filter(b => b.type === "Hybrid").length },
  ];

  const brands = ["CityBike", "TrailMaster", "ComfortRide", "SpeedMax", "EcoTech"];
  const topSellingBikes = [...bikes].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  
  // Auto-play carousel
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Filter logic
  React.useEffect(() => {
    let filtered = bikes;

    if (searchTerm) {
      filtered = filtered.filter(bike => 
        bike.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bike.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bike.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bike.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(bike => bike.type.toLowerCase() === typeFilter.toLowerCase());
    }

    if (brandFilter.length > 0) {
      filtered = filtered.filter(bike => brandFilter.includes(bike.brand));
    }

    filtered = filtered.filter(bike => bike.price >= priceRange[0] && bike.price <= priceRange[1]);

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        case "popular": return b.reviews - a.reviews;
        case "newest": return 0;
        default: return 0;
      }
    });

    setFilteredBikes(filtered);
  }, [bikes, searchTerm, typeFilter, brandFilter, priceRange, sortBy]);

  const toggleFavorite = (bikeId: string) => {
    if (favorites.includes(bikeId)) {
      setFavorites(favorites.filter(id => id !== bikeId));
      notify.info("Removed from favorites");
    } else {
      setFavorites([...favorites, bikeId]);
      notify.success("Added to favorites");
    }
  };

  const handleBrandFilter = (brand: string, checked: boolean) => {
    if (checked) {
      setBrandFilter([...brandFilter, brand]);
    } else {
      setBrandFilter(brandFilter.filter(b => b !== brand));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Mobile Menu */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden mr-2"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BR</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">BikeRent</span>
              </div>
            </div>

            {/* Search Bar with Actions */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search for bikes, brands, locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-orange-200 focus:border-orange-500"
                  />
                </div>
                
                {/* Quick Actions in Search Area */}
                <div className="flex items-center gap-2">
                  <Link href="/customer-dashboard/bike/BK001">
                    <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                      <MapPin className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => window.location.href = `/customer-dashboard/bike/BK001`}
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    Rent Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <NotificationBell />
              
              <Link href="/customer-dashboard/profile">
                <Button variant="ghost" size="icon" className="relative hover:bg-orange-50">
                  <Clock className="h-5 w-5" />
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-orange-50">
                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="hidden md:block font-medium">Hi, {user?.name?.split(' ')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-sm text-muted-foreground">{user?.email}</div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/customer-dashboard/profile">
                      <User className="mr-2 h-4 w-4" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/customer-dashboard/profile">
                      <Receipt className="mr-2 h-4 w-4" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Heart className="mr-2 h-4 w-4" />
                    Favorites ({favorites.length})
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/customer-dashboard/profile">
                      <Clock className="mr-2 h-4 w-4" />
                      My Rentals
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        {/* Mobile Search with Actions */}
        <div className="md:hidden px-4 pb-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search bikes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Mobile Quick Actions */}
          <div className="flex items-center gap-2">
            <Link href="/customer-dashboard/bike/BK001" className="flex-1">
              <Button variant="outline" size="sm" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50">
                <MapPin className="h-4 w-4 mr-1" />
                View Details
              </Button>
            </Link>
            <Button 
              size="sm" 
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => window.location.href = `/customer-dashboard/bike/BK001`}
            >
              <Clock className="h-4 w-4 mr-1" />
              Rent Now
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Promotional Carousel */}
        <div className="mb-6 relative overflow-hidden rounded-xl">
          <div 
            className={`flex transition-transform duration-500 ease-in-out`}
            style={{ transform: `translateX(-${currentAdIndex * 100}%)` }}
          >
            <div className="min-w-full bg-gradient-to-r from-blue-600 to-purple-700 p-8 text-white flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-3">Premium E-Bikes Collection</h2>
                <p className="text-blue-100 text-lg mb-4">Discover our latest electric bikes with advanced features</p>
                <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                  Shop Now
                </Button>
              </div>
              <div className="hidden md:block">
                <img src="/uploads/1759650691759-cool-bicycle-outdoors.jpg" alt="E-Bike" className="w-48 h-32 object-cover rounded-lg" />
              </div>
            </div>
            
            <div className="min-w-full bg-gradient-to-r from-green-600 to-teal-700 p-8 text-white flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-3">Mountain Adventures Await</h2>
                <p className="text-green-100 text-lg mb-4">Explore rugged terrains with our mountain bike series</p>
                <Button className="bg-white text-green-600 hover:bg-green-50 font-semibold">
                  Explore Collection
                </Button>
              </div>
              <div className="hidden md:block">
                <img src="/uploads/1759677670759-cool-bicycle-outdoors.jpg" alt="Mountain Bike" className="w-48 h-32 object-cover rounded-lg" />
              </div>
            </div>

            <div className="min-w-full bg-gradient-to-r from-orange-500 to-red-600 p-8 text-white flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-3">Special Offers This Week</h2>
                <p className="text-orange-100 text-lg mb-4">Up to 25% off on selected bikes • Limited time</p>
                <Button className="bg-white text-orange-600 hover:bg-orange-50 font-semibold">
                  View Deals
                </Button>
              </div>
              <div className="hidden md:block">
                <img src="/uploads/1759679918404-cool-bicycle-outdoors.jpg" alt="Deal Bikes" className="w-48 h-32 object-cover rounded-lg" />
              </div>
            </div>
          </div>
          
          {/* Carousel Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentAdIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentAdIndex === index ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to ad ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Auto-play timer */}
          <div className="absolute top-4 right-4 text-white text-sm bg-black/20 px-3 py-1 rounded-full">
            Ad {currentAdIndex + 1} of 3
          </div>
        </div>

        <div className="flex gap-6">
          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)} />
          )}

          {/* Sidebar */}
          <div className={`
            lg:block lg:w-64 flex-shrink-0
            ${isSidebarOpen ? 'fixed inset-y-0 left-0 z-50 w-80 bg-white' : 'hidden'}
          `}>
            <div className="bg-white rounded-lg shadow-sm border h-fit sticky top-24">
              {/* Mobile Sidebar Header */}
              {isSidebarOpen && (
                <div className="lg:hidden flex items-center justify-between p-4 border-b">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              )}

              <div className="p-6 space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setTypeFilter(category.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                          typeFilter === category.id
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{category.icon}</span>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">({category.count})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={3000}
                      min={0}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Brands</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={brandFilter.includes(brand)}
                          onCheckedChange={(checked) => handleBrandFilter(brand, checked as boolean)}
                        />
                        <label htmlFor={brand} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Filters */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Filters</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="available" />
                      <label htmlFor="available" className="text-sm">Available Now</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="electric" />
                      <label htmlFor="electric" className="text-sm">Electric Only</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="nearby" />
                      <label htmlFor="nearby" className="text-sm">Nearby (&lt; 1km)</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Filter Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">All Bikes</h2>
                <p className="text-gray-600">{filteredBikes.length} bikes available</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Bikes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBikes.map((bike) => (
                <Card key={bike.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                  <Link href={`/customer-dashboard/bike/${bike.id}`}>
                    <div className="relative">
                      <img
                        src={bike.image}
                        alt={bike.name}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        {bike.discount && (
                          <Badge className="bg-orange-500 text-white font-semibold">-{bike.discount}%</Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(bike.id);
                        }}
                      >
                        <Heart className={`h-4 w-4 ${favorites.includes(bike.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                      </Button>
                      {!bike.available && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold">Out of Stock</span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link href={`/customer-dashboard/bike/${bike.id}`}>
                      <div className="mb-2">
                        <h3 className="font-semibold text-gray-900 mb-1 hover:text-orange-600 transition-colors line-clamp-1">
                          {bike.name}
                        </h3>
                        <p className="text-sm text-gray-600">{bike.brand}</p>
                      </div>
                      
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(bike.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">({bike.reviews})</span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-lg text-orange-600">${bike.price}</span>
                        {bike.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${bike.originalPrice}</span>
                        )}
                      </div>

                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        {bike.location} • {bike.distance}km away
                      </div>

                      <div className="text-xs text-gray-600 mb-3">
                        ${bike.hourlyRate}/hour {bike.battery && `• ${bike.battery}% battery`}
                      </div>
                    </Link>

                    <Button 
                      className="w-full bg-orange-500 hover:bg-orange-600" 
                      disabled={!bike.available}
                      onClick={() => {
                        // Direct rental - redirect to bike details for rental
                        window.location.href = `/customer-dashboard/bike/${bike.id}`;
                      }}
                    >
                      {bike.available ? 'Rent Now' : 'Out of Stock'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredBikes.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bikes found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Selling Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Award className="mr-2 h-6 w-6 text-yellow-500" />
              Top Selling
            </h2>
            <Button variant="ghost" className="text-orange-600 hover:text-orange-700">
              See All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topSellingBikes.map((bike, index) => (
              <Card key={bike.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/customer-dashboard/bike/${bike.id}`}>
                  <div className="relative">
                    <img
                      src={bike.image}
                      alt={bike.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-yellow-500 text-white">#{index + 1}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">{bike.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{bike.rating} ({bike.reviews} sold)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-orange-600">${bike.price}</span>
                      {bike.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">${bike.originalPrice}</span>
                      )}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Banner */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <Truck className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-blue-900 mb-2">Free Delivery</h3>
            <p className="text-sm text-blue-700">On orders above $100</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-green-900 mb-2">Secure Payments</h3>
            <p className="text-sm text-green-700">100% protected payments</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
            <Award className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-purple-900 mb-2">Quality Guarantee</h3>
            <p className="text-sm text-purple-700">Premium bike collection</p>
          </div>
        </div>
      </div>
    </div>
  );
}