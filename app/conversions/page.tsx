'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowDownUp, 
  RefreshCcw, 
  Wallet, 
  Info, 
  ChevronDown, 
  ShieldCheck, 
  History,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Coins,
  CircleDollarSign,
  Monitor,
  ArrowLeftRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const crypoAssets = [
  { id: 'BTC', name: 'Bitcoin', icon: '₿', balance: 0.12, rate: 43500.20, color: 'text-orange-500', bgColor: 'bg-orange-50' },
  { id: 'ETH', name: 'Ethereum', icon: 'Ξ', balance: 1.5, rate: 2250.45, color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { id: 'SOL', name: 'Solana', icon: 'S', balance: 45.2, rate: 98.15, color: 'text-purple-500', bgColor: 'bg-purple-50' },
  { id: 'USDC', name: 'USD Coin', icon: 'C', balance: 12500.00, rate: 1.00, color: 'text-blue-600', bgColor: 'bg-blue-50' },
];

const fiatAssets = [
  { id: 'USD', name: 'US Dollar', icon: '$', balance: 8420.00, rate: 1.00, color: 'text-green-600', bgColor: 'bg-green-50' },
  { id: 'EUR', name: 'Euro', icon: '€', balance: 2100.00, rate: 1.09, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  { id: 'GBP', name: 'British Pound', icon: '£', balance: 1850.00, rate: 1.27, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { id: 'JPY', name: 'Japanese Yen', icon: '¥', balance: 250000.00, rate: 0.007, color: 'text-red-600', bgColor: 'bg-red-50' },
  { id: 'CAD', name: 'Canadian Dollar', icon: 'C$', balance: 3400.00, rate: 0.74, color: 'text-red-500', bgColor: 'bg-red-50' },
  { id: 'AUD', name: 'Australian Dollar', icon: 'A$', balance: 2900.00, rate: 0.67, color: 'text-orange-500', bgColor: 'bg-orange-50' },
  { id: 'CHF', name: 'Swiss Franc', icon: 'Fr', balance: 1200.00, rate: 1.15, color: 'text-slate-600', bgColor: 'bg-slate-50' },
  { id: 'CNY', name: 'Chinese Yuan', icon: '¥', balance: 15000.00, rate: 0.14, color: 'text-red-700', bgColor: 'bg-red-50' },
  { id: 'INR', name: 'Indian Rupee', icon: '₹', balance: 425000.00, rate: 0.012, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  { id: 'ZAR', name: 'South African Rand', icon: 'R', balance: 18000.00, rate: 0.054, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
  { id: 'BRL', name: 'Brazilian Real', icon: 'R$', balance: 5000.00, rate: 0.20, color: 'text-green-700', bgColor: 'bg-green-50' },
  { id: 'MXN', name: 'Mexican Peso', icon: 'MX$', balance: 12000.00, rate: 0.059, color: 'text-emerald-700', bgColor: 'bg-emerald-50' },
  { id: 'SGD', name: 'Singapore Dollar', icon: 'S$', balance: 4200.00, rate: 0.75, color: 'text-blue-700', bgColor: 'bg-blue-50' },
  { id: 'HKD', name: 'Hong Kong Dollar', icon: 'HK$', balance: 25000.00, rate: 0.13, color: 'text-indigo-700', bgColor: 'bg-indigo-50' },
  { id: 'NZD', name: 'NZ Dollar', icon: 'NZ$', balance: 3100.00, rate: 0.62, color: 'text-slate-700', bgColor: 'bg-slate-50' },
];

export default function ConversionsPage() {
  const [mode, setMode] = useState<'cross' | 'crypto' | 'fiat'>('cross');
  const [fromAsset, setFromAsset] = useState<any>(crypoAssets[0]);
  const [toAsset, setToAsset] = useState<any>(fiatAssets[0]);
  const [amount, setAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [showSyncDialog, setShowSyncDialog] = useState(false);
  const [conversions, setConversions] = useState<any[]>([]);

  // Load conversions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('grapepay_conversions');
    if (stored) {
      try {
        setConversions(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Filter options based on mode
  const fromOptions = mode === 'fiat' ? fiatAssets : crypoAssets;
  const toOptions = mode === 'crypto' ? crypoAssets : fiatAssets;

  // Sync assets when mode changes to ensure they are valid for the selected mode
  useEffect(() => {
    setFromAsset(fromOptions[0]);
    setToAsset(toOptions[0]);
  }, [mode]);

  const exchangeRate = fromAsset.rate / toAsset.rate;
  const estimatedOutput = amount ? (parseFloat(amount) * exchangeRate).toFixed(toAsset.id === 'BTC' ? 8 : 2) : '0.00';

  const handleConvertClick = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    setShowSyncDialog(true);
  };

  const handleTreasurySwap = () => {
    setShowSyncDialog(false);
    setIsSwapping(true);
    
    setTimeout(() => {
      const isSandbox = localStorage.getItem('grapepay_sandbox') === 'true';
      const newConversion = {
        id: `GP_C_${Math.floor(Math.random() * 9000) + 1000}`,
        fromCurrency: fromAsset.id,
        toCurrency: toAsset.id,
        fromAmount: parseFloat(amount),
        toAmount: parseFloat(estimatedOutput),
        date: new Date().toISOString(),
        status: 'complete',
        is_sandbox: isSandbox,
        type: 'CONVERSION'
      };

      const updatedConversions = [newConversion, ...conversions];
      setConversions(updatedConversions);
      localStorage.setItem('grapepay_conversions', JSON.stringify(updatedConversions));

      setIsSwapping(false);
      setAmount('');
      toast.success('Treasury Swap Complete', {
        description: `Successfully converted ${amount} ${fromAsset.id} to ${estimatedOutput} ${toAsset.id}. Balances updated.`
      });
    }, 1500);
  };

  const handleGlobalSync = () => {
    setShowSyncDialog(false);
    localStorage.setItem('grapepay_preferred_currency', toAsset.id);
    toast.success(`Dashboard View Updated`, {
      description: `Your entire dashboard will now reflect balances in ${toAsset.id}.`
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto p-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-100">
          <div className="space-y-4">
            <h1 className="text-[44px] font-black text-slate-900 tracking-tighter leading-none">
              Smart Treasury <span className="text-[#635bff]">Convert</span>
            </h1>
            <p className="text-[17px] font-medium text-slate-500 max-w-xl leading-relaxed">
              Institutional-grade conversion engine. Swap specific balances or update your entire dashboard display asset.
            </p>
          </div>
          
          <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-200 shadow-inner">
             {[
               { id: 'cross', label: 'Cross Swap', icon: <ArrowDownUp size={14}/> },
               { id: 'crypto', label: 'Crypto Only', icon: <Coins size={14}/> },
               { id: 'fiat', label: 'Fiat Only', icon: <CircleDollarSign size={14}/> },
             ].map(t => (
               <button 
                 key={t.id}
                 onClick={() => setMode(t.id as any)}
                 className={cn(
                   "flex items-center gap-2 px-5 py-2.5 text-[13px] font-black rounded-xl transition-all uppercase tracking-tight",
                   mode === t.id 
                    ? "bg-white text-[#635bff] shadow-sm border border-slate-200" 
                    : "text-slate-400 hover:text-slate-600"
                 )}
               >
                 {t.icon} {t.label}
               </button>
             ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Swap UI */}
          <div className="lg:col-span-7 space-y-8">
            <Card className="p-1 bg-[#f8fafc] border-slate-200 rounded-[44px] shadow-3xl overflow-hidden">
               <div className="p-10 bg-white rounded-[40px] border border-slate-100 space-y-10">
                  
                  {/* FROM ITEM */}
                  <div className="space-y-4">
                     <div className="flex justify-between items-center text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">
                        <span>Origin Account</span>
                        <span className="bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                           Balance: {fromAsset.balance} {fromAsset.id}
                        </span>
                     </div>
                     <div className="flex items-center gap-6 bg-slate-50 p-8 rounded-[32px] border border-slate-100 group focus-within:ring-4 focus-within:ring-purple-50 transition-all">
                        <div className="relative">
                           <select 
                             className="absolute inset-0 opacity-0 cursor-pointer"
                             value={fromAsset.id}
                             onChange={(e) => setFromAsset(fromOptions.find(o => o.id === e.target.value) || fromOptions[0])}
                           >
                              {fromOptions.map(o => <option key={o.id} value={o.id}>{o.id}</option>)}
                           </select>
                           <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm group-hover:border-purple-300 transition-colors">
                              <span className={cn("h-8 w-8 rounded-lg flex items-center justify-center font-black text-lg", fromAsset.bgColor, fromAsset.color)}>
                                 {fromAsset.icon}
                              </span>
                              <span className="text-xl font-black text-slate-900 tracking-tighter">{fromAsset.id}</span>
                              <ChevronDown size={18} className="text-slate-300" />
                           </div>
                        </div>
                        <Input 
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                          className="flex-1 text-[42px] font-black text-right bg-transparent border-none p-0 focus-visible:ring-0 placeholder:text-slate-200"
                        />
                     </div>
                  </div>

                  {/* SEPARATOR */}
                  <div className="flex justify-center -my-14 relative z-10">
                     <div className="h-16 w-16 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-xl group transition-all hover:scale-110 active:rotate-180">
                        <div className="h-12 w-12 bg-slate-900 rounded-full flex items-center justify-center text-white">
                           <RefreshCcw size={22} className="group-hover:animate-spin" />
                        </div>
                     </div>
                  </div>

                  {/* TO ITEM */}
                  <div className="space-y-4">
                     <div className="flex justify-between items-center text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">
                        <span>Settlement Asset</span>
                        <span className="text-slate-500 font-bold">Equivalent Execution Pool</span>
                     </div>
                     <div className="flex items-center gap-6 bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                        <div className="relative">
                           <select 
                             className="absolute inset-0 opacity-0 cursor-pointer"
                             value={toAsset.id}
                             onChange={(e) => setToAsset(toOptions.find(o => o.id === e.target.value) || toOptions[0])}
                           >
                              {toOptions.map(o => <option key={o.id} value={o.id}>{o.id}</option>)}
                           </select>
                           <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm">
                              <span className={cn("h-8 w-8 rounded-lg flex items-center justify-center font-black text-lg", toAsset.bgColor, toAsset.color)}>
                                 {toAsset.icon}
                              </span>
                              <span className="text-xl font-black text-slate-900 tracking-tighter">{toAsset.id}</span>
                              <ChevronDown size={18} className="text-slate-300" />
                           </div>
                        </div>
                        <div className="flex-1 text-[42px] font-black text-right text-slate-900 tracking-tighter">
                           {estimatedOutput}
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                    <Button 
                      onClick={handleConvertClick}
                      disabled={isSwapping || !amount}
                      className="w-full h-20 bg-slate-900 hover:bg-black rounded-[24px] text-xl font-black shadow-2xl shadow-slate-900/10 transition-all uppercase tracking-tight flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                      {isSwapping ? <RefreshCcw className="animate-spin" size={24}/> : <>Initiate Conversion <Zap size={22} className="fill-current"/></>}
                    </Button>
                  </div>
               </div>
            </Card>

            <div className="flex justify-center gap-12 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
               <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100 shadow-sm">
                  <ShieldCheck size={14} className="text-emerald-500" /> Fully Insured Custody
               </div>
               <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100 shadow-sm">
                  <Clock size={14} className="text-blue-500" /> 2s Match Engine
               </div>
            </div>
          </div>

          {/* Right Panel: Market & History */}
          <div className="lg:col-span-5 space-y-8">
             <Card className="p-10 border-slate-200 rounded-[44px] bg-white shadow-sm space-y-8 relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Recent Activity</h2>
                  <div className="space-y-3">
                    {conversions.slice(0, 5).map((c, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3">
                           <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center border border-slate-100">
                              <ArrowLeftRight size={14} className="text-[#635bff]" />
                           </div>
                           <div>
                              <p className="text-[13px] font-black text-slate-900 leading-none">{c.fromCurrency} → {c.toCurrency}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Managed Treasury</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="text-right">
                              <p className="text-[13px] font-black text-emerald-600">+{c.toAmount} {c.toCurrency}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{new Date(c.date).toLocaleDateString()}</p>
                           </div>
                           <button 
                             onClick={() => toast.success('Payout Initiated', { description: `Funds are being sent to your linked bank account.` })}
                             className="h-8 px-3 rounded-lg bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider hover:bg-black transition-all active:scale-95"
                           >
                              Payout
                           </button>
                        </div>
                      </div>
                    ))}
                    {conversions.length === 0 && (
                      <p className="text-center py-8 text-slate-400 font-bold text-sm">No recent swaps recorded.</p>
                    )}
                  </div>
                </div>
             </Card>

             <Card className="p-10 bg-[#635bff] border-none rounded-[44px] text-white shadow-2xl relative overflow-hidden group">
                <div className="relative z-10 space-y-6">
                   <div className="h-14 w-14 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-xl">
                      <History size={28} />
                   </div>
                   <div className="space-y-2">
                      <h2 className="text-2xl font-black uppercase tracking-tight">Institutional OTC</h2>
                      <p className="text-white/80 font-medium text-[15px] leading-relaxed">
                         Large volume conversions are handled via our specialized OTC nodes for zero slippage.
                      </p>
                   </div>
                   <Button variant="secondary" className="h-14 bg-white text-[#635bff] hover:bg-slate-50 font-black rounded-2xl px-8 shadow-xl shadow-black/20 uppercase tracking-tight flex items-center gap-3">
                      Learn More <ArrowRight size={18} />
                   </Button>
                </div>
                <div className="absolute -bottom-20 -right-20 h-80 w-80 bg-black/10 blur-[120px] rounded-full" />
             </Card>
          </div>
        </div>
      </div>

      {/* Sync Mode Selector Dialog */}
      <Dialog open={showSyncDialog} onOpenChange={setShowSyncDialog}>
        <DialogContent className="max-w-md bg-white rounded-[32px] p-8 border-none shadow-2xl">
          <DialogHeader className="space-y-4">
            <div className="h-16 w-16 bg-purple-50 rounded-2xl flex items-center justify-center text-[#635bff] mb-2">
               <ArrowDownUp size={32} />
            </div>
            <DialogTitle className="text-2xl font-black text-slate-900 tracking-tighter">Conversion Mode</DialogTitle>
            <DialogDescription className="text-slate-500 font-medium leading-relaxed">
              How would you like to apply this conversion? Select "Treasury Swap" to convert a specific amount, or "Dashboard Sync" to change your entire display view.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4 py-6">
             <button 
               onClick={handleTreasurySwap}
               className="flex items-start gap-4 p-5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-100 transition-all group text-left"
             >
                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:border-purple-200">
                   <RefreshCcw size={18} className="text-[#635bff]" />
                </div>
                <div>
                   <p className="font-black text-slate-900 leading-none">A: Treasury Swap</p>
                   <p className="text-[12px] font-bold text-slate-500 mt-2">Deduct {amount} {fromAsset.id} and add equivalent to {toAsset.id} balance.</p>
                </div>
             </button>

             <button 
               onClick={handleGlobalSync}
               className="flex items-start gap-4 p-5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-100 transition-all group text-left"
             >
                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:border-purple-200">
                   <Monitor size={18} className="text-[#635bff]" />
                </div>
                <div>
                   <p className="font-black text-slate-900 leading-none">B: Dashboard View Sync</p>
                   <p className="text-[12px] font-bold text-slate-500 mt-2">Update entire dashboard to display volume and assets in {toAsset.id}.</p>
                </div>
             </button>
          </div>

          <DialogFooter>
             <button 
               onClick={() => setShowSyncDialog(false)}
               className="w-full h-12 text-[13px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
             >
                Cancel
             </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
