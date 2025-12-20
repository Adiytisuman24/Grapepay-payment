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
  ChevronRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { getCurrencyForCountry } from '@/lib/currencies';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [currency, setCurrency] = useState('USD');
  const [isSandbox, setIsSandbox] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  // Date Picker States
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>({
    from: new Date(2025, 12, 14), // Month is 0-indexed in JS Date? No, actually typical JS Date is 0-indexed for month, but widely often confused. Let's stick to standard new Date().
    to: new Date(2025, 12, 20)
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date(2025, 11)); // Dec 2025

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

  useEffect(() => {
    const userData = localStorage.getItem('grapepay_user');
    const sandboxState = localStorage.getItem('grapepay_sandbox') === 'true';
    setIsSandbox(sandboxState);

    if (!userData) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    if (parsedUser.region) {
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
             <span>Dec 14</span>
             <span>Dec 20</span>
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
                <Button variant="outline" className="text-slate-600 font-bold text-sm h-8 px-4 border-slate-200">
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
                               0.00 <span className="text-sm text-slate-500">{currency}</span>
                            </span>
                            <div className="h-4 w-4 rounded-full border border-red-500 flex items-center justify-center text-[10px] text-red-500 font-bold">!</div>
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
                             Last 7 days <ChevronDown size={12} className="text-[#635bff]" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[600px] p-0" align="start">
                           <div className="flex p-4 gap-4 border-b border-slate-100">
                              <div className="flex items-center gap-2">
                                 <span className="text-[13px] font-medium text-slate-600">Start</span>
                                 <div className="border-2 border-blue-200 rounded-md px-2 py-1 text-[13px] font-bold text-slate-900 bg-blue-50">12 / 14 / 2025</div>
                              </div>
                              <div className="flex items-center gap-2">
                                 <span className="text-[13px] font-medium text-slate-600">End</span>
                                 <div className="border border-slate-200 rounded-md px-2 py-1 text-[13px] font-medium text-slate-900">12 / 20 / 2025</div>
                              </div>
                           </div>
                           <div className="flex">
                              <div className="w-48 border-r border-slate-100 p-2 space-y-1">
                                 {['Last 7 days', 'Last 4 weeks', 'Month to date', 'Quarter to date', 'All time'].map((range) => (
                                    <button 
                                      key={range}
                                      className={cn(
                                        "w-full text-left px-3 py-1.5 text-[13px] font-medium rounded-md transition-colors",
                                        range === 'Last 7 days' ? "bg-purple-50 text-[#635bff]" : "text-slate-600 hover:bg-slate-50"
                                      )}
                                    >
                                       {range}
                                    </button>
                                 ))}
                              </div>
                              <div className="flex-1 p-4">
                                 <div className="flex justify-between items-center mb-4">
                                    <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft size={16} className="text-slate-400"/></button>
                                    <span className="text-[14px] font-bold text-slate-700">December 2025</span>
                                    <button className="p-1 hover:bg-slate-100 rounded"><ChevronRight size={16} className="text-slate-400"/></button>
                                 </div>
                                 <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                                       <div key={d} className="text-[11px] font-medium text-slate-400 pb-2">{d}</div>
                                    ))}
                                    {Array.from({length: 31}, (_, i) => i + 1).map((day) => {
                                       const isSelected = day >= 14 && day <= 20;
                                       const isRangeStart = day === 14;
                                       const isRangeEnd = day === 20;
                                       
                                       return (
                                          <div 
                                             key={day} 
                                             className={cn(
                                                "h-8 w-8 flex items-center justify-center text-[13px] rounded-full mx-auto cursor-pointer",
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
                                 <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-100">
                                    <Button variant="outline" size="sm" className="h-8 text-[13px]">Clear</Button>
                                    <Button size="sm" className="h-8 text-[13px] bg-[#635bff] hover:bg-[#544dc9]">Apply</Button>
                                 </div>
                              </div>
                           </div>
                        </PopoverContent>
                      </Popover>

                      <div className="w-px h-4 bg-slate-200 mx-1" />
                      <button className="text-[13px] font-bold text-slate-700 px-3 py-1 hover:bg-slate-50 rounded flex items-center gap-1">
                         Daily <ChevronDown size={12} className="text-slate-400" />
                      </button>
                   </div>
                   
                   <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 px-3 h-8 bg-white border border-slate-200 rounded-md shadow-sm cursor-pointer hover:bg-slate-50">
                         <X size={12} className="text-slate-400" />
                         <span className="text-[13px] font-bold text-slate-600">Compare</span>
                         <span className="text-[13px] font-bold text-[#635bff]">Previous period</span>
                         <ChevronDown size={12} className="text-slate-400" />
                      </div>
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
                <OverviewCard title="Payments" />
                <OverviewCard 
                  title="Gross volume" 
                  value={`${currency === 'USD' ? '$' : currency === 'INR' ? '₹' : 'AED'} 0.00`} 
                  subtext={`${currency === 'USD' ? '$' : currency === 'INR' ? '₹' : 'AED'} 0.00 previous period`} 
                  chart={true} 
                />
                <OverviewCard 
                  title="Net volume" 
                  value={`${currency === 'USD' ? '$' : currency === 'INR' ? '₹' : 'AED'} 0.00`} 
                  subtext={`${currency === 'USD' ? '$' : currency === 'INR' ? '₹' : 'AED'} 0.00 previous period`} 
                  chart={true} 
                />
                <OverviewCard title="Failed payments" />
                <OverviewCard 
                  title="New customers" 
                  value="0" 
                  subtext="0 previous period" 
                  chart={true} 
                />
                <OverviewCard title="Top customers by spend" />
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
