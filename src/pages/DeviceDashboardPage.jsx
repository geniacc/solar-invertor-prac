import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Bluetooth,
  Wifi,
  Battery,
  Zap,
  Activity,
  Settings,
  Plus,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Sun,
  Power,
  Clock,
  Gauge,
  Bell,
  Shield,
  MapPin,
  ArrowRight,
  Monitor,
  Database,
  Users,
  Calendar
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { useResponsive } from '../hooks/useResponsive'

const DeviceDashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({});
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    // Simulate loading dashboard data
    const timer = setTimeout(() => {
      setDashboardStats({
        totalDevices: 3,
        onlineDevices: 2,
        totalPowerOutput: 1750,
        totalEnergyToday: 36.9,
        averageEfficiency: 92,
        activeAlerts: 1
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const quickActions = [
    {
      title: 'Device Monitoring',
      description: 'Monitor and manage your connected devices',
      icon: Monitor,
      color: 'blue',
      link: '/device-monitoring',
      stats: `${dashboardStats.onlineDevices}/${dashboardStats.totalDevices} online`
    },
    {
      title: 'Energy Analytics',
      description: 'View detailed energy production and consumption data',
      icon: BarChart3,
      color: 'green',
      link: '/device-monitoring',
      stats: `${dashboardStats.totalEnergyToday} kWh today`
    },
    {
      title: 'Device Settings',
      description: 'Configure and update your device settings',
      icon: Settings,
      color: 'purple',
      link: '/device-monitoring',
      stats: 'All devices configured'
    },
    {
      title: 'Alerts & Notifications',
      description: 'Manage system alerts and notifications',
      icon: Bell,
      color: 'orange',
      link: '/device-monitoring',
      stats: `${dashboardStats.activeAlerts} active alert${dashboardStats.activeAlerts !== 1 ? 's' : ''}`
    }
  ];

  const systemOverview = [
    {
      title: 'Total Power Output',
      value: `${dashboardStats.totalPowerOutput}W`,
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      trend: '+12%'
    },
    {
      title: 'Energy Today',
      value: `${dashboardStats.totalEnergyToday} kWh`,
      icon: Sun,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      trend: '+8%'
    },
    {
      title: 'System Efficiency',
      value: `${dashboardStats.averageEfficiency}%`,
      icon: Gauge,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      trend: '+2%'
    },
    {
      title: 'Connected Devices',
      value: `${dashboardStats.onlineDevices}/${dashboardStats.totalDevices}`,
      icon: Bluetooth,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      trend: 'stable'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Device Dashboard
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Overview of your Zuice solar system
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-2">
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              
              <Link to="/device-monitoring">
                <Button size="sm">
                  <Monitor className="w-4 h-4 mr-2" />
                  Monitor Devices
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemOverview.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {item.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {item.value}
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          {item.trend !== 'stable' ? `${item.trend} from yesterday` : 'Stable'}
                        </p>
                      </div>
                      <div className={`p-3 rounded-full ${item.bgColor}`}>
                        <Icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Link to={action.link}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`p-2 rounded-lg bg-${action.color}-50 dark:bg-${action.color}-900/20`}>
                              <Icon className={`w-5 h-5 text-${action.color}-600`} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {action.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {action.description}
                          </p>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {action.stats}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>
                Latest updates from your solar system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      All devices connected successfully
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Energy production increased by 12%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      High temperature detected in Garage unit
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">3 hours ago</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link 
                  to="/device-monitoring" 
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center space-x-1"
                >
                  <span>View all activity</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DeviceDashboardPage;