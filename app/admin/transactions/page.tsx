'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Activity, Search, Filter, Eye, ExternalLink, Flag, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminTransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const transactions = [];

  const getStatusBadge = (status: string) => {
    const variants = {
      success: 'default',
      pending: 'secondary',
      failed: 'destructive'
    } as const;

    const icons = {
      success: CheckCircle,
      pending: Clock,
      failed: XCircle
    };

    const Icon = icons[status as keyof typeof icons];

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getSettlementBadge = (status: string) => {
    const variants = {
      settled: 'default',
      pending: 'secondary',
      failed: 'destructive'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleFlagTransaction = (txnId: string) => {
    toast.success(`Transaction ${txnId} flagged for review`);
  };

  const handleUnflagTransaction = (txnId: string) => {
    toast.success(`Flag removed from transaction ${txnId}`);
  };

  const successCount = transactions.filter(t => t.status === 'success').length;
  const pendingCount = transactions.filter(t => t.status === 'pending').length;
  const failedCount = transactions.filter(t => t.status === 'failed').length;
  const flaggedCount = transactions.filter(t => t.flagged).length;
  const totalVolume = transactions.reduce((sum, t) => sum + t.usdValue, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transaction Logs</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor all transactions across merchant wallets</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Volume</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalVolume.toLocaleString()}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Success</p>
                  <p className="text-2xl font-bold text-green-600">{successCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{failedCount}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Flagged</p>
                  <p className="text-2xl font-bold text-orange-600">{flaggedCount}</p>
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
                  placeholder="Search by transaction ID, merchant, or hash..."
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
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    transaction.flagged ? 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20' : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {transaction.id}
                        </span>
                        {transaction.flagged && (
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.merchantName} • {transaction.amount} {transaction.token} (${transaction.usdValue.toLocaleString()})
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(transaction.timestamp).toLocaleString()} • {transaction.chain}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Status</div>
                      <div className="flex space-x-1">
                        {getStatusBadge(transaction.status)}
                        {getSettlementBadge(transaction.settlementStatus)}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedTransaction(transaction)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Transaction Details - {selectedTransaction?.id}</DialogTitle>
                          </DialogHeader>
                          {selectedTransaction && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Transaction ID</label>
                                  <p className="text-gray-900 dark:text-white">{selectedTransaction.id}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Merchant</label>
                                  <p className="text-gray-900 dark:text-white">{selectedTransaction.merchantName}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                                  <p className="text-gray-900 dark:text-white">{selectedTransaction.amount} {selectedTransaction.token}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">USD Value</label>
                                  <p className="text-gray-900 dark:text-white">${selectedTransaction.usdValue.toLocaleString()}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Chain</label>
                                  <p className="text-gray-900 dark:text-white">{selectedTransaction.chain}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Gas Fee</label>
                                  <p className="text-gray-900 dark:text-white">{selectedTransaction.gasFee} {selectedTransaction.token}</p>
                                </div>
                                <div className="col-span-2">
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Transaction Hash</label>
                                  <p className="text-gray-900 dark:text-white font-mono text-sm break-all">{selectedTransaction.hash}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Timestamp</label>
                                  <p className="text-gray-900 dark:text-white">{new Date(selectedTransaction.timestamp).toLocaleString()}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                                  <div className="mt-1 flex space-x-2">
                                    {getStatusBadge(selectedTransaction.status)}
                                    {getSettlementBadge(selectedTransaction.settlementStatus)}
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h4 className="font-medium text-gray-900 dark:text-white">Actions</h4>
                                <div className="flex space-x-3">
                                  <Button variant="outline" asChild>
                                    <a href={selectedTransaction.blockExplorer} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4 mr-2" />
                                      View on Blockchain
                                    </a>
                                  </Button>
                                  <Button 
                                    onClick={() => selectedTransaction.flagged 
                                      ? handleUnflagTransaction(selectedTransaction.id)
                                      : handleFlagTransaction(selectedTransaction.id)
                                    }
                                    variant={selectedTransaction.flagged ? "default" : "outline"}
                                  >
                                    <Flag className="h-4 w-4 mr-2" />
                                    {selectedTransaction.flagged ? 'Remove Flag' : 'Flag Transaction'}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        asChild
                      >
                        <a href={transaction.blockExplorer} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant={transaction.flagged ? "default" : "outline"}
                        onClick={() => transaction.flagged 
                          ? handleUnflagTransaction(transaction.id)
                          : handleFlagTransaction(transaction.id)
                        }
                      >
                        <Flag className="h-4 w-4" />
                      </Button>
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
