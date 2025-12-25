'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  Plus, 
  HelpCircle, 
  Bell, 
  Settings, 
  LayoutGrid, 
  ChevronDown, 
  X, 
  Search, 
  Download, 
  Filter, 
  MoreVertical,
  ArrowRight,
  PlusCircle,
  BarChart3,
  Calendar,
  Clock,
  Info,
  Globe,
  CreditCard,
  ArrowLeftRight,
  SearchX,
  MoreHorizontal,
  ChevronRight,
  ExternalLink,
  Zap,
  Loader2,
  RefreshCcw,
  CircleDollarSign
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import { getCurrencyForCountry } from '@/lib/currencies';
import { getCurrencySymbol } from '@/lib/currency';

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState('payments');
  const [filter, setFilter] = useState('all');
  const [currency, setCurrency] = useState('USD');
  const [businessName, setBusinessName] = useState('nextpayments');
  const [payments, setPayments] = useState<any[]>([]);
  const [conversions, setConversions] = useState<any[]>([]);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [isSandbox, setIsSandbox] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const userData = localStorage.getItem('grapepay_user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.region) {
        setCurrency(getCurrencyForCountry(parsedUser.region));
      }
      if (parsedUser.business_name || parsedUser.name) {
        setBusinessName(parsedUser.business_name || parsedUser.name);
      }
    }

    const checkSandbox = () => {
      const sandboxState = localStorage.getItem('grapepay_sandbox') === 'true';
      setIsSandbox(sandboxState);
    };
    checkSandbox();

    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/transactions');
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      } finally {
        setIsLoading(false);
      }
    };
    const loadConversions = () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('grapepay_conversions');
        if (stored) {
          try {
            setConversions(JSON.parse(stored));
          } catch (e) {
            console.error('Error loading conversions:', e);
          }
        }
      }
    };

    const loadPayouts = () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('grapepay_payouts');
        if (stored) {
          try {
            setPayouts(JSON.parse(stored));
          } catch (e) {
            console.error('Error loading payouts:', e);
          }
        }
      }
    };

    fetchPayments();
    loadConversions();
    loadPayouts();
    const interval = setInterval(() => {
        fetchPayments();
        checkSandbox();
        loadConversions();
        loadPayouts();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredPayments = (() => {
    // Merge payments from API with conversions from state
    let allActivity = [...payments];
    
    if (conversions.length > 0) {
      allActivity = [...allActivity, ...conversions.map((c: any) => ({
          ...c,
          id: c.id || `conv_${c.id_tx}`,
          amount: c.toAmount || c.fromAmount, 
          currency: c.toCurrency || c.fromCurrency,
          status: 'succeeded',
          description: `Conversion: ${c.fromCurrency} to ${c.toCurrency}`,
          created: c.date || new Date().toISOString()
        }))];
    }

    if (payouts.length > 0) {
      allActivity = [...allActivity, ...payouts.map((p: any, idx: number) => ({
        ...p,
        id: `payout_${idx}`,
        description: `Payout to bank (${p.region})`,
        status: p.status || 'paid'
      }))];
    }

    return allActivity
      .filter((p: any) => {
        const paymentIsSandbox = p.is_sandbox === true;
        if (isSandbox !== paymentIsSandbox) return false;
        
        if (activeTab === 'payouts') {
          return p.type === 'payout';
        }
        
        if (activeTab === 'conversions') {
          return p.type === 'conversion' || p.description?.toLowerCase().includes('conversion');
        }

        if (filter !== 'all') {
            return p.status?.toLowerCase() === filter.toLowerCase();
        }
        
        return true;
      })
      .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  })();

  const tabs = [
    { id: 'payments', label: 'Payments' },
    { id: 'payouts', label: 'Payouts' },
    { id: 'conversions', label: 'Conversions' },
    { id: 'fees', label: 'Collected fees' },
    { id: 'transfers', label: 'Transfers' },
    { id: 'all', label: 'All activity' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'payments':
        const getEmptyState = () => {
          const iconClass = "h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm";
          const titleClass = "text-[15px] font-bold text-slate-900 tracking-tight";
          const descClass = "text-[13px] text-slate-500 font-medium tracking-tight";
          
          switch (filter) {
            case 'refunded':
              return (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                  <div className={iconClass}>
                    <ArrowLeftRight size={24} className="text-slate-400" />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className={titleClass}>No refunded payments</h3>
                    <p className={descClass}>Payments you refund will show up here.</p>
                  </div>
                </div>
              );
            case 'disputed':
              return (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                  <div className={iconClass}>
                    <HelpCircle size={24} className="text-slate-400" />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className={titleClass}>No disputed payments</h3>
                    <p className={descClass}>Payments disputed by customers will show up here.</p>
                  </div>
                </div>
              );
            case 'failed':
              return (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                  <div className={iconClass}>
                    <Info size={24} className="text-slate-400" />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className={titleClass}>No failed payments</h3>
                    <p className={descClass}>Payments that fail to process will show up here.</p>
                  </div>
                </div>
              );
            case 'uncaptured':
              return (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                  <div className={iconClass}>
                    <Clock size={24} className="text-slate-400" />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className={titleClass}>No uncaptured payments</h3>
                    <p className={descClass}>Payments that are authorized but not yet captured will show up here.</p>
                  </div>
                </div>
              );
            case 'blocked':
              return (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                  <div className={iconClass}>
                    <SearchX size={24} className="text-slate-400" />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className={titleClass}>No blocked payments</h3>
                    <p className={descClass}>Payments blocked by your radar settings will show up here.</p>
                  </div>
                </div>
              );
            default:
              return (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                  <div className={iconClass}>
                    <Search size={24} className="text-slate-400" />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className={titleClass}>No payments found</h3>
                    <p className={descClass}>
                      {isSandbox ? "No test payments created yet." : "You have no payments yet."}
                    </p>
                  </div>
                  <Button className="bg-[#635bff] hover:bg-[#5249e0] font-bold text-sm h-9 px-4 rounded-lg mt-4 shadow-lg shadow-purple-600/20">
                    <Plus size={16} className="mr-2" /> Create payment
                  </Button>
                </div>
              );
          }
        };

        return (
          <div className="space-y-6">
            <div className="bg-[#f7f8f9] border border-slate-200/60 rounded-lg px-4 py-3 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 hover:bg-white p-1 rounded transition-colors cursor-pointer">
                     <Zap size={14} className="text-slate-400 group-hover:text-amber-500" />
                     <span className="text-[12px] font-bold text-slate-900">New</span>
                  </div>
                  <p className="text-[13px] text-slate-600 font-medium">
                     Transactions now include payments accepted by your connected accounts. Use the "Settlement merchant" filter and the "Transferred to" filter to view them.
                  </p>
               </div>
               <div className="flex items-center gap-5">
                  <button className="text-[13px] font-bold text-[#635bff] hover:underline">Learn more</button>
                  <button className="text-slate-400 hover:text-slate-600 transition-colors"><X size={16}/></button>
               </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth p-1">
               {[
                 { label: 'All', id: 'all' },
                 { label: 'Succeeded', id: 'succeeded' },
                 { label: 'Refunded', id: 'refunded' },
                 { label: 'Disputed', id: 'disputed' },
                 { label: 'Failed', id: 'failed' },
                 { label: 'Uncaptured', id: 'uncaptured' },
                 { label: 'Blocked', id: 'blocked' },
               ].map(btn => (
                  <button
                    key={btn.id}
                    onClick={() => setFilter(btn.id)}
                    className={cn(
                       "px-4 py-2 text-[14px] font-bold border rounded-lg transition-all h-10 min-w-[100px] whitespace-nowrap",
                       filter === btn.id ? "bg-white border-[#635bff] text-[#635bff] shadow-sm shadow-purple-200 ring-1 ring-purple-100" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    )}
                  >
                     {btn.label}
                  </button>
               ))}
            </div>

            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  {[
                    { label: 'Date and time', icon: Calendar },
                    { label: 'Amount', icon: PlusCircle },
                    { label: 'Currency', icon: Globe },
                    { label: 'Status', icon: Info },
                    { label: 'Payment method', icon: CreditCard },
                    { label: 'More filters', icon: Plus },
                  ].map(f => (
                    <Button key={f.label} variant="outline" className="h-7 text-[12px] font-bold text-slate-600 hover:bg-slate-50 gap-1.5 px-2.5 bg-white border-slate-200 shadow-sm">
                       <f.icon size={12} className="text-slate-400" /> {f.label}
                    </Button>
                  ))}
               </div>
               <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-2 border-slate-200 text-slate-600 font-bold px-4">
                     <Download size={14} className="text-slate-400" /> Export
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-2 border-slate-200 text-slate-600 font-bold px-4">
                     <Settings size={14} className="text-slate-400" /> Edit columns
                  </Button>
               </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <Loader2 className="h-8 w-8 text-[#635bff] animate-spin" />
                </div>
            ) : filteredPayments.length > 0 ? (
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
                  <table className="w-full text-sm text-left min-w-[1000px]">
                    <thead className="bg-[#f7f8f9] text-slate-500 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 w-[140px]">Amount</th>
                        <th className="px-6 py-3 w-[150px]">Payment method</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3">Customer</th>
                        <th className="px-6 py-3 w-[180px]">Date</th>
                        {filter === 'refunded' && <th className="px-6 py-3 w-[180px]">Refunded date</th>}
                        {filter === 'failed' && <th className="px-6 py-3 w-[180px]">Decline reason</th>}
                        <th className="px-6 py-3 w-[150px]">Settlement merchant</th>
                        <th className="px-6 py-3 w-[150px]">Transferred to</th>
                        <th className="px-6 py-3 w-[20px]"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPayments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                          <td className="px-6 py-4 font-bold text-slate-900">
                            {payment.amount.toFixed(2)} <span className="text-slate-500 text-xs ml-0.5">{payment.currency}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                               <CreditCard size={14} className="text-slate-400" />
                               <span className="text-slate-600 font-medium uppercase text-xs">{payment.payment_method || 'card'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-600 font-medium">
                            {payment.description || 'Payment'}
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {payment.customer_email || '—'}
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-xs">
                             {format(new Date(payment.created), 'MMM d, h:mm a')}
                          </td>
                          {filter === 'refunded' && (
                             <td className="px-6 py-4 text-slate-500 text-xs">
                                {payment.refunded_at ? format(new Date(payment.refunded_at), 'MMM d, h:mm a') : '—'}
                             </td>
                          )}
                          {filter === 'failed' && (
                             <td className="px-6 py-4 text-red-500 text-xs font-medium">
                                {payment.decline_reason || 'Insufficient funds'}
                             </td>
                          )}
                          <td className="px-6 py-4 text-slate-500 text-xs">
                             {payment.settlement_merchant || '—'}
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-xs">
                             {payment.transferred_to || '—'}
                          </td>
                          <td className="px-6 py-4 text-right">
                             <button className="p-1 hover:bg-white rounded border border-transparent hover:border-slate-200 hover:shadow-sm text-slate-400 hover:text-slate-600">
                                <MoreHorizontal size={16} />
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            ) : getEmptyState()}
          </div>
        );
      case 'all':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  {[
                    { label: 'Currency', icon: Globe },
                    { label: 'Type', icon: Info },
                    { label: 'Created', icon: Calendar },
                    { label: 'Available on', icon: Clock },
                  ].map(f => (
                    <Button key={f.label} variant="outline" className="h-7 text-[12px] font-bold text-slate-600 hover:bg-slate-50 gap-1.5 px-2.5 bg-white border-slate-200 shadow-sm">
                       <Plus size={12} className="text-slate-400" /> {f.label}
                    </Button>
                  ))}
               </div>
               <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-2 border-slate-200 text-slate-600 font-bold px-4">
                     <Download size={14} className="text-slate-400" /> Export
                  </Button>
               </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24">
                   <Loader2 className="h-8 w-8 text-[#635bff] animate-spin" />
                </div>
            ) : payments.length > 0 ? (
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
                   <table className="w-full text-sm text-left min-w-[1000px]">
                      <thead className="bg-[#f7f8f9] text-slate-500 font-semibold border-b border-slate-200">
                         <tr>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Fees</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Type</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Created</th>
                            <th className="px-6 py-3">Available on</th>
                            <th className="px-6 py-3 w-[20px]"></th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {payments.map((p: any) => (
                            <tr key={p.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                               <td className="px-6 py-4 font-bold text-slate-900">
                                  {p.amount.toFixed(2)} <span className="text-slate-500 text-xs ml-0.5">{p.currency}</span>
                               </td>
                               <td className="px-6 py-4 text-slate-500">
                                  —
                               </td>
                               <td className="px-6 py-4 font-medium text-slate-900">
                                  {p.amount.toFixed(2)} <span className="text-slate-500 text-xs ml-0.5">{p.currency}</span>
                               </td>
                               <td className="px-6 py-4">
                                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold shadow-none rounded-md px-2 py-0.5 capitalize">
                                     {p.type || 'payment'}
                                  </Badge>
                               </td>
                               <td className="px-6 py-4 text-slate-600 font-medium">
                                  {p.description || 'Payment'}
                               </td>
                               <td className="px-6 py-4 text-slate-500 text-xs">
                                  {format(new Date(p.created), 'MMM d, h:mm a')}
                               </td>
                               <td className="px-6 py-4 text-slate-500 text-xs">
                                  {format(new Date(p.created), 'MMM d, h:mm a')}
                               </td>
                               <td className="px-6 py-4 text-right">
                                  <button className="p-1 hover:bg-white rounded border border-transparent hover:border-slate-200 hover:shadow-sm text-slate-400 hover:text-slate-600">
                                     <MoreHorizontal size={16} />
                                  </button>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                   <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
                      <Search size={24} className="text-slate-400" />
                   </div>
                   <div className="text-center space-y-1">
                      <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">No activity found</h3>
                      <p className="text-[13px] text-slate-500 font-medium tracking-tight">
                         Activity will show up here.
                      </p>
                   </div>
                </div>
            )}
          </div>
        );
      case 'conversions':
        const conversionActivity = (() => {
          const stored = localStorage.getItem('grapepay_conversions');
          if (stored) {
            try {
              return JSON.parse(stored).filter((p: any) => {
                const isSandboxState = p.is_sandbox === true;
                return isSandbox === isSandboxState;
              });
            } catch (e) {
              return [];
            }
          }
          return [];
        })();

        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <Button variant="outline" className="h-7 text-[12px] font-bold text-slate-600 hover:bg-slate-50 gap-1.5 px-2.5 bg-white border-slate-200">
                     <Filter size={12} className="text-slate-400" /> Filter
                  </Button>
               </div>
            </div>

            {conversionActivity.length > 0 ? (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                   <table className="w-full text-left border-collapse">
                      <thead>
                         <tr className="border-b border-slate-100 bg-slate-50/50">
                            <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Route</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Result</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {conversionActivity.map((c: any) => (
                            <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                               <td className="px-6 py-4">
                                  <Badge className="bg-purple-50 text-[#635bff] border-none font-bold uppercase text-[10px]">Conversion</Badge>
                               </td>
                               <td className="px-6 py-4 font-bold text-slate-900">
                                  {c.fromCurrency} <ArrowRight size={12} className="inline mx-1 text-slate-400" /> {c.toCurrency}
                               </td>
                               <td className="px-6 py-4 text-slate-600 font-medium">
                                  -{c.fromAmount} {c.fromCurrency}
                               </td>
                               <td className="px-6 py-4 text-emerald-600 font-black">
                                  +{c.toAmount} {c.toCurrency}
                                </td>
                               <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                                  {format(new Date(c.date), 'MMM d, yyyy HH:mm')}
                               </td>
                               <td className="px-6 py-4 text-right">
                                  <button 
                                    onClick={() => toast.success('Payout Initiated', { description: 'The converted amount is being sent to your bank.' })}
                                    className="px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg hover:bg-black transition-all"
                                  >
                                    Payout
                                  </button>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                   <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
                      <RefreshCcw size={24} className="text-slate-400" />
                   </div>
                   <div className="text-center space-y-1">
                      <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">No conversions found</h3>
                      <p className="text-[13px] text-slate-500 font-medium tracking-tight">
                         Your recent treasury swaps will appear here.
                      </p>
                   </div>
                </div>
            )}
          </div>
        );
      case 'payouts':
        if (filteredPayments.length > 0) {
           return (
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full text-sm text-left min-w-[1000px]">
                  <thead className="bg-[#f7f8f9] text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 w-[140px]">Amount</th>
                      <th className="px-6 py-3">Description</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3 w-[180px]">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPayments.map((p: any) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">
                          {getCurrencySymbol(p.currency)}{p.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-medium">{p.description}</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-50 text-green-600 border-green-100 uppercase text-[10px] font-bold">
                            {p.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-slate-500 text-xs">
                          {format(new Date(p.created), 'MMM d, yyyy HH:mm')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           );
        }
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  {[
                    { label: 'Created', icon: Calendar },
                    { label: 'Amount', icon: PlusCircle },
                    { label: 'Status', icon: Info },
                    { label: 'More filters', icon: Plus },
                  ].map(f => (
                    <Button key={f.label} variant="outline" className="h-7 text-[12px] font-bold text-slate-600 hover:bg-slate-50 gap-1.5 px-2.5 bg-white border-slate-200 shadow-sm">
                       <f.icon size={12} className="text-slate-400" /> {f.label}
                    </Button>
                  ))}
               </div>
               <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-2 border-slate-200 text-slate-600 font-bold px-4">
                     <Download size={14} className="text-slate-400" /> Export
                  </Button>
               </div>
            </div>

            <div className="flex flex-col items-center justify-center py-24 space-y-4">
               <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
                  <ExternalLink size={24} className="text-slate-400" />
               </div>
               <div className="text-center space-y-1">
                  <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">No payouts</h3>
                  <p className="text-[13px] text-slate-500 font-medium max-w-[400px]">
                     Payouts will show up here, along with the date they're expected to arrive in your bank account.
                  </p>
                  <button className="text-[13px] font-bold text-[#635bff] hover:underline flex items-center gap-1 mx-auto mt-2">
                     Learn more <ChevronRight size={14} />
                  </button>
               </div>
               <Button className="bg-[#635bff] hover:bg-[#5249e0] font-bold text-sm h-9 px-4 rounded-lg mt-4 shadow-lg shadow-purple-600/20">
                  <Plus size={16} className="mr-2" /> Create your first payout
               </Button>
            </div>
          </div>
        );
      case 'fees':
        return (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
               <Search size={24} className="text-slate-400" />
            </div>
            <div className="text-center space-y-1">
               <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">No results found</h3>
               <p className="text-[13px] text-slate-500 font-medium tracking-tight">
                  There aren't any results for that query.
               </p>
            </div>
          </div>
        );
      case 'transfers':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  {[
                    { label: 'Created', icon: Calendar },
                    { label: 'More filters', icon: Plus },
                  ].map(f => (
                    <Button key={f.label} variant="outline" className="h-7 text-[12px] font-bold text-slate-600 hover:bg-slate-50 gap-1.5 px-2.5 bg-white border-slate-200 shadow-sm">
                       <f.icon size={12} className="text-slate-400" /> {f.label}
                    </Button>
                  ))}
               </div>
               <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-2 border-slate-200 text-slate-600 font-bold px-4">
                     <Download size={14} className="text-slate-400" /> Export
                  </Button>
               </div>
            </div>

            <div className="flex flex-col items-center justify-center py-24 space-y-4">
               <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
                  <ArrowLeftRight size={24} className="text-slate-400" />
               </div>
               <div className="text-center space-y-1">
                  <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">No live transfers</h3>
                  <p className="text-[13px] text-slate-500 font-medium tracking-tight">
                     You don't have any live transfers. <button className="text-[#635bff] hover:underline">Learn more</button>
                  </p>
               </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
               <SearchX size={24} className="text-slate-400" />
            </div>
            <div className="text-center space-y-1">
               <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">No payments found</h3>
               <p className="text-[13px] text-slate-500 font-medium tracking-tight">
                  Try adjusting your filters to find what you're looking for.
               </p>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        {/* Page Content */}
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
             <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Transactions</h1>
             <div className="flex items-center gap-2">
                <Button className="bg-[#635bff] hover:bg-[#5249e0] font-bold text-sm h-8 px-3 shadow-lg shadow-purple-600/10">
                   <Plus size={16} className="mr-2" /> Create payment
                </Button>
                <Button variant="outline" className="text-slate-600 font-bold text-sm h-8 px-3 bg-white shadow-sm hover:bg-slate-50 border-slate-200">
                   <BarChart3 size={14} className="mr-2 text-slate-400" /> Analyze
                </Button>
             </div>
          </div>

          <div className="flex items-center gap-6 border-b border-slate-100 overflow-x-auto scrollbar-hide">
             {tabs.map(tab => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={cn(
                   "pb-3 text-[14px] font-bold transition-all whitespace-nowrap",
                   activeTab === tab.id ? "text-[#635bff] border-b-2 border-[#635bff]" : "text-slate-500 hover:text-slate-900"
                 )}
               >
                 {tab.label}
               </button>
             ))}
          </div>

          <div className="min-h-[400px]">
            {renderContent()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
