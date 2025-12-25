'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { io } from 'socket.io-client';
import { 
  Plus, 
  HelpCircle, 
  Bell, 
  Settings, 
  LayoutGrid, 
  Search, 
  ChevronRight, 
  X, 
  ArrowRight,
  AlertTriangle,
  Activity,
  CheckCircle,
  Clock,
  Mail,
  Smartphone,
  Globe,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [appsOpen, setAppsOpen] = useState(false);
  const [isTestMode, setIsTestMode] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isSandbox, setIsSandbox] = useState(false);

  // Notification State
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [showSandboxBanner, setShowSandboxBanner] = useState(true);
  const [showTestModeBanner, setShowTestModeBanner] = useState(true);

  useEffect(() => {
    // 1. Initial User Load & Welcome Back Logic
    const sandbox = localStorage.getItem('grapepay_sandbox') === 'true';
    setIsSandbox(sandbox);
    
    const userData = localStorage.getItem('grapepay_user');
    if (!userData) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      const storedMode = localStorage.getItem('grapepay_mode');
      setIsTestMode(storedMode ? storedMode === 'test' : parsedUser.kyc_status !== 'approved');

      // Security Check
      if (localStorage.getItem('grapepay_force_password_change') === 'true') {
        localStorage.removeItem('grapepay_force_password_change');
        toast.error('Security Alert: You must change your password immediately.', { duration: 5000 });
        setTimeout(() => router.push('/settings'), 100);
      }

      // Welcome Back Logic
      const now = Date.now();
      const lastLogin = localStorage.getItem('grapepay_last_login');
      const LONG_TIME_THRESHOLD = 24 * 60 * 60 * 1000 * 3; // 3 days

      if (lastLogin && (now - parseInt(lastLogin) > LONG_TIME_THRESHOLD)) {
        toast.info(`Welcome back, ${parsedUser.name?.split(' ')[0] || 'User'}!`, {
           description: 'Good to see you back. Check out what\'s new.',
           duration: 5000,
           icon: <span className="text-xl">👋</span>
        });
      }
      localStorage.setItem('grapepay_last_login', now.toString());

      // New Feature Announcement (Neobanking) - Remind every 24h
      const lastAnnouncement = localStorage.getItem('grapepay_neobanking_seen');
      const DAY_MS = 24 * 60 * 60 * 1000;

      if (!lastAnnouncement || (now - parseInt(lastAnnouncement) > DAY_MS)) {
        setTimeout(() => {
           toast('Welcome to Grapepay Neobanking 🏦', {
             description: 'Launch global accounts in seconds. Now active in your dashboard.',
             action: {
               label: 'Explore',
               onClick: () => router.push('/payments/neobanking')
             },
             duration: 8000
           });
           localStorage.setItem('grapepay_neobanking_seen', now.toString());
        }, 1500);
      }

    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/login');
    }
  }, [router]);

  // 2. Real-time Notifications Socket
  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('connect', () => {
        setIsConnected(true);
        console.log('[Frontend] Connected to Event Bus');
    });

    socket.on('disconnect', () => setIsConnected(false));

    // Listen for Payment Succeeded events
    socket.on('system_event', (event: any) => {
        if (event.type === 'payment_intent.succeeded' || event.type === 'charge.succeeded') {
            const amount = event.data.object.amount;
            const currency = event.data.object.currency;
            
            // Show Toast
            toast.success(`Payment Received: ${currency} ${amount}`, {
                description: `Transaction ${event.data.object.id} was successful.`,
                action: {
                    label: 'View',
                    onClick: () => router.push(`/transactions`) // Could link to specific ID
                },
                duration: 5000
            });

            // Add to Notification Center
            const newNotif = {
                id: event.id,
                title: 'Payment Succeeded',
                description: `Received ${currency} ${amount}`,
                time: new Date(),
                type: 'success',
                read: false,
                link: '/transactions'
            };
            
            setNotifications(prev => [newNotif, ...prev]);
            setUnreadCount(prev => prev + 1);
        }

        if (event.type === 'payment_intent.payment_failed') {
             toast.error('Payment Failed', {
                description: `Transaction ${event.data.object.id} failed.`,
             });
             const newNotif = {
                id: event.id,
                title: 'Payment Failed',
                description: `Transaction ${event.data.object.id} failed.`,
                time: new Date(),
                type: 'error',
                read: false,
                link: '/transactions'
            };
            setNotifications(prev => [newNotif, ...prev]);
            setUnreadCount(prev => prev + 1);
        }
    });

    return () => {
        socket.disconnect();
    };
  }, [router]);

  const markAllRead = () => {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
  };

  const clearNotifications = () => {
      setNotifications([]);
      setUnreadCount(0);
  };

  const toggleMode = () => {
    const newMode = !isTestMode;
    setIsTestMode(newMode);
    localStorage.setItem('grapepay_mode', newMode ? 'test' : 'live');
    toast.success(`Switched to ${newMode ? 'Test' : 'Live'} mode`);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const apps = [
    { name: 'Data Mapper for Mailchimp', desc: 'Easily sync Grapepay customers and purchases to Mailchimp', icon: 'M', color: 'bg-yellow-400' },
    { name: 'Make', desc: 'Create automated Grapepay workflows with an advanced visual no-code platform', icon: 'M', color: 'bg-indigo-600' },
    { name: 'Zapier', desc: 'Connect Zapier to Grapepay to automate your workflows', icon: 'Z', color: 'bg-orange-500' },
    { name: 'Mercury', desc: 'View your bank account balances right from your Grapepay Dashboard', icon: 'M', color: 'bg-slate-100' },
    { name: 'PromoteKit Affiliate Marketing', desc: 'All-In-One Affiliate Marketing Solution for Grapepay', icon: 'PK', color: 'bg-slate-900' },
  ];

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Sandbox Banner */}
      {isSandbox && showSandboxBanner && (
        <div className="bg-[#00294d] text-white px-4 py-2 text-center text-[13px] font-medium border-b border-[#001f3d]">
          <div className="flex items-center justify-between max-w-[1200px] mx-auto">
             <span className="font-bold uppercase tracking-wider">Sandbox</span>
             <span className="opacity-90">You&apos;re testing in a sandbox. Changes you make here don&apos;t affect your live account.</span>
             <button 
               onClick={() => {
                 localStorage.setItem('grapepay_sandbox', 'false');
                 window.location.reload();
               }}
               className="p-1 hover:bg-white/10 rounded transition-colors"
             >
               <X size={14} />
             </button>
          </div>
        </div>
      )}

      {/* Test Mode Banner */}
      {isTestMode && !isSandbox && showTestModeBanner && (
        <div className="bg-[#fff9e6] text-[#856404] px-4 py-1.5 text-center text-[13px] font-medium border-b border-[#ffeeba]">
          <div className="flex items-center justify-between max-w-[1200px] mx-auto">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>
                {user.kyc_status === 'pending' 
                  ? 'Your account is in test mode until verification is complete.' 
                  : 'Test Mode - Use test cards to simulate successful and failed payments.'
                }
              </span>
              <button className="underline font-bold ml-2">Activate your account</button>
            </div>
            <button 
               onClick={() => setShowTestModeBanner(false)}
               className="p-1 hover:bg-black/5 rounded transition-colors"
             >
               <X size={14} />
             </button>
          </div>
        </div>
      )}
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Apps Popover */}
          {appsOpen && (
            <>
              <div className="fixed inset-0 z-[60]" onClick={() => setAppsOpen(false)} />
              <div className="absolute top-14 right-48 w-80 bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-slate-200 z-[70] py-4 animate-in fade-in zoom-in duration-200 origin-top-right">
                <div className="px-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                   <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">Popular apps</h3>
                </div>
                
                <div className="px-1 py-2 space-y-0.5 max-h-[400px] overflow-y-auto">
                   {apps.map((app) => (
                     <button key={app.name} className="w-full flex items-start gap-3 px-3 py-3 hover:bg-slate-50 transition-colors rounded-lg text-left group">
                        <div className={cn("h-10 w-10 shrink-0 rounded-lg flex items-center justify-center text-white font-bold text-xs", app.color)}>
                           {app.name === 'Data Mapper for Mailchimp' ? '📬' : app.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center justify-between">
                              <span className="text-[14px] font-bold text-[#635bff] group-hover:text-[#5851eb] transition-colors">{app.name}</span>
                              <ChevronRight size={14} className="text-[#635bff]" />
                           </div>
                           <p className="text-[12px] text-slate-500 font-medium leading-[1.4] mt-0.5 line-clamp-2">{app.desc}</p>
                        </div>
                     </button>
                   ))}
                </div>
                
                <div className="px-2 pt-2 border-t border-slate-100">
                   <button className="w-full flex items-center gap-3 px-3 py-3 hover:bg-slate-50 transition-colors rounded-xl text-left group border border-blue-50 bg-blue-50/20">
                      <div className="h-8 w-8 rounded-lg bg-white border border-blue-100 flex items-center justify-center text-blue-600">
                         <div className="flex items-center justify-center"><Plus size={16}/></div>
                      </div>
                      <div className="flex-1">
                         <span className="text-[14px] font-bold text-[#635bff]">Perks</span>
                         <p className="text-[11px] text-slate-500 font-medium mt-0.5">Save money on business tools</p>
                      </div>
                   </button>
                </div>
              </div>
            </>
          )}

          {/* Universal Header */}
          <header className="bg-white border-b border-slate-200 h-14 shrink-0 transition-all z-50">
            <div className="flex items-center justify-between px-8 h-full">
              <div className="flex items-center gap-6 flex-1">
                <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50">
                  <Search size={20} />
                </button>
                
                <div className={cn(
                  "hidden lg:flex items-center gap-2 group transition-all duration-300 w-96 px-3 py-1.5 rounded-md",
                  searchFocused ? "bg-white ring-2 ring-purple-100 border-purple-300" : "bg-slate-100 hover:bg-slate-200/50"
                )}>
                  <Search size={14} className={cn(searchFocused ? "text-purple-600" : "text-slate-400")} />
                  <input 
                    placeholder="Search" 
                    className="bg-transparent text-[13px] w-full outline-none text-slate-700 font-medium"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                  <div className="hidden lg:flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 text-[10px] bg-white border border-slate-200 rounded-md text-slate-400">Ctrl</kbd>
                    <kbd className="px-1.5 py-0.5 text-[10px] bg-white border border-slate-200 rounded-md text-slate-400">K</kbd>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className={cn("h-9 w-9 text-slate-500 hover:text-slate-900", appsOpen && "bg-slate-100 text-[#635bff]")} onClick={() => setAppsOpen(!appsOpen)}>
                  <LayoutGrid size={18}/>
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500 hover:text-slate-900"><HelpCircle size={18}/></Button>
                
                {/* NOTIFICATION CENTER */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500 hover:text-slate-900 relative">
                        <Bell size={18}/>
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#635bff] border-[2px] border-white rounded-full flex items-center justify-center">
                            </span>
                        )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[380px] p-0 mr-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-slate-200" align="end">
                        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <h3 className="text-[13px] font-bold text-slate-900">Notifications</h3>
                                {unreadCount > 0 && <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-1.5 py-0.5 rounded-md">{unreadCount} new</span>}
                            </div>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="sm" className="h-6 text-[10px] font-bold text-slate-500" onClick={markAllRead} disabled={unreadCount === 0}>Mark all read</Button>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:text-red-600" onClick={clearNotifications}><Trash2 size={12}/></Button>
                            </div>
                        </div>
                        <ScrollArea className="h-[320px]">
                            {notifications.length === 0 ? (
                                <div className="h-[320px] flex flex-col items-center justify-center text-center p-8 space-y-3">
                                    <div className="h-12 w-12 bg-slate-50 rounded-full flex items-center justify-center">
                                        <Bell className="text-slate-300" size={24} />
                                    </div>
                                    <p className="text-sm font-bold text-slate-900">All caught up</p>
                                    <p className="text-[12px] text-slate-500">No new notifications to show.</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-50">
                                    {notifications.map((notif: any) => (
                                        <button 
                                            key={notif.id} 
                                            onClick={() => {
                                                if(notif.link) router.push(notif.link);
                                            }}
                                            className={cn(
                                                "w-full text-left p-4 hover:bg-slate-50 transition-colors flex items-start gap-3",
                                                !notif.read && "bg-blue-50/30"
                                            )}
                                        >
                                            <div className={cn(
                                                "shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
                                                notif.type === 'success' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                            )}>
                                                {notif.type === 'success' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <p className={cn("text-[13px] font-bold truncate pr-2", !notif.read ? "text-slate-900" : "text-slate-600")}>
                                                        {notif.title}
                                                    </p>
                                                    <span className="text-[10px] text-slate-400 whitespace-nowrap">{new Date(notif.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                                </div>
                                                <p className="text-[12px] text-slate-500 mt-0.5 line-clamp-2 leading-snug">
                                                    {notif.description}
                                                </p>
                                            </div>
                                            {!notif.read && <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                        {!isConnected && (
                            <div className="px-4 py-2 bg-amber-50 text-amber-700 text-[10px] font-bold text-center border-t border-amber-100 flex items-center justify-center gap-2">
                                <AlertTriangle size={10} /> Disconnected from Event Stream
                            </div>
                        )}
                    </PopoverContent>
                </Popover>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 text-slate-500 hover:text-slate-900"
                  onClick={() => router.push('/settings')}
                >
                  <Settings size={18}/>
                </Button>
                
                <div className="h-6 w-px bg-slate-200 mx-2" />
                
                <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50 shadow-sm mr-2">
                   <button 
                     onClick={() => toggleMode()}
                     className={cn(
                       "px-2.5 py-1 text-[11px] font-black rounded-md transition-all duration-200 tracking-wider",
                       !isTestMode ? "bg-[#635bff] text-white shadow-sm" : "text-slate-400 hover:text-slate-600"
                     )}
                   >
                     LIVE
                   </button>
                   <button 
                     onClick={() => toggleMode()}
                     className={cn(
                       "px-2.5 py-1 text-[11px] font-black rounded-md transition-all duration-200 tracking-wider flex items-center gap-1",
                       isTestMode ? "bg-orange-400 text-white shadow-sm" : "text-slate-400 hover:text-slate-600"
                     )}
                   >
                     <Activity size={10} /> TEST
                   </button>
                </div>

                <div className="flex items-center gap-3 pl-2 group">
                  <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center text-white text-[14px] font-black shadow-sm shadow-purple-600/20">
                    G
                  </div>
                  <div className="hidden md:flex flex-col items-start mr-4">
                    <span className="text-[10px] font-black uppercase tracking-tighter text-[#635bff]">
                      {isTestMode ? 'Test mode' : 'Live mode'}
                    </span>
                  </div>
                </div>

                <Button className="bg-[#635bff] hover:bg-[#5851eb] rounded-full h-8 w-8 p-0 flex items-center justify-center shadow-lg shadow-purple-600/20 transition-all hover:scale-110 active:scale-95">
                  <Plus size={18} className="text-white" />
                </Button>

                <div className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full cursor-pointer hover:bg-slate-50 transition-all ml-2 group shadow-sm">
                   <span className="text-[12px] font-bold text-slate-600 group-hover:text-slate-900">Setup guide</span>
                   <div className="relative h-4 w-4">
                      <svg className="h-4 w-4 -rotate-90">
                         <circle cx="8" cy="8" r="7" fill="transparent" stroke="#f1f5f9" strokeWidth="2.5" />
                         <circle cx="8" cy="8" r="7" fill="transparent" stroke="#635bff" strokeWidth="2.5" strokeDasharray="44" strokeDashoffset="11" />
                      </svg>
                   </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto bg-white custom-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
