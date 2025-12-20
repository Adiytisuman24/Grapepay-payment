'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  Plus, 
  Info,
  ChevronDown,
  Download,
  MoreHorizontal,
  X,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function DisputesPage() {
  const [activeTab, setActiveTab] = useState('Needs response');

  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Disputes</h1>
          </div>

          <div className="space-y-6">
             {/* Top Tip Banner */}
             <div className="bg-[#f7f9fc] border border-slate-100 rounded-lg p-3 flex items-center justify-between text-[13px] font-medium group">
                <div className="flex items-center gap-3">
                   <Sparkles size={16} className="text-[#635bff]" />
                   <div className="text-slate-600">
                      <span className="font-bold text-slate-900">New</span> Manage disputes on your connected accounts with the new Settlement merchant and Charge transferred to filters.
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <button className="text-[#635bff] font-bold hover:underline">View support article</button>
                   <button className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
                </div>
             </div>

             {/* Filters Tabs */}
             <div className="flex items-center border border-slate-200 rounded-lg bg-white p-1 gap-1 w-full max-w-[800px]">
                {['Needs response', 'In review', 'All disputes', 'Won', 'Lost'].map((t) => (
                   <button 
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={cn(
                         "flex-1 py-1.5 text-[13px] font-bold rounded-md transition-all text-center",
                         activeTab === t ? "bg-white border border-slate-200 text-[#635bff] shadow-sm ring-1 ring-[#635bff]/20" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                      )}
                   >
                      {t}
                   </button>
                ))}
             </div>

             {/* Detailed Filters Filters */}
             <div className="flex flex-wrap items-center gap-2">
                <button className="h-7 flex items-center gap-1.5 px-2.5 border border-dashed border-slate-300 rounded-full text-[12px] font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                  <Plus size={12} className="text-slate-400" /> Reason
                </button>
                <button className="h-7 flex items-center gap-1.5 px-2.5 border border-dashed border-slate-300 rounded-full text-[12px] font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                  <Plus size={12} className="text-slate-400" /> Status <span className="text-[#635bff]">Needs response, Needs response (inquiry)</span> <ChevronDown size={12} />
                </button>
                <button className="h-7 flex items-center gap-1.5 px-2.5 border border-dashed border-slate-300 rounded-full text-[12px] font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                  <Plus size={12} className="text-slate-400" /> Amount
                </button>
                <button className="h-7 flex items-center gap-1.5 px-2.5 border border-dashed border-slate-300 rounded-full text-[12px] font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                  <Plus size={12} className="text-slate-400" /> Disputed date
                </button>
                <button className="h-7 flex items-center gap-1.5 px-2.5 border border-dashed border-slate-300 rounded-full text-[12px] font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                  <Plus size={12} className="text-slate-400" /> Evidence due by <span className="text-[#635bff]">After 12/13/2025</span> <ChevronDown size={12} />
                </button>
                <button className="h-7 flex items-center gap-1.5 px-2.5 border border-dashed border-slate-300 rounded-full text-[12px] font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                  <Plus size={12} className="text-slate-400" /> Settlement merchant
                </button>
                <button className="h-7 flex items-center gap-1.5 px-2.5 border border-dashed border-slate-300 rounded-full text-[12px] font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                  <Plus size={12} className="text-slate-400" /> Charge transferred to
                </button>
                <button className="text-[12px] font-bold text-[#635bff] hover:underline ml-2">
                   Clear filters
                </button>
                
                <div className="flex-1" />
                <div className="flex items-center gap-2">
                   <Button variant="outline" size="sm" className="h-8 border-slate-200 text-slate-600 font-bold px-3 shadow-sm hover:bg-slate-50 gap-2">
                      <Download size={14} className="text-slate-400" /> Export
                   </Button>
                   <Button variant="outline" size="sm" className="h-8 border-slate-200 text-slate-600 font-bold px-3 shadow-sm hover:bg-slate-50 gap-2">
                      <MoreHorizontal size={14} className="text-slate-400" /> Analyze
                   </Button>
                </div>
             </div>

             {/* Empty State */}
             <div className="mt-12 flex flex-col items-center justify-center text-center space-y-4 py-20">
                <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                   <Info size={20} />
                </div>
                <div className="space-y-1">
                   <h3 className="text-[16px] font-bold text-slate-900">No disputed test payments need a response</h3>
                   <p className="text-[14px] text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
                      Disputed test payments will show up here, and you can decide whether to respond with evidence or accept the dispute. You can use <span className="text-[#635bff] cursor-pointer hover:underline">test cards</span> to simulate a disputed transaction.
                   </p>
                </div>
                <button className="text-[#635bff] font-bold text-[14px] hover:underline flex items-center gap-1">
                   Learn more <ArrowUpRight size={14} />
                </button>
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
