'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function FinancialConnectionsPage() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Financial Connections</h1>
        
        <Card className="bg-[#f7f9fc] border-none shadow-none rounded-xl overflow-hidden p-12 mt-4">
           <div className="max-w-3xl space-y-8">
              <div className="space-y-4">
                 <h2 className="text-[42px] font-bold text-[#1a1f36] leading-tight tracking-tight">Connect to your users&apos; external financial accounts</h2>
                 <p className="text-[#4f566b] text-[18px] font-medium leading-[1.6]">
                    Access financial data with users&apos; permission to streamline payments, reduce fraud, underwrite risk, and build new products.
                 </p>
              </div>

              <div className="flex items-center gap-3">
                 <Button className="bg-[#c2c9d6] hover:bg-[#b0b9c9] text-white font-bold h-10 px-6 rounded-md shadow-sm transition-all cursor-not-allowed">
                    Get started
                 </Button>
                 <Button variant="outline" className="h-10 px-6 font-bold border-slate-200 text-slate-600 hover:bg-slate-50 rounded-md shadow-sm transition-all leading-none">
                    Learn more
                 </Button>
              </div>
           </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
