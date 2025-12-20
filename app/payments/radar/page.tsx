'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  ChevronDown, 
  Search, 
  Plus, 
  Download,
  Info,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
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

const chartData = [
  { date: 'Sep 19, 2025', value: 0 },
  { date: 'Oct 04, 2025', value: 0 },
  { date: 'Oct 19, 2025', value: 0 },
  { date: 'Nov 03, 2025', value: 0 },
  { date: 'Nov 18, 2025', value: 0 },
  { date: 'Dec 03, 2025', value: 0 },
  { date: 'Dec 18, 2025', value: 0 },
];

export default function RadarPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Reviews', 'Rules', 'Lists', 'Risk controls', 'Insights'];

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row min-h-screen bg-white">
        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Radar</h1>
             <div className="flex items-center gap-2">
               <button className="text-[14px] font-bold text-slate-600 hover:text-slate-900 flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200/50">
                  Setup guide <div className="h-4 w-4 rounded-full border-2 border-slate-300 border-t-[#635bff]" />
               </button>
             </div>
          </div>

          <div className="space-y-8">
            {/* Tabs */}
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

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 bg-white border-slate-200 text-slate-900 font-bold px-3 shadow-sm hover:bg-slate-50">
                Sep 19, 2025 <ArrowRight size={12} className="mx-1" /> Dec 20, 2025
              </Button>
               <div className="h-8 w-px bg-slate-200 mx-1" />
              <div className="flex items-center border border-slate-200 rounded-md bg-white shadow-sm overflow-hidden h-8">
                 <button className="px-3 h-full text-[13px] font-bold text-slate-900 hover:bg-slate-50 flex items-center gap-2 border-r border-slate-200">
                    Payment count <ChevronDown size={14} className="text-slate-400" />
                 </button>
              </div>
              <div className="flex items-center border border-slate-200 rounded-md bg-white shadow-sm overflow-hidden h-8">
                 <button className="px-3 h-full text-[13px] font-bold text-slate-900 hover:bg-slate-50 flex items-center gap-2 border-r border-slate-200">
                    Payment succeeded date <ChevronDown size={14} className="text-slate-400" />
                 </button>
              </div>
              <div className="flex items-center border border-slate-200 rounded-md bg-white shadow-sm overflow-hidden h-8">
                 <button className="px-3 h-full text-[13px] font-bold text-slate-900 hover:bg-slate-50 flex items-center gap-2 border-r border-slate-200">
                    All screened payment methods <ChevronDown size={14} className="text-slate-400" />
                 </button>
              </div>
            </div>

            {/* Fraud Section */}
            <div className="space-y-6 pt-4">
               <div className="flex items-start justify-between">
                  <div className="space-y-1">
                     <h2 className="text-[18px] font-black text-slate-900 tracking-tight">Fraud</h2>
                     <p className="text-[14px] text-slate-500 font-medium">
                        View your fraud rates. Avoid fees by keeping fraud rates low. <span className="text-[#635bff] cursor-pointer hover:underline">View docs</span>
                     </p>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 px-3 text-[13px] font-bold gap-2 text-slate-600">
                     <Download size={14} className="text-slate-400" /> Export
                  </Button>
               </div>

               <div className="flex items-center gap-8 py-2">
                  {[
                     { label: 'Fraudulent disputes', value: '0.00%', count: 0, color: '#0055ff', status: 'good' },
                     { label: 'Early fraud warnings', value: '0.00%', count: 0, color: '#a855f7', status: '' },
                     { label: 'Total fraud rate', value: '0.00%', count: null, color: '#f97316', status: '' },
                  ].map((stat) => (
                     <div key={stat.label} className="space-y-1">
                        <div className="flex items-center gap-2 text-[13px] font-bold text-slate-600">
                           <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: stat.color }} />
                           {stat.label}
                           <Info size={14} className="text-slate-300" />
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-[24px] font-medium text-slate-900 tracking-tight">{stat.value}</span>
                           {stat.count !== null && <span className="text-[14px] font-medium text-slate-400 underline decoration-slate-300 underline-offset-4 decoration-dashed cursor-help">{stat.count}</span>}
                           {stat.status === 'good' && <CheckCircle2 size={16} className="text-green-500 fill-green-100" />}
                        </div>
                     </div>
                  ))}
               </div>

               <div className="h-[150px] w-full border-b border-slate-100 relative">
                  <div className="absolute left-0 bottom-8 w-full h-[2px] bg-orange-500" />
                  <div className="absolute left-0 bottom-0 w-full flex justify-between text-[11px] font-medium text-slate-400 pt-2">
                     <span>Sep 19, 2025</span>
                     <span>Oct 31, 2025</span>
                     <span>Dec 18, 2025</span>
                  </div>
                  <div className="absolute right-0 bottom-8 translate-y-[-50%] text-[11px] font-medium text-slate-400 pl-2">
                     0.00%
                  </div>
                  <div className="absolute left-0 top-1/2 translate-y-[-50%] text-[11px] font-medium text-slate-400 pr-2">
                     0
                  </div>
               </div>
            </div>

            {/* Disputes Section */}
            <div className="space-y-6 pt-8">
               <div className="flex items-start justify-between">
                  <div className="space-y-1">
                     <h2 className="text-[18px] font-black text-slate-900 tracking-tight">Disputes</h2>
                     <p className="text-[14px] text-slate-500 font-medium">
                        Review your dispute rate for fraudulent disputes and other disputes. <span className="text-[#635bff] cursor-pointer hover:underline">View docs</span>
                     </p>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 px-3 text-[13px] font-bold gap-2 text-slate-600">
                     <Download size={14} className="text-slate-400" /> Export
                  </Button>
               </div>

               <div className="flex items-center gap-8 py-2">
                  {[
                     { label: 'Fraudulent disputes', value: '0.00%', count: 0, color: '#0055ff' },
                     { label: 'Other disputes', value: '0.00%', count: 0, color: '#a855f7' },
                     { label: 'Total dispute rate', value: '0.00%', count: 0, color: '#f97316' },
                  ].map((stat) => (
                     <div key={stat.label} className="space-y-1">
                         <div className="flex items-center gap-2 text-[13px] font-bold text-slate-600">
                           <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: stat.color }} />
                           {stat.label}
                           <Info size={14} className="text-slate-300" />
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-[24px] font-medium text-slate-900 tracking-tight">{stat.value}</span>
                           <span className="text-[14px] font-medium text-slate-400 underline decoration-slate-300 underline-offset-4 decoration-dashed cursor-help">{stat.count}</span>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="h-[150px] w-full border-b border-slate-100 relative">
                  <div className="absolute left-0 bottom-8 w-full h-[2px] bg-orange-500" />
                  <div className="absolute left-0 bottom-0 w-full flex justify-between text-[11px] font-medium text-slate-400 pt-2">
                     <span>Sep 19, 2025</span>
                     <span>Oct 31, 2025</span>
                     <span>Dec 18, 2025</span>
                  </div>
                  <div className="absolute right-0 bottom-8 translate-y-[-50%] text-[11px] font-medium text-slate-400 pl-2">
                     0.00%
                  </div>
                  <div className="absolute left-0 top-1/2 translate-y-[-50%] text-[11px] font-medium text-slate-400 pr-2">
                     0
                  </div>
               </div>
            </div>

            {/* Blocks Section */}
            <div className="space-y-6 pt-8">
               <div className="flex items-start justify-between">
                  <div className="space-y-1">
                     <h2 className="text-[18px] font-black text-slate-900 tracking-tight">Blocks</h2>
                     <p className="text-[14px] text-slate-500 font-medium">
                        Learn how much fraud Radar might be preventing. <span className="text-[#635bff] cursor-pointer hover:underline">View docs</span>
                     </p>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 px-3 text-[13px] font-bold gap-2 text-slate-600">
                     <Download size={14} className="text-slate-400" /> Export
                  </Button>
               </div>

               <div className="flex items-center gap-8 py-2">
                  {[
                     { label: 'High risk blocks', value: '0.00%', count: 0, color: '#0055ff' },
                     { label: 'Rule blocks', value: '0.00%', count: 0, color: '#a855f7' },
                     { label: 'Total Radar block rate', value: '0.00%', count: 0, color: '#f97316', status: 'good' },
                  ].map((stat) => (
                     <div key={stat.label} className="space-y-1">
                         <div className="flex items-center gap-2 text-[13px] font-bold text-slate-600">
                           <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: stat.color }} />
                           {stat.label}
                           <Info size={14} className="text-slate-300" />
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-[24px] font-medium text-slate-900 tracking-tight">{stat.value}</span>
                           <span className="text-[14px] font-medium text-slate-400 underline decoration-slate-300 underline-offset-4 decoration-dashed cursor-help">{stat.count}</span>
                           {stat.status === 'good' && <CheckCircle2 size={16} className="text-green-500 fill-green-100" />}
                        </div>
                     </div>
                  ))}
               </div>

               <div className="h-[150px] w-full border-b border-slate-100 relative">
                  <div className="absolute left-0 bottom-8 w-full h-[2px] bg-orange-500" />
                  <div className="absolute left-0 bottom-0 w-full flex justify-between text-[11px] font-medium text-slate-400 pt-2">
                     <span>Sep 19, 2025</span>
                     <span>Oct 31, 2025</span>
                     <span>Dec 18, 2025</span>
                  </div>
                  <div className="absolute right-0 bottom-8 translate-y-[-50%] text-[11px] font-medium text-slate-400 pl-2">
                     0.00%
                  </div>
                  <div className="absolute left-0 top-1/2 translate-y-[-50%] text-[11px] font-medium text-slate-400 pr-2">
                     0
                  </div>
               </div>
            </div>

            {/* Radar Actions Section */}
            <div className="space-y-6 pt-8 pb-12">
               <div className="flex items-start justify-between">
                  <div className="space-y-1">
                     <h2 className="text-[18px] font-black text-slate-900 tracking-tight">Radar actions</h2>
                     <p className="text-[14px] text-slate-500 font-medium">
                        Analyze which transactions match each type of Radar rule or risk control. <span className="text-[#635bff] cursor-pointer hover:underline">View docs</span>
                     </p>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 px-3 text-[13px] font-bold gap-2 text-slate-600">
                     <Download size={14} className="text-slate-400" /> Export
                  </Button>
               </div>

               <div className="grid grid-cols-4 gap-4">
                  {[
                     { label: 'All rule matches', value: 0, active: true },
                     { label: '3D Secure', value: 0 },
                     { label: 'Allow', value: 0 },
                     { label: 'Block', value: 0 },
                     { label: 'Review', value: 0 },
                  ].map((card) => (
                     <div key={card.label} className={cn(
                        "p-4 rounded-lg border cursor-pointer transition-all",
                        card.active 
                           ? "bg-white border-[#635bff] shadow-[0_0_0_1px_#635bff]" 
                           : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                     )}>
                        <h4 className={cn("text-[13px] font-bold mb-1", card.active ? "text-[#635bff]" : "text-slate-600")}>{card.label}</h4>
                        <p className="text-[24px] font-bold text-slate-900">{card.value}</p>
                     </div>
                  ))}
               </div>

               <div className="bg-white border-t border-slate-100 mt-6">
                  {[
                     { label: 'Block', count: 0, color: 'bg-[#0055ff]' },
                     { label: '3D Secure', count: 0, color: 'bg-[#0ea5e9]' },
                     { label: 'Allow', count: 0, color: 'bg-[#f97316]' },
                     { label: 'Review', count: 0, color: 'bg-[#ec4899]' },
                  ].map((row) => (
                     <div key={row.label} className="flex items-center justify-between py-3 border-b border-slate-50 hover:bg-slate-50 px-2 -mx-2 rounded-lg transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                           <div className={cn("w-3 h-3 rounded-sm", row.color)} />
                           <span className="text-[13px] font-bold text-slate-600 group-hover:text-slate-900">{row.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-[13px] font-bold text-slate-900">{row.count}</span>
                           <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-500" />
                        </div>
                     </div>
                  ))}
               </div>
               
               {/* Legend & Chart for Actions */}
               <div className="pt-6 space-y-4">
                  <div className="flex items-center gap-6 text-[11px] font-bold text-slate-500">
                     <div className="flex items-center gap-2"><div className="w-2.5 h-[2px] bg-[#0ea5e9]" /> 3D Secure</div>
                     <div className="flex items-center gap-2"><div className="w-2.5 h-[2px] bg-[#f97316]" /> Allow</div>
                     <div className="flex items-center gap-2"><div className="w-2.5 h-[2px] bg-[#0055ff]" /> Block</div>
                     <div className="flex items-center gap-2"><div className="w-2.5 h-[2px] bg-[#ec4899]" /> Review</div>
                     <div className="flex items-center gap-2"><div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-slate-500" /> Rule change</div>
                  </div>

                  <div className="h-[2px] bg-[#ec4899] w-full mt-10" />
                  <div className="flex justify-between text-[11px] font-medium text-slate-400">
                     <span>0</span>
                  </div>
               </div>
            </div>

            {/* Radar Data Integration Section */}
            <div className="space-y-6 pt-12 pb-20 border-t border-slate-100">
               <div className="space-y-1">
                  <h2 className="text-[18px] font-black text-slate-900 tracking-tight">Radar data integration</h2>
                  <p className="text-[14px] text-slate-500 font-medium leading-relaxed max-w-4xl">
                     For the strongest possible fraud detection, we recommend collecting key data on 100% of your transactions. Review the metrics below to see how frequently you collect this data. <span className="text-[#635bff] cursor-pointer hover:underline">View docs</span>
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
                  {[
                     { label: 'Advanced fraud signals', value: '0.00%' },
                     { label: 'IP address', value: '0.00%' },
                     { label: 'Customer email', value: '0.00%' },
                     { label: 'Customer name', value: '0.00%' },
                     { label: 'Billing address', value: '0.00%' },
                  ].map((metric) => (
                     <div key={metric.label} className="space-y-1">
                        <div className="flex items-center gap-2 text-[14px] font-bold text-slate-800">
                           {metric.label}
                           {metric.label === 'Advanced fraud signals' && <Info size={14} className="text-slate-300" />}
                        </div>
                        <p className="text-[15px] font-medium text-slate-500">{metric.value}</p>
                     </div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar Resources */}
        <div className="w-full lg:w-[320px] border-l border-slate-100 p-8 space-y-10 bg-slate-50/5">
           <div className="space-y-6">
              <h3 className="text-[16px] font-black text-slate-900">Monitoring programs</h3>
              <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                 <div className="flex items-center gap-2">
                    <div className="h-5 w-8 bg-[#1a1f71] rounded text-[8px] font-bold text-white flex items-center justify-center tracking-tighter">VISA</div>
                    <span className="text-[13px] font-bold text-slate-700">VAMP</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[11px] font-bold rounded">In good standing</span>
                    <ChevronRight size={14} className="text-slate-400" />
                 </div>
              </div>
           </div>

          <div className="space-y-6">
            <h3 className="text-[16px] font-black text-slate-900">Resources</h3>
            
            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="mt-1 h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 shadow-sm group-hover:bg-slate-50 transition-colors">
                <Info size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-[14px] font-bold text-slate-900 tracking-tight hover:text-[#635bff] transition-colors">Radar</h4>
                <p className="text-[12px] text-slate-500 leading-relaxed font-bold">
                   Learn more about using Radar to protect your business against fraud.
                </p>
              </div>
            </div>
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
