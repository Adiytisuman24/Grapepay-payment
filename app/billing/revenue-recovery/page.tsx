'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { 
  Info, 
  MessageSquare, 
  AlertCircle, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  HelpCircle,
  BarChart3,
  Download,
  ExternalLink,
  LayoutGrid
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Line, 
  ComposedChart,
  Legend
} from 'recharts';
import { COUNTRIES_AND_CURRENCIES } from '@/lib/currencies';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { name: 'Jan 2025', inRecovery: 40, recovered: 30, notRecovered: 10, rate: 2.1 },
  { name: 'Feb 2025', inRecovery: 45, recovered: 35, notRecovered: 10, rate: 2.2 },
  { name: 'Mar 2025', inRecovery: 42, recovered: 32, notRecovered: 10, rate: 2.1 },
  { name: 'Apr 2025', inRecovery: 48, recovered: 38, notRecovered: 10, rate: 2.3 },
  { name: 'May 2025', inRecovery: 52, recovered: 42, notRecovered: 10, rate: 2.4 },
  { name: 'Jun 2025', inRecovery: 50, recovered: 40, notRecovered: 10, rate: 2.3 },
  { name: 'Jul 2025', inRecovery: 55, recovered: 45, notRecovered: 10, rate: 2.5 },
  { name: 'Aug 2025', inRecovery: 54, recovered: 44, notRecovered: 10, rate: 2.6 },
  { name: 'Sep 2025', inRecovery: 56, recovered: 46, notRecovered: 10, rate: 2.7 },
  { name: 'Oct 2025', inRecovery: 58, recovered: 48, notRecovered: 10, rate: 2.8 },
  { name: 'Nov 2025', inRecovery: 62, recovered: 52, notRecovered: 10, rate: 3.0 },
  { name: 'Dec 2025', inRecovery: 60, recovered: 50, notRecovered: 10, rate: 2.9 },
];

