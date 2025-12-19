'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  CreditCard, 
  Smartphone, 
  Globe, 
  Smartphone as Phone, 
  Wallet, 
  Layout, 
  Settings, 
  Code2, 
  ArrowRight,
  ChevronRight,
  Eye,
  CheckCircle2,
  RefreshCcw,
  Palette
} from 'lucide-react';
import { toast } from 'sonner';

export default function HyperwidgetsPage() {
  const [activeTab, setActiveTab] = useState('demo');
  const [selectedWidget, setSelectedWidget] = useState('apple');
  const [isConfiguring, setIsConfiguring] = useState(false);

  const apms = [
    { id: 'apple', label: 'Apple Pay', icon: Smartphone, color: 'bg-black text-white' },
    { id: 'google', label: 'Google Pay', icon: Globe, color: 'bg-white text-slate-900 border' },
    { id: 'paypal', label: 'PayPal', icon: Wallet, color: 'bg-blue-600 text-white' },
    { id: 'klarna', label: 'Klarna BNPL', icon: Zap, color: 'bg-pink-400 text-white' },
    { id: 'bank', label: 'Pay by Bank', icon: Layout, color: 'bg-emerald-600 text-white' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
             <div className="flex items-center gap-3">
                <Badge className="bg-purple-600 text-white border-0 font-black px-3 py-1 rounded-full text-[9px] uppercase tracking-widest">v2.4 Core</Badge>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">HYPERWIDGETS_STUDIO</h1>
             </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mt-2">
              <Zap size={14} className="text-purple-600 fill-purple-600" />
              Low-code embeddable APMs for modular checkout enhancement
            </p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="h-12 border-slate-200 dark:border-slate-800 rounded-2xl px-6 font-bold gap-2">
                <Palette size={18} /> Theme Editor
             </Button>
             <Button className="h-12 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl px-8 font-black shadow-xl shadow-purple-600/20 uppercase tracking-tight">
               Generate SDK Key
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Sidebar Options */}
           <div className="lg:col-span-3 space-y-6">
              <Card className="p-6 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[32px] shadow-sm">
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Connector_Hub</h3>
                 <div className="space-y-2">
                    {apms.map((apm) => (
                       <button
                          key={apm.id}
                          onClick={() => setSelectedWidget(apm.id)}
                          className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${selectedWidget === apm.id ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'hover:bg-slate-50 text-slate-500'}`}
                       >
                          <div className="flex items-center gap-3">
                             <apm.icon size={18} />
                             <span className="text-xs font-black uppercase tracking-tight">{apm.label}</span>
                          </div>
                          <div className={`h-1.5 w-1.5 rounded-full ${selectedWidget === apm.id ? 'bg-white' : 'bg-green-500'}`} />
                       </button>
                    ))}
                 </div>
              </Card>

              <Card className="p-6 bg-slate-950 border-slate-800 rounded-[32px] text-white space-y-4">
                 <div className="flex items-center gap-2 text-purple-400">
                    <Code2 size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest italic">SDK_Reference</span>
                 </div>
                 <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Embed our master script to enable all APMs with zero backend changes.</p>
                 <code className="block p-3 bg-black rounded-xl text-[9px] font-mono text-purple-300">
                    {'<script src="gp.js" />'}
                 </code>
              </Card>
           </div>

           {/* Main Viewer */}
           <div className="lg:col-span-9 space-y-8">
              <Card className="bg-slate-50 dark:bg-slate-950 border-0 rounded-[56px] p-12 relative overflow-hidden flex flex-col items-center min-h-[500px] justify-center text-center">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
                 
                 <div className="relative z-10 max-w-lg space-y-8">
                    <div className="space-y-4">
                       <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase underline decoration-purple-600 decoration-8 underline-offset-8 mb-6">Universal_Checkout_Node</h2>
                       <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">Simulating merchant checkout context (Order #88127 • $42.50)</p>
                    </div>

                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                       {/* THE HYPERWIDGET */}
                       <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-2xl space-y-6 border border-slate-100 dark:border-slate-800">
                          <div className="flex items-center justify-between mb-4">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Payment Method</span>
                             <Badge className="bg-emerald-50 text-emerald-600 border-0 font-black text-[9px]">SECURE_WIDGET_ACTIVE</Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-3">
                             <button className="h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center gap-3 font-black text-slate-900 dark:text-white hover:bg-slate-200 transition-all">
                                <CreditCard size={20} /> PAY WITH CARDS
                             </button>
                             <div className="flex items-center gap-4 py-2">
                                <div className="h-[1px] flex-1 bg-slate-100" />
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Quick Express</span>
                                <div className="h-[1px] flex-1 bg-slate-100" />
                             </div>
                             {/* The Active Widget Button */}
                             <button onClick={() => toast.success(`Processing via ${selectedWidget.toUpperCase()} MESH`)} className={`h-16 rounded-2xl flex items-center justify-center gap-3 font-black text-xl shadow-xl hover:scale-[1.02] transition-all ${apms.find(a => a.id === selectedWidget)?.color}`}>
                                {(() => {
                                   const active = apms.find(a => a.id === selectedWidget);
                                   const Icon = active?.icon || Zap;
                                   return <><Icon size={24} /> {active?.label.toUpperCase()}</>;
                                })()}
                             </button>
                          </div>
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-6">Powered by GrapePay Hyperwidgets Infrastructure</p>
                       </div>
                    </div>
                 </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <Card className="p-8 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[40px] shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 italic">Fragmented_Integration?</h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">Traditional PSPs require weeks of engineering for every new APM. Hyperwidgets enable Apple Pay, Google Pay, PayPal, and 10+ others with a single one-time integration.</p>
                    </div>
                    <div className="mt-8 flex items-center gap-6">
                       <div className="flex flex-col">
                          <span className="text-2xl font-black text-slate-900 dark:text-white">2 Weeks</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Dev Time</span>
                       </div>
                       <ChevronRight className="text-slate-200" />
                       <div className="flex flex-col">
                          <span className="text-2xl font-black text-purple-600">35+ APMs</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Instantly Enabled</span>
                       </div>
                    </div>
                 </Card>

                 <Card className="p-8 bg-slate-950 border-slate-800 rounded-[40px] text-white flex flex-col justify-between group overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent pointer-none" />
                    <div className="relative z-10">
                       <div className="flex items-center gap-3 text-emerald-500 mb-6 font-black uppercase tracking-widest text-[10px]">
                          <CheckCircle2 size={16} /> 100.0% Compatibility
                       </div>
                       <h3 className="text-xl font-black uppercase tracking-tight mb-4 italic leading-tight">Zero Confict<br/>Orchestration</h3>
                       <p className="text-slate-400 text-sm font-medium leading-relaxed">Hyperwidgets coexist with your existing checkout flow. We only handle the APM traffic you route to us through our intelligent UI hooks.</p>
                    </div>
                    <Button className="h-12 bg-white text-slate-900 font-black rounded-xl mt-8 uppercase tracking-tighter">View Connector Docs</Button>
                 </Card>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
