'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  Plus, 
  ChevronRight, 
  X, 
  ArrowRight,
  HelpCircle,
  Bell,
  Settings,
  LayoutGrid,
  Info,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import { getCurrencyForCountry } from '@/lib/currencies';

export default function BalancesPage() {
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    const userData = localStorage.getItem('grapepay_user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.region) {
        setCurrency(getCurrencyForCountry(parsedUser.region));
      }
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        {/* Main Content */}
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
                <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">
                   Balances <span className="text-slate-900 ml-1">-{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })} {currency}</span>
                </h1>
                <HelpCircle size={18} className="text-slate-400 cursor-pointer hover:text-slate-600 mt-1" />
             </div>
             <div className="flex items-center gap-2">
                <Button variant="outline" className="text-slate-600 font-bold text-sm flex items-center gap-2 h-8 px-3 bg-slate-50/50">
                   <ArrowRight size={14} className="text-slate-400" /> Pay out
                </Button>
                <Button variant="outline" className="text-slate-600 font-bold text-sm flex items-center gap-2 h-8 px-3 bg-slate-50/50">
                   Manage payouts <ChevronDown size={14} className="text-slate-400" />
                </Button>
             </div>
          </div>

          <div className="bg-[#f7f8f9] border border-slate-200/60 rounded-lg px-4 py-2.5 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                   <div className="h-4 w-4 text-[#635bff]"><Info size={16} /></div>
                   <span className="text-[12px] font-bold text-slate-900">Recommendation</span>
                </div>
                <p className="text-[13px] text-slate-600 font-medium">
                   Set minimum balance requirements for your connected accounts with automatic payouts to keep funds available for refunds, disputes, and fees.
                </p>
             </div>
             <div className="flex items-center gap-5">
                <button className="text-[13px] font-bold text-[#635bff] hover:underline">View docs</button>
                <button className="text-slate-400 hover:text-slate-600 transition-colors"><X size={16}/></button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
             <div className="lg:col-span-8 space-y-12">
                {/* Balance Summary */}
                <div className="space-y-6">
                   <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">Balance summary</h3>
                   <div className="w-full h-[18px] bg-slate-100 rounded-sm overflow-hidden">
                      <div className="h-full bg-[#635bff] w-full" />
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                         <span>Payments type</span>
                         <span>Amount</span>
                      </div>
                      <div className="flex items-center justify-between py-1">
                         <div className="flex items-center gap-3">
                            <div className="h-2.5 w-2.5 rounded-[2px] bg-slate-200" />
                            <span className="text-[14px] font-bold text-slate-700">Incoming</span>
                         </div>
                         <div className="flex items-center gap-0.5">
                            <span className="text-[14px] font-bold text-slate-900">0.00</span>
                            <span className="text-[11px] font-bold text-slate-400">{currency}</span>
                         </div>
                      </div>
                      <div className="flex items-center justify-between py-1">
                         <div className="flex items-center gap-3">
                            <div className="h-2.5 w-2.5 rounded-[2px] bg-[#a855f7]" />
                            <span className="text-[14px] font-bold text-slate-700">Available</span>
                         </div>
                         <div className="flex items-center gap-0.5">
                            <span className="text-[14px] font-bold text-slate-900">{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                            <span className="text-[11px] font-bold text-slate-400">{currency}</span>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-6">
                   <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">Recent activity</h3>
                   <div className="flex items-center gap-8 border-b border-slate-100 overflow-x-auto">
                      <button className="pb-3 text-[14px] font-bold text-[#635bff] border-b-2 border-[#635bff] whitespace-nowrap">Payouts</button>
                      <button className="pb-3 text-[14px] font-bold text-slate-500 hover:text-slate-900 whitespace-nowrap">All activity</button>
                   </div>
                   
                   <div className="border border-dashed border-slate-200 rounded-lg h-[200px] flex items-center justify-center bg-white">
                      <p className="text-[14px] text-slate-400 font-bold">No payouts were found</p>
                   </div>
                </div>
             </div>

             {/* Right Sidebar */}
             <div className="lg:col-span-4 space-y-8">
                <div className="space-y-4">
                   <h4 className="text-[15px] font-bold text-slate-900 tracking-tight">Reports</h4>
                   <div className="p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group flex items-center gap-4 shadow-sm shadow-slate-200/50">
                      <div className="h-12 w-12 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-white transition-colors">
                         <BarChart3 size={24} className="opacity-60" />
                      </div>
                      <div className="flex-1">
                         <p className="text-[14px] font-bold text-slate-900">Balance summary</p>
                         <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Nov 2025</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
