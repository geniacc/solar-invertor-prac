import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts'
import { 
  Calendar,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  Zap,
  Battery,
  Thermometer,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Settings,
  RefreshCw,
  Clock,
  Sun,
  Moon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

const chartColors = {
  power: '#3b82f6',
  battery: '#10b981',
  temperature: '#f59e0b',
  efficiency: '#8b5cf6',
  voltage: '#ef4444',
  current: '#06b6d4',
  solarInput: '#f97316',
  consumption: '#84cc16'
};

const DataVisualization = ({ device, timeRange = '24h' }) => {
  const [selectedMetric, setSelectedMetric] = useState('power');
  const [chartType, setChartType] = useState('line');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [summaryData, setSummaryData] = useState({});

  // Generate mock data based on time range
  useEffect(() => {
    setIsLoading(true);
    
    const generateData = () => {
      const now = new Date();
      const dataPoints = timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : 30;
      const interval = timeRange === '24h' ? 'hour' : 'day';
      
      const mockData = [];
      
      for (let i = dataPoints - 1; i >= 0; i--) {
        const date = new Date(now);
        if (interval === 'hour') {
          date.setHours(date.getHours() - i);
        } else {
          date.setDate(date.getDate() - i);
        }
        
        // Simulate realistic solar inverter data patterns
        const hour = date.getHours();
        const isDaytime = hour >= 6 && hour <= 18;
        const solarMultiplier = isDaytime ? Math.sin((hour - 6) * Math.PI / 12) : 0;
        
        mockData.push({
          time: interval === 'hour' ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : date.toLocaleDateString(),
          timestamp: date.getTime(),
          power: Math.max(0, (500 + Math.random() * 400) * (solarMultiplier + 0.1)),
          battery: Math.max(20, Math.min(100, 80 + Math.random() * 20 - 10)),
          temperature: 25 + Math.random() * 15 + (isDaytime ? 10 : 0),
          efficiency: Math.max(70, Math.min(95, 85 + Math.random() * 10 - 5)),
          voltage: 220 + Math.random() * 20 - 10,
          current: Math.random() * 5 + 1,
          solarInput: Math.max(0, (300 + Math.random() * 200) * solarMultiplier),
          gridInput: Math.random() * 100,
          consumption: 200 + Math.random() * 300
        });
      }
      
      return mockData;
    };

    setTimeout(() => {
      const newData = generateData();
      setData(newData);
      
      // Calculate summary statistics
      const summary = {
        totalEnergy: newData.reduce((sum, point) => sum + point.power, 0) / 1000,
        avgEfficiency: newData.reduce((sum, point) => sum + point.efficiency, 0) / newData.length,
        peakPower: Math.max(...newData.map(point => point.power)),
        avgTemperature: newData.reduce((sum, point) => sum + point.temperature, 0) / newData.length,
        batteryHealth: 95 + Math.random() * 5,
        uptime: 99.2 + Math.random() * 0.8
      };
      
      setSummaryData(summary);
      setIsLoading(false);
    }, 1000);
  }, [timeRange, device]);

  const metricConfig = {
    power: { label: 'Power Output', unit: 'W', icon: Zap, color: chartColors.power },
    battery: { label: 'Battery Level', unit: '%', icon: Battery, color: chartColors.battery },
    temperature: { label: 'Temperature', unit: '°C', icon: Thermometer, color: chartColors.temperature },
    efficiency: { label: 'Efficiency', unit: '%', icon: Activity, color: chartColors.efficiency },
    voltage: { label: 'Voltage', unit: 'V', icon: Zap, color: chartColors.voltage },
    current: { label: 'Current', unit: 'A', icon: Zap, color: chartColors.current },
    solarInput: { label: 'Solar Input', unit: 'W', icon: Sun, color: chartColors.solarInput },
    consumption: { label: 'Consumption', unit: 'W', icon: Activity, color: chartColors.consumption }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const config = metricConfig[selectedMetric];
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="font-medium">{label}</p>
          <p className="text-sm" style={{ color: config.color }}>
            {`${config.label}: ${payload[0].value.toFixed(1)} ${config.unit}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const config = metricConfig[selectedMetric];
    
    switch (chartType) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="time" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={selectedMetric}
                stroke={config.color}
                fill={config.color}
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="time" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey={selectedMetric} fill={config.color} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="time" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke={config.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: config.color }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  const energyDistributionData = useMemo(() => {
    if (!data.length) return [];
    
    const latest = data[data.length - 1];
    return [
      { name: 'Solar Input', value: latest.solarInput, color: chartColors.solarInput },
      { name: 'Grid Input', value: latest.gridInput, color: chartColors.voltage },
      { name: 'Battery', value: latest.battery * 5, color: chartColors.battery },
      { name: 'Consumption', value: latest.consumption, color: chartColors.consumption }
    ];
  }, [data]);

  const performanceData = useMemo(() => {
    return [
      { name: 'Efficiency', value: summaryData.avgEfficiency || 0, color: chartColors.efficiency },
      { name: 'Battery Health', value: summaryData.batteryHealth || 0, color: chartColors.battery },
      { name: 'Uptime', value: summaryData.uptime || 0, color: chartColors.power }
    ];
  }, [summaryData]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-1/3" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Energy</p>
                  <p className="text-2xl font-bold text-blue-500">
                    {summaryData.totalEnergy?.toFixed(1)} kWh
                  </p>
                </div>
                <Zap className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Efficiency</p>
                  <p className="text-2xl font-bold text-green-500">
                    {summaryData.avgEfficiency?.toFixed(1)}%
                  </p>
                </div>
                <Activity className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Peak Power</p>
                  <p className="text-2xl font-bold text-orange-500">
                    {summaryData.peakPower?.toFixed(0)}W
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Temperature</p>
                  <p className="text-2xl font-bold text-red-500">
                    {summaryData.avgTemperature?.toFixed(1)}°C
                  </p>
                </div>
                <Thermometer className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {React.createElement(metricConfig[selectedMetric].icon, { 
                    className: "h-5 w-5", 
                    style: { color: metricConfig[selectedMetric].color } 
                  })}
                  {metricConfig[selectedMetric].label} Over Time
                </CardTitle>
                <CardDescription>
                  {timeRange === '24h' ? 'Last 24 hours' : 
                   timeRange === '7d' ? 'Last 7 days' : 'Last 30 days'}
                </CardDescription>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  {Object.entries(metricConfig).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                </select>
                
                <div className="flex border rounded-md">
                  <Button
                    variant={chartType === 'line' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setChartType('line')}
                    className="rounded-r-none px-2"
                  >
                    <LineChartIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={chartType === 'area' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setChartType('area')}
                    className="rounded-none px-2"
                  >
                    <Activity className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={chartType === 'bar' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setChartType('bar')}
                    className="rounded-l-none px-2"
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {renderChart()}
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-purple-500" />
                Energy Distribution
              </CardTitle>
              <CardDescription>Current energy sources and usage</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={energyDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {energyDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value.toFixed(1)}W`, name]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                Performance Metrics
              </CardTitle>
              <CardDescription>System health and performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={performanceData}>
                  <RadialBar
                    minAngle={15}
                    label={{ position: 'insideStart', fill: '#fff' }}
                    background
                    clockWise
                    dataKey="value"
                  />
                  <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                  <Tooltip formatter={(value, name) => [`${value.toFixed(1)}%`, name]} />
                </RadialBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Multi-metric Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Multi-Metric Overview
            </CardTitle>
            <CardDescription>Compare multiple metrics simultaneously</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" className="text-xs" />
                <YAxis yAxisId="left" className="text-xs" />
                <YAxis yAxisId="right" orientation="right" className="text-xs" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="power"
                  stroke={chartColors.power}
                  strokeWidth={2}
                  dot={false}
                  name="Power (W)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="battery"
                  stroke={chartColors.battery}
                  strokeWidth={2}
                  dot={false}
                  name="Battery (%)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="efficiency"
                  stroke={chartColors.efficiency}
                  strokeWidth={2}
                  dot={false}
                  name="Efficiency (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DataVisualization