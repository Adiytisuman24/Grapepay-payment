'use client';

import { DevelopersLayout } from '@/components/developers/DevelopersLayout';
import { Button } from '@/components/ui/button';
import { Plus, Download, ChevronRight } from 'lucide-react';

export default function WebhooksPage() {
  return (
    <DevelopersLayout>
      <div className="p-12 flex flex-col items-center justify-center space-y-12 max-w-[800px] mx-auto text-center">
        {/* Illustration Area */}
        <div className="relative w-full h-[200px] flex items-center justify-center">
           <div className="flex items-center gap-12">
              <div className="w-12 h-12 bg-[#635bff] rounded-lg shadow-lg flex items-center justify-center text-white font-black text-xl">G</div>
              <div className="w-12 h-0.5 bg-slate-100 flex-1 relative">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <ChevronRight size={14} className="text-slate-300" />
                 </div>
              </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xl font-mono text-[10px] text-left space-y-0.5 animate-in fade-in zoom-in duration-700">
               <p><span className="text-slate-400">&quot;id&quot;:</span> <span className="text-[#635bff]">&quot;grape-cus_L82GBDAIEgLtBf&quot;</span></p>
               <p><span className="text-slate-400">&quot;address&quot;:</span> <span className="text-slate-400">null</span></p>
               <p><span className="text-slate-400">&quot;balance&quot;:</span> <span className="text-green-600">1000</span></p>
               <p><span className="text-slate-400">&quot;created&quot;:</span> <span className="text-slate-600">1644536220</span></p>
               <p><span className="text-slate-400">&quot;currency&quot;:</span> <span className="text-[#635bff]">&quot;USD&quot;</span></p>
               <p><span className="text-slate-400">&quot;default_source&quot;:</span> <span className="text-slate-400">null</span></p>
               <p><span className="text-slate-400">&quot;delinquent&quot;:</span> <span className="text-[#635bff]">false</span></p>
            </div>
              <div className="w-12 h-0.5 bg-slate-100 flex-1 relative">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <ChevronRight size={14} className="text-slate-300" />
                 </div>
              </div>
              <div className="w-12 h-12 bg-white border border-[#635bff] rounded-lg shadow-lg flex items-center justify-center text-[#635bff]">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
           </div>
        </div>

        <div className="space-y-4">
           <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Trigger reactions in your integration with Grapepay events</h1>
           <p className="text-[15px] text-slate-500 font-medium leading-relaxed">
              Listen to Grapepay events by adding a webhook endpoint, Amazon EventBridge destination, or test your endpoint locally with a local listener.
           </p>
        </div>

        <div className="flex flex-col items-center gap-6">
           <div className="flex items-center gap-3">
              <Button className="bg-[#635bff] hover:bg-[#5249e0] font-bold text-sm h-10 px-6 rounded-lg shadow-lg shadow-purple-600/20">
                 <Plus size={18} className="mr-2" /> Add destination
              </Button>
              <Button variant="outline" className="h-10 px-4 font-bold text-slate-600 border-slate-200">
                 <Download size={16} className="mr-2" /> Import
              </Button>
           </div>
           <button className="text-[14px] font-bold text-[#635bff] hover:underline">Test with a local listener</button>
        </div>

        <div className="w-full max-w-[600px] mt-12 bg-white border border-slate-100 rounded-2xl p-8 text-left space-y-4 shadow-sm">
           <h3 className="text-[14px] font-black text-slate-900 uppercase tracking-widest">Quickstart guide</h3>
           <p className="text-[14px] text-slate-600 font-medium tracking-tight">Learn how to set up and deploy a webhook to listen to events from Grapepay.</p>
           <button className="text-[14px] font-bold text-[#635bff] hover:underline flex items-center gap-1.5">
              View quickstart <ChevronRight size={14} />
           </button>
        </div>
      </div>
    </DevelopersLayout>
  );
}
