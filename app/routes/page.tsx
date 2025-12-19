'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Route as RouteIcon, 
  ArrowRight, 
  Settings2, 
  Play, 
  Pause, 
  Zap, 
  Cpu, 
  Layers, 
  ShieldCheck,
  ChevronRight,
  Database,
  Search,
  MoreVertical
} from 'lucide-react';
import { toast } from 'sonner';

export default function RoutesPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const routes = [
    {
      id: 'RT-7712',
      name: 'Main Liquidity Bridge (ETH/INR)',
      from: 'ETH',
      to: 'INR',
      chain: 'Ethereum',
      status: 'active',
      executions: 1240,
      volume: '$1.2M',
      node: 'Mumbai-South',
      dex: 'Uniswap v3'
    },
    {
      id: 'RT-7713',
      name: 'Stable Swap (USDC/USD)',
      from: 'USDC',
      to: 'USD',
      chain: 'Polygon',
      status: 'active',
      executions: 8420,
      volume: '$2.8M',
      node: 'Singapore-East',
      dex: '0x Protocol'
    },
    {
      id: 'RT-7711',
      name: 'Legacy Payout (BTC/EUR)',
      from: 'BTC',
      to: 'EUR',
      chain: 'Bitcoin',
      status: 'paused',
      executions: 450,
      volume: '$890K',
      node: 'Frankfurt-Main',
      dex: 'GrapePay Native'
    }
  ];

  const handleToggleRoute = (id: string, current: string) => {
    const action = current === 'active' ? 'Pausing' : 'Resuming';
    toast.info(`${action} route ${id} across all clusters...`);
    setTimeout(() => {
      toast.success(`Route ${id} is now ${current === 'active' ? 'offline' : 'online'}.`);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">System Routing</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Cpu size={14} className="text-purple-600" />
              Autonomous conversion pipelines
            </p>
          </div>
          <div className="flex items-center gap-3">
             <Dialog>
              <DialogTrigger asChild>
                <Button className="h-12 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl px-6 font-black shadow-xl shadow-purple-600/20 uppercase tracking-tight">
                  <Plus size={18} className="mr-2" />
                  Define New Route
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 rounded-[32px] p-8">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Route Configuration</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Route Descriptor</label>
                    <Input placeholder="e.g. Asia Liquidity Pipeline" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-end">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Inbound</label>
                      <Select>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"><SelectValue placeholder="Token" /></SelectTrigger>
                        <SelectContent><SelectItem value="ETH">ETH</SelectItem><SelectItem value="SOL">SOL</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-center pb-3"><ArrowRight className="text-slate-300" /></div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Outbound</label>
                      <Select>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"><SelectValue placeholder="Fiat" /></SelectTrigger>
                        <SelectContent><SelectItem value="INR">INR</SelectItem><SelectItem value="USD">USD</SelectItem></SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Cluster / Chain</label>
                      <Select>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"><SelectValue placeholder="Node" /></SelectTrigger>
                        <SelectContent><SelectItem value="1">Ethereum Cluster</SelectItem><SelectItem value="2">Polygon Pro Cluster</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Native DEX Agent</label>
                      <Select>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"><SelectValue placeholder="DEX" /></SelectTrigger>
                        <SelectContent><SelectItem value="1">Uniswap v3 (Smart)</SelectItem><SelectItem value="2">1inch Liquidity</SelectItem></SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full h-14 bg-purple-600 hover:bg-purple-500 font-black text-lg rounded-2xl shadow-xl shadow-purple-600/20" onClick={() => toast.success('Route deployed to global clusters.')}>
                    AUTHENTICATE & DEPLOY
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Routes', count: 12, color: 'text-purple-600', icon: Layers, bg: 'bg-purple-100/50' },
            { label: 'Active Pipelines', count: 8, color: 'text-green-600', icon: Play, bg: 'bg-green-100/50' },
            { label: 'Cluster Execs', count: '14.5K', color: 'text-blue-600', icon: Database, bg: 'bg-blue-100/50' },
            { label: 'Safety Checks', count: '100%', color: 'text-emerald-600', icon: ShieldCheck, bg: 'bg-emerald-100/50' }
          ].map((stat) => (
            <Card key={stat.label} className="p-8 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[32px] shadow-sm hover:shadow-xl transition-all">
               <div className="flex items-center justify-between mb-4">
                 <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                   <stat.icon size={24} />
                 </div>
                 <Badge variant="secondary" className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest">LIVE</Badge>
               </div>
               <div className="space-y-1">
                 <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.count}</p>
               </div>
            </Card>
          ))}
        </div>

        <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-slate-100 dark:border-slate-800 rounded-[32px] overflow-hidden shadow-2xl shadow-slate-200/50">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Functional Clusters</h2>
            <div className="relative flex-1 max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
              <input className="w-full h-12 pl-12 pr-4 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-purple-600/10 transition-all" placeholder="Search by node or descriptor..." />
            </div>
          </div>

          <div className="p-4 space-y-4">
            {routes.map((rt) => (
              <div key={rt.id} className="group flex items-center justify-between p-6 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[28px] hover:border-purple-600/50 hover:shadow-xl transition-all">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-purple-600 transition-colors">
                    <RouteIcon size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-1">
                      <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{rt.name}</h4>
                      <Badge className={
                        rt.status === 'active' ? 'bg-green-500/10 text-green-600 flex items-center gap-1.5' :
                        'bg-orange-500/10 text-orange-600 font-black'
                      }>
                        <div className={`w-1.5 h-1.5 rounded-full ${rt.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`} />
                        {rt.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                       <span className="flex items-center gap-1 text-slate-900 dark:text-white">{rt.from} <ArrowRight size={10} /> {rt.to}</span>
                       <span>• {rt.chain}</span>
                       <span>• {rt.dex}</span>
                       <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[10px] font-black">{rt.node}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{rt.volume}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{rt.executions} Executions</p>
                  </div>
                  <div className="flex items-center gap-2">
                     <Button variant="ghost" size="icon" onClick={() => handleToggleRoute(rt.id, rt.status)} className="h-12 w-12 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-all">
                        {rt.status === 'active' ? <Pause size={20} /> : <Play size={20} />}
                     </Button>
                     <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-all">
                        <Settings2 size={20} />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-slate-900 transition-all">
                        <MoreVertical size={20} />
                     </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
