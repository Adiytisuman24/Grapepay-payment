'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Search,
  Zap,
  ChevronRight,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { toast } from 'sonner';

export default function SettlementsPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const settlements = [
    {
      id: 'STL-8829-PY',
      amount: 125000,
      currency: 'INR',
      status: 'completed',
      date: new Date(Date.now() - 86400000),
      transactions: 42,
      fees: 312.5,
      node: 'Mumbai-South-1'
    },
    {
      id: 'STL-8830-PY',
      amount: 89500,
      currency: 'INR',
      status: 'processing',
      date: new Date(Date.now() - 3600000),
      transactions: 28,
      fees: 223.75,
      node: 'Mumbai-South-1'
    },
    {
      id: 'STL-8831-PY',
      amount: 67200,
      currency: 'INR',
      status: 'completed',
      date: new Date(Date.now() - 172800000),
      transactions: 15,
      fees: 168,
      node: 'Bangalore-Central'
    }
  ];

  const handleManualSettlement = () => {
    toast.info('Initiating instant payout via Go High-Speed Engine...');
    setTimeout(() => {
      toast.success('Settlement request broadcasted to cluster. Expected ETA: 2 mins.');
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Financial Settlements</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-500" />
              Automated fiat payouts from crypto gateways
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-12 border-slate-200 dark:border-slate-800 rounded-2xl px-6 font-bold shadow-sm">
              <Download size={18} className="mr-2" />
              Export Tax Reports
            </Button>
            <Button onClick={handleManualSettlement} className="h-12 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl px-6 font-black shadow-xl shadow-purple-600/20 uppercase tracking-tight">
              <Plus size={18} className="mr-2" />
              Instant Settlement
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Settled', value: '₹2,81,700', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100/50' },
            { label: 'In Pipeline', value: '₹89,500', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100/50' },
            { label: 'Next Batch', value: '23:15:00', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-100/50' }
          ].map((card) => (
            <Card key={card.label} className="p-8 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[32px] shadow-sm hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${card.bg} ${card.color}`}>
                  <card.icon size={24} />
                </div>
                <Badge variant="secondary" className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest">Live Sync</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">{card.label}</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{card.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-slate-100 dark:border-slate-800 rounded-[32px] overflow-hidden shadow-2xl shadow-slate-200/50">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Payout History</h2>
            <div className="flex items-center gap-3">
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <input 
                  className="h-10 pl-10 pr-4 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold focus:ring-2 focus:ring-purple-600/20" 
                  placeholder="Search and Filter"
                 />
               </div>
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            {settlements.map((s) => (
              <div key={s.id} className="group flex items-center justify-between p-6 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[24px] hover:border-purple-600/50 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-purple-600 transition-colors">
                    <CreditCard size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">{s.id}</h4>
                      <Badge className={s.status === 'completed' ? 'bg-green-500/10 text-green-600' : 'bg-orange-500/10 text-orange-600 animate-pulse font-black'}>
                        {s.status}
                      </Badge>
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {s.transactions} TXNs • {s.date.toLocaleDateString()} • {s.node}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">₹{s.amount.toLocaleString()}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fees: ₹{s.fees}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-all">
                    <ChevronRight size={20} />
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
