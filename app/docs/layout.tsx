'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Command,
  HelpCircle,
  Globe,
  Youtube,
  Bug,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Get started', href: '/docs' },
  { name: 'Payments', href: '/docs/payments' },
  { name: 'Revenue', href: '/docs/revenue' },
  { name: 'Platforms and marketplaces', href: '/docs/platforms' },
  { name: 'Money management', href: '/docs/money' },
  { name: 'Developer resources', href: '/docs/resources' },
];

const getStartedGroups = [
  {
    name: 'Overview',
    items: [
      { name: 'Overview', href: '/docs' },
      { name: 'See all products', href: '/docs/products' },
      { name: 'About the APIs', href: '/docs/about-apis', indent: true },
    ]
  },
  {
    name: 'START BUILDING',
    items: [
      { name: 'Create an account', href: '/docs/create-account' },
      { name: 'Quickstarts', href: '/docs/quickstarts', indent: true },
      { name: 'Start developing', href: '/docs/start-developing' },
      { name: 'Build with an LLM', href: '/docs/llm', indent: true },
      { name: 'Use Stripe without code', href: '/docs/no-code' },
      { name: 'Migrate to Stripe', href: '/docs/migrate' },
    ]
  },
  {
    name: 'COMMON USE CASES',
    items: [
      { name: 'Overview', href: '/docs/use-cases' },
      { name: 'Accept simple payments as a startup', href: '/docs/startup' },
      { name: 'Sell subscriptions as a SaaS startup', href: '/docs/saas' },
      { name: 'Build a subscriptions solution with usage-based pricing', href: '/docs/usage-based' },
      { name: 'Accept payments in person', href: '/docs/terminal' },
      { name: 'Send invoices to collect payments', href: '/docs/invoices' },
    ]
  }
];

