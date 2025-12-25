'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  ChevronDown, 
  Settings, 
  MessageSquare, 
  ExternalLink, 
  Info,
  Calendar,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useEffect, useState } from 'react';
import { getCurrencySymbol } from '@/lib/currency';
import { getCurrencyForCountry } from '@/lib/currencies';

const data = [
  { name: 'Jan 2025', value: 0 },
  { name: 'Mar 2025', value: 0 },
  { name: 'May 2025', value: 0 },
  { name: 'Jul 2025', value: 0 },
  { name: 'Sep 2025', value: 0 },
  { name: 'Nov 2025', value: 0 },
];

export default function ConnectOverview() {
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    const preferred = localStorage.getItem('grapepay_preferred_currency');
    if (preferred) {
      setCurrency(preferred);
    } else {
      const userData = localStorage.getItem('grapepay_user');
      if (userData) {
        const parsed = JSON.parse(userData);
        if (parsed.region) {
          setCurrency(getCurrencyForCountry(parsed.region));
        }
      }
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row min-h-screen bg-white">
        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Connect overview</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-2 border-slate-200 text-slate-600 font-bold px-3">
                <Settings size={14} className="text-slate-400" /> Customize <ChevronDown size={14} className="text-slate-400" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-2 border-slate-200 text-slate-600 font-bold px-3">
                <MessageSquare size={14} className="text-slate-400" /> Feedback
              </Button>
            </div>
          </div>

          <div className="space-y-12">
            {/* Volume Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-bold text-slate-900">Volume</h2>
                <div className="flex items-center gap-2 text-[12px] font-bold">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 cursor-pointer shadow-sm">
                    <span className="text-slate-400">Date range</span> 
                    <span className="text-[#635bff]">Last 12 months</span>
                    <ChevronDown size={14} className="text-slate-400" />
                  </div>
                  <div className="px-3 py-1 bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 cursor-pointer shadow-sm flex items-center gap-1.5">
                    Monthly
                    <ChevronDown size={14} className="text-slate-400" />
                  </div>
                  <div className="px-3 py-1 bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 cursor-pointer shadow-sm flex items-center gap-2">
                    <div className="w-3.5 h-3.5 flex items-center justify-center border border-slate-300 rounded-full text-[10px] font-black text-slate-400">×</div>
                    <span>Compare</span>
                    <span className="text-[#635bff]">Previous year</span>
                    <ChevronDown size={14} className="text-slate-400" />
                  </div>
                </div>
              </div>

              <Card className="p-6 border-slate-200 shadow-none rounded-xl">
                 <div className="flex items-center gap-1.5 mb-6">
                    <p className="text-[13px] font-bold text-slate-500 tracking-tight">Gross payment volume</p>
                    <Info size={14} className="text-slate-300" />
                 </div>
                 <div className="h-[250px] w-full relative">
                    <div className="absolute right-0 top-0 text-[10px] font-bold text-slate-400">{currency} 0.01</div>
                    <div className="absolute right-0 bottom-1/2 text-[10px] font-bold text-slate-400">{currency} 0</div>
                    <div className="absolute left-0 bottom-0 text-[10px] font-bold text-slate-400">Jan 2025</div>
                    <div className="absolute left-1/3 bottom-0 text-[10px] font-bold text-slate-400 ml-10">May 2025</div>
                    <div className="absolute left-2/3 bottom-0 text-[10px] font-bold text-slate-400 ml-10">Sep 2025</div>
                    
                    <div className="absolute inset-x-0 bottom-6 h-px bg-slate-100 italic flex items-center justify-end">
                       <span className="text-[10px] text-slate-300 font-bold mr-2">Updated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, 5:30 PM</span>
                    </div>
                    
                    <ResponsiveContainer width="100%" height="80%">
                       <AreaChart data={data}>
                          <Area type="monotone" dataKey="value" stroke="#635bff" fill="#635bff" fillOpacity={0.05} strokeWidth={2} />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </Card>
            </div>

            {/* Account growth Section */}
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                 <h2 className="text-[20px] font-bold text-slate-900">Account growth</h2>
                 <div className="flex items-center gap-2 text-[12px] font-bold">
                   <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 cursor-pointer shadow-sm">
                     <span className="text-slate-400">Date range</span> 
                     <span className="text-[#635bff]">Last 6 months</span>
                     <ChevronDown size={14} className="text-slate-400" />
                   </div>
                   <div className="px-3 py-1 bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 cursor-pointer shadow-sm flex items-center gap-2">
                     <span>Compare</span>
                     <span className="text-[#635bff]">Previous period</span>
                     <ChevronDown size={14} className="text-slate-400" />
                   </div>
                 </div>
               </div>

               <Card className="p-6 border-slate-200 shadow-none rounded-xl">
                  <div className="flex items-center gap-1.5 mb-2">
                     <p className="text-[13px] font-bold text-slate-500 tracking-tight">New accounts</p>
                     <Info size={14} className="text-slate-300" />
                  </div>
                  <h4 className="text-[24px] font-bold text-slate-900 mb-8">0</h4>
                  <div className="h-[1px] w-full bg-slate-100 relative">
                     <div className="absolute right-0 -top-6 text-[10px] font-bold text-slate-300">1</div>
                  </div>
               </Card>
            </div>
          </div>
        </div>

        {/* Sidebar Resources */}
        <div className="w-full lg:w-[320px] border-l border-slate-100 p-8 space-y-8 bg-slate-50/30">
          <h3 className="text-[16px] font-bold text-slate-900">Resources</h3>
          
          <Card className="p-5 border-slate-200 shadow-none rounded-xl bg-white space-y-3 group cursor-pointer hover:border-purple-200 transition-colors">
            <h4 className="text-[14px] font-bold text-slate-900 tracking-tight">Risk review process</h4>
            <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
               See how combining automation with manual review can help manage risk.
            </p>
            <button className="text-[13px] font-bold text-[#635bff] hover:underline flex items-center gap-1.5">
               Learn more <ExternalLink size={14} />
            </button>
          </Card>

          <Card className="p-5 border-slate-200 shadow-none rounded-xl bg-white space-y-3 group cursor-pointer hover:border-purple-200 transition-colors">
            <h4 className="text-[14px] font-bold text-slate-900 tracking-tight">Onboarding and verifications</h4>
            <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
               Learn about the relationship between onboarding and verification.
            </p>
            <button className="text-[13px] font-bold text-[#635bff] hover:underline flex items-center gap-1.5">
               Learn more <ExternalLink size={14} />
            </button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
