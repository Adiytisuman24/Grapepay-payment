'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  ChevronDown, 
  Search, 
  Plus, 
  Settings, 
  Download,
  Info,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function PaymentsAnalytics() {
  const [activeTab, setActiveTab] = useState('Acceptance');

  const tabs = ['Acceptance', 'Authentication', 'Disputes', 'Payment methods', 'Optimization'];

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row min-h-screen bg-white">
        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Payments analytics</h1>
            <Button variant="outline" size="sm" className="h-8 border-slate-200 text-slate-600 font-bold px-3 shadow-sm hover:bg-slate-50 transition-all">
              Share feedback
            </Button>
          </div>

          <div className="space-y-8">
            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-slate-100 mb-6 overflow-x-auto scrollbar-hide">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-3 text-[14px] font-bold transition-all whitespace-nowrap",
                    activeTab === tab ? "text-[#635bff] border-b-2 border-[#635bff]" : "text-slate-500 hover:text-slate-900"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Filters Row 1 */}
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 bg-white border-slate-200 text-slate-600 font-bold px-3 shadow-sm">
                Last 3 months
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-2 bg-white border-slate-200 text-slate-600 font-bold px-3 shadow-sm">
                Weekly <ChevronDown size={14} className="text-slate-400" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-2 bg-white border-slate-200 text-slate-600 font-bold px-3 shadow-sm">
                Deduplicated <ChevronDown size={14} className="text-slate-400" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-2 bg-white border-slate-200 text-slate-600 font-bold px-3 shadow-sm">
                Payment success rate <ChevronDown size={14} className="text-slate-400" />
              </Button>
            </div>

            {/* Filters Row 2 */}
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" className="h-7 gap-1.5 bg-white border-slate-200 text-slate-500 font-bold px-2.5 shadow-none text-[12px] opacity-80 hover:opacity-100">
                <Plus size={12} className="text-slate-400" /> Card type
              </Button>
              <Button variant="outline" size="sm" className="h-7 gap-1.5 bg-white border-slate-200 text-slate-500 font-bold px-2.5 shadow-none text-[12px] opacity-80 hover:opacity-100">
                <Plus size={12} className="text-slate-400" /> Card country
              </Button>
              <Button variant="outline" size="sm" className="h-7 gap-1.5 bg-white border-slate-200 text-slate-500 font-bold px-2.5 shadow-none text-[12px] opacity-80 hover:opacity-100">
                <Plus size={12} className="text-slate-400" /> Card brand
              </Button>
              <Button variant="outline" size="sm" className="h-7 gap-1.5 bg-white border-slate-200 text-slate-500 font-bold px-2.5 shadow-none text-[12px] opacity-80 hover:opacity-100">
                <Plus size={12} className="text-slate-400" /> Interaction type
              </Button>
              <Button variant="outline" size="sm" className="h-7 gap-1.5 bg-white border-slate-200 text-slate-500 font-bold px-2.5 shadow-none text-[12px] opacity-80 hover:opacity-100">
                <Plus size={12} className="text-slate-400" /> More filters
              </Button>
            </div>

            {/* Main Empty State Content */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">Key metrics for cards</h2>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-slate-500">Compared to</span>
                  <Button variant="outline" size="sm" className="h-7 gap-2 bg-white border-slate-200 text-slate-600 font-bold px-2 shadow-sm text-[12px]">
                    Previous period <ChevronDown size={12} className="text-slate-400" />
                  </Button>
                  <span className="text-[12px] font-medium text-slate-400 ml-2 italic">Jun 22 - Sep 18</span>
                </div>
              </div>

              <div className="border border-dashed border-slate-200 rounded-2xl h-[400px] flex flex-col items-center justify-center text-center space-y-4 bg-slate-50/20">
                 <div className="text-slate-300">
                    <Search size={40} />
                 </div>
                 <div className="space-y-1">
                    <p className="text-[15px] font-bold text-slate-900">No payments matching this selection.</p>
                    <p className="text-[14px] text-slate-500 font-medium">
                      <button className="text-[#635bff] hover:underline">Clear filters</button> or select another date range and try again.
                    </p>
                 </div>
              </div>
            </div>

            {/* Breakdown Section */}
            <div className="space-y-2 pt-8">
               <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">Card payments breakdown</h2>
               <p className="text-[14px] text-slate-500 font-medium max-w-2xl">
                 Review card acceptance by different attributes. Includes blocked and failed payments, and payments that didn't complete 3D Secure.
               </p>
            </div>
          </div>
        </div>

        {/* Sidebar Resources (Matching Screenshot) */}
        <div className="w-full lg:w-[320px] border-l border-slate-100 p-8 space-y-10 bg-slate-50/10">
          <div className="space-y-8">
            <h3 className="text-[16px] font-bold text-slate-900">Resources</h3>
            
            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="mt-1 h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-300 shadow-sm group-hover:bg-slate-50 transition-colors">
                <Info size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-[14px] font-bold text-slate-900 tracking-tight">Acceptance analytics</h4>
                <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
                   Learn more about analyzing your card payments acceptance.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
             <h3 className="text-[14px] font-bold text-slate-900">View other payment reports</h3>
             
             <div className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors">
               <span className="text-[13px] font-bold text-slate-600 group-hover:text-slate-900">Radar analytics</span>
               <ChevronRight size={14} className="text-slate-400" />
             </div>
             
             <button className="text-[13px] font-bold text-[#635bff] hover:underline pt-2">
                View all reports
             </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
