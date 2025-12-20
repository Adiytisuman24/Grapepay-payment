'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink, Info, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import Link from 'next/link';

export default function ProfilesPage() {
  const businesses = [
    {
      name: 'Grubhub',
      handle: '@grubhub',
      logo: 'GH',
      desc: 'Grubhub helps you find and order food from wherever you are.',
      site: 'grubhub.com',
      address: '222 W Merchandise Mart Plaza\nSuite 800\nChicago, IL 60654'
    },
    {
      name: 'Wayfair',
      handle: '@wayfair',
      logo: 'W',
      desc: 'Wayfair is the destination for all things home: helping everyone, anywhere create their feeling of home.',
      site: 'wayfair.com',
      address: '4 Copley Place\n7th Floor\nBoston, MA 02116'
    },
    {
      name: 'Assembled',
      handle: '@assembled',
      logo: 'A',
      desc: 'AI for world-class support operations.',
      site: 'assembled.com',
      address: '2525 16th Street\nSte. #310\nSan Francisco, CA 94103'
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Profiles</h1>

        {/* Hero Card */}
        <Card className="bg-[#f7f9fc] border-none shadow-none rounded-[20px] overflow-hidden flex flex-col md:flex-row min-h-[400px]">
          <div className="flex-1 p-12 flex flex-col justify-center space-y-8">
             <h2 className="text-[40px] font-bold text-slate-900 leading-tight">Create your profile</h2>
             <p className="text-slate-500 text-[18px] font-medium leading-[1.6] max-w-md">
                Your profile is your business&apos;s public identity on GrapePay.
                Set up your profile to find and connect with other businesses using GrapePay.
             </p>
             <div className="flex flex-col space-y-4">
                <Button className="w-fit h-11 px-6 bg-[#635bff] hover:bg-[#5851eb] text-white font-bold rounded-md shadow-sm transition-all text-[15px]">
                   Get started
                </Button>
                <Link href="#" className="text-[14px] font-bold text-[#635bff] hover:underline w-fit">
                   Privacy & terms
                </Link>
             </div>
          </div>
          
          <div className="flex-1 bg-gradient-to-br from-[#12009d] via-[#a855f7] to-[#ec4899] p-8 flex items-center justify-center relative overflow-hidden">
             {/* Abstract Spherical Graphic matching image */}
             <div className="relative w-full aspect-square flex items-center justify-center">
                <div className="absolute w-[20%] aspect-square border-2 border-white/20 rounded-full blur-[1px]" style={{ left: '10%' }} />
                <div className="absolute w-[35%] aspect-square border-2 border-white/30 rounded-full blur-[1px]" style={{ left: '25%' }} />
                <div className="absolute w-[50%] aspect-square border-2 border-white/40 rounded-full blur-[1px]" style={{ left: '50%' }} />
                <div className="absolute w-[70%] aspect-square border-[3px] border-white/60 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)]" style={{ left: '80%' }} />
                <div className="absolute w-full h-px bg-white/20 top-1/2 left-0 right-0" />
                {/* Glow effects */}
                <div className="absolute inset-0 bg-white/5 mix-blend-overlay rotate-45" />
             </div>
          </div>
        </Card>

        {/* About Section */}
        <div className="space-y-4 pt-4">
           <h3 className="text-[20px] font-bold text-slate-900">About GrapePay profiles</h3>
           <p className="text-slate-600 text-[15px] font-medium leading-relaxed max-w-6xl">
              GrapePay profiles are required to enable agentic commerce transactions, monetize a ChatGPT app, share metrics of your business&apos;s financial performance,
              and interact with other businesses across GrapePay. <Link href="#" className="text-[#635bff] font-bold hover:underline">Learn more about GrapePay profiles.</Link>
           </p>
        </div>

        {/* Grid Section */}
        <div className="space-y-8 pt-4">
           <h3 className="text-[20px] font-bold text-slate-900">Other businesses with profiles</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {businesses.map((biz) => (
                 <Card key={biz.name} className="p-8 border border-slate-200 shadow-none rounded-[20px] space-y-6 hover:shadow-lg hover:border-slate-300 transition-all cursor-pointer bg-white group">
                    <div className="flex items-center gap-4">
                       <div className="h-14 w-14 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                          {biz.logo}
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[16px] font-bold text-slate-900">{biz.name}</span>
                          <span className="text-[12px] font-bold text-slate-400 font-mono tracking-tight">{biz.handle}</span>
                       </div>
                    </div>
                    
                    <p className="text-[14px] text-slate-600 font-medium leading-[1.6] h-12 line-clamp-2">
                       {biz.desc}
                    </p>
                    
                    <div className="space-y-4 pt-2">
                       <Link href="#" className="text-[14px] font-bold text-[#635bff] hover:underline block">
                          {biz.site}
                       </Link>
                       <address className="not-italic text-[13px] text-slate-400 font-bold leading-[1.6]">
                          {biz.address.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                       </address>
                    </div>
                 </Card>
              ))}
           </div>
        </div>

        {/* Bottom Status Icons matching Stripe screen */}
        <div className="fixed bottom-4 right-10 flex items-center gap-6 text-slate-400">
           <Layers size={18} className="hover:text-slate-600 cursor-pointer transition-colors" />
           <AlertCircle size={18} className="hover:text-slate-600 cursor-pointer transition-colors" />
           <RefreshCw size={18} className="hover:text-slate-600 cursor-pointer transition-colors" />
           <Info size={18} className="hover:text-slate-600 cursor-pointer transition-colors" />
        </div>
      </div>
    </DashboardLayout>
  );
}
