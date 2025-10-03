import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Battery, 
  Zap, 
  Sun, 
  Thermometer,
  Gauge,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Wifi,
  WifiOff,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent } from '../ui/Card'

const RealTimeMetrics = ({ device, isConnected = true }) => {
  const [metrics, setMetrics] = useState({
    batteryLevel: device?.batteryLevel || 0,
    powerOutput: device?.powerOutput || 0,
    solarInput: device?.solarInput || 0,
    temperature: device?.temperature || 0,
    efficiency: device?.efficiency || 0,
    voltage: device?.voltage || 12.5,
    current: device?.current || 8.2,
    frequency: device?.frequency || 50.0
  });

  const [trends, setTrends] = useState({
    batteryLevel: 'stable',
    powerOutput: 'up',
    solarInput: 'up',
    temperature: 'stable'
  });

  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time data updates
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      setMetrics(prev => ({
        batteryLevel: Math.max(0, Math.min(100, prev.batteryLevel + (Math.random() - 0.5) * 2)),
        powerOutput: Math.max(0, prev.powerOutput + (Math.random() - 0.5) * 50),
        solarInput: Math.max(0, prev.solarInput + (Math.random() - 0.5) * 30),
        temperature: Math.max(20, Math.min(80, prev.temperature + (Math.random() - 0.5) * 3)),
        efficiency: Math.max(70, Math.min(100, prev.efficiency + (Math.random() - 0.5) * 2)),
        voltage: Math.max(10, Math.min(15, prev.voltage + (Math.random() - 0.5) * 0.5)),
        current: Math.max(0, Math.min(20, prev.current + (Math.random() - 0.5) * 1)),
        frequency: Math.max(49, Math.min(51, prev.frequency + (Math.random() - 0.5) * 0.2))
      }));

      // Update trends
      setTrends(prev => ({
        batteryLevel: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'up' : 'down') : 'stable',
        powerOutput: Math.random() > 0.6 ? (Math.random() > 0.5 ? 'up' : 'down') : 'stable',
        solarInput: Math.random() > 0.6 ? (Math.random() > 0.5 ? 'up' : 'down') : 'stable',
        temperature: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'up' : 'down') : 'stable'
      }));

      setLastUpdate(new Date());
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isConnected]);

  const getStatusColor = (value, type) => {
    switch (type) {
      case 'battery':
        if (value > 80) return 'text-green-500';
        if (value > 50) return 'text-yellow-500';
        return 'text-red-500';
      case 'temperature':
        if (value > 60) return 'text-red-500';
        if (value > 45) return 'text-yellow-500';
        return 'text-green-500';
      case 'efficiency':
        if (value > 90) return 'text-green-500';
        if (value > 80) return 'text-yellow-500';
        return 'text-red-500';
      default:
        return 'text-blue-500';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-red-500" />;
      default: return <Activity className="h-3 w-3 text-gray-500" />;
    }
  };

  const metricCards = [
    {
      id: 'battery',
      title: 'Battery Level',
      value: `${metrics.batteryLevel.toFixed(1)}%`,
      icon: Battery,
      color: getStatusColor(metrics.batteryLevel, 'battery'),
      trend: trends.batteryLevel,
      subtitle: 'State of Charge'
    },
    {
      id: 'power',
      title: 'Power Output',
      value: `${metrics.powerOutput.toFixed(0)}W`,
      icon: Zap,
      color: 'text-blue-500',
      trend: trends.powerOutput,
      subtitle: `${metrics.voltage.toFixed(1)}V • ${metrics.current.toFixed(1)}A`
    },
    {
      id: 'solar',
      title: 'Solar Input',
      value: `${metrics.solarInput.toFixed(0)}W`,
      icon: Sun,
      color: 'text-yellow-500',
      trend: trends.solarInput,
      subtitle: 'PV Generation'
    },
    {
      id: 'temperature',
      title: 'Temperature',
      value: `${metrics.temperature.toFixed(1)}°C`,
      icon: Thermometer,
      color: getStatusColor(metrics.temperature, 'temperature'),
      trend: trends.temperature,
      subtitle: 'System Temp'
    },
    {
      id: 'efficiency',
      title: 'Efficiency',
      value: `${metrics.efficiency.toFixed(1)}%`,
      icon: Gauge,
      color: getStatusColor(metrics.efficiency, 'efficiency'),
      trend: 'stable',
      subtitle: 'System Performance'
    },
    {
      id: 'frequency',
      title: 'Frequency',
      value: `${metrics.frequency.toFixed(1)}Hz`,
      icon: Activity,
      color: 'text-purple-500',
      trend: 'stable',
      subtitle: 'AC Output'
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <motion.div 
        className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
        {...fadeInUp}
      >
        <div className="flex items-center gap-3">
          {isConnected ? (
            <>
              <div className="flex items-center gap-2">
                <Wifi className="h-5 w-5 text-green-500" />
                <span className="text-green-500 font-medium">Connected</span>
              </div>
              <div className="h-4 w-px bg-border"></div>
              <span className="text-sm text-muted-foreground">
                Last update: {lastUpdate.toLocaleTimeString()}
              </span>
            </>
          ) : (
            <>
              <WifiOff className="h-5 w-5 text-red-500" />
              <span className="text-red-500 font-medium">Disconnected</span>
            </>
          )}
        </div>
        
        {isConnected && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </motion.div>
        )}
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricCards.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg bg-muted/50`}>
                        <IconComponent className={`h-5 w-5 ${metric.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                        <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
                      </div>
                    </div>
                    {getTrendIcon(metric.trend)}
                  </div>
                  
                  <div className="space-y-2">
                    <motion.p 
                      className={`text-2xl font-bold ${metric.color}`}
                      key={metric.value} // This will trigger re-animation on value change
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {metric.value}
                    </motion.p>
                    
                    {/* Progress bar for battery and efficiency */}
                    {(metric.id === 'battery' || metric.id === 'efficiency') && (
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div 
                          className={`h-2 rounded-full ${
                            metric.id === 'battery' 
                              ? metrics.batteryLevel > 80 ? 'bg-green-500' : metrics.batteryLevel > 50 ? 'bg-yellow-500' : 'bg-red-500'
                              : 'bg-purple-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ 
                            width: `${metric.id === 'battery' ? metrics.batteryLevel : metrics.efficiency}%` 
                          }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Status indicator */}
                  <div className="absolute top-2 right-2">
                    {isConnected ? (
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    ) : (
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* System Status Alerts */}
      {isConnected && (
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {metrics.temperature > 55 && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-yellow-500">High Temperature Warning</p>
                <p className="text-xs text-muted-foreground">System temperature is above normal operating range</p>
              </div>
            </div>
          )}
          
          {metrics.batteryLevel < 20 && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium text-red-500">Low Battery Alert</p>
                <p className="text-xs text-muted-foreground">Battery level is critically low</p>
              </div>
            </div>
          )}
          
          {metrics.efficiency > 95 && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-green-500">Optimal Performance</p>
                <p className="text-xs text-muted-foreground">System is operating at peak efficiency</p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default RealTimeMetrics