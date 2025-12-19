'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
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
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

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

  useEffect(() => {
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

      // Check for mandatory password change (after forgot password flow)
      if (localStorage.getItem('grapepay_force_password_change') === 'true') {
        localStorage.removeItem('grapepay_force_password_change');
        toast.error('Security Alert: You must change your password immediately.', {
          duration: 5000,
          position: 'top-center'
        });
        setTimeout(() => {
          router.push('/settings');
        }, 100);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('grapepay_user');
      router.push('/login');
    }
  }, [router]);

  const toggleMode = () => {
    const newMode = !isTestMode;
    setIsTestMode(newMode);
    localStorage.setItem('grapepay_mode', newMode ? 'test' : 'live');
    toast.success(`Switched to ${newMode ? 'Test' : 'Live'} mode`);
  };

  const handleLogout = () => {
    localStorage.removeItem('grapepay_user');
    toast.success('Logged out successfully');
    router.push('/login');
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
      {isSandbox && (
        <div className="bg-[#00294d] text-white px-4 py-2 text-center text-[13px] font-medium border-b border-[#001f3d]">
          <div className="flex items-center justify-between max-w-[1200px] mx-auto">
             <span className="font-bold uppercase tracking-wider">Sandbox</span>
             <span className="opacity-90">You&apos;re testing in a sandbox. Changes you make here don&apos;t affect your live account.</span>
             <div className="w-20" /> {/* Spacer */}
          </div>
        </div>
      )}

      {/* Test Mode Banner (only if not sandbox) */}
      {isTestMode && !isSandbox && (
        <div className="bg-[#fff9e6] text-[#856404] px-4 py-1.5 text-center text-[13px] font-medium border-b border-[#ffeeba]">
          <div className="flex items-center justify-center space-x-2">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>
              {user.kyc_status === 'pending' 
                ? 'Your account is in test mode until verification is complete.' 
                : 'Test Mode - Use test cards to simulate successful and failed payments.'
              }
            </span>
            <button className="underline font-bold ml-2">Activate your account</button>
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
                   
                   <button className="w-full flex items-center gap-3 px-3 py-3 hover:bg-slate-50 transition-colors rounded-lg text-left group mt-2">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                         <LayoutGrid size={16} />
                      </div>
                      <div>
                         <span className="text-[14px] font-bold text-[#635bff]">Discover more apps</span>
                         <p className="text-[11px] text-slate-500 font-medium mt-0.5">Save time and streamline your business</p>
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
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                >
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
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn("h-9 w-9 text-slate-500 hover:text-slate-900", appsOpen && "bg-slate-100 text-[#635bff]")}
                  onClick={() => setAppsOpen(!appsOpen)}
                >
                  <LayoutGrid size={18}/>
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500 hover:text-slate-900"><HelpCircle size={18}/></Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500 hover:text-slate-900 relative">
                  <Bell size={18}/>
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#635bff] border-2 border-white rounded-full"></span>
                </Button>
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
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-tighter",
                      isTestMode ? "text-orange-500" : "text-[#635bff]"
                    )}>
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
