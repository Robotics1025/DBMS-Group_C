"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, MapPin, Clock, Battery, Zap, Shield, Heart, Search, User, Receipt, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/AuthContext';
import { DirectRentalDialog } from '@/components/DirectRentalDialog';
import { NotificationBell } from '@/components/NotificationBell';

// Mock bike data - in real app this would come from API
const bikeData: { [key: string]: any } = {
  'BK001': {
    id: 'BK001',
    name: 'Urban E-Cruiser',
    type: 'Electric',
    price: 15,
    rating: 4.8,
    reviews: 124,
    image: '/uploads/1759650691759-cool-bicycle-outdoors.jpg',
    images: [
      '/uploads/1759650691759-cool-bicycle-outdoors.jpg',
      '/uploads/1759677670759-cool-bicycle-outdoors.jpg',
      '/uploads/1759679918404-cool-bicycle-outdoors.jpg',
    ],
    description: 'Perfect for city commuting with long battery life and comfortable ride. Features advanced electric motor and GPS tracking.',
    specifications: {
      'Frame Material': 'Aluminum Alloy',
      'Motor Type': 'Electric Hub Motor',
      'Battery': '36V 10Ah Lithium',
      'Max Speed': '25 km/h',
      'Weight': '22 kg',
      'Max Load': '120 kg',
      'Battery Life': '8+ hours',
      'Range': '45 km'
    },
    features: [
      'GPS Tracking',
      'Electric Motor', 
      'LED Lights',
      'Phone Holder',
      'Anti-theft Lock',
      'USB Charging Port'
    ],
    availability: 'Available',
    location: 'Central Station',
    distance: '0.5 km away',
    battery: 85,
    range: 45
  },
  'BK002': {
    id: 'BK002',
    name: 'Mountain Explorer',
    type: 'Mountain',
    price: 12,
    rating: 4.6,
    reviews: 89,
    image: '/uploads/1759677670759-cool-bicycle-outdoors.jpg',
    images: [
      '/uploads/1759677670759-cool-bicycle-outdoors.jpg',
      '/uploads/1759679918404-cool-bicycle-outdoors.jpg',
      '/uploads/1759650691759-cool-bicycle-outdoors.jpg',
    ],
    description: 'Built for adventures with robust frame and superior grip. Perfect for mountain trails and rugged terrains.',
    specifications: {
      'Frame Material': 'Carbon Fiber',
      'Gear System': '21-Speed Shimano',
      'Brake Type': 'Hydraulic Disc',
      'Wheel Size': '29 inches',
      'Weight': '12.5 kg',
      'Max Load': '120 kg',
      'Suspension': 'Front & Rear',
      'Tire Type': 'All-Terrain Knobby'
    },
    features: [
      'Shock Absorption',
      'All-Terrain Tires',
      'Gear System',
      'Water Bottle Holder',
      'Adjustable Seat',
      'Chain Guard'
    ],
    availability: 'Available',
    location: 'North Park Station',
    distance: '1.2 km away'
  },
  'BK003': {
    id: 'BK003',
    name: 'City Commuter',
    type: 'City',
    price: 8,
    rating: 4.4,
    reviews: 156,
    image: '/uploads/1759679918404-cool-bicycle-outdoors.jpg',
    images: [
      '/uploads/1759679918404-cool-bicycle-outdoors.jpg',
      '/uploads/1759650691759-cool-bicycle-outdoors.jpg',
      '/uploads/1759677670759-cool-bicycle-outdoors.jpg',
    ],
    description: 'Ideal for daily commuting with lightweight design and storage. Perfect for city streets and urban environments.',
    specifications: {
      'Frame Material': 'Steel Frame',
      'Gear System': '7-Speed',
      'Brake Type': 'V-Brake',
      'Wheel Size': '26 inches',
      'Weight': '15 kg',
      'Max Load': '100 kg',
      'Basket Capacity': '10 kg',
      'Frame Style': 'Step-Through'
    },
    features: [
      'Lightweight Design',
      'Front Basket',
      'Comfort Seat',
      'Chain Guard',
      'Reflectors',
      'Bell'
    ],
    availability: 'Available',
    location: 'Downtown Station',
    distance: '0.8 km away'
  },
  'BK004': {
    id: 'BK004',
    name: 'Speed Demon E-Bike',
    type: 'Electric',
    price: 20,
    rating: 4.9,
    reviews: 67,
    image: '/uploads/1759681502051-cool-bicycle-outdoors.jpg',
    images: [
      '/uploads/1759681502051-cool-bicycle-outdoors.jpg',
      '/uploads/1759682060322-cool-bicycle-outdoors.jpg',
      '/uploads/1759682111176-cool-bicycle-outdoors.jpg',
    ],
    description: 'High-performance e-bike for speed enthusiasts. Premium battery and carbon frame for ultimate performance.',
    specifications: {
      'Frame Material': 'Carbon Fiber',
      'Motor Type': 'Mid-Drive Motor',
      'Battery': '48V 14Ah Lithium',
      'Max Speed': '45 km/h',
      'Weight': '18 kg',
      'Max Load': '120 kg',
      'Battery Life': '6+ hours',
      'Range': '60 km'
    },
    features: [
      'High Speed Motor',
      'Premium Battery',
      'Carbon Frame',
      'Sport Mode',
      'Digital Display',
      'Regenerative Braking'
    ],
    availability: 'Not Available',
    location: 'Tech Hub Station',
    distance: '2.1 km away',
    battery: 92,
    range: 60
  },
  'BK005': {
    id: 'BK005',
    name: 'Hybrid Comfort',
    type: 'Hybrid',
    price: 10,
    rating: 4.5,
    reviews: 203,
    image: '/uploads/1759682651471-cool-bicycle-outdoors.jpg',
    images: [
      '/uploads/1759682651471-cool-bicycle-outdoors.jpg',
      '/uploads/1759682756126-cool-bicycle-outdoors.jpg',
      '/uploads/1759650691759-cool-bicycle-outdoors.jpg',
    ],
    description: 'Versatile bike combining comfort and performance. Perfect for both city commuting and light trail riding.',
    specifications: {
      'Frame Material': 'Aluminum Hybrid',
      'Gear System': '18-Speed',
      'Brake Type': 'Disc Brake',
      'Wheel Size': '700c',
      'Weight': '13.5 kg',
      'Max Load': '110 kg',
      'Suspension': 'Front Suspension',
      'Tire Type': 'Hybrid Tires'
    },
    features: [
      'Adjustable Seat',
      'Multi-Gear System',
      'Puncture Resistant Tires',
      'Reflectors',
      'Water Bottle Mount',
      'Comfort Grips'
    ],
    availability: 'Available',
    location: 'Mall Station',
    distance: '1.5 km away'
  }
};

