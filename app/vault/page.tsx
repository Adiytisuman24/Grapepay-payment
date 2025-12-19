'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lock, 
  ShieldCheck, 
  Database, 
  CreditCard, 
  Wallet, 
  Plus, 
  Eye, 
  Trash2, 
  Key, 
  Smartphone,
  CheckCircle2,
  RefreshCcw,
  Globe
} from 'lucide-react';
import { toast } from 'sonner';

export default function VaultPage() {
  const [isRotating, setIsRotating] = useState(false);

  const tokens = [
    { id: 'tok_01', last4: '4242', brand: 'Visa', type: 'Credit', tokens: 1250, status: 'Secured' },
    { id: 'tok_02', last4: '8812', brand: 'Mastercard', type: 'Debit', tokens: 840, status: 'Secured' },
    { id: 'tok_03', last4: 'k8N9', brand: 'Apple Pay', type: 'Wallet', tokens: 12, status: 'Secured' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">GRAPEPAY_MASTER_VAULT</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Lock size={14} className="text-purple-600" />
              PCI-DSS Tier 1 Secure Tokenization & Multi-PSP Orchestration
            </p>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="h-12 border-slate-200 dark:border-slate-800 rounded-2xl px-6 font-bold gap-2">
                <Database size={18} /> Sync Nodes
             </Button>
             <Button onClick={() => { setIsRotating(true); setTimeout(() => { setIsRotating(false); toast.success('Vault keys rotated across all clusters.'); }, 2000); }} className="h-12 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl px-8 font-black shadow-xl shadow-purple-600/20 uppercase tracking-tight">
               <RefreshCcw size={18} className={`mr-2 ${isRotating ? 'animate-spin' : ''}`} />
               Rotate Master Keys
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Tokens Secured', value: '12,500', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
             { label: 'Compliance', value: 'L1 STATUS', icon: Lock, color: 'text-purple-500', bg: 'bg-purple-50' },
             { label: 'Active Nodes', value: '45 Clusters', icon: Database, color: 'text-blue-500', bg: 'bg-blue-50' },
             { label: 'Uptime', value: '100.00%', icon: Globe, color: 'text-green-500', bg: 'bg-green-50' }
           ].map((s) => (
             <Card key={s.label} className="p-8 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[40px] shadow-sm hover:shadow-xl transition-all">
                <div className={`h-12 w-12 rounded-2xl ${s.bg} dark:bg-slate-800 flex items-center justify-center ${s.color} mb-6`}>
                   <s.icon size={24} />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{s.label}</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{s.value}</h3>
             </Card>
           ))}
        </div>

        <Card className="bg-slate-950 border-emerald-600/20 rounded-[48px] p-10 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-12 h-full flex flex-col justify-end opacity-5">
              <ShieldCheck size={160} className="rotate-12" />
           </div>
           <div className="relative z-10 space-y-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div>
                    <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Tokenized_Instruments</h2>
                    <p className="text-slate-400 font-medium">Native multi-vaulting allows you to store card data once and use it across any PSP in your stack.</p>
                 </div>
                 <Button className="h-14 bg-white text-slate-900 hover:bg-slate-50 font-black rounded-2xl px-10 uppercase tracking-tight shadow-2xl">
                    <Plus size={20} className="mr-2" /> New Instrument
                 </Button>
              </div>

              <div className="space-y-4">
                 {tokens.map((t) => (
                   <div key={t.id} className="group p-6 bg-slate-900/50 border border-slate-800 rounded-[32px] hover:border-emerald-600/30 transition-all flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-6">
                         <div className="h-14 w-14 rounded-2xl bg-black flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
                            {t.brand === 'Visa' ? <CreditCard size={28} /> : t.brand === 'Apple Pay' ? <Smartphone size={28} /> : <Wallet size={28} />}
                         </div>
                         <div>
                            <div className="flex items-center gap-3">
                               <h4 className="text-lg font-black text-white uppercase tracking-tight leading-none">{t.brand} •••• {t.last4}</h4>
                               <Badge className="bg-emerald-500/10 text-emerald-500 border-0 font-black text-[9px] gap-1 px-3">PROTECTED <CheckCircle2 size={10}/></Badge>
                            </div>
                            <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-[0.2em]">{t.id} • {t.type} INSTRUMENT • {t.tokens} MAPPED TOKENS</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl border border-slate-800 text-slate-500 hover:text-white"><Eye size={20}/></Button>
                         <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl border border-slate-800 text-slate-500 hover:text-red-500"><Trash2 size={20}/></Button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <Card className="p-8 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[40px] shadow-sm">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8 flex items-center gap-3"><Key className="text-purple-600" /> AES-256-GCM ROTATION</h3>
              <div className="space-y-6">
                 {[
                   { label: 'Cluster NYC_VAULT_01', status: 'Optimal', health: 100 },
                   { label: 'Cluster SGP_VAULT_E2EE', status: 'Optimal', health: 100 },
                   { label: 'Cluster MUM_REDUNDANT', status: 'Active', health: 98 }
                 ].map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                       <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{c.label}</span>
                       <Badge className="bg-green-500/10 text-green-600 border-0 font-black text-[9px]">{c.status}</Badge>
                    </div>
                 ))}
              </div>
           </Card>

           <Card className="p-8 bg-slate-950 border-slate-800 rounded-[40px] shadow-sm relative overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-600/10 to-transparent pointer-none" />
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-8">COMPLIANCE_HEALTH_CHECK</h3>
              <div className="space-y-4">
                 <div className="flex items-center gap-4 text-emerald-500">
                    <CheckCircle2 size={20} />
                    <span className="text-sm font-black uppercase tracking-widest">PCI-DSS 4.0 Attestation Success</span>
                 </div>
                 <div className="flex items-center gap-4 text-emerald-500">
                    <CheckCircle2 size={20} />
                    <span className="text-sm font-black uppercase tracking-widest">SOC2 Type II - Audit Matched</span>
                 </div>
                 <div className="flex items-center gap-4 text-emerald-500">
                    <CheckCircle2 size={20} />
                    <span className="text-sm font-black uppercase tracking-widest">ISO 27001 Certified Nodes</span>
                 </div>
              </div>
              <Button className="h-14 w-full bg-slate-900 border border-slate-800 text-white font-black rounded-2xl mt-10 uppercase tracking-tighter">Download Audit Package</Button>
           </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
