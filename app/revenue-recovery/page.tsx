'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  RotateCcw, 
  Target, 
  Settings2, 
  ShieldCheck, 
  Activity,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Globe
} from 'lucide-react';
import { toast } from 'sonner';

export default function RevenueRecoveryPage() {
  const [isRecovering, setIsRecovering] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">Revenue_Recovery_Engine</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <RotateCcw size={14} className="text-purple-600" />
              Intelligent retry strategies for passive churn optimization
            </p>
          </div>
          <Button onClick={() => { setIsRecovering(true); setTimeout(() => { setIsRecovering(false); toast.success('Smart retry cycle deployed.'); }, 1500); }} className="h-12 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl px-8 font-black shadow-xl shadow-purple-600/20 uppercase tracking-tight">
            <Target size={18} className="mr-2" />
            Deploy Retry Logic
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: 'Recovery Rate', value: '18.5%', desc: '+4.2% from last cycle', icon: TrendingUp, color: 'text-green-500' },
             { label: 'Churn Prevented', value: '42 Active', desc: 'Enterprise accounts saved', icon: ShieldCheck, color: 'text-blue-500' },
             { label: 'Recovered Revenue', value: '$8,240', desc: 'Found in retry buckets', icon: Zap, color: 'text-purple-500' }
           ].map((s) => (
             <Card key={s.label} className="p-8 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[40px] shadow-sm relative overflow-hidden group">
                <div className="flex items-center justify-between mb-4">
                   <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 ${s.color}`}>
                      <s.icon size={24} />
                   </div>
                   <ArrowUpRight className="text-slate-200 group-hover:text-purple-600 transition-colors" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{s.label}</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{s.value}</h3>
                <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase italic">{s.desc}</p>
             </Card>
           ))}
        </div>

        <Card className="bg-slate-950 border-purple-600/20 rounded-[56px] p-12 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-600/10 to-transparent pointer-none" />
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-8">
                 <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">Smart_Dunning<br/><span className="text-purple-600">Protocol v4.0</span></h2>
                 <p className="text-xl text-slate-400 font-medium">Auto-sync with card bin databases and regional bank downtime calendars. We don&apos;t just retry; we wait for the perfect moment.</p>
                 <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Bin-logic retries', status: 'Active' },
                      { label: 'Value-based split', status: 'Active' },
                      { label: 'Region-aware nodes', status: 'Optimal' },
                      { label: 'Penalty avoidance', status: 'Active' }
                    ].map((it, i) => (
                      <div key={i} className="flex flex-col p-4 bg-slate-900 rounded-2xl border border-slate-800">
                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{it.label}</span>
                         <span className="text-xs font-black text-purple-600 uppercase mt-1 italic">{it.status}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-6">
                 <Card className="bg-white/5 border-0 rounded-[40px] p-8 backdrop-blur-xl">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-3"><Settings2 className="text-purple-600" /> Retry Strategy Control</h3>
                    <div className="space-y-6">
                       {['Card Bin Optimization', 'Ticket Size Weighting', 'Regional Time Optimization'].map((label, i) => (
                          <div key={i} className="space-y-3">
                             <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <span>{label}</span>
                                <span className="text-white">Aggressive</span>
                             </div>
                             <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-600" style={{ width: i === 0 ? '85%' : i === 1 ? '70%' : '92%' }} />
                             </div>
                          </div>
                       ))}
                    </div>
                    <Button className="h-14 w-full bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl mt-10 uppercase tracking-tighter shadow-2xl shadow-purple-600/30">Force Strategy Sync</Button>
                 </Card>
              </div>
           </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: 'Apple Pay Flow', success: '94%', icon: Globe },
             { label: 'Grapepay Pipeline', success: '82%', icon: CreditCard },
             { label: 'Checkout Wallet', success: '89%', icon: Activity },
             { label: 'Manual Retries', success: '0%', icon: Settings2 }
           ].map((p, i) => (
             <div key={i} className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-between group cursor-pointer hover:bg-white transition-all">
                <div className="flex items-center gap-4">
                   <p.icon size={20} className="text-slate-400 group-hover:text-purple-600 transition-colors" />
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.label}</p>
                      <p className="text-lg font-black text-slate-900 dark:text-white">{p.success}</p>
                   </div>
                </div>
                <ArrowUpRight size={18} className="text-slate-200" />
             </div>
           ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
