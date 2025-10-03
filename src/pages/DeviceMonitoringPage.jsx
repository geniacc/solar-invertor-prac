import React, { useState, useEffect } from 'react';
import { 
  Bluetooth, 
  Plus, 
  Settings, 
  RefreshCw, 
  Wifi, 
  WifiOff,
  Battery,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Import device monitoring components
import DeviceList from '../components/DeviceMonitoring/DeviceList';
import RealTimeMetrics from '../components/DeviceMonitoring/RealTimeMetrics';
import DeviceStatus from '../components/DeviceMonitoring/DeviceStatus';
import DataVisualization from '../components/DeviceMonitoring/DataVisualization';

const DeviceMonitoringPage = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [activeTab, setActiveTab] = useState('devices');
  const [isScanning, setIsScanning] = useState(false);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');

  // Mock device data
  useEffect(() => {
    const mockDevices = [
      {
        id: '1',
        name: 'Zuice μ1000 - Living Room',
        model: 'Zuice μ1000',
        status: 'online',
        batteryLevel: 85,
        powerOutput: 750,
        location: 'Living Room',
        lastSeen: new Date(),
        macAddress: 'AA:BB:CC:DD:EE:01',
        firmwareVersion: 'v2.1.3',
        serialNumber: 'ZU1000-001',
        installDate: '2024-01-15',
        connectionType: 'bluetooth',
        signalStrength: 85,
        efficiency: 92,
        temperature: 35,
        voltage: 12.4,
        current: 60.5
      },
      {
        id: '2',
        name: 'Zuice μ1000 - Kitchen',
        model: 'Zuice μ1000',
        status: 'warning',
        batteryLevel: 45,
        powerOutput: 320,
        location: 'Kitchen',
        lastSeen: new Date(Date.now() - 300000),
        macAddress: 'AA:BB:CC:DD:EE:02',
        firmwareVersion: 'v2.1.2',
        serialNumber: 'ZU1000-002',
        installDate: '2024-02-01',
        connectionType: 'bluetooth',
        signalStrength: 65,
        efficiency: 78,
        temperature: 42,
        voltage: 11.8,
        current: 27.1
      },
      {
        id: '3',
        name: 'Zuice μ1000 - Garage',
        model: 'Zuice μ1000',
        status: 'offline',
        batteryLevel: 0,
        powerOutput: 0,
        location: 'Garage',
        lastSeen: new Date(Date.now() - 3600000),
        macAddress: 'AA:BB:CC:DD:EE:03',
        firmwareVersion: 'v2.1.1',
        serialNumber: 'ZU1000-003',
        installDate: '2024-01-20',
        connectionType: 'bluetooth',
        signalStrength: 0,
        efficiency: 0,
        temperature: 25,
        voltage: 0,
        current: 0
      }
    ];

    setDevices(mockDevices);
    if (mockDevices.length > 0) {
      setSelectedDevice(mockDevices[0]);
    }
  }, []);

  const scanForDevices = async () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      // Simulate finding new devices
      const newDevice = {
        id: Date.now().toString(),
        name: `Zuice μ1000 - New Device`,
        model: 'Zuice μ1000',
        status: 'discovered',
        batteryLevel: Math.floor(Math.random() * 100),
        powerOutput: Math.floor(Math.random() * 1000),
        location: 'Unknown',
        lastSeen: new Date(),
        macAddress: `AA:BB:CC:DD:EE:${Math.floor(Math.random() * 99).toString().padStart(2, '0')}`,
        firmwareVersion: 'v2.1.3',
        serialNumber: `ZU1000-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`,
        installDate: new Date().toISOString().split('T')[0],
        connectionType: 'bluetooth',
        signalStrength: Math.floor(Math.random() * 100),
        efficiency: Math.floor(Math.random() * 100),
        temperature: Math.floor(Math.random() * 50) + 20,
        voltage: (Math.random() * 5 + 10).toFixed(1),
        current: (Math.random() * 100).toFixed(1)
      };

      setDevices(prev => [...prev, newDevice]);
      setIsScanning(false);
    }, 3000);
  };

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
  };

  const handleAddDevice = () => {
    setShowAddDevice(true);
  };

  const getOverallStatus = () => {
    const onlineDevices = devices.filter(d => d.status === 'online').length;
    const totalDevices = devices.length;
    
    if (totalDevices === 0) return { status: 'no-devices', color: 'gray' };
    if (onlineDevices === totalDevices) return { status: 'all-online', color: 'green' };
    if (onlineDevices > 0) return { status: 'partial', color: 'yellow' };
    return { status: 'all-offline', color: 'red' };
  };

  const overallStatus = getOverallStatus();

  const tabs = [
    { id: 'devices', label: 'Devices', icon: Bluetooth },
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'realtime', label: 'Real-time', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'status', label: 'Status', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bluetooth className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Device Monitoring
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Monitor and manage your Zuice devices
                  </p>
                </div>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {overallStatus.status === 'all-online' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {overallStatus.status === 'partial' && (
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                )}
                {overallStatus.status === 'all-offline' && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {devices.filter(d => d.status === 'online').length} of {devices.length} devices online
                </span>
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={scanForDevices}
                  disabled={isScanning}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
                  {isScanning ? 'Scanning...' : 'Scan'}
                </button>
                
                <button
                  onClick={handleAddDevice}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Device
                </button>
                
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'devices' && (
          <DeviceList 
            devices={devices}
            onDeviceSelect={setSelectedDevice}
            onAddDevice={() => setShowAddDevice(true)}
            onScanDevices={scanForDevices}
            isScanning={isScanning}
            selectedDevice={selectedDevice}
          />
        )}

        {activeTab === 'overview' && selectedDevice && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Device Overview - {selectedDevice.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Battery className="w-8 h-8 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Battery</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedDevice.batteryLevel}%</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Zap className="w-8 h-8 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Power Output</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedDevice.powerOutput}W</p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Activity className="w-8 h-8 text-yellow-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Efficiency</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedDevice.efficiency}%</p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    {selectedDevice.status === 'online' ? (
                      <Wifi className="w-8 h-8 text-purple-600 mr-3" />
                    ) : (
                      <WifiOff className="w-8 h-8 text-gray-400 mr-3" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{selectedDevice.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'realtime' && (
          <RealTimeMetrics devices={devices} selectedDevice={selectedDevice} />
        )}

        {activeTab === 'analytics' && (
          <DataVisualization devices={devices} selectedDevice={selectedDevice} />
        )}

        {activeTab === 'status' && (
          <DeviceStatus devices={devices} selectedDevice={selectedDevice} />
        )}
      </div>

      {/* Add Device Modal */}
      {showAddDevice && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add New Device</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Scan for nearby Bluetooth devices or manually add a device.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => {
                    setShowAddDevice(false);
                    scanForDevices();
                  }}
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Start Scanning
                </button>
                <button
                  onClick={() => setShowAddDevice(false)}
                  className="mt-3 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceMonitoringPage;