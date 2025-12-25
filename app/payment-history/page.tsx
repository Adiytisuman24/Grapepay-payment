'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatCurrency, getCurrencySymbol, getUserCurrency } from '@/lib/currency';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Download,
  Calendar,
  CreditCard,
  Repeat,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'succeeded' | 'failed' | 'pending'>('all');
  const [userCurrency, setUserCurrency] = useState('USD');
  const [isSandbox, setIsSandbox] = useState(false);

  useEffect(() => {
    // Get user's currency
    const userData = localStorage.getItem('grapepay_user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        const currency = getUserCurrency(user.country || user.region);
        setUserCurrency(currency);
      } catch (e) {}
    }

    // Check sandbox mode
    const checkSandbox = () => {
      const sandboxState = localStorage.getItem('grapepay_sandbox') === 'true';
      setIsSandbox(sandboxState);
    };
    checkSandbox();

    // Fetch payment history
    fetchPayments();

    // Poll for changes
    const interval = setInterval(() => {
        checkSandbox();
        fetchPayments();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/transactions');
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments
    .filter(p => {
      // Filter by sandbox mode
      const paymentIsSandbox = p.is_sandbox === true;
      if (isSandbox ? !paymentIsSandbox : paymentIsSandbox) return false;

      // Filter by status
      if (filterType !== 'all' && p.status !== filterType) return false;
      
      // Filter by search
      if (searchQuery) {
        const search = searchQuery.toLowerCase();
        return (
          p.id?.toLowerCase().includes(search) ||
          p.customer_email?.toLowerCase().includes(search) ||
          p.description?.toLowerCase().includes(search)
        );
      }
      return true;
    });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'succeeded':
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200 font-bold">
            <CheckCircle size={12} className="mr-1" />
            Succeeded
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200 font-bold">
            <XCircle size={12} className="mr-1" />
            Failed
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 font-bold">
            <Clock size={12} className="mr-1" />
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentTypeIcon = (type?: string) => {
    if (!type || type === 'one_time') return <CreditCard size={16} className="text-slate-400" />;
    if (type === 'recurring') return <Repeat size={16} className="text-purple-500" />;
    return <Calendar size={16} className="text-blue-500" />;
  };

  const totalVolume = filteredPayments
    .filter(p => p.status === 'succeeded')
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Payment History</h1>
          <p className="text-slate-500">View and manage all your payment transactions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-slate-200">
            <div className="text-sm font-bold text-slate-500 mb-1">Total Payments</div>
            <div className="text-3xl font-bold text-slate-900">{payments.length}</div>
          </Card>
          <Card className="p-6 border-slate-200">
            <div className="text-sm font-bold text-slate-500 mb-1">Successful</div>
            <div className="text-3xl font-bold text-green-600">
              {payments.filter(p => p.status === 'succeeded').length}
            </div>
          </Card>
          <Card className="p-6 border-slate-200">
            <div className="text-sm font-bold text-slate-500 mb-1">Failed</div>
            <div className="text-3xl font-bold text-red-600">
              {payments.filter(p => p.status === 'failed').length}
            </div>
          </Card>
          <Card className="p-6 border-slate-200">
            <div className="text-sm font-bold text-slate-500 mb-1">Total Volume</div>
            <div className="text-3xl font-bold text-slate-900">
              {formatCurrency(totalVolume, userCurrency)}
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 border-slate-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input
                placeholder="Search by ID, email, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
                className={cn(filterType === 'all' && 'bg-[#635bff] hover:bg-[#5851eb]')}
              >
                All
              </Button>
              <Button
                variant={filterType === 'succeeded' ? 'default' : 'outline'}
                onClick={() => setFilterType('succeeded')}
                className={cn(filterType === 'succeeded' && 'bg-green-600 hover:bg-green-700')}
              >
                Succeeded
              </Button>
              <Button
                variant={filterType === 'failed' ? 'default' : 'outline'}
                onClick={() => setFilterType('failed')}
                className={cn(filterType === 'failed' && 'bg-red-600 hover:bg-red-700')}
              >
                Failed
              </Button>
              <Button
                variant={filterType === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilterType('pending')}
                className={cn(filterType === 'pending' && 'bg-amber-600 hover:bg-amber-700')}
              >
                Pending
              </Button>
            </div>
          </div>
        </Card>

        {/* Payment Table */}
        <Card className="border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="text-left p-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left p-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left p-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left p-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left p-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      Loading payments...
                    </td>
                  </tr>
                ) : filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center">
                          <CreditCard className="text-slate-400" size={24} />
                        </div>
                        <div className="text-sm font-bold text-slate-900">No payments found</div>
                        <div className="text-xs text-slate-500">Try adjusting your filters</div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="font-mono text-sm font-bold text-slate-900">{payment.id}</div>
                        {payment.description && (
                          <div className="text-xs text-slate-500 mt-1 line-clamp-1">{payment.description}</div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-slate-900">{payment.customer_email || '—'}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm font-bold text-slate-900">
                          {formatCurrency(payment.amount || 0, payment.currency || userCurrency)}
                        </div>
                        {payment.currency && (
                          <div className="text-xs text-slate-500 mt-1">{payment.currency}</div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {getPaymentTypeIcon(payment.payment_type)}
                          <span className="text-sm text-slate-600 capitalize">
                            {payment.payment_type || 'One-time'}
                          </span>
                        </div>
                        {payment.interval && (
                          <div className="text-xs text-slate-500 mt-1 capitalize">{payment.interval}</div>
                        )}
                      </td>
                      <td className="p-4">{getStatusBadge(payment.status)}</td>
                      <td className="p-4">
                        <div className="text-sm text-slate-600">
                          {new Date(payment.created).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {new Date(payment.created).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
