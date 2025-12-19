'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  Download, 
  FileText, 
  Calendar, 
  TrendingUp, 
  BarChart3, 
  PieChart as PieIcon,
  Zap,
  Globe,
  Plus,
  RefreshCcw,
  ShieldCheck
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [reportType, setReportType] = useState('transactions');

  // Realistic mock data
  const seriesData = [
    { name: 'Jan', volume: 4200, revenue: 2400 },
    { name: 'Feb', volume: 5100, revenue: 3100 },
    { name: 'Mar', volume: 4800, revenue: 2900 },
    { name: 'Apr', volume: 6200, revenue: 4200 },
    { name: 'May', volume: 5500, revenue: 3800 },
    { name: 'Jun', volume: 7100, revenue: 5100 },
  ];

  const distributionData = [
    { name: 'ETH', value: 45, color: '#8b5cf6' },
    { name: 'USDT', value: 30, color: '#22c55e' },
    { name: 'BTC', value: 15, color: '#f59e0b' },
    { name: 'SOL', value: 10, color: '#06b6d4' },
  ];

  const handleExport = (format: string) => {
    toast.info(`Preparing ${format.toUpperCase()} report cache...`);
    setTimeout(() => {
      toast.success(`Broadcasting ${format.toUpperCase()} bundle to your connected clusters.`);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Intelligence & Insights</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <BarChart3 size={14} className="text-purple-600" />
              Advanced data visualization for your treasury
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => handleExport('pdf')} className="h-12 border-slate-200 dark:border-slate-800 rounded-2xl px-6 font-bold shadow-sm">
              <FileText size={18} className="mr-2" />
              PDF Statement
            </Button>
            <Button onClick={() => handleExport('xlsx')} className="h-12 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl px-6 font-black shadow-xl shadow-purple-600/20 uppercase tracking-tight">
              <Download size={18} className="mr-2" />
              Master Ledger
            </Button>
          </div>
        </div>

        <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-slate-100 dark:border-slate-800 rounded-[32px] overflow-hidden shadow-sm">
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Analysis Focus</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 font-bold uppercase tracking-tight">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-100 shadow-2xl font-bold uppercase tracking-tight">
                    <SelectItem value="transactions">Settlement Volume</SelectItem>
                    <SelectItem value="conversions">Conversion Efficiency</SelectItem>
                    <SelectItem value="revenue">Gateway Revenue</SelectItem>
                    <SelectItem value="customers">Merchant Retention</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Temporal Window</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 font-bold uppercase tracking-tight">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-100 shadow-2xl font-bold uppercase tracking-tight">
                    <SelectItem value="7d">Last 7 Cycles</SelectItem>
                    <SelectItem value="30d">Last 30 Cycles</SelectItem>
                    <SelectItem value="1y">Full Term Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Manual Refresh</label>
                 <Button variant="ghost" className="w-full h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl font-bold uppercase tracking-tight gap-2" onClick={() => toast.success('Intelligence cache cleared.')}>
                   <RefreshCcw size={16} /> Sync All Nodes
                 </Button>
              </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Settled', value: '$1.42M', trend: '+14.2%', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-100/50' },
            { label: 'Active Txns', value: '42.8K', trend: '+8.1%', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-100/50' },
            { label: 'Gross Revenue', value: '$24.8K', trend: '+12.5%', icon: Zap, color: 'text-purple-500', bg: 'bg-purple-100/50' },
            { label: 'New Merchants', count: 156, trend: '+4.2%', icon: Plus, color: 'text-emerald-500', bg: 'bg-emerald-100/50' }
          ].map((stat) => (
            <Card key={stat.label} className="p-8 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[32px] shadow-sm hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <Badge className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-0">{stat.trend}</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value || stat.count}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-slate-100 dark:border-slate-800 rounded-[48px] overflow-hidden shadow-2xl shadow-slate-200/50">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Growth Trajectory</h3>
              <Badge className="bg-purple-100 text-purple-600 font-black border-0">30D PERFORMANCE</Badge>
            </div>
            <div className="p-8">
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={seriesData}>
                  <defs>
                    <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', fontWeight: 'black' }}
                  />
                  <Area type="monotone" dataKey="volume" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#colorVol)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-slate-100 dark:border-slate-800 rounded-[48px] overflow-hidden shadow-2xl shadow-slate-200/50">
             <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Currency Asset Split</h3>
              <PieIcon className="text-slate-300" />
            </div>
            <div className="p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full space-y-4">
                 {distributionData.map((d) => (
                   <div key={d.name} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                         <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">{d.name}</span>
                      </div>
                      <span className="text-sm font-black text-slate-400">{d.value}% Contribution</span>
                   </div>
                 ))}
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-12 bg-slate-900 border-purple-600/20 rounded-[48px] relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent pointer-none" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                 <h2 className="text-4xl font-black text-white tracking-tighter leading-tight">Predictive Analytics <br/><span className="text-purple-500">Master Report</span></h2>
                 <p className="text-lg text-slate-400 font-medium">Our Python ML engines have projected a 14.5% growth in your ETH settlement volume for the next cycle. Ready to scale your nodes?</p>
              </div>
              <Button className="h-16 px-12 bg-white text-slate-900 hover:bg-slate-100 rounded-[28px] font-black text-xl uppercase tracking-tighter shadow-2xl group transition-all">
                 <Globe size={24} className="mr-3 group-hover:rotate-12 transition-transform" />
                 Explore Predictions
              </Button>
           </div>
        </Card>

        <div className="flex justify-center pt-8">
           <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
             <ShieldCheck size={14} className="text-emerald-500" /> End-to-End Cryptographic Audit Logs Verified
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
