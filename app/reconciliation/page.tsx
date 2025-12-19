'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart2, 
  FileText, 
  Search, 
  RefreshCcw, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  Download, 
  Calendar,
  Database,
  Link,
  Zap,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

export default function ReconciliationPage() {
  const [isReconciling, setIsReconciling] = useState(false);

  const entries = [
    { id: 'REC_881', date: 'Dec 18, 2025', processor: 'Grapepay', bank: 'HSBC_UK', status: 'Matched', amount: '$42,800.00', variance: '$0.00' },
    { id: 'REC_880', date: 'Dec 17, 2025', processor: 'Adyen', bank: 'JPM_Chase', status: 'Matched', amount: '$18,450.50', variance: '$0.00' },
    { id: 'REC_879', date: 'Dec 16, 2025', processor: 'PayPal', bank: 'StandardCharter', status: 'Pending', amount: '$1,200.00', variance: '$12.00' },
    { id: 'REC_878', date: 'Dec 15, 2025', processor: 'Grapepay', bank: 'HSBC_UK', status: 'Matched', amount: '$31,200.00', variance: '$0.00' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">RECONCILIATION_VAULT</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <FileText size={14} className="text-purple-600" />
              Unified 3-way automated matching for processors & banks
            </p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="h-12 border-slate-200 dark:border-slate-800 rounded-2xl px-6 font-bold gap-2">
                <Calendar size={18} /> Cycle History
             </Button>
             <Button onClick={() => { setIsReconciling(true); setTimeout(() => { setIsReconciling(false); toast.success('Reconciliation sequence complete. 98% matched.'); }, 2000); }} className="h-12 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl px-8 font-black shadow-xl shadow-purple-600/20 uppercase tracking-tight">
               <RefreshCcw size={18} className={`mr-2 ${isReconciling ? 'animate-spin' : ''}`} />
               Start Auto-Recon
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Recon Status', value: 'MATCHED', icon: CheckCircle2, color: 'text-emerald-500' },
             { label: 'Variance', value: '$0.00', icon: AlertCircle, color: 'text-slate-400' },
             { label: 'Auto-Fetch', value: 'ACTIVE', icon: Zap, color: 'text-purple-500' },
             { label: 'Next Cycle', value: '04:00h', icon: Clock, color: 'text-blue-500' }
           ].map((s) => (
             <Card key={s.label} className="p-8 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[32px] shadow-sm hover:shadow-xl transition-all">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                <div className="flex items-center gap-3">
                   <h3 className={`text-3xl font-black ${s.color} tracking-tighter`}>{s.value}</h3>
                   <s.icon size={20} className={s.color} />
                </div>
             </Card>
           ))}
        </div>

        <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-slate-100 dark:border-slate-800 rounded-[48px] overflow-hidden shadow-2xl shadow-slate-200/50">
           <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">Matched_Ledger_Entries</h3>
              <div className="relative group min-w-[300px]">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
                 <input placeholder="Search cycles, banks, or amounts..." className="w-full h-12 pl-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold uppercase tracking-widest outline-none focus:ring-4 focus:ring-purple-600/10 transition-all" />
              </div>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full">
                 <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                       <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Cycle ID</th>
                       <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Routing Path</th>
                       <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Ledger Amount</th>
                       <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Integrity Status</th>
                       <th className="px-10 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Variance</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {entries.map((item) => (
                      <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer">
                         <td className="px-10 py-8">
                            <div className="flex flex-col">
                               <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{item.id}</span>
                               <span className="text-[10px] font-bold text-slate-400 uppercase italic mt-1">{item.date}</span>
                            </div>
                         </td>
                         <td className="px-10 py-8">
                            <div className="flex items-center gap-3">
                               <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-black border-0 text-[9px] uppercase tracking-widest">{item.processor}</Badge>
                               <Link size={12} className="text-slate-300" />
                               <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-black border-0 text-[9px] uppercase tracking-widest">{item.bank}</Badge>
                            </div>
                         </td>
                         <td className="px-10 py-8">
                            <span className="text-lg font-black text-slate-900 dark:text-white">{item.amount}</span>
                         </td>
                         <td className="px-10 py-8">
                            <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${item.status === 'Matched' ? 'text-green-500' : 'text-orange-500'}`}>
                               <div className={`h-1.5 w-1.5 rounded-full ${item.status === 'Matched' ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`} />
                               {item.status}
                            </div>
                         </td>
                         <td className="px-10 py-8 text-right">
                            <span className={`text-sm font-black ${item.variance === '$0.00' ? 'text-slate-400' : 'text-red-500'}`}>{item.variance}</span>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <Card className="p-10 bg-slate-950 border-slate-800 rounded-[48px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5"><Database size={160} className="rotate-12" /></div>
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-6">Autonomous_Fetching</h2>
              <p className="text-slate-400 font-medium leading-relaxed mb-8">GrapePay connects directly to banking APIs (HSBC, JPM, Barclays) and processing nodes to ingest statement data every 15 minutes. Manual Excel uploads are officially a thing of the past.</p>
              <div className="flex gap-4">
                 {['API_AUTH: OK', 'TOKEN_SYNC: OK', 'BANK_MESH: ACTIVE'].map(t => (
                   <span key={t} className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">{t}</span>
                 ))}
              </div>
           </Card>

           <Card className="p-10 bg-purple-600 rounded-[48px] text-white relative overflow-hidden group shadow-2xl shadow-purple-600/20">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                 <div className="space-y-4">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter italic">Export Master Evidence</h2>
                    <p className="font-medium opacity-90 max-w-sm">Generate cryptographic proof of reconciliation for auditors and compliance teams.</p>
                 </div>
                 <Button className="h-16 w-full bg-white text-purple-600 hover:bg-slate-50 font-black rounded-2xl mt-12 uppercase tracking-tighter flex items-center justify-center gap-3">
                    <Download size={24} />
                    Download Ledger.PDF
                 </Button>
              </div>
           </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
