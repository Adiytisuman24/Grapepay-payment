'use client';

import { useState } from 'react';
import { DevelopersLayout } from '@/components/developers/DevelopersLayout';
import { Search, Calendar, Info, ChevronRight, RefreshCw, Filter, Clock, Globe, Copy, MoreHorizontal, Settings, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function LogsPage() {
  const [selectedLog, setSelectedLog] = useState(0);

  const logs = [
    { id: 'req_a9CsT0w46IxvnH', method: 'POST', path: '/v1/payment_intents', status: 200, time: '11:00:30 PM', date: 'Dec 4' },
    { id: 'req_b2DsT0w46IxvnH', method: 'POST', path: '/v1/payment_intents', status: 200, time: '11:00:02 PM', date: 'Dec 4' },
    { id: 'req_c3DsT0w46IxvnH', method: 'POST', path: '/v1/payment_intents', status: 200, time: '10:58:56 PM', date: 'Dec 4' },
    { id: 'req_d4DsT0w46IxvnH', method: 'POST', path: '/v1/payment_intents', status: 200, time: '10:58:54 PM', date: 'Dec 4' },
    { id: 'req_e5DsT0w46IxvnH', method: 'POST', path: '/v1/payment_intents', status: 200, time: '10:58:31 PM', date: 'Dec 4' },
    { id: 'req_f6DsT0w46IxvnH', method: 'POST', path: '/v1/payment_intents', status: 200, time: '10:57:43 PM', date: 'Dec 4' },
    { id: 'req_g7DsT0w46IxvnH', method: 'POST', path: '/v1/payment_intents', status: 400, time: '10:57:15 PM', date: 'Dec 4', error: true },
    { id: 'req_h8DsT0w46IxvnH', method: 'POST', path: '/v1/payment_intents', status: 400, time: '10:57:03 PM', date: 'Dec 4', error: true },
    { id: 'req_i9DsT0w46IxvnH', method: 'POST', path: '/v1/payment_intents', status: 400, time: '10:56:52 PM', date: 'Dec 4', error: true },
    { id: 'req_j0DsT0w46IxvnH', method: 'POST', path: '/v1/payment_intents', status: 400, time: '10:56:34 PM', date: 'Dec 4', error: true },
    { id: 'req_k1DsT0w46IxvnH', method: 'POST', path: '/v1/payment_intents', status: 200, time: '10:56:17 PM', date: 'Dec 4' },
  ];

  return (
    <DevelopersLayout>
      <div className="flex flex-col h-full bg-white">
        {/* Filters Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
           <div className="flex items-center gap-3">
              <div className="relative group">
                 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-slate-600" />
                 <input 
                   placeholder="Filter by resource ID..." 
                   className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-purple-100 transition-all w-64 text-slate-700"
                 />
              </div>
              <div className="flex items-center gap-2">
                {[
                  { label: 'Date', icon: Calendar },
                  { label: 'Status', icon: Info },
                  { label: 'HTTP method', icon: Info, val: 'POST, DELETE' },
                  { label: 'API endpoint', icon: Globe },
                  { label: 'IP address', icon: Globe },
                ].map(f => (
                  <Button key={f.label} variant="outline" className="h-8 text-[12px] font-bold text-slate-600 bg-white border-slate-200 gap-1.5 px-2.5 shadow-sm">
                     <f.icon size={12} className="text-slate-400" /> 
                     {f.label} {f.val && <span className="text-[#635bff] ml-1 uppercase">{f.val}</span>}
                  </Button>
                ))}
                <button className="h-8 text-[12px] font-bold text-slate-400 hover:text-slate-600 px-2 transition-colors">Clear filters</button>
                <button className="h-8 text-[12px] font-bold text-[#635bff] hover:underline px-2 transition-colors">Reset filters</button>
              </div>
           </div>
           <Button variant="outline" className="h-8 text-[12px] font-bold text-slate-600 bg-white border-slate-200 gap-2">
              <Settings size={14} /> Edit columns
           </Button>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
           {/* Logs List */}
           <div className="w-[480px] border-r border-slate-100 flex flex-col bg-white">
              <div className="px-6 py-4 flex items-center justify-between bg-slate-50/20">
                 <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Dec 4, 2025</span>
                 <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-slate-400">Updated today 7:10:28 PM IST</span>
                    <button className="text-[11px] font-bold text-[#635bff] hover:underline flex items-center gap-1">
                       <RefreshCw size={10} /> Refresh
                    </button>
                 </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                 {logs.map((log, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedLog(idx)}
                      className={cn(
                        "w-full px-4 py-3 flex items-center gap-4 text-left border-b border-slate-50 transition-all group relative",
                        selectedLog === idx ? "bg-white ring-1 ring-[#635bff] z-10 shadow-sm" : "hover:bg-slate-50"
                      )}
                    >
                       <div className={cn(
                         "min-w-[50px] px-2 py-0.5 rounded text-[10px] font-black text-center border",
                         log.status === 200 ? "bg-green-50 text-green-600 border-green-200" : "bg-red-50 text-red-600 border-red-200"
                       )}>
                          {log.status} {log.status === 200 ? 'OK' : 'ERR'}
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                             <span className="text-[12px] font-bold text-[#635bff] tracking-tight">{log.method} <span className="text-slate-900">{log.path}</span></span>
                             <span className="text-[11px] font-bold text-slate-400">{log.time}</span>
                          </div>
                       </div>
                       {selectedLog === idx && (
                         <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#635bff]" />
                       )}
                    </button>
                 ))}
              </div>
           </div>

           {/* Log Details */}
           <div className="flex-1 overflow-y-auto bg-slate-50/20">
              <div className="p-8 space-y-8 max-w-[900px]">
                 <div className="space-y-6">
                    <div>
                       <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">API request</p>
                       <h3 className="text-[18px] font-bold text-[#635bff] tracking-tight">{logs[selectedLog].method} <span className="text-slate-900">{logs[selectedLog].path}</span></h3>
                    </div>

                    <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                       <div className="space-y-4">
                          <div className="flex items-center gap-4">
                             <div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                <div className={cn(
                                  "px-2 py-0.5 rounded text-[11px] font-black border",
                                  logs[selectedLog].status === 200 ? "bg-green-50 text-green-600 border-green-200" : "bg-red-50 text-red-600 border-red-200"
                                )}>
                                   {logs[selectedLog].status} {logs[selectedLog].status === 200 ? 'OK' : 'ERR'}
                                </div>
                             </div>
                             <div className="flex-1">
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Request ID</p>
                                <p className="text-[13px] font-medium text-[#635bff] flex items-center gap-2 hover:underline cursor-pointer">
                                   {logs[selectedLog].id} <Copy size={12} className="text-slate-300" />
                                </p>
                             </div>
                          </div>
                          <div>
                             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time</p>
                             <p className="text-[13px] font-bold text-slate-700">Dec 4, 2025, {logs[selectedLog].time} IST</p>
                          </div>
                          <div>
                             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">IP address</p>
                             <p className="text-[13px] font-bold text-slate-700">34.162.43.94</p>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <div>
                             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">API version</p>
                             <p className="text-[13px] font-bold text-[#635bff] flex items-center gap-1.5 hover:underline cursor-pointer">
                                2025-11-17.clover <ExternalLink size={12} />
                             </p>
                          </div>
                          <div>
                             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Idempotency key</p>
                             <p className="text-[13px] font-medium text-slate-600">Key — Grapepay-node-retry-35fc5bc4-4bad-4a3d-a181-29bbc5d449e1</p>
                          </div>
                          <div>
                             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">User agent</p>
                             <p className="text-[13px] font-medium text-slate-600 tracking-tight">Grapepay/v1 NodeBindings/20.0.0</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Response Body JSON */}
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <h4 className="text-[14px] font-bold text-slate-900 tracking-tight">Response body</h4>
                       <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors bg-white rounded-md border border-slate-100 shadow-sm"><Copy size={14}/></button>
                    </div>
                    <div className="bg-[#1a1c24] rounded-xl p-6 font-mono text-[12px] text-slate-300 overflow-x-auto shadow-2xl">
                       <pre className="space-y-1">
                          {`{
  "id": "pi_3SagMMDcLq3VFmkC31VijvxA",
  "object": "payment_intent",
  "amount": 50000,
  "amount_capturable": 0,
  ...
}`}
                       </pre>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DevelopersLayout>
  );
}
