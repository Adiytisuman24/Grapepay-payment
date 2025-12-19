'use client';

import { useState } from 'react';
import { DevelopersLayout } from '@/components/developers/DevelopersLayout';
import { Search, Calendar, Info, ChevronRight, RefreshCw, Filter, Clock, Globe, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(0);

  const events = [
    { id: 'evt_3SagMMDcLq3VFmkC3F9nZM04', type: 'payment_intent.created', time: '11:00:30 PM', desc: 'A new payment pi_3SagMMDcLq3VFmkC31VijvxA for INR 500.00 was created' },
    { id: 'evt_3SagLuDcLq3VFmkC0g9XF0wE', type: 'payment_intent.created', time: '11:00:02 PM', desc: 'A new payment pi_3SagLuDcLq3VFmkC0g9XF0wE for INR 500.00 was created' },
    { id: 'evt_3SagKqDcLq3VFmkC1oK5fgV3', type: 'payment_intent.created', time: '10:58:56 PM', desc: 'A new payment pi_3SagKqDcLq3VFmkC1oK5fgV3 for INR 500.00 was created' },
    { id: 'evt_3SagKoDcLq3VFmkC0GoeZCIx', type: 'payment_intent.created', time: '10:58:54 PM', desc: 'A new payment pi_3SagKoDcLq3VFmkC0GoeZCIx for INR 500.00 was created' },
    { id: 'evt_3SagKRDcLq3VFmkC1YcsFb29', type: 'payment_intent.created', time: '10:58:31 PM', desc: 'A new payment pi_3SagKRDcLq3VFmkC1YcsFb29 for INR 500.00 was created' },
    { id: 'evt_3SagJfDcLq3VFmkC1K73nDsd', type: 'payment_intent.created', time: '10:57:43 PM', desc: 'A new payment pi_3SagJfDcLq3VFmkC1K73nDsd for INR 500.00 was created' },
    { id: 'evt_3SagHDcLq3VFmkC1XjMe35H', type: 'payment_intent.created', time: '10:56:17 PM', desc: 'A new payment pi_3SagHDcLq3VFmkC1XjMe35H for INR 500.00 was created' },
  ];

  return (
    <DevelopersLayout>
      <div className="flex flex-col h-full">
        {/* Filters Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
           <div className="flex items-center gap-2">
              <div className="relative group">
                 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-slate-600" />
                 <input 
                   placeholder="Find event by ID..." 
                   className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-purple-100 transition-all w-64 text-slate-700"
                 />
              </div>
              {[
                { label: 'Date', icon: Calendar },
                { label: 'Status', icon: Info },
                { label: 'Event type', icon: Info },
                { label: 'Resource', icon: Info },
                { label: 'Payload type', icon: Info },
              ].map(f => (
                <Button key={f.label} variant="outline" className="h-8 text-[12px] font-bold text-slate-600 bg-white border-slate-200 gap-1.5 px-2.5">
                   <f.icon size={12} className="text-slate-400" /> {f.label}
                </Button>
              ))}
           </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
           {/* Event List */}
           <div className="w-[480px] border-r border-slate-100 flex flex-col bg-white">
              <div className="px-6 py-4 flex items-center justify-between bg-slate-50/30">
                 <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Dec 4, 2025</span>
                 <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-slate-400">Updated today 7:09:38 PM IST</span>
                    <button className="text-[11px] font-bold text-[#635bff] hover:underline flex items-center gap-1">
                       <RefreshCw size={10} /> Refresh
                    </button>
                 </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                 {events.map((event, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedEvent(idx)}
                      className={cn(
                        "w-full px-6 py-4 text-left border-b border-slate-50 transition-all group relative",
                        selectedEvent === idx ? "bg-white ring-1 ring-[#635bff] z-10 shadow-sm" : "hover:bg-slate-50"
                      )}
                    >
                       <div className="flex items-center justify-between mb-1">
                          <span className={cn("text-[13px] font-bold", selectedEvent === idx ? "text-[#635bff]" : "text-slate-900")}>
                             {event.type}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400">{event.time}</span>
                       </div>
                       <p className="text-[12px] text-slate-500 font-medium truncate leading-relaxed">
                          {event.desc}
                       </p>
                       {selectedEvent === idx && (
                         <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#635bff]" />
                       )}
                    </button>
                 ))}
                 <div className="px-6 py-4 bg-slate-50/30">
                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Dec 2, 2025</span>
                 </div>
              </div>
           </div>

           {/* Event Details */}
           <div className="flex-1 overflow-y-auto bg-slate-50/20">
              <div className="p-8 space-y-8 max-w-[800px]">
                 <div className="space-y-6">
                    <div>
                       <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Event</p>
                       <h3 className="text-[18px] font-bold text-slate-900">{events[selectedEvent].type}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <div>
                             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Event ID</p>
                             <p className="text-[13px] font-medium text-[#635bff] flex items-center gap-2 hover:underline cursor-pointer">
                                {events[selectedEvent].id} <Copy size={12} className="text-slate-300" />
                             </p>
                          </div>
                          <div>
                             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Origin date</p>
                             <p className="text-[13px] font-bold text-slate-700">Dec 4, 2025, {events[selectedEvent].time} IST</p>
                          </div>
                          <div>
                             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Source</p>
                             <p className="text-[13px] font-bold text-[#635bff] flex items-center gap-2">
                                API <span className="text-slate-400 font-medium hover:underline cursor-pointer">View logs</span>
                             </p>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <div>
                             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">API version</p>
                             <p className="text-[13px] font-bold text-slate-700">2025-06-30.basil</p>
                          </div>
                          <div>
                             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Description</p>
                             <p className="text-[13px] font-medium text-slate-600 leading-relaxed">
                                {events[selectedEvent].desc}
                             </p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Event Data JSON */}
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <h4 className="text-[14px] font-bold text-slate-900 tracking-tight">Event data</h4>
                       <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors bg-white rounded-md border border-slate-100"><Copy size={14}/></button>
                    </div>
                    <div className="bg-[#1a1c24] rounded-xl p-6 font-mono text-[12px] text-slate-300 overflow-x-auto shadow-xl">
                       <pre className="space-y-1">
                          {`{
  "object": {
    "id": "${events[selectedEvent].id.replace('evt_', 'pi_')}",
    "object": "payment_intent",
    "amount": 50000,
    "amount_capturable": 0,
    "amount_details": {
      "tip": {}
    },
    "amount_received": 0,
    "application": null,
    "application_fee_amount": null,
    "automatic_payment_methods": {
      "allow_redirects": "always",
      "enabled": true
    },
    ...
  }
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
