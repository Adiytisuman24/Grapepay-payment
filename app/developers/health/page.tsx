'use client';

import { DevelopersLayout } from '@/components/developers/DevelopersLayout';
import { Search, Filter, Calendar, Info, AlertCircle, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function HealthPage() {
  const [activeTab, setActiveTab] = useState('alerts');

  return (
    <DevelopersLayout>
      <div className="p-8 space-y-10 max-w-[1200px]">
        <div className="space-y-4">
           <h2 className="text-[24px] font-bold text-slate-900 tracking-tight">Health</h2>
           <p className="text-[14px] text-slate-500 font-medium">Monitor the health of your integrations with alerts, errors and insights.</p>
        </div>

        <div className="space-y-6">
           {/* Section Tabs */}
           <div className="flex items-center gap-6 border-b border-slate-100 overflow-x-auto shrink-0">
             {[
               { id: 'alerts', label: 'Alerts' },
               { id: 'errors', label: 'Errors' },
               { id: 'insights', label: 'Insights' },
             ].map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={cn(
                   "pb-3 text-[14px] font-bold transition-all relative whitespace-nowrap",
                   activeTab === tab.id ? "text-[#635bff]" : "text-slate-500 hover:text-slate-900"
                 )}
               >
                 {tab.label}
                 {activeTab === tab.id && (
                   <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#635bff]" />
                 )}
               </button>
             ))}
           </div>

           {/* Metrics Grid */}
           <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'All alerts', val: 0, active: true },
                { label: 'Critical', val: 0 },
                { label: 'Open', val: 0 },
                { label: 'Resolved', val: 0 },
              ].map(m => (
                <div 
                  key={m.label} 
                  className={cn(
                    "p-4 rounded-xl border transition-all text-left space-y-1",
                    m.active ? "bg-white border-[#635bff] shadow-sm ring-1 ring-[#635bff]/20" : "bg-white border-slate-200"
                  )}
                >
                   <p className={cn("text-[11px] font-bold uppercase tracking-wider", m.active ? "text-[#635bff]" : "text-slate-500")}>
                      {m.label}
                   </p>
                   <p className={cn("text-[20px] font-bold", m.active ? "text-[#635bff]" : "text-slate-900")}>
                      {m.val}
                   </p>
                </div>
              ))}
           </div>

           {/* Filters Bar */}
           <div className="flex items-center gap-3">
              {[
                { label: 'Alert ID', icon: Info },
                { label: 'Start date', icon: Calendar },
                { label: 'Status', icon: Info },
                { label: 'Severity', icon: AlertCircle },
              ].map(f => (
                <Button key={f.label} variant="outline" className="h-7 text-[12px] font-bold text-slate-600 bg-white border-slate-200 gap-1.5 px-3 rounded-full border-dashed shadow-sm">
                   <f.icon size={12} className="text-slate-400" /> {f.label}
                </Button>
              ))}
           </div>

           {/* Empty State */}
           <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
                 <Search size={24} className="text-slate-400" />
              </div>
              <div className="text-center space-y-1">
                 <h3 className="text-[18px] font-bold text-slate-900">No results found</h3>
              </div>
           </div>
        </div>
      </div>
    </DevelopersLayout>
  );
}
