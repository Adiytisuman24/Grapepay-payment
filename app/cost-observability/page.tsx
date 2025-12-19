'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Search, 
  TrendingDown, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCcw,
  LayoutDashboard,
  PieChart as PieIcon,
  ArrowDownIcon,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

export default function CostObservabilityPage() {
  const [isSyncing, setIsSyncing] = useState(false);

  const stats = [
    { label: 'Audit Score', value: '98/100', status: 'Optimal', color: 'text-green-500' },
    { label: 'Observe Coverage', value: '100%', status: 'Full', color: 'text-blue-500' },
    { label: 'Optimize Rate', value: '95%', status: 'Efficient', color: 'text-purple-500' },
    { label: 'Est. Savings', value: '$12.4K', status: 'Last 30D', color: 'text-emerald-500' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">COST_OBSERVABILITY_LAB</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <BarChart3 size={14} className="text-purple-600" />
              Advanced audit & payment cost optimization engine
            </p>
          </div>
          <Button onClick={() => { setIsSyncing(true); setTimeout(() => { setIsSyncing(false); toast.success('Cost audit complete.'); }, 1500); }} className="h-12 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl px-8 font-black shadow-xl shadow-purple-600/20 uppercase tracking-tight">
            <RefreshCcw size={18} className={`mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            Run Global Audit
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <Card key={s.label} className="p-8 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[32px] shadow-sm hover:shadow-xl transition-all">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
               <h3 className={`text-3xl font-black ${s.color} tracking-tighter`}>{s.value}</h3>
               <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-black border-0 mt-4 text-[9px] uppercase tracking-widest">{s.status}</Badge>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <Card className="bg-slate-950 p-10 rounded-[48px] border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 h-full flex flex-col justify-end opacity-5">
                 <LayoutDashboard size={140} className="rotate-12" />
              </div>
              <div className="relative z-10 space-y-6">
                 <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Anomaly_Detector</h2>
                 <p className="text-slate-400 font-medium">Our Python analyzer has identified 2 hidden fee downgrades in your Grapepay processing cluster. Estimated impact: $420/mo.</p>
                 <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center gap-4">
                    <AlertTriangle className="text-red-500" />
                    <div>
                       <p className="text-sm font-black text-white uppercase tracking-tight">Tier 2 Penalty Alert</p>
                       <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Region: Asia Pacific | Cluster: AX-92</p>
                    </div>
                 </div>
                 <Button className="h-14 w-full bg-white text-slate-900 font-black rounded-2xl uppercase tracking-tighter">Initiate Remediation Flow</Button>
              </div>
           </Card>

           <Card className="bg-white dark:bg-slate-900 p-10 rounded-[48px] border-slate-100 dark:border-slate-800 relative overflow-hidden shadow-2xl shadow-slate-200/50">
              <div className="space-y-8">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Liquidity Optimization</h3>
                    <TrendingDown className="text-green-500" />
                 </div>
                 <div className="space-y-4">
                    {[
                      { channel: 'Interchange++ Pass-thru', status: 'Optimal', pct: 92 },
                      { channel: 'Cross-border Fee reduction', status: 'Action Needed', pct: 45 },
                      { channel: 'Scheme Fee Audit', status: 'Optimal', pct: 88 }
                    ].map((row, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           <span>{row.channel}</span>
                           <span className={row.pct > 80 ? 'text-green-500' : 'text-orange-500'}>{row.pct}% Confidence</span>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                           <div className={`h-full ${row.pct > 80 ? 'bg-green-500' : 'bg-orange-500'} transition-all`} style={{ width: `${row.pct}%` }} />
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
           </Card>
        </div>

        <Card className="p-12 bg-purple-600 rounded-[56px] text-white relative overflow-hidden shadow-2xl shadow-purple-600/20 group">
           <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-transparent opacity-50" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="space-y-4 max-w-xl">
                 <h2 className="text-4xl font-black tracking-tighter italic">Ready to Audit Your Processing?</h2>
                 <p className="text-lg font-medium opacity-90">Unlock hidden alpha in your payment stack. Our Cost Observability module integrates with 50+ PSPs to provide a unified cost ledger.</p>
              </div>
              <Button className="h-16 px-12 bg-white text-purple-600 hover:bg-slate-50 rounded-[28px] font-black text-xl uppercase tracking-tighter shadow-2xl group transition-all">
                 <Zap size={24} className="mr-3 group-hover:scale-125 transition-transform" />
                 Start free trial
              </Button>
           </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
