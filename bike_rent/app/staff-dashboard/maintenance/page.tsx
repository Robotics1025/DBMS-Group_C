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
import Image from "next/image";
import { 
  Wrench, 
  Search, 
  Filter, 
  Plus,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings2,
  FileText,
  Battery,
  Zap
} from "lucide-react";

interface Bike {
  BikeID: number;
  BikeSerialNumber: string;
  Model: string;
  BikeType: string;
  Status: string;
  BatteryLevel?: number;
  LastMaintenance?: string;
  StationName?: string;
}

interface MaintenanceRecord {
  MaintenanceID: number;
  BikeSerialNumber: string;
  BikeModel: string;
  MaintenanceType: string;
  Description: string;
  MaintenanceDate: string;
  TechnicianName: string;
  Status: string;
  Cost?: number;
}

interface MaintenanceRequest {
  BikeID: number;
  MaintenanceType: string;
  Description: string;
  Priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  EstimatedCost?: number;
}

const MAINTENANCE_TYPES = [
  'Routine Check',
  'Brake Repair',
  'Tire Change',
  'Chain Maintenance',
  'Battery Replacement',
  'Electrical Issue',
  'Frame Repair',
  'Gear Adjustment',
  'Cleaning',
  'Other'
];

const STATUS_COLORS = {
  'Available': 'bg-green-100 text-green-800',
  'Rented': 'bg-blue-100 text-blue-800',
  'Maintenance': 'bg-yellow-100 text-yellow-800',
  'Damaged': 'bg-red-100 text-red-800',
  'Out of Service': 'bg-gray-100 text-gray-800'
};

