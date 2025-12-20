'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  ChevronDown, 
  Info,
  AlertTriangle,
  RotateCcw,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';

export default function SupportCasesPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  
  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="mb-6 space-y-1">
             <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Support cases (Connect)</h1>
             <p className="text-[14px] text-slate-500 font-medium">Support cases created by your connected accounts.</p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-slate-200/60 mb-8">
            {['Overview', 'Cases'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-3 text-[14px] font-bold transition-all whitespace-nowrap relative",
                  activeTab === tab ? "text-[#635bff]" : "text-slate-500 hover:text-slate-900"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#635bff]" />
                )}
              </button>
            ))}
          </div>

          {/* Period Selector */}
          <div className="flex items-center gap-2 mb-8">
             <div className="flex items-center text-[13px] font-bold text-slate-500 bg-white border border-slate-200 rounded-md shadow-sm h-8 px-2">
                <span className="text-slate-400 mr-2 font-medium">Period</span>
                <span className="text-slate-700">Q3 2025</span>
                <ChevronDown size={14} className="ml-2 text-slate-400" />
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Account support volume */}
             <div className="space-y-4">
                <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
                   Account support volume <Info size={14} className="text-slate-400" />
                </div>
                <div className="h-[300px] border-b border-slate-100 flex flex-col justify-end relative">
                   <div className="absolute top-0 left-0">
                      <h3 className="text-[24px] font-bold text-slate-900">0 cases</h3>
                   </div>
                   <div className="w-full flex justify-between text-[11px] font-medium text-slate-400 py-2">
                      <span>Jun 29</span>
                      <span>Sep 28</span>
                   </div>
                   {/* Empty Chart Line */}
                   <div className="absolute bottom-6 left-0 right-0 h-[1px] bg-slate-200" />
                   <div className="absolute right-0 bottom-8 text-[11px] text-slate-300">0</div>
                   <div className="absolute right-0 top-1/2 text-[11px] text-slate-300">0</div>
                </div>
             </div>

             {/* Resolution time */}
             <div className="space-y-4">
                <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
                   Resolution time <Info size={14} className="text-slate-400" />
                </div>
                <div className="h-[200px] border border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50/30">
                   <div className="bg-slate-100/50 px-4 py-2 rounded text-[13px] font-medium text-slate-500">
                      There is no case data for the selected time period
                   </div>
                </div>
             </div>

             {/* First response time */}
             <div className="space-y-4">
                <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
                   First response time <Info size={14} className="text-slate-400" />
                </div>
                <div className="h-[200px] border border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50/30">
                   <div className="bg-slate-100/50 px-4 py-2 rounded text-[13px] font-medium text-slate-500">
                      There is no case data for the selected time period
                   </div>
                </div>
             </div>

             {/* CSAT */}
             <div className="space-y-4">
                <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
                   CSAT <Info size={14} className="text-slate-400" />
                </div>
                <div className="h-[200px] border border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50/30">
                   <div className="bg-slate-100/50 px-4 py-2 rounded text-[13px] font-medium text-slate-500">
                      There is not enough data to show a graph for this time period
                   </div>
                </div>
             </div>

             {/* Accounts with highest support volume */}
             <div className="space-y-4">
                <div className="flex items-center justify-between text-[13px] font-bold text-slate-700">
                   <div className="flex items-center gap-2">
                     Accounts with highest support volume <Info size={14} className="text-slate-400" />
                   </div>
                   <span className="text-slate-400 text-[12px]">Cases</span>
                </div>
                <div className="h-[200px] border border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50/30">
                   <div className="bg-slate-100/50 px-4 py-2 rounded text-[13px] font-medium text-slate-500">
                      There is no case data for the selected time period
                   </div>
                </div>
             </div>

             {/* Top grossing accounts support volume */}
             <div className="space-y-4">
                <div className="flex items-center justify-between text-[13px] font-bold text-slate-700">
                   <div className="flex items-center gap-2">
                     Top grossing accounts support volume <Info size={14} className="text-slate-400" />
                   </div>
                   <span className="text-slate-400 text-[12px]">Cases</span>
                </div>
                <div className="h-[200px] border border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50/30">
                   <div className="bg-slate-100/50 px-4 py-2 rounded text-[13px] font-medium text-slate-500">
                      There is no case data for the selected time period
                   </div>
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
