'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  ArrowLeftRight,
  FileText,
  Receipt,
  Link as LinkIcon,
  Route,
  Zap,
  Wallet,
  Users,
  BarChart3,
  Settings,
  User,
  X,
  Database,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Cpu,
  RotateCcw,
  Lock,
  Layout,
  Search,
  Building2,
  ShoppingBag,
  Activity,
  CreditCard,
  Globe,
  Bell,
  Terminal,
  LayoutGrid,
  Plus,
  Info,
  ExternalLink,
  Sparkles,
  RefreshCcw
} from 'lucide-react';

const mainNavigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Balances', href: '/balances', icon: Wallet },
  { name: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { name: 'Conversions', href: '/conversions', icon: RefreshCcw },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Product catalog', href: '/products', icon: ShoppingBag },
  { name: 'Settings', icon: Settings, isPopupTrigger: true },
];

const developerNavigation = [
  {
    name: 'Workbench',
    isHeader: true,
    items: [
      { name: 'Overview', href: '/developers' },
      { name: 'Real-time Events', href: '/developers/notifications', badge: 'Live' },
      { name: 'Webhooks', href: '/developers/webhooks' },
      { name: 'Events', href: '/developers/events' },
      { name: 'Logs', href: '/developers/logs' },
    ]
  },
  {
    name: 'Documentation',
    isHeader: true,
    items: [
      { name: 'API reference', href: '#', isExternal: true },
      { name: 'SDKs', href: '#', isExternal: true },
      { name: 'Grapepay.js', href: '#', isExternal: true },
      { name: 'CLI', href: '#', isExternal: true },
    ]
  },
  { name: 'API keys', href: '/developers/api-keys', icon: Lock },
  { name: 'Created apps', href: '/developers/apps', icon: LayoutGrid },
  { name: 'Developer settings', href: '/developers/settings', icon: Settings },
];

const shortcutsNavigation = [
  { name: 'Workflows', href: '/workflows', icon: Activity },
  { name: 'AI CA', href: '/ai-ca', icon: Sparkles },
  { name: 'Tax', href: '/tax', icon: Receipt },
];