export default function MaintenancePage() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false);
  const [showRecordsDialog, setShowRecordsDialog] = useState(false);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [maintenanceForm, setMaintenanceForm] = useState<MaintenanceRequest>({
    BikeID: 0,
    MaintenanceType: '',
    Description: '',
    Priority: 'Medium',
    EstimatedCost: undefined
  });

  // Fetch bikes and maintenance data
  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [bikesResponse, recordsResponse] = await Promise.all([
        fetch('/api/bikes'),
        fetch('/api/maintenance/records')
      ]);

      if (bikesResponse.ok) {
        const bikesData = await bikesResponse.json();
        setBikes(bikesData.bikes || []);
      }

      if (recordsResponse.ok) {
        const recordsData = await recordsResponse.json();
        setMaintenanceRecords(recordsData.records || []);
      }
    } catch (error) {
      console.error('Error fetching maintenance data:', error);
      toast.error('Failed to load maintenance data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter bikes based on search and status
  const filteredBikes = bikes.filter(bike => {
    const matchesSearch = bike.BikeSerialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bike.Model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (bike.StationName?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    
    const matchesStatus = statusFilter === 'all' || bike.Status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handle maintenance request submission
  const handleMaintenanceRequest = async () => {
    if (!selectedBike || !maintenanceForm.MaintenanceType || !maintenanceForm.Description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/maintenance/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...maintenanceForm,
          BikeID: selectedBike.BikeID
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success('Maintenance request submitted successfully');
        setShowMaintenanceDialog(false);
        setMaintenanceForm({
          BikeID: 0,
          MaintenanceType: '',
          Description: '',
          Priority: 'Medium',
          EstimatedCost: undefined
        });
        fetchData(); // Refresh data
      } else {
        toast.error(result.message || 'Failed to submit maintenance request');
      }
    } catch (error) {
      console.error('Error submitting maintenance request:', error);
      toast.error('Failed to submit maintenance request');
    }
  };

  // Open maintenance dialog for selected bike
  const openMaintenanceDialog = (bike: Bike) => {
    setSelectedBike(bike);
    setMaintenanceForm({
      BikeID: bike.BikeID,
      MaintenanceType: '',
      Description: '',
      Priority: 'Medium',
      EstimatedCost: undefined
    });
    setShowMaintenanceDialog(true);
  };

  // Get maintenance stats
  const getMaintenanceStats = () => {
    const needsMaintenance = bikes.filter(bike => 
      bike.Status === 'Maintenance' || bike.Status === 'Damaged'
    ).length;
    
    const recentRecords = maintenanceRecords.filter(record => {
      const recordDate = new Date(record.MaintenanceDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return recordDate >= weekAgo;
    }).length;

    return { needsMaintenance, recentRecords };
  };

  const stats = getMaintenanceStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading maintenance data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative min-h-screen">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.02] rotate-12 animate-pulse">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-20 left-10 w-60 h-60 opacity-[0.03] -rotate-45 animate-pulse delay-1000">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt="" 
            fill 
            className="object-contain"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/50 to-background/20" />
      </div>

      {/* Header with Cool Background */}
      <div className="relative bg-gradient-to-r from-orange-500/5 via-red-500/5 to-pink-500/5 rounded-2xl p-8 border backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Bike Maintenance
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Keep your fleet running smoothly with preventive care
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => setShowRecordsDialog(true)}
              variant="outline"
              className="bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Records
            </Button>
          </div>
        </div>
        
        {/* Background shapes in header */}
        <div className="absolute top-2 left-2 w-20 h-20 opacity-5 rotate-45">
          <Image 
            src="/assets/background/shape-square.svg" 
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Needs Maintenance",
            value: stats.needsMaintenance,
            change: "Bikes requiring attention",
            icon: AlertTriangle,
            colors: {
              bg: "bg-gradient-to-br from-yellow-100 to-yellow-50",
              iconBg: "bg-yellow-500",
              iconColor: "text-white",
              textColor: "text-yellow-700",
              valueColor: "text-yellow-800",
              changeColor: "text-yellow-600"
            }
          },
          {
            title: "Recent Maintenance", 
            value: stats.recentRecords,
            change: "Completed this week",
            icon: Wrench,
            colors: {
              bg: "bg-gradient-to-br from-blue-100 to-blue-50",
              iconBg: "bg-blue-500",
              iconColor: "text-white",
              textColor: "text-blue-700",
              valueColor: "text-blue-800",
              changeColor: "text-blue-600"
            }
          },
          {
            title: "Total Fleet",
            value: bikes.length,
            change: "Bikes in system",
            icon: Settings2,
            colors: {
              bg: "bg-gradient-to-br from-green-100 to-green-50",
              iconBg: "bg-green-500",
              iconColor: "text-white",
              textColor: "text-green-700",
              valueColor: "text-green-800",
              changeColor: "text-green-600"
            }
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          const colors = stat.colors;
          
          return (
            <Card key={stat.title} className={`${colors.bg} border-0 hover:shadow-lg transition-all duration-300 overflow-hidden relative rounded-2xl`}>
              {/* Dot Pattern Background */}
              <div className="absolute inset-0 opacity-20">
                <div className={`absolute inset-0 ${colors.textColor}`}>
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`maintenance-dots-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1" fill="currentColor"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#maintenance-dots-${index})`}/>
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
                    <CheckCircle className={`h-4 w-4 ${colors.changeColor}`} />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h3 className={`text-sm font-medium ${colors.textColor}`}>
                    {stat.title}
                  </h3>
                  <div className={`text-3xl font-bold ${colors.valueColor}`}>
                    {stat.value}
                  </div>
                  <p className={`text-xs ${colors.changeColor}`}>
                    {stat.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search bikes by serial number, model, or station..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="Rented">Rented</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
            <SelectItem value="Damaged">Damaged</SelectItem>
            <SelectItem value="Out of Service">Out of Service</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bikes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBikes.map((bike) => (
          <Card key={bike.BikeID} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{bike.BikeSerialNumber}</CardTitle>
                <Badge className={STATUS_COLORS[bike.Status as keyof typeof STATUS_COLORS]}>
                  {bike.Status}
                </Badge>
              </div>
              <CardDescription>
                {bike.Model} • {bike.BikeType}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {bike.StationName && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {bike.StationName}
                </div>
              )}
              
              {bike.BatteryLevel !== undefined && (
                <div className="flex items-center text-sm">
                  <Battery className="w-4 h-4 mr-2" />
                  <span className={bike.BatteryLevel < 20 ? 'text-red-600' : 'text-green-600'}>
                    {bike.BatteryLevel}% Battery
                  </span>
                </div>
              )}

              {bike.LastMaintenance && (
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Last: {new Date(bike.LastMaintenance).toLocaleDateString()}
                </div>
              )}

              <Button
                onClick={() => openMaintenanceDialog(bike)}
                className="w-full mt-4"
                variant={bike.Status === 'Maintenance' || bike.Status === 'Damaged' ? 'default' : 'outline'}
              >
                <Wrench className="w-4 h-4 mr-2" />
                {bike.Status === 'Maintenance' || bike.Status === 'Damaged' 
                  ? 'Update Maintenance' 
                  : 'Schedule Maintenance'
                }
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBikes.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Settings2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No bikes found matching your criteria</p>
          </CardContent>
        </Card>
      )}

      {/* Maintenance Request Dialog */}
      <Dialog open={showMaintenanceDialog} onOpenChange={setShowMaintenanceDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Maintenance</DialogTitle>
            <DialogDescription>
              {selectedBike && `For bike: ${selectedBike.BikeSerialNumber}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="maintenanceType">Maintenance Type *</Label>
              <Select 
                value={maintenanceForm.MaintenanceType} 
                onValueChange={(value) => setMaintenanceForm(prev => ({ ...prev, MaintenanceType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select maintenance type" />
                </SelectTrigger>
                <SelectContent>
                  {MAINTENANCE_TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={maintenanceForm.Priority} 
                onValueChange={(value: 'Low' | 'Medium' | 'High' | 'Urgent') => 
                  setMaintenanceForm(prev => ({ ...prev, Priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="estimatedCost">Estimated Cost (RM)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={maintenanceForm.EstimatedCost || ''}
                onChange={(e) => setMaintenanceForm(prev => ({ 
                  ...prev, 
                  EstimatedCost: e.target.value ? parseFloat(e.target.value) : undefined 
                }))}
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                placeholder="Describe the maintenance needed..."
                value={maintenanceForm.Description}
                onChange={(e) => setMaintenanceForm(prev => ({ ...prev, Description: e.target.value }))}
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setShowMaintenanceDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleMaintenanceRequest}>
              Submit Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Maintenance Records Dialog */}
      <Dialog open={showRecordsDialog} onOpenChange={setShowRecordsDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Maintenance Records</DialogTitle>
            <DialogDescription>
              Recent maintenance activities and history
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {maintenanceRecords.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                No maintenance records found
              </div>
            ) : (
              <div className="space-y-3">
                {maintenanceRecords.map((record) => (
                  <Card key={record.MaintenanceID}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="font-medium">{record.BikeSerialNumber} - {record.BikeModel}</div>
                          <div className="text-sm text-gray-600">{record.MaintenanceType}</div>
                          <div className="text-sm">{record.Description}</div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(record.MaintenanceDate).toLocaleString()}
                            <span className="mx-2">•</span>
                            Technician: {record.TechnicianName}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={record.Status === 'Completed' ? 'default' : 'secondary'}>
                            {record.Status}
                          </Badge>
                          {record.Cost && (
                            <div className="text-sm font-medium mt-1">
                              RM {record.Cost.toFixed(2)}
                            </div>
                          )}
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