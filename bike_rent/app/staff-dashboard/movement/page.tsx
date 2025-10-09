'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  ArrowUpDown, 
  Search, 
  Filter, 
  Plus,
  MapPin,
  Calendar,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Navigation,
  ArrowRight,
  History
} from "lucide-react";

interface Station {
  StationID: number;
  StationName: string;
  Location: string;
  BikeCount: number;
  Capacity: number;
}

interface Bike {
  BikeID: number;
  BikeSerialNumber: string;
  Model: string;
  Status: string;
  StationID: number;
  StationName: string;
}

interface Movement {
  MovementID: number;
  BikeSerialNumber: string;
  BikeModel: string;
  FromStation: string;
  ToStation: string;
  MovementDate: string;
  StaffName: string;
  Status: string;
  Reason: string;
  Notes?: string;
}

interface MovementRequest {
  BikeID: number;
  FromStationID: number;
  ToStationID: number;
  Reason: string;
  Notes?: string;
}

const MOVEMENT_REASONS = [
  'Rebalancing',
  'Maintenance Transfer',
  'Customer Request',
  'Station Closure',
  'Seasonal Adjustment',
  'Event Preparation',
  'Other'
];

const STATUS_COLORS = {
  'Scheduled': 'bg-blue-100 text-blue-800',
  'In Transit': 'bg-yellow-100 text-yellow-800',
  'Completed': 'bg-green-100 text-green-800',
  'Cancelled': 'bg-gray-100 text-gray-800'
};

