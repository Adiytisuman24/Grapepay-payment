'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Clock, 
  Code2, 
  Plus, 
  ChevronRight,
  TrendingUp,
  FileText,
  CreditCard,
  Layers,
  Settings2
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function BillingOverviewPage() {
  const cards = [
    {
      title: "Get started with GrapePay Billing",
      desc: "Get a personalized checklist to quickly start accepting payments with GrapePay Billing.",
      buttonLabel: "Get started",
      image: (
        <div className="relative w-full h-[200px] bg-slate-50 overflow-hidden flex items-end justify-center pt-8">
           <Card className="w-[85%] h-full bg-white rounded-t-xl shadow-2xl p-6 space-y-4 translate-y-2 border-slate-100">
              <div className="flex items-center gap-2">
                 <div className="h-5 w-5 bg-emerald-500 rounded-md flex items-center justify-center text-white"><Plus size={12}/></div>
                 <div className="h-2 w-24 bg-slate-100 rounded-full" />
              </div>
              <div className="space-y-4">
                 {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                       <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full border border-slate-200" />
                          <div className="h-2 w-32 bg-slate-50 rounded-full" />
                       </div>
                       <Button variant="ghost" className="h-6 px-2 text-[10px] bg-slate-50 font-bold text-slate-500">Start</Button>
                    </div>
                 ))}
              </div>
           </Card>
        </div>
      )
    },
    {
      title: "Invoice a customer",
      desc: "Collect one-time or recurring payments from a specific customer while automating reconciliation.",
      buttonLabel: "Create an invoice",
      badge: "Set up in 1 minute",
      subBadge: "No code",
      image: (
        <div className="relative w-full h-[200px] bg-slate-50 overflow-hidden flex items-center justify-center p-8">
           <Card className="w-[80%] bg-white rounded-xl shadow-2xl p-6 space-y-4 border-slate-100 ring-2 ring-indigo-50">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                 <div className="flex items-center gap-2">
                    <div className="h-4 w-4 text-slate-400"><FileText size={16}/></div>
                    <span className="text-xs font-bold text-slate-900">ghost</span>
                 </div>
                 <span className="text-[14px] font-black text-slate-900">$99.00</span>
              </div>
              <div className="space-y-2">
                 <div className="h-1.5 w-full bg-slate-50 rounded-full" />
                 <div className="h-1.5 w-[70%] bg-slate-50 rounded-full" />
              </div>
              <div className="pt-2 flex justify-end">
                <div className="h-8 w-8 bg-slate-900 rounded flex items-center justify-center text-white text-[10px] font-bold">L</div>
              </div>
           </Card>
        </div>
      )
    },
    {
      title: "Discover the power of GrapePay Billing",
      desc: "Get a quick and informative overview of GrapePay Billing by watching this introductory video.",
      buttonLabel: "Watch video",
      image: (
        <div className="relative w-full h-[200px] bg-gradient-to-br from-[#f6ad55] to-[#48bb78] overflow-hidden flex items-center justify-center p-8">
           <div className="relative w-full h-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl flex flex-col justify-end">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 bg-white rounded-full shadow-2xl flex items-center justify-center text-[#635bff] animate-pulse">
                <Play fill="currentColor" size={24} className="ml-1" />
              </div>
              <div className="space-y-2">
                 <div className="h-2 w-1/2 bg-white/40 rounded-full" />
                 <div className="h-6 w-3/4 bg-white/20 rounded shadow-inner" />
              </div>
           </div>
        </div>
      )
    },
    {
      title: "Share a link to a checkout page",
      desc: "Sell a product or subscription by sharing a link to a payment page.",
      buttonLabel: "Create a payment link",
      badge: "Set up in 1 minute",
      subBadge: "No code",
      image: (
        <div className="relative w-full h-[200px] bg-slate-50 overflow-hidden flex items-center justify-center p-8">
           <div className="flex h-full w-full gap-4">
              <div className="w-[60%] h-full bg-[#38a169]/10 rounded-xl border border-[#38a169]/20 p-4 space-y-4">
                 <div className="h-10 w-10 bg-[#38a169] rounded-lg" />
                 <div className="space-y-2">
                    <div className="h-1.5 w-full bg-[#38a169]/10 rounded-full" />
                    <div className="h-1.5 w-[60%] bg-[#38a169]/10 rounded-full" />
                 </div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                 <Card className="flex-1 bg-white rounded-xl shadow-xl p-4 flex flex-col justify-between border-slate-100">
                    <div className="space-y-1">
                       <span className="text-[10px] font-bold text-emerald-500">Payment link is active</span>
                       <div className="h-1 w-full bg-slate-50 rounded-full" />
                    </div>
                    <Button className="h-6 w-full text-[9px] bg-[#635bff] font-bold">Share</Button>
                 </Card>
              </div>
           </div>
        </div>
      )
    },
    {
      title: "Create subscriptions",
      desc: "Collect recurring payments with any pricing model, including flat rate, seat-based, tiered, and usage-based.",
      buttonLabel: "Create a subscription",
      badge: "Set up in 1 minute",
      subBadge: "No code",
      image: (
        <div className="relative w-full h-[200px] bg-slate-50 overflow-hidden flex items-center justify-center p-8">
           <Card className="w-full bg-white rounded-xl shadow-2xl p-6 space-y-6 border-slate-100 ring-2 ring-indigo-50">
              <div className="flex items-center gap-3">
                 <div className="h-8 w-8 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500"><TrendingUp size={16}/></div>
                 <div className="h-2 w-24 bg-slate-100 rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-4">
                    <div className="h-1.5 w-full bg-slate-50 rounded-full" />
                    <div className="h-1.5 w-[80%] bg-slate-50 rounded-full" />
                    <div className="h-1.5 w-[90%] bg-slate-50 rounded-full" />
                 </div>
                 <div className="bg-emerald-50 rounded-xl p-3 flex flex-col items-center justify-center gap-2 border border-emerald-100">
                    <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white"><Plus size={16}/></div>
                    <span className="text-[9px] font-bold text-emerald-700">SUB CREATED</span>
                 </div>
              </div>
           </Card>
        </div>
      )
    },
    {
      title: "Review your Billing plan",
      desc: "There are multiple ways to pay for Billing. Choose the plan that matches your business.",
      buttonLabel: "View plans",
      image: (
        <div className="relative w-full h-[200px] bg-slate-50 overflow-hidden flex items-center justify-center gap-6 p-8">
           <Card className="w-[45%] h-[80%] bg-white rounded-xl shadow-xl p-4 flex flex-col gap-4 border-slate-100 translate-y-2">
              <div className="h-8 w-8 bg-yellow-500 rounded-lg flex items-center justify-center text-white"><Layers size={20}/></div>
              <div className="space-y-3">
                 <div className="h-1.5 w-full bg-slate-50 rounded-full" />
                 <div className="h-1.5 w-[70%] bg-slate-50 rounded-full" />
              </div>
              <div className="mt-auto h-2 w-full bg-[#635bff] rounded-full opacity-20" />
           </Card>
           <Card className="w-[45%] h-[80%] bg-white rounded-xl shadow-xl p-4 flex flex-col gap-4 border-slate-100 -translate-y-2">
              <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white"><Settings2 size={20}/></div>
              <div className="space-y-3">
                 <div className="h-1.5 w-full bg-slate-50 rounded-full" />
                 <div className="h-1.5 w-[70%] bg-slate-50 rounded-full" />
              </div>
              <div className="mt-auto h-2 w-full bg-[#635bff] rounded-full opacity-60" />
           </Card>
        </div>
      )
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Billing overview</h1>

        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-[36px] font-bold text-[#1a1f36] leading-tight tracking-tight">
            Automate and manage recurring and one-off payments
          </h2>
          <p className="text-[#4f566b] text-[18px] font-medium leading-relaxed">
            A single tool for subscriptions, invoices, and churn management.
          </p>
        </div>

        {/* Grid of cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {cards.map((card) => (
             <div key={card.title} className="space-y-6">
                <div className="rounded-2xl overflow-hidden bg-slate-50 shadow-inner">
                   {card.image}
                </div>
                <div className="space-y-4 pr-12">
                   <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[16px] font-bold text-slate-900">{card.title}</h3>
                        {card.badge && (
                           <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-md text-[10px] font-bold">
                              <Clock size={10} strokeWidth={3}/>
                              <span>{card.badge}</span>
                           </div>
                        )}
                        {card.subBadge && (
                           <div className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold">
                              • {card.subBadge}
                           </div>
                        )}
                      </div>
                      <p className="text-[14px] text-slate-500 font-medium leading-relaxed font-bold">
                        {card.desc}
                      </p>
                   </div>
                   <Button variant="outline" className="h-9 px-4 font-bold border-slate-200 text-slate-700 hover:bg-slate-50 rounded-md shadow-sm transition-all text-[13px] leading-none">
                     {card.buttonLabel}
                   </Button>
                </div>
             </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
