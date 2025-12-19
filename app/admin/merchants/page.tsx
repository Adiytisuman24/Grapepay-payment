'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Search, Filter, Eye, CheckCircle, XCircle, Clock, Wallet, FileText, ToggleLeft, ToggleRight } from 'lucide-react';
import { toast } from 'sonner';

interface Merchant {
  id: string;
  businessName: string;
  email: string;
  region: string;
  kycStatus: 'approved' | 'pending' | 'rejected';
  testMode: boolean;
  walletAddress: string;
  walletStatus: 'active' | 'inactive';
  totalVolume: number;
  transactionCount: number;
  registrationDate: string;
  lastActivity: string;
}

export default function MerchantsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);

  const merchants: Merchant[] = [
    {
      id: "MER-001",
      businessName: "Grape Labs",
      email: "hello@grape.com",
      region: "Global",
      kycStatus: "approved",
      testMode: false,
      walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
      walletStatus: "active",
      totalVolume: 1250000,
      transactionCount: 450,
      registrationDate: "2023-01-01",
      lastActivity: "2023-12-19"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: 'default',
      pending: 'secondary',
      rejected: 'destructive'
    } as const;

    const icons = {
      approved: CheckCircle,
      pending: Clock,
      rejected: XCircle
    };

    const Icon = icons[status as keyof typeof icons];

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleToggleMode = (merchantId: string, currentMode: boolean) => {
    toast.success(`${merchantId} switched to ${currentMode ? 'Test' : 'Live'} mode`);
  };

  const handleApproveKYC = (merchantId: string) => {
    toast.success(`KYC approved for ${merchantId}`);
  };

  const handleRejectKYC = (merchantId: string) => {
    toast.success(`KYC rejected for ${merchantId}`);
  };

  const approvedCount = merchants.filter(m => m.kycStatus === 'approved').length;
  const pendingCount = merchants.filter(m => m.kycStatus === 'pending').length;
  const rejectedCount = merchants.filter(m => m.kycStatus === 'rejected').length;
  const activeWallets = merchants.filter(m => m.walletStatus === 'active').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Merchant Management</h1>
            <p className="text-gray-600 dark:text-gray-400">View, approve, and manage all registered merchants</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Merchants</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{merchants.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">KYC Approved</p>
                  <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">KYC Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Wallets</p>
                  <p className="text-2xl font-bold text-purple-600">{activeWallets}</p>
                </div>
                <Wallet className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by business name, email, or merchant ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {merchants.map((merchant) => (
                <div
                  key={merchant.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {merchant.businessName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {merchant.email} • {merchant.id} • {merchant.region}
                      </div>
                      <div className="text-xs text-gray-400">
                        Wallet: {merchant.walletAddress.substring(0, 10)}...{merchant.walletAddress.substring(merchant.walletAddress.length - 8)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Volume</div>
                      <div className="font-medium">${merchant.totalVolume.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Transactions</div>
                      <div className="font-medium">{merchant.transactionCount}</div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      {getStatusBadge(merchant.kycStatus)}
                      <Badge variant={merchant.testMode ? 'secondary' : 'default'}>
                        {merchant.testMode ? 'Test' : 'Live'}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedMerchant(merchant)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Merchant Details - {selectedMerchant?.businessName}</DialogTitle>
                          </DialogHeader>
                          {selectedMerchant && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Merchant ID</label>
                                  <p className="text-gray-900 dark:text-white">{selectedMerchant.id}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Business Name</label>
                                  <p className="text-gray-900 dark:text-white">{selectedMerchant.businessName}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                  <p className="text-gray-900 dark:text-white">{selectedMerchant.email}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Region</label>
                                  <p className="text-gray-900 dark:text-white">{selectedMerchant.region}</p>
                                </div>
                                <div className="col-span-2">
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Wallet Address</label>
                                  <p className="text-gray-900 dark:text-white font-mono text-sm">{selectedMerchant.walletAddress}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Registration Date</label>
                                  <p className="text-gray-900 dark:text-white">{new Date(selectedMerchant.registrationDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Activity</label>
                                  <p className="text-gray-900 dark:text-white">{new Date(selectedMerchant.lastActivity).toLocaleDateString()}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">KYC Status</label>
                                  <div className="mt-1">{getStatusBadge(selectedMerchant.kycStatus)}</div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Mode</label>
                                  <div className="mt-1">
                                    <Badge variant={selectedMerchant.testMode ? 'secondary' : 'default'}>
                                      {selectedMerchant.testMode ? 'Test Mode' : 'Live Mode'}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h4 className="font-medium text-gray-900 dark:text-white">Actions</h4>
                                <div className="flex space-x-3">
                                  <Button variant="outline">
                                    <FileText className="h-4 w-4 mr-2" />
                                    View Documents
                                  </Button>
                                  <Button 
                                    onClick={() => handleToggleMode(selectedMerchant.id, selectedMerchant.testMode)}
                                    variant="outline"
                                  >
                                    {selectedMerchant.testMode ? <ToggleRight className="h-4 w-4 mr-2" /> : <ToggleLeft className="h-4 w-4 mr-2" />}
                                    Toggle Mode
                                  </Button>
                                </div>
                                
                                {selectedMerchant.kycStatus === 'pending' && (
                                  <div className="flex space-x-3">
                                    <Button 
                                      onClick={() => handleApproveKYC(selectedMerchant.id)}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve KYC
                                    </Button>
                                    <Button 
                                      onClick={() => handleRejectKYC(selectedMerchant.id)}
                                      variant="destructive"
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject KYC
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
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
