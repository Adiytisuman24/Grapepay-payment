'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  BarChart3, 
  Code2, 
  Database, 
  Target, 
  Fingerprint, 
  ShieldAlert, 
  CreditCard, 
  Zap, 
  Receipt,
  Globe,
  ShieldCheck,
  Building2,
  TrendingUp,
  Layout,
  Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ReportsPage() {
  const sections = [
    {
      title: "Track money movement",
      desc: "Understand the activity in your GrapePay account, focused on how activity, fees, and payouts affect your balance.",
      items: [
        { name: "Balance summary", icon: FileText, href: "#" }
      ]
    },
    {
      title: "Automate accounting",
      desc: "Automated, interactive revenue reports to help you understand your business performance, recognize revenue, and facilitate month-end close.",
      items: [
        { name: "Revenue recognition", icon: BarChart3, href: "/reporting/revenue-recognition" }
      ]
    },
    {
      title: "Custom reports and data analysis",
      desc: "Build custom reports with SQL and AI-assisted natural language prompts. Export data to your warehouse or business intelligence tools.",
      items: [
        { name: "Sigma custom reports", icon: Code2, href: "/reporting/sigma" },
        { name: "Export to data warehouse", icon: Database, href: "/reporting/data-management" }
      ]
    },
    {
      title: "Payments analytics",
      desc: "Analyze key metrics and reports about your payments performance.",
      items: [
        { name: "Acceptance analytics", icon: Target, href: "#" },
        { name: "Authentication analytics", icon: Fingerprint, href: "#" },
        { name: "Disputes analytics", icon: ShieldAlert, href: "#" },
        { name: "Payment methods analytics", icon: CreditCard, href: "#" },
        { name: "Optimization analytics", icon: Zap, href: "#", badge: "New" }
      ]
    },
    {
      title: "Operational reports",
      desc: "Analyze the operational effectiveness of your GrapePay integration, across payments, fraud, and more.",
      items: [
        { name: "Billing analytics", icon: Receipt, href: "#" },
        { name: "GrapePay tax", icon: Globe, href: "/tax" },
        { name: "Radar analytics", icon: ShieldCheck, href: "#" },
        { name: "Connect analytics", icon: Building2, href: "#" },
        { name: "Connect margin", icon: TrendingUp, href: "#", badge: "New" },
        { name: "Card monitoring programs", icon: Layout, href: "#" },
        { name: "Crypto onramp", icon: Cpu, href: "#" }
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Reports</h1>

        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.title} className="space-y-6">
              <div className="space-y-1.5">
                <h2 className="text-[16px] font-bold text-slate-900">{section.title}</h2>
                <p className="text-[14px] text-slate-500 font-medium leading-relaxed max-w-4xl">
                  {section.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {section.items.map((item) => (
                  <Card 
                    key={item.name} 
                    className="p-4 border border-slate-200 shadow-none rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-slate-50 border border-slate-100 rounded-md flex items-center justify-center text-slate-500 group-hover:text-[#635bff] transition-colors">
                        <item.icon size={16} />
                      </div>
                      <span className="text-[14px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                        {item.name}
                      </span>
                    </div>
                    {item.badge && (
                      <Badge className="bg-indigo-50 text-[#635bff] border-none font-bold text-[10px] h-5">
                        {item.badge}
                      </Badge>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
