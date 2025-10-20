import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Bluetooth,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  MapPin,
  Shield,
  Zap,
  Battery,
  Thermometer,
  Activity,
  Signal,
  Power,
  Settings,
  RefreshCw,
  Info,
  Calendar,
  HardDrive,
  Cpu,
  MemoryStick
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { Button } from '../ui/Button'

const DeviceStatus = ({ device, onRefresh, onSettings }) => {
  const [connectionStrength, setConnectionStrength] = useState(85);
  const [uptime, setUptime] = useState(0);
  const [dataUsage, setDataUsage] = useState({ sent: 0, received: 0 });

  useEffect(() => {
    // Simulate uptime counter
    const uptimeInterval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);

    // Simulate connection strength fluctuation
    const strengthInterval = setInterval(() => {
      setConnectionStrength(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(20, Math.min(100, prev + change));
      });
    }, 5000);

    // Simulate data usage
    const dataInterval = setInterval(() => {
      setDataUsage(prev => ({
        sent: prev.sent + Math.random() * 0.1,
        received: prev.received + Math.random() * 0.2
      }));
    }, 2000);

    return () => {
      clearInterval(uptimeInterval);
      clearInterval(strengthInterval);
      clearInterval(dataInterval);
    };
  }, []);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'online':
        return {
          icon: CheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/20',
          label: 'Online',
          description: 'Device is connected and operating normally'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/20',
          label: 'Warning',
          description: 'Device has some issues that need attention'
        };
      case 'offline':
        return {
          icon: XCircle,
          color: 'text-red-500',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/20',
          label: 'Offline',
          description: 'Device is not responding or disconnected'
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-500',
          bgColor: 'bg-gray-500/10',
          borderColor: 'border-gray-500/20',
          label: 'Unknown',
          description: 'Device status is unknown'
        };
    }
  };

  const getConnectionStrengthBars = () => {
    const bars = [];
    const barCount = 4;
    const strengthPerBar = 100 / barCount;
    
    for (let i = 0; i < barCount; i++) {
      const isActive = connectionStrength > (i * strengthPerBar);
      bars.push(
        <div
          key={i}
          className={`w-1 rounded-full transition-all duration-300 ${
            isActive ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          style={{ height: `${8 + (i * 4)}px` }}
        />
      );
    }
    return bars;
  };

  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const statusInfo = getStatusInfo(device?.status || 'unknown');
  const StatusIcon = statusInfo.icon;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="space-y-6">
      {/* Main Status Card */}
      <motion.div {...fadeInUp}>
        <Card className={`${statusInfo.bgColor} ${statusInfo.borderColor} border`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${statusInfo.bgColor}`}>
                  <StatusIcon className={`h-6 w-6 ${statusInfo.color}`} />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {device?.name || 'Unknown Device'}
                    <span className={`text-sm font-normal ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </CardTitle>
                  <CardDescription>{statusInfo.description}</CardDescription>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onRefresh}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={onSettings}>
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Connection Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Connection Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bluetooth className="h-5 w-5 text-blue-500" />
                Connection Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Signal Strength</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-end gap-1">
                    {getConnectionStrengthBars()}
                  </div>
                  <span className="text-sm font-medium">{connectionStrength.toFixed(0)}%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Protocol</span>
                <span className="text-sm font-medium">Bluetooth 5.0 LE</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">MAC Address</span>
                <span className="text-sm font-medium font-mono">
                  {device?.macAddress || 'AA:BB:CC:DD:EE:FF'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Seen</span>
                <span className="text-sm font-medium">
                  {device?.lastSeen ? device.lastSeen.toLocaleTimeString() : 'Unknown'}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-purple-500" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Uptime</span>
                <span className="text-sm font-medium">{formatUptime(uptime)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Firmware</span>
                <span className="text-sm font-medium">
                  {device?.firmwareVersion || 'v2.1.3'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Model</span>
                <span className="text-sm font-medium">
                  {device?.model || 'ESS μ1000'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Serial Number</span>
                <span className="text-sm font-medium font-mono">
                  {device?.serialNumber || 'ESS1000-001'}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Metrics */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-center mb-2">
                  <HardDrive className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-sm text-muted-foreground">Data Sent</p>
                <p className="text-lg font-bold text-blue-500">
                  {dataUsage.sent.toFixed(1)} MB
                </p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-center mb-2">
                  <MemoryStick className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-sm text-muted-foreground">Data Received</p>
                <p className="text-lg font-bold text-green-500">
                  {dataUsage.received.toFixed(1)} MB
                </p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-center mb-2">
                  <Cpu className="h-5 w-5 text-purple-500" />
                </div>
                <p className="text-sm text-muted-foreground">CPU Usage</p>
                <p className="text-lg font-bold text-purple-500">
                  {(Math.random() * 30 + 20).toFixed(0)}%
                </p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-center mb-2">
                  <Thermometer className="h-5 w-5 text-orange-500" />
                </div>
                <p className="text-sm text-muted-foreground">Memory</p>
                <p className="text-lg font-bold text-orange-500">
                  {(Math.random() * 40 + 40).toFixed(0)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Location & Installation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-500" />
              Location & Installation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <span className="text-sm font-medium">
                    {device?.location || 'Living Room'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Install Date</span>
                  <span className="text-sm font-medium">
                    {device?.installDate || '2024-01-15'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Warranty</span>
                  <span className="text-sm font-medium text-green-500">Active</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Next Service</span>
                  <span className="text-sm font-medium">2024-07-15</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DeviceStatus