'use client';

import { DevelopersLayout } from '@/components/developers/DevelopersLayout';
import { Search, User, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function InspectorPage() {
  const [isAutoInspect, setIsAutoInspect] = useState(true);

  return (
    <DevelopersLayout>
      <div className="flex h-full bg-white relative overflow-hidden">
        {/* Left Sidebar Control */}
        <div className="w-64 border-r border-slate-100 p-6 space-y-8 h-full bg-slate-50/20">
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-8 h-4 rounded-full transition-colors relative cursor-pointer",
                      isAutoInspect ? "bg-[#635bff]" : "bg-slate-300"
                    )} onClick={() => setIsAutoInspect(!isAutoInspect)}>
                       <div className={cn(
                         "absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all shadow-sm",
                         isAutoInspect ? "translate-x-4" : "translate-x-0.5"
                       )} />
                    </div>
                    <span className="text-[13px] font-bold text-slate-700">Auto-inspect</span>
                 </div>
              </div>
              <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
                 Inspector will automatically update based on the resource displayed in the dashboard.
              </p>
           </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-16">
           {/* Inspection Visualization */}
           <div className="relative flex items-center justify-center w-full max-w-[800px]">
              <div className="flex items-center gap-8">
                 {/* Source Object */}
                 <div className="w-64 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-center space-y-4 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                       <User size={24} />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-[16px] font-bold text-slate-900">Sarah King</h4>
                       <p className="text-[12px] text-slate-500 font-medium">sarah.king@example.com</p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 text-left space-y-2">
                       <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          Details
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Customer ID</p>
                          <p className="text-[12px] font-mono text-slate-700 font-medium">grape-sking9f8e7d6a5b4c3d2e1f</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Balance</p>
                          <p className="text-[12px] font-mono text-slate-700 font-bold">$10.00 USD</p>
                       </div>
                    </div>
                 </div>

                 {/* Inspector Icon */}
                 <div className="relative flex-shrink-0 animate-in zoom-in duration-700 delay-300">
                    <div className="absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 w-8 h-[2px] bg-slate-200" />
                    <div className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 w-8 h-[2px] bg-slate-200" />
                    <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl shadow-xl flex items-center justify-center text-[#635bff] relative">
                       <div className="absolute inset-0 bg-blue-50 opacity-20 rounded-2xl" />
                       <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="relative z-10"><circle cx={12} cy={12} r={10}/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                    </div>
                 </div>

                 {/* Target JSON */}
                 <div className="w-64 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm font-mono text-[10px] text-left space-y-1.5 animate-in fade-in slide-in-from-right-4 duration-500">
                    <p><span className="text-slate-400">&quot;id&quot;:</span> <span className="text-[#635bff]">&quot;grape-sking9f8e7d...&quot;</span></p>
                    <p><span className="text-slate-400">&quot;address&quot;:</span> <span className="text-slate-400">null</span></p>
                    <p><span className="text-slate-400">&quot;balance&quot;:</span> <span className="text-green-600 font-bold">1000</span></p>
                    <p><span className="text-slate-400">&quot;created&quot;:</span> <span className="text-slate-600">1644536220</span></p>
                    <p><span className="text-slate-400">&quot;currency&quot;:</span> <span className="text-[#635bff]">&quot;USD&quot;</span></p>
                    <p><span className="text-slate-400">&quot;delinquent&quot;:</span> <span className="text-slate-400">false</span></p>
                    <p className="opacity-40">...</p>
                 </div>
              </div>
           </div>

           {/* Text Info */}
           <div className="text-center space-y-6 max-w-[600px] animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h2 className="text-[36px] font-bold text-slate-900 tracking-tight leading-tight">Peek under the hood with Inspector</h2>
              <p className="text-[17px] text-slate-500 font-medium leading-relaxed">
                 Inspect any Grapepay API object to view its underlying data, related logs and events in real-time. Use the Workbench to edit resources directly.
              </p>

              {/* Search Bar */}
              <div className="relative group max-w-[440px] mx-auto mt-10">
                 <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-slate-600 transition-colors" />
                 <input 
                   placeholder="Enter a grape- object ID" 
                   className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl text-[15px] outline-none focus:ring-4 focus:ring-purple-50 focus:border-[#635bff] transition-all text-slate-700 shadow-sm placeholder:text-slate-300 font-medium"
                 />
              </div>
           </div>
        </div>
      </div>
    </DevelopersLayout>
  );
}
