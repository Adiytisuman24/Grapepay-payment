'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  ArrowRight, 
  Settings2, 
  ShieldCheck, 
  Database,
  RefreshCcw,
  Target,
  ArrowUpRight,
  Route,
  Activity,
  Server
} from 'lucide-react';
import { toast } from 'sonner';

export default function IntelligentRoutingPage() {
  const [isUpdating, setIsUpdating] = useState(false);

  const psps = [
    { name: 'Grapepay_Global', auth: '99.4%', status: 'Active', latency: '12ms', primary: true },
    { name: 'Adyen_Prime', auth: '98.8%', status: 'Standby', latency: '18ms', primary: false },
    { name: 'Checkout_OS', auth: '97.2%', status: 'Active', latency: '24ms', primary: false },
    { name: 'Razorpay_Pro', auth: '99.1%', status: 'Primary_IN', latency: '8ms', primary: true }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">INTELLIGENT_ROUTING_HUB</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Route size={14} className="text-purple-600" />
              Dynamic PSP selection to maximize Authorization Rates (FAAR)
            </p>
          </div>
          <Button onClick={() => { setIsUpdating(true); setTimeout(() => { setIsUpdating(false); toast.success('Routing mesh re-optimized.'); }, 1500); }} className="h-12 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl px-8 font-black shadow-xl shadow-purple-600/20 uppercase tracking-tight">
            <RefreshCcw size={18} className={`mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
            Optimize Mesh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Avg FAAR', value: '99.2%', trend: '+1.4%', icon: Target, color: 'text-green-500' },
             { label: 'Active PSPs', value: '8 Nodes', trend: 'Global', icon: Server, color: 'text-blue-500' },
             { label: 'Latency', value: '24ms', trend: '-12ms', icon: Activity, color: 'text-purple-500' },
             { label: 'Retries Avoided', value: '1.2K', trend: 'Today', icon: Zap, color: 'text-orange-500' }
           ].map((s) => (
             <Card key={s.label} className="p-8 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[40px] shadow-sm hover:shadow-xl transition-all">
                <div className="flex justify-between items-start mb-4">
                   <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 ${s.color}`}>
                      <s.icon size={24} />
                   </div>
                   <Badge className="bg-slate-50 text-slate-400 font-black border-0 text-[10px] uppercase">{s.trend}</Badge>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{s.label}</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{s.value}</h3>
             </Card>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <Card className="bg-slate-950 p-10 rounded-[48px] border-slate-800 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-12 h-full flex flex-col justify-end opacity-5">
                 <Route size={200} className="rotate-12" />
              </div>
              <div className="relative z-10 space-y-10">
                 <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Routing_Rules_Engine</h2>
                 <div className="space-y-4">
                    {[
                      { cond: 'Region == "IN"', action: 'Route -> Razorpay_Pro', active: true },
                      { cond: 'Value > $5000', action: 'Route -> Grapepay_Global (3DS Required)', active: true },
                      { cond: 'Issuer == "JPM"', action: 'Route -> Checkout_OS', active: false },
                      { cond: 'Asset == "ETH"', action: 'Route -> GrapePay_Meta_Node', active: true }
                    ].map((rule, i) => (
                      <div key={i} className={`p-5 rounded-3xl border ${rule.active ? 'bg-purple-600/10 border-purple-600/20' : 'bg-slate-900 border-slate-800 opacity-50'} flex items-center justify-between`}>
                         <div className="flex items-center gap-4">
                            <div className={`h-1.5 w-1.5 rounded-full ${rule.active ? 'bg-purple-600' : 'bg-slate-600'}`} />
                            <div className="flex flex-col">
                               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Condition</span>
                               <span className="text-sm font-black text-white">{rule.cond}</span>
                            </div>
                         </div>
                         <ArrowRight size={18} className="text-slate-700" />
                         <div className="flex flex-col text-right">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Execution</span>
                            <span className="text-sm font-black text-purple-400 italic">{rule.action}</span>
                         </div>
                      </div>
                    ))}
                 </div>
                 <Button className="h-14 w-full bg-white text-slate-900 font-black rounded-2xl uppercase tracking-tighter">Add Custom Routing Node</Button>
              </div>
           </Card>

           <Card className="bg-white dark:bg-slate-900 p-10 rounded-[48px] border-slate-100 dark:border-slate-800 relative overflow-hidden shadow-sm">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8 flex items-center gap-3">
                 <Settings2 className="text-purple-600" /> Live Cluster Performance
              </h3>
              <div className="space-y-4">
                 {psps.map((p, i) => (
                   <div key={i} className="group p-6 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[32px] hover:border-purple-600/30 transition-all flex items-center justify-between">
                      <div className="flex items-center gap-5">
                         <div className={`h-12 w-12 rounded-2xl ${p.primary ? 'bg-purple-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-400'} flex items-center justify-center shadow-lg`}>
                            <Activity size={24} />
                         </div>
                         <div>
                            <div className="flex items-center gap-2">
                               <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">{p.name}</h4>
                               {p.primary && <Badge className="bg-purple-100 text-purple-600 border-0 font-black text-[9px] uppercase">Primary</Badge>}
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Latency: {p.latency} • Last Status: 200 OK</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-xl font-black text-green-500">{p.auth}</p>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Auth Rate</p>
                      </div>
                   </div>
                 ))}
              </div>
           </Card>
        </div>

        <Card className="p-12 bg-slate-900 border-0 rounded-[56px] text-white relative overflow-hidden group shadow-2xl">
           <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent pointer-none" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-6 max-w-2xl">
                 <h2 className="text-5xl font-black tracking-tighter leading-tight italic uppercase">Prevent_Gateway_Downtime</h2>
                 <p className="text-xl text-slate-400 font-medium leading-relaxed">Our Go engine automatically fails over to secondary PSPs within 8ms of detecting a latency spike. Never miss a conversion due to processor issues.</p>
                 <div className="flex gap-4">
                    <Badge className="bg-green-500/10 text-green-500 border-0 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest">99.99% Guaranteed FAAR</Badge>
                 </div>
              </div>
              <Button className="h-16 px-12 bg-white text-slate-900 hover:bg-slate-100 rounded-[28px] font-black text-xl uppercase tracking-tighter shadow-2xl group transition-all shrink-0">
                 Explore Smart Failover
              </Button>
           </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
