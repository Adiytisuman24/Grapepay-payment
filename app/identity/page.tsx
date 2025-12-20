'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function IdentityPage() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div>
           <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Identity</h1>
           <p className="text-slate-500 font-medium text-[15px] mt-1">The easiest way to verify identities</p>
        </div>

        <div className="border-t border-slate-100 pt-8 space-y-6">
           <div className="space-y-2">
              <h3 className="text-[15px] font-bold text-slate-900">GrapePay Identity is currently available by invitation in your country.</h3>
              <p className="text-[14px] text-slate-500 font-medium">
                 Please join our waitlist to get notified—we&apos;re working to make GrapePay Identity available to users as quickly as we can.
              </p>
           </div>

           <Button variant="outline" className="h-9 px-4 font-bold border-slate-200 text-slate-600 hover:bg-slate-50 rounded-md shadow-sm transition-all">
              Join the waitlist
           </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
