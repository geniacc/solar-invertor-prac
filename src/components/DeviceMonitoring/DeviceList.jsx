import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus,
  Search,
  Filter,
  MoreVertical,
  Bluetooth,
  Wifi,
  Battery,
  Zap,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  MapPin,
  Settings,
  Trash2,
  Edit,
  Eye,
  RefreshCw,
  SortAsc,
  SortDesc,
  Grid,
  List as ListIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Badge } from '../ui/Badge'

const DeviceList = ({ devices = [], onDeviceSelect, onAddDevice, selectedDevice, onScanDevices, isScanning }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(false);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'online':
        return {
          icon: CheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-500',
          label: 'Online'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500',
          label: 'Warning'
        };
      case 'offline':
        return {
          icon: XCircle,
          color: 'text-red-500',
          bgColor: 'bg-red-500',
          label: 'Offline'
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-500',
          bgColor: 'bg-gray-500',
          label: 'Unknown'
        };
    }
  };

  const filteredAndSortedDevices = devices
    .filter(device => {
      const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           device.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || device.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'lastSeen') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const DeviceCard = ({ device, index }) => {
    const statusInfo = getStatusInfo(device.status);
    const StatusIcon = statusInfo.icon;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ y: -2 }}
        className="h-full"
      >
        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            selectedDevice?.id === device.id ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => onDeviceSelect(device)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Bluetooth className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${statusInfo.bgColor}`} />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">{device.name}</CardTitle>
                  <CardDescription className="text-xs">{device.model}</CardDescription>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Badge variant={device.status === 'online' ? 'default' : 
                              device.status === 'warning' ? 'secondary' : 'destructive'}>
                  {statusInfo.label}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Battery</span>
                <div className="flex items-center gap-2">
                  <Battery className={`h-4 w-4 ${
                    device.batteryLevel > 50 ? 'text-green-500' : 
                    device.batteryLevel > 20 ? 'text-yellow-500' : 'text-red-500'
                  }`} />
                  <span className="font-medium">{device.batteryLevel}%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Power</span>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{device.powerOutput}W</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Location</span>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{device.location}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last Seen</span>
                <span className="font-medium">
                  {device.lastSeen.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const DeviceListItem = ({ device, index }) => {
    const statusInfo = getStatusInfo(device.status);
    const StatusIcon = statusInfo.icon;
    
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="w-full"
      >
        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
            selectedDevice?.id === device.id ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => onDeviceSelect(device)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Bluetooth className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${statusInfo.bgColor}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{device.name}</h3>
                  <p className="text-sm text-muted-foreground">{device.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-sm font-medium">{device.batteryLevel}%</p>
                  <p className="text-xs text-muted-foreground">Battery</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm font-medium">{device.powerOutput}W</p>
                  <p className="text-xs text-muted-foreground">Power</p>
                </div>
                
                <div className="text-center">
                  <Badge variant={device.status === 'online' ? 'default' : 
                                device.status === 'warning' ? 'secondary' : 'destructive'}>
                    {statusInfo.label}
                  </Badge>
                </div>
                
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-3 bg-muted rounded w-1/4" />
                </div>
                <div className="w-16 h-6 bg-muted rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Devices</h2>
          <p className="text-muted-foreground">
            Manage and monitor your connected devices
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={onScanDevices}
            disabled={isScanning}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isScanning ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Search className="w-4 h-4 mr-2" />
            )}
            {isScanning ? 'Scanning...' : 'Scan Devices'}
          </Button>
          <Button 
            onClick={onAddDevice}
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Device
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search devices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="warning">Warning</option>
                <option value="offline">Offline</option>
              </select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSort('name')}
                className="flex items-center gap-1"
              >
                Sort
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>
              
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device List */}
      <AnimatePresence mode="wait">
        {filteredAndSortedDevices.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <Bluetooth className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No devices found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Add your first device to get started'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Button onClick={onAddDevice}>
                <Plus className="h-4 w-4 mr-2" />
                Add Device
              </Button>
            )}
          </motion.div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {filteredAndSortedDevices.map((device, index) => (
              viewMode === 'grid' ? (
                <DeviceCard key={device.id} device={device} index={index} />
              ) : (
                <DeviceListItem key={device.id} device={device} index={index} />
              )
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeviceList