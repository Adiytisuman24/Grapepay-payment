'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  Plus, 
  ChevronRight, 
  X, 
  ArrowRight,
  HelpCircle,
  Bell,
  Settings,
  LayoutGrid,
  Info,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import { getCurrencyForCountry } from '@/lib/currencies';
import { RecentPayments } from '@/components/dashboard/RecentPayments';
import { getCurrencySymbol, convertCurrency, EXCHANGE_RATES, getTaxRates, REGIONAL_TAX_DATA } from '@/lib/currency';
import { toast } from 'sonner';

export default function BalancesPage() {
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [balances, setBalances] = useState<any>({ totalNet: 0, items: [] });
  const [isSandbox, setIsSandbox] = useState(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [selectedPayoutAsset, setSelectedPayoutAsset] = useState('USD');
  const [payoutCategory, setPayoutCategory] = useState<'fiat' | 'crypto'>('fiat');
  const [userRegion, setUserRegion] = useState('');

  useEffect(() => {
    const fetchAndCalculate = async () => {
      try {
        const sandboxState = localStorage.getItem('grapepay_sandbox') === 'true';
        setIsSandbox(sandboxState);

        const userData = localStorage.getItem('grapepay_user');
        if (userData) {
          const parsed = JSON.parse(userData);
          if (parsed.region) {
            setUserRegion(parsed.region);
          }
        }

        const preferredCurrency = localStorage.getItem('grapepay_preferred_currency') || 'USD';
        setCurrency(preferredCurrency);

        // Load Payouts for subtraction
        const storedPayouts = localStorage.getItem('grapepay_payouts');
        let payoutRecords: any[] = [];
        if (storedPayouts) {
          try {
            payoutRecords = JSON.parse(storedPayouts);
          } catch (e) {}
        }

        const response = await fetch('http://localhost:3001/api/transactions');
        const transactions = await response.json();
        
        // Filter payments by environment
        const filteredPayments = transactions.filter((p: any) => {
          const paymentIsSandbox = p.is_sandbox === true;
          return sandboxState ? paymentIsSandbox : !paymentIsSandbox;
        });

        // Derive raw balances from payments
        const derived: Record<string, number> = {};
        filteredPayments.filter((p: any) => p.status === 'succeeded').forEach((p: any) => {
          const curr = p.currency || 'USD';
          derived[curr] = (derived[curr] || 0) + (p.amount || 0);
        });

        // Add Swaps (Conversions)
        const storedConversions = localStorage.getItem('grapepay_conversions');
        if (storedConversions) {
          try {
            const conversions = JSON.parse(storedConversions);
            conversions.forEach((c: any) => {
              if ((c.is_sandbox === true) === sandboxState) {
                if (c.fromCurrency) derived[c.fromCurrency] = (derived[c.fromCurrency] || 0) - (c.fromAmount || 0);
                if (c.toCurrency) derived[c.toCurrency] = (derived[c.toCurrency] || 0) + (c.toAmount || 0);
              }
            });
          } catch (e) {}
        }

        // Subtract Payouts
        payoutRecords.forEach((p: any) => {
          if ((p.is_sandbox === true) === sandboxState) {
            if (p.currency) derived[p.currency] = (derived[p.currency] || 0) - (p.amount || 0);
          }
        });

        // Calculate Total Net in preferred currency
        let totalNet = 0;
        const balanceItems = Object.entries(EXCHANGE_RATES).map(([code, _]) => {
          const amount = derived[code] || 0;
          totalNet += convertCurrency(amount, code, preferredCurrency);
          return { code, amount };
        }).filter(item => item.amount !== 0 || ['USD', 'EUR', 'INR', 'BTC', 'ETH', 'SOL'].includes(item.code));

        setBalances({ totalNet, items: balanceItems });
        setBalance(totalNet); // For the header
      } catch (error) {
        console.error('Failed to sync balances:', error);
      }
    };

    fetchAndCalculate();
    const interval = setInterval(fetchAndCalculate, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        {/* Main Content */}
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
                <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">
                   Balances <span className="text-slate-900 ml-1">{balance < 0 ? '-' : ''}{Math.abs(balance).toLocaleString(undefined, { minimumFractionDigits: 2 })} {currency}</span>
                </h1>
                <HelpCircle size={18} className="text-slate-400 cursor-pointer hover:text-slate-600 mt-1" />
             </div>
             <div className="flex items-center gap-2">
                <Button 
                   variant="outline" 
                   className="text-slate-600 font-bold text-sm flex items-center gap-2 h-8 px-3 bg-slate-50/50"
                   onClick={() => {
                      setSelectedPayoutAsset(currency);
                      setIsPayoutModalOpen(true);
                   }}
                >
                   <ArrowRight size={14} className="text-slate-400" /> Pay out
                </Button>
                <Button variant="outline" className="text-slate-600 font-bold text-sm flex items-center gap-2 h-8 px-3 bg-slate-50/50">
                   Manage payouts <ChevronDown size={14} className="text-slate-400" />
                </Button>
             </div>
          </div>

          <div className="bg-[#f7f8f9] border border-slate-200/60 rounded-lg px-4 py-2.5 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                   <div className="h-4 w-4 text-[#635bff]"><Info size={16} /></div>
                   <span className="text-[12px] font-bold text-slate-900">Recommendation</span>
                </div>
                <p className="text-[13px] text-slate-600 font-medium">
                   Set minimum balance requirements for your connected accounts with automatic payouts to keep funds available for refunds, disputes, and fees.
                </p>
             </div>
             <div className="flex items-center gap-5">
                <button className="text-[13px] font-bold text-[#635bff] hover:underline">View docs</button>
                <button className="text-slate-400 hover:text-slate-600 transition-colors"><X size={16}/></button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
             <div className="lg:col-span-8 space-y-12">
                 {/* Balance Table Overhaul */}
                 <div className="space-y-6">
                    <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">Accounts & Assets</h3>
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                       <table className="w-full text-left border-collapse">
                          <thead>
                             <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Asset</th>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Balance</th>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Value ({currency})</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                             {balances.items.map((item: any) => (
                                <tr key={item.code} className="hover:bg-slate-50/50 transition-colors">
                                   <td className="px-6 py-4">
                                      <div className="flex items-center gap-3">
                                         <div className="h-8 w-8 bg-slate-50 rounded-lg flex items-center justify-center font-black text-slate-900 border border-slate-100 shadow-sm">
                                            {getCurrencySymbol(item.code)}
                                         </div>
                                         <span className="text-[14px] font-bold text-slate-900 tracking-tight">{item.code}</span>
                                      </div>
                                   </td>
                                   <td className="px-6 py-4">
                                      <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-400 border-slate-200 tracking-widest">
                                         {['BTC', 'ETH', 'SOL'].includes(item.code) ? 'Crypto' : 'Fiat'}
                                      </Badge>
                                   </td>
                                   <td className="px-6 py-4 text-right">
                                      <span className="text-[14px] font-black text-slate-900">
                                         {item.amount.toLocaleString(undefined, { minimumFractionDigits: ['BTC', 'ETH'].includes(item.code) ? 8 : 2 })}
                                      </span>
                                   </td>
                                   <td className="px-6 py-4 text-right">
                                      <span className="text-[14px] font-bold text-slate-500">
                                         {getCurrencySymbol(currency)} {convertCurrency(item.amount, item.code, currency).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                      </span>
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>

                {/* Recent Activity */}
                <div className="space-y-6">
                   <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">Recent activity</h3>
                    <div className="flex items-center gap-8 border-b border-slate-100 overflow-x-auto">
                       <button className="pb-3 text-[14px] font-bold text-[#635bff] border-b-2 border-[#635bff] whitespace-nowrap">Payouts</button>
                       <button className="pb-3 text-[14px] font-bold text-slate-500 hover:text-slate-900 whitespace-nowrap">All activity</button>
                    </div>
                    
                    <div className="space-y-3">
                       {(() => {
                          const storedPayouts = typeof window !== 'undefined' ? localStorage.getItem('grapepay_payouts') : null;
                          const payouts = storedPayouts ? JSON.parse(storedPayouts).filter((p: any) => (p.is_sandbox === true) === isSandbox) : [];
                          
                          if (payouts.length === 0) {
                             return (
                                <div className="border border-dashed border-slate-200 rounded-lg h-[200px] flex items-center justify-center bg-white">
                                   <p className="text-[14px] text-slate-400 font-bold">No payouts were found</p>
                                </div>
                             );
                          }

                          return payouts.sort((a: any, b: any) => new Date(b.created).getTime() - new Date(a.created).getTime()).map((p: any, i: number) => (
                             <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                   <div className="h-10 w-10 bg-purple-50 rounded-lg flex items-center justify-center text-[#635bff]">
                                      <ArrowUpRight size={20} />
                                   </div>
                                   <div>
                                      <p className="text-[14px] font-bold text-slate-900">Payout to bank</p>
                                      <p className="text-[12px] font-medium text-slate-500 uppercase tracking-tight">{new Date(p.created).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                   </div>
                                </div>
                                <div className="text-right">
                                   <p className="text-[14px] font-black text-slate-900">-{getCurrencySymbol(p.currency)}{p.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                                   <Badge variant="outline" className="text-[10px] uppercase font-bold text-green-600 bg-green-50 border-green-100">Paid out</Badge>
                                </div>
                             </div>
                          ));
                       })()}
                    </div>
                 </div>
             </div>

             {/* Right Sidebar */}
             <div className="lg:col-span-4 space-y-8">
                <div className="space-y-4">
                   <h4 className="text-[15px] font-bold text-slate-900 tracking-tight">Reports</h4>
                   <div className="p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group flex items-center gap-4 shadow-sm shadow-slate-200/50">
                      <div className="h-12 w-12 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-white transition-colors">
                         <BarChart3 size={24} className="opacity-60" />
                      </div>
                      <div className="flex-1">
                         <p className="text-[14px] font-bold text-slate-900">Balance summary</p>
                         <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Dec 2025</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Payout Modal */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Process Payout</h2>
              <button onClick={() => setIsPayoutModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex p-1 bg-slate-50 border border-slate-100 rounded-xl">
                  <button
                    onClick={() => setPayoutCategory('fiat')}
                    className={cn(
                      "flex-1 py-2 text-[12px] font-black rounded-lg transition-all",
                      payoutCategory === 'fiat' 
                        ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
                        : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    FIAT
                  </button>
                  <button
                    onClick={() => setPayoutCategory('crypto')}
                    className={cn(
                      "flex-1 py-2 text-[12px] font-black rounded-lg transition-all",
                      payoutCategory === 'crypto' 
                        ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
                        : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    CRYPTO
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Asset</label>
                  <div className="grid grid-cols-3 gap-2">
                    {balances.items
                      .filter((item: any) => {
                        const isCrypto = ['BTC', 'ETH', 'SOL'].includes(item.code);
                        return payoutCategory === 'crypto' ? isCrypto : !isCrypto;
                      })
                      .map((item: any) => (
                        <button
                          key={item.code}
                          onClick={() => setSelectedPayoutAsset(item.code)}
                          className={cn(
                            "p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center",
                            selectedPayoutAsset === item.code 
                              ? "border-[#635bff] bg-purple-50/50 shadow-sm" 
                              : "border-slate-100 bg-slate-50/50 hover:border-slate-200"
                          )}
                        >
                          <span className="text-[14px] font-black text-slate-900">{item.code}</span>
                          <span className="text-[10px] font-bold text-slate-400">{getCurrencySymbol(item.code)}</span>
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Payout Amount</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-black text-slate-400 group-focus-within:text-[#635bff] transition-colors">
                    {getCurrencySymbol(selectedPayoutAsset)}
                  </div>
                  <input
                    type="number"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-xl text-[18px] font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#635bff] transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              {payoutAmount && Number(payoutAmount) > 0 && (
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between text-[13px] font-medium text-slate-500">
                    <span>Gross Amount</span>
                    <span className="text-slate-900 font-bold">{getCurrencySymbol(selectedPayoutAsset)}{Number(payoutAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  
                  {/* Regional CIT Tax (e.g. 18% for India) */}
                  {(() => {
                    const taxRates = getTaxRates(userRegion);
                    const citAmount = Number(payoutAmount) * (taxRates.CIT / 100);
                    if (citAmount > 0) {
                      return (
                        <div className="flex items-center justify-between text-[13px] font-medium text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <span>{userRegion} CIT Tax ({taxRates.CIT}%)</span>
                            <Info size={12} className="text-slate-300" />
                          </div>
                          <span className="text-red-500 font-bold">-{getCurrencySymbol(selectedPayoutAsset)}{citAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </div>
                      );
                    }
                    return null;
                  })()}

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[15px] font-black text-slate-900">
                    <span>Net Payout</span>
                    <div className="text-right">
                       <p className="text-[#635bff]">
                          {getCurrencySymbol(selectedPayoutAsset)}
                          {(() => {
                            const taxRates = getTaxRates(userRegion);
                            const citAmount = Number(payoutAmount) * (taxRates.CIT / 100);
                            const feeAmount = Number(payoutAmount) * 0.02; // Hidden 2% fee (should not be shown)
                            return (Number(payoutAmount) - citAmount - feeAmount).toLocaleString(undefined, { minimumFractionDigits: 2 });
                          })()}
                       </p>
                    </div>
                  </div>
                </div>
              )}

              <Button 
                onClick={() => {
                  const amount = Number(payoutAmount);
                  const taxRates = getTaxRates(userRegion);
                  const citAmount = amount * (taxRates.CIT / 100);
                  const feeAmount = amount * 0.02;
                  const netAmount = amount - citAmount - feeAmount;

                  const payoutRecord = {
                    type: 'payout',
                    amount: amount,
                    netAmount: netAmount,
                    currency: selectedPayoutAsset,
                    is_sandbox: isSandbox,
                    created: new Date().toISOString(),
                    status: 'paid',
                    region: userRegion,
                    cit_tax: taxRates.CIT,
                    surge_fee: 2
                  };

                  const existing = localStorage.getItem('grapepay_payouts');
                  const payouts = existing ? JSON.parse(existing) : [];
                  payouts.push(payoutRecord);
                  localStorage.setItem('grapepay_payouts', JSON.stringify(payouts));

                  toast.success('Payout request submitted successfully', {
                     description: `Processing net payout of ${getCurrencySymbol(selectedPayoutAsset)}${netAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} after tax and fees.`
                  });
                  setIsPayoutModalOpen(false);
                  setPayoutAmount('');
                }}
                disabled={!payoutAmount || Number(payoutAmount) <= 0}
                className="w-full bg-[#635bff] hover:bg-[#5249f0] text-white font-bold h-12 rounded-xl text-[15px] shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
              >
                Confirm Payout
              </Button>
              <p className="text-[11px] text-center text-slate-400 font-medium leading-relaxed">
                By confirming, you agree to the regional tax deductions (CIT) and surge fees applicable to your business location in {userRegion}.
              </p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
