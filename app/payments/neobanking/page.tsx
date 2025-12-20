'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  Plane,
  CreditCard,
  Globe,
  Zap,
  ShieldCheck,
  ArrowRight,
  Landmark,
  Coins,
  Wallet,
  Smartphone,
  ChevronDown,
  User,
  Menu
} from 'lucide-react';
import { useState } from 'react';

export default function NeobankingPage() {
  const [formData, setFormData] = useState({ name: '', pincode: '' });

  const currencies = [
    { code: 'USD', val: '₹83.42' },
    { code: 'EUR', val: '₹90.12' },
    { code: 'GBP', val: '₹105.3' },
    { code: 'AED', val: '₹22.71' },
    { code: 'AUD', val: '₹54.20' },
    { code: 'CAD', val: '₹61.05' },
    { code: 'SGD', val: '₹62.15' },
    { code: 'THB', val: '₹2.28' },
    { code: 'JPY', val: '₹0.55' },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">
        
        {/* Ticker Tape */}
        <div className="bg-[#f7f9fc] border-b border-slate-200 h-10 flex items-center overflow-hidden whitespace-nowrap relative">
           <div className="absolute left-0 top-0 bottom-0 bg-[#f7f9fc] z-10 px-4 flex items-center shadow-[10px_0_20px_-5px_rgba(255,255,255,1)]">
              <span className="bg-[#ef4444] text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">Live</span>
           </div>
           <div className="animate-marquee flex items-center gap-8 pl-24">
              {[...currencies, ...currencies, ...currencies].map((c, i) => (
                 <div key={i} className="flex items-center gap-2 text-[12px] font-medium text-slate-600">
                    <span className="font-bold text-slate-900">{c.code}</span>
                    <span>{c.val}</span>
                 </div>
              ))}
           </div>
        </div>

        {/* Custom Header within Page */}
        <div className="border-b border-slate-100 flex items-center justify-between px-8 py-4 bg-white sticky top-0 z-20">
           <div className="flex items-center gap-8">
              <h2 className="text-2xl font-black italic tracking-tighter text-slate-900">Grapepay</h2>
              
              <div className="hidden md:flex items-center gap-6">
                 <button className="text-[14px] font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1">
                    <span className="bg-blue-100 text-[#635bff] text-[10px] px-1.5 py-0.5 rounded font-bold">New</span>
                    Credit Card
                 </button>
                 <button className="text-[14px] font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1">
                    Forex <ChevronDown size={14} />
                 </button>
                 <button className="text-[14px] font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1">
                    Travel <ChevronDown size={14} />
                 </button>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <Button className="bg-[#635bff] text-white font-bold rounded-full px-6 h-9 hover:bg-[#5851eb]">
                 Get Grapepay App
              </Button>
              <button className="h-9 w-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200">
                 <User size={18} />
              </button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
           {/* Section Tabs */}
           <div className="flex items-center justify-center gap-4 py-8">
              <button className="bg-[#0a2540] text-white px-6 py-2.5 rounded-full text-[14px] font-bold shadow-lg shadow-slate-900/10 transition-transform hover:scale-105">
                 Forex Cards
              </button>
              <button className="bg-[#f3f4f6] text-slate-600 px-6 py-2.5 rounded-full text-[14px] font-bold hover:bg-slate-200 transition-colors">
                 Foreign Currency
              </button>
              <button className="bg-[#f3f4f6] text-slate-600 px-6 py-2.5 rounded-full text-[14px] font-bold hover:bg-slate-200 transition-colors">
                 Send Money Abroad
              </button>
           </div>

           {/* Hero Section */}
           <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-20 pt-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                 
                 {/* Left Content */}
                 <div className="lg:col-span-7 space-y-8 relative z-10">
                    <div className="space-y-4">
                       <h1 className="text-[64px] font-black text-[#0a2540] leading-[0.9] tracking-tight">
                          ZERO FOREX <br/> CARD
                       </h1>
                       <div className="flex items-center gap-2">
                          <h2 className="text-[28px] font-black text-[#635bff] tracking-tight">DELIVERED IN 24 HOURS</h2>
                          <Zap size={28} className="text-amber-400 fill-amber-400 animate-pulse" />
                       </div>
                    </div>

                    <div className="space-y-6 pt-4">
                       {[
                          "No joining fees, no annual fees*, no delivery fees",
                          "Load in INR and spend across 180+ countries at zero forex markup*",
                          "24x7 customer support during international travel"
                       ].map((item, i) => (
                          <div key={i} className="flex items-start gap-4 group">
                             <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-[#635bff] group-hover:border-[#635bff] transition-colors">
                                {i === 0 ? <Wallet size={18} className="text-slate-600 group-hover:text-white" /> : 
                                 i === 1 ? <Globe size={18} className="text-slate-600 group-hover:text-white" /> :
                                 <Smartphone size={18} className="text-slate-600 group-hover:text-white" />}
                             </div>
                             <p className="text-[16px] text-slate-600 font-medium pt-2 max-w-md">{item}</p>
                          </div>
                       ))}
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                       <div className="flex -space-x-3">
                          <img src="https://flagcdn.com/w40/us.png" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="US" />
                          <img src="https://flagcdn.com/w40/eu.png" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="EU" />
                          <img src="https://flagcdn.com/w40/gb.png" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="GB" />
                          <img src="https://flagcdn.com/w40/ae.png" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="AE" />
                          <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 shadow-sm">+180</div>
                       </div>
                       <span className="text-sm font-bold text-slate-400">Accepted worldwide</span>
                    </div>
                 </div>

                 {/* Right Content / Card Visual / Form */}
                 <div className="lg:col-span-5 relative">
                    
                    {/* Floating Card Visual */}
                    <div className="absolute top-10 left-[-180px] w-[380px] h-[240px] z-0 hidden lg:block animate-in slide-in-from-left-10 duration-1000">
                        <div className="relative w-full h-full transform -rotate-12 hover:rotate-0 transition-all duration-500 perspective-1000">
                           <div className="absolute inset-0 bg-gradient-to-br from-[#0a2540] to-[#1a3b5c] rounded-2xl shadow-2xl border border-white/10 p-6 flex flex-col justify-between text-white overflow-hidden">
                              <div className="absolute top-0 right-0 w-40 h-40 bg-[#635bff]/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                              <div className="relative z-10 flex justify-between items-start">
                                 <span className="font-black italic text-xl">Grapepay</span>
                                 <Globe className="text-white/30" />
                              </div>
                              <div className="relative z-10 space-y-4">
                                 <div className="flex gap-2">
                                     <div className="w-8 h-5 bg-yellow-400/80 rounded" />
                                     <div className="w-5 h-5 rounded-full border-2 border-white/50" />
                                 </div>
                                 <div className="flex justify-between items-end">
                                     <p className="font-mono tracking-widest text-sm">**** 4242</p>
                                     <span className="font-bold text-lg italic">VISA</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <Card className="relative z-10 bg-[#f7f9fc] border-none shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 rounded-3xl ml-auto max-w-md">
                        <div className="space-y-6">
                           <div className="space-y-1">
                              <h3 className="text-2xl font-bold text-[#0a2540]">Book a home visit</h3>
                              <p className="text-sm text-slate-500 font-medium">Get your KYC done from the comfort of your home.</p>
                           </div>

                           <div className="space-y-4">
                              <div className="space-y-1.5">
                                 <label className="text-[13px] font-bold text-[#635bff] ml-1">Name *</label>
                                 <Input 
                                    className="bg-white border-slate-200 h-11 text-[15px] font-medium focus:ring-[#635bff] rounded-xl shadow-sm"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                 />
                              </div>
                              <div className="space-y-1.5">
                                 <label className="text-[13px] font-bold text-[#635bff] ml-1">Area Pincode *</label>
                                 <Input 
                                    className="bg-white border-slate-200 h-11 text-[15px] font-medium focus:ring-[#635bff] rounded-xl shadow-sm"
                                    placeholder="e.g. 560038"
                                    value={formData.pincode}
                                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                                 />
                              </div>
                           </div>

                           <Button 
                              className="w-full h-12 bg-slate-200 hover:bg-[#635bff] hover:text-white text-slate-400 font-bold rounded-xl text-[16px] transition-all"
                              disabled={!formData.name || !formData.pincode}
                           >
                              Next
                           </Button>

                           <p className="text-[11px] text-center text-slate-400 font-medium leading-relaxed">
                              By proceeding, you agree to our Terms & Conditions and Privacy Policy.
                           </p>
                        </div>
                    </Card>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </DashboardLayout>
  );
}