export default function MovementPage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [stationFilter, setStationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showMovementDialog, setShowMovementDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [movementForm, setMovementForm] = useState<MovementRequest>({
    BikeID: 0,
    FromStationID: 0,
    ToStationID: 0,
    Reason: '',
    Notes: ''
  });

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [stationsResponse, bikesResponse, movementsResponse] = await Promise.all([
        fetch('/api/stations'),
        fetch('/api/bikes'),
        fetch('/api/movement/history')
      ]);

      if (stationsResponse.ok) {
        const stationsData = await stationsResponse.json();
        setStations(stationsData.stations || []);
      }

      if (bikesResponse.ok) {
        const bikesData = await bikesResponse.json();
        setBikes(bikesData.bikes || []);
      }

      if (movementsResponse.ok) {
        const movementsData = await movementsResponse.json();
        setMovements(movementsData.movements || []);
      }
    } catch (error) {
      console.error('Error fetching movement data:', error);
      toast.error('Failed to load movement data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter bikes based on search and station
  const filteredBikes = bikes.filter(bike => {
    const matchesSearch = bike.BikeSerialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bike.Model.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStation = stationFilter === 'all' || bike.StationID.toString() === stationFilter;
    
    // Only show available bikes for movement
    return matchesSearch && matchesStation && bike.Status === 'Available';
  });

  // Handle movement request submission
  const handleMovementRequest = async () => {
    if (!selectedBike || !movementForm.ToStationID || !movementForm.Reason) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (movementForm.FromStationID === movementForm.ToStationID) {
      toast.error('Source and destination stations must be different');
      return;
    }

    try {
      const response = await fetch('/api/movement/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...movementForm,
          BikeID: selectedBike.BikeID,
          FromStationID: selectedBike.StationID
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success('Movement request created successfully');
        setShowMovementDialog(false);
        setMovementForm({
          BikeID: 0,
          FromStationID: 0,
          ToStationID: 0,
          Reason: '',
          Notes: ''
        });
        fetchData(); // Refresh data
      } else {
        toast.error(result.message || 'Failed to create movement request');
      }
    } catch (error) {
      console.error('Error creating movement request:', error);
      toast.error('Failed to create movement request');
    }
  };

  // Open movement dialog for selected bike
  const openMovementDialog = (bike: Bike) => {
    setSelectedBike(bike);
    setMovementForm({
      BikeID: bike.BikeID,
      FromStationID: bike.StationID,
      ToStationID: 0,
      Reason: '',
      Notes: ''
    });
    setShowMovementDialog(true);
  };

  // Get movement statistics
  const getMovementStats = () => {
    const pendingMovements = movements.filter(m => m.Status === 'Scheduled' || m.Status === 'In Transit').length;
    const completedToday = movements.filter(m => {
      const today = new Date().toDateString();
      return m.Status === 'Completed' && new Date(m.MovementDate).toDateString() === today;
    }).length;
    
    return { pendingMovements, completedToday };
  };

  const stats = getMovementStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading movement data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bike Movement Tracking</h1>
          <p className="text-gray-600">Manage bike relocations between stations</p>
        </div>
        <Button 
          onClick={() => setShowHistoryDialog(true)}
          variant="outline"
        >
          <History className="w-4 h-4 mr-2" />
          View History
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Movements</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.pendingMovements}</div>
            <p className="text-xs text-gray-600">Scheduled or in transit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completedToday}</div>
            <p className="text-xs text-gray-600">Movements finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Bikes</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{filteredBikes.length}</div>
            <p className="text-xs text-gray-600">Ready for movement</p>
          </CardContent>
        </Card>
      </div>

      {/* Station Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Station Overview</CardTitle>
          <CardDescription>Current bike distribution across stations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stations.map((station) => (
              <div key={station.StationID} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{station.StationName}</h4>
                  <Badge variant={station.BikeCount > station.Capacity * 0.8 ? 'destructive' : 'default'}>
                    {station.BikeCount}/{station.Capacity}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">{station.Location}</div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      station.BikeCount > station.Capacity * 0.8 
                        ? 'bg-red-500' 
                        : station.BikeCount > station.Capacity * 0.6 
                          ? 'bg-yellow-500' 
                          : 'bg-green-500'
                    }`}
                  >
                    <div className="h-full rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search bikes by serial number or model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={stationFilter} onValueChange={setStationFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by station" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stations</SelectItem>
            {stations.map((station) => (
              <SelectItem key={station.StationID} value={station.StationID.toString()}>
                {station.StationName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bikes Available for Movement */}
      <Card>
        <CardHeader>
          <CardTitle>Available Bikes for Movement</CardTitle>
          <CardDescription>Select a bike to schedule a movement</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredBikes.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              No available bikes found for movement
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBikes.map((bike) => (
                <Card key={bike.BikeID} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium">{bike.BikeSerialNumber}</h4>
                        <p className="text-sm text-gray-600">{bike.Model}</p>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {bike.StationName}
                      </div>

                      <Badge className="bg-green-100 text-green-800">
                        {bike.Status}
                      </Badge>

                      <Button
                        onClick={() => openMovementDialog(bike)}
                        className="w-full"
                        variant="outline"
                      >
                        <ArrowUpDown className="w-4 h-4 mr-2" />
                        Schedule Movement
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Movement Request Dialog */}
      <Dialog open={showMovementDialog} onOpenChange={setShowMovementDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Bike Movement</DialogTitle>
            <DialogDescription>
              {selectedBike && `Moving bike: ${selectedBike.BikeSerialNumber}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>From Station</Label>
              <Input
                value={selectedBike ? selectedBike.StationName : ''}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div className="flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>

            <div>
              <Label htmlFor="toStation">To Station *</Label>
              <Select 
                value={movementForm.ToStationID.toString()} 
                onValueChange={(value) => setMovementForm(prev => ({ ...prev, ToStationID: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination station" />
                </SelectTrigger>
                <SelectContent>
                  {stations
                    .filter(s => selectedBike && s.StationID !== selectedBike.StationID)
                    .map(station => (
                      <SelectItem key={station.StationID} value={station.StationID.toString()}>
                        {station.StationName} ({station.BikeCount}/{station.Capacity})
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="reason">Reason *</Label>
              <Select 
                value={movementForm.Reason} 
                onValueChange={(value) => setMovementForm(prev => ({ ...prev, Reason: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select movement reason" />
                </SelectTrigger>
                <SelectContent>
                  {MOVEMENT_REASONS.map(reason => (
                    <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                placeholder="Additional notes (optional)..."
                value={movementForm.Notes || ''}
                onChange={(e) => setMovementForm(prev => ({ ...prev, Notes: e.target.value }))}
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setShowMovementDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleMovementRequest}>
              Schedule Movement
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Movement History Dialog */}
      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Movement History</DialogTitle>
            <DialogDescription>
              Recent bike movements and transfers
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {movements.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                No movement records found
              </div>
            ) : (
              <div className="space-y-3">
                {movements.map((movement) => (
                  <Card key={movement.MovementID}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="font-medium">{movement.BikeSerialNumber} - {movement.BikeModel}</div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-3 h-3 mr-1" />
                            {movement.FromStation}
                            <ArrowRight className="w-3 h-3 mx-2" />
                            {movement.ToStation}
                          </div>
                          <div className="text-sm">{movement.Reason}</div>
                          {movement.Notes && (
                            <div className="text-sm text-gray-600">{movement.Notes}</div>
                          )}
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(movement.MovementDate).toLocaleString()}
                            <span className="mx-2">•</span>
                            Staff: {movement.StaffName}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={STATUS_COLORS[movement.Status as keyof typeof STATUS_COLORS]}>
                            {movement.Status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}