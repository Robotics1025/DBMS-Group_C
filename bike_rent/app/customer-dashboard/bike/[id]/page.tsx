"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, MapPin, Clock, Battery, Zap, Shield, Heart, Search, User, Receipt, LogOut, Menu, ChevronRight, ShoppingCart, Plus, Minus, Package, Truck, RotateCcw, CreditCard, Check, MessageCircle, Home, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ChevronDown, Globe, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { DirectRentalDialog } from '@/components/DirectRentalDialog';
import { NotificationBell } from '@/components/NotificationBell';
import { useNotify } from '@/hooks/use-notify';
import { motion } from 'framer-motion';
import { Footer } from '@/components/footer';

export default function BikeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { notify } = useNotify();
  
  const [bike, setBike] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [rentalDuration, setRentalDuration] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const bikeId = params.id as string;

  // Fetch bike data from dedicated API endpoint
  useEffect(() => {
    const fetchBike = async () => {
      try {
        setLoading(true);
        console.log(`🔍 Fetching bike with ID: ${bikeId} from /api/bikes/${bikeId}`);
        
        const response = await fetch(`/api/bikes/${bikeId}`);
        const result = await response.json();
        
        console.log('📡 API Response:', result);
        
        if (result.success && result.bike) {
          const foundBike = result.bike;
          const rentalRate = Number(foundBike.RentalRatePerMinute) || 5;
          
          console.log('✅ Bike found:', foundBike);
          
          setBike({
            id: foundBike.BikeID.toString(),
            name: foundBike.Model,
            type: foundBike.BikeType,
            brand: 'BikeRental',
            price: Math.round(rentalRate * 60 / 100) || 5,
            dailyRate: Math.round(rentalRate * 60 * 24 / 100) || 30,
            rating: 4.0 + Math.random(),
            reviews: Math.floor(Math.random() * 200) + 50,
            location: foundBike.LocationName || 'Unknown Location',
            address: foundBike.Address || 'Address not available',
            city: foundBike.City || 'City not available',
            image: foundBike.bike_image || '/bike.jpg',
            images: foundBike.bike_image 
              ? [foundBike.bike_image, '/bike2.jpg', '/bike3.jpg']
              : ['/bike.jpg', '/bike2.jpg', '/bike3.jpg'],
            available: foundBike.CurrentStatus === 'Available',
            description: `Premium ${foundBike.BikeType} bike - ${foundBike.Model}. Perfect for your daily commute or weekend adventures. Features advanced technology and comfort design for maximum performance and reliability.`,
            specifications: {
              'Model': foundBike.Model,
              'Type': foundBike.BikeType,
              'Status': foundBike.CurrentStatus,
              'Location': foundBike.LocationName || 'N/A',
              'Serial Number': foundBike.BikeSerialNumber,
              'Last Maintenance': foundBike.LastMaintenanceDate ? new Date(foundBike.LastMaintenanceDate).toLocaleDateString() : 'N/A',
              'Rate per Minute': `$${rentalRate.toFixed(2)}`,
              'Hourly Rate': `$${Math.round(rentalRate * 60 / 100)}`,
            },
            features: foundBike.BikeType === 'Electric' 
              ? ['Electric Motor', 'Long Range Battery', 'GPS Tracking', 'LED Lights', 'Phone Holder', 'USB Charging Port']
              : ['Lightweight Frame', 'Comfort Seat', 'Gear System', 'Chain Guard', 'Reflectors', 'Safety Bell'],
            battery: foundBike.BikeType === 'Electric' ? 85 + Math.floor(Math.random() * 15) : undefined,
            range: foundBike.BikeType === 'Electric' ? 40 + Math.floor(Math.random() * 20) : undefined,
            rawData: foundBike
          });
          
          console.log('💾 Bike state updated successfully');
        } else {
          console.error('❌ Bike not found in API response');
          notify.error('Bike not found', 'The requested bike could not be found');
        }
      } catch (error) {
        console.error('❌ Error fetching bike:', error);
        notify.error('Failed to load bike', 'Please try again later');
      } finally {
        setLoading(false);
        console.log('🏁 Fetch complete');
      }
    };

    if (bikeId) {
      fetchBike();
    }
  }, [bikeId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bike details...</p>
        </div>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Bike Not Found</h1>
          <p className="text-gray-600 mb-6">The bike you're looking for doesn't exist</p>
          <Button onClick={() => router.push('/customer-dashboard')} className="bg-orange-500 hover:bg-orange-600">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bikes
          </Button>
        </div>
      </div>
    );
  }

  const bikeForRental = {
    BikeID: parseInt(bike.id),
    BikeSerialNumber: bike.rawData.BikeSerialNumber,
    Model: bike.name,
    BikeType: bike.type,
    RentalRatePerMinute: Number(bike.rawData.RentalRatePerMinute) || 5,
    CurrentStatus: bike.available ? 'Available' : 'Rented',
    LocationName: bike.location,
    Address: bike.address || '123 Main St',
    City: bike.city || 'Kampala'
  };

  const handleRentalSuccess = (rentalID: number) => {
    notify.success('Rental confirmed!', `Your rental ID is #${rentalID}`);
    setTimeout(() => {
      router.push(`/customer-dashboard/profile?rental=${rentalID}`);
    }, 1500);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    notify.info(
      isFavorite ? 'Removed from favorites' : 'Added to favorites',
      `${bike.name} ${isFavorite ? 'removed from' : 'added to'} your favorites`
    );
  };

  const calculateTotal = () => {
    return bike.price * rentalDuration;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Orange Header Bar - Alibaba Style */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Ship to Uganda</span>
              </div>
              <Link href="/customer-dashboard" className="hover:underline flex items-center gap-1">
                <Home className="h-4 w-4" />
                All Categories
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <span>Call us: +256-XXX-XXXX</span>
              <Link href="/customer-dashboard/profile" className="hover:underline">Help Center</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - White */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/customer-dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="h-10 w-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">BR</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">BikeRent</span>
            </Link>

            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search bikes, brands, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-2 border-orange-200 focus:border-orange-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <NotificationBell />
              
              <Link href="/customer-dashboard/profile">
                <Button variant="ghost" size="icon" className="relative hover:bg-orange-50">
                  <Receipt className="h-5 w-5" />
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 hover:bg-orange-50">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden md:block font-medium">Hi, {user?.name?.split(' ')[0]}</span>
                    <ChevronDown className="h-4 w-4" />
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
                      My Orders
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
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/customer-dashboard" className="hover:text-orange-600 flex items-center gap-1">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/customer-dashboard" className="hover:text-orange-600">All Bikes</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/customer-dashboard" className="hover:text-orange-600">{bike.type} Bikes</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">{bike.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Images */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Main Image */}
              <div className="relative aspect-[4/3] bg-gray-100">
                <img
                  src={bike.images[selectedImage]}
                  alt={bike.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/bike.jpg';
                  }}
                />
                
                {/* Badges on Image */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {bike.available ? (
                    <Badge className="bg-green-500 text-white text-sm shadow-lg">
                      <Check className="h-3 w-3 mr-1" />
                      In Stock
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500 text-white text-sm shadow-lg">Out of Stock</Badge>
                  )}
                  {bike.type === 'Electric' && (
                    <Badge className="bg-yellow-500 text-white text-sm shadow-lg">
                      <Zap className="h-3 w-3 mr-1" />
                      Electric
                    </Badge>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFavorite}
                  className={`absolute top-4 right-4 bg-white/90 hover:bg-white shadow-lg ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Thumbnail Images */}
              <div className="p-4 border-t">
                <div className="grid grid-cols-5 gap-3">
                  {bike.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-orange-400 ${
                        selectedImage === index ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details Tabs */}
              <div className="p-6 border-t">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews ({bike.reviews})</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Product Description</h3>
                      <p className="text-gray-700 leading-relaxed">{bike.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {bike.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                            <Check className="h-4 w-4 text-orange-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {bike.battery && (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Battery className="h-5 w-5 text-green-600" />
                          <h4 className="font-semibold text-gray-900">Battery & Range</h4>
                        </div>
                        <p className="text-gray-700">
                          Current battery level: <span className="font-bold text-green-600">{bike.battery}%</span> • 
                          Estimated range: <span className="font-bold">{bike.range}km</span>
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="specifications" className="space-y-3">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Technical Specifications</h3>
                    <div className="space-y-2">
                      {Object.entries(bike.specifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <span className="font-medium text-gray-700">{key}</span>
                          <span className="text-gray-900 font-semibold">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews">
                    <div className="text-center py-8">
                      <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-gray-900 mb-2">No Reviews Yet</h3>
                      <p className="text-gray-600">Be the first to review this bike!</p>
                      <div className="flex items-center justify-center gap-1 mt-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">Average rating: {bike.rating.toFixed(1)}/5.0</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-24"
            >
              <Card className="border-2 border-orange-200 shadow-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">{bike.name}</h2>
                      <p className="text-sm text-gray-600">{bike.type} Bike • Brand: {bike.brand}</p>
                    </div>
                    <Badge variant="outline" className="text-orange-600 border-orange-300">
                      #{bike.rawData?.BikeSerialNumber || bike.id}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Rating */}
                  <div className="flex items-center gap-2 pb-4 border-b">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(bike.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900">{bike.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500">({bike.reviews} reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="pb-4 border-b">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-orange-600">${bike.price}</span>
                      <span className="text-gray-600">/hour</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg line-through text-gray-400">${bike.price + 5}</span>
                      <Badge className="bg-red-100 text-red-700">-40% OFF</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Daily rate: ${bike.dailyRate}/day</p>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-2 pb-4 border-b">
                    <MapPin className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">{bike.location}</p>
                      <p className="text-sm text-gray-600">{bike.address}, {bike.city}</p>
                    </div>
                  </div>

                  {/* Service Guarantees - Alibaba Style */}
                  <div className="space-y-3 pb-4 border-b">
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Free pickup within 2km</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span className="text-gray-700">Fully insured & verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <RotateCcw className="h-4 w-4 text-purple-600" />
                      <span className="text-gray-700">Flexible cancellation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="h-4 w-4 text-orange-600" />
                      <span className="text-gray-700">Secure payment</span>
                    </div>
                  </div>

                  {/* Rental Duration Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rental Duration (hours)
                    </label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setRentalDuration(Math.max(1, rentalDuration - 1))}
                        className="border-orange-200"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 text-center">
                        <span className="text-2xl font-bold text-gray-900">{rentalDuration}</span>
                        <span className="text-sm text-gray-600 ml-1">hours</span>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setRentalDuration(rentalDuration + 1)}
                        className="border-orange-200"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">Total Cost:</span>
                      <span className="text-3xl font-bold text-orange-600">${calculateTotal()}</span>
                    </div>
                    <p className="text-xs text-gray-600">For {rentalDuration} hour(s) rental</p>
                  </div>

                  {/* Rental Button */}
                  <div className="space-y-3">
                    <DirectRentalDialog 
                      bike={bikeForRental}
                      onRentalSuccess={handleRentalSuccess}
                    />
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
                      onClick={() => notify.info('Added to wishlist', 'You can view it later in your profile')}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Add to Wishlist
                    </Button>

                    <Button 
                      variant="ghost" 
                      className="w-full text-orange-600 hover:bg-orange-50"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        notify.success('Link copied!', 'Share this bike with friends');
                      }}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Share with Friends
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Seller Info Card */}
              <Card className="mt-4 border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">About the Supplier</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">BR</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">BikeRent Official</p>
                      <div className="flex items-center gap-1">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">Verified Supplier</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Response Rate</span>
                      <span className="font-semibold text-gray-900">98%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Response Time</span>
                      <span className="font-semibold text-gray-900">&lt; 2 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Rentals</span>
                      <span className="font-semibold text-gray-900">5,000+</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact Supplier
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer - Alibaba Style */}
      <Footer />
    </div>
  );
}
