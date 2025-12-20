'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function EmbeddedAppsPage() {
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          
          {/* Main Hero Section */}
          <div className="max-w-4xl mx-auto mt-8 space-y-16">
             <div className="flex flex-col items-center text-center space-y-8">
                {/* Visual Illustration */}
                <div className="relative w-full max-w-[600px] h-[320px] rounded-xl overflow-hidden shadow-2xl bg-white border border-slate-200 group transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                   {/* Background Gradient */}
                   <div className="absolute inset-0 bg-gradient-to-br from-[#635bff] via-[#00d4ff] to-[#e400f4] opacity-10" />
                   
                   {/* Top Bar */}
                   <div className="h-10 bg-[#1f2937] flex items-center px-4 gap-2">
                      <div className="flex gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                         <div className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]" />
                         <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                      </div>
                      <div className="mx-auto w-[40%] h-5 bg-[#374151] rounded-full opacity-50" />
                   </div>

                   {/* Mock UI Content */}
                   <div className="p-8 flex gap-6 mt-4 opacity-90">
                      <div className="w-12 h-12 bg-[#635bff] rounded-lg shadow-lg flex items-center justify-center">
                         <div className="w-6 h-6 border-2 border-white rounded-md" />
                      </div>
                      <div className="flex-1 space-y-3">
                         <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                         <div className="h-2 w-24 bg-slate-100 rounded" />
                         <div className="space-y-2 pt-4">
                            <div className="h-2 w-full bg-slate-100 rounded" />
                            <div className="h-2 w-[90%] bg-slate-100 rounded" />
                            <div className="h-2 w-[80%] bg-slate-100 rounded" />
                         </div>
                      </div>

                      {/* Floating Popover Mockup */}
                      <div className="absolute top-[80px] right-[60px] bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-slate-100 p-4 w-[240px] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                         <h4 className="text-[12px] font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">Connected</h4>
                         <div className="space-y-3">
                            <div className="flex items-center justify-between text-[11px] font-medium text-slate-600">
                               <span>Customers</span>
                               <CheckCircle2 size={14} className="text-[#635bff]" />
                            </div>
                            <div className="space-y-1.5">
                               <div className="flex items-center justify-between text-[11px] font-medium text-slate-600">
                                  <span>Payments</span>
                                  <span className="text-slate-400 text-[10px]">Syncing...</span>
                               </div>
                               <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-[#635bff] w-[60%] rounded-full" />
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="max-w-2xl space-y-6">
                   <h1 className="text-[36px] font-black text-slate-900 tracking-tight leading-tight">
                      Bring powerful integrations to your platform with embedded apps
                   </h1>
                   <p className="text-[18px] text-slate-500 font-medium leading-relaxed">
                      With just a few lines of code, the Stripe App ecosystem can be enabled on your custom platform.
                   </p>
                   <Button className="h-10 bg-[#635bff] hover:bg-[#4d45e6] text-white font-bold px-6 shadow-sm rounded-md transition-all text-[14px]">
                      View available apps
                   </Button>
                </div>
             </div>

             {/* Guide Cards */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-slate-100">
                <div className="bg-[#f7f9fc] rounded-xl p-6 space-y-4 hover:bg-[#eff3f9] transition-colors group">
                   <div className="space-y-2">
                      <h3 className="text-[16px] font-bold text-slate-900">Get started with Connect embedded components</h3>
                      <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
                         Embedded apps require Connect embedded components.
                      </p>
                   </div>
                   <button 
                      onClick={() => router.push('/developers')}
                      className="text-[14px] font-bold text-[#635bff] flex items-center gap-1 group-hover:gap-2 transition-all hover:underline"
                   >
                      View docs <ArrowRight size={14} />
                   </button>
                </div>

                <div className="bg-[#f7f9fc] rounded-xl p-6 space-y-4 hover:bg-[#eff3f9] transition-colors group">
                   <div className="space-y-2">
                      <h3 className="text-[16px] font-bold text-slate-900">Embedded Stripe Apps integration guide</h3>
                      <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
                         Embed integrations built for Stripe on your platform to let your customers use their preferred third-party apps.
                      </p>
                   </div>
                   <button 
                      onClick={() => router.push('/developers')}
                      className="text-[14px] font-bold text-[#635bff] flex items-center gap-1 group-hover:gap-2 transition-all hover:underline"
                   >
                      View docs <ArrowRight size={14} />
                   </button>
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
