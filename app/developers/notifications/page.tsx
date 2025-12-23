'use client';

import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { 
  Activity, 
  Zap, 
  Server, 
  MessageSquare, 
  Mail, 
  Smartphone, 
  Globe, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowRight,
  Database,
  Webhook
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

export default function NotificationsConsole() {
  const [events, setEvents] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [stats, setStats] = useState({ event_count: 0, queue_size: 0 });
  const [isConnected, setIsConnected] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to Event Bus');
    });

    socket.on('disconnect', () => setIsConnected(false));

    socket.on('system_event', (event) => {
      setEvents(prev => [event, ...prev].slice(0, 50));
      // Auto-scroll logic if needed
    });

    socket.on('notification_log', (notif) => {
      setNotifications(prev => [notif, ...prev].slice(0, 50));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Poll stats occasionally
  useEffect(() => {
    const fetchStats = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/stats');
            const data = await res.json();
            setStats(data);
        } catch (e) {}
    };
    const interval = setInterval(fetchStats, 2000);
    return () => clearInterval(interval);
  }, []);

  const EventCard = ({ event }: { event: any }) => (
    <div className="flex items-start gap-3 p-4 border-b border-slate-100 dark:border-slate-800 animate-in slide-in-from-left-2 duration-300">
      <div className="mt-1">
        <div className={cn(
            "h-2 w-2 rounded-full",
            event.type.includes('success') ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : 
            event.type.includes('fail') ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" : 
            "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
        )} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[13px] font-bold text-slate-900 dark:text-white font-mono">{event.type}</span>
          <span className="text-[10px] font-mono text-slate-400">{new Date(event.created).toLocaleTimeString()}</span>
        </div>
        <div className="text-[11px] font-mono text-slate-500 truncate" title={event.id}>{event.id}</div>
        <div className="mt-1.5 flex flex-wrap gap-1">
            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-600 font-mono">
                {event.data.object.id} ({event.data.object.currency} {event.data.object.amount})
            </span>
        </div>
      </div>
    </div>
  );

  const NotificationCard = ({ notif }: { notif: any }) => {
    const iconMap: any = {
        email: Mail,
        sms: Smartphone,
        webhook: Globe
    };
    const Icon = iconMap[notif.channel] || MessageSquare;
    const isSuccess = notif.status.includes('sent') || notif.status.includes('200');

    return (
        <div className="flex items-start gap-3 p-4 border-b border-slate-100 dark:border-slate-800 animate-in slide-in-from-right-2 duration-300 bg-white/50">
          <div className={cn(
            "p-2 rounded-lg flex items-center justify-center",
            isSuccess ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          )}>
            <Icon size={14} />
          </div>
          <div className="flex-1 min-w-0">
             <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-slate-900 uppercase tracking-tight">{notif.channel} Dispatch</span>
                <span className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded",
                    isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}>
                    {notif.status}
                </span>
             </div>
             <p className="text-[11px] text-slate-500 mt-1 truncate">
                To: <span className="font-mono text-slate-700 mr-2">{notif.recipient}</span>
             </p>
             <div className="flex items-center gap-1 mt-1.5 text-[10px] text-slate-400">
                <ArrowRight size={10} />
                <span>Trigger: {notif.event_id}</span>
             </div>
          </div>
        </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#f6f9fc] dark:bg-slate-950 min-h-screen">
          
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10 shadow-sm">
           <div>
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                 <Zap className="text-amber-500 fill-amber-500" size={20} />
                 Real-time Event Architecture
              </h1>
              <p className="text-sm text-slate-500 font-medium">Monitoring the global event bus and notification dispatchers</p>
           </div>
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
                 <div className={cn("h-2 w-2 rounded-full", isConnected ? "bg-green-500 animate-pulse" : "bg-red-500")} />
                 <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                     {isConnected ? 'Socket Connected' : 'Disconnected'}
                 </span>
              </div>
              <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Events</div>
                  <div className="text-lg font-bold text-slate-900 leading-none">{stats.event_count || '-'}</div>
              </div>
              <div className="text-right pl-4 border-l border-slate-200">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Queue Depth</div>
                  <div className="text-lg font-bold text-slate-900 leading-none">{stats.queue_size || '-'}</div>
              </div>
           </div>
        </div>

        {/* Main Console */}
        <div className="flex-1 p-8 grid grid-cols-12 gap-8 h-[calc(100vh-80px)] overflow-hidden">
            
            {/* COLUMN 1: EVENT BUS (Immutable Log) */}
            <div className="col-span-4 flex flex-col gap-4">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Database size={14} /> Immutable Event Log
                    </h3>
                    <Badge variant="outline" className="bg-white">Live Stream</Badge>
                </div>
                <Card className="flex-1 bg-white border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {events.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                                <Activity size={32} className="mb-2 opacity-20" />
                                <p className="text-xs font-bold">Waiting for events...</p>
                                <p className="text-[10px] mt-1">Transactions are being simulated in the background</p>
                            </div>
                        ) : (
                            events.map(evt => <EventCard key={evt.id} event={evt} />)
                        )}
                    </div>
                </Card>
            </div>

            {/* COLUMN 2: MIDDLEWARE (Queue Visualization) */}
            <div className="col-span-3 flex flex-col gap-4">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Server size={14} /> Processing Queue
                    </h3>
                </div>
                
                <div className="flex-1 flex flex-col gap-4">
                    {/* SQS Simulation Card */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="font-bold text-slate-900">Primary Queue</h4>
                                <p className="text-xs text-slate-500 font-mono">sqs-grapepay-main-prod</p>
                            </div>
                            <Server className="text-purple-500" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs font-bold text-slate-600">
                                <span>Throughput</span>
                                <span>~450 msg/s</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-slate-600">
                                <span>Avg Latency</span>
                                <span>24ms</span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <span className="text-[10px] font-black uppercase text-slate-400">Worker Status</span>
                                <div className="flex gap-1 mt-2">
                                    {[1,2,3,4,5].map(i => (
                                        <div key={i} className="h-3 flex-1 bg-green-500 rounded-sm animate-pulse opacity-80" style={{ animationDelay: `${i * 100}ms` }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Architecture Diagram */}
                    <div className="flex-1 bg-slate-900 rounded-xl p-6 border border-slate-800 relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                        <div className="relative text-center space-y-6 z-10 w-full">
                            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 inline-block w-full">
                                <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Incoming Event</span>
                                <div className="h-1 w-full bg-blue-500/20 rounded-full overflow-hidden">
                                     <div className="h-full bg-blue-500 w-1/2 animate-[shimmer_2s_infinite]" />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <ArrowRight className="text-slate-600 rotate-90" />
                            </div>
                            <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-500/30 inline-block w-full">
                                <span className="text-xs text-purple-300 font-bold uppercase block mb-1">Queue Buffer</span>
                                <span className="text-[10px] text-purple-400">Guaranteed Delivery</span>
                            </div>
                            <div className="flex justify-center">
                                <ArrowRight className="text-slate-600 rotate-90" />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-slate-800 p-2 rounded border border-slate-700 flex flex-col items-center">
                                    <Mail size={12} className="text-slate-400 mb-1" />
                                    <span className="text-[9px] text-slate-500 font-bold">Email</span>
                                </div>
                                <div className="bg-slate-800 p-2 rounded border border-slate-700 flex flex-col items-center">
                                    <Smartphone size={12} className="text-slate-400 mb-1" />
                                    <span className="text-[9px] text-slate-500 font-bold">SMS</span>
                                </div>
                                <div className="bg-slate-800 p-2 rounded border border-slate-700 flex flex-col items-center">
                                    <Webhook size={12} className="text-slate-400 mb-1" />
                                    <span className="text-[9px] text-slate-500 font-bold">Hooks</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COLUMN 3: DISPATCH LOGS (Reactions) */}
            <div className="col-span-5 flex flex-col gap-4">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Zap size={14} /> Active Dispatchers
                    </h3>
                    <div className="flex gap-2 text-[10px] font-bold text-slate-400">
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Success</span>
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Retrying</span>
                    </div>
                </div>
                <Card className="flex-1 bg-white border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                         {notifications.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                                <Zap size={32} className="mb-2 opacity-20" />
                                <p className="text-xs font-bold">No notifications sent yet...</p>
                            </div>
                        ) : (
                            notifications.map(n => <NotificationCard key={n.id} notif={n} />)
                        )}
                    </div>
                </Card>
            </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