export default function RevenueRecoveryPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES_AND_CURRENCIES.find(c => c.country === 'India') || COUNTRIES_AND_CURRENCIES[0]
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCountry.currencyCode,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getCurrencySymbol = () => {
    try {
      return (0).toLocaleString('en-US', {
        style: 'currency',
        currency: selectedCountry.currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).replace(/\d/g, '').trim();
    } catch (e) {
      return selectedCountry.currencyCode;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
           <div className="space-y-1">
              <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Revenue recovery</h1>
              <p className="text-slate-500 font-medium text-[15px]">
                Use automated recovery features that reduce and recover failed subscription payments.
              </p>
           </div>
           <Button variant="outline" className="h-9 px-4 font-bold border-slate-200 text-slate-600 hover:bg-slate-50 rounded-md shadow-sm transition-all flex items-center gap-2">
              <MessageSquare size={16} className="text-slate-400" />
              <span>Give feedback</span>
           </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex items-center gap-6">
            {['Overview', 'Retries', 'Emails', 'Automations'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={cn(
                  "pb-3 text-sm font-semibold transition-all relative",
                  activeTab === tab.toLowerCase() 
                    ? "text-[#635bff]" 
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                {tab}
                {activeTab === tab.toLowerCase() && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#635bff]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
           {/* Left Content */}
           <div className="flex-1 space-y-8">
              {/* Alert */}
              <div className="bg-[#f7f9fc] border border-slate-100 rounded-lg p-3 flex items-center gap-3 text-slate-500 text-[13px] font-medium font-bold">
                 <AlertCircle size={16} className="text-slate-400" />
                 Revenue recovery analytics are only available for live data.
              </div>

              {/* Filters & Metrics */}
              <div className="space-y-6">
                 <div className="flex items-center gap-2">
                    <div className="flex p-0.5 bg-slate-100/50 rounded-lg border border-slate-100">
                       {['3m', '6m', '1y', '2y'].map((period) => (
                          <button key={period} className={cn(
                             "h-7 px-4 text-[13px] font-bold rounded-md transition-all",
                             period === '1y' ? "bg-white text-[#635bff] shadow-sm" : "text-slate-500 hover:text-slate-800"
                          )}>
                             {period}
                          </button>
                       ))}
                    </div>
                    <div className="h-8 px-4 border border-slate-100 rounded-lg flex items-center text-[13px] font-bold text-slate-600 bg-white">
                       Jan 01, 2025 – Dec 20, 2025
                    </div>

                    <Select 
                      value={selectedCountry.country} 
                      onValueChange={(val) => {
                        const country = COUNTRIES_AND_CURRENCIES.find(c => c.country === val);
                        if (country) setSelectedCountry(country);
                      }}
                    >
                      <SelectTrigger className="h-8 w-[200px] bg-white border-slate-100 text-[13px] font-bold text-slate-600 focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {COUNTRIES_AND_CURRENCIES.map((c) => (
                          <SelectItem key={c.country} value={c.country} className="text-[13px] font-medium">
                            {c.country} ({c.currencyCode})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                 </div>

                  <div className="grid grid-cols-4 gap-8 py-4">
                    {[
                       { label: "Failed payments", value: formatCurrency(0), hasInfo: true },
                       { label: "Failure rate", value: "0%", hasInfo: true },
                       { label: "Recovered payments", value: formatCurrency(0), hasInfo: true },
                       { label: "Recovery rate", value: "0%", hasInfo: true },
                    ].map((m) => (
                       <div key={m.label} className="space-y-4">
                          <div className="flex items-center gap-1.5 text-slate-500 text-[13px] font-bold">
                             <span>{m.label}</span>
                             {m.hasInfo && <HelpCircle size={14} className="text-slate-300 cursor-help" />}
                          </div>
                          <div className="text-[28px] font-black text-slate-900">{m.value}</div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Chart Section */}
              <div className="space-y-6 pt-6">
                 <div className="flex items-center justify-between">
                    <h3 className="text-[18px] font-black text-slate-900">Recovery breakdown</h3>
                    <Button variant="outline" className="h-8 px-3 text-[12px] font-bold bg-slate-50/50 border-slate-100 text-slate-500 gap-1.5">
                       <LayoutGrid size={14} /> Explore
                    </Button>
                 </div>
                 <div className="flex items-center gap-6 text-[12px] font-bold text-slate-500">
                    <div className="flex items-center gap-2">
                       <div className="h-3 w-3 rounded-sm bg-slate-200" /> In recovery
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="h-3 w-3 rounded-sm bg-slate-400" /> Recovered
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="h-3 w-3 rounded-sm bg-slate-300" /> Not recovered
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="h-[2px] w-4 bg-slate-400" /> Recovery rate
                    </div>
                 </div>

                 <div className="h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                       <ComposedChart data={chartData}>
                          <CartesianGrid vertical={false} stroke="#f1f5f9" />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 11, fontWeight: 700, fill: '#64748b'}} 
                            dy={10}
                          />
                          <YAxis 
                            hide 
                            yAxisId="left" 
                          />
                          <YAxis 
                            hide 
                            yAxisId="right" 
                            orientation="right" 
                          />
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            labelStyle={{ fontWeight: 800, color: '#1a1f36' }}
                          />
                          <Bar dataKey="recovered" stackId="a" fill="#94a3b8" radius={[0, 0, 0, 0]} yAxisId="left" />
                          <Bar dataKey="inRecovery" stackId="a" fill="#cbd5e1" radius={[0, 0, 0, 0]} yAxisId="left" />
                          <Bar dataKey="notRecovered" stackId="a" fill="#e2e8f0" radius={[4, 4, 0, 0]} yAxisId="left" />
                          <Line type="monotone" dataKey="rate" stroke="#94a3b8" strokeWidth={2} dot={{ r: 4, fill: '#fff', strokeWidth: 2 }} yAxisId="right" />
                       </ComposedChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              {/* Decline Reason Table */}
              <div className="space-y-6 pt-12">
                 <div className="flex items-center justify-between">
                    <div className="space-y-1">
                       <h3 className="text-[18px] font-black text-slate-900">Failed volume by decline reason</h3>
                       <p className="text-[13px] text-slate-500 font-medium font-bold">Learn more about <span className="text-[#635bff] cursor-pointer">decline codes</span></p>
                    </div>
                    <Button variant="outline" className="h-8 px-3 text-[12px] font-bold bg-slate-50/50 border-slate-100 text-slate-500 gap-1.5 font-bold">
                       <LayoutGrid size={14} /> Explore
                    </Button>
                 </div>

                 {/* Bar visual indicator */}
                 <div className="h-2 w-full flex rounded-full overflow-hidden">
                    <div className="w-[30%] bg-[#64748b]" />
                    <div className="w-[20%] bg-[#94a3b8]" />
                    <div className="w-[15%] bg-[#cbd5e1]" />
                    <div className="w-[10%] bg-[#e2e8f0]" />
                    <div className="w-[15%] bg-[#94a3b8]" />
                    <div className="w-[10%] bg-[#cbd5e1]" />
                 </div>

                 <div className="pt-2">
                    <table className="w-full text-left text-[13px] font-bold">
                       <thead className="text-slate-400 uppercase tracking-tighter text-[11px] font-black border-b border-slate-50">
                          <tr>
                             <th className="pb-4 font-black">Decline code</th>
                             <th className="pb-4 text-right">Total failed volume</th>
                             <th className="pb-4 text-right">% of failed volume</th>
                             <th className="pb-4 text-right">Failures</th>
                             <th className="pb-4 text-right">% of failures</th>
                          </tr>
                       </thead>
                       <tbody className="text-slate-600 align-top">
                          {[
                             { name: 'Do not honor', volume: formatCurrency(0), volPct: '0.00%', count: 0, countPct: '0.00%', color: '#64748b' },
                             { name: 'Insufficient funds', volume: formatCurrency(0), volPct: '0.00%', count: 0, countPct: '0.00%', color: '#94a3b8' },
                             { name: 'Incorrect number', volume: formatCurrency(0), volPct: '0.00%', count: 0, countPct: '0.00%', color: '#cbd5e1' },
                             { name: 'Transaction not allowed', volume: formatCurrency(0), volPct: '0.00%', count: 0, countPct: '0.00%', color: '#e2e8f0' },
                             { name: 'Generic decline', volume: formatCurrency(0), volPct: '0.00%', count: 0, countPct: '0.00%', color: '#94a3b8' },
                             { name: 'Other', volume: formatCurrency(0), volPct: '0.00%', count: 0, countPct: '0.00%', color: '#cbd5e1' },
                          ].map((row) => (
                             <tr key={row.name} className="border-b border-slate-50">
                                <td className="py-4 flex items-center gap-3">
                                   <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: row.color }} />
                                   <span>{row.name}</span>
                                </td>
                                <td className="py-4 text-right text-slate-900">{row.volume}</td>
                                <td className="py-4 text-right font-medium">{row.volPct}</td>
                                <td className="py-4 text-right text-slate-900 font-medium">{row.count}</td>
                                <td className="py-4 text-right font-medium">{row.countPct}</td>
                             </tr>
                          ))}
                          <tr className="font-bold border-b border-slate-50">
                             <td className="py-4">Total</td>
                             <td className="py-4 text-right text-slate-900">{formatCurrency(0)}</td>
                             <td className="py-4 text-right">0.00%</td>
                             <td className="py-4 text-right text-slate-900">0</td>
                             <td className="py-4 text-right font-bold">0.00%</td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>

              {/* Download Data Section */}
              <div className="space-y-6 pt-12 pb-20">
                 <h3 className="text-[18px] font-black text-slate-900 tracking-tight">Download data</h3>
                 <div className="flex items-center justify-between py-6 border-y border-slate-50">
                    <div className="space-y-1">
                       <h4 className="text-[15px] font-bold text-slate-900">Failed invoices</h4>
                       <p className="text-[14px] text-slate-500 font-medium">Download a CSV of failed invoices and their recovery status.</p>
                    </div>
                    <Button variant="outline" className="h-9 px-4 font-bold border-slate-200 text-slate-600 gap-2 font-bold shadow-sm">
                       <Download size={16} className="text-slate-400" />
                       Export
                    </Button>
                 </div>
              </div>
           </div>

           {/* Right Sidebar Content */}
           <div className="w-full lg:w-[320px] space-y-12">
              <div className="space-y-6">
                 <h3 className="text-[18px] font-black text-slate-900 tracking-tight leading-tight">Optimize your revenue recovery</h3>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3 group cursor-pointer">
                       <div className="h-5 w-5 rounded-full bg-[#635bff] flex items-center justify-center text-white">
                          <CheckCircle2 size={16} strokeWidth={3} />
                       </div>
                       <span className="text-[14px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Enable smart retries</span>
                    </div>
                    <div className="flex items-center gap-3 group cursor-pointer">
                       <Circle size={20} className="text-[#635bff]" />
                       <span className="text-[14px] font-bold text-[#635bff] group-hover:underline transition-all">Enable recovery emails</span>
                    </div>
                    <div className="flex items-center gap-3 group cursor-pointer opacity-40">
                       <div className="h-5 w-5 rounded-full border border-dashed border-slate-400" />
                       <span className="text-[14px] font-bold text-slate-500">Use hosted recovery surface</span>
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <h3 className="text-[18px] font-black text-slate-900 tracking-tight leading-tight">Top customers in recovery</h3>
                    <Info size={16} className="text-slate-300" />
                 </div>
                 <div className="bg-[#f7f9fc] border border-slate-100 rounded-xl p-6 flex flex-col items-center gap-4">
                    <div className="h-10 w-10 bg-white border border-slate-50 rounded-lg flex items-center justify-center text-slate-300">
                       <Info size={20} />
                    </div>
                    <p className="text-[13px] text-slate-500 font-bold leading-relaxed text-center">
                       This table will show any subscribers that are actively being retried by GrapePay.
                    </p>
                 </div>
              </div>

              <div className="space-y-6">
                 <h3 className="text-[18px] font-black text-slate-900 tracking-tight leading-tight">Resources</h3>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <p className="text-[13px] font-bold text-slate-600 leading-tight">Recovery analytics explained</p>
                       <Link href="#" className="text-[13px] font-bold text-[#635bff] flex items-center gap-1 hover:underline">
                          View doc <ChevronRight size={14} />
                       </Link>
                    </div>
                    <div className="space-y-3">
                       <p className="text-[13px] font-bold text-slate-600 leading-normal">
                          Learn about GrapePay&apos;s revenue recovery tools for managing failed subscription payments
                       </p>
                       <Link href="#" className="text-[13px] font-bold text-[#635bff] flex items-center gap-1 hover:underline">
                          View doc <ChevronRight size={14} />
                       </Link>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
