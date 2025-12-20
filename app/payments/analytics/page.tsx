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
  Filter,
  ArrowUpRight,
  MoreHorizontal,
  X,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PaymentsAnalytics() {
  const [activeTab, setActiveTab] = useState('Acceptance');

  const tabs = ['Acceptance', 'Authentication', 'Disputes', 'Payment methods', 'Optimization'];

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row min-h-screen bg-white">
        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Payments analytics</h1>
            <Button variant="outline" size="sm" className="h-8 border-slate-200 text-slate-600 font-bold px-3 shadow-sm hover:bg-slate-50 transition-all rounded-md">
              Share feedback
            </Button>
          </div>

          <div className="space-y-8">
            {/* Nav Tabs */}
            <div className="flex items-center gap-6 border-b border-slate-200/60 mb-8 overflow-x-auto scrollbar-hide">
              {tabs.map(tab => (
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

            {activeTab === 'Acceptance' && (
              <>
                {/* Filters Section */}
                <div className="space-y-3">
                  {/* Row 1 */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 bg-white border-slate-200 text-slate-900 font-bold px-3 shadow-sm hover:bg-slate-50">
                      Last 3 months
                    </Button>
                    <div className="flex items-center border border-slate-200 rounded-md bg-white shadow-sm overflow-hidden h-8">
                       <button className="px-3 h-full text-[13px] font-bold text-slate-900 hover:bg-slate-50 flex items-center gap-2 border-r border-slate-200">
                          Weekly <ChevronDown size={14} className="text-slate-400" />
                       </button>
                    </div>
                    <div className="flex items-center border border-slate-200 rounded-md bg-white shadow-sm overflow-hidden h-8">
                       <button className="px-3 h-full text-[13px] font-bold text-slate-900 hover:bg-slate-50 flex items-center gap-2 border-r border-slate-200">
                          Deduplicated <ChevronDown size={14} className="text-slate-400" />
                       </button>
                    </div>
                    <div className="flex items-center border border-slate-200 rounded-md bg-white shadow-sm overflow-hidden h-8">
                       <button className="px-3 h-full text-[13px] font-bold text-slate-900 hover:bg-slate-50 flex items-center gap-2 border-r border-slate-200">
                          Payment success rate <ChevronDown size={14} className="text-slate-400" />
                       </button>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button className="h-7 flex items-center gap-1.5 px-2.5 border border-dashed border-slate-300 rounded-full text-[12px] font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                      <Plus size={12} className="text-slate-400" /> Card type
                    </button>
                    <button className="h-7 flex items-center gap-1.5 px-2.5 border border-dashed border-slate-300 rounded-full text-[12px] font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                      <Plus size={12} className="text-slate-400" /> Card country
                    </button>
                    <button className="h-7 flex items-center gap-1.5 px-2.5 border border-dashed border-slate-300 rounded-full text-[12px] font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                      <Plus size={12} className="text-slate-400" /> Card brand
                    </button>
                    <button className="h-7 flex items-center gap-1.5 px-2.5 border border-dashed border-slate-300 rounded-full text-[12px] font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                      <Plus size={12} className="text-slate-400" /> Interaction type
                    </button>
                    <button className="h-7 flex items-center gap-1.5 px-2.5 border border-dashed border-slate-300 rounded-full text-[12px] font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                      <Plus size={12} className="text-slate-400" /> More filters
                    </button>
                  </div>
                </div>

                {/* Key Metrics Section */}
                <div className="space-y-6 pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <h2 className="text-[18px] font-black text-slate-900 tracking-tight">Key metrics for cards</h2>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-slate-500">Compared to</span>
                        <button className="h-7 px-2.5 flex items-center gap-1.5 bg-white border border-slate-200 rounded-md text-[12px] font-bold text-slate-600 hover:bg-slate-50 shadow-sm">
                          Previous period <ChevronDown size={14} className="text-slate-400" />
                        </button>
                        <span className="text-[12px] font-bold text-slate-400 ml-1">Jun 22 – Sep 20</span>
                      </div>
                    </div>
                  </div>

                  {/* Chart Placeholder / Empty State */}
                  <div className="border border-dashed border-slate-200 rounded-2xl h-[400px] flex flex-col items-center justify-center text-center space-y-4 bg-slate-50/10">
                     <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <Search size={24} />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[15px] font-bold text-slate-900">No payments matching this selection.</p>
                        <p className="text-[14px] text-slate-500 font-medium">
                          <button className="text-[#635bff] hover:underline font-bold">Clear filters</button> or select another date range and try again.
                        </p>
                     </div>
                  </div>
                </div>

                {/* Card Payments Breakdown */}
                <div className="space-y-6 pt-12 border-t border-slate-100">
                   <div className="space-y-1">
                      <h2 className="text-[18px] font-black text-slate-900 tracking-tight">Card payments breakdown</h2>
                      <p className="text-[14px] text-slate-500 font-bold max-w-3xl leading-relaxed">
                        Review card acceptance by different attributes. Includes blocked and failed payments, and payments that didn&apos;t complete 3D Secure authentication.
                      </p>
                   </div>
                   
                   <div className="border border-dashed border-slate-200 rounded-2xl h-[400px] flex flex-col items-center justify-center text-center space-y-4 bg-slate-50/10">
                     <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <Search size={24} />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[15px] font-bold text-slate-900">No payments matching this selection.</p>
                        <p className="text-[14px] text-slate-500 font-medium">
                          <button className="text-[#635bff] hover:underline font-bold">Clear filters</button> or select another date range and try again.
                        </p>
                     </div>
                   </div>
                </div>

                {/* Failed Card Payments */}
                <div className="space-y-6 pt-12 border-t border-slate-100">
                   <div className="space-y-1">
                      <h2 className="text-[18px] font-black text-slate-900 tracking-tight">Failed card payments</h2>
                      <p className="text-[14px] text-slate-500 font-bold max-w-3xl leading-relaxed">
                        Find out why card payments failed. <span className="text-[#635bff] cursor-pointer hover:underline font-bold">Learn more about decline codes.</span>
                      </p>
                   </div>
                   
                   <div className="border border-dashed border-slate-200 rounded-2xl h-[400px] flex flex-col items-center justify-center text-center space-y-4 bg-slate-50/10">
                     <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <Search size={24} />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[15px] font-bold text-slate-900">No payments matching this selection.</p>
                        <p className="text-[14px] text-slate-500 font-medium">
                          <button className="text-[#635bff] hover:underline font-bold">Clear filters</button> or select another date range and try again.
                        </p>
                     </div>
                   </div>
                </div>

                {/* Blocked Card Payments */}
                <div className="space-y-6 pt-12 pb-20 border-t border-slate-100">
                   <div className="space-y-1">
                      <h2 className="text-[18px] font-black text-slate-900 tracking-tight">Blocked card payments</h2>
                      <p className="text-[14px] text-slate-500 font-bold max-w-3xl leading-relaxed">
                        Find out why some card payments were blocked. For more details, go to <span className="text-[#635bff] cursor-pointer hover:underline font-bold">Radar</span> or <span className="text-[#635bff] cursor-pointer hover:underline font-bold">Adaptive Acceptance.</span>
                      </p>
                   </div>
                   
                   <div className="border border-dashed border-slate-200 rounded-2xl h-[400px] flex flex-col items-center justify-center text-center space-y-4 bg-slate-50/10">
                     <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <Search size={24} />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[15px] font-bold text-slate-900">No payments matching this selection.</p>
                        <p className="text-[14px] text-slate-500 font-medium">
                          <button className="text-[#635bff] hover:underline font-bold">Clear filters</button> or select another date range and try again.
                        </p>
                     </div>
                   </div>
                </div>
              </>
            )}

            {activeTab === 'Disputes' && (
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
                          className={cn(
                             "flex-1 py-1.5 text-[13px] font-bold rounded-md transition-all text-center",
                             t === 'Needs response' ? "bg-white border border-slate-200 text-[#635bff] shadow-sm ring-1 ring-[#635bff]/20" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
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
                       <h3 className="text-[16px] font-bold text-slate-900">No disputed payments need a response</h3>
                       <p className="text-[14px] text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                          Disputed payments will show up here, and you can decide whether to respond with evidence or accept the dispute.
                       </p>
                    </div>
                    <button className="text-[#635bff] font-bold text-[14px] hover:underline flex items-center gap-1">
                       Learn more <ArrowUpRight size={14} />
                    </button>
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Resources */}
        <div className="w-full lg:w-[320px] border-l border-slate-100 p-8 space-y-10 bg-slate-50/5">
          <div className="space-y-6">
            <h3 className="text-[16px] font-black text-slate-900">Resources</h3>
            
            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="mt-1 h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 shadow-sm group-hover:bg-slate-50 transition-colors">
                <Info size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-[14px] font-bold text-slate-900 tracking-tight hover:text-[#635bff] transition-colors">Acceptance analytics</h4>
                <p className="text-[12px] text-slate-500 leading-relaxed font-bold">
                   Learn more about analyzing your card payments acceptance.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-10 border-t border-slate-100">
             <h3 className="text-[14px] font-black text-slate-900">View other payment reports</h3>
             
             <div className="flex items-center justify-between group cursor-pointer hover:bg-slate-100 p-2 -mx-2 rounded-lg transition-colors">
               <span className="text-[13px] font-bold text-slate-600 group-hover:text-slate-900">Radar analytics</span>
               <ChevronRight size={14} className="text-slate-400" />
             </div>
             
             <button className="text-[13px] font-black text-[#635bff] hover:underline pt-2 group flex items-center gap-1">
                View all reports
             </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
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
