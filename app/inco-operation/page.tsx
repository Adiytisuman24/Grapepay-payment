'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Building2, 
  MapPin, 
  Scale, 
  FileText,
  Plus,
  ArrowRight,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function IncPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
             <div className="space-y-1">
                <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Grapepay Inc.</h1>
                <p className="text-[14px] text-slate-500 font-medium">Incorporate your company, open a bank account, and start accepting payments.</p>
             </div>
             <div className="flex items-center gap-3">
                <Button className="bg-[#635bff] hover:bg-[#5851eb] text-white font-bold h-9 px-4 rounded-md shadow-sm transition-all flex items-center gap-2">
                   <span>Start application</span>
                   <ArrowRight size={16} />
                </Button>
             </div>
          </div>

          {/* Hero Banner */}
          <div className="relative rounded-2xl bg-[#0a2540] overflow-hidden text-white p-12 mb-12">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#00d4ff]/20 via-transparent to-transparent" />
             <div className="relative z-10 max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[12px] font-bold text-cyan-300">
                   <Globe size={14} /> Available in U.S.
                </div>
                <h2 className="text-[42px] font-black tracking-tight leading-tight">
                   Turn your idea into a startup
                </h2>
                <p className="text-[18px] text-slate-300 font-medium leading-relaxed max-w-xl">
                   Grapepay Inc. handles the paperwork to form your company, issues stock to founders, and helps you handle compliance filings as you grow.
                </p>
                
                <div className="grid grid-cols-2 gap-8 pt-8">
                   <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-cyan-400 shrink-0">
                         <Building2 size={20} />
                      </div>
                      <div className="space-y-1">
                         <h4 className="font-bold text-[15px]">Formation</h4>
                         <p className="text-[13px] text-slate-400 font-medium">Delaware C Corporation or LLC formation handled in days.</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-cyan-400 shrink-0">
                         <Scale size={20} />
                      </div>
                      <div className="space-y-1">
                         <h4 className="font-bold text-[15px]">Tax & legal</h4>
                         <p className="text-[13px] text-slate-400 font-medium">Ongoing compliance, registered agent service, and tax help.</p>
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Abstract visual */}
             <div className="absolute top-0 right-0 h-full w-[40%] bg-gradient-to-bl from-cyan-400/5 to-transparent skew-x-12 origin-top-right transform translate-x-12" />
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
             {[
                { title: "Bank account", desc: "Open a business bank account tailored for startups.", icon: Building2 },
                { title: "Post-incorporation", desc: "Stock issuance, 83(b) election, and bylaws generation.", icon: FileText },
                { title: "Registered Agent", desc: "We act as your registered agent in Delaware.", icon: MapPin },
             ].map((feature, i) => (
                <div key={i} className="p-6 rounded-xl border border-slate-200 bg-white hover:border-[#635bff] transition-colors group cursor-pointer shadow-sm">
                   <div className="h-10 w-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500 group-hover:bg-[#635bff] group-hover:text-white transition-colors mb-4">
                      <feature.icon size={20} />
                   </div>
                   <h3 className="text-[16px] font-bold text-slate-900 mb-2">{feature.title}</h3>
                   <p className="text-[14px] text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
                </div>
             ))}
          </div>

          {/* Compliance Section */}
          <div className="border-t border-slate-100 pt-12">
             <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                   <h3 className="text-[20px] font-bold text-slate-900">Compliance & filings</h3>
                   <p className="text-[14px] text-slate-500 font-medium">Stay compliant with automated alerts and filing tools.</p>
                </div>
                <Button variant="outline" className="font-bold text-slate-600">View all deadlines</Button>
             </div>
             
             <div className="bg-[#f7f9fc] rounded-xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-sm text-emerald-500">
                   <ShieldCheck size={24} />
                </div>
                <div>
                   <h4 className="text-[16px] font-bold text-slate-900">You&apos;re up to date</h4>
                   <p className="text-[14px] text-slate-500 font-medium mt-1">No upcoming filings needed for your company.</p>
                </div>
             </div>
          </div>

        </div>
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </DashboardLayout>
  );
}
