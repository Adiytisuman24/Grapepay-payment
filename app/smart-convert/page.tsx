'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  RefreshCcw, 
  ShieldCheck, 
  Activity,
  ArrowUpRight,
  Route as RouteIcon,
  Globe,
  Loader2,
  CheckCircle2,
  Cpu,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function SmartConvertPage() {
  const [fromAmount, setFromAmount] = useState('1.5');
  const [fromCurrency, setFromCurrency] = useState('ETH');
  const [toCurrency, setToCurrency] = useState('INR');
  const [isConverting, setIsConverting] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const [currentRate, setCurrentRate] = useState(258420.45);

  const cryptos = [
    { value: 'BTC', label: 'Bitcoin', chain: 'Native' },
    { value: 'ETH', label: 'Ethereum', chain: 'Mainnet' },
    { value: 'USDT', label: 'Tether', chain: 'TRC20' },
    { value: 'SOL', label: 'Solana', chain: 'Mainnet' },
    { value: 'MATIC', label: 'Polygon', chain: 'PoS' },
  ];

  const fiats = [
    { value: 'INR', label: 'Indian Rupee' },
    { value: 'USD', label: 'US Dollar' },
    { value: 'EUR', label: 'Euro' },
    { value: 'AED', label: 'UAE Dirham' },
  ];

  useEffect(() => {
    setIsRouting(true);
    const timer = setTimeout(() => setIsRouting(false), 2000);
    return () => clearTimeout(timer);
  }, [fromAmount, fromCurrency, toCurrency]);

  const handleConvert = async () => {
    setIsConverting(true);
    toast.info('Broadcasting intent to high-speed Go clusters...');
    
    // Simulate complex multi-step processing
    setTimeout(() => toast.info('Python Risk Engine: APPROVED | No risk signature found.'), 1000);
    setTimeout(() => toast.info('Routing: 1inch + Uniswap v3 optimal path selected.'), 2000);
    
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    setIsConverting(false);
    toast.success(`Converted ${fromAmount} ${fromCurrency} successfully!`);
  };

  const estimatedOutput = (parseFloat(fromAmount || '0') * currentRate).toFixed(2);

  return (
    <DashboardLayout>
      <div className="space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">SMART_CONVERT_V2</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Zap size={14} className="text-purple-600 fill-purple-600" />
              Optimal multi-cluster liquidity routing
            </p>
          </div>
          <div className="flex gap-2">
             <Badge variant="secondary" className="px-4 py-2 bg-green-500/10 text-green-600 border-0 flex items-center gap-2 rounded-xl">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
               <span className="font-black uppercase tracking-tighter text-[10px]">Real-time Oracle Active</span>
             </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          <Card className="xl:col-span-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl border-slate-100 dark:border-slate-800 rounded-[48px] overflow-hidden shadow-2xl shadow-slate-200/50">
            <div className="p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Inbound Amount</label>
                    <span className="text-[10px] font-bold text-slate-300">Wallet Balance: 12.42 {fromCurrency}</span>
                  </div>
                  <div className="relative group">
                    <Input
                      type="number"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="h-24 text-4xl font-black rounded-3xl bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 focus:ring-8 focus:ring-purple-600/5 transition-all pl-8 pr-32"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                       <Select value={fromCurrency} onValueChange={setFromCurrency}>
                        <SelectTrigger className="h-14 border-0 bg-white dark:bg-slate-900 shadow-xl rounded-2xl px-4 font-black text-lg gap-2">
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
                          {cryptos.map((c) => (
                            <SelectItem key={c.value} value={c.value} className="font-black italic uppercase tracking-tighter py-3">{c.label}</SelectItem>
                          ))}
                        </SelectContent>
                       </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center justify-between px-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Outbound Estimate</label>
                    {isRouting && <span className="text-[10px] font-bold text-purple-600 flex items-center gap-1 animate-pulse"><Loader2 size={10} className="animate-spin" /> Calculating Route...</span>}
                  </div>
                  <div className="relative group">
                    <Input
                      value={estimatedOutput}
                      readOnly
                      className="h-24 text-4xl font-black rounded-3xl bg-purple-500/5 border-purple-100 dark:border-purple-900/30 text-purple-600 pl-8 pr-32 cursor-default"
                    />
                     <div className="absolute right-4 top-1/2 -translate-y-1/2">
                       <Select value={toCurrency} onValueChange={setToCurrency}>
                        <SelectTrigger className="h-14 border-0 bg-white dark:bg-slate-900 shadow-xl rounded-2xl px-4 font-black text-lg gap-2">
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
                          {fiats.map((f) => (
                            <SelectItem key={f.value} value={f.value} className="font-black italic uppercase tracking-tighter py-3">{f.label}</SelectItem>
                          ))}
                        </SelectContent>
                       </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 p-8 bg-slate-50 dark:bg-slate-950 rounded-[32px] border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
                 {isRouting && <div className="absolute bottom-0 left-0 h-1 bg-purple-600 animate-in slide-in-from-left duration-1000 fill-mode-both" style={{ width: '100%' }} />}
                 <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-purple-600 shadow-sm">
                    <RouteIcon size={24} />
                 </div>
                 <div className="flex-1">
                    <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Multi-Cluster Routing Engine</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Path: <span className="text-purple-600">Uniswap v3 (0x...A2)</span> ❯ <span className="text-purple-600">GrapePay Node (SG)</span> ❯ <span className="text-purple-600">Razorpay Payout</span></p>
                 </div>
                 <Badge className="bg-green-500/10 text-green-600 font-black border-0">SAVE 1.2%</Badge>
              </div>

              <Button 
                onClick={handleConvert}
                disabled={isConverting}
                className="w-full h-24 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-size-200 animate-gradient hover:shadow-2xl hover:shadow-purple-600/30 text-white rounded-[32px] font-black text-2xl uppercase tracking-tighter group transition-all"
              >
                {isConverting ? (
                  <div className="flex items-center gap-4">
                    <Loader2 size={32} className="animate-spin" />
                    EXECUTING SMART CONVERSION...
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    INITIATE INSTANT CONVERSION
                    <CheckCircle2 size={32} className="group-hover:scale-110 transition-transform" />
                  </div>
                )}
              </Button>

               <div className="flex items-center justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                 <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-green-500" /> Insured by Multi-Cluster</span>
                 <span className="flex items-center gap-2"><Globe size={14} className="text-blue-500" /> Zero Gas Fees (Smart Route)</span>
                 <span className="flex items-center gap-2"><Cpu size={14} className="text-purple-500" /> Go High-Speed Engine</span>
               </div>
            </div>
          </Card>

          <div className="xl:col-span-2 space-y-8">
             <Card className="p-8 bg-slate-950 border-slate-800 rounded-[40px] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8">
                  <Activity size={48} className="text-purple-600/20 group-hover:text-purple-600/40 transition-colors" />
               </div>
               <h3 className="text-xl font-black text-white mb-8 tracking-tighter italic">MARKET_SYNOPSIS</h3>
               <div className="space-y-6">
                 {[
                   { label: 'Current Exchange Rate', value: `1 ${fromCurrency} = ₹${currentRate.toLocaleString()}`, change: '+1.24%', trend: 'up' },
                   { label: 'Gateway Fee (0.2%)', value: `₹${(parseFloat(estimatedOutput) * 0.002).toFixed(2)}`, color: 'text-slate-400' },
                   { label: 'Cluster Settlement Time', value: '< 2.4 minutes', color: 'text-green-500' }
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                      <div className="flex items-center justify-between">
                        <span className={`text-xl font-black ${item.color || 'text-white'} tracking-tighter`}>{item.value}</span>
                        {item.change && <span className="text-xs font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">{item.change}</span>}
                      </div>
                   </div>
                 ))}
                 <div className="pt-6 border-t border-slate-800">
                    <div className="flex justify-between items-end">
                       <span className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Live Order Depth</span>
                       <div className="flex gap-1 h-8 items-end">
                          {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-1.5 bg-purple-600/40 rounded-t-sm" style={{ height: `${Math.random() * 100}%` }} />
                          ))}
                       </div>
                    </div>
                 </div>
               </div>
             </Card>

             <Card className="p-8 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[40px] shadow-sm">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Recent Intelligence</h3>
                <div className="space-y-4">
                  {[
                    { pair: 'BTC/INR', amt: '0.42 BTC', time: '14s ago', color: 'bg-orange-500' },
                    { pair: 'ETH/USD', amt: '2.5 ETH', time: '1m ago', color: 'bg-blue-500' },
                    { pair: 'SOL/INR', amt: '150 SOL', time: '3m ago', color: 'bg-purple-500' }
                  ].map((it, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-purple-600/30 transition-all cursor-pointer">
                       <div className="flex items-center gap-3">
                         <div className={`w-8 h-8 ${it.color} rounded-lg flex items-center justify-center text-white text-[10px] font-black`}>GP</div>
                         <div>
                            <p className="text-xs font-black text-slate-900 dark:text-white leading-none">{it.pair}</p>
                            <p className="text-[9px] font-bold text-slate-400">{it.amt}</p>
                         </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{it.time}</p>
                          <ChevronRight size={14} className="text-slate-200 group-hover:text-purple-600 transition-colors ml-auto mt-1" />
                       </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-6 text-xs font-black text-slate-400 uppercase hover:text-purple-600 transition-colors">View All Activity</Button>
             </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
