'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { DashboardLayout } from '../dashboard/DashboardLayout';
import { cn } from '@/lib/utils';
import { 
  MessageSquare, 
  Link as LinkIcon, 
  Settings, 
  Maximize2, 
  X,
  ChevronRight,
  ChevronDown,
  Terminal,
  Activity,
  AlertCircle,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Info
} from 'lucide-react';

interface DevelopersLayoutProps {
  children: React.ReactNode;
}

export function DevelopersLayout({ children }: DevelopersLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [businessName, setBusinessName] = useState('nextpayments');
  const [isShellOpen, setIsShellOpen] = useState(true);
  const [shellInput, setShellInput] = useState('');
  const [shellOutput, setShellOutput] = useState<string[]>([]);

  useEffect(() => {
    const userStr = localStorage.getItem('grapepay_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setBusinessName(user.business_name || user.name || 'nextpayments');
      } catch (e) {}
    }
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', href: '/developers' },
    { id: 'webhooks', label: 'Webhooks', href: '/developers/webhooks' },
    { id: 'events', label: 'Events', href: '/developers/events' },
    { id: 'logs', label: 'Logs', href: '/developers/logs' },
    { id: 'health', label: 'Health', href: '/developers/health' },
    { id: 'inspector', label: 'Inspector', href: '/developers/inspector' },
    { id: 'blueprints', label: 'Blueprints', href: '/developers/blueprints' },
    { id: 'shell', label: 'Shell', href: '/developers/shell' },
  ];

  const handleShellCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && shellInput.trim()) {
      setShellOutput(prev => [...prev, `> ${shellInput}`, `Executing ${shellInput}...`]);
      setShellInput('');
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-white">
        {/* Workbench Header */}
        <div className="flex items-center justify-between px-6 h-14 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-[14px] font-bold text-slate-900 tracking-tight">Workbench</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-slate-600 transition-colors"><MessageSquare size={18} /></button>
            <button className="text-slate-400 hover:text-slate-600 transition-colors"><LinkIcon size={18} /></button>
            <div className="w-px h-4 bg-slate-200" />
            <button className="text-slate-400 hover:text-slate-600 transition-colors"><MoreHorizontal size={18} /></button>
            <button className="text-slate-400 hover:text-slate-600 transition-colors"><Maximize2 size={16} /></button>
            <button className="text-slate-400 hover:text-slate-600 transition-colors" onClick={() => router.push('/')}><X size={18} /></button>
          </div>
        </div>

        {/* Developer Tabs */}
        <div className="flex items-center gap-6 px-6 h-12 border-b border-slate-100 shrink-0 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => router.push(tab.href)}
              className={cn(
                "h-full text-[13px] font-bold transition-all relative whitespace-nowrap",
                pathname === tab.href ? "text-[#635bff]" : "text-slate-500 hover:text-slate-900"
              )}
            >
              {tab.label}
              {pathname === tab.href && (
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#635bff]" />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto relative pb-32">
          {children}
        </div>

        {/* Global Shell (matches images) */}
        <div className={cn(
          "fixed bottom-0 left-64 right-0 border-t border-slate-200 bg-white z-40 transition-all duration-300",
          isShellOpen ? "h-32" : "h-10"
        )}>
          <div className="flex items-center justify-between px-4 h-10 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-1.5 py-0.5 bg-blue-50 border border-blue-200 rounded text-[10px] font-bold text-[#635bff]">
                Shell <span className="opacity-60 ml-0.5">Read only</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <ChevronRight size={14} />
                <input 
                  value={shellInput}
                  onChange={(e) => setShellInput(e.target.value)}
                  onKeyDown={handleShellCommand}
                  placeholder="Enter a shell command..."
                  className="bg-transparent border-none outline-none text-[12px] font-mono w-96 text-slate-700 placeholder:text-slate-300"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsShellOpen(!isShellOpen)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <ChevronDown size={14} className={cn("transition-transform", !isShellOpen && "rotate-180")} />
              </button>
              <button className="text-slate-400 hover:text-slate-600 transition-colors"><Maximize2 size={12} /></button>
            </div>
          </div>
          {isShellOpen && (
            <div className="p-3 font-mono text-[11px] overflow-y-auto h-20 text-slate-500 bg-white">
              <div className="space-y-1">
                 {shellOutput.length === 0 ? (
                   <p className="opacity-40 italic">Shell ready for commands...</p>
                 ) : (
                   shellOutput.map((line, i) => <p key={i}>{line}</p>)
                 )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Status Bar (matches images) */}
        <div className="fixed bottom-0 left-0 right-0 h-10 bg-[#f7f8f9] border-t border-slate-200 z-[50] flex items-center justify-between px-4 lg:left-0">
           <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-[12px] font-bold text-slate-600 hover:bg-white px-2 py-1 rounded transition-all border border-transparent hover:border-slate-200">
                 <Terminal size={14} /> Developers
              </button>
           </div>
           <div className="flex items-center gap-4">
              <button className="p-1.5 text-slate-400 hover:text-slate-600"><Activity size={14} /></button>
              <button className="p-1.5 text-slate-400 hover:text-slate-600"><AlertCircle size={14} /></button>
              <button className="p-1.5 text-slate-400 hover:text-slate-600"><Settings size={14} /></button>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
