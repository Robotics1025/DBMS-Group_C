"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Star, Filter, Search, MapPin, Battery, Clock, CreditCard, Receipt, User, LogOut, Menu, X, ChevronRight, Award, Truck, Shield, ChevronDown, Home, Grid, Package, Zap, TrendingUp, Tag, ShoppingCart } from "lucide-react";
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
import { NotificationBell } from "@/components/NotificationBell";
import { Footer } from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";

interface Bike {
  id: string;
  serialNumber: string; // BikeSerialNumber
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
  distance?: number;
  image: string;
  available: boolean;
  features?: string[];
  description?: string;
  isFlashSale?: boolean;
  badge?: string;
}

export default function CustomerDashboard() {
  const { user, logout } = useAuth();
  const { notify } = useNotify();
  // Direct rental system - no cart needed
  
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [filteredBikes, setFilteredBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Memoize categories to prevent infinite re-renders
  const categories = React.useMemo(() => [
    { id: "all", name: "All Bikes", icon: Grid, count: bikes.length, color: "bg-blue-500" },
    { id: "electric", name: "Electric", icon: Zap, count: bikes.filter(b => b.type === "Electric").length, color: "bg-yellow-500" },
    { id: "mountain", name: "Mountain", icon: TrendingUp, count: bikes.filter(b => b.type === "Mountain").length, color: "bg-green-500" },
    { id: "city", name: "City", icon: Home, count: bikes.filter(b => b.type === "City").length, color: "bg-purple-500" },
    { id: "racing", name: "Racing", icon: Zap, count: bikes.filter(b => b.type === "Racing").length, color: "bg-red-500" },
    { id: "hybrid", name: "Hybrid", icon: Package, count: bikes.filter(b => b.type === "Hybrid").length, color: "bg-orange-500" },
  ], [bikes]);

  const bannerAds = [
    {
      id: 1,
      title: "Summer Sale",
      subtitle: "Up to 50% OFF on Electric Bikes",
      image: "/bike2.jpg",
      cta: "Shop Now",
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Check out our latest mountain bikes",
      image: "/bike3.jpg",
      cta: "Explore",
      gradient: "from-green-500 to-teal-500"
    },
    {
      id: 3,
      title: "Flash Deal",
      subtitle: "Limited time offer on city bikes",
      image: "/bike.jpg",
      cta: "Get Offer",
      gradient: "from-blue-500 to-purple-500"
    }
  ];

  const brands = React.useMemo(() => 
    Array.from(new Set(bikes.map(bike => bike.brand))).filter(Boolean),
    [bikes]
  );

  const locations = React.useMemo(() => 
    Array.from(new Set(bikes.map(bike => bike.location))).filter(Boolean).sort(),
    [bikes]
  );
  
  // Memoize top categories to prevent infinite re-renders
  const topCategories = React.useMemo(() => [
    { 
      name: "Electric Bikes", 
      count: bikes.filter(b => b.type === "Electric").length,
      image: bikes.find(b => b.type === "Electric")?.image || "/bike2.jpg",
      icon: Zap,
      color: "from-yellow-400 to-orange-500"
    },
    { 
      name: "Mountain Bikes", 
      count: bikes.filter(b => b.type === "Mountain").length,
      image: bikes.find(b => b.type === "Mountain")?.image || "/bike3.jpg",
      icon: TrendingUp,
      color: "from-green-400 to-teal-500"
    },
    { 
      name: "City Bikes", 
      count: bikes.filter(b => b.type === "City").length,
      image: bikes.find(b => b.type === "City")?.image || "/bike.jpg",
      icon: Home,
      color: "from-blue-400 to-purple-500"
    },
    { 
      name: "Racing Bikes", 
      count: bikes.filter(b => b.type === "Racing").length,
      image: bikes.find(b => b.type === "Racing")?.image || "/bike2.jpg",
      icon: Zap,
      color: "from-red-400 to-pink-500"
    },
    { 
      name: "Hybrid Bikes", 
      count: bikes.filter(b => b.type === "Hybrid").length,
      image: bikes.find(b => b.type === "Hybrid")?.image || "/bike3.jpg",
      icon: Package,
      color: "from-purple-400 to-indigo-500"
    },
  ].filter(cat => cat.count > 0), [bikes]); // Only show categories with bikes

  // Fetch bikes from API
  useEffect(() => {
    const fetchBikes = async () => {
      console.log('🚀 [FETCH START] Setting loading to TRUE');
      setLoading(true);
      
      try {
        console.log('📡 [FETCH] Calling /api/bike_all...');
        const response = await fetch('/api/bike_all');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('✅ [API SUCCESS] Response:', result);
        
        // Check if the API response has the expected structure
        if (!result.success || !Array.isArray(result.bikes)) {
          console.error('❌ [ERROR] Invalid response structure:', result);
          throw new Error('Invalid API response structure');
        }
        
        console.log(`📊 [DATA] Raw bikes from API: ${result.bikes.length}`);
        
        // Transform API data to match our interface - Show ALL bikes (no deduplication)
        const transformedBikes = result.bikes.map((bike: any) => {
          const rentalRate = Number(bike.RentalRatePerMinute) || 5;
          return {
            id: bike.BikeID?.toString() || 'unknown',
            serialNumber: bike.BikeSerialNumber || 'N/A',
            name: bike.Model || 'Bike',
            type: bike.BikeType || 'City',
            brand: 'BikeRental',
            price: Math.round(rentalRate * 60 * 24 / 100) || 30, // Daily rate
            hourlyRate: Math.round(rentalRate * 60 / 100) || 5, // Hourly rate
            rating: 4.0 + Math.random(),
            reviews: Math.floor(Math.random() * 100) + 10,
            location: bike.LocationName || 'Station',
            image: bike.bike_image || '/bike.jpg',
            available: bike.CurrentStatus === 'Available',
            description: `${bike.BikeType} ${bike.Model}`,
            features: bike.BikeType === 'Electric' ? ['Electric Motor', 'Long Range'] : ['Lightweight', 'Durable'],
            battery: bike.BikeType === 'Electric' ? 85 + Math.floor(Math.random() * 15) : undefined,
            range: bike.BikeType === 'Electric' ? 40 + Math.floor(Math.random() * 20) : undefined,
            distance: Math.floor(Math.random() * 10) + 1
          };
        });
        
        console.log(`🔄 [TRANSFORM] Showing ALL ${transformedBikes.length} bikes:`, transformedBikes);
        
        console.log('💾 [STATE] Setting bikes state...');
        setBikes(transformedBikes);
        setFilteredBikes(transformedBikes);
        
        console.log('✨ [SUCCESS] Data fetch and transform complete');
      } catch (error) {
        console.error('❌ [ERROR] Error fetching bikes:', error);
        notify.error('Failed to load bikes', 'Please try refreshing the page');
        setBikes([]);
        setFilteredBikes([]);
      } finally {
        console.log('🏁 [FETCH END] Setting loading to FALSE');
        setLoading(false);
        console.log('🏁 [FETCH END] Loading state should now be false');
      }
    };

    fetchBikes();
  }, []); // Empty dependency array - only run once on mount
  
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
        bike.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bike.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(bike => bike.type.toLowerCase() === typeFilter.toLowerCase());
    }

    if (locationFilter !== "all") {
      filtered = filtered.filter(bike => bike.location === locationFilter);
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
        case "location": return a.location.localeCompare(b.location);
        case "newest": return 0;
        default: return 0;
      }
    });

    setFilteredBikes(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [bikes, searchTerm, typeFilter, locationFilter, brandFilter, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredBikes.length / ITEMS_PER_PAGE);
  const paginatedBikes = filteredBikes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Top Header Bar */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <Truck className="h-4 w-4 mr-1" />
                Free Delivery on orders above $100
              </span>
              <span className="hidden md:flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                100% Secure Payments
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/customer-dashboard/profile" className="hover:underline flex items-center">
                <Receipt className="h-4 w-4 mr-1" />
                My Orders
              </Link>
              <Link href="/customer-dashboard/profile" className="hover:underline flex items-center">
                <User className="h-4 w-4 mr-1" />
                Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden mr-2"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <div className="flex items-center">
                <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">BR</span>
                </div>
                <div className="ml-3">
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">BikeRent</span>
                  <p className="text-xs text-gray-500">Your Trusted Bike Partner</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for bikes, brands, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 h-12 border-2 border-gray-200 rounded-full focus:border-orange-500 transition-all"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
                  Search
                </Button>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-2">
              <NotificationBell />
              
              <Button variant="ghost" size="icon" className="relative hover:bg-orange-50 rounded-full">
                <Heart className="h-5 w-5 text-gray-700" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-orange-50 rounded-full px-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="text-xs text-gray-500">Hello,</div>
                      <div className="font-semibold text-sm">{user?.name?.split(' ')[0]}</div>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">{user?.name}</div>
                        <div className="text-sm text-muted-foreground">{user?.email}</div>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/customer-dashboard/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/customer-dashboard/profile" className="flex items-center">
                      <Receipt className="mr-2 h-4 w-4" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center">
                    <Heart className="mr-2 h-4 w-4" />
                    Favorites ({favorites.length})
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/customer-dashboard/profile" className="flex items-center">
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
        
        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search bikes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">Bike Rentals</span>
        </div>

        {/* Category Pills */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setTypeFilter(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    typeFilter === category.id
                      ? 'border-orange-500 bg-orange-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-md'
                  }`}
                >
                  <div className={`h-12 w-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-gray-900">{category.name}</div>
                  <div className="text-xs text-gray-500">{category.count} bikes</div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Banner Carousel */}
        <div className="mb-8 relative overflow-hidden rounded-2xl shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAdIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className={`relative h-80 bg-gradient-to-r ${bannerAds[currentAdIndex].gradient} overflow-hidden`}
            >
              <div className="absolute inset-0 flex items-center justify-between px-12">
                <div className="text-white max-w-xl">
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl font-bold mb-4"
                  >
                    {bannerAds[currentAdIndex].title}
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl mb-6 opacity-90"
                  >
                    {bannerAds[currentAdIndex].subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 shadow-lg">
                      {bannerAds[currentAdIndex].cta}
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </div>
                <div className="hidden lg:block">
                  <img
                    src={bannerAds[currentAdIndex].image}
                    alt={bannerAds[currentAdIndex].title}
                    className="h-72 w-auto object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {bannerAds.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAdIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                title={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  index === currentAdIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className={`${isSidebarOpen ? 'fixed' : 'hidden'} lg:block lg:sticky top-24 h-fit w-64 bg-white rounded-xl shadow-lg border p-6 z-40`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center">
                <Filter className="mr-2 h-5 w-5 text-orange-500" />
                Filters
              </h3>
              {isSidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Price Range */}
            <div className="mb-6 pb-6 border-b">
              <h4 className="font-semibold mb-4 flex items-center">
                <Tag className="mr-2 h-4 w-4 text-orange-500" />
                Price Range
              </h4>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  step={10}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm font-medium">
                  <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg">${priceRange[0]}</span>
                  <span className="text-gray-400">to</span>
                  <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg">${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6 pb-6 border-b">
              <h4 className="font-semibold mb-4 flex items-center">
                <Award className="mr-2 h-4 w-4 text-orange-500" />
                Brand
              </h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {brands.slice(0, 8).map((brand) => (
                  <label key={brand} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <Checkbox
                      checked={brandFilter.includes(brand)}
                      onCheckedChange={(checked) => handleBrandFilter(brand, checked as boolean)}
                      className="border-orange-300"
                    />
                    <span className="text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <Package className="mr-2 h-4 w-4 text-orange-500" />
                Availability
              </h4>
              <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <Checkbox className="border-orange-300" />
                <span className="text-sm text-gray-700">In Stock Only</span>
              </label>
            </div>

            {/* Clear Filters */}
            <Button
              variant="outline"
              className="w-full border-orange-500 text-orange-600 hover:bg-orange-50"
              onClick={() => {
                setSearchTerm("");
                setTypeFilter("all");
                setBrandFilter([]);
                setPriceRange([0, 500]);
              }}
            >
              Clear All Filters
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and View Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white rounded-xl shadow-sm border p-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Package className="mr-2 h-6 w-6 text-orange-500" />
                  All Bikes
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold text-orange-600">{filteredBikes.length}</span> products found
                  {bikes.length !== filteredBikes.length && (
                    <span className="text-gray-500"> (filtered from {bikes.length} total)</span>
                  )}
                </p>
                {loading && <p className="text-xs text-blue-600 mt-1">Loading bikes...</p>}
              </div>
              
              <div className="flex items-center gap-3">
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-52 border-orange-200 focus:border-orange-500">
                    <MapPin className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          {location}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-52 border-orange-200 focus:border-orange-500">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">
                      <div className="flex items-center">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Most Popular
                      </div>
                    </SelectItem>
                    <SelectItem value="location">
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        Sort by Location
                      </div>
                    </SelectItem>
                    <SelectItem value="price-low">
                      <div className="flex items-center">
                        <Tag className="mr-2 h-4 w-4" />
                        Price: Low to High
                      </div>
                    </SelectItem>
                    <SelectItem value="price-high">
                      <div className="flex items-center">
                        <Tag className="mr-2 h-4 w-4" />
                        Price: High to Low
                      </div>
                    </SelectItem>
                    <SelectItem value="rating">
                      <div className="flex items-center">
                        <Star className="mr-2 h-4 w-4" />
                        Highest Rated
                      </div>
                    </SelectItem>
                    <SelectItem value="newest">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        Newest First
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  className="lg:hidden border-orange-500 text-orange-600"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Bikes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                // Loading skeletons
                Array.from({ length: 8 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="w-full h-64 bg-gray-200 animate-pulse" />
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2" />
                        <div className="h-10 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : paginatedBikes.length > 0 ? (
                paginatedBikes.map((bike) => (
                <motion.div
                  key={bike.serialNumber}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-orange-200">
                    <Link href={`/customer-dashboard/bike/${bike.serialNumber}`}>
                      <div className="relative overflow-hidden">
                        <img
                          src={bike.image}
                          alt={bike.name}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = '/bike.jpg';
                          }}
                        />
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {bike.discount && (
                            <Badge className="bg-red-500 text-white font-bold shadow-lg">
                              -{bike.discount}% OFF
                            </Badge>
                          )}
                          {bike.isFlashSale && (
                            <Badge className="bg-yellow-500 text-white font-bold shadow-lg animate-pulse">
                              ⚡ Flash Sale
                            </Badge>
                          )}
                          {bike.badge && (
                            <Badge className="bg-blue-500 text-white font-semibold shadow-lg">
                              {bike.badge}
                            </Badge>
                          )}
                          <Badge variant="secondary" className="bg-white/90 text-gray-700 text-xs">
                            #{bike.serialNumber}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 bg-white/90 hover:bg-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(bike.id);
                          }}
                        >
                          <Heart className={`h-5 w-5 ${favorites.includes(bike.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                        </Button>
                        {!bike.available && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                            <div className="text-center">
                              <span className="text-white font-bold text-lg">Out of Stock</span>
                              <p className="text-white/80 text-sm mt-1">Check back soon</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <Link href={`/customer-dashboard/bike/${bike.serialNumber}`}>
                        <div className="mb-3">
                          <h3 className="font-bold text-gray-900 mb-1 hover:text-orange-600 transition-colors line-clamp-2 text-lg">
                            {bike.name}
                          </h3>
                          <p className="text-sm text-gray-500 font-medium">{bike.brand}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(bike.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 font-medium">
                            {bike.rating.toFixed(1)} ({bike.reviews})
                          </span>
                        </div>

                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="font-bold text-2xl text-orange-600">${bike.price}</span>
                          {bike.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">${bike.originalPrice}</span>
                          )}
                          <span className="text-xs text-gray-500 font-medium">/day</span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pb-3 border-b">
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1 text-orange-500" />
                            {bike.location}
                          </span>
                          {bike.battery && (
                            <span className="flex items-center text-green-600 font-medium">
                              <Battery className="h-3 w-3 mr-1" />
                              {bike.battery}%
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs mb-3">
                          <Badge variant="secondary" className="bg-orange-50 text-orange-600">
                            ${bike.hourlyRate}/hr
                          </Badge>
                          {bike.range && (
                            <Badge variant="secondary" className="bg-blue-50 text-blue-600">
                              {bike.range}km range
                            </Badge>
                          )}
                        </div>
                      </Link>

                      <Button 
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all" 
                        disabled={!bike.available}
                        onClick={() => {
                          window.location.href = `/customer-dashboard/bike/${bike.serialNumber}`;
                        }}
                      >
                        {bike.available ? (
                          <>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Rent Now
                          </>
                        ) : 'Out of Stock'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : null}
              
              {/* Empty State */}
              {!loading && filteredBikes.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mb-6">
                    <Search className="h-16 w-16 text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No bikes found</h3>
                  <p className="text-gray-600 mb-8 max-w-md text-lg">
                    {searchTerm || typeFilter !== "all" || brandFilter.length > 0 
                      ? "Try adjusting your filters or search terms to find more bikes."
                      : "There are no bikes available at the moment. Please check back later."
                    }
                  </p>
                  {(searchTerm || typeFilter !== "all" || brandFilter.length > 0) && (
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      onClick={() => {
                        setSearchTerm("");
                        setTypeFilter("all");
                        setBrandFilter([]);
                        setPriceRange([0, 500]);
                      }}
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Pagination */}
            {!loading && filteredBikes.length > 0 && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12 mb-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-orange-200 hover:bg-orange-50"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </Button>

                {/* First page */}
                {currentPage > 3 && (
                  <>
                    <Button
                      variant={currentPage === 1 ? "default" : "outline"}
                      className={currentPage === 1 ? "bg-gradient-to-r from-orange-500 to-red-500" : "border-orange-200 hover:bg-orange-50"}
                      onClick={() => handlePageChange(1)}
                    >
                      1
                    </Button>
                    {currentPage > 4 && <span className="px-2 text-gray-500">...</span>}
                  </>
                )}

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    return page === currentPage || 
                           page === currentPage - 1 || 
                           page === currentPage + 1 ||
                           (currentPage <= 2 && page <= 3) ||
                           (currentPage >= totalPages - 1 && page >= totalPages - 2);
                  })
                  .map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      className={currentPage === page 
                        ? "bg-gradient-to-r from-orange-500 to-red-500 min-w-[40px]" 
                        : "border-orange-200 hover:bg-orange-50 min-w-[40px]"}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}

                {/* Last page */}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && <span className="px-2 text-gray-500">...</span>}
                    <Button
                      variant={currentPage === totalPages ? "default" : "outline"}
                      className={currentPage === totalPages ? "bg-gradient-to-r from-orange-500 to-red-500" : "border-orange-200 hover:bg-orange-50"}
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border-orange-200 hover:bg-orange-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                <span className="ml-4 text-sm text-gray-600">
                  Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredBikes.length)} of {filteredBikes.length} bikes
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Top Categories Section - Alibaba Style */}
        {topCategories.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 flex items-center mb-2">
                  <Grid className="mr-3 h-8 w-8 text-orange-500" />
                  Top Categories
                </h2>
                <p className="text-gray-600">Browse bikes by popular categories</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {topCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="cursor-pointer"
                    onClick={() => setTypeFilter(category.name.split(' ')[0].toLowerCase())}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all group border-2 border-transparent hover:border-orange-200">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = '/bike.jpg';
                          }}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                          <IconComponent className="h-10 w-10 mb-2" />
                          <h3 className="font-bold text-lg text-center px-2">{category.name}</h3>
                          <Badge className="mt-2 bg-white text-gray-900 font-semibold">
                            {category.count} bikes
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}