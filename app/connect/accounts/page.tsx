'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  Plus, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function ConnectedAccounts() {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8 min-h-screen bg-white">
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Connected accounts</h1>
          <Button className="bg-[#635bff] hover:bg-[#5851eb] h-8 px-4 gap-1.5 shadow-lg shadow-purple-600/10 font-bold text-sm rounded-lg">
            <Plus size={16} /> Create
          </Button>
        </div>

        {/* Identity Document Alert */}
        <div className="bg-[#fff9e6] border border-[#ffeeba] p-4 rounded-xl flex gap-4 transition-all duration-300">
           <div className="text-[#856404] mt-0.5">
              <AlertTriangle size={18} />
           </div>
           <div className="flex-1 space-y-1">
              <h4 className="text-[14px] font-bold text-[#856404]">Provide a valid identity document</h4>
              <p className="text-[13px] text-[#856404] font-medium opacity-80">
                 We need a valid identity document for Nextpayments Nextpay to use Connect and create live connected accounts.
              </p>
           </div>
           <Button variant="outline" size="sm" className="h-8 bg-white border border-[#ffeeba] shadow-sm text-[#856404] font-bold hover:bg-[#fffcf0]">
              Get started
           </Button>
        </div>

        {/* Empty State Card */}
        <div className="border border-slate-100 rounded-2xl bg-slate-50/30 p-20 flex flex-col items-center justify-center text-center space-y-6">
           <div className="space-y-2">
              <h2 className="text-[22px] font-bold text-slate-900 tracking-tight">Connect setup almost complete</h2>
              <p className="text-[15px] text-slate-500 font-medium tracking-tight">
                 Finish confirming your integration before creating your first live account.
              </p>
           </div>
           <Button className="bg-[#635bff]/40 hover:bg-[#635bff]/50 text-white cursor-not-allowed h-9 px-6 font-bold rounded-lg transition-all shadow-none">
              Create a live connected account
           </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
