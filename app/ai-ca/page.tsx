'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Brain, Bot, Network, ShieldCheck, Zap } from 'lucide-react';

export default function AICApage() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500">
        <div className="flex items-center gap-3">
           <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">AI CA</h1>
           <div className="px-2 py-0.5 bg-indigo-50 text-[#635bff] border border-indigo-100 rounded text-[10px] font-black uppercase tracking-widest">
              Beta
           </div>
        </div>

        <Card className="bg-[#f7f9fc] border-none shadow-none rounded-[24px] overflow-hidden p-16 flex flex-col items-center text-center space-y-8 relative">
           <div className="h-20 w-20 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#635bff] animate-pulse">
              <Sparkles size={40} />
           </div>
           
           <div className="space-y-4 max-w-2xl">
              <h2 className="text-[48px] font-black text-[#1a1f36] leading-tight tracking-tight">Your Autonomous Intelligence Chartered Accountant</h2>
              <p className="text-[#4f566b] text-[20px] font-medium leading-[1.6]">
                 Experience the future of financial management. AI CA autonomously audits, reconciles, and optimizes your treasury with cryptographic precision.
              </p>
           </div>

           <div className="flex items-center gap-4">
              <Button className="h-12 px-8 bg-[#635bff] hover:bg-[#5851eb] text-white font-black rounded-lg shadow-xl shadow-indigo-200 transition-all hover:scale-105 active:scale-95">
                 Activate AI Auditor
              </Button>
              <Button variant="outline" className="h-12 px-8 font-bold border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg">
                 Learn how it works
              </Button>
           </div>

           {/* Floating decorative elements */}
           <div className="absolute top-10 left-10 opacity-20"><Brain size={48} className="text-[#635bff]" /></div>
           <div className="absolute bottom-20 right-20 opacity-20 rotate-12"><Network size={64} className="text-[#635bff]" /></div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
              { title: "Deterministic Auditing", desc: "Every transaction is mathematically verified against the ledger in real-time.", icon: ShieldCheck },
              { title: "Instant Reconciliation", desc: "Zero-latency settlements between crypto assets and fiat bank accounts.", icon: Zap },
              { title: "Autonomous Compliance", desc: "Automatically updates your accounting rules based on latest jurisdictional changes.", icon: Bot }
           ].map((feature) => (
              <Card key={feature.title} className="p-8 border border-slate-100 shadow-none rounded-2xl space-y-4 hover:shadow-lg transition-all cursor-pointer group">
                 <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-[#635bff] transition-colors">
                    <feature.icon size={24} />
                 </div>
                 <h3 className="text-[18px] font-black text-slate-900">{feature.title}</h3>
                 <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </Card>
           ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
