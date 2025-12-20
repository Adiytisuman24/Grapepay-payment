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

export default function TerminalPage() {
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES_AND_CURRENCIES.find(c => c.country === 'India') || COUNTRIES_AND_CURRENCIES[0]
  );

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
            <h1 className="text-[28px] font-bold text-slate-900 tracking-tight flex items-center gap-3">
               Terminal
               <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-bold rounded border border-slate-200 uppercase tracking-wide">Terminal</span>
            </h1>
            
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
          </div>

          {/* Hero Section */}
          <div className="max-w-3xl mt-12 space-y-8">
             <div className="space-y-4">
                <h2 className="text-[32px] font-bold text-slate-900 tracking-tight leading-tight">
                   Build your perfect point of sale
                </h2>
                <p className="text-[16px] text-slate-600 leading-relaxed font-medium max-w-2xl">
                   Integrate your own in-person checkout using flexible developer tools, pre-certified card readers, and cloud-based hardware management.
                </p>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium pt-2">
                   You must build an integration with your point of sale system to process in-person payments with Stripe Terminal.
                </p>
             </div>

             <div className="flex items-center gap-3 pt-2">
                <Button className="h-9 bg-[#635bff] hover:bg-[#4d45e6] text-white font-bold px-4 shadow-sm rounded-md transition-colors">
                   Get started
                </Button>
                <Button variant="outline" className="h-9 bg-white border-slate-200 text-slate-700 font-bold px-4 shadow-sm hover:bg-slate-50 rounded-md transition-colors">
                   Learn more
                </Button>
             </div>
             
             <p className="text-[13px] text-slate-500 font-medium">
                Pricing starts at 2.5% + {formatCurrency(0.20)} per successful transaction. Other fees may apply.
             </p>
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
