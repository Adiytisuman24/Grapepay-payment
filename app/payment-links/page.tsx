'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Link as LinkIcon, 
  Copy, 
  QrCode, 
  Share2, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Globe,
  ExternalLink,
  MoreVertical,
  MousePointerClick
} from 'lucide-react';
import { toast } from 'sonner';

export default function PaymentLinksPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const paymentLinks = [
    {
      id: 'LNK-8812',
      title: 'Monthly Subscription - Pro',
      amount: 49,
      currency: 'USDT',
      status: 'active',
      visits: 842,
      conversions: 156,
      url: 'https://pay.grapepay.io/pro-sub-8812'
    },
    {
      id: 'LNK-8813',
      title: 'Consultation Fee',
      amount: 250,
      currency: 'USDC',
      status: 'active',
      visits: 124,
      conversions: 12,
      url: 'https://pay.grapepay.io/consult-8813'
    },
    {
      id: 'LNK-8811',
      title: 'Donation Drive 2024',
      amount: 'Flexible',
      currency: 'Any',
      status: 'expired',
      visits: 2100,
      conversions: 450,
      url: 'https://pay.grapepay.io/donate-2024'
    }
  ];

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('Payment URL copied to clipboard');
  };

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Payment Gateways</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <LinkIcon size={14} className="text-purple-600" />
              Direct payment URLs for global checkout
            </p>
          </div>
          <div className="flex items-center gap-3">
             <Dialog>
              <DialogTrigger asChild>
                <Button className="h-12 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl px-6 font-black shadow-xl shadow-purple-600/20 uppercase tracking-tight">
                  <Plus size={18} className="mr-2" />
                  Generate New Link
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 rounded-[32px] p-8">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Create Payment Link</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
                    <Input placeholder="What are you selling?" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Amount</label>
                      <Input type="number" placeholder="0.00" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Currency</label>
                      <Select>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USDT">USDT</SelectItem>
                          <SelectItem value="USDC">USDC</SelectItem>
                          <SelectItem value="SOL">SOL</SelectItem>
                          <SelectItem value="any">Flexible (Multi-Asset)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Slug URL</label>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">pay.grapepay.io/</span>
                        <Input placeholder="my-awesome-product" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
                    </div>
                  </div>
                  <Button className="w-full h-14 bg-purple-600 hover:bg-purple-500 font-black text-lg rounded-2xl shadow-xl shadow-purple-600/20" onClick={() => toast.success('Link generated and indexed by cluster.')}>
                    DEPLOY LINK
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Links', count: 18, color: 'text-purple-600', icon: LinkIcon, bg: 'bg-purple-100/50' },
            { label: 'Link Visits', count: '14.2K', color: 'text-blue-600', icon: MousePointerClick, bg: 'bg-blue-100/50' },
            { label: 'Conversions', count: 890, color: 'text-green-600', icon: CheckCircle2, bg: 'bg-green-100/50' },
            { label: 'Active Rate', count: '92%', color: 'text-orange-600', icon: Zap, bg: 'bg-orange-100/50' }
          ].map((stat) => (
            <Card key={stat.label} className="p-8 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[32px] shadow-sm hover:shadow-xl transition-all">
               <div className="flex items-center justify-between mb-4">
                 <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                   <stat.icon size={24} />
                 </div>
                 <Badge variant="secondary" className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest">30D AVG</Badge>
               </div>
               <div className="space-y-1">
                 <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.count}</p>
               </div>
            </Card>
          ))}
        </div>

        <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-slate-100 dark:border-slate-800 rounded-[32px] overflow-hidden shadow-2xl shadow-slate-200/50">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Link Repository</h2>
            <div className="relative flex-1 max-w-md group">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
              <input className="w-full h-12 pl-12 pr-4 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-purple-600/10 transition-all" placeholder="Search slugs or titles..." />
            </div>
          </div>

          <div className="p-4 space-y-4">
            {paymentLinks.map((lnk) => (
              <div key={lnk.id} className="group flex items-center justify-between p-6 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[28px] hover:border-purple-600/50 hover:shadow-xl transition-all">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-purple-600 transition-colors">
                    <LinkIcon size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-1">
                      <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{lnk.title}</h4>
                      <Badge className={
                        lnk.status === 'active' ? 'bg-green-500/10 text-green-600 flex items-center gap-1.5' :
                        'bg-red-500/10 text-red-600 flex items-center gap-1.5 font-black'
                      }>
                        <div className={`w-1.5 h-1.5 rounded-full ${lnk.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                        {lnk.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                       <span className="flex items-center gap-1"><MousePointerClick size={12} /> {lnk.visits} Visits</span>
                       <span className="flex items-center gap-1"><CheckCircle2 size={12} /> {lnk.conversions} Sales</span>
                       <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[10px] font-black">{lnk.id}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                        {lnk.amount === 'Flexible' ? 'Flexible' : `${lnk.amount} ${lnk.currency}`}
                    </p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 justify-end">
                      <Globe size={10} /> Public Checkout
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                     <Button variant="ghost" size="icon" onClick={() => handleCopyLink(lnk.url)} className="h-12 w-12 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-all">
                        <Copy size={20} />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-all">
                        <QrCode size={20} />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-all">
                        <Share2 size={20} />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-slate-900 transition-all">
                        <MoreVertical size={20} />
                     </Button>
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
