'use client';

import { DevelopersLayout } from '@/components/developers/DevelopersLayout';
import { Search, Plus, CreditCard, FileText, LayoutGrid, Building2, UserCircle, Activity, ChevronRight, Zap, Target, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function BlueprintsPage() {
  const blueprints = [
    {
      title: 'Full integrations',
      desc: 'Step through a full integration with the code samples you need to quickly get started.',
      items: [
        { title: 'Set up future payments', subtitle: 'Save payment details in a Checkout Session and charge your customers later.', steps: '7 steps', calls: '4 API calls', area: 'Payments' },
        { title: 'Invoice payment with hosted page', subtitle: 'Learn how to create and collect payment on an invoice using a hosted payment page.', steps: '8 steps', calls: '6 API calls', area: 'Billing' },
        { title: 'Flat rate subscription with entitlements', subtitle: 'Learn how to create a flat rate subscription with entitlements to manage customer feature access.', steps: '14 steps', calls: '9 API calls', area: 'Billing, Checkout' },
        { title: 'Collect payments as a marketplace', subtitle: 'Collect payments then pay out on your marketplace.', steps: '6 steps', calls: '3 API calls', area: 'Connect, Checkout' },
        { title: 'Facilitate payments as a platform', subtitle: 'Facilitate direct payments to businesses on your platform from their own customers.', steps: '6 steps', calls: '3 API calls', area: 'Connect, Checkout' },
        { title: 'Metered subscription with entitlements', subtitle: 'Learn how to create a usage-based subscription with metering and entitlements to manage customer feature access.', steps: '17 steps', calls: '12 API calls', area: 'Billing, Checkout' },
      ]
    },
    {
      title: 'Testing scenarios',
      desc: 'Learn how to create key resources for your Grapepay integration.',
      items: [
        { title: 'Create an account', subtitle: 'Creates a connected account. Choose between a restricted account and an account that is fully onboarded and verified, enabling either...', steps: '1 step', calls: '1 API call', area: 'Connect' },
        { title: 'Create a direct charge', subtitle: 'Creates a charge directly on a connected account and transfers a collected fee to the platform.', steps: '1 step', calls: '1 API call', area: 'Connect' },
        { title: 'Create a destination charge', subtitle: 'Creates a charge on your platform account where your platform serves as the settlement merchant. Collects fees and immediately...', steps: '1 step', calls: '1 API call', area: 'Connect' },
        { title: 'Create a destination on_behalf_of charge', subtitle: 'Creates a charge on your platform account where a connected account serves as the settlement merchant. Collects fees and...', steps: '1 step', calls: '1 API call', area: 'Connect' },
        { title: 'Trigger a health alert', subtitle: 'Triggers a health alert. Choose the type and status of the health alert.', steps: '1 step', calls: '1 API call', area: 'Health alerts' },
        { title: 'Resolve a health alert', subtitle: 'Resolves a health alert.', steps: '1 step', calls: '1 API call', area: 'Health alerts' },
      ]
    }
  ];

  return (
    <DevelopersLayout>
      <div className="p-10 space-y-12 max-w-[1400px]">
        <div className="space-y-4">
           <h2 className="text-[24px] font-bold text-slate-900 tracking-tight">Blueprints</h2>
           <p className="text-[14px] text-slate-500 font-medium">Build your integration from preconfigured flows or run quick testing scenarios.</p>
        </div>

        <div className="flex items-center gap-3">
           <div className="relative group flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-slate-600" />
              <input 
                placeholder="Search for a blueprint..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] outline-none focus:ring-4 focus:ring-purple-50 transition-all text-slate-700 shadow-sm"
              />
           </div>
           <Button variant="outline" className="h-9 px-3 gap-2 text-[13px] font-bold text-slate-600 bg-white border-slate-200">
              <Box size={14} className="text-slate-400" /> Product
           </Button>
           <Button variant="outline" className="h-9 px-3 gap-2 text-[13px] font-bold text-slate-600 bg-white border-slate-200">
              <Target size={14} className="text-slate-400" /> Type
           </Button>
        </div>

        {blueprints.map((section) => (
           <div key={section.title} className="space-y-6">
              <div className="space-y-1">
                 <h3 className="text-[16px] font-bold text-slate-900">{section.title}</h3>
                 <p className="text-[13px] text-slate-500 font-medium">{section.desc}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {section.items.map((item) => (
                    <div 
                      key={item.title} 
                      className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-slate-200 hover:shadow-md transition-all cursor-pointer group"
                    >
                       <div className="space-y-4">
                          <div className="space-y-2 min-h-[100px]">
                             <h4 className="text-[14px] font-bold text-slate-900 group-hover:text-[#635bff] transition-colors">{item.title}</h4>
                             <p className="text-[12px] text-slate-500 font-medium leading-relaxed">{item.subtitle}</p>
                          </div>
                          <div className="flex flex-col gap-1.5 border-t border-slate-50 pt-4">
                             <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                                <span>{item.steps}</span>
                                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                <span>{item.calls}</span>
                                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                <span>{item.area}</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        ))}
      </div>
    </DevelopersLayout>
  );
}
