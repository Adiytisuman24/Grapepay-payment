'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, Plus, LayoutGrid, Search } from 'lucide-react';

export default function CustomMetricsPage() {
  const mockData = [
    { value: 40 }, { value: 35 }, { value: 55 }, { value: 45 }, { value: 65 }, { value: 50 }, { value: 75 }
  ];

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500">
        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Custom metrics</h1>

        <div className="flex flex-col items-center">
          {/* Visual Graphic Area */}
          <div className="w-full max-w-4xl aspect-[16/9] bg-gradient-to-br from-blue-400 via-emerald-300 to-cyan-300 rounded-3xl p-12 flex items-center justify-center relative overflow-hidden shadow-2xl">
             {/* Mock Dashboard Overlay */}
             <Card className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden p-8 flex flex-col gap-6 relative z-10">
                <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                   <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-900">Check daily</h3>
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-tight">
                         <Users size={12} />
                         <span>Shared • <span className="underline cursor-pointer">See all</span></span>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-6 flex-1">
                   {/* Metric 1 */}
                   <Card className="p-4 border border-slate-100 shadow-none space-y-4">
                      <div className="space-y-1">
                         <span className="text-[13px] font-bold text-slate-500">Trial conversion rate</span>
                         <div className="flex items-center gap-2">
                            <span className="text-xl font-black text-slate-900">56.8%</span>
                            <span className="text-[12px] font-bold text-emerald-500">+3.1%</span>
                         </div>
                      </div>
                      <div className="h-16 w-full">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockData}>
                               <Area type="monotone" dataKey="value" stroke="#60a5fa" fill="#60a5fa20" strokeWidth={2} />
                            </AreaChart>
                         </ResponsiveContainer>
                      </div>
                   </Card>

                   {/* Mock Sidebar Popup Element */}
                   <div className="absolute right-10 top-20 w-64 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-slate-200 z-20 p-5 space-y-4 animate-in zoom-in-95 duration-300">
                      <h4 className="text-[15px] font-bold text-slate-900">Create a new group</h4>
                      <div className="space-y-1.5">
                         <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Name</label>
                         <div className="h-10 w-full bg-slate-50 border border-slate-100 rounded-lg flex items-center px-3 font-bold text-slate-900 text-[14px]">
                            Growth reports
                         </div>
                      </div>
                   </div>

                   {/* Metric 2 */}
                   <Card className="p-4 border border-slate-100 shadow-none space-y-4">
                       <div className="space-y-1">
                         <span className="text-[13px] font-bold text-slate-500">New customers</span>
                         <div className="flex items-center gap-2">
                            <span className="text-xl font-black text-slate-900">1,624</span>
                            <span className="text-[12px] font-bold text-emerald-500">+4.5%</span>
                         </div>
                      </div>
                      <div className="flex items-end gap-1 h-12">
                         {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} className="flex-1 bg-indigo-400 rounded-t-sm" style={{ height: `${h}%` }} />
                         ))}
                      </div>
                   </Card>

                   {/* Metric 3 Placeholder */}
                   <Card className="p-4 border border-slate-100 border-dashed shadow-none flex items-center justify-center gap-2 text-slate-400 font-bold text-[14px]">
                      <Plus size={16} /> Add reports
                   </Card>
                </div>
             </Card>

             {/* Background blur circles */}
             <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
             <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          </div>

          {/* Hero Content */}
          <div className="mt-16 text-center space-y-8 max-w-2xl">
             <div className="space-y-4">
                <h2 className="text-[32px] font-bold text-slate-900">Monitor your data with custom metrics</h2>
                <p className="text-slate-500 text-[18px] font-medium leading-relaxed">
                   Create custom metrics with Sigma to get quick answers to complex data questions. Organize and monitor them in one place.
                </p>
             </div>
             
             <Button className="h-12 px-8 bg-[#635bff] hover:bg-[#5851eb] text-white font-bold rounded-lg shadow-sm transition-all text-[15px]">
                Go to Sigma
             </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
