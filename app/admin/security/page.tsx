'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Search, Download, AlertTriangle, Eye, Lock, Unlock, User, FileText, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function SecurityLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('7d');

  const securityLogs = [
    {
      id: 'SEC-001',
      type: 'admin_login',
      action: 'Admin Login',
      user: 'admin@grapepay.com',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      timestamp: new Date('2024-01-07T10:30:00'),
      status: 'success',
      severity: 'low',
      details: 'Successful admin login from trusted IP'
    },
    {
      id: 'SEC-002',
      type: 'failed_login',
      action: 'Failed Login Attempt',
      user: 'unknown@suspicious.com',
      ipAddress: '45.123.45.67',
      userAgent: 'curl/7.68.0',
      timestamp: new Date('2024-01-07T09:45:00'),
      status: 'blocked',
      severity: 'high',
      details: 'Multiple failed login attempts from suspicious IP - Rate limited'
    },
    {
      id: 'SEC-003',
      type: 'kyc_access',
      action: 'KYC Document Access',
      user: 'admin@grapepay.com',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      timestamp: new Date('2024-01-07T09:15:00'),
      status: 'success',
      severity: 'medium',
      details: 'Accessed KYC documents for merchant MER-002'
    },
    {
      id: 'SEC-004',
      type: 'wallet_reverification',
      action: 'Wallet Re-verification',
      user: 'merchant@techsolutions.com',
      ipAddress: '203.45.67.89',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      timestamp: new Date('2024-01-07T08:30:00'),
      status: 'pending',
      severity: 'medium',
      details: 'Merchant requested wallet re-verification for address 0x742d35...'
    },
    {
      id: 'SEC-005',
      type: 'admin_logout',
      action: 'Admin Logout',
      user: 'admin@grapepay.com',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      timestamp: new Date('2024-01-06T18:00:00'),
      status: 'success',
      severity: 'low',
      details: 'Admin session ended normally'
    }
  ];

  const getTypeIcon = (type: string) => {
    const icons = {
      admin_login: User,
      admin_logout: User,
      failed_login: AlertTriangle,
      kyc_access: FileText,
      wallet_reverification: Shield
    };
    
    const Icon = icons[type as keyof typeof icons] || Shield;
    return <Icon className="h-4 w-4" />;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      success: 'default',
      blocked: 'destructive',
      pending: 'secondary',
      failed: 'destructive'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getSeverityBadge = (severity: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      critical: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    };

    return (
      <Badge className={colors[severity as keyof typeof colors] || colors.low}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    );
  };

  const handleExportLogs = (format: string) => {
    toast.success(`Security logs exported as ${format.toUpperCase()}`);
  };

  const totalLogs = securityLogs.length;
  const highSeverityCount = securityLogs.filter(log => log.severity === 'high' || log.severity === 'critical').length;
  const failedLoginsCount = securityLogs.filter(log => log.type === 'failed_login').length;
  const suspiciousCount = securityLogs.filter(log => log.severity === 'high' && log.status === 'blocked').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Security Logs</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor all security-related activities across the platform</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => handleExportLogs('csv')}>
              <Download className="h-4 w-4 mr-2" />
              CSV
            </Button>
            <Button variant="outline" onClick={() => handleExportLogs('pdf')}>
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Logs</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalLogs}</p>
                </div>
                <Shield className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">High Priority</p>
                  <p className="text-2xl font-bold text-red-600">{highSeverityCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Failed Logins</p>
                  <p className="text-2xl font-bold text-orange-600">{failedLoginsCount}</p>
                </div>
                <Lock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Blocked</p>
                  <p className="text-2xl font-bold text-purple-600">{suspiciousCount}</p>
                </div>
                <Unlock className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by user, IP address, or action..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="admin_login">Admin Logins</SelectItem>
                  <SelectItem value="failed_login">Failed Logins</SelectItem>
                  <SelectItem value="kyc_access">KYC Access</SelectItem>
                  <SelectItem value="wallet_reverification">Wallet Re-verification</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityLogs.map((log) => (
                <div
                  key={log.id}
                  className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    log.severity === 'high' || log.severity === 'critical' 
                      ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      log.severity === 'high' || log.severity === 'critical'
                        ? 'bg-red-100 dark:bg-red-900'
                        : 'bg-blue-100 dark:bg-blue-900'
                    }`}>
                      {getTypeIcon(log.type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {log.action}
                        </span>
                        {(log.severity === 'high' || log.severity === 'critical') && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {log.user} • {log.ipAddress}
                      </div>
                      <div className="text-xs text-gray-400">
                        {log.timestamp.toLocaleString()} • {log.details}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col space-y-1">
                      {getStatusBadge(log.status)}
                      {getSeverityBadge(log.severity)}
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Suspicious Activity Alert */}
        {suspiciousCount > 0 && (
          <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-800 dark:text-red-200">
                <AlertTriangle className="h-5 w-5" />
                <span>Suspicious Activity Detected</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700 dark:text-red-300 mb-4">
                {suspiciousCount} suspicious activities have been automatically blocked. Review the logs above for details.
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                  Review Blocked IPs
                </Button>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                  Update Security Rules
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
