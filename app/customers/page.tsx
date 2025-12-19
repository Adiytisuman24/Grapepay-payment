'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  Plus, 
  HelpCircle, 
  Bell, 
  Settings, 
  LayoutGrid, 
  ChevronRight, 
  X, 
  Search, 
  Download, 
  BarChart3, 
  User, 
  PlusCircle, 
  Mail, 
  Calendar,
  Filter,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function CustomersPage() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'top', label: 'Top customers' },
    { id: 'first', label: 'First-time customers' },
    { id: 'repeat', label: 'Repeat customers' },
    { id: 'recent', label: 'Recent customers' },
    { id: 'refunds', label: 'High refunds' },
    { id: 'disputes', label: 'High disputes' },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        {/* Page Content */}
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
             <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Customers</h1>
             <Button className="bg-[#635bff] hover:bg-[#5851eb] h-8 px-4 gap-1 shadow-lg shadow-purple-600/10 font-bold text-sm rounded-lg">
                <Plus size={16} /> Add customer <span className="opacity-50 text-[10px] ml-1 font-black">N</span>
             </Button>
          </div>

          <div className="relative group">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pr-12">
               {tabs.map(tab => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={cn(
                      "px-6 py-2.5 text-[14px] font-bold border rounded-lg whitespace-nowrap h-11 transition-all",
                      activeTab === tab.id ? "bg-white border-[#635bff] text-[#635bff] shadow-sm ring-2 ring-purple-50" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                   )}
                 >
                    {tab.label}
                 </button>
               ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white via-white/80 to-transparent flex items-center justify-end pointer-events-none">
               <div className="pointer-events-auto bg-white border border-slate-200 rounded-full h-8 w-8 flex items-center justify-center mr-1 shadow-sm hover:bg-slate-50 cursor-pointer">
                  <ChevronRight size={14} className="text-slate-400"/>
               </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2.5">
                {[
                  { label: 'Email', icon: Mail },
                  { label: 'Name', icon: User },
                  { label: 'Created date', icon: Calendar },
                  { label: 'Type', icon: Filter },
                  { label: 'More filters', icon: Plus },
                ].map(f => (
                   <Button key={f.label} variant="outline" className="h-7 text-[12px] font-bold text-slate-600 hover:bg-slate-50 gap-1.5 px-3 bg-white border-slate-200 shadow-sm">
                      <f.icon size={12} className="text-slate-400" /> {f.label}
                   </Button>
                ))}
             </div>
             <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 gap-2 border-slate-200 text-slate-600 font-bold px-4">
                   <Download size={14} className="text-slate-400" /> Export
                </Button>
                <Button variant="outline" size="sm" className="h-8 gap-2 border-slate-200 text-slate-600 font-bold px-4">
                   <BarChart3 size={14} className="text-slate-400" /> Analyze
                </Button>
                <Button variant="outline" size="sm" className="h-8 gap-2 border-slate-200 text-slate-600 font-bold px-4">
                   <Settings size={14} className="text-slate-400" /> Edit columns
                </Button>
             </div>
          </div>

          <div className="flex flex-col items-center justify-center py-24 space-y-6 text-center">
             <div className="h-12 w-12 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-300 shadow-sm">
                <User size={24} />
             </div>
             <div className="space-y-1.5">
                <h3 className="text-[16px] font-bold text-slate-900 tracking-tight">Add your first customer</h3>
                <p className="text-[13px] text-slate-500 font-medium max-w-sm tracking-tight leading-relaxed">
                   Bill customers with one-off or recurring invoices, or subscriptions.
                </p>
                <button className="text-[13px] font-bold text-[#635bff] hover:underline flex items-center gap-1 justify-center mt-3 group">
                   Learn more <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </button>
             </div>
             <Button className="bg-[#635bff] hover:bg-[#5851eb] h-9 px-5 gap-2 shadow-lg shadow-purple-600/10 font-bold text-sm rounded-lg mt-4 transition-all hover:scale-[1.02] active:scale-[0.98]">
                <Plus size={16} /> Add a customer
             </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
