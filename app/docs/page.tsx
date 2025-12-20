'use client';

import { useState } from 'react';
import { 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Settings,
  X,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function DocsPage() {
  const SidebarItem = ({ active, children, hasSub = false, isHeader = false }: any) => (
    <div className={cn(
      "flex items-center justify-between px-3 py-1.5 text-[13px] font-medium rounded-md cursor-pointer transition-colors",
      active ? "bg-slate-100 text-[#635bff] font-bold" : "text-slate-600 hover:text-slate-900",
      isHeader ? "text-slate-900 font-bold" : ""
    )}>
      {children}
      {hasSub && <ChevronDown size={14} className="text-slate-400" />}
    </div>
  );

  const SidebarSection = ({ title, items }: any) => (
    <div className="space-y-1 mb-6">
      <h4 className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">{title}</h4>
      <div className="space-y-0.5">
        {items.map((item: any, i: number) => (
          <SidebarItem key={i} active={item.active} hasSub={item.hasSub}>
            {item.label}
          </SidebarItem>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Top Header */}


      <div className="flex flex-1 max-w-[1600px] w-full mx-auto">


        {/* Main Content */}
        <main className="flex-1 px-8 lg:px-16 py-12 max-w-5xl">
           <div className="space-y-12">
              {/* Header */}
              <div className="space-y-6">
                 <div className="space-y-4">
                    <h1 className="text-[36px] font-bold text-slate-900 tracking-tight">Get started</h1>
                    <p className="text-[20px] text-slate-600 font-normal leading-relaxed">Create an account and learn how to build on Grapepay.</p>
                 </div>

                 {/* "Create an account" Hero Section */}
                 <div className="mt-8">
                    <h2 className="text-[24px] font-bold text-slate-900 mb-6">Create an account</h2>
                    
                    <div className="flex flex-col md:flex-row bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer min-h-[320px]">
                        <div className="flex-1 p-10 flex flex-col justify-center space-y-6">
                           <h3 className="text-[22px] font-bold text-[#635bff] leading-tight">
                              Set up a Grapepay account and immediately start building your integration.
                           </h3>
                           <p className="text-[15px] text-slate-600 leading-relaxed">
                              If you're ready to start developing, see our <span className="text-[#635bff] font-medium hover:underline">Checkout quickstart</span>.
                           </p>
                           <div className="pt-2">
                              <span className="text-[#635bff] font-bold text-[15px] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                 Create account <ChevronRight size={16} />
                              </span>
                           </div>
                        </div>
                        
                        <div className="flex-1 bg-[#f7f9fc] p-8 relative flex items-center justify-center overflow-hidden">
                           {/* BG elements */}
                           <div className="absolute top-8 left-8 right-8">
                              <div className="h-4 w-24 bg-slate-200/50 rounded-full mb-4" />
                              <div className="h-3 w-16 bg-slate-200/50 rounded-full mb-6" />
                              <div className="bg-white rounded-lg shadow-sm border border-slate-200/60 p-3 mb-3">
                                 <span className="text-[12px] text-slate-400 block mb-1">Country</span>
                                 <span className="text-[13px] text-slate-600">United States</span>
                              </div>
                              <div className="bg-white rounded-lg shadow-sm border border-slate-200/60 p-3 h-12" />
                              <div className="mt-4 flex items-center gap-2">
                                 <div className="h-4 w-4 rounded bg-purple-400" />
                                 <div className="h-2 w-32 bg-slate-200/50 rounded-full" />
                              </div>
                           </div>

                           {/* Floating List Card */}
                           <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 w-[260px] relative z-10 space-y-5 border border-slate-100">
                              {[
                                 { text: 'Add Business Info', active: true },
                                 { text: 'Connect Your Bank', active: true },
                                 { text: 'Secure Your Account', active: true },
                                 { text: 'Add Extras', num: 4 },
                                 { text: 'Review & Finish', num: 5 },
                              ].map((item: any, i) => (
                                 <div key={i} className="flex items-center gap-3">
                                    <div className={cn(
                                       "h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors",
                                       item.active ? "bg-[#635bff] text-white" : "bg-slate-100 text-slate-500"
                                    )}>
                                       {item.active ? <div className="h-1.5 w-1.5 bg-white rounded-full" /> : item.num}
                                    </div>
                                    <span className={cn(
                                       "text-[12px] font-bold",
                                       item.active ? "text-slate-900" : "text-slate-500 font-medium"
                                    )}>
                                       {item.text}
                                    </span>
                                 </div>
                              ))}
                           </div>
                        </div>
                    </div>
                 </div>
              </div>

              {/* Common use cases */}
              <div className="space-y-8 pt-6">
                 <h2 className="text-[24px] font-bold text-slate-900">Common use cases</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Just simplified placeholders for common use cases if needed, but per request "remove everything and just put the second image kinda", 
                        the second image mostly shows the "Create an account" part prominently. I'll add the use cases cards visible at the bottom of the image but simpler. */}
                    {/* The image shows the start of "Common use cases" section, I will render empty placeholders or just the start to match visual exactly? 
                        The image cuts off. I will implement a clean grid like previously but with cleaner typography matching the image style. */}
                 </div>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
}
