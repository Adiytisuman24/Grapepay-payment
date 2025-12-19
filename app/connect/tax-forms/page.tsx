'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ChevronDown, Store, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function TaxFormsPage() {
  return (
    <DashboardLayout>
      <div className="p-12 space-y-24 min-h-screen bg-white">
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] font-bold text-slate-900 tracking-tight">Tax forms</h1>
          <button className="flex items-center gap-1.5 text-[24px] font-bold text-[#635bff] hover:opacity-80 transition-opacity">
            2025 <ChevronDown size={20} className="mt-1" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-lg mx-auto">
           <div className="h-16 w-16 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-300 shadow-sm">
              <Store size={32} />
           </div>
           <div className="space-y-2">
              <h2 className="text-[24px] font-bold text-slate-900 tracking-tight">No US connected accounts</h2>
              <p className="text-[16px] text-slate-500 font-medium leading-relaxed">
                 To use Connect tax forms, you must have connected accounts located in the United States.
              </p>
           </div>
           <Button className="bg-[#635bff] hover:bg-[#5851eb] h-10 px-6 gap-2 shadow-lg shadow-purple-600/10 font-bold text-[15px] rounded-xl transition-all hover:scale-[1.02] items-center flex">
              <List size={18} className="mr-1" /> View connected accounts
           </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
