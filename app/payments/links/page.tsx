'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { COUNTRIES_AND_CURRENCIES } from '@/lib/currencies';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Search 
} from 'lucide-react';

export default function PaymentLinksPage() {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES_AND_CURRENCIES[245]); // UAE default

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCountry.currencyCode,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Payment Links</h1>
            
            <div className="flex items-center gap-4">
              <Select 
                value={selectedCountry.country} 
                onValueChange={(val) => {
                  const country = COUNTRIES_AND_CURRENCIES.find(c => c.country === val);
                  if (country) setSelectedCountry(country);
                }}
              >
                <SelectTrigger className="h-8 w-[200px] bg-white border-slate-200 text-[13px] font-bold text-slate-600 focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {COUNTRIES_AND_CURRENCIES.map((c) => (
                    <SelectItem key={c.country} value={c.country} className="text-[13px] font-medium">
                      {c.country} ({c.currencyCode})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button className="h-8 bg-[#635bff] hover:bg-[#4d45e6] text-white font-bold px-3 shadow-none rounded-md flex items-center gap-1.5 transition-colors">
                 <Plus size={16} /> Create payment link
              </Button>
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-[#f7f9fc] rounded-lg p-16 flex items-center justify-between gap-12 mt-8">
             <div className="max-w-md space-y-6">
                <h2 className="text-[32px] font-bold text-slate-900 tracking-tight leading-tight">
                   Create a checkout page in a few clicks
                </h2>
                <p className="text-[16px] text-slate-600 leading-relaxed font-medium">
                   Sell products, offer subscriptions, or accept donations with a link—no code required.
                </p>
                <div className="flex items-center gap-3 pt-2">
                   <Button className="h-9 bg-[#635bff] hover:bg-[#4d45e6] text-white font-bold px-4 shadow-sm rounded-md transition-colors">
                      Create payment link
                   </Button>
                   <Button variant="outline" className="h-9 bg-white border-slate-200 text-slate-700 font-bold px-4 shadow-sm hover:bg-slate-50 rounded-md transition-colors">
                      Copy from sandbox
                   </Button>
                </div>
             </div>

             {/* Illustration Mockup */}
             <div className="relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-xl bg-white p-6 w-[480px] border border-slate-100/50">
                <div className="flex gap-8">
                   {/* Left Panel */}
                   <div className="w-[200px] bg-[#009278] rounded-lg p-6 text-white h-[320px] relative overflow-hidden flex flex-col justify-between">
                      <div className="space-y-4 relative z-10">
                         <div className="flex items-center gap-2 text-[11px] font-medium opacity-80">
                            <div className="w-3 h-3 rounded-full bg-white/20" /> Grapepay
                         </div>
                         <div className="space-y-1">
                            <div className="text-[10px] opacity-60 font-medium">Payment for</div>
                            <div className="text-[20px] font-bold">{formatCurrency(19)}</div>
                         </div>
                      </div>
                      
                      <div className="absolute right-[-20px] bottom-10 w-24 h-24 rotate-12 bg-white/10 rounded-lg backdrop-blur-sm z-0" />
                      
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center relative z-10 shadow-lg mt-auto">
                         <div className="w-8 h-8 rounded-full border-4 border-[#f5c645] border-t-transparent -rotate-45" />
                         <div className="absolute bottom-2 right-2 w-4 h-4 bg-[#009278] rounded-full" />
                      </div>
                   </div>

                   {/* Right Panel */}
                   <div className="flex-1 space-y-4 pt-2">
                      <div className="h-8 bg-slate-900 rounded text-white flex items-center justify-center text-[12px] font-bold">Pay</div>
                      <div className="text-[10px] text-center text-slate-400 font-medium">Or pay with card</div>
                      
                      <div className="space-y-3">
                         <div className="space-y-1">
                            <div className="text-[10px] font-bold text-slate-700">Email</div>
                            <div className="h-8 border border-slate-200 rounded px-2 flex items-center text-[12px]">user@example.com</div>
                         </div>
                         <div className="space-y-1">
                            <div className="text-[10px] font-bold text-slate-700">Card information</div>
                            <div className="h-8 border border-slate-200 rounded px-2 flex items-center gap-2">
                               <div className="w-6 h-4 bg-slate-100 rounded" />
                               <div className="text-[12px] flex-1">1234 1234 1234 1234</div>
                               <div className="text-[12px] w-8">MM/YY</div>
                               <div className="text-[12px] w-6">CVC</div>
                            </div>
                         </div>
                         <div className="pt-2">
                            <div className="h-9 bg-[#009278] rounded text-white flex items-center justify-center text-[12px] font-bold">Pay {formatCurrency(19)}</div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Popover Card */}
                <div className="absolute top-1/2 right-[-20px] translate-y-[-50%] bg-white rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-100 p-4 w-[240px] animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex items-start gap-3">
                       <h4 className="text-[13px] font-bold text-[#009278]">Payment link is active</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-medium">
                       Share your payment link to accept payments.
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                       <div className="text-[11px] text-[#635bff] font-medium bg-slate-50 px-2 py-1 rounded border border-slate-100 truncate flex-1">
                          buy.grapepay.com/aDw24H
                       </div>
                       <button className="bg-[#635bff] text-white text-[10px] font-bold px-2 py-1 rounded">Share</button>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
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
