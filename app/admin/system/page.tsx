'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Server, Database, Zap, Globe, AlertTriangle, CheckCircle, Clock, Wifi } from 'lucide-react';
import { toast } from 'sonner';

export default function SystemHealthPage() {
  const [refreshing, setRefreshing] = useState(false);

  const systemServices = [
    {
      name: 'Payments API',
      status: 'operational',
      uptime: 99.9,
      responseTime: 145,
      lastCheck: new Date(),
      endpoint: '/api/payments'
    },
    {
      name: 'Auth API',
      status: 'operational',
      uptime: 99.8,
      responseTime: 89,
      lastCheck: new Date(),
      endpoint: '/api/auth'
    },
    {
      name: 'Conversion Engine',
      status: 'operational',
      uptime: 99.7,
      responseTime: 234,
      lastCheck: new Date(),
      endpoint: '/api/convert'
    },
    {
      name: 'Blockchain Sync',
      status: 'degraded',
      uptime: 98.5,
      responseTime: 567,
      lastCheck: new Date(),
      endpoint: '/api/blockchain'
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: 99.9,
      responseTime: 45,
      lastCheck: new Date(),
      endpoint: 'supabase'
    }
  ];

  const uptimeData = [
    { time: '00:00', uptime: 100, errors: 0 },
    { time: '04:00', uptime: 99.8, errors: 2 },
    { time: '08:00', uptime: 99.9, errors: 1 },
    { time: '12:00', uptime: 99.7, errors: 3 },
    { time: '16:00', uptime: 99.9, errors: 1 },
    { time: '20:00', uptime: 100, errors: 0 },
    { time: '24:00', uptime: 99.8, errors: 2 }
  ];

  const performanceData = [
    { time: '00:00', responseTime: 120, errorRate: 0.1 },
    { time: '04:00', responseTime: 145, errorRate: 0.2 },
    { time: '08:00', responseTime: 189, errorRate: 0.1 },
    { time: '12:00', responseTime: 234, errorRate: 0.3 },
    { time: '16:00', responseTime: 156, errorRate: 0.1 },
    { time: '20:00', responseTime: 134, errorRate: 0.1 },
    { time: '24:00', responseTime: 145, errorRate: 0.2 }
  ];

  const blockchainStatus = [
    { chain: 'Ethereum', status: 'synced', blockHeight: 18750234, lastSync: '2 min ago' },
    { chain: 'Polygon', status: 'synced', blockHeight: 51234567, lastSync: '1 min ago' },
    { chain: 'BSC', status: 'syncing', blockHeight: 34567890, lastSync: '5 min ago' },
    { chain: 'Arbitrum', status: 'synced', blockHeight: 15678901, lastSync: '3 min ago' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'down':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      operational: 'default',
      degraded: 'secondary',
      down: 'destructive',
      synced: 'default',
      syncing: 'secondary'
    } as const;

    const colors = {
      operational: 'text-green-700 bg-green-100 dark:text-green-200 dark:bg-green-900',
      degraded: 'text-yellow-700 bg-yellow-100 dark:text-yellow-200 dark:bg-yellow-900',
      down: 'text-red-700 bg-red-100 dark:text-red-200 dark:bg-red-900',
      synced: 'text-green-700 bg-green-100 dark:text-green-200 dark:bg-green-900',
      syncing: 'text-blue-700 bg-blue-100 dark:text-blue-200 dark:bg-blue-900'
    };

    return (
      <Badge className={colors[status as keyof typeof colors] || colors.operational}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
    toast.success('System status refreshed');
  };

  const operationalCount = systemServices.filter(s => s.status === 'operational').length;
  const degradedCount = systemServices.filter(s => s.status === 'degraded').length;
  const downCount = systemServices.filter(s => s.status === 'down').length;
  const avgResponseTime = Math.round(systemServices.reduce((sum, s) => sum + s.responseTime, 0) / systemServices.length);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Health</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor platform performance and service uptime</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">All Systems Operational</span>
            </div>
            <Button onClick={handleRefresh} disabled={refreshing}>
              {refreshing ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Activity className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
          </div>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Operational</p>
                  <p className="text-2xl font-bold text-green-600">{operationalCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Degraded</p>
                  <p className="text-2xl font-bold text-yellow-600">{degradedCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Down</p>
                  <p className="text-2xl font-bold text-red-600">{downCount}</p>
                </div>
                <Server className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response</p>
                  <p className="text-2xl font-bold text-blue-600">{avgResponseTime}ms</p>
                </div>
                <Zap className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="h-5 w-5" />
              <span>Service Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemServices.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      {getStatusIcon(service.status)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {service.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {service.endpoint} • Last check: {service.lastCheck.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Uptime</div>
                      <div className="font-medium">{service.uptime}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Response</div>
                      <div className="font-medium">{service.responseTime}ms</div>
                    </div>
                    {getStatusBadge(service.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>24-Hour Uptime</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={uptimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[98, 100]} />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'uptime' ? `${value}%` : value,
                      name === 'uptime' ? 'Uptime' : 'Errors'
                    ]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="uptime" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response Time & Error Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'responseTime' ? `${value}ms` : `${value}%`,
                      name === 'responseTime' ? 'Response Time' : 'Error Rate'
                    ]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="responseTime" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="errorRate" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Blockchain Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Blockchain Sync Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blockchainStatus.map((chain) => (
                <div
                  key={chain.chain}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <Wifi className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {chain.chain}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Block #{chain.blockHeight.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(chain.status)}
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {chain.lastSync}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Database Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Database Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">CPU Usage</span>
                  <span className="text-sm font-medium">23%</span>
                </div>
                <Progress value={23} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</span>
                  <span className="text-sm font-medium">67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Storage Usage</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">45ms</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Avg Query Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1,234</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Active Connections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">99.9%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
