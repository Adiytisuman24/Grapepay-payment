'use client';

import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  Users, 
  FileCheck, 
  Activity, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Wallet,
  CreditCard,
  BarChart3,
  PieChart,
  Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalProfit: 0,
    activeMerchants: 0,
    kycPending: 0,
    kycApproved: 0,
    kycRejected: 0,
    totalTransactions: 0,
    cryptoWalletsVerified: 0,
    transactionsToday: 0,
    transactionsWeek: 0,
    transactionsMonth: 0,
    settlementsPending: 0,
    settlementsCompleted: 0,
    systemHealth: {
      apiLatency: 0,
      failedTransactions: 0,
      chainCongestion: 'Normal'
    }
  });

  const profitData = [];

  const commissionData = [];

  const kycStatusData = [
    { name: 'Approved', value: 0, color: '#10b981' },
    { name: 'Pending', value: 0, color: '#f59e0b' },
    { name: 'Rejected', value: 0, color: '#ef4444' }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Overview</h1>
            <p className="text-gray-600 dark:text-gray-400">Complete platform monitoring and control</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">All Systems Operational</span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics.totalRevenue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Total Profit</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics.totalProfit.toLocaleString()}</div>
              <div className="flex items-center text-xs text-blue-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0% from yesterday
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Active Merchants</CardTitle>
              <Users className="h-4 w-4 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.activeMerchants.toLocaleString()}</div>
              <div className="flex items-center text-xs text-purple-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0 this week
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-100">KYC Pending</CardTitle>
              <FileCheck className="h-4 w-4 text-yellow-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.kycPending}</div>
              <div className="flex items-center text-xs text-yellow-200">
                <Clock className="h-3 w-3 mr-1" />
                No pending reviews
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">KYC Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{metrics.kycApproved.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{metrics.totalTransactions.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crypto Wallets Verified</CardTitle>
              <Wallet className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{metrics.cryptoWalletsVerified.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Settlements Pending</CardTitle>
              <CreditCard className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{metrics.settlementsPending}</div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Activity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>Today</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{metrics.transactionsToday}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-500" />
                <span>This Week</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{metrics.transactionsWeek.toLocaleString()}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                <span>This Month</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{metrics.transactionsMonth.toLocaleString()}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Profit Trends</CardTitle>
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
                      name === 'profit' ? `$${value.toLocaleString()}` : value,
                      name === 'profit' ? 'Profit' : 'Transactions'
                    ]}
                  />
                  <Line type="monotone" dataKey="profit" stroke="#8b5cf6" strokeWidth={3} />
                  <Line type="monotone" dataKey="transactions" stroke="#06b6d4" strokeWidth={2} />
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
                <BarChart data={commissionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="token" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Profit']} />
                  <Bar dataKey="profit" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* KYC Status and System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>KYC Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={kycStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {kycStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>System Health</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">API Latency</div>
                    <div className="text-2xl font-bold text-green-600">0ms</div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Failed Transactions</div>
                    <div className="text-2xl font-bold text-green-600">0%</div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Chain Congestion</div>
                    <div className="text-2xl font-bold text-green-600">Normal</div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col space-y-2" asChild>
                <a href="/admin/kyc">
                  <FileCheck className="h-6 w-6" />
                  <span className="text-sm">Review KYCs (0)</span>
                </a>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2" asChild>
                <a href="/admin/merchants">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Manage Merchants</span>
                </a>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2" asChild>
                <a href="/admin/transactions">
                  <Activity className="h-6 w-6" />
                  <span className="text-sm">View Transactions</span>
                </a>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2" asChild>
                <a href="/admin/reports">
                  <TrendingUp className="h-6 w-6" />
                  <span className="text-sm">Generate Reports</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
