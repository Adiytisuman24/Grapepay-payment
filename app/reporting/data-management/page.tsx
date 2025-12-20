'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, ExternalLink, Database, ArrowRight, Share2, Info } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function DataManagementPage() {
  const [activeTab, setActiveTab] = useState('data-pipeline');

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Data management</h1>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex items-center gap-6">
            {[
              { id: 'data-pipeline', label: 'Data Pipeline' },
              { id: 'imports', label: 'Imports' },
              { id: 'connectors', label: 'Connectors' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "pb-3 text-sm font-semibold transition-all relative",
                  activeTab === tab.id 
                    ? "text-[#635bff]" 
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#635bff]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Test Mode Banner */}
        <Card className="bg-[#f7f9fc] border border-slate-200 shadow-none rounded-xl p-4 flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-[14px] font-bold text-slate-900">Some settings are hidden</h3>
            <p className="text-[13px] text-slate-500 font-medium font-bold">Settings that affect your live integration are hidden in test mode.</p>
          </div>
          <Button variant="outline" className="bg-white border-slate-200 text-slate-700 font-bold h-9 px-4 rounded-md shadow-sm gap-2">
            <Eye size={16} className="text-slate-400" />
            <span>View all settings</span>
          </Button>
        </Card>

        {/* Hero Section */}
        <Card className="bg-[#f7f9fc] border-none shadow-none rounded-xl overflow-hidden p-16 flex flex-col lg:flex-row items-center gap-12 relative">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-[48px] font-bold text-[#1a1f36] leading-tight tracking-tight max-w-lg">
                Send GrapePay data anywhere you need it
              </h2>
              <p className="text-[#4f566b] text-[18px] font-medium leading-[1.6] max-w-xl font-bold">
                Data Pipeline sends all your up-to-date data and reports to your data storage destination.
              </p>
              <p className="text-slate-400 text-[14px] font-bold">
                Free until January 20, 2026. <Link href="#" className="text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 font-bold underline">Terms of service <ExternalLink size={12} /></Link>
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-3">
                <Button className="bg-[#635bff] hover:bg-[#5851eb] text-white font-bold h-11 px-6 rounded-md shadow-sm transition-all text-[15px]">
                  Try it free for 30 days
                </Button>
                <Button variant="outline" className="h-11 px-6 font-bold border-slate-200 text-slate-600 hover:bg-slate-50 rounded-md shadow-sm transition-all inline-flex items-center gap-2">
                  <span>See features</span>
                  <ExternalLink size={14} />
                </Button>
              </div>
              <p className="text-[14px] text-slate-500 font-bold">
                Need help connecting to your data warehouse? <Link href="#" className="text-[#635bff] hover:underline">Add a collaborator</Link>
              </p>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md">
            {/* Abstract Graphic matching image */}
            <div className="relative aspect-square">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-100/50 rounded-full blur-[80px]" />
               
               {/* Account Preview Card */}
               <Card className="absolute top-0 left-0 w-[80%] h-[35%] bg-white rounded-xl shadow-2xl p-5 space-y-4 z-20 border-slate-100">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xs">S</div>
                     <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Your GrapePay account</span>
                        <span className="text-[13px] font-bold text-slate-700">ROCKET RIDES</span>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                     <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold"><Database size={10} /> Payments</div>
                     <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold"><Database size={10} /> Activity</div>
                  </div>
               </Card>

               {/* Data Storage Card */}
               <Card className="absolute bottom-0 right-0 w-[80%] h-[55%] bg-white rounded-xl shadow-2xl p-6 space-y-6 z-10 border-slate-100 translate-x-4 -translate-y-4">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                        <Database size={20} />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Your data storage</span>
                        <span className="text-[13px] font-bold text-slate-700 uppercase tracking-widest">QUANTUM</span>
                     </div>
                  </div>
                  <div className="space-y-3">
                     <div className="h-2 w-full bg-slate-50 rounded-full" />
                     <div className="h-2 w-[85%] bg-slate-50 rounded-full" />
                     <div className="pt-2 text-[10px] font-bold text-slate-400">Top 5 accounts with highest <span className="text-blue-500">fraud rate</span></div>
                  </div>
               </Card>

               {/* Connection Line */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 10px rgba(99,91,255,0.2))' }}>
                  <path 
                    d="M 150 100 Q 250 150 250 250" 
                    fill="none" 
                    stroke="#635bff" 
                    strokeWidth="2" 
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />
               </svg>
            </div>
          </div>
        </Card>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-[#f7f9fc] border-none shadow-none rounded-xl p-10 space-y-4 hover:bg-slate-100/50 transition-colors group cursor-pointer">
            <h3 className="text-[16px] font-bold text-slate-900 font-bold">Learn more about Data Pipeline</h3>
            <p className="text-slate-500 font-medium leading-[1.6] text-[14px] font-bold">
              Read about supported data storage destinations, how to set up Data Pipeline, and data refresh schedules.
            </p>
            <Link href="#" className="text-[14px] font-bold text-[#635bff] hover:underline flex items-center gap-1.5 font-bold pt-2">
              <span>View docs</span>
              <ExternalLink size={14} />
            </Link>
          </Card>

          <Card className="bg-[#f7f9fc] border-none shadow-none rounded-xl p-10 space-y-4 hover:bg-slate-100/50 transition-colors group cursor-pointer">
            <h3 className="text-[16px] font-bold text-slate-900 font-bold">Do more with your data</h3>
            <p className="text-slate-500 font-medium leading-[1.6] text-[14px] font-bold">
              Get complete and accurate GrapePay data—centralize it with your other business data, break it down, and create the reports you need.
            </p>
            <Link href="#" className="text-[14px] font-bold text-[#635bff] hover:underline flex items-center gap-1.5 font-bold pt-2">
              <span>View data schema</span>
              <ExternalLink size={14} />
            </Link>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