const paymentsGroups = [
  {
    name: 'Payments Overview',
    items: [
      { name: 'Overview', href: '/docs/payments' },
      { name: 'Accept a payment', href: '/docs/payments/accept' },
      { name: 'Upgrade your integration', href: '/docs/payments/upgrade' },
    ]
  },
  {
    name: 'Online Payments',
    items: [
      { name: 'Overview', href: '/docs/payments/online' },
      { name: 'Find your use case', href: '/docs/payments/use-case' },
      { name: 'Use Payment Links', href: '/docs/payments/links' },
      { name: 'Use a prebuilt checkout page', href: '/docs/payments/checkout' },
      { name: 'Quickstart guides', href: '/docs/payments/quickstarts', indent: true },
      { name: 'How Checkout works', href: '/docs/payments/how-it-works', indent: true },
      { name: 'Customize look and feel', href: '/docs/payments/customize', indent: true },
      { name: 'Collect additional info', href: '/docs/payments/collect-info', indent: true },
      { name: 'Collect taxes', href: '/docs/payments/taxes', indent: true },
      { name: 'Dynamically update checkout', href: '/docs/payments/dynamic', indent: true },
    ]
  }
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isSandbox, setIsSandbox] = useState(false);

  useEffect(() => {
    const loadData = () => {
      const userStr = localStorage.getItem('grapepay_user');
      if (userStr) {
        setUserData(JSON.parse(userStr));
      }
      setIsSandbox(localStorage.getItem('grapepay_sandbox') === 'true');
    };
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const countryFlag = (country: string) => {
    if (!country) return '🌐';
    const flags: Record<string, string> = {
      'India': '🇮🇳',
      'United States of America': '🇺🇸',
      'United Kingdom': '🇬🇧',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
      'Brazil': '🇧🇷',
      'France': '🇫🇷',
      'Germany': '🇩🇪',
      'Japan': '🇯🇵',
      'China': '🇨🇳',
    };
    return flags[country] || '🌐';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-slate-100 z-[100] flex items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[18px] font-black text-slate-900 tracking-tighter uppercase italic">GrapePay</span>
            <span className="text-[12px] font-black text-[#635bff] tracking-widest uppercase">Docs</span>
          </Link>

          <nav className="hidden xl:flex items-center gap-5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-[13px] font-semibold transition-colors",
                  pathname === item.href ? "text-[#635bff]" : "text-slate-600 hover:text-slate-900"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group hidden md:block">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={14} />
            </div>
            <input 
              type="text" 
              placeholder="Search" 
              className="h-8 w-64 bg-slate-100/80 border-transparent focus:bg-white focus:border-slate-200 rounded-lg pl-9 pr-3 text-[13px] font-medium transition-all outline-none"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-400 font-bold uppercase tracking-tight">
               <Command size={10} /> /
            </div>
          </div>

          <Button variant="ghost" className="h-8 px-3 text-[12px] font-bold text-slate-600 gap-1.5 border border-slate-200 rounded-lg hover:bg-slate-50">
             <Sparkles size={14} className="text-[#635bff]" /> Ask AI
          </Button>

          <div className="h-6 w-px bg-slate-200 mx-1" />

          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
                <p className="text-[11px] font-bold text-slate-800 leading-none">{userData?.username || 'nextpayments'}</p>
                <p className="text-[10px] font-medium text-slate-400">{isSandbox ? 'Test mode' : 'Live mode'}</p>
             </div>
             <div className="h-8 w-8 bg-slate-100 rounded border border-slate-200 shadow-sm flex items-center justify-center font-bold text-slate-400">
                {(userData?.username?.[0] || 'N').toUpperCase()}
             </div>
          </div>
          
          <div className="flex items-center gap-1 xl:hidden">
             <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
             </Button>
          </div>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Sidebar */}
         <aside className={cn(
          "fixed top-14 left-0 bottom-0 w-64 border-r border-slate-100 bg-white overflow-y-auto custom-scrollbar z-50 transition-transform xl:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="p-6 pb-20">
             {(pathname.startsWith('/docs/payments') ? paymentsGroups : getStartedGroups).map((group) => (
                <div key={group.name} className="mb-8">
                   <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest px-1 mb-3">{group.name}</h3>
                   <div className="space-y-0.5">
                       {group.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            // @ts-ignore
                            className={cn(
                               "flex items-center py-1 text-[13px] font-medium rounded-md transition-all group",
                               // @ts-ignore
                               item.indent ? "pl-5 text-slate-500 hover:text-slate-800" : "px-2",
                               pathname === item.href 
                                 ? "text-[#635bff] italic font-black" 
                                 // @ts-ignore
                                 : !item.indent && "text-slate-600 hover:text-slate-900"
                            )}
                          >
                             {/* @ts-ignore */}
                             {pathname === item.href && !item.indent && (
                                <ChevronRight size={14} className="mr-1 mt-0.5" />
                             )}
                             {/* @ts-ignore */}
                             {!item.indent && pathname !== item.href && (
                                <ChevronRight size={14} className="mr-1 mt-0.5 opacity-0 group-hover:opacity-40 transition-opacity" />
                             )}
                             {item.name}
                          </Link>
                       ))}
                   </div>
                </div>
             ))}

             <div className="mt-auto pt-8 border-t border-slate-50 space-y-4">
                <div className="flex items-center gap-2 group cursor-pointer">
                   <span className="text-[14px]">{countryFlag(userData?.region)}</span>
                   <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{userData?.region || 'India'}</span>
                </div>
                <div className="flex items-center gap-2 group cursor-pointer">
                   <MessageSquare size={14} className="text-slate-300 group-hover:text-slate-500" />
                   <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">English (United States)</span>
                </div>
             </div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {isSidebarOpen && (
           <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 xl:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 ml-0 xl:ml-64">
           {children}
        </main>
      </div>

      {/* Mini Footer / Status Bar - matching images bottom right/left icons */}
      <div className="fixed bottom-4 right-6 flex items-center gap-3 z-[110]">
         <Button size="icon" variant="ghost" className="h-10 w-10 text-slate-400 bg-white shadow-xl border border-slate-100 rounded-full hover:text-slate-900">
            <Youtube size={18} />
         </Button>
         <Button size="icon" variant="ghost" className="h-10 w-10 text-slate-400 bg-white shadow-xl border border-slate-100 rounded-full hover:text-slate-900">
            <Bug size={18} />
         </Button>
         <Button size="icon" variant="ghost" className="h-10 w-10 text-slate-400 bg-white shadow-xl border border-slate-100 rounded-full hover:text-slate-900">
            <HelpCircle size={18} />
         </Button>
         <Button size="icon" variant="ghost" className="h-10 w-10 text-slate-400 bg-white shadow-xl border border-slate-100 rounded-full hover:text-slate-900">
            <ChevronDown size={18} className="rotate-180" />
         </Button>
      </div>
    </div>
  );
}
