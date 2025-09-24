import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from "framer-motion";
import { Calculator, Zap, Sun, Home, DollarSign, Settings, Wifi } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

const InteractivePricingCalculator = () => {
  const [systemSize, setSystemSize] = useState(5);
  const [inverterType, setInverterType] = useState('smart');
  const [monitoringType, setMonitoringType] = useState('basic');
  const [installationType, setInstallationType] = useState('standard');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const controls = useAnimation();

  const inverterTypeMultiplier = {
    'basic': 1.0,
    'smart': 1.2,
    'premium': 1.5
  };

  const monitoringMultiplier = {
    'basic': 1.0,
    'smart': 1.3,
    'premium': 1.6
  };

  const installationMultiplier = {
    'standard': 1.0,
    'premium': 1.3,
    'basic': 0.8
  };

  const calculatePricing = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const basePrice = systemSize * 25000; // ₹25,000 per kW for inverter
      const inverterMultiplier = inverterTypeMultiplier[inverterType];
      const monitoringMultiplierValue = monitoringMultiplier[monitoringType];
      const installationMultiplierValue = installationMultiplier[installationType];
      
      const totalPrice = basePrice * inverterMultiplier * monitoringMultiplierValue * installationMultiplierValue;
      const monthlyGeneration = systemSize * 120; // kWh per month
      const yearlySavings = monthlyGeneration * 12 * 8; // ₹8 per kWh
      const paybackPeriod = totalPrice / yearlySavings;
      
      setResults({
        totalPrice: Math.round(totalPrice),
        monthlyGeneration: Math.round(monthlyGeneration),
        yearlySavings: Math.round(yearlySavings),
        paybackPeriod: Math.round(paybackPeriod * 10) / 10,
        co2Reduction: Math.round(monthlyGeneration * 12 * 0.82) // kg CO2 per year
      });
      
      setIsCalculating(false);
    }, 2000);
  };

  useEffect(() => {
    controls.start({
      scale: [1, 1.02, 1],
      transition: { duration: 2, repeat: Infinity }
    });
  }, [controls]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <Calculator className="w-8 h-8 text-purple-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Solar System Calculator
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get an instant estimate for your solar inverter system. Customize your requirements and see real-time pricing.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
            <Settings className="w-5 h-5 mr-2 text-purple-600" />
            System Configuration
          </h3>
          
          <div className="space-y-6">
            {/* System Size */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                System Size: {systemSize} kW
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={systemSize}
                onChange={(e) => setSystemSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1 kW</span>
                <span>20 kW</span>
              </div>
            </div>

            {/* Inverter Type */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                <Zap className="w-4 h-4 inline mr-1" />
                Inverter Type
              </label>
              <select
                value={inverterType}
                onChange={(e) => setInverterType(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="basic">Basic Inverter</option>
                <option value="smart">Smart Inverter (+20%)</option>
                <option value="premium">Premium Inverter (+50%)</option>
              </select>
            </div>

            {/* Monitoring Type */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                <Wifi className="w-4 h-4 inline mr-1" />
                Monitoring System
              </label>
              <select
                value={monitoringType}
                onChange={(e) => setMonitoringType(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="basic">Basic Monitoring</option>
                <option value="smart">Smart Monitoring (+30%)</option>
                <option value="premium">Premium Monitoring (+60%)</option>
              </select>
            </div>

            {/* Installation Type */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                <Home className="w-4 h-4 inline mr-1" />
                Installation Type
              </label>
              <select
                value={installationType}
                onChange={(e) => setInstallationType(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="basic">Basic Installation (-20%)</option>
                <option value="standard">Standard Installation</option>
                <option value="premium">Premium Installation (+30%)</option>
              </select>
            </div>

            <Button
              onClick={calculatePricing}
              disabled={isCalculating}
              className="w-full py-3 text-lg font-semibold"
            >
              {isCalculating ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Calculating...
                </div>
              ) : (
                <>
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Price
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Results Panel */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-green-600" />
            Pricing Results
          </h3>
          
          {results ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
                    ₹{results.totalPrice.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total System Cost</div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {results.monthlyGeneration} kWh
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Generation</div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    ₹{results.yearlySavings.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Yearly Savings</div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {results.paybackPeriod} years
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Payback Period</div>
                </div>
              </div>
              
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold text-emerald-600">
                      {results.co2Reduction} kg CO₂ saved/year
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Environmental Impact</div>
                  </div>
                  <Sun className="w-8 h-8 text-emerald-600" />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white">
                <div className="text-center">
                  <div className="text-lg font-semibold mb-2">Ready to Go Solar?</div>
                  <Button variant="secondary" className="bg-background text-foreground hover:bg-muted">
                    Get Quote
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Configure your system and click calculate to see results</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default InteractivePricingCalculator;