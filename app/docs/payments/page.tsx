'use client';

import { 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Key, 
  Zap, 
  Search, 
  Link as LinkIcon,
  CreditCard,
  Building2,
  FileText,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  Mail,
  Github,
  Globe,
  Coins,
  ShieldCheck,
  Smartphone,
  Layout,
  RefreshCcw,
  Users,
  Wallet,
  Code2,
  Cpu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const paymentOptions = [
  {
    title: "Accept online payments",
    desc: "Build a prebuilt payment form that's optimized for conversion. Embed it in your site or redirect to a GrapePay-hosted payment page.",
    href: "#"
  },
  {
    title: "Create a subscription",
    desc: "Set up recurring billing for your SaaS or e-commerce business.",
    href: "#"
  },
  {
    title: "Receive payouts",
    desc: "Set up your bank account to receive payouts.",
    href: "#"
  }
];

const paymentMethods = [
  {
    title: "Add a payment method",
    desc: "Learn about the types of payment methods that your GrapePay integration can support.",
    href: "#"
  },
  {
    title: "Dynamic payment methods",
    desc: "Dynamically order and display payment methods.",
    href: "#",
    noCode: true
  },
  {
    title: "Faster checkout with Link",
    desc: "Let your customers check out faster with Link.",
    href: "#"
  }
];

const tabs = ["For you", "Online", "In-person", "Subscriptions", "Invoicing"];

export default function PaymentsDocsPage() {
  const [activeTab, setActiveTab] = useState("For you");

  return (
    <div className="max-w-[1200px] mx-auto p-12 lg:p-24 space-y-16">
      {/* Header Section */}
      <section className="space-y-4">
        <h1 className="text-[44px] font-black text-slate-900 tracking-tight leading-none">Payments</h1>
        <p className="text-[20px] text-slate-500 font-medium">Use GrapePay to start accepting payments.</p>
        
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center justify-between mt-8">
          <p className="text-[14px] text-slate-700 font-medium">
            Not ready for a full integration? <Link href="/docs/no-code" className="text-[#635bff] font-bold hover:underline">Get started without writing code.</Link>
          </p>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
        <div className="space-y-6">
          <h2 className="text-[28px] font-black text-slate-900 tracking-tight">Get started</h2>
          <p className="text-[15px] text-slate-500 leading-relaxed font-medium">
            Integrate a GrapePay product to start accepting payments online and in person, embed financial services, power custom revenue models, and more.
          </p>
          <Link href="/docs/use-case" className="flex items-center gap-2 text-[#635bff] font-black uppercase text-[13px] tracking-widest hover:gap-3 transition-all">
             Find your use case <ArrowRight size={16} />
          </Link>
        </div>
        <div className="relative aspect-video rounded-xl border border-slate-100 bg-slate-50 shadow-sm overflow-hidden group">
           {/* Mockup of a checkout page */}
           <div className="absolute inset-0 flex">
              <div className="w-[60%] bg-[#1a1a1a] p-8 space-y-6">
                 <div className="h-4 w-24 bg-slate-700 rounded" />
                 <div className="text-[32px] font-bold text-white">$65.00</div>
                 <div className="space-y-4">
                    <div className="h-40 w-full bg-slate-800 rounded-xl" />
                    <div className="h-4 w-3/4 bg-slate-700 rounded" />
                 </div>
              </div>
              <div className="w-[40%] bg-white p-8 space-y-4 shadow-2xl">
                 <div className="flex gap-2">
                    <div className="h-8 flex-1 bg-black rounded flex items-center justify-center">
                       <div className="h-3 w-8 bg-white opacity-20 rounded" />
                    </div>
                    <div className="h-8 flex-1 bg-slate-100 rounded" />
                 </div>
                 <div className="space-y-3 pt-4">
                    <div className="h-2 w-16 bg-slate-100 rounded" />
                    <div className="h-8 w-full bg-slate-50 rounded" />
                    <div className="h-2 w-24 bg-slate-100 rounded" />
                    <div className="h-8 w-full bg-slate-50 rounded" />
                 </div>
                 <div className="h-10 w-full bg-[#635bff] rounded flex items-center justify-center text-white text-[12px] font-bold mt-4">
                    Pay
                 </div>
              </div>
           </div>
           {/* Link indicator overlay */}
           <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-2 shadow-sm">
              <div className="h-4 w-4 bg-[#635bff] rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Link</span>
           </div>
        </div>
      </section>

      {/* Payment Options Section */}
      <section className="space-y-8 pt-8 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <h2 className="text-[28px] font-black text-slate-900 tracking-tight">Payment options</h2>
        </div>

        <div className="flex items-center gap-6 border-b border-slate-100 pb-0 shadow-[inset_0_-1px_0_0_#f1f5f9]">
           {tabs.map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={cn(
                 "pb-4 text-[13px] font-bold transition-all relative px-1",
                 activeTab === tab ? "text-[#635bff]" : "text-slate-500 hover:text-slate-900"
               )}
             >
               {tab}
               {activeTab === tab && (
                 <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#635bff]" />
               )}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paymentOptions.map((option, idx) => (
            <Card key={idx} className="p-8 border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between min-h-[180px]">
              <div className="space-y-4">
                <h3 className="text-[16px] font-black text-[#635bff] group-hover:underline underline-offset-4">{option.title}</h3>
                <p className="text-[14px] text-slate-500 font-medium leading-relaxed italic">{option.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="space-y-8 pt-12">
        <h2 className="text-[24px] font-black text-slate-900 tracking-tight">Payment methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paymentMethods.map((method, idx) => (
            <Card key={idx} className="p-8 border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between min-h-[180px]">
              <div className="space-y-4">
                <h3 className="text-[16px] font-black text-[#635bff] group-hover:underline underline-offset-4">{method.title}</h3>
                <p className="text-[14px] text-slate-500 font-medium leading-relaxed italic">{method.desc}</p>
                {method.noCode && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-tight">No code required</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Beyond Payments Section */}
      <section className="space-y-8 pt-16 border-t border-slate-100">
        <h2 className="text-[24px] font-black text-slate-900 tracking-tight">Beyond payments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Incorporate your company", desc: "Start a US company from most places in the world using GrapePay Atlas." },
            { title: "Integrate crypto", desc: "Let your users pay in crypto, pay out in crypto, or embed a fiat-to-crypto onramp." },
            { title: "Financial Connections", desc: "Access permissioned data from your users' financial accounts." }
          ].map((item, idx) => (
            <Card key={idx} className="p-8 border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between min-h-[180px]">
              <div className="space-y-4">
                <h3 className="text-[16px] font-black text-[#635bff] group-hover:underline underline-offset-4">{item.title}</h3>
                <p className="text-[14px] text-slate-500 font-medium leading-relaxed italic">{item.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Platforms and Marketplaces Section */}
      <section className="space-y-8 pt-16">
        <h2 className="text-[24px] font-black text-slate-900 tracking-tight">Platforms and marketplaces</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Build a SaaS platform", desc: "Set up a Connect SaaS platform to provide platform services to businesses that collect direct payments from their own customers." },
            { title: "Build a marketplace", desc: "Set up a Connect marketplace to collect payments from customers and pay out a portion to sellers or service providers." },
            { title: "Fund and send payouts", desc: "Send funds directly to your sellers or service providers in their local currency.", noCode: true }
          ].map((item, idx) => (
            <Card key={idx} className="p-8 border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between min-h-[180px]">
              <div className="space-y-4">
                <h3 className="text-[16px] font-black text-[#635bff] group-hover:underline underline-offset-4">{item.title}</h3>
                <p className="text-[14px] text-slate-500 font-medium leading-relaxed italic">{item.desc}</p>
                {item.noCode && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-tight">No code required</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Clone a Sample Project Section */}
      <section className="space-y-8 pt-16">
        <h2 className="text-[24px] font-black text-slate-900 tracking-tight">Clone a sample project</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Accept a payment", platforms: ["WEB", "IOS", "ANDROID"] },
            { title: "Start a simple subscription", platforms: ["WEB", "MOBILE WEB"] },
            { title: "Use a prebuilt checkout form", platforms: ["WEB", "MOBILE WEB"] }
          ].map((item, idx) => (
            <Card key={idx} className="p-8 border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all cursor-pointer group space-y-4">
               <h3 className="text-[16px] font-black text-[#635bff] group-hover:underline underline-offset-4">{item.title}</h3>
               <div className="flex items-center gap-3">
                  <Github size={18} className="text-slate-400" />
                  <div className="flex items-center gap-2">
                     {item.platforms.map((p) => (
                       <span key={p} className="text-[10px] font-bold text-slate-400 tracking-widest">{p}</span>
                     ))}
                  </div>
               </div>
            </Card>
          ))}
        </div>
        <div className="flex justify-end">
           <button className="flex items-center gap-2 text-[#635bff] font-black uppercase text-[13px] tracking-widest hover:gap-3 transition-all">
             Browse our projects <ArrowRight size={16} />
           </button>
        </div>
      </section>

      {/* More Guides Section */}
      <section className="pt-24 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
         <div className="space-y-4">
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest">Payment interfaces</h3>
            <div className="flex flex-col gap-2">
               {["Payment Links", "Checkout", "Web Elements", "In-app Elements"].map((link) => (
                 <Link key={link} href="#" className="text-[13px] font-bold text-[#635bff] hover:underline transition-all w-fit">{link}</Link>
               ))}
            </div>
         </div>
         <div className="space-y-4">
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest">Manage payments</h3>
            <div className="flex flex-col gap-2">
               {["Integration upgrades", "Custom payment flows", "Disputes", "3D Secure"].map((link) => (
                 <Link key={link} href="#" className="text-[13px] font-bold text-[#635bff] hover:underline transition-all w-fit">{link}</Link>
               ))}
            </div>
         </div>
         <div className="space-y-4">
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest">Payment methods</h3>
            <div className="flex flex-col gap-2">
               {["Cards", "Bank debits", "Bank redirects", "Wallets"].map((link) => (
                 <Link key={link} href="#" className="text-[13px] font-bold text-[#635bff] hover:underline transition-all w-fit">{link}</Link>
               ))}
            </div>
         </div>
         <div className="space-y-4">
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest">API basics</h3>
            <div className="flex flex-col gap-2">
               {["API tour", "Payment Intents", "Setup Intents", "Payment Methods"].map((link) => (
                 <Link key={link} href="#" className="text-[13px] font-bold text-[#635bff] hover:underline transition-all w-fit">{link}</Link>
               ))}
            </div>
         </div>
         <div className="space-y-4">
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest">Start developing</h3>
            <div className="flex flex-col gap-2">
               {["Development environment", "API requests", "Build and test", "Build with an LLM"].map((link) => (
                 <Link key={link} href="#" className="text-[13px] font-bold text-[#635bff] hover:underline transition-all w-fit">{link}</Link>
               ))}
            </div>
         </div>
      </section>

      {/* Help & Signup Footer */}
      <section className="pt-24 border-t border-slate-100 flex flex-col md:flex-row justify-between gap-12">
         <div className="space-y-4 flex-1">
            <h3 className="text-[20px] font-black text-slate-900 tracking-tight">Was this page helpful?</h3>
            <div className="flex items-center gap-3">
               <Button variant="outline" className="h-9 gap-2 text-[12px] font-bold border-slate-200 rounded-lg bg-white px-4">
                  <ThumbsUp size={14} className="text-slate-400" /> Yes
               </Button>
               <Button variant="outline" className="h-9 gap-2 text-[12px] font-bold border-slate-200 rounded-lg bg-white px-4">
                  <ThumbsDown size={14} className="text-slate-400" /> No
               </Button>
            </div>
            
            <div className="pt-12 space-y-4">
               {[
                 { icon: HelpCircle, label: 'Need help? Contact Support.' },
                 { icon: FileText, label: 'Check out our changelog.' },
                 { icon: HelpCircle, label: 'Questions? Contact Sales.' },
                 { icon: Sparkles, iconType: 'custom', label: 'LLM? Read llms.txt.' }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-3 group cursor-pointer">
                    {/* @ts-ignore */}
                    <item.icon size={16} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                    <span className="text-[13px] font-bold text-[#635bff] hover:underline">{item.label}</span>
                 </div>
               ))}
            </div>
         </div>

         <div className="space-y-6 flex-1 max-w-md">
            <div className="space-y-2">
               <h3 className="text-[14px] font-black text-slate-900 tracking-tight">Sign up for developer updates:</h3>
               <div className="flex items-center gap-2">
                  <div className="flex-1 h-10 bg-slate-100/50 border border-slate-200 rounded-lg flex items-center px-3 relative group">
                     <Mail size={16} className="text-slate-400 mr-2" />
                     <input 
                       disabled
                       value="nextpaymentslab@gmail.com" 
                       className="bg-transparent text-[13px] font-medium text-slate-700 w-full outline-none"
                     />
                     <button className="absolute right-2 text-[#635bff] font-black text-[11px] uppercase tracking-widest hover:underline">Sign up</button>
                  </div>
               </div>
               <p className="text-[11px] text-slate-400 font-medium">You can unsubscribe at any time. Read our <span className="text-[#635bff] cursor-pointer hover:underline">privacy policy</span>.</p>
            </div>
            
            <div className="flex items-center gap-4 text-[13px] font-bold text-slate-400 uppercase tracking-widest">
               <span>Powered by <span className="text-slate-900 uppercase italic">Markdoc</span></span>
            </div>
         </div>
      </section>
    </div>
  );
}

function Sparkles(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}
