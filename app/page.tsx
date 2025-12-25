'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  Plus, 
  Settings, 
  X, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  Info, 
  Copy, 
  Check, 
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  History,
  RefreshCcw,
  ArrowRight,
  ArrowUpRight,
  PlusCircle,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  LineChart, 
  Line, 
  XAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { getCurrencyForCountry } from '@/lib/currencies';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { formatCurrency, getCurrencySymbol, convertCurrency, EXCHANGE_RATES, getTaxRates } from '@/lib/currency';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [currency, setCurrency] = useState('USD');
  const [isSandbox, setIsSandbox] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  // Real payment data
  const [payments, setPayments] = useState<any[]>([]);
  const [totalVolume, setTotalVolume] = useState(0);
  const [successfulPayments, setSuccessfulPayments] = useState(0);
  const [failedPayments, setFailedPayments] = useState(0);
  const [newCustomersCount, setNewCustomersCount] = useState(0);
  const [balances, setBalances] = useState<any>({ live: {}, sandbox: {} });
  const [lastTransactionDate, setLastTransactionDate] = useState<string | null>(null);
  
  // Payout States
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [selectedPayoutAsset, setSelectedPayoutAsset] = useState('USD');
  const [payoutCategory, setPayoutCategory] = useState<'fiat' | 'crypto'>('fiat');
  const [userRegion, setUserRegion] = useState('');
  
  // Date Picker States
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>({
    from: new Date(),
    to: new Date()
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [viewFrequency, setViewFrequency] = useState('daily');
  const [compareMode, setCompareMode] = useState('previous_period');

  // Chart Data
  const [todayChartData, setTodayChartData] = useState([
     { name: '00:00', value: 0 },
     { name: '04:00', value: 0 },
     { name: '08:00', value: 0 },
     { name: '12:00', value: 0 },
     { name: '16:00', value: 0 },
     { name: '20:00', value: 0 },
     { name: '23:59', value: 0 },
  ]);
  
  const [mockChartData, setMockChartData] = useState([
    { name: 'Dec 14', value: 0 },
    { name: 'Dec 15', value: 0 },
    { name: 'Dec 16', value: 0 },
    { name: 'Dec 17', value: 0 },
    { name: 'Dec 18', value: 0 },
    { name: 'Dec 19', value: 0 },
    { name: 'Dec 20', value: 0 },
  ]);

  const router = useRouter();

  // Fetch real payment data
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const pResponse = await fetch('http://localhost:3001/api/transactions');
        const pData = await pResponse.json();
        setPayments(pData);
        
        // Also sync sandbox state during poll to ensure no drift
        const currentSandbox = localStorage.getItem('grapepay_sandbox') === 'true';
        setIsSandbox(currentSandbox);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchPayments();
    // Refresh every 2 seconds
    const interval = setInterval(fetchPayments, 2000);
    return () => clearInterval(interval);
  }, []);

  // Calculate stats and update charts when payments or sandbox mode changes
  useEffect(() => {
    const filteredPayments = payments.filter((p: any) => {
        const paymentIsSandbox = p.is_sandbox === true;
        return isSandbox ? paymentIsSandbox : !paymentIsSandbox;
    });

    const successful = filteredPayments.filter((p: any) => p.status === 'succeeded');
    const failed = filteredPayments.filter((p: any) => p.status === 'failed');
    
    const targetRate = EXCHANGE_RATES[currency] || 1;

    // Calculate total volume by converting all successful payments to the current dashboard currency
    const volume = successful.reduce((sum: number, p: any) => {
      const pCurrency = p.currency || 'USD';
      const pAmount = p.amount || 0;
      
      return sum + convertCurrency(pAmount, pCurrency, currency);
    }, 0);
    
    // Derived balances from received amounts (succeeded)
    // This ensures balance = amount received as requested
    const derivedBalances: Record<string, number> = {};
    successful.forEach((p: any) => {
      const pCurr = p.currency || 'USD';
      derivedBalances[pCurr] = (derivedBalances[pCurr] || 0) + (p.amount || 0);
    });

    // Also include conversion events in balance calculation
    const storedConversions = localStorage.getItem('grapepay_conversions');
    if (storedConversions) {
      try {
        const conversions = JSON.parse(storedConversions);
        conversions.forEach((c: any) => {
          const convIsSandbox = c.is_sandbox === true;
          if (isSandbox === convIsSandbox) {
            // Deduct from source
            if (c.fromCurrency) {
              derivedBalances[c.fromCurrency] = (derivedBalances[c.fromCurrency] || 0) - (c.fromAmount || 0);
            }
            // Add to target
            if (c.toCurrency) {
              derivedBalances[c.toCurrency] = (derivedBalances[c.toCurrency] || 0) + (c.toAmount || 0);
            }
          }
        });
      } catch (e) {
        console.error('Error parsing conversions:', e);
      }
    }

    // Include payouts in balance calculation
    const storedPayouts = localStorage.getItem('grapepay_payouts');
    if (storedPayouts) {
      try {
        const payouts = JSON.parse(storedPayouts);
        payouts.forEach((p: any) => {
          const payoutIsSandbox = p.is_sandbox === true;
          if (isSandbox === payoutIsSandbox) {
            if (p.currency) {
              derivedBalances[p.currency] = (derivedBalances[p.currency] || 0) - (p.amount || 0);
            }
          }
        });
      } catch (e) {
        console.error('Error parsing payouts:', e);
      }
    }

    // Calculate a "Total Net Balance" in the target currency by summing all assets
    let totalNetInTarget = 0;
    Object.entries(derivedBalances).forEach(([asset, amount]) => {
      totalNetInTarget += convertCurrency(amount, asset, currency);
    });

    setBalances((prev: any) => ({
      ...prev,
      [isSandbox ? 'sandbox' : 'live']: {
        ...derivedBalances,
        totalNet: totalNetInTarget
      }
    }));

    // Calculate unique customers from successful payments
    const uniqueCustomers = new Set(successful.map((p: any) => p.customer_email).filter(Boolean));
    setNewCustomersCount(uniqueCustomers.size);

    setSuccessfulPayments(successful.length);
    setFailedPayments(failed.length);
    setTotalVolume(volume);

    // Update last transaction date
    if (filteredPayments.length > 0) {
      const latest = [...filteredPayments].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())[0];
      setLastTransactionDate(format(new Date(latest.created), 'MMM dd, yyyy HH:mm'));
    } else {
      setLastTransactionDate(null);
    }
    
    // Update chart data with filtered payments
    updateChartData(filteredPayments);
  }, [payments, isSandbox, currency]);

  const updateChartData = (paymentsData: any[]) => {
    const now = new Date();
    const today = now.toDateString();
    
    // Filter today's payments
    const todayPayments = paymentsData.filter(p => {
      const paymentDate = new Date(p.created);
      return paymentDate.toDateString() === today && p.status === 'succeeded';
    });
    
    // Group by hour for today's chart
    const hourlyData = [0, 4, 8, 12, 16, 20, 23].map(hour => {
      const hourPayments = todayPayments.filter(p => {
        const paymentHour = new Date(p.created).getHours();
        return paymentHour >= hour && (hour === 23 ? paymentHour <= 23 : paymentHour < (hour + 4));
      });
      const sum = hourPayments.reduce((total, p) => total + (p.amount || 0), 0);
      return {
        name: hour === 23 ? '23:59' : `${hour.toString().padStart(2, '0')}:00`,
        value: sum
      };
    });
    
    setTodayChartData(hourlyData);
    
    // Weekly chart data
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });
    
    const weeklyData = last7Days.map(date => {
      const dayPayments = paymentsData.filter(p => {
        const paymentDate = new Date(p.created);
        return paymentDate.toDateString() === date.toDateString() && p.status === 'succeeded';
      });
      const sum = dayPayments.reduce((total, p) => total + (p.amount || 0), 0);
      return {
        name: format(date, 'MMM dd'),
        value: sum
      };
    });
    
    setMockChartData(weeklyData);
  };

  useEffect(() => {
    const userData = localStorage.getItem('grapepay_user');
    const sandboxState = localStorage.getItem('grapepay_sandbox') === 'true';
    setIsSandbox(sandboxState);

    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      if (parsed.region) setUserRegion(parsed.region);
    } else {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Check for preferred currency from conversions
    const preferredCurrency = localStorage.getItem('grapepay_preferred_currency');
    if (preferredCurrency) {
      setCurrency(preferredCurrency);
    } else if (parsedUser.region) {
      setCurrency(getCurrencyForCountry(parsedUser.region));
    }
    
    setTimeout(() => setIsLoading(false), 500);
  }, [router]);

  const pubKey = isSandbox 
    ? 'gr_test_51RoibjDcLq3M9kL' 
    : 'gr_live_51RoibjDcLq3M9kL';
    
  const secKey = isSandbox 
    ? 'gr_test_sk_51RoibjDc...' 
    : 'gr_live_sk_51RoibjDc...';

  const fullSecKey = isSandbox 
    ? 'gr_test_sk_51RoibjDcLq3M9kLXyZ123' 
    : 'gr_live_sk_51RoibjDcLq3M9kLXyZ123';

  const copyToClipboard = (text: string, type: 'pub' | 'sec') => {
    navigator.clipboard.writeText(text);
    setCopiedKey(type);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const OverviewCard = ({ title, value, subtext, chart = false }: any) => (
    <Card className="p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden h-[240px] flex flex-col justify-between group">
      <div className="flex justify-between items-start z-10">
         <div>
            <div className="flex items-center gap-1.5 mb-1">
               <h3 className="text-[14px] font-bold text-slate-700">{title}</h3>
               <Info size={12} className="text-slate-400 cursor-pointer hover:text-slate-600" />
            </div>
            {value ? (
               <div className="space-y-0.5">
                  <p className="text-[20px] font-bold text-slate-900 tracking-tight">{value}</p>
                  <p className="text-[13px] text-slate-500">{subtext}</p>
               </div>
            ) : (
               <div className="mt-8 flex flex-col items-center justify-center h-20 text-slate-300">
                  <span className="text-[13px] font-medium bg-slate-50 px-3 py-1 rounded">No data</span>
               </div>
            )}
         </div>
         {chart && (
            <Button variant="outline" size="sm" className="h-7 text-[11px] font-bold text-slate-600 gap-1 bg-white hover:bg-slate-50 border-slate-200 shadow-sm">
               <LayoutGrid size={12} /> Explore
            </Button>
         )}
      </div>

      {chart ? (
         <div className="h-[100px] -mx-6 -mb-6 mt-4">
            <ResponsiveContainer width="100%" height="100%">
               <LineChart data={mockChartData}>
                  <Line 
                     type="stepAfter" 
                     dataKey="value" 
                     stroke="#635bff" 
                     strokeWidth={2} 
                     dot={{ r: 3, fill: '#635bff', strokeWidth: 0 }}
                     activeDot={{ r: 5, strokeWidth: 0 }}
                  />
                  <XAxis dataKey="name" hide />
                  <Tooltip 
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                     labelStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}
                     cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
               </LineChart>
            </ResponsiveContainer>
         </div>
      ) : (
         <div className="absolute inset-x-6 bottom-6 border-b-2 border-dashed border-slate-100 h-[100px] flex items-end justify-center pb-8 opacity-50">
             <div className="w-full h-full border-2 border-dashed border-slate-100 rounded-lg" />
         </div>
      )}
      
      {chart && (
         <div className="flex justify-between items-center text-[11px] font-medium text-slate-400 mt-2 border-t border-slate-50 pt-3">
             <span>{dateRange?.from ? format(dateRange.from, 'MMM d') : '--'}</span>
             <span>{dateRange?.to ? format(dateRange.to, 'MMM d') : '--'}</span>
         </div>
      )}
    </Card>
  );

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="h-8 w-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-screen bg-white">
        <div className="p-8 lg:p-12 space-y-12 max-w-[1600px] mx-auto w-full">
          
          {/* TODAY SECTION */}
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Today</h1>
                <Button 
                    variant="outline" 
                    className="text-slate-600 font-bold text-sm h-8 px-4 border-slate-200"
                    onClick={() => {
                       setSelectedPayoutAsset(currency);
                       setIsPayoutModalOpen(true);
                    }}
                >
                    Pay out funds
                </Button>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-8">
                   <div className="space-y-1">
                      <p className="text-[13px] text-slate-500 font-medium">Gross volume</p>
                      <p className="text-[13px] text-slate-600">Total sales before deducting any fees, refunds, or disputes.</p>
                   </div>
                   
                   <div className="h-[200px] w-full border-b border-slate-100 pb-4">
                      <ResponsiveContainer width="100%" height="100%">
                         <LineChart data={todayChartData}>
                            <Line 
                               type="monotone" 
                               dataKey="value" 
                               stroke="#e0e0fc" 
                               strokeWidth={2} 
                               dot={false}
                               strokeDasharray="4 4" 
                            />
                            <Tooltip cursor={false} content={() => null} />
                         </LineChart>
                      </ResponsiveContainer>
                   </div>

                   <div className="grid grid-cols-2 gap-12">
                      <div>
                         <div className="flex items-center justify-between mb-2">
                            <span className="text-[14px] font-bold text-slate-900">{currency} balance</span>
                            <button className="text-[13px] font-medium text-[#635bff] hover:underline">View</button>
                         </div>
                          <div className="flex items-center gap-2">
                             <span className="text-[24px] font-medium text-slate-900">
                                {currency === 'BTC' ? '₿' : currency === 'ETH' ? 'Ξ' : getCurrencySymbol(currency)} {(balances[isSandbox ? 'sandbox' : 'live']?.totalNet || 0).toLocaleString(undefined, { minimumFractionDigits: ['BTC', 'ETH'].includes(currency) ? 8 : 2 })} <span className="text-sm text-slate-500">{currency}</span>
                             </span>
                             {/* Only show warning if balance is 0 */}
                             {(balances[isSandbox ? 'sandbox' : 'live']?.totalNet || 0) === 0 && (
                                <div className="h-4 w-4 rounded-full border border-red-500 flex items-center justify-center text-[10px] text-red-500 font-bold">!</div>
                             )}
                          </div>
                      </div>
                      <div>
                         <div className="flex items-center justify-between mb-2">
                            <span className="text-[14px] font-bold text-slate-900">Payouts</span>
                            <button className="text-[13px] font-medium text-[#635bff] hover:underline">View</button>
                         </div>
                         <span className="text-[24px] font-medium text-slate-900">—</span>
                      </div>
                   </div>
                    {lastTransactionDate && (
                      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
                          Last activity: {lastTransactionDate}
                        </p>
                        <button 
                          onClick={() => {
                            const stored = localStorage.getItem('grapepay_conversions');
                            if (stored) {
                              const convs = JSON.parse(stored);
                              const latest = convs.find((c: any) => (c.is_sandbox === true) === isSandbox);
                              if (latest && latest.toCurrency) {
                                localStorage.setItem('grapepay_preferred_currency', latest.toCurrency);
                                window.location.reload();
                              } else {
                                toast.error('No recent conversions found');
                              }
                            }
                          }}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] font-black text-slate-600 uppercase tracking-tight transition-all active:scale-95"
                        >
                          <RefreshCcw size={10} className="text-[#635bff]" /> Sync View to Recent Swap
                        </button>
                      </div>
                    )}
                 </div>

                <div className="lg:col-span-4 space-y-6">
                   <Card className="p-4 bg-[#f7f8f9] border-none shadow-none relative rounded-lg group hover:bg-[#efeff1] transition-colors">
                      <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={14}/></button>
                      <h4 className="text-[14px] font-bold text-slate-900 mb-2">Recommendations</h4>
                      <p className="text-[13px] text-slate-600 leading-relaxed mb-3">
                         Embed a <button onClick={() => router.push('/payment-links/create')} className="text-[#635bff] hover:underline">payment form</button> on your site or redirect to a Grapepay-hosted page.
                      </p>
                      <p className="text-[13px] text-slate-600 leading-relaxed">
                         Create a <button onClick={() => router.push('/docs')} className="text-[#635bff] hover:underline">payment link</button> to start accepting payments.
                      </p>
                   </Card>

                   <Card className="p-4 bg-[#f7f8f9] border-none shadow-none rounded-lg space-y-4 group hover:bg-[#efeff1] transition-colors">
                       <div className="flex items-center justify-between">
                          <h4 className="text-[14px] font-bold text-slate-900">API keys</h4>
                          <button onClick={() => router.push('/developers')} className="text-[12px] font-medium text-[#635bff] hover:underline">View docs</button>
                       </div>
                       
                       <div className="space-y-4">
                          <div className="flex items-center justify-between group/item cursor-pointer" onClick={() => copyToClipboard(pubKey, 'pub')}>
                             <span className="text-[13px] text-slate-600">Publishable key</span>
                             <div className="flex items-center gap-2">
                                <span className="text-[13px] font-mono text-slate-900">{pubKey.substring(0, 18)}...</span>
                                {copiedKey === 'pub' && <Check size={12} className="text-emerald-500" />}
                             </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                             <span className="text-[13px] text-slate-600">Secret key</span>
                             <div className="flex items-center gap-2 group/item cursor-pointer">
                                <span className="text-[13px] font-mono text-slate-900" onClick={() => copyToClipboard(fullSecKey, 'sec')}>
                                   {showSecretKey ? fullSecKey.substring(0, 18) + '...' : '••••••••••••'}
                                </span>
                                {copiedKey === 'sec' && <Check size={12} className="text-emerald-500" />}
                                <button className="text-slate-400 hover:text-slate-600 ml-1" onClick={() => setShowSecretKey(!showSecretKey)}>
                                   <Info size={14} />
                                </button>
                             </div>
                          </div>
                       </div>
                   </Card>
                </div>
             </div>
          </div>

          {/* OVERVIEW SECTION */}
          <div className="space-y-6 pt-8 border-t border-slate-100">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
                <div className="flex items-center gap-4">
                   <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Your overview</h1>
                </div>
                
                <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                   <div className="flex items-center bg-white border border-slate-200 rounded-md shadow-sm h-8 px-1">
                      
                      <Popover>
                        <PopoverTrigger asChild>
                           <button className="text-[13px] font-bold text-[#635bff] px-3 py-1 hover:bg-slate-50 rounded flex items-center gap-1">
                              {dateRange?.from ? format(dateRange.from, 'MMM d') : 'Last 7 days'} - {dateRange?.to ? format(dateRange.to, 'MMM d, yyyy') : 'Today'} <ChevronDown size={12} className="text-[#635bff]" />
                           </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[640px] p-0" align="start">
                           <div className="flex p-4 gap-4 border-b border-slate-100">
                              <div className="flex items-center gap-2">
                                 <span className="text-[13px] font-medium text-slate-600">Start</span>
                                 <div className="border-2 border-blue-200 rounded-md px-2 py-1 text-[13px] font-bold text-slate-900 bg-blue-50">
                                    {dateRange?.from ? format(dateRange.from, 'MM / dd / yyyy') : '-- / -- / ----'}
                                 </div>
                              </div>
                              <div className="flex items-center gap-2">
                                 <span className="text-[13px] font-medium text-slate-600">End</span>
                                 <div className="border border-slate-200 rounded-md px-2 py-1 text-[13px] font-medium text-slate-900">
                                    {dateRange?.to ? format(dateRange.to, 'MM / dd / yyyy') : '-- / -- / ----'}
                                 </div>
                              </div>
                           </div>
                           <div className="flex">
                              <div className="w-48 border-r border-slate-100 p-2 space-y-1">
                                 {[
                                    { id: '7d', label: 'Last 7 days' },
                                    { id: '2w', label: 'Last 2 weeks' },
                                    { id: '4w', label: 'Last 4 weeks' },
                                    { id: '1m', label: 'Last month' },
                                    { id: 'mtd', label: 'Month to date' },
                                    { id: 'qtd', label: 'Quarter to date' },
                                    { id: 'ytd', label: 'Year to date' },
                                    { id: 'all', label: 'All time' }
                                 ].map((range) => (
                                    <button 
                                      key={range.id}
                                      onClick={() => {
                                         const now = new Date();
                                         const from = new Date();
                                         if (range.id === '7d') from.setDate(now.getDate() - 7);
                                         if (range.id === '2w') from.setDate(now.getDate() - 14);
                                         if (range.id === '4w') from.setDate(now.getDate() - 28);
                                         if (range.id === '1m') from.setMonth(now.getMonth() - 1);
                                         if (range.id === 'mtd') from.setDate(1);
                                         if (range.id === 'qtd') from.setMonth(Math.floor(now.getMonth() / 3) * 3, 1);
                                         if (range.id === 'ytd') from.setMonth(0, 1);
                                         if (range.id === 'all') from.setFullYear(2000, 0, 1);
                                         
                                         setDateRange({ from, to: now });
                                      }}
                                      className={cn(
                                        "w-full text-left px-3 py-1.5 text-[13px] font-medium rounded-md transition-colors",
                                        "text-slate-600 hover:bg-slate-50"
                                      )}
                                    >
                                       {range.label}
                                    </button>
                                 ))}
                              </div>
                              <div className="flex-1 p-4">
                                 <div className="flex justify-between items-center mb-4">
                                    <div className="flex gap-1">
                                       <button className="p-1 hover:bg-slate-100 rounded" onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear() - 1, selectedMonth.getMonth()))}><ChevronLeft size={16} className="text-slate-300"/></button>
                                       <button className="p-1 hover:bg-slate-100 rounded" onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1))}><ChevronLeft size={16} className="text-slate-400"/></button>
                                    </div>
                                    <span className="text-[14px] font-bold text-slate-700">{format(selectedMonth, 'MMMM yyyy')}</span>
                                    <div className="flex gap-1">
                                       <button className="p-1 hover:bg-slate-100 rounded" onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1))}><ChevronRight size={16} className="text-slate-400"/></button>
                                       <button className="p-1 hover:bg-slate-100 rounded" onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear() + 1, selectedMonth.getMonth()))}><ChevronRight size={16} className="text-slate-300"/></button>
                                    </div>
                                 </div>
                                 <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                                       <div key={d} className="text-[11px] font-medium text-slate-400 pb-2">{d}</div>
                                    ))}
                                    {Array.from({length: new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate()}, (_, i) => i + 1).map((day) => {
                                       const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
                                       const isSelected = dateRange?.from && dateRange?.to && date >= dateRange.from && date <= dateRange.to;
                                       const isRangeStart = dateRange?.from && date.toDateString() === dateRange.from.toDateString();
                                       const isRangeEnd = dateRange?.to && date.toDateString() === dateRange.to.toDateString();
                                       
                                       return (
                                          <div 
                                             key={day} 
                                             onClick={() => {
                                                if (!dateRange?.from || (dateRange.from && dateRange.to && dateRange.from.toDateString() !== dateRange.to.toDateString())) {
                                                   setDateRange({ from: date, to: date });
                                                } else {
                                                   if (date < dateRange.from) {
                                                      setDateRange({ from: date, to: dateRange.from });
                                                   } else {
                                                      setDateRange({ from: dateRange.from, to: date });
                                                   }
                                                }
                                             }}
                                             className={cn(
                                                "h-8 w-8 flex items-center justify-center text-[13px] rounded-full mx-auto cursor-pointer transition-all",
                                                isSelected ? "bg-purple-50 text-[#635bff] rounded-none w-full" : "text-slate-700 hover:bg-slate-50",
                                                isRangeStart ? "bg-[#635bff] text-white rounded-l-full" : "",
                                                isRangeEnd ? "bg-[#635bff] text-white rounded-r-full" : ""
                                             )}
                                          >
                                             {day}
                                          </div>
                                       );
                                    })}
                                 </div>
                                 <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
                                    <div className="text-[11px] text-slate-400">Range: Jan 2000 - Jan 4000</div>
                                    <div className="flex gap-2">
                                       <Button variant="outline" size="sm" className="h-8 text-[13px]" onClick={() => setDateRange(undefined)}>Clear</Button>
                                       <Button size="sm" className="h-8 text-[13px] bg-[#635bff] hover:bg-[#544dc9]">Apply</Button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </PopoverContent>
                      </Popover>

                      <div className="w-px h-4 bg-slate-200 mx-1" />
                      <Popover>
                        <PopoverTrigger asChild>
                           <button className="text-[13px] font-bold text-slate-700 px-3 py-1 hover:bg-slate-50 rounded flex items-center gap-1 capitalize">
                              {viewFrequency} <ChevronDown size={12} className="text-slate-400" />
                           </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-40 p-1" align="start">
                           {['hourly', 'daily', 'weekly', 'monthly', 'yearly'].map(f => (
                              <button 
                                key={f} 
                                onClick={() => setViewFrequency(f)}
                                className={cn(
                                  "w-full text-left px-3 py-1.5 text-[13px] font-medium rounded capitalize",
                                  viewFrequency === f ? "bg-purple-50 text-[#635bff]" : "hover:bg-slate-50 text-slate-600"
                                )}
                              >
                                 {f}
                              </button>
                           ))}
                        </PopoverContent>
                      </Popover>
                   </div>
                   
                   <div className="flex items-center gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                           <div className="flex items-center gap-2 px-3 h-8 bg-white border border-slate-200 rounded-md shadow-sm cursor-pointer hover:bg-slate-50">
                              <X size={12} className="text-slate-400" />
                              <span className="text-[13px] font-bold text-slate-600">Compare</span>
                              <span className="text-[13px] font-bold text-[#635bff] capitalize">
                                 {compareMode.replace('_', ' ')}
                               </span>
                              <ChevronDown size={12} className="text-slate-400" />
                           </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-56 p-1" align="end">
                           {[
                              { id: 'previous_period', label: 'Previous period' },
                              { id: 'previous_quarter', label: 'Previous quarter' },
                              { id: 'previous_year', label: 'Previous year' },
                              { id: 'previous_month', label: 'Previous month' }
                           ].map(m => (
                              <button 
                                key={m.id} 
                                onClick={() => setCompareMode(m.id)}
                                className={cn(
                                  "w-full text-left px-3 py-1.5 text-[13px] font-medium rounded",
                                  compareMode === m.id ? "bg-purple-50 text-[#635bff]" : "hover:bg-slate-50 text-slate-600"
                                )}
                              >
                                 {m.label}
                              </button>
                           ))}
                        </PopoverContent>
                      </Popover>
                   </div>

                   <div className="md:ml-4 flex items-center gap-2">
                       <Button variant="outline" className="h-8 text-[13px] font-bold text-slate-700 gap-1.5 shadow-sm border-slate-200">
                          <Plus size={14} /> Add
                       </Button>
                       <Button variant="outline" className="h-8 text-[13px] font-bold text-slate-700 gap-1.5 shadow-sm border-slate-200">
                          <Settings size={14} /> Edit
                       </Button>
                   </div>
                </div>
             </div>

             {/* Widgets Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <OverviewCard 
                   title="Payments" 
                   value={successfulPayments.toString()}
                   subtext="0 previous period"
                   chart={true}
                />
                <OverviewCard 
                  title="Gross volume" 
                  value={`${getCurrencySymbol(currency)} ${totalVolume.toFixed(2)}`} 
                  subtext={`${getCurrencySymbol(currency)} 0.00 previous period`} 
                  chart={true} 
                />
                <OverviewCard 
                  title="Net volume" 
                  value={`${getCurrencySymbol(currency)} ${totalVolume.toFixed(2)}`} 
                  subtext={`${getCurrencySymbol(currency)} 0.00 previous period`} 
                  chart={true} 
                />
                <OverviewCard 
                   title="Failed payments" 
                   value={failedPayments.toString()}
                   subtext="0 previous period"
                   chart={true}
                />
                <OverviewCard 
                  title="New customers" 
                  value={newCustomersCount.toString()} 
                  subtext="0 previous period" 
                  chart={true} 
                />
                <OverviewCard title="Top customers by spend" />
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
              {/* Asset Category Toggle */}
              <div className="bg-slate-100/50 p-1 rounded-xl flex">
                <button
                  onClick={() => setPayoutCategory('fiat')}
                  className={cn(
                    "flex-1 py-2 text-[12px] font-bold rounded-lg transition-all",
                    payoutCategory === 'fiat' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  FIAT
                </button>
                <button
                  onClick={() => setPayoutCategory('crypto')}
                  className={cn(
                    "flex-1 py-2 text-[12px] font-bold rounded-lg transition-all",
                    payoutCategory === 'crypto' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  CRYPTO
                </button>
              </div>

              {/* Asset Selection */}
              <div className="space-y-3">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Select Asset</p>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(EXCHANGE_RATES)
                    .filter(code => {
                      const isCrypto = ['BTC', 'ETH', 'SOL'].includes(code);
                      return payoutCategory === 'crypto' ? isCrypto : !isCrypto;
                    })
                    .map((code) => (
                      <button
                        key={code}
                        onClick={() => setSelectedPayoutAsset(code)}
                        className={cn(
                          "p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center",
                          selectedPayoutAsset === code 
                            ? "border-[#635bff] bg-purple-50/50 shadow-sm" 
                            : "border-slate-100 bg-slate-50/50 hover:border-slate-200"
                        )}
                      >
                        <span className="text-[14px] font-black text-slate-900">{code}</span>
                        <span className="text-[10px] font-bold text-slate-400">{getCurrencySymbol(code)}</span>
                      </button>
                    ))}
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Amount</p>
                  <p className="text-[11px] font-bold text-slate-500">
                    Available: {getCurrencySymbol(selectedPayoutAsset)}{(balances[isSandbox ? 'sandbox' : 'live']?.[selectedPayoutAsset] || 0).toLocaleString(undefined, { minimumFractionDigits: ['BTC', 'ETH'].includes(selectedPayoutAsset) ? 8 : 2 })}
                  </p>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">{getCurrencySymbol(selectedPayoutAsset)}</div>
                  <input
                    type="number"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#635bff] focus:ring-0 transition-all font-bold text-lg text-slate-900"
                  />
                </div>
              </div>

              {/* Breakdown */}
              {payoutAmount && Number(payoutAmount) > 0 && (
                <div className="bg-slate-50 rounded-2xl p-4 space-y-3 border border-slate-100">
                  <div className="flex justify-between text-[13px] font-medium">
                    <span className="text-slate-500">Gross Amount</span>
                    <span className="text-slate-900 font-bold">{getCurrencySymbol(selectedPayoutAsset)}{Number(payoutAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-[13px] font-medium">
                    <span className="text-slate-500">Platform & Network Fee (2%)</span>
                    <span className="text-slate-600 font-bold">-{getCurrencySymbol(selectedPayoutAsset)}{(Number(payoutAmount) * 0.02).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  {getTaxRates(userRegion).CIT > 0 && (
                    <div className="flex justify-between text-[13px] font-medium">
                      <span className="text-slate-500">{userRegion} CIT ({getTaxRates(userRegion).CIT}%)</span>
                      <span className="text-slate-600 font-bold">-{getCurrencySymbol(selectedPayoutAsset)}{(Number(payoutAmount) * (getTaxRates(userRegion).CIT / 100)).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-slate-200 flex justify-between">
                    <span className="text-sm font-bold text-slate-900 tracking-tight">Net Payout</span>
                    <span className="text-lg font-black text-[#635bff] tracking-tight">
                      {getCurrencySymbol(selectedPayoutAsset)}
                      {(Number(payoutAmount) - (Number(payoutAmount) * 0.02) - (Number(payoutAmount) * (getTaxRates(userRegion).CIT / 100))).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
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
                disabled={!payoutAmount || Number(payoutAmount) <= 0 || Number(payoutAmount) > (balances[isSandbox ? 'sandbox' : 'live']?.[selectedPayoutAsset] || 0)}
                className="w-full bg-[#635bff] hover:bg-[#5249e0] text-white py-6 rounded-2xl font-bold text-lg shadow-xl shadow-purple-600/20 transition-all active:scale-[0.98]"
              >
                Confirm Payout
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
