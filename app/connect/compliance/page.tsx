'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function CompliancePage() {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-12 min-h-screen bg-white">
        <div className="space-y-1">
          <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Compliance</h1>
          <p className="text-[15px] text-slate-500 font-medium tracking-tight">
            Monitor regional updates and collect required information from your connected accounts.
          </p>
        </div>

        {/* Requirement updates Section */}
        <div className="space-y-4">
          <h2 className="text-[18px] font-bold text-slate-900">Requirement updates</h2>
          <div className="border border-dashed border-slate-200 rounded-2xl p-16 flex items-center justify-center bg-slate-50/20 group">
             <div className="bg-[#f7f8f9] border border-slate-200/50 px-5 py-2.5 rounded-xl group-hover:bg-white transition-all shadow-sm">
                <p className="text-slate-400 text-[13px] font-bold">Requirement updates for regions where you have connected accounts will appear here.</p>
             </div>
          </div>
        </div>

        {/* Account restrictions Section */}
        <div className="space-y-6">
          <h2 className="text-[18px] font-bold text-slate-900">Account restrictions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <p className="text-[14px] font-bold text-slate-900 flex items-center gap-1.5">
                      Restricted soon <Info size={14} className="text-slate-300" />
                   </p>
                   <span className="text-[14px] font-bold text-slate-400">0</span>
                </div>
                <div className="border border-dashed border-slate-200 rounded-2xl p-16 flex items-center justify-center bg-slate-50/20 group h-[160px]">
                   <div className="bg-[#f7f8f9] border border-slate-200/50 px-5 py-2.5 rounded-xl group-hover:bg-white transition-all shadow-sm">
                      <p className="text-slate-400 text-[13px] font-bold">No data</p>
                   </div>
                </div>
             </div>
             
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <p className="text-[14px] font-bold text-slate-900 flex items-center gap-1.5">
                      Restricted <Info size={14} className="text-slate-300" />
                   </p>
                   <span className="text-[14px] font-bold text-slate-400">0</span>
                </div>
                <div className="border border-dashed border-slate-200 rounded-2xl p-16 flex items-center justify-center bg-slate-50/20 group h-[160px]">
                   <div className="bg-[#f7f8f9] border border-slate-200/50 px-5 py-2.5 rounded-xl group-hover:bg-white transition-all shadow-sm">
                      <p className="text-slate-400 text-[13px] font-bold">No data</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
