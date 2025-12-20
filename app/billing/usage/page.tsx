'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Plus, Beaker } from 'lucide-react';
import Link from 'next/link';

export default function UsageBillingPage() {
  const [activeTab, setActiveTab] = useState('meters');

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
           <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Usage-based billing</h1>
           <div className="flex items-center gap-3">
              <Button className="bg-[#635bff] hover:bg-[#5851eb] text-white font-bold h-9 px-4 rounded-md shadow-sm transition-all flex items-center gap-2">
                 <Plus size={16} />
                 <span>Create test meter</span>
                 <div className="h-4 w-4 bg-white/20 rounded flex items-center justify-center text-[10px]">n</div>
              </Button>
           </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex items-center gap-6">
            {[
              { id: 'meters', label: 'Meters' },
              { id: 'alerts', label: 'Alerts' },
              { id: 'credits', label: 'Credits' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "pb-3 text-sm font-semibold transition-all relative",
                  activeTab === tab.id 
                    ? "text-[#635bff]" 
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#635bff]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <Card className="bg-[#f7f9fc] border-none shadow-none rounded-xl p-16 flex flex-col items-start space-y-8">
           <div className="space-y-4 max-w-3xl">
              <h2 className="text-[48px] font-bold text-[#1a1f36] leading-tight tracking-tight">
                 Bill your customers based on their usage
              </h2>
              <p className="text-[#4f566b] text-[18px] font-medium leading-[1.6]">
                 Use usage meters to flexibly bill your customers for their consumption of your products or services.
              </p>
           </div>

           <div className="flex items-center gap-4">
              <Button className="bg-[#635bff] hover:bg-[#5851eb] text-white font-bold h-10 px-6 rounded-md shadow-sm transition-all text-[15px]">
                 Create test meter
              </Button>
              <Link href="/docs" className="h-10 px-6 font-bold border-slate-200 text-slate-600 hover:bg-slate-50 rounded-md shadow-sm transition-all border flex items-center justify-center text-[15px]">
                 View docs
              </Link>
           </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
