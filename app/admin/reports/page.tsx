'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, FileText, Calendar, TrendingUp, DollarSign, Users, Activity } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [reportType, setReportType] = useState('profit');

  const profitData = [
    // Empty array - no data to display
  ];

  const tokenCommissionData = [
    // Empty array - no data to display
  ];

  const topMerchants = [
    // Empty array - no data to display
  ];

  const regionData = [
    // Empty array - no data to display
  ];

  const handleExport = (format: string) => {
    toast.success(`Report exported as ${format.toUpperCase()}`);
  };

  const totalProfit = profitData.reduce((sum, item) => sum + item.profit, 0);
  const totalCommission = 0;
  const totalVolume = profitData.reduce((sum, item) => sum + item.volume, 0);
  const totalMerchants = 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profit Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">Comprehensive revenue and performance insights</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => handleExport('csv')}>
              <Download className="h-4 w-4 mr-2" />
              CSV
            </Button>
            <Button variant="outline" onClick={() => handleExport('xlsx')}>
              <Download className="h-4 w-4 mr-2" />
              Excel
            </Button>
            <Button variant="outline" onClick={() => handleExport('pdf')}>
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>

        {/* Report Controls */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="profit">Profit Analysis</SelectItem>
                    <SelectItem value="commission">Commission Breakdown</SelectItem>
                    <SelectItem value="merchants">Merchant Performance</SelectItem>
                    <SelectItem value="regions">Regional Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Custom Date</label>
                <div className="flex space-x-2">
                  <Input type="date" />
                  <Input type="date" />
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Profit</p>
                  <p className="text-2xl font-bold">${totalProfit.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Commission</p>
                  <p className="text-2xl font-bold">${totalCommission.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Total Volume</p>
                  <p className="text-2xl font-bold">${totalVolume.toLocaleString()}</p>
                </div>
                <Activity className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Active Merchants</p>
                  <p className="text-2xl font-bold">{totalMerchants}</p>
                </div>
                <Users className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Profit Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={profitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value, name) => [
                      `$${value.toLocaleString()}`,
                      name === 'profit' ? 'Profit' : name === 'commission' ? 'Commission' : 'Volume'
                    ]}
                  />
                  <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} />
                  <Line type="monotone" dataKey="commission" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Commission by Token</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={tokenCommissionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="commission"
                    label={({ token, percentage }) => `${token}: ${percentage}%`}
                  >
                    {tokenCommissionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Commission']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Merchants */}
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Merchants by Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topMerchants.map((merchant, index) => (
                <div
                  key={merchant.name}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">#{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {merchant.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {merchant.transactions} transactions
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Volume</div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        ${merchant.volume.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Commission</div>
                      <div className="font-semibold text-green-600">
                        ${merchant.commission.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'merchants' ? value : `$${value.toLocaleString()}`,
                    name === 'merchants' ? 'Merchants' : 'Volume'
                  ]} />
                  <Bar dataKey="merchants" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="space-y-4">
                {regionData.map((region) => (
                  <div
                    key={region.region}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: region.color }}
                      ></div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {region.region}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {region.merchants} merchants
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ${region.volume.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
