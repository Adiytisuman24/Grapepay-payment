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
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import { getCurrencyForCountry } from '@/lib/currencies';

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState('payments');
  const [filter, setFilter] = useState('all');
  const [currency, setCurrency] = useState('USD');
  const [businessName, setBusinessName] = useState('nextpayments');
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
  }, []);

  const tabs = [
    { id: 'payments', label: 'Payments' },
    { id: 'payouts', label: 'Payouts' },
    { id: 'fees', label: 'Collected fees' },
    { id: 'transfers', label: 'Transfers' },
    { id: 'all', label: 'All activity' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'payments':
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

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
               {[
                 { label: 'All', active: true },
                 { label: 'Succeeded' },
                 { label: 'Refunded' },
                 { label: 'Disputed' },
                 { label: 'Failed' },
                 { label: 'Uncaptured' },
                 { label: 'Blocked' },
               ].map(btn => (
                  <button
                    key={btn.label}
                    className={cn(
                       "px-8 py-2.5 text-[14px] font-bold border rounded-lg transition-all h-11 min-w-[120px] text-left relative overflow-hidden group",
                       btn.active ? "bg-white border-[#635bff] text-[#635bff] shadow-sm shadow-purple-200 ring-2 ring-purple-50" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    )}
                  >
                     {btn.label}
                     {btn.active && <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#635bff]" />}
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

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-white border-b border-slate-200">
                          <th className="px-4 py-4 w-10"><div className="h-4 w-4 rounded-[4px] border border-slate-300" /></th>
                          <th className="px-4 py-4 text-[11px] font-bold text-slate-900 uppercase tracking-wider">Amount</th>
                          <th className="px-4 py-4 text-[11px] font-bold text-slate-900 uppercase tracking-wider">Payment method</th>
                          <th className="px-4 py-4 text-[11px] font-bold text-slate-900 uppercase tracking-wider">Description</th>
                          <th className="px-4 py-4 text-[11px] font-bold text-slate-900 uppercase tracking-wider">Customer</th>
                          <th className="px-4 py-4 text-[11px] font-bold text-slate-900 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-4 text-[11px] font-bold text-slate-900 uppercase tracking-wider">Settlement merchant</th>
                          <th className="px-4 py-4 text-[11px] font-bold text-slate-900 uppercase tracking-wider">Transferred to</th>
                          <th className="px-4 py-4 text-[11px] font-bold text-slate-900 uppercase tracking-wider">Refunded date</th>
                          <th className="px-4 py-4"></th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {[
                         { id: 'pi_3SagMMDcLq3VFmkC31VijvxA', time: '11:00 PM' },
                         { id: 'pi_3SagLuDcLq3VFmkC0g9XF0wE', time: '11:00 PM' },
                         { id: 'pi_3SagKqDcLq3VFmkC1oK5fgV3', time: '10:58 PM' },
                         { id: 'pi_3SagKoDcLq3VFmkC0GoeZCIx', time: '10:58 PM' },
                         { id: 'pi_3SagKRDcLq3VFmkC1YcsFb29', time: '10:58 PM' },
                         { id: 'pi_3SagJfDcLq3VFmkC1K73nDsd', time: '10:57 PM' },
                       ].map((tx, idx) => (
                          <tr key={tx.id} className="hover:bg-slate-50 group cursor-pointer text-[13px] transition-colors">
                             <td className="px-4 py-4"><div className="h-4 w-4 rounded-[4px] border border-slate-300 group-hover:border-purple-300 transition-colors" /></td>
                             <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                   <span className="font-bold text-slate-900">{currency === 'INR' ? '₹' : currency} 500.00</span>
                                   <span className="text-[11px] font-bold text-slate-400">{currency}</span>
                                   <div className="flex items-center gap-1.5 px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-bold border border-slate-200">
                                      Incomplete <Info size={12} className="text-slate-400" />
                                   </div>
                                </div>
                             </td>
                             <td className="px-4 py-4 text-slate-400 font-bold">—</td>
                             <td className="px-4 py-4">
                                <span className="text-slate-600 font-mono text-[11px] font-medium tracking-tight bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{tx.id}</span>
                             </td>
                             <td className="px-4 py-4 text-slate-400 font-bold">—</td>
                             <td className="px-4 py-4 text-slate-600 font-bold whitespace-nowrap">Dec 4, {tx.time}</td>
                             <td className="px-4 py-4 text-slate-600 font-bold">{businessName}</td>
                             <td className="px-4 py-4 text-slate-400 font-bold">—</td>
                             <td className="px-4 py-4 text-slate-400 font-bold">—</td>
                             <td className="px-4 py-4 text-right">
                                <MoreHorizontal size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 inline-block transition-opacity" />
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
            </div>
            <div className="flex items-center justify-between mt-4">
               <p className="text-[12px] font-bold text-slate-500">Viewing 1–20 of 23 items</p>
               <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-[12px] font-bold text-slate-400 bg-slate-50/50 border-slate-200" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="h-8 text-[12px] font-bold text-slate-900 bg-white border-slate-200">Next</Button>
               </div>
            </div>
          </div>
        );
      case 'all':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
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

            <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-white border-b border-slate-200">
                        <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Fees</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Description</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Created</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Available on</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     <tr className="hover:bg-slate-50 group cursor-pointer text-[13px] transition-colors">
                        <td className="px-4 py-4 font-bold text-slate-900">-{currency} 330.00</td>
                        <td className="px-4 py-4 text-slate-500">-{currency} 16.50</td>
                        <td className="px-4 py-4 text-slate-900 font-bold">-{currency} 346.50</td>
                        <td className="px-4 py-4">
                           <span className="text-slate-600 font-bold">Grapepay fee</span>
                        </td>
                        <td className="px-4 py-4 text-slate-600 font-medium truncate max-w-[300px]">
                           Tax Product Subscription ({currentYear + 1}-11-10 - {currentYear + 2}-12-09)
                        </td>
                        <td className="px-4 py-4 text-slate-600 font-bold text-right whitespace-nowrap">Nov 10</td>
                        <td className="px-4 py-4 text-slate-600 font-bold text-right whitespace-nowrap">Nov 10</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <p className="text-[12px] font-bold text-slate-400">1 item</p>
          </div>
        );
      case 'payouts':
        return (
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
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
               <ArrowLeftRight size={24} className="text-slate-400" />
            </div>
            <div className="text-center space-y-1">
               <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">No live transfers</h3>
               <p className="text-[13px] text-slate-500 font-medium tracking-tight">
                  You don't have any live transfers.
               </p>
               <button className="text-[13px] font-bold text-[#635bff] hover:underline flex items-center gap-1 mx-auto mt-2">
                  Learn more <ChevronRight size={14} />
               </button>
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
