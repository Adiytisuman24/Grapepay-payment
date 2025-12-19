'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertTriangle, Bell, Search, Filter, Eye, CheckCircle, XCircle, Clock, FileText, Wallet, User } from 'lucide-react';
import { toast } from 'sonner';

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('unread');
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');

  const alerts = [
    {
      id: 'ALT-001',
      type: 'kyc_reupload',
      title: 'KYC Document Re-upload Required',
      message: 'Merchant Tech Solutions Ltd has uploaded new KYC documents for review',
      severity: 'medium',
      status: 'unread',
      timestamp: new Date('2024-01-07T10:30:00'),
      merchantId: 'MER-002',
      merchantName: 'Tech Solutions Ltd',
      details: 'Previous documents were rejected due to poor image quality. New documents uploaded.',
      actionRequired: true
    },
    {
      id: 'ALT-002',
      type: 'suspicious_transaction',
      title: 'Suspicious Transaction Pattern',
      message: 'Multiple high-value transactions detected from wallet 0x742d35...',
      severity: 'high',
      status: 'unread',
      timestamp: new Date('2024-01-07T09:45:00'),
      merchantId: 'MER-003',
      merchantName: 'Digital Agency',
      details: '5 transactions over $10,000 within 1 hour. Possible money laundering activity.',
      actionRequired: true
    },
    {
      id: 'ALT-003',
      type: 'wallet_discrepancy',
      title: 'Wallet Address Discrepancy',
      message: 'Merchant provided different wallet address than previously verified',
      severity: 'high',
      status: 'investigating',
      timestamp: new Date('2024-01-07T08:15:00'),
      merchantId: 'MER-004',
      merchantName: 'Crypto Merchant',
      details: 'Original: 0x1a2b3c... New: 0x9z8y7x... Requires immediate verification.',
      actionRequired: true,
      resolutionNotes: 'Contacted merchant for clarification. Awaiting response.'
    },
    {
      id: 'ALT-004',
      type: 'failed_conversion',
      title: 'Failed Crypto Conversion',
      message: 'Multiple conversion failures detected on Ethereum network',
      severity: 'critical',
      status: 'resolved',
      timestamp: new Date('2024-01-06T16:20:00'),
      merchantId: null,
      merchantName: 'System Alert',
      details: 'Gas price spike caused 12 conversion failures. Issue resolved after gas optimization.',
      actionRequired: false,
      resolutionNotes: 'Implemented dynamic gas pricing. Monitoring for 24 hours.'
    },
    {
      id: 'ALT-005',
      type: 'rate_limit_exceeded',
      title: 'API Rate Limit Exceeded',
      message: 'Merchant exceeded API rate limits for conversion requests',
      severity: 'low',
      status: 'read',
      timestamp: new Date('2024-01-06T14:10:00'),
      merchantId: 'MER-002',
      merchantName: 'Tech Solutions Ltd',
      details: 'Merchant made 1,200 requests in 1 minute. Rate limited for 15 minutes.',
      actionRequired: false
    }
  ];

  const getTypeIcon = (type: string) => {
    const icons = {
      kyc_reupload: FileText,
      suspicious_transaction: AlertTriangle,
      wallet_discrepancy: Wallet,
      failed_conversion: XCircle,
      rate_limit_exceeded: Clock
    };
    
    const Icon = icons[type as keyof typeof icons] || Bell;
    return <Icon className="h-4 w-4" />;
  };

  const getSeverityBadge = (severity: string) => {
    const colors = {
      low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };

    return (
      <Badge className={colors[severity as keyof typeof colors] || colors.low}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      unread: 'destructive',
      read: 'secondary',
      investigating: 'default',
      resolved: 'outline'
    } as const;

    const icons = {
      unread: Bell,
      read: Eye,
      investigating: Clock,
      resolved: CheckCircle
    };

    const Icon = icons[status as keyof typeof icons];

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleMarkAsRead = (alertId: string) => {
    toast.success(`Alert ${alertId} marked as read`);
  };

  const handleStartInvestigation = (alertId: string) => {
    toast.success(`Investigation started for alert ${alertId}`);
  };

  const handleResolveAlert = (alertId: string) => {
    if (!resolutionNotes.trim()) {
      toast.error('Please provide resolution notes');
      return;
    }
    toast.success(`Alert ${alertId} resolved successfully`);
    setResolutionNotes('');
  };

  const unreadCount = alerts.filter(a => a.status === 'unread').length;
  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const investigatingCount = alerts.filter(a => a.status === 'investigating').length;
  const resolvedCount = alerts.filter(a => a.status === 'resolved').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Alerts</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor and manage platform alerts and notifications</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">{unreadCount} unread alerts</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
                  <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
                </div>
                <Bell className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Critical</p>
                  <p className="text-2xl font-bold text-purple-600">{criticalCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Investigating</p>
                  <p className="text-2xl font-bold text-yellow-600">{investigatingCount}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">{resolvedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
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
                  placeholder="Search alerts by title, merchant, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    alert.status === 'unread' 
                      ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' 
                      : alert.severity === 'critical'
                      ? 'border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      alert.severity === 'critical'
                        ? 'bg-purple-100 dark:bg-purple-900'
                        : alert.severity === 'high'
                        ? 'bg-orange-100 dark:bg-orange-900'
                        : alert.status === 'unread'
                        ? 'bg-red-100 dark:bg-red-900'
                        : 'bg-blue-100 dark:bg-blue-900'
                    }`}>
                      {getTypeIcon(alert.type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {alert.title}
                        </span>
                        {alert.actionRequired && (
                          <Badge variant="outline" className="text-xs">
                            Action Required
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {alert.merchantName} • {alert.timestamp.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400 max-w-md">
                        {alert.message}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col space-y-1">
                      {getSeverityBadge(alert.severity)}
                      {getStatusBadge(alert.status)}
                    </div>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedAlert(alert)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Alert Details - {selectedAlert?.title}</DialogTitle>
                          </DialogHeader>
                          {selectedAlert && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Alert ID</label>
                                  <p className="text-gray-900 dark:text-white">{selectedAlert.id}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                                  <p className="text-gray-900 dark:text-white">{selectedAlert.type.replace('_', ' ').toUpperCase()}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Merchant</label>
                                  <p className="text-gray-900 dark:text-white">{selectedAlert.merchantName}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Timestamp</label>
                                  <p className="text-gray-900 dark:text-white">{selectedAlert.timestamp.toLocaleString()}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Severity</label>
                                  <div className="mt-1">{getSeverityBadge(selectedAlert.severity)}</div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                                  <div className="mt-1">{getStatusBadge(selectedAlert.status)}</div>
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Details</label>
                                <p className="text-gray-900 dark:text-white mt-1">{selectedAlert.details}</p>
                              </div>

                              {selectedAlert.resolutionNotes && (
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Previous Notes</label>
                                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{selectedAlert.resolutionNotes}</p>
                                </div>
                              )}

                              {selectedAlert.status !== 'resolved' && (
                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                      Resolution Notes
                                    </label>
                                    <Textarea
                                      value={resolutionNotes}
                                      onChange={(e) => setResolutionNotes(e.target.value)}
                                      placeholder="Add notes about investigation or resolution..."
                                      rows={3}
                                    />
                                  </div>
                                  <div className="flex space-x-3">
                                    {selectedAlert.status === 'unread' && (
                                      <Button 
                                        onClick={() => handleMarkAsRead(selectedAlert.id)}
                                        variant="outline"
                                      >
                                        <Eye className="h-4 w-4 mr-2" />
                                        Mark as Read
                                      </Button>
                                    )}
                                    {selectedAlert.status !== 'investigating' && (
                                      <Button 
                                        onClick={() => handleStartInvestigation(selectedAlert.id)}
                                        className="bg-yellow-600 hover:bg-yellow-700"
                                      >
                                        <Clock className="h-4 w-4 mr-2" />
                                        Start Investigation
                                      </Button>
                                    )}
                                    <Button 
                                      onClick={() => handleResolveAlert(selectedAlert.id)}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Resolve Alert
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {alert.status === 'unread' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleMarkAsRead(alert.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
