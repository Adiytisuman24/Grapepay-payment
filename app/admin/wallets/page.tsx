'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Wallet, Search, Filter, Eye, CheckCircle, XCircle, Clock, Shield, Download, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function WalletVerificationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBlockchain, setFilterBlockchain] = useState('all');
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const walletSubmissions = [
    {
      id: 'WV-001',
      merchantName: 'Tech Solutions Ltd',
      merchantId: 'MER-002',
      walletAddress: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
      blockchain: 'Ethereum',
      submissionDate: new Date('2024-01-05'),
      status: 'pending',
      riskScore: 'low',
      transactionHistory: 156,
      balance: '2.45 ETH'
    },
    {
      id: 'WV-002',
      merchantName: 'Digital Agency',
      merchantId: 'MER-003',
      walletAddress: '0x8ba1f109551bD432803012645Hac136c0532925a',
      blockchain: 'Polygon',
      submissionDate: new Date('2024-01-04'),
      status: 'verified',
      riskScore: 'low',
      transactionHistory: 89,
      balance: '1,250 MATIC'
    },
    {
      id: 'WV-003',
      merchantName: 'Crypto Merchant',
      merchantId: 'MER-004',
      walletAddress: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
      blockchain: 'BSC',
      submissionDate: new Date('2024-01-03'),
      status: 'rejected',
      riskScore: 'high',
      transactionHistory: 12,
      balance: '0.05 BNB',
      rejectionReason: 'Suspicious transaction patterns detected'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      verified: 'default',
      pending: 'secondary',
      rejected: 'destructive'
    } as const;

    const icons = {
      verified: CheckCircle,
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

  const getRiskBadge = (risk: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };

    return (
      <Badge className={colors[risk as keyof typeof colors] || colors.low}>
        {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
      </Badge>
    );
  };

  const handleVerifyWallet = (walletId: string) => {
    toast.success(`Wallet ${walletId} verified successfully!`);
  };

  const handleRejectWallet = (walletId: string) => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }
    toast.success(`Wallet ${walletId} rejected with reason provided`);
    setRejectionReason('');
  };

  const handleBlockWallet = (walletId: string) => {
    toast.success(`Wallet ${walletId} blocked for suspicious activity`);
  };

  const handleExportLogs = () => {
    toast.success('Wallet verification logs exported successfully!');
  };

  const verifiedCount = walletSubmissions.filter(w => w.status === 'verified').length;
  const pendingCount = walletSubmissions.filter(w => w.status === 'pending').length;
  const rejectedCount = walletSubmissions.filter(w => w.status === 'rejected').length;
  const highRiskCount = walletSubmissions.filter(w => w.riskScore === 'high').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Wallet Verification</h1>
            <p className="text-gray-600 dark:text-gray-400">Review and verify merchant wallet addresses</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleExportLogs}>
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Verified Wallets</p>
                  <p className="text-2xl font-bold text-green-600">{verifiedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending Review</p>
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">High Risk</p>
                  <p className="text-2xl font-bold text-orange-600">{highRiskCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
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
                  placeholder="Search by merchant name, wallet address, or ID..."
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
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterBlockchain} onValueChange={setFilterBlockchain}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by blockchain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blockchains</SelectItem>
                  <SelectItem value="Ethereum">Ethereum</SelectItem>
                  <SelectItem value="Polygon">Polygon</SelectItem>
                  <SelectItem value="BSC">BSC</SelectItem>
                  <SelectItem value="Arbitrum">Arbitrum</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {walletSubmissions.map((wallet) => (
                <div
                  key={wallet.id}
                  className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    wallet.riskScore === 'high' ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {wallet.merchantName}
                        </span>
                        {wallet.riskScore === 'high' && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {wallet.walletAddress.substring(0, 20)}...{wallet.walletAddress.substring(wallet.walletAddress.length - 8)}
                      </div>
                      <div className="text-xs text-gray-400">
                        {wallet.blockchain} • {wallet.submissionDate.toLocaleDateString()} • {wallet.transactionHistory} txns
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Balance</div>
                      <div className="font-medium">{wallet.balance}</div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      {getStatusBadge(wallet.status)}
                      {getRiskBadge(wallet.riskScore)}
                    </div>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedWallet(wallet)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Wallet Details - {selectedWallet?.merchantName}</DialogTitle>
                          </DialogHeader>
                          {selectedWallet && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Wallet ID</label>
                                  <p className="text-gray-900 dark:text-white">{selectedWallet.id}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Merchant</label>
                                  <p className="text-gray-900 dark:text-white">{selectedWallet.merchantName}</p>
                                </div>
                                <div className="col-span-2">
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Wallet Address</label>
                                  <p className="text-gray-900 dark:text-white font-mono text-sm break-all">{selectedWallet.walletAddress}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Blockchain</label>
                                  <p className="text-gray-900 dark:text-white">{selectedWallet.blockchain}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Balance</label>
                                  <p className="text-gray-900 dark:text-white">{selectedWallet.balance}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Transaction History</label>
                                  <p className="text-gray-900 dark:text-white">{selectedWallet.transactionHistory} transactions</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Risk Assessment</label>
                                  <div className="mt-1">{getRiskBadge(selectedWallet.riskScore)}</div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                                  <div className="mt-1">{getStatusBadge(selectedWallet.status)}</div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Submission Date</label>
                                  <p className="text-gray-900 dark:text-white">{selectedWallet.submissionDate.toLocaleDateString()}</p>
                                </div>
                              </div>

                              {selectedWallet.rejectionReason && (
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Rejection Reason</label>
                                  <p className="text-red-600 dark:text-red-400 text-sm mt-1">{selectedWallet.rejectionReason}</p>
                                </div>
                              )}

                              {selectedWallet.status === 'pending' && (
                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                      Rejection Reason (if rejecting)
                                    </label>
                                    <Textarea
                                      value={rejectionReason}
                                      onChange={(e) => setRejectionReason(e.target.value)}
                                      placeholder="Provide reason for rejection..."
                                      rows={3}
                                    />
                                  </div>
                                  <div className="flex space-x-3">
                                    <Button 
                                      onClick={() => handleVerifyWallet(selectedWallet.id)}
                                      className="flex-1 bg-green-600 hover:bg-green-700"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Verify Wallet
                                    </Button>
                                    <Button 
                                      onClick={() => handleRejectWallet(selectedWallet.id)}
                                      variant="destructive"
                                      className="flex-1"
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject
                                    </Button>
                                  </div>
                                  {selectedWallet.riskScore === 'high' && (
                                    <Button 
                                      onClick={() => handleBlockWallet(selectedWallet.id)}
                                      variant="outline"
                                      className="w-full border-red-300 text-red-600 hover:bg-red-50"
                                    >
                                      <Shield className="h-4 w-4 mr-2" />
                                      Block Suspicious Wallet
                                    </Button>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {wallet.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleVerifyWallet(wallet.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRejectWallet(wallet.id)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                          {wallet.riskScore === 'high' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleBlockWallet(wallet.id)}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <Shield className="h-4 w-4" />
                            </Button>
                          )}
                        </>
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
