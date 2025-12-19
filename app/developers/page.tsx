'use client';

import { DevelopersLayout } from '@/components/developers/DevelopersLayout';
import { Card } from '@/components/ui/card';
import { CheckCircle2, ExternalLink, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DevelopersPage() {
  return (
    <DevelopersLayout>
      <div className="p-8 space-y-12 max-w-[1400px]">
        <div className="flex items-center justify-between">
           <h2 className="text-[24px] font-bold text-slate-900 tracking-tight">Your integration</h2>
           <div className="flex items-center gap-2">
              <Button variant="outline" className="h-8 text-[12px] font-bold text-slate-600 bg-white border-slate-200">
                 Last 7 days <ChevronDown size={14} className="ml-2 text-slate-400" />
              </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-8 space-y-12">
              <div className="grid grid-cols-2 gap-x-12 gap-y-12">
                 {/* API Requests */}
                 <div className="space-y-4">
                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">API requests</h3>
                    <div className="h-[200px] border border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50/50">
                       <p className="text-[13px] text-slate-400 font-medium">No requests in the last 7 days</p>
                    </div>
                 </div>

                 {/* API Error Distribution */}
                 <div className="space-y-4">
                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">API error distribution</h3>
                    <div className="h-[200px] border border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50/50">
                       <p className="text-[13px] text-slate-400 font-medium">No errors in the last 7 days</p>
                    </div>
                 </div>

                 {/* Event Deliveries */}
                 <div className="space-y-4">
                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Event deliveries</h3>
                    <div className="h-[200px] border border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50/50">
                       <p className="text-[13px] text-slate-400 font-medium">No deliveries in the last 7 days</p>
                    </div>
                 </div>

                 {/* Event Destination Response Time */}
                 <div className="space-y-4">
                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Event destination response time</h3>
                    <div className="h-[200px] border border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50/50">
                       <p className="text-[13px] text-slate-400 font-medium">No deliveries in the last 7 days</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-12">
              {/* Health */}
              <div className="space-y-6">
                 <h2 className="text-[24px] font-bold text-slate-900 tracking-tight">Health</h2>
                 <Card className="p-8 flex flex-col items-center text-center space-y-4 border-slate-100 shadow-sm">
                    <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
                       <CheckCircle2 className="text-green-500" size={32} />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-[16px] font-bold text-slate-900">No active alerts, errors, or insights</h4>
                       <p className="text-[14px] text-slate-500 font-medium">Your integration is running smoothly</p>
                    </div>
                 </Card>
              </div>

              {/* Developer Resources */}
              <div className="space-y-6">
                 <h2 className="text-[24px] font-bold text-slate-900 tracking-tight">Developer resources</h2>
                 <div className="space-y-4">
                    {[
                      'Developer quick start',
                      'Documentation',
                      'API reference',
                      'Code samples'
                    ].map((item) => (
                      <button key={item} className="flex items-center justify-between w-full group">
                         <span className="text-[14px] font-bold text-[#635bff] group-hover:underline">{item}</span>
                         <ExternalLink size={14} className="text-slate-400 group-hover:text-slate-600" />
                      </button>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DevelopersLayout>
  );
}
