'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Plus, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function InvoicesPage() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500">
        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Invoices</h1>

        {/* Hero Section */}
        <Card className="bg-[#f7f9fc] border-none shadow-none rounded-xl p-16 flex flex-col items-center text-center space-y-8">
           <div className="space-y-4 max-w-3xl">
              <h2 className="text-[48px] font-bold text-[#1a1f36] leading-tight tracking-tight">
                 Get your invoices paid fast with GrapePay Invoicing
              </h2>
              <p className="text-[#4f566b] text-[18px] font-medium leading-[1.6]">
                 Let customers pay invoices online with a link, accept payments by card and bank transfer, send automatic reminders, and give customers a portal to manage their invoices.
              </p>
           </div>

           <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-4">
                 <Button className="bg-[#635bff] hover:bg-[#5851eb] text-white font-bold h-10 px-6 rounded-md shadow-sm transition-all text-[15px]">
                    Create a test invoice
                 </Button>
                 <Button variant="outline" className="h-10 px-6 font-bold border-slate-200 text-slate-600 hover:bg-slate-50 rounded-md shadow-sm transition-all inline-flex items-center gap-2">
                    <span>Watch demo</span>
                 </Button>
              </div>
              <p className="text-[14px] text-slate-500">
                 Pay as you go - <Link href="#" className="text-[#635bff] font-bold hover:underline">View plans</Link>
              </p>
           </div>
        </Card>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <Card className="bg-[#f7f9fc] border-none shadow-none rounded-xl p-8 space-y-4 hover:bg-slate-100/50 transition-colors group cursor-pointer h-full flex flex-col justify-between">
              <div className="space-y-4">
                 <h3 className="text-[16px] font-bold text-slate-900">Brand and customize your invoices</h3>
                 <p className="text-slate-500 font-medium text-[14px] leading-relaxed">
                    Add your branding elements, payment methods, schedule reminders, and much more.
                 </p>
              </div>
              <Link href="#" className="text-[14px] font-bold text-[#635bff] hover:underline block pt-4">
                 Invoice settings
              </Link>
           </Card>

           <Card className="bg-[#f7f9fc] border-none shadow-none rounded-xl p-8 space-y-4 hover:bg-slate-100/50 transition-colors group cursor-pointer h-full flex flex-col justify-between">
              <div className="space-y-4">
                 <h3 className="text-[16px] font-bold text-slate-900">Set up your customer portal</h3>
                 <p className="text-slate-500 font-medium text-[14px] leading-relaxed">
                    Give your customers a self-serve GrapePay-hosted portal to pay invoices, check status, download copies, and update their billing information.
                 </p>
              </div>
              <Link href="#" className="text-[14px] font-bold text-[#635bff] hover:underline block pt-4">
                 Set up your portal
              </Link>
           </Card>

           <Card className="bg-[#f7f9fc] border-none shadow-none rounded-xl p-8 space-y-4 hover:bg-slate-100/50 transition-colors group cursor-pointer h-full flex flex-col justify-between">
              <div className="space-y-4">
                 <h3 className="text-[16px] font-bold text-slate-900">Grow your business with Billing</h3>
                 <p className="text-slate-500 font-medium text-[14px] leading-relaxed">
                    Manage customers, collect revenue, close your books, and automate tax collection.
                 </p>
              </div>
              <Link href="/billing/overview" className="text-[14px] font-bold text-[#635bff] hover:underline block pt-4">
                 Go to Billing
              </Link>
           </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
