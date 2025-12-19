'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User as UserIcon, 
  Wallet, 
  Shield, 
  Upload, 
  Plus, 
  Trash2, 
  Eye, 
  Globe, 
  Smartphone, 
  CheckCircle2,
  Clock,
  Camera,
  FileText,
  CreditCard,
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Load simulated user
    const stored = localStorage.getItem('grapepay_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleSaveProfile = () => {
    setIsProcessing(true);
    toast.info('Broadcasting profile update to identity clusters...');
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Identity synchronized successfully.');
    }, 2000);
  };

  const wallets = [
    { id: '1', name: 'Primary MetaMask', address: '0x71C...42e1', chain: 'Ethereum', verified: true },
    { id: '2', name: 'Phantom Business', address: '8A2u...k8N9', chain: 'Solana', verified: true }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">MASTER_IDENTITY</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <UserIcon size={14} className="text-purple-600" />
              Secure profile & cryptographic credentials
            </p>
          </div>
          <div className="flex items-center gap-3">
             <Badge className="h-10 px-4 bg-green-500/10 text-green-600 border-0 font-black gap-2 rounded-xl">
               <ShieldCheck size={16} /> KYC_TIER_2_VERIFIED
             </Badge>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-10">
          <TabsList className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-2 rounded-[32px] h-fit md:h-16 gap-2">
            {[
              { id: 'profile', label: 'User_Profile', icon: UserIcon },
              { id: 'wallets', label: 'Wallet_Nodes', icon: Wallet },
              { id: 'kyc', label: 'Compliance', icon: FileText },
              { id: 'security', label: 'Access_Logs', icon: Shield },
            ].map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-purple-600 data-[state=active]:shadow-lg rounded-[24px] px-6 h-full font-black text-xs uppercase tracking-widest gap-2">
                <tab.icon size={16} /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="profile" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-1 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[40px] p-8 text-center flex flex-col items-center justify-center space-y-6">
                 <div className="relative group">
                    <div className="h-40 w-40 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 p-1">
                       <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center font-black text-6xl text-white">
                          {user?.businessName?.charAt(0) || 'G'}
                       </div>
                    </div>
                    <button className="absolute bottom-2 right-2 h-10 w-10 bg-white shadow-xl rounded-full flex items-center justify-center text-slate-900 border border-slate-100 hover:scale-110 transition-all">
                       <Camera size={20} />
                    </button>
                 </div>
                 <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{user?.businessName || 'GrapePay Business'}</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 italic">{user?.email || 'master@grapepay.io'}</p>
                 </div>
                 <div className="w-full pt-6 border-t border-slate-50 dark:border-slate-800 grid grid-cols-2 gap-4">
                    <div className="text-center">
                       <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status</p>
                       <p className="text-sm font-black text-green-500 uppercase">Active</p>
                    </div>
                    <div className="text-center">
                       <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Member Since</p>
                       <p className="text-sm font-black text-slate-900 dark:text-white uppercase">Dec 2024</p>
                    </div>
                 </div>
              </Card>

              <Card className="lg:col-span-2 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[40px] p-10 space-y-8">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400"><Eye size={24} /></div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">Identity Specifications</h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Merchant Name</label>
                       <Input value={user?.businessName} className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 font-bold" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Support Email</label>
                       <Input value={user?.email} className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 font-bold" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Nexus</label>
                       <Input placeholder="+1 (555) 000-0000" className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 font-bold" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Region</label>
                       <Select defaultValue="Global">
                          <SelectTrigger className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 font-bold"><SelectValue /></SelectTrigger>
                          <SelectContent><SelectItem value="Global">Global Operations</SelectItem><SelectItem value="Asia">Asia Pacific</SelectItem></SelectContent>
                       </Select>
                    </div>
                 </div>
                 <Button onClick={handleSaveProfile} disabled={isProcessing} className="h-14 bg-purple-600 hover:bg-purple-500 text-white rounded-[24px] px-10 font-black shadow-xl shadow-purple-600/20 uppercase tracking-tight">
                    Update Master Identity
                 </Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="wallets" className="space-y-8">
            <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[40px] p-10">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600"><Wallet size={24} /></div>
                     <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">Cryptographic Wallets</h3>
                  </div>
                  <Button className="h-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl px-6 font-black uppercase tracking-tight shadow-lg">Link External Node</Button>
               </div>
               <div className="space-y-4">
                  {wallets.map((w) => (
                    <div key={w.id} className="group flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[28px] hover:border-blue-600/50 transition-all cursor-pointer">
                       <div className="flex items-center gap-6">
                          <div className="h-14 w-14 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shadow-sm">
                             <CreditCard size={28} />
                          </div>
                          <div>
                             <div className="flex items-center gap-3">
                                <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">{w.name}</h4>
                                <Badge className="bg-green-500/10 text-green-600 border-0 font-black text-[9px] gap-1">VERIFIED <CheckCircle2 size={10}/></Badge>
                             </div>
                             <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">{w.address} • {w.chain}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-red-500"><Trash2 size={20}/></Button>
                          <MoreVertical size={18} className="text-slate-300" />
                       </div>
                    </div>
                  ))}
               </div>
            </Card>
          </TabsContent>

          <TabsContent value="kyc" className="space-y-8">
             <Card className="bg-slate-950 p-10 rounded-[48px] border-emerald-600/20 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 h-full flex flex-col justify-between items-end opacity-10">
                   <ShieldCheck size={140} className="rotate-6" />
                </div>
                <div className="relative z-10 space-y-10">
                   <div className="max-w-xl space-y-4">
                      <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase">Compliance_Vault</h2>
                      <p className="text-slate-400 font-medium">Your account is fully compliant with global AML/KYC standards. All transaction limits are currently elevated to Enterprise Tier.</p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { label: 'Business Identity', status: 'Approved', icon: CheckCircle2 },
                        { label: 'Proof of Treasury', status: 'Approved', icon: CheckCircle2 },
                        { label: 'AML Screening', status: 'Optimal', icon: ShieldCheck }
                      ].map((card, i) => (
                        <div key={i} className="p-8 bg-slate-900/50 border border-slate-800 rounded-[32px] space-y-4">
                           <div className="h-10 w-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500"><card.icon size={20}/></div>
                           <div>
                              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{card.label}</p>
                              <p className="text-xl font-black text-white uppercase tracking-tight">{card.status}</p>
                           </div>
                        </div>
                      ))}
                   </div>

                   <Button className="h-16 px-10 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[24px] font-black text-lg uppercase tracking-tight italic">
                      View Compliance Certificates
                   </Button>
                </div>
             </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-8">
             <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[40px] p-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600"><Shield size={24} /></div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">Access Ledger</h3>
                    </div>
                </div>
                <div className="space-y-4">
                   {[
                     { device: 'MacBook Pro 16 (M3 Max)', loc: 'Mumbai, IN', time: 'Active Currently', current: true },
                     { device: 'iPhone 15 Pro', loc: 'Mumbai, IN', time: '14h ago', current: false },
                     { device: 'Web Console (Postman)', loc: 'Singapore Edge', time: '2d ago', current: false },
                   ].map((it, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[28px] group hover:border-purple-600/30 transition-all cursor-pointer">
                         <div className="flex items-center gap-5">
                            <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-purple-600 transition-colors shadow-sm">
                              {it.device.includes('iPhone') ? <Smartphone size={24}/> : <Globe size={24}/>}
                            </div>
                            <div>
                               <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">{it.device}</p>
                               <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{it.loc} • {it.time}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            {it.current && <Badge className="bg-purple-600 text-white font-black border-0 px-4">CURRENT</Badge>}
                            <ChevronRight size={18} className="text-slate-200 group-hover:text-purple-600 transition-colors" />
                         </div>
                      </div>
                   ))}
                </div>
             </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
