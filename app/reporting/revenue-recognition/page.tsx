'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink, FileText, BarChart, ShieldCheck, Settings2 } from 'lucide-react';
import Link from 'next/link';

export default function RevenueRecognitionPage() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500">
        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Revenue Recognition</h1>

        {/* Hero Section */}
        <Card className="bg-[#f7f9fc] border-none shadow-none rounded-2xl overflow-hidden p-12 flex flex-col lg:flex-row items-center gap-12">
           <div className="flex-1 space-y-8">
              <div className="inline-flex items-center px-2 py-1 bg-white border border-slate-200 rounded text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
                 Revenue Recognition
              </div>
              
              <div className="space-y-4">
                 <h2 className="text-[42px] font-bold text-[#1a1f36] leading-tight tracking-tight">Automate accrual accounting</h2>
                 <p className="text-[#4f566b] text-[18px] font-medium leading-[1.6]">
                    Save time, stay compliant, and stop relying on spreadsheets by automating accounting for your GrapePay revenue.
                 </p>
                 <p className="text-[#4f566b] text-[14px]">
                    Explore features in test mode at no cost. To access Revenue Recognition reports for live transactions, <span className="text-[#635bff] font-bold cursor-pointer hover:underline">activate your free trial</span> in your live account.
                 </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                 <Button className="bg-[#635bff] hover:bg-[#5851eb] text-white font-bold h-10 px-6 rounded-md shadow-sm transition-all">
                    Get started
                 </Button>
                 <Button variant="outline" className="h-10 px-6 font-bold border-slate-200 text-slate-600 hover:bg-slate-50 rounded-md shadow-sm transition-all flex items-center gap-2">
                    <span>View features</span>
                    <ExternalLink size={14} />
                 </Button>
              </div>
           </div>

           <div className="flex-1 w-full max-w-md">
              <div className="relative bg-gradient-to-br from-purple-200 via-pink-100 to-indigo-100 rounded-2xl aspect-[1.3] p-8 flex items-end justify-end overflow-hidden">
                 {/* Visual graphic representing ledger/reporting */}
                 <div className="w-[85%] h-[85%] bg-white rounded-xl shadow-2xl p-6 flex flex-col gap-6 translate-x-12 translate-y-12 rotate-2 animate-in slide-in-from-bottom-12 duration-1000">
                    <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                       <FileText className="text-slate-300" size={24} />
                    </div>
                    <div className="space-y-3">
                       {[...Array(6)].map((_, i) => (
                          <div key={i} className="h-2 w-full bg-slate-50 rounded-full" style={{ width: `${100 - (i * 10)}%` }} />
                       ))}
                    </div>
                 </div>

                 <div className="absolute top-10 left-10 w-[60%] h-[60%] bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 flex flex-col gap-4 -translate-x-10 -translate-y-4 -rotate-3 animate-in fade-in zoom-in duration-1000 delay-300">
                    <div className="h-1.5 w-1/3 bg-slate-200 rounded-full" />
                    <div className="flex items-end gap-1.5 flex-1">
                       {[30, 50, 40, 70, 60, 90, 80].map((h, i) => (
                          <div key={i} className="flex-1 bg-indigo-200 rounded-t-sm" style={{ height: `${h}%` }} />
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </Card>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
           <Card className="bg-[#f7f9fc] border-none shadow-none rounded-xl p-10 space-y-6 flex flex-col justify-between hover:bg-slate-100/50 transition-colors group cursor-pointer">
              <div className="space-y-4">
                 <h3 className="text-xl font-bold text-slate-900 leading-tight">Stay compliant with IFRS 15 and ASC 606 standards</h3>
                 <p className="text-slate-500 font-medium leading-[1.6]">
                    Automatically generate journal entries and auditable accounting reports, to help you stay compliant with revenue recognition standards.
                 </p>
              </div>
              <Link href="#" className="text-[14px] font-bold text-[#635bff] hover:underline flex items-center gap-1.5">
                 <span>Learn more</span>
                 <ExternalLink size={14} />
              </Link>
           </Card>

           <Card className="bg-[#f7f9fc] border-none shadow-none rounded-xl p-10 space-y-6 flex flex-col justify-between hover:bg-slate-100/50 transition-colors group cursor-pointer">
              <div className="space-y-4">
                 <h3 className="text-xl font-bold text-slate-900 leading-tight">Configurable for your business</h3>
                 <p className="text-slate-500 font-medium leading-[1.6]">
                    Customize your chart of accounts to match your general ledger, create rules to recognize revenue in line with your accounting practices, and automate your deferred revenue calculation.
                 </p>
              </div>
              <Link href="/docs" className="text-[14px] font-bold text-[#635bff] hover:underline flex items-center gap-1.5">
                 <span>View docs</span>
                 <ExternalLink size={14} />
              </Link>
           </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
