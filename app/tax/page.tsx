'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  ArrowRight,
  Info,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TaxPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tax</h1>
          <div className="flex items-center gap-3">
             <Button className="bg-[#635bff] hover:bg-[#5851eb] text-white font-bold h-10 px-4 rounded-md shadow-sm transition-all flex items-center gap-2">
                <Plus size={18} />
                <span>Add registration</span>
             </Button>
             <Button variant="outline" className="h-10 px-4 font-bold border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                <Plus size={18} />
                <span>Quick actions</span>
             </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200">
           <div className="flex items-center gap-6">
              {['Overview', 'Thresholds', 'Registrations', 'Transactions'].map((tab) => (
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

        {/* Main Section */}
        <div className="space-y-6">
           {/* Setup Card */}
           <Card className="bg-[#f7f9fc] border-none shadow-none rounded-xl overflow-hidden pt-12 pb-12 px-10">
              <div className="max-w-3xl space-y-6">
                 <h2 className="text-2xl font-bold text-slate-900">Continue Tax setup</h2>
                 <p className="text-slate-600 text-[15px] font-medium leading-relaxed">
                    Follow your setup guide to monitor, register and automatically collect sales tax, VAT and GST.
                 </p>
                 <div className="flex items-center gap-6 pt-2">
                    <Button className="bg-[#635bff] hover:bg-[#5851eb] text-white font-bold h-10 px-6 rounded-md shadow-sm transition-all">
                       Continue setup
                    </Button>
                    <div className="flex items-center gap-2">
                       <div className="relative h-5 w-5">
                          <svg className="h-5 w-5 -rotate-90">
                             <circle cx="10" cy="10" r="8.5" fill="transparent" stroke="#e2e8f0" strokeWidth="2.5" />
                          </svg>
                       </div>
                       <span className="text-[14px] font-bold text-slate-600">0/5 steps completed</span>
                    </div>
                 </div>
              </div>
           </Card>

           {/* Bottom Cards Row */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#f7f9fc] border-none shadow-none rounded-xl p-8 space-y-4 hover:bg-slate-100/80 transition-colors group cursor-pointer">
                 <h3 className="text-[15px] font-bold text-slate-900">Tax obligations</h3>
                 <p className="text-[14px] text-slate-600 font-medium leading-[1.6]">
                    We track and monitor your transactions and we&apos;ll let you know about your potential tax obligations.
                 </p>
                 <button className="text-[14px] font-bold text-[#635bff] hover:text-[#5851eb] flex items-center gap-1 mt-2">
                    <span>See how monitoring works</span>
                 </button>
              </Card>

              <Card className="bg-[#f7f9fc] border-none shadow-none rounded-xl p-8 space-y-4 hover:bg-slate-100/80 transition-colors group cursor-pointer">
                 <h3 className="text-[15px] font-bold text-slate-900">How it all works</h3>
                 <p className="text-[14px] text-slate-600 font-medium leading-[1.6]">
                    Familiarize yourself with tax collection, filing and remittance.
                 </p>
                 <button className="text-[14px] font-bold text-[#635bff] hover:text-[#5851eb] flex items-center gap-1 mt-2">
                    <span>Learn more</span>
                 </button>
              </Card>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
