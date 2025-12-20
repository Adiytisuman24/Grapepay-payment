'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Beaker, Plus, ExternalLink, Play } from 'lucide-react';
import Link from 'next/link';

export default function WorkflowsPage() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
              <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Workflows</h1>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
                 <span>Preview</span>
                 <Beaker size={12} className="text-slate-400" />
              </div>
           </div>
           <Button className="bg-[#635bff] hover:bg-[#5851eb] text-white font-bold h-10 px-4 rounded-md shadow-sm transition-all flex items-center gap-2">
              <Plus size={18} />
              <span>Create workflow</span>
           </Button>
        </div>

        <Card className="bg-[#f7f9fc] border-none shadow-none rounded-xl overflow-hidden p-12 flex flex-col lg:flex-row items-center gap-12">
           <div className="flex-1 space-y-8">
              <div className="inline-flex items-center px-2 py-1 bg-white border border-slate-200 rounded text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
                 Workflows
              </div>
              
              <div className="space-y-4">
                 <h2 className="text-[42px] font-bold text-[#1a1f36] leading-tight tracking-tight">Automate your workflows</h2>
                 <p className="text-[#4f566b] text-[18px] font-medium leading-[1.5]">
                    Save time and effort by automating actions on GrapePay with Workflows. Set a trigger, apply conditions and perform a sequence of actions. No code required. <Link href="/docs" className="text-[#635bff] font-bold hover:underline inline-flex items-center gap-1">View docs</Link>
                 </p>
              </div>

              <div className="flex items-center gap-3">
                 <Button className="bg-[#635bff] hover:bg-[#5851eb] text-white font-bold h-10 px-6 rounded-md shadow-sm transition-all">
                    Create workflow
                 </Button>
                 <Button variant="outline" className="h-10 px-6 font-bold border-slate-200 text-slate-600 hover:bg-slate-50 rounded-md shadow-sm transition-all leading-none">
                    View examples
                 </Button>
              </div>
           </div>

           <div className="flex-1 w-full max-w-md">
              <div className="relative bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 overflow-hidden group">
                 {/* Visual workflow graphic matching image */}
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-50" />
                 
                 <div className="relative space-y-12">
                    {/* Node 1 */}
                    <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col gap-2 animate-in slide-in-from-left-4 duration-700">
                       <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">When this happens</span>
                       <div className="h-3 w-3/4 bg-slate-100 rounded-full" />
                    </div>

                    {/* Connecting line */}
                    <div className="absolute left-1/2 top-[72px] bottom-[72px] w-px bg-slate-200" />

                    {/* Node 2 */}
                    <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col gap-2 animate-in slide-in-from-right-4 duration-700 delay-300">
                       <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-[#635bff]">Do this</span>
                       <div className="h-3 w-5/6 bg-blue-50 text-blue-200 rounded-full" />
                    </div>
                 </div>

                 {/* Decorative dots background */}
                 <div className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 pointer-events-none">
                    <div className="grid grid-cols-4 gap-4">
                       {[...Array(16)].map((_, i) => (
                          <div key={i} className="w-1 h-1 bg-slate-400 rounded-full" />
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
