'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  Plus, 
  HelpCircle, 
  Bell, 
  Settings, 
  LayoutGrid, 
  ChevronRight, 
  X, 
  Search, 
  Download, 
  BarChart3, 
  User, 
  PlusCircle, 
  Mail, 
  Calendar,
  Filter,
  ArrowRight,
  Loader2,
  MoreHorizontal
} from 'lucide-react';
import { format } from 'date-fns';
import { formatCurrency, getUserCurrency } from '@/lib/currency';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function CustomersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSandbox, setIsSandbox] = useState(false);
  const [userCurrency, setUserCurrency] = useState('USD');

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

    const checkSandbox = () => {
        const sandboxState = localStorage.getItem('grapepay_sandbox') === 'true';
        setIsSandbox(sandboxState);
      };
      checkSandbox();
  
      const fetchData = async () => {
        try {
          const [cRes, pRes] = await Promise.all([
            fetch('http://localhost:3001/api/customers'),
            fetch('http://localhost:3001/api/transactions')
          ]);
          const cData = await cRes.json();
          const pData = await pRes.json();
          
          // Enrich customers with transaction metrics
          const enriched = cData.map((c: any) => {
            const cPayments = pData.filter((p: any) => p.customer_email === c.email && p.is_sandbox === c.is_sandbox);
            return {
              ...c,
              transaction_count: cPayments.length,
              refund_count: cPayments.filter((p: any) => p.status === 'refunded').length,
              dispute_count: cPayments.filter((p: any) => p.status === 'disputed').length,
            };
          });

          setCustomers(enriched);
        } catch (error) {
          console.error('Failed to fetch data:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
      const interval = setInterval(() => {
          fetchData();
          checkSandbox();
      }, 5000);
      return () => clearInterval(interval);
  }, []);

  const filteredCustomers = customers
    .filter(c => {
      const customerIsSandbox = c.is_sandbox === true;
      if (isSandbox !== customerIsSandbox) return false;

      switch (activeTab) {
        case 'top': return c.total_spend > 1000;
        case 'first': return c.transaction_count === 1;
        case 'repeat': return c.transaction_count > 1;
        case 'recent': {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          return new Date(c.created) > sevenDaysAgo;
        }
        case 'refunds': return c.refund_count > 0;
        case 'disputes': return c.dispute_count > 0;
        default: return true;
      }
    })
    .sort((a, b) => {
      if (activeTab === 'top') return b.total_spend - a.total_spend;
      if (activeTab === 'recent') return new Date(b.created).getTime() - new Date(a.created).getTime();
      return 0;
    });

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'top', label: 'Top customers' },
    { id: 'first', label: 'First-time customers' },
    { id: 'repeat', label: 'Repeat customers' },
    { id: 'recent', label: 'Recent customers' },
    { id: 'refunds', label: 'High refunds' },
    { id: 'disputes', label: 'High disputes' },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        {/* Page Content */}
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
             <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Customers</h1>
             <Button className="bg-[#635bff] hover:bg-[#5851eb] h-8 px-4 gap-1 shadow-lg shadow-purple-600/10 font-bold text-sm rounded-lg">
                <Plus size={16} /> Add customer <span className="opacity-50 text-[10px] ml-1 font-black">N</span>
             </Button>
          </div>

          <div className="relative group">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pr-12">
               {tabs.map(tab => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={cn(
                      "px-6 py-2.5 text-[14px] font-bold border rounded-lg whitespace-nowrap h-11 transition-all",
                      activeTab === tab.id ? "bg-white border-[#635bff] text-[#635bff] shadow-sm ring-2 ring-purple-50" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                   )}
                 >
                    {tab.label}
                 </button>
               ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white via-white/80 to-transparent flex items-center justify-end pointer-events-none">
               <div className="pointer-events-auto bg-white border border-slate-200 rounded-full h-8 w-8 flex items-center justify-center mr-1 shadow-sm hover:bg-slate-50 cursor-pointer">
                  <ChevronRight size={14} className="text-slate-400"/>
               </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2.5">
                {[
                  { label: 'Email', icon: Mail },
                  { label: 'Name', icon: User },
                  { label: 'Created date', icon: Calendar },
                  { label: 'Type', icon: Filter },
                  { label: 'More filters', icon: Plus },
                ].map(f => (
                   <Button key={f.label} variant="outline" className="h-7 text-[12px] font-bold text-slate-600 hover:bg-slate-50 gap-1.5 px-3 bg-white border-slate-200 shadow-sm">
                      <f.icon size={12} className="text-slate-400" /> {f.label}
                   </Button>
                ))}
             </div>
             <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 gap-2 border-slate-200 text-slate-600 font-bold px-4">
                   <Download size={14} className="text-slate-400" /> Export
                </Button>
                <Button variant="outline" size="sm" className="h-8 gap-2 border-slate-200 text-slate-600 font-bold px-4">
                   <BarChart3 size={14} className="text-slate-400" /> Analyze
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
            ) : filteredCustomers.length > 0 ? (
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#f7f8f9] text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-3 w-[200px]">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Total Spend</th>
                        <th className="px-6 py-3">Orders</th>
                        <th className="px-6 py-3">Refunds</th>
                        <th className="px-6 py-3">Disputes</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 w-[180px]">Created</th>
                        <th className="px-6 py-3 w-[20px]"></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {filteredCustomers.map((customer) => (
                        <tr key={customer.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                        <td className="px-6 py-4 font-bold text-slate-900">
                            {customer.name || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                            {customer.email}
                        </td>
                        <td className="px-6 py-4 font-mono text-slate-700">
                            {formatCurrency(customer.total_spend || 0, customer.currency || userCurrency)}
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-mono text-[13px]">
                            {customer.transaction_count || 0}
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-mono text-[13px]">
                            {customer.refund_count || 0}
                        </td>
                        <td className="px-6 py-4">
                            {customer.dispute_count > 0 ? (
                               <Badge variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-100 font-bold h-5 text-[10px]">
                                  {customer.dispute_count}
                               </Badge>
                            ) : (
                               <span className="text-slate-400 font-mono text-[13px]">0</span>
                            )}
                        </td>
                        <td className="px-6 py-4">
                            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold">
                                {customer.status || 'Active'}
                            </Badge>
                        </td>
                        <td className="px-6 py-4 text-slate-500 text-xs">
                            {format(new Date(customer.created), 'MMM d, yyyy')}
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
                <div className="flex flex-col items-center justify-center py-24 space-y-6 text-center">
                    <div className="h-12 w-12 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-300 shadow-sm">
                        <User size={24} />
                    </div>
                    <div className="space-y-1.5">
                        <h3 className="text-[16px] font-bold text-slate-900 tracking-tight">No customers found</h3>
                        <p className="text-[13px] text-slate-500 font-medium max-w-sm tracking-tight leading-relaxed">
                             {isSandbox ? "Your test customers will appear here." : "Your customers will appear here."}
                        </p>
                    </div>
                    <Button className="bg-[#635bff] hover:bg-[#5851eb] h-9 px-5 gap-2 shadow-lg shadow-purple-600/10 font-bold text-sm rounded-lg mt-4 transition-all hover:scale-[1.02] active:scale-[0.98]">
                        <Plus size={16} /> Add a customer
                    </Button>
                </div>
            )}
        </div>
      </div>
    </DashboardLayout>
  );
}