export default function BikeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addNotification } = useNotifications();
  const { user, logout } = useAuth();
  // Using direct rental system - no cart needed
  const [selectedImage, setSelectedImage] = useState(0);
  // Removed unused state variables for direct rental system
  const [isFavorite, setIsFavorite] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const bikeId = params.id as string;
  const bike = bikeData[bikeId];

  if (!bike) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Bike Not Found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  // Convert mock data to match Prisma schema format
  const bikeForRental = {
    BikeID: parseInt(bike.id.replace('BK', '')),
    BikeSerialNumber: bike.id,
    Model: bike.name,
    BikeType: bike.type,
    RentalRatePerMinute: bike.price / 60, // Convert hourly to per-minute rate
    CurrentStatus: bike.availability === 'Available' ? 'Available' : 'Rented',
    LocationName: bike.location,
    Address: '123 Main St',
    City: 'Kampala'
  };

  const handleRentalSuccess = (rentalID: number) => {
    // Redirect to rental confirmation or profile page
    router.push(`/customer-dashboard/profile?rental=${rentalID}`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    addNotification({
      type: isFavorite ? 'info' : 'success',
      title: isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
      message: `${bike.name} ${isFavorite ? 'removed from' : 'added to'} your favorites.`
    });
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-orange-200 text-orange-600 hover:bg-orange-50"
                    onClick={() => router.back()}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Bikes
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => {
                      // Scroll to rental section
                      document.getElementById('rental-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
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
                    Favorites
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
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Bikes
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => {
                document.getElementById('rental-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Clock className="h-4 w-4 mr-1" />
              Rent Now
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/customer-dashboard" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/customer-dashboard" className="hover:text-orange-600">Bikes</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900">{bike.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border">
              <img
                src={bike.images[selectedImage]}
                alt={bike.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                {bike.availability === 'Available' ? (
                  <Badge className="bg-green-500 text-white">In Stock</Badge>
                ) : (
                  <Badge className="bg-red-500 text-white">Out of Stock</Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFavorite}
                className={`absolute top-4 right-4 bg-white/80 hover:bg-white ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {bike.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-orange-300 ${
                    selectedImage === index ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${bike.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Bike Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span>{bike.type} Bike</span>
                <span>•</span>
                <span>Brand: CityBike</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{bike.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
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
                  <span className="text-sm font-medium ml-1">{bike.rating}</span>
                  <span className="text-sm text-gray-500">({bike.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{bike.location} • {bike.distance}</span>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{bike.description}</p>
            </div>

            {/* Pricing Card */}
            <Card className="border-2 border-orange-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-orange-600">${bike.price}</div>
                    <div className="text-sm text-gray-600">per hour</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Special Price</div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg line-through text-gray-400">${bike.price + 5}</span>
                      <Badge className="bg-red-100 text-red-700 text-xs">Save $5</Badge>
                    </div>
                  </div>
                </div>
                
                {/* Battery Info for Electric Bikes */}
                {bike.battery && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg mb-4">
                    <Battery className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700">
                      {bike.battery}% Battery • {bike.range}km Range
                    </span>
                  </div>
                )}

                {/* Availability */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-700 font-medium">Available Now</span>
                  <span className="text-xs text-gray-500">• Free pickup within 2km</span>
                </div>
              </CardContent>
            </Card>

            {/* Direct Rental Section */}
            <div id="rental-section">
              <DirectRentalDialog 
                bike={bikeForRental}
                onRentalSuccess={handleRentalSuccess}
              />
            </div>
          </div>
        </div>

        {/* Features & Specifications */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Features */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="w-5 h-5 text-orange-500" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 gap-3">
                {bike.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-orange-500" />
                Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <dl className="space-y-3">
                {Object.entries(bike.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-3 px-3 bg-gray-50 rounded-lg">
                    <dt className="font-medium text-gray-700">{key}</dt>
                    <dd className="text-gray-900 font-semibold">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}