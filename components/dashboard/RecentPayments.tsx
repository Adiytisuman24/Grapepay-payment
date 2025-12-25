'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CreditCard, MoreHorizontal, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  description: string;
  customer_email: string;
  is_sandbox: boolean;
  created: string;
}

export function RecentPayments({ limit = 5, showViewAll = true }: { limit?: number, showViewAll?: boolean }) {
  const [payments, setPayments] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSandbox, setIsSandbox] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/transactions');
        const data = await response.json();
        
        const sandboxState = localStorage.getItem('grapepay_sandbox') === 'true';
        setIsSandbox(sandboxState);

        const filtered = data.filter((p: any) => p.is_sandbox === sandboxState).slice(0, limit);
        setPayments(filtered);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
    const interval = setInterval(fetchPayments, 2000);
    return () => clearInterval(interval);
  }, [limit]);

  if (isLoading && payments.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-bold text-slate-700 uppercase tracking-wider">Recent payments</h3>
        {showViewAll && (
          <button 
            onClick={() => router.push('/transactions')}
            className="text-[12px] font-bold text-[#635bff] hover:underline flex items-center gap-1"
          >
            View all payments <ArrowRight size={12} />
          </button>
        )}
      </div>

      <Card className="border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#f7f8f9] text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    No {isSandbox ? 'test ' : ''}payments found
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => router.push(`/transactions?id=${payment.id}`)}>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {payment.currency} {payment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge 
                        variant="secondary"
                        className={cn(
                          "font-bold shadow-none rounded-md px-2 py-0.5 text-[11px]",
                          payment.status === 'succeeded' ? "bg-emerald-50 text-emerald-700" :
                          payment.status === 'failed' ? "bg-red-50 text-red-700" :
                          "bg-amber-50 text-amber-700"
                        )}
                      >
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600 truncate max-w-[200px]">
                      {payment.description || 'Payment'}
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {payment.customer_email || '—'}
                    </td>
                    <td className="px-6 py-4 text-right text-slate-400 text-xs font-medium">
                      {format(new Date(payment.created), 'MMM d, h:mm a')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
