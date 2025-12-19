'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Terminal, 
  ChevronRight, 
  Copy, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  ArrowRight,
  Code2,
  Globe,
  Lock,
  RotateCcw,
  BarChart3,
  FileText,
  Route
} from 'lucide-react';
import { toast } from 'sonner';

export default function DocsPage() {
  const codeSnippet = `// Initialize GrapePay Multi-Module Node Client
const grapepay = require('@grapepay/node')({
  apiKey: 'gp_sec_luna_...829',
  modules: ['vault', 'routing', 'hyperwidgets']
});

// Configure a modular intelligent retry strategy
const strategy = await grapepay.recovery.deploy({
  bin_logic: true,
  penalty_avoidance: true,
  retry_split: 'dynamic'
});

console.log('RECOVERY_ENGINE_ACTIVE');`;

  return (
    <DashboardLayout>
      <div className="flex gap-12 pt-4">
        <DocsSidebar />
        
        <div className="flex-1 space-y-12 animate-in fade-in slide-in-from-right-4 duration-700 pb-20">
          <div className="space-y-6 max-w-4xl">
            <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 border-0 font-black px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px]">
              V2.4 Modular Architecture
            </Badge>
            <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight italic uppercase">
              The_Future_of_Modular_Payments
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              GrapePay offers a modular, open-source payments infrastructure designed for absolute control. Businesses can pick and integrate only the modules they need on top of their existing stack without vendor lock-in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { icon: BarChart3, label: 'Cost Observability', text: 'Audit, observe, and optimize your processing fees with real-time anomaly detection.' },
               { icon: RotateCcw, label: 'Revenue Recovery', text: 'Tackle passive churn with intelligent retry strategies tailored to card bin & region.' },
               { icon: Lock, label: 'Master Vault', iconColor: 'text-emerald-500', text: 'Securely store tokens, bank credentials, and card details across all your PSPs.' }
             ].map((box, i) => (
               <Card key={i} className="p-8 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[40px] hover:shadow-2xl transition-all group cursor-pointer">
                  <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 w-fit mb-6 ${box.iconColor || 'text-purple-600'} group-hover:scale-110 transition-transform`}>
                    <box.icon size={28} />
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight mb-3 italic">{box.label}</h4>
                  <p className="text-xs font-medium text-slate-400 leading-relaxed">{box.text}</p>
               </Card>
             ))}
          </div>

          <div className="space-y-8">
             <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">Module_Integration_Node</h2>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-75" />
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-150" />
                </div>
             </div>

             <Card className="bg-slate-950 border-slate-800 rounded-[32px] overflow-hidden shadow-2xl">
                <div className="px-6 py-4 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Terminal size={14} className="text-slate-500" />
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">app.js</span>
                   </div>
                   <Button variant="ghost" size="icon" onClick={() => { navigator.clipboard.writeText(codeSnippet); toast.success('Modular SDK snippet copied.'); }} className="h-8 w-8 text-slate-500 hover:text-white"><Copy size={14} /></Button>
                </div>
                <CardContent className="p-8">
                   <pre className="font-mono text-sm text-purple-400 leading-relaxed overflow-x-auto">
                      <code>{codeSnippet}</code>
                   </pre>
                </CardContent>
             </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <Card className="p-10 bg-slate-900 border-0 rounded-[48px] text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 h-full flex flex-col justify-end opacity-10 group-hover:opacity-20 transition-opacity">
                   <Zap size={140} className="rotate-12" />
                </div>
                <div className="relative z-10 space-y-6">
                   <h3 className="text-3xl font-black italic uppercase tracking-tighter">Hyperwidgets SDK</h3>
                   <p className="text-slate-400 font-medium">Embed our modular, low-code APM widget to augment your existing checkout with Apple Pay, Google Pay, and 35+ more methods instantly.</p>
                   <Button className="h-14 px-8 bg-white text-slate-900 hover:bg-slate-50 rounded-2xl font-black uppercase tracking-widest">Connect APMs <ArrowRight size={16} className="ml-2"/></Button>
                </div>
             </Card>

             <Card className="p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[48px] shadow-sm hover:shadow-xl transition-all group">
                <div className="flex items-center gap-4 mb-6">
                   <div className="h-14 w-14 rounded-2xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600"><FileText size={28} /></div>
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">Unified Reconciliation</h3>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-8">Simplify operations with a unified reconciliation framework for automated 2-way or 3-way matching across banks and processors.</p>
                <div className="flex gap-2 flex-wrap">
                   {['Fetching APIs', 'Variance Audit', 'Staggered Recon', 'Output Customization'].map(f => (
                     <Badge key={f} className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-black border-0 px-4 py-1 rounded-full text-[9px] uppercase tracking-widest">{f}</Badge>
                   ))}
                </div>
             </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { icon: Route, label: 'Intelligent Routing', text: 'Selection of PSP with highest auth rate per context.' },
               { icon: Globe, label: 'Open Source Core', text: 'Audit every line of code. Complete infrastructure control.' },
               { icon: Cpu, label: 'Go/Python Engine', text: 'High-speed execution with ML-driven risk orchestration.' }
             ].map((box, i) => (
               <div key={i} className="p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all group">
                  <box.icon size={20} className="text-slate-400 group-hover:text-purple-600 transition-colors mb-4" />
                  <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2 italic">{box.label}</h4>
                  <p className="text-[10px] font-medium text-slate-400 leading-relaxed">{box.text}</p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Badge({ children, variant, className }: any) {
  return (
    <div className={`inline-flex items-center font-bold px-2 py-0.5 rounded text-xs ${className}`}>
      {children}
    </div>
  );
}
