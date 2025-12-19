'use client';

import { DevelopersLayout } from '@/components/developers/DevelopersLayout';
import { ChevronDown, Play, Copy, Globe, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function ShellPage() {
  const [shellActive, setShellActive] = useState(true);

  return (
    <DevelopersLayout>
      <div className="flex h-full bg-white overflow-hidden">
        {/* Main Shell Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between px-4 h-10 border-b border-slate-100 bg-slate-50/30">
             <div className="flex items-center gap-1.5">
                <div className="w-0.5 h-3 bg-[#635bff] rounded-full" />
                <span className="text-[11px] font-bold text-slate-700">Shell</span>
             </div>
             <button className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors">
                <Plus size={12} /> New pane
             </button>
          </div>
          
          <div className="flex-1 p-8 font-mono text-[13px] text-slate-700 space-y-8 overflow-y-auto bg-white overflow-x-hidden">
             {/* Grapepay ASCII Logo */}
             <div className="text-[#635bff] opacity-80 leading-tight select-none">
                <pre className="text-[11px]">
{`   _____   _____             _____   ______  _____             __     __ 
  / ____| |  __ \\     /\\    |  __ \\ |  ____||  __ \\     /\\     \\ \\   / / 
 | |  __  | |__) |   /  \\   | |__) || |__   | |__) |   /  \\     \\ \\_/ /  
 | | |_ | |  _  /   / /\\ \\  |  ___/ |  __|  |  ___/   / /\\ \\     \\   /   
 | |__| | | | \\ \\  / ____ \\ | |     | |____ | |      / ____ \\     | |    
  \\_____| |_|  \\_\\/_/    \\_\\|_|     |______||_|     /_/    \\_\\    |_|    `}
                </pre>
             </div>

             <div className="space-y-4">
                <div className="space-y-1">
                   <p className="font-bold">Welcome to Grapepay Shell!</p>
                   <p className="text-slate-500">Grapepay Shell is a browser-based shell with the Grapepay CLI pre-installed. You can use it to manage your Grapepay resources in test mode:</p>
                </div>
                
                <div className="space-y-1.5 pl-4 border-l-2 border-slate-100 italic font-medium">
                   <p>- View supported Grapepay commands: <span className="text-[#635bff] font-bold not-italic cursor-pointer hover:underline">grapepay help ▷</span></p>
                   <p>- Find webhook events: <span className="text-[#635bff] font-bold not-italic cursor-pointer hover:underline">grapepay trigger [event] ▷</span></p>
                   <p>- Listen for webhook events: <span className="text-[#635bff] font-bold not-italic cursor-pointer hover:underline">grapepay listen ▷</span></p>
                   <p>- Call Grapepay APIs: <span className="text-[#635bff] font-bold not-italic cursor-pointer hover:underline">grapepay [api resource] [operation] (e.g. grapepay customers list ▷)</span></p>
                </div>
             </div>

             <div className="flex items-center gap-2 text-slate-400 group pt-4">
                <span className="font-bold text-[#635bff]">$</span>
                <input 
                  autoFocus
                  className="bg-transparent border-none outline-none flex-1 text-slate-700 placeholder:text-slate-200"
                  placeholder="Enter a shell command..."
                />
             </div>
          </div>
        </div>

        {/* API Explorer Sidebar */}
        <div className="w-[450px] border-l border-slate-100 flex flex-col bg-white">
          <div className="flex items-center justify-between px-6 h-12 border-b border-slate-100 shrink-0">
             <h3 className="text-[14px] font-bold text-slate-900">API Explorer</h3>
             <button className="text-slate-400 hover:text-slate-900 transition-colors"><X size={16} /></button>
          </div>

          <div className="p-6 space-y-6">
             <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                   <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Resource</p>
                   <Button variant="outline" className="w-full justify-between h-10 px-3 text-[13px] font-bold text-slate-700 border-slate-200 bg-white">
                      Resource <ChevronDown size={14} className="text-slate-400" />
                   </Button>
                </div>
                <div className="space-y-1.5">
                   <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Method</p>
                   <Button variant="outline" className="w-full justify-between h-10 px-3 text-[13px] font-bold text-slate-700 border-slate-200 bg-white">
                      Method <ChevronDown size={14} className="text-slate-400" />
                   </Button>
                </div>
             </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4">
             <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 border-dashed">
                < Globe size={24} className="text-slate-300" />
             </div>
             <p className="text-slate-400 text-[13px] font-medium leading-relaxed">
                Select a resource and method to explore the Grapepay API.
             </p>
          </div>

          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
             <button className="text-[13px] font-bold text-[#635bff] hover:underline transition-all active:scale-95">Reset</button>
             <div className="flex items-center gap-2">
                <Button variant="outline" className="h-9 px-3 gap-2 text-[13px] font-bold text-slate-600 border-slate-200 bg-white shadow-sm">
                   <Copy size={14} /> Show code
                </Button>
                <Button className="h-9 px-4 gap-2 text-[13px] font-bold bg-[#635bff] hover:bg-[#5249e0] text-white rounded-lg shadow-lg shadow-purple-200 transition-all active:scale-95">
                   <Play size={14} className="fill-current" /> Run request
                </Button>
             </div>
          </div>
        </div>
      </div>
    </DevelopersLayout>
  );
}

function Plus(props: any) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
