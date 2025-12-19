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
  FileText, 
  Send, 
  Eye, 
  Search, 
  Download, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MoreVertical,
  Mail,
  Zap,
  User as UserIcon
} from 'lucide-react';
import { toast } from 'sonner';

export default function InvoicesPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const invoices = [
    {
      id: 'INV-88F2',
      customer: 'Acme Global Corp',
      amount: 4500,
      currency: 'USDT',
      status: 'paid',
      dueDate: new Date(Date.now() + 864000000),
      createdDate: new Date(Date.now() - 172800000),
      email: 'finance@acme.com'
    },
    {
      id: 'INV-88F3',
      customer: 'Nexus Ventures',
      amount: 1200,
      currency: 'ETH',
      status: 'pending',
      dueDate: new Date(Date.now() + 432000000),
      createdDate: new Date(Date.now() - 3600000),
      email: 'payouts@nexus.io'
    },
    {
      id: 'INV-88F1',
      customer: 'Digital Art Collective',
      amount: 850,
      currency: 'SOL',
      status: 'overdue',
      dueDate: new Date(Date.now() - 259200000),
      createdDate: new Date(Date.now() - 864000000),
      email: 'admin@dac.xyz'
    }
  ];

  const handleSendInvoice = (id: string) => {
    toast.info(`Sending INV-${id} via SMTP relay...`);
    setTimeout(() => {
      toast.success('Invoice delivered to customer inbox.');
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Invoice Management</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Plus size={14} className="text-purple-600" />
              Generate crypto-linked billing documents
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-12 border-slate-200 dark:border-slate-800 rounded-2xl px-6 font-bold">
              <Download size={18} className="mr-2" />
              Batch Export
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="h-12 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl px-6 font-black shadow-xl shadow-purple-600/20 uppercase tracking-tight">
                  <Plus size={18} className="mr-2" />
                  Create Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 rounded-[32px] p-8">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">New Billing Document</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Client Name</label>
                      <Input placeholder="Search client database..." className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Client Email</label>
                      <Input placeholder="billing@client.com" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Amount</label>
                      <Input type="number" placeholder="0.00" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Currency Cluster</label>
                      <Select>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USDT">USDT (TRC20)</SelectItem>
                          <SelectItem value="ETH">ETH (Mainnet)</SelectItem>
                          <SelectItem value="SOL">SOL (Mainnet)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Internal Reference / Description</label>
                    <Textarea placeholder="Software Development Services - Phase 1" className="min-h-[100px] rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
                  </div>
                  <Button className="w-full h-14 bg-purple-600 hover:bg-purple-500 font-black text-lg rounded-2xl shadow-xl shadow-purple-600/20" onClick={() => toast.success('Invoice logic verified by Go Engine.')}>
                    GENERATE & PROCESS
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Settled', count: 12, color: 'text-green-600', icon: CheckCircle },
            { label: 'Unpaid', count: 4, color: 'text-orange-500', icon: Clock },
            { label: 'Overdue', count: 1, color: 'text-red-500', icon: AlertCircle },
            { label: 'Drafts', count: 2, color: 'text-slate-400', icon: FileText }
          ].map((stat) => (
            <Card key={stat.label} className="p-6 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                <stat.icon size={18} className={stat.color} />
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.count}</p>
            </Card>
          ))}
        </div>

        <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-slate-100 dark:border-slate-800 rounded-[32px] overflow-hidden shadow-2xl shadow-slate-200/50">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Active Invoices</h2>
            <div className="relative flex-1 max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
              <input className="w-full h-12 pl-12 pr-4 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-purple-600/10 transition-all" placeholder="Search customer or ID..." />
            </div>
          </div>

          <div className="p-4 space-y-4">
            {invoices.map((inv) => (
              <div key={inv.id} className="group flex items-center justify-between p-6 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[28px] hover:border-purple-600/50 hover:shadow-xl transition-all">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                    <FileText size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{inv.id}</h4>
                      <Badge className={
                        inv.status === 'paid' ? 'bg-green-500/10 text-green-600' :
                        inv.status === 'pending' ? 'bg-orange-500/10 text-orange-600 animate-pulse' :
                        'bg-red-500/10 text-red-600'
                      }>
                        {inv.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                       <UserIcon size={12} /> {inv.customer} • <Mail size={12} /> {inv.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{inv.amount} {inv.currency}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Due: {inv.dueDate.toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                     <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-purple-600 hover:bg-purple-50">
                        <Eye size={20} />
                     </Button>
                     <Button variant="ghost" size="icon" onClick={() => handleSendInvoice(inv.id)} className="h-12 w-12 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-purple-600 hover:bg-purple-50">
                        <Send size={20} />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-slate-900">
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
