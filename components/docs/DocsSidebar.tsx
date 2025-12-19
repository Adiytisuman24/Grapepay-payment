'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BookOpen, 
  Code2, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Layers,
  ChevronRight,
  BarChart3,
  RotateCcw,
  Lock,
  Route,
  FileText
} from 'lucide-react';

export function DocsSidebar() {
  const pathname = usePathname();

  const menu = [
    {
      group: 'Getting Started',
      items: [
        { label: 'Introduction', href: '/docs', icon: BookOpen },
        { label: 'Architecture', href: '/docs/architecture', icon: Layers },
      ]
    },
    {
      group: 'Core Infrastructure',
      items: [
        { label: 'Cost Observability', href: '/docs/cost-observability', icon: BarChart3 },
        { label: 'Revenue Recovery', href: '/docs/revenue-recovery', icon: RotateCcw },
        { label: 'Master Vault', href: '/docs/vault', icon: Lock },
        { label: 'Intelligent Routing', href: '/docs/routing', icon: Route },
        { label: 'Reconciliation', href: '/docs/reconciliation', icon: FileText },
      ]
    },
    {
      group: 'Frontend Modules',
      items: [
        { label: 'Hyperwidgets SDK', href: '/docs/hyperwidgets', icon: Zap },
        { label: 'Themes & UX', href: '/docs/themes', icon: Code2 },
      ]
    }
  ];

  return (
    <div className="w-80 h-[calc(100vh-120px)] overflow-y-auto pr-8 sticky top-24 border-r border-slate-100 dark:border-slate-800 hidden lg:block scrollbar-hide">
      <div className="space-y-10">
        {menu.map((group) => (
          <div key={group.group} className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 italic">{group.group}</h4>
            <div className="space-y-1">
              {group.items.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href || '#'} 
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-2xl transition-all group
                    ${pathname === item.href ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={pathname === item.href ? 'text-white' : 'text-slate-400 group-hover:text-purple-600'} />
                    <span className="text-sm font-bold uppercase tracking-tighter">{item.label}</span>
                  </div>
                  <ChevronRight size={14} className={pathname === item.href ? 'text-white' : 'text-slate-300 opacity-0 group-hover:opacity-100 transition-all'} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
