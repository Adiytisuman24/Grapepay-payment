'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function CapitalPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white p-8 overflow-hidden">
        <div className="max-w-4xl w-full flex flex-col items-center space-y-12">
           
           {/* High-Fidelity Capital Illustration (CSS/HTML based) */}
           <div className="relative w-full max-w-[600px] h-[340px] bg-emerald-500 rounded-[30px] p-6 shadow-2xl overflow-hidden group">
              {/* Background Accents */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-400 rounded-full blur-[80px] opacity-60"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-300 rounded-full blur-[80px] opacity-40"></div>
              
              <div className="relative z-10 w-full h-full bg-white rounded-2xl shadow-xl flex flex-col p-8 border border-slate-100/50">
                 <div className="flex justify-between items-start mb-8">
                    <div className="space-y-1">
                       <h4 className="text-[18px] font-bold text-slate-800">Financing in progress</h4>
                       <div className="flex items-center gap-2">
                          <div className="h-2 w-16 bg-slate-100 rounded-full overflow-hidden">
                             <div className="h-full w-2/3 bg-emerald-500 rounded-full"></div>
                          </div>
                          <span className="text-[11px] font-bold text-slate-400">Remaining balance</span>
                       </div>
                    </div>
                    
                    {/* Offer Cards (Floating Overlays) */}
                    <div className="absolute top-20 right-10 w-[180px] bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-4 border border-slate-50 border-t-2 border-t-purple-100 translate-x-4 -translate-y-4 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-700">
                       <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select your offer</span>
                          <span className="text-[12px]">🇺🇸</span>
                       </div>
                       <div className="text-[24px] font-bold text-slate-900 mb-4">$20,000</div>
                       <div className="h-1.5 w-full bg-slate-50 rounded-full relative">
                          <div className="absolute inset-y-0 left-0 w-3/4 bg-emerald-500 rounded-full"></div>
                          <div className="absolute right-1/4 -top-1 w-3.5 h-3.5 bg-white border-2 border-slate-200 rounded-full shadow-sm"></div>
                       </div>
                       <div className="flex justify-between mt-2">
                          <span className="text-[9px] font-bold text-slate-300">$1,200</span>
                          <span className="text-[9px] font-bold text-slate-300">$25,000</span>
                       </div>
                    </div>

                    <div className="absolute bottom-10 right-20 w-[180px] bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-4 border border-slate-50 border-t-2 border-t-purple-100 translate-x-12 translate-y-8 group-hover:translate-x-16 group-hover:translate-y-12 transition-transform duration-700 delay-100">
                       <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select your offer</span>
                          <span className="text-[12px]">🇬🇧</span>
                       </div>
                       <div className="text-[24px] font-bold text-slate-900 mb-6">£35,000</div>
                       <button className="w-full h-8 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-white transition-colors">
                          Start application
                       </button>
                    </div>
                 </div>

                 {/* Chart Placeholder inside the card */}
                 <div className="flex-1 flex gap-8">
                    <div className="w-20 h-20 rounded-full border-[8px] border-slate-50 relative flex items-center justify-center">
                       <div className="absolute inset-0 rounded-full border-[8px] border-emerald-500 border-t-transparent border-r-transparent -rotate-45"></div>
                       <div className="text-[10px] font-bold text-slate-400">60%</div>
                    </div>
                    <div className="flex-1 space-y-6 py-2">
                       <div className="h-2 w-full bg-slate-50 rounded-full"></div>
                       <div className="h-2 w-2/3 bg-slate-50 rounded-full"></div>
                       <div className="pt-2 border-t border-slate-50">
                          <span className="text-[10px] font-bold text-slate-300 uppercase">Paydown history</span>
                          <div className="flex gap-4 mt-3">
                             <div className="h-1.5 w-12 bg-slate-50 rounded-full"></div>
                             <div className="h-1.5 w-12 bg-slate-50 rounded-full"></div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex flex-col items-center text-center space-y-6 max-w-2xl">
              <h2 className="text-[42px] font-bold text-slate-900 tracking-tight leading-[1.1]">Launch a financing program in days</h2>
              <p className="text-[18px] text-slate-500 font-medium leading-relaxed">
                 Unlock a new revenue stream while helping your customers grow. Set up your program today without writing a single line of code.
              </p>
              <Button className="bg-[#635bff] hover:bg-[#5851eb] h-12 px-8 gap-2 shadow-xl shadow-purple-600/20 font-bold text-[16px] rounded-xl transition-all hover:scale-[1.05] active:scale-[0.98] mt-4">
                 Contact sales <ChevronRight size={20} className="ml-1" />
              </Button>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
