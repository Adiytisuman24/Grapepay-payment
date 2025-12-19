'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  Plus, 
  HelpCircle, 
  Bell, 
  Settings, 
  ChevronRight, 
  X, 
  ArrowRight,
  Eye,
  MoreHorizontal,
  PlusCircle,
  Edit2,
  ChevronDown,
  Info,
  Calendar as CalendarIcon
} from 'lucide-react';
import { OverviewSection } from '@/components/dashboard/OverviewSection';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { getCurrencyForCountry } from '@/lib/currencies';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [currency, setCurrency] = useState('USD');
  const [grossVolume, setGrossVolume] = useState(0);
  const [balance, setBalance] = useState(0);
  const [chartData, setChartData] = useState([
    { name: '00:00', value: 0 },
    { name: '04:00', value: 0 },
    { name: '08:00', value: 0 },
    { name: '12:00', value: 0 },
    { name: '16:00', value: 0 },
    { name: '20:00', value: 0 },
    { name: '23:59', value: 0 },
  ]);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('grapepay_user');
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

  useEffect(() => {
    // Random simulation removed. Data updates only on actual payments.
  }, []);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="h-8 w-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        {/* Main Content */}
        <div className="p-8 space-y-12">
          <div className="flex items-center justify-between">
             <h1 className="text-[32px] font-bold text-slate-900 tracking-tight">Today</h1>
             <Button variant="outline" className="text-slate-600 font-semibold text-sm">Pay out funds</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             <div className="lg:col-span-8 space-y-12">
                {/* Gross Volume Section */}
                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-slate-500">Gross volume</h3>
                   </div>
                   <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={chartData}>
                            <defs>
                               <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#635bff" stopOpacity={0.1}/>
                                  <stop offset="95%" stopColor="#635bff" stopOpacity={0}/>
                               </linearGradient>
                            </defs>
                            <Area 
                               type="monotone" 
                               dataKey="value" 
                               stroke="#635bff" 
                               strokeWidth={3}
                               fillOpacity={1} 
                               fill="url(#colorValue)" 
                            />
                            <Tooltip />
                         </AreaChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-100">
                      <div>
                         <p className="text-[13px] font-medium text-slate-500 flex items-center justify-between">
                            {currency} balance 
                            <button 
                               onClick={() => router.push('/balances')}
                               className="text-[#635bff] hover:underline"
                             >
                                View
                             </button>
                         </p>
                         <h4 className="text-2xl font-semibold text-slate-900 mt-1">
                            {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}<span className="text-sm ml-1 font-normal opacity-70 italic text-slate-500">{currency}</span>
                            <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full border border-red-500 text-red-500 text-[10px] font-bold">!</span>
                         </h4>
                      </div>
                      <div>
                         <p className="text-[13px] font-medium text-slate-500 flex items-center justify-between">
                            Payouts
                            <button 
                               onClick={() => router.push('/balances')}
                               className="text-[#635bff] hover:underline"
                             >
                               View
                             </button>
                         </p>
                         <h4 className="text-2xl font-semibold text-slate-900 mt-1">—</h4>
                      </div>
                   </div>
                </div>

                {/* Your Overview Section (COMPONETIZED) */}
                <OverviewSection />
             </div>

             {/* Right Sidebar */}
             <div className="lg:col-span-4 space-y-6">
                <Card className="p-6 bg-[#f7f8f9] border-none shadow-none relative rounded-2xl group hover:bg-[#efeff1] transition-colors">
                   <button className="absolute top-4 right-4 text-slate-300 hover:text-slate-600 transition-colors"><X size={16}/></button>
                   <h4 className="text-[14px] font-bold text-slate-900 mb-3 tracking-tight">Recommendations</h4>
                   <p className="text-[13px] text-slate-600 leading-relaxed mb-4 font-medium">
                      Embed a <button className="text-[#635bff] font-bold hover:underline">payment form</button> on your site or redirect to a Grapepay-hosted page.
                   </p>
                   <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                      <button className="text-[#635bff] font-bold hover:underline">Create and send invoices</button> that customers can pay instantly.
                   </p>
                </Card>

                <Card className="p-6 bg-[#f7f8f9] border-none shadow-none rounded-2xl space-y-6 group hover:bg-[#efeff1] transition-colors">
                   <div className="flex items-center justify-between">
                      <h4 className="text-[14px] font-bold text-slate-900 tracking-tight">API keys</h4>
                      <button className="text-[13px] font-bold text-[#635bff] hover:underline">View docs</button>
                   </div>
                   <div className="space-y-4">
                      <div>
                         <p className="text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Publishable key</p>
                         <p className="text-[13px] font-mono text-slate-700 truncate bg-white px-3 py-2 rounded-lg border border-slate-200 font-medium">pk_live_51RoibjDc Lq3...</p>
                      </div>
                      <div className="relative group/key">
                         <p className="text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Secret key</p>
                         <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                            <p className="text-[13px] font-mono text-slate-700 font-medium">••••••••••••</p>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-900"><Eye size={14}/></Button>
                         </div>
                      </div>
                   </div>
                </Card>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
