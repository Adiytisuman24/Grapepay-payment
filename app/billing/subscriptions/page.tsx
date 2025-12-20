'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Plus } from 'lucide-react';
import Link from 'next/link';

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState('subscriptions');

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Subscriptions</h1>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex items-center gap-6">
            {[
              { id: 'subscriptions', label: 'Subscriptions' },
              { id: 'test-clocks', label: 'Test clocks' },
              { id: 'migrations', label: 'Migrations' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "pb-3 text-sm font-semibold transition-all relative",
                  activeTab === tab.id 
                    ? "text-[#635bff]" 
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#635bff]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <Card className="bg-[#f7f9fc] border-none shadow-none rounded-xl p-16 flex flex-col items-start gap-8">
           <div className="space-y-4 max-w-3xl">
              <h2 className="text-[32px] font-bold text-[#1a1f36] leading-tight tracking-tight">
                 Launch a subscription to earn recurring revenue without writing code
              </h2>
              <p className="text-[#4f566b] text-[18px] font-medium leading-[1.6]">
                 Create the pricing model that suits you, automate your reminders, add discount coupons, enable free trials, and offer prorated billing.
              </p>
           </div>

           <div className="flex items-center gap-4">
              <Button className="bg-[#635bff] hover:bg-[#5851eb] text-white font-bold h-10 px-6 rounded-md shadow-sm transition-all text-[15px]">
                 Create a test subscription
              </Button>
              <Link href="/docs" className="text-[15px] font-bold text-[#635bff] hover:underline">
                 View docs
              </Link>
           </div>
        </Card>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <Card className="bg-[#f7f9fc] border-none shadow-none rounded-xl p-8 space-y-4 hover:bg-slate-100/50 transition-colors group cursor-pointer">
              <h3 className="text-[18px] font-bold text-slate-900">Create a payment link</h3>
              <p className="text-slate-500 font-medium text-[14px]">
                 Sell products without a website. The same link can be shared with many customers.
              </p>
              <Link href="/payments/links" className="text-[14px] font-bold text-[#635bff] hover:underline block pt-2">
                 Create a payment link
              </Link>
           </Card>

           <Card className="bg-[#f7f9fc] border-none shadow-none rounded-xl p-8 space-y-4 hover:bg-slate-100/50 transition-colors group cursor-pointer">
              <h3 className="text-[18px] font-bold text-slate-900">Design an integration</h3>
              <p className="text-slate-500 font-medium text-[14px]">
                 Learn what choices you need to make to integrate subscriptions into your business.
              </p>
              <Link href="/docs" className="text-[14px] font-bold text-[#635bff] hover:underline block pt-2">
                 View docs
              </Link>
           </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
