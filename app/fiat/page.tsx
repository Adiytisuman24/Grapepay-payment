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
  Wallet, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  Building, 
  ShieldCheck, 
  History, 
  Globe,
  MoreVertical,
  Banknote,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

export default function FiatPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const fiatBalances = [
    { currency: 'INR', symbol: '₹', balance: 428000.50, usdValue: 5120, trend: '+4.2%' },
    { currency: 'USD', symbol: '$', balance: 12500.00, usdValue: 12500, trend: '+1.8%' },
    { currency: 'EUR', symbol: '€', balance: 2100.00, usdValue: 2280, trend: '-0.5%' },
    { currency: 'GBP', symbol: '£', balance: 850.00, usdValue: 1080, trend: '+1.1%' },
  ];

  const bankAccounts = [
    { id: '1', bankName: 'HDFC Bank', accountNumber: '****4421', currency: 'INR', verified: true },
    { id: '2', bankName: 'Chase Manhattan', accountNumber: '****8810', currency: 'USD', verified: true }
  ];

  const handleWithdraw = () => {
    setIsProcessing(true);
    toast.info('Verifying withdrawal signature with Python Risk Engine...');
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Withdrawal batch sent to Banking Cluster. Arrival in 4-6 hours.');
    }, 2500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Fiat Treasury</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Banknote size={14} className="text-green-500" />
              Multi-currency liquidity management
            </p>
          </div>
          <div className="flex items-center gap-3">
             <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-12 border-slate-200 dark:border-slate-800 rounded-2xl px-6 font-bold shadow-sm">
                  <Plus size={18} className="mr-2" />
                  Link New Account
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 rounded-[32px] p-8">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Add Bank Account</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Holder</label>
                    <Input placeholder="Full Name per Records" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Institution</label>
                    <Input placeholder="e.g. HDFC, Chase, HSBC" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account #</label>
                        <Input placeholder="XXX-XXX-XXX" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Routing / IFSC</label>
                        <Input placeholder="ABCD1234567" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
                     </div>
                  </div>
                  <Button className="w-full h-14 bg-purple-600 hover:bg-purple-500 font-black text-lg rounded-2xl shadow-xl shadow-purple-600/20 uppercase tracking-tight" onClick={() => toast.success('Account sent for KYC validation.')}>
                    Link Account
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={handleWithdraw} disabled={isProcessing} className="h-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl px-8 font-black shadow-xl shadow-slate-900/10 uppercase tracking-tight">
              {isProcessing ? <RefreshCcw size={18} className="animate-spin mr-2" /> : <ArrowUpRight size={18} className="mr-2" />}
              Direct Payout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fiatBalances.map((balance) => (
            <Card key={balance.currency} className="p-8 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[32px] shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4">
                  <div className={`text-[10px] font-black ${balance.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'} bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg`}>
                    {balance.trend}
                  </div>
               </div>
               <div className="flex items-center justify-between mb-6">
                  <div className="h-14 w-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-green-500 transition-colors">
                    <Wallet size={28} />
                  </div>
                  <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black px-4 py-1.5 rounded-xl border-0 uppercase tracking-widest">{balance.currency}</Badge>
               </div>
               <div className="space-y-1">
                  <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                    {balance.symbol}{balance.balance.toLocaleString()}
                  </p>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    ≈ ${balance.usdValue.toLocaleString()} USD
                  </p>
               </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-slate-100 dark:border-slate-800 rounded-[32px] overflow-hidden shadow-2xl shadow-slate-200/50">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <Building size={24} className="text-purple-600" />
                 <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Linked Nodes</h2>
              </div>
              <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400"><Plus size={20} /></Button>
            </div>
            <div className="p-6 space-y-4">
              {bankAccounts.map((account) => (
                <div key={account.id} className="group flex items-center justify-between p-5 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[28px] hover:border-purple-600/50 transition-all cursor-pointer">
                   <div className="flex items-center gap-5">
                      <div className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-purple-600 transition-colors">
                        <CreditCard size={24} />
                      </div>
                      <div>
                        <p className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">{account.bankName}</p>
                        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{account.accountNumber} • {account.currency}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      {account.verified && <Badge className="bg-green-500/10 text-green-600 font-black border-0 gap-1.5"><CheckCircle2 size={12} /> VERIFIED</Badge>}
                      <MoreVertical size={18} className="text-slate-300" />
                   </div>
                </div>
              ))}
              <div className="p-6 bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[28px] flex flex-col items-center justify-center gap-4 text-center cursor-pointer hover:border-purple-600/50 transition-all">
                 <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400"><Plus size={24} /></div>
                 <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Link another institution</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Connect 10,000+ banks globally via Plaid/Salt</p>
                 </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-slate-100 dark:border-slate-800 rounded-[32px] overflow-hidden shadow-2xl shadow-slate-200/50">
             <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <History size={24} className="text-blue-600" />
                 <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">System Ledger</h2>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="h-10 w-32 border-slate-100 dark:border-slate-800 text-xs font-black uppercase tracking-widest"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">Global</SelectItem><SelectItem value="inr">INR Only</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="p-6 space-y-4">
              {[
                { type: 'DEPOSIT', amt: '+ ₹12,000.00', status: 'COMPLETE', time: '2h ago', icon: ArrowDownLeft, color: 'text-green-500' },
                { type: 'WITHDRAWAL', amt: '- $1,250.00', status: 'PROCESSING', time: '5h ago', icon: ArrowUpRight, color: 'text-orange-500' },
                { type: 'CONVERSION', amt: '+ ₹89,420.00', status: 'COMPLETE', time: '1d ago', icon: Zap, color: 'text-purple-500' },
                { type: 'WITHDRAWAL', amt: '- €250.00', status: 'COMPLETE', time: '2d ago', icon: ArrowUpRight, color: 'text-green-500' }
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[24px] group hover:border-blue-600/30 transition-all cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className={`h-11 w-11 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center ${tx.color} group-hover:scale-110 transition-transform`}>
                        <tx.icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">{tx.type}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{tx.time} • CLUSTER_SGP_04</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className={`text-lg font-black tracking-tighter ${tx.color} leading-none`}>{tx.amt}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{tx.status}</p>
                   </div>
                </div>
              ))}
            </div>
            <div className="p-8 border-t border-slate-100 dark:border-slate-800 text-center">
               <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                 <ShieldCheck size={14} className="text-emerald-500" /> Fully Reconciled Ledger
               </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
