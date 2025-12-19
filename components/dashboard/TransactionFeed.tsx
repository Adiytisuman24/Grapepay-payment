'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'convert';
  amount: number;
  currency: string;
  toCurrency?: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: Date;
  hash: string;
}

export function TransactionFeed() {
  const transactions: Transaction[] = [
    // Empty array - no transactions to display
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      success: 'default',
      pending: 'secondary',
      failed: 'destructive'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recent Transactions</span>
          <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {tx.type === 'send' && <ArrowUpRight className="h-5 w-5 text-red-500" />}
                  {tx.type === 'receive' && <ArrowDownLeft className="h-5 w-5 text-green-500" />}
                  {tx.type === 'convert' && <ArrowUpRight className="h-5 w-5 text-blue-500" />}
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {tx.amount.toLocaleString('en-US', { maximumFractionDigits: 4 })} {tx.currency}
                      </span>
                      {tx.toCurrency && (
                        <>
                          <span className="text-gray-400">→</span>
                          <span className="text-gray-600 dark:text-gray-300">{tx.toCurrency}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{tx.hash}</span>
                      <span>•</span>
                      <span>{tx.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {getStatusIcon(tx.status)}
                  {getStatusBadge(tx.status)}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