const productsNavigation = [
  { 
    name: 'Connect', 
    icon: Building2,
    subItems: [
      { name: 'Overview', href: '/connect/overview' },
      { name: 'Connected accounts', href: '/connect/accounts' },
      { name: 'Compliance', href: '/connect/compliance', badge: 'New' },
      { name: 'Tax forms', href: '/connect/tax-forms' },
      { name: 'Capital', href: '/connect/capital' },
      { name: 'Support cases', href: '/connect/support-cases' },
      { name: 'Embedded apps', href: '/connect/embedded-apps' },
    ]
  },
  { 
    name: 'Payments', 
    icon: CreditCard,
    subItems: [
      { name: 'Analytics', href: '/payments/analytics' },
      { name: 'Disputes', href: '/payments/disputes' },
      { name: 'Radar', href: '/payments/radar' },
      { name: 'Payment Links', href: '/payments/links' },
      { name: 'Terminal', href: '/payments/terminal' },
      { name: 'Neobanking', href: '/payments/neobanking', badge: 'New' },
    ]
  },
  { 
    name: 'Billing', 
    icon: FileText,
    subItems: [
      { name: 'Overview', href: '/billing/overview' },
      { name: 'Subscriptions', href: '/billing/subscriptions' },
      { name: 'Invoices', href: '/billing/invoices' },
      { name: 'Billing', href: '/billing/usage' },
      { name: 'Revenue recovery', href: '/billing/revenue-recovery' },
    ]
  },
  { 
    name: 'Reporting', 
    icon: BarChart3,
    subItems: [
      { name: 'Reports', href: '/reporting/reports' },
      { name: 'Custom metrics', href: '/reporting/custom-metrics' },
      { name: 'Sigma', href: '/reporting/sigma' },
      { name: 'Revenue Recognition', href: '/reporting/revenue-recognition' },
      { name: 'Data management', href: '/reporting/data-management' },
    ]
  },
  {
    name: 'More',
    icon: LayoutGrid,
    subItems: [
      { name: 'Tax', href: '/tax' },
      { name: 'Profile', href: '/profiles' },
      { name: 'Identity', href: '/identity' },
      { name: 'Inc.', href: '/inco-operation' },
      { name: 'Financial Connections', href: '/financial-connections' },
    ]
  }
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [businessName, setBusinessName] = useState('nextpayments');
  const [initials, setInitials] = useState('NE');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Connect']);
  const [isDeveloperMode, setIsDeveloperMode] = useState(false);
  const [isSandbox, setIsSandbox] = useState(false);
  const [isSandboxSubmenu, setIsSandboxSubmenu] = useState(false);
  const [isCreateSubmenu, setIsCreateSubmenu] = useState(false);
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);

  useEffect(() => {
    const sandbox = localStorage.getItem('grapepay_sandbox') === 'true';
    setIsSandbox(sandbox);
  }, []);

  const filterItems = (items: any[]) => {
    if (!searchQuery) return items;
    
    return items.map(item => {
      // For headers and menus with items/subItems
      const nestedKey = item.items ? 'items' : (item.subItems ? 'subItems' : null);
      
      if (nestedKey) {
        const filteredNested = item[nestedKey].filter((sub: any) => 
          sub.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        // If the parent matches or any children match, keep the parent
        if (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || filteredNested.length > 0) {
          return { ...item, [nestedKey]: searchQuery ? filteredNested : item[nestedKey], forceExpand: filteredNested.length > 0 };
        }
        return null;
      }
      
      // For simple items
      if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return item;
      }
      return null;
    }).filter(Boolean);
  };

  const filteredMain = filterItems(mainNavigation);
  const filteredDev = filterItems(developerNavigation);
  const filteredShortcuts = filterItems(shortcutsNavigation);
  const filteredProducts = filterItems(productsNavigation);

  useEffect(() => {
    const loadUser = () => {
      const userStr = localStorage.getItem('grapepay_user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user.company_logo) {
            setCompanyLogo(user.company_logo);
          } else {
            setCompanyLogo(null);
          }
          if (user.business_name || user.name) {
            const name = user.business_name || user.name;
            setBusinessName(name);
            const parts = name.split(' ');
            if (parts.length >= 2) {
              setInitials((parts[0][0] + parts[1][0]).toUpperCase());
            } else {
              setInitials(name.slice(0, 2).toUpperCase());
            }
          }
        } catch (e) {}
      }
    };

    loadUser();
    window.addEventListener('storage', loadUser);
    
    if (pathname.startsWith('/developers')) {
      setIsDeveloperMode(true);
    }

    return () => window.removeEventListener('storage', loadUser);
  }, [pathname]);

  const toggleMenu = (name: string) => {
    setExpandedMenus(prev => 
      prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]
    );
  };

  const NavLink = ({ item, isSub = false }: { item: any; isSub?: boolean }) => {
    const isActive = pathname === item.href;
    const isExpanded = expandedMenus.includes(item.name) || item.forceExpand;
    const hasSubItems = (item.subItems && item.subItems.length > 0) || (item.items && item.items.length > 0 && !item.isHeader);
    const Icon = item.icon;

    if (item.isHeader) {
      if (searchQuery && (!item.items || item.items.length === 0)) return null;
      return (
        <div className="space-y-1 py-2">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">{item.name}</h4>
          <div className="space-y-0.5">
            {item.items.map((sub: any) => (
              <Link
                key={sub.name}
                href={sub.href || '#'}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between px-4 py-1.5 text-[14px] font-medium transition-all group",
                  pathname === sub.href 
                    ? "text-[#635bff] bg-white border border-slate-200/50 shadow-sm font-bold rounded-md mx-2 ml-4 mr-2" 
                    : "text-slate-600 hover:text-slate-900 mx-2 ml-4 mr-2"
                )}
              >
                <span>{sub.name}</span>
                <div className="flex items-center gap-1.5">
                  {sub.isExternal && <ExternalLink size={12} className="text-slate-400 group-hover:text-slate-600" />}
                  {sub.hasMore && <ChevronRight size={12} className="text-slate-400 group-hover:text-slate-600" />}
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
    }

    if (hasSubItems) {
      const nestedItems = item.subItems || item.items;
      return (
        <div className="space-y-0.5">
          <button
            onClick={() => toggleMenu(item.name)}
            className={cn(
              "group flex items-center w-full px-4 py-1.5 text-[14px] font-medium rounded-md transition-all duration-200",
              isExpanded ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
            )}
          >
            {Icon && <Icon className={cn(
              "mr-3 h-4 w-4 transition-colors",
              isExpanded ? "text-slate-600" : "text-slate-400 group-hover:text-slate-600"
            )} />}
            <span className="flex-1 text-left">{item.name}</span>
            <ChevronRight 
              size={14} 
              className={cn(
                "transition-transform duration-200 text-slate-400",
                isExpanded ? "rotate-90" : ""
              )} 
            />
          </button>
          
          {isExpanded && (
            <div className="ml-[34px] space-y-0.5 border-l border-slate-100">
               {nestedItems.map((sub: any) => (
                 <Link
                   key={sub.name}
                   href={sub.href || '#'}
                   onClick={onClose}
                   className={cn(
                     "flex items-center justify-between px-3 py-1.5 text-[13px] font-medium rounded-md transition-all",
                     pathname === sub.href 
                       ? "text-[#635bff] bg-white font-bold" 
                       : "text-slate-500 hover:text-slate-900"
                   )}
                 >
                   <span>{sub.name}</span>
                   {sub.badge && (
                     <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded border border-blue-100">
                        {sub.badge}
                     </span>
                   )}
                 </Link>
               ))}
            </div>
          )}
        </div>
      );
    }

    if (item.isPopupTrigger) {
      return (
        <button
          onClick={() => {
            setProfileOpen(!profileOpen);
            onClose();
          }}
          className={cn(
            "group flex items-center w-full px-4 py-1.5 text-[14px] font-medium rounded-md transition-all duration-200",
            profileOpen ? "text-[#635bff] bg-white" : "text-slate-600 hover:text-slate-900"
          )}
        >
          <Icon className={cn(
            "mr-3 h-4 w-4 transition-colors",
            profileOpen ? "text-[#635bff]" : "text-slate-400 group-hover:text-slate-600"
          )} />
          <span className={cn(profileOpen ? "font-bold" : "")}>{item.name}</span>
        </button>
      );
    }

    return (
      <Link
        href={item.href || '#'}
        onClick={onClose}
        className={cn(
          "group flex items-center px-4 py-1.5 text-[14px] font-medium rounded-md transition-all duration-200",
          isActive
            ? "text-[#635bff] bg-white"
            : "text-slate-600 hover:text-slate-900"
        )}
      >
        {Icon && <Icon className={cn(
          "mr-3 h-4 w-4 transition-colors",
          isActive ? "text-[#635bff]" : "text-slate-400 group-hover:text-slate-600"
        )} />}
        <span className={cn(isActive ? "font-bold" : "")}>{item.name}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {(isOpen || profileOpen) && (
        <div className="fixed inset-0 z-40 lg:hidden text-slate-100">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => { onClose(); setProfileOpen(false); }} />
        </div>
      )}
      
      {/* Profile Popup (matching uploaded images) */}
      {profileOpen && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => { setProfileOpen(false); setIsSandboxSubmenu(false); setIsCreateSubmenu(false); }} />
          <div className="absolute top-14 left-4 w-80 bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-slate-200 z-[70] py-4 animate-in fade-in zoom-in-95 duration-200 origin-top-left overflow-hidden">
            
            {!isSandboxSubmenu && !isCreateSubmenu ? (
              <>
                {/* Account Header */}
                <div className="px-4 py-6 flex flex-col items-center justify-center space-y-4">
                   <div className="h-12 w-12 bg-slate-50 rounded-lg flex items-center justify-center text-[14px] font-bold text-slate-500 shadow-sm border border-slate-100 overflow-hidden">
                      {isSandbox ? 'N' : (companyLogo ? <img src={companyLogo} className="w-full h-full object-cover" /> : initials.toUpperCase())}
                   </div>
                   <h3 className="text-[16px] font-bold text-slate-800 leading-none">{isSandbox ? 'New business sandbox' : businessName}</h3>
                </div>
                
                <div className="px-1 space-y-0.5">
                   <button 
                     onClick={() => { router.push('/settings'); setProfileOpen(false); }}
                     className="flex items-center gap-3 w-full px-4 py-2.5 text-[14px] font-medium text-slate-600 hover:bg-slate-50 transition-colors rounded-lg group text-left"
                   >
                      <Settings size={18} className="text-slate-500" />
                      <span>Settings</span>
                   </button>
                   
                   <button 
                     onClick={() => setIsSandboxSubmenu(true)}
                     className="flex items-center justify-between w-full px-4 py-2.5 text-[14px] font-medium text-slate-600 hover:bg-slate-50 transition-colors rounded-lg group"
                   >
                      <div className="flex items-center gap-3">
                         <ShoppingBag size={18} className="text-slate-500" />
                         <span>Switch to sandbox</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-400" />
                   </button>
                   
                   <button 
                     onClick={() => setIsCreateSubmenu(true)}
                     className="flex items-center justify-between w-full px-4 py-2.5 text-[14px] font-medium text-slate-600 hover:bg-slate-50 transition-colors rounded-lg group"
                   >
                      <div className="flex items-center gap-3">
                         <Plus size={18} className="text-slate-500" />
                         <span>Create</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-400" />
                   </button>
                </div>
              </>
            ) : isSandboxSubmenu ? (
              <div className="animate-in slide-in-from-right-4 duration-200">
                <div className="px-1 space-y-0.5">
                  <button 
                    onClick={() => {
                      setIsSandbox(true);
                      localStorage.setItem('grapepay_sandbox', 'true');
                      setProfileOpen(false);
                      setIsSandboxSubmenu(false);
                      window.location.reload();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-[14px] font-medium text-slate-900 bg-blue-50/50 border border-blue-100 rounded-lg text-left"
                  >
                     <div className="h-6 w-6 bg-slate-100 rounded flex items-center justify-center text-slate-500 text-[10px] font-bold">N</div>
                     <span className="flex-1">New business sandbox</span>
                  </button>
                  
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-[14px] font-medium text-slate-600 hover:bg-slate-50 transition-colors rounded-lg text-left">
                     <Plus size={18} className="text-slate-400" />
                     <span className="flex-1">Create sandbox</span>
                  </button>
                  
                  <div className="my-2 border-t border-slate-100" />
                  
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-[14px] font-medium text-slate-600 hover:bg-slate-50 transition-colors rounded-lg text-left">
                     <ShoppingBag size={18} className="text-slate-400" />
                     <span className="flex-1">Manage sandboxes</span>
                  </button>

                  <button 
                    onClick={() => {
                      setIsSandbox(false);
                      localStorage.setItem('grapepay_sandbox', 'false');
                      setProfileOpen(false);
                      setIsSandboxSubmenu(false);
                      window.location.reload();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-[14px] font-medium text-slate-600 hover:bg-slate-50 transition-colors rounded-lg text-left"
                  >
                     <div className="w-8 h-4 bg-slate-200 rounded-full relative">
                        <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full transition-all" />
                     </div>
                     <span className="flex-1">Test mode</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-in slide-in-from-right-4 duration-200">
                <div className="px-1 space-y-0.5">
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-[14px] font-medium text-slate-600 hover:bg-slate-50 transition-colors rounded-lg text-left">
                     <Building2 size={18} className="text-slate-400" />
                     <span className="flex-1 font-bold">Create account</span>
                  </button>
                  
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-[14px] font-medium text-slate-600 hover:bg-slate-50 transition-colors rounded-lg text-left">
                     <Layout size={18} className="text-slate-400" />
                     <span className="flex-1 font-bold">Create organization</span>
                  </button>
                </div>
              </div>
            )}
            
            <div className="my-2 border-t border-slate-100" />
            
            <div className="px-1 space-y-0.5">
               <button 
                 onClick={() => { router.push('/settings'); setProfileOpen(false); }}
                 className="flex items-center justify-between w-full px-4 py-2.5 text-[14px] font-medium text-slate-600 hover:bg-slate-50 transition-colors rounded-lg group"
               >
                  <div className="flex items-center gap-3">
                     <User size={18} className="text-slate-500" />
                     <span className="uppercase text-[13px] font-bold tracking-tight text-slate-700">{businessName.toUpperCase()}</span>
                  </div>
                  <Info size={16} className="text-slate-400" />
               </button>
               
               <button 
                 onClick={() => {
                   localStorage.removeItem('grapepay_user');
                   window.location.href = '/login';
                 }}
                 className="flex items-center gap-3 w-full px-4 py-2.5 text-[14px] font-medium text-slate-600 hover:bg-slate-50 transition-colors rounded-lg group"
               >
                  <ArrowLeftRight size={18} className="text-slate-500 rotate-90" />
                  <span>Sign out</span>
               </button>
            </div>
          </div>
        </>
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-[#f7f8f9] dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
          <div 
            className="flex items-center space-x-2 cursor-pointer group px-6 h-14 shrink-0 transition-all hover:bg-slate-50/50"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="flex items-center gap-3 w-full">
            <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-white text-[12px] font-extrabold shadow-inner overflow-hidden">
               {isSandbox ? 'N' : (companyLogo ? <img src={companyLogo} className="w-full h-full object-cover" /> : initials.toUpperCase())}
            </div>
            <div className="flex flex-col min-w-0">
               <span className="text-[14px] font-bold text-slate-700 leading-tight truncate">
                  {isSandbox ? 'New business sandbox' : businessName}
               </span>
               {isSandbox && (
                  <span className="text-[11px] text-slate-500 font-medium leading-tight truncate">
                     {businessName}
                  </span>
               )}
            </div>
            <ChevronDown size={14} className="ml-auto text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 rounded-xl text-slate-400 hover:bg-slate-50 absolute right-4 top-2">
            <X className="h-5 w-5" />
          </button>

        <div className="px-4 mb-4 shrink-0">
           <div className={cn(
             "flex items-center gap-2 bg-white dark:bg-slate-900 border px-3 py-1.5 rounded-md transition-all",
             searchFocused ? "border-purple-300 ring-2 ring-purple-100" : "border-slate-200"
           )}>
              <Search size={14} className="text-slate-400" />
              <input 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm w-full outline-none text-slate-700 font-medium"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
           </div>
        </div>

        <nav className="flex-1 px-2 overflow-y-auto scrollbar-hide pb-10 space-y-6">
          {isDeveloperMode ? (
            <div className="space-y-4">
              {filteredDev.map((item, idx) => (
                <div key={item.name || idx}>
                  <NavLink item={item} />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="space-y-0.5">
                {filteredMain.map((item) => <NavLink key={item.name} item={item} />)}
              </div>
              
              {filteredShortcuts.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Shortcuts</h4>
                  <div className="space-y-0.5">
                    {filteredShortcuts.map((item) => <NavLink key={item.name} item={item} />)}
                  </div>
                </div>
              )}
              
              {filteredProducts.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Products</h4>
                  <div className="space-y-0.5">
                    {filteredProducts.map((item) => (
                      <div key={item.name} className="flex flex-col">
                        <NavLink item={item} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </nav>

        <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800 shrink-0">
           <button 
             onClick={() => setIsDeveloperMode(!isDeveloperMode)}
             className={cn(
               "flex items-center gap-3 w-full px-3 py-2 rounded-md transition-all duration-200",
               isDeveloperMode ? "bg-slate-200/50 text-slate-900 border border-slate-300/50 shadow-sm" : "text-slate-600 hover:text-slate-900"
             )}
           >
              <Terminal size={14} className={isDeveloperMode ? "text-slate-700 font-bold" : "text-slate-400"} />
              <span className="text-sm font-medium">Developers</span>
           </button>
        </div>
      </div>
    </>
  );
}
