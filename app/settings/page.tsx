'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  ChevronRight, 
  Info, 
  Edit2, 
  Plus, 
  MoreHorizontal, 
  Globe, 
  ShieldCheck, 
  Trash2, 
  Smartphone,
  Building2,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [isGoogleConnected, setIsGoogleConnected] = useState(true);
  const [authMethods, setAuthMethods] = useState<any[]>([]); // Default empty as requested
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const [loginSessions, setLoginSessions] = useState<any[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('grapepay_user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setEditName(parsed.business_name || 'NEXTPAYMENTS');
      setEditEmail(parsed.email || 'nextpaymentslab@gmail.com');
    }

    const sessions = JSON.parse(localStorage.getItem('grapepay_sessions') || '[]');
    setLoginSessions(sessions);
  }, []);

  const handleSaveUser = () => {
    const newUser = { ...user, business_name: editName, email: editEmail };
    setUser(newUser);
    localStorage.setItem('grapepay_user', JSON.stringify(newUser));
    setIsEditingUser(false);
  };

  const addDemoAuth = () => {
    const newMethod = {
       id: Math.random().toString(36).substr(2, 9),
       name: 'Authenticator app',
       device: 'Edge - Windows',
       date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
       isDefault: authMethods.length === 0
    };
    setAuthMethods([...authMethods, newMethod]);
  };

  const deleteAuth = (id: string) => {
    setAuthMethods(authMethods.filter(m => m.id !== id));
    setActiveMenuId(null);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newUser = { ...user, company_logo: base64String };
        setUser(newUser);
        localStorage.setItem('grapepay_user', JSON.stringify(newUser));
        toast.success('Company logo updated successfully!');
        window.dispatchEvent(new Event('storage')); // Trigger sidebar update
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1000px] mx-auto p-12 space-y-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
           <span className="text-[#635bff] cursor-pointer hover:underline">Settings</span>
           <ChevronRight size={14} className="text-slate-400" />
           <span>Personal details</span>
        </div>

        {/* Header */}
        <div className="space-y-2">
           <div className="flex items-center gap-3">
              <h1 className="text-[32px] font-bold text-slate-900 tracking-tight">Personal details</h1>
              <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-200 text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 mt-2">
                 Global setting <Info size={10} className="ml-1" />
              </Badge>
           </div>
        </div>

        {/* User Section */}
        <section className="space-y-6">
           <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-[18px] font-bold text-slate-900">User</h2>
              {isEditingUser ? (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsEditingUser(false)} className="h-8 font-bold text-slate-500">Cancel</Button>
                  <Button size="sm" onClick={handleSaveUser} className="h-8 font-bold bg-[#635bff] hover:bg-[#5249e0] text-white">Save</Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setIsEditingUser(true)} className="h-8 gap-2 font-bold text-slate-600 border-slate-200 shadow-sm">
                   <Edit2 size={14} /> Edit
                </Button>
              )}
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 items-center">
              <div className="md:col-span-3 text-[14px] font-medium text-slate-900">Name</div>
              <div className="md:col-span-9">
                {isEditingUser ? (
                  <input 
                    className="w-full max-w-sm h-9 px-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-[#635bff] text-[14px]"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  <div className="text-[14px] font-medium text-slate-600 uppercase">
                    {user?.business_name || 'NEXTPAYMENTS'}
                  </div>
                )}
              </div>

              <div className="md:col-span-3 text-[14px] font-medium text-slate-900">Password</div>
              <div className="md:col-span-9 text-[14px] font-medium text-slate-500 italic">(Password not set)</div>

              <div className="md:col-span-3 text-[14px] font-medium text-slate-900">Email</div>
              <div className="md:col-span-9">
                {isEditingUser ? (
                   <input 
                     className="w-full max-w-sm h-9 px-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-[#635bff] text-[14px]"
                     value={editEmail}
                     onChange={(e) => setEditEmail(e.target.value)}
                   />
                 ) : (
                  <div className="text-[14px] font-medium text-slate-600">
                    {user?.email || 'nextpaymentslab@gmail.com'}
                  </div>
                 )}
              </div>

              <div className="md:col-span-3 text-[14px] font-medium text-slate-900">Company Logo</div>
              <div className="md:col-span-9 flex items-center gap-4">
                 <div className="h-16 w-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shadow-sm">
                    {user?.company_logo ? (
                       <img src={user.company_logo} className="w-full h-full object-cover" alt="Logo" />
                    ) : (
                       <Building2 size={24} className="text-slate-300" />
                    )}
                 </div>
                 <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleLogoUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    />
                    <Button variant="outline" size="sm" className="h-9 gap-2 font-bold text-slate-600 border-slate-200">
                       <Upload size={14} /> Upload logo
                    </Button>
                 </div>
                 {user?.company_logo && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        const newUser = { ...user, company_logo: null };
                        setUser(newUser);
                        localStorage.setItem('grapepay_user', JSON.stringify(newUser));
                        window.dispatchEvent(new Event('storage'));
                      }}
                      className="h-9 font-bold text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                       Remove
                    </Button>
                 )}
              </div>

              <div className="md:col-span-3 text-[14px] font-medium text-slate-900 flex items-center gap-2">
                 Backup email <Badge className="bg-purple-50 text-[#635bff] border-purple-100 hover:bg-purple-50 text-[10px] font-bold">New</Badge>
              </div>
              <div className="md:col-span-9">
                 <Button variant="outline" size="sm" className="h-8 font-bold text-slate-600 border-slate-200 shadow-sm">Add backup email</Button>
              </div>

              <div className="md:col-span-3 text-[14px] font-medium text-slate-900 flex items-center gap-2">
                 Contact phone <Info size={14} className="text-slate-400" />
              </div>
              <div className="md:col-span-9">
                 <Button variant="outline" size="sm" className="h-8 font-bold text-slate-600 border-slate-200 shadow-sm">Add contact phone number</Button>
              </div>
           </div>
        </section>

        {/* Google account Section */}
        <section className="space-y-6">
           <div className="border-b border-slate-100 pb-2">
              <h2 className="text-[18px] font-bold text-slate-900">Google account</h2>
              <p className="text-[13px] text-slate-500 font-medium mt-1">Sign in to Grapepay using your Google account.</p>
           </div>
           
           {isGoogleConnected ? (
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center overflow-hidden">
                      <img src="https://img.logo.dev/google.com?token=pk_Rsvo_oTzT6m-DCO_I1sAnQ" className="w-6 h-6 invert" alt="" />
                   </div>
                   <div>
                      <p className="text-[14px] font-bold text-slate-900">Next Payments</p>
                      <p className="text-[13px] text-slate-500 font-medium">{user?.email || 'nextpaymentslab@gmail.com'}</p>
                   </div>
                </div>
                <Button 
                  onClick={() => setIsGoogleConnected(false)}
                  className="bg-red-50 text-red-600 hover:bg-red-100 border-red-100 shadow-none font-bold h-10 px-6 rounded-lg"
                >
                   Disconnect Google account
                </Button>
             </div>
           ) : (
             <div className="py-4 px-6 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 flex flex-col items-center justify-center text-center space-y-3">
                <p className="text-[14px] text-slate-500 font-medium">No Google account connected</p>
                <Button variant="outline" onClick={() => setIsGoogleConnected(true)} className="font-bold border-slate-200">Connect Google account</Button>
             </div>
           )}
        </section>

        {/* Passkeys Section */}
        <section className="space-y-6">
           <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                 <h2 className="text-[18px] font-bold text-slate-900">Passkeys</h2>
                 <p className="text-[13px] text-slate-500 font-medium mt-1">Sign in securely with your biometrics, device PIN, or hardware security key.</p>
              </div>
              <Button variant="outline" size="sm" className="h-10 gap-2 font-bold text-slate-600 border-slate-200 shadow-sm px-4">
                 <Plus size={16} /> Add passkey
              </Button>
           </div>
           <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
              Passkeys are easy to set up and can also be used for two-step authentication. See <span className="text-[#635bff] hover:underline cursor-pointer">supported browsers and devices</span> before using.
           </p>
        </section>

        {/* Two-step authentication Section */}
        <section className="space-y-6">
           <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                 <h2 className="text-[18px] font-bold text-slate-900">Two-step authentication</h2>
                 <p className="text-[13px] text-slate-500 font-medium mt-1">Increase your account&apos;s security by using multiple authentication methods to verify your identity.</p>
              </div>
              <Button variant="outline" size="sm" onClick={addDemoAuth} className="h-10 gap-2 font-bold text-slate-600 border-slate-200 shadow-sm px-4">
                 <Plus size={16} /> Add authentication method
              </Button>
           </div>
           
           <div className="space-y-4">
              {authMethods.length > 0 && (
                <div className="grid grid-cols-12 text-[11px] font-bold text-slate-400 uppercase tracking-widest pb-2">
                   <div className="col-span-4">Method</div>
                   <div className="col-span-4">Device</div>
                   <div className="col-span-4">Date added <ChevronRight size={10} className="inline rotate-90" /></div>
                </div>
              )}
              
              {authMethods.length === 0 && (
                <div className="py-8 text-center bg-slate-50/50 border border-dashed border-slate-200 rounded-xl">
                   <p className="text-[14px] text-slate-400 font-medium">No 2FA methods configured. Add one to secure your account.</p>
                </div>
              )}

              {authMethods.map((method) => (
                <div key={method.id} className="grid grid-cols-12 items-center py-4 border-t border-slate-100 group">
                   <div className="col-span-4 flex items-center gap-3">
                      <Smartphone size={18} className="text-slate-400" />
                      <div>
                         <p className="text-[13px] font-bold text-slate-900">
                           {method.name} 
                           {method.isDefault && <Badge className="bg-blue-50 text-[#635bff] border-blue-100 hover:bg-blue-50 text-[9px] font-bold px-1 py-0 ml-1">Default</Badge>}
                         </p>
                      </div>
                   </div>
                   <div className="col-span-4 text-[13px] text-slate-500 font-medium">{method.device}</div>
                   <div className="col-span-4 flex items-center justify-between relative">
                      <span className="text-[13px] text-slate-500 font-medium">{method.date}</span>
                      <div className="relative">
                        <button 
                          onClick={() => setActiveMenuId(activeMenuId === method.id ? null : method.id)}
                          className="text-slate-300 hover:text-slate-600 transition-colors p-1"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                        
                        {activeMenuId === method.id && (
                          <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-slate-100 z-50 py-1 animate-in fade-in zoom-in-95 duration-100">
                             <button className="flex items-center gap-2 w-full px-3 py-1.5 text-[12px] font-bold text-slate-600 hover:bg-slate-50">
                                <Edit2 size={12} /> Edit
                             </button>
                             <button 
                               onClick={() => deleteAuth(method.id)}
                               className="flex items-center gap-2 w-full px-3 py-1.5 text-[12px] font-bold text-red-600 hover:bg-red-50"
                             >
                                <Trash2 size={12} /> Delete
                             </button>
                          </div>
                        )}
                      </div>
                   </div>
                </div>
              ))}
              
              <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                 Check that you have your 24 character <span className="text-[#635bff] hover:underline cursor-pointer">backup code</span>. You can <span className="text-[#635bff] hover:underline cursor-pointer">generate a new backup code</span> and invalidate the old one if you no longer have it.
              </p>
           </div>
        </section>

        {/* Language Section */}
        <section className="space-y-6">
           <div className="border-b border-slate-100 pb-2">
              <h2 className="text-[18px] font-bold text-slate-900">Language</h2>
              <p className="text-[13px] text-slate-500 font-medium mt-1">Please select a preferred language for your Dashboard, including date, time, and number formatting.</p>
           </div>
           
           <div className="space-y-4">
              <div className="relative group max-w-[480px]">
                 <select className="w-full appearance-none bg-white border border-slate-200 rounded-lg h-10 px-4 text-[14px] font-medium outline-none focus:ring-2 focus:ring-purple-100 focus:border-[#635bff] transition-all">
                    <option>Auto-detect</option>
                 </select>
                 <ChevronRight size={16} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
              </div>
              <p className="text-[13px] text-slate-500 font-medium">Your detected language is English (United States).</p>
              <Button className="bg-[#635bff] hover:bg-[#5249e0] text-white font-bold h-10 px-6 rounded-lg shadow-lg shadow-purple-200">
                 Save
              </Button>
           </div>
        </section>

        {/* Login sessions Section */}
        <section className="space-y-6">
           <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                 <h2 className="text-[18px] font-bold text-slate-900">Login sessions</h2>
                 <p className="text-[13px] text-slate-500 font-medium mt-1">Places where you&apos;re logged into Grapepay.</p>
              </div>
              <Button variant="outline" size="sm" className="h-10 font-bold text-slate-600 border-slate-200 shadow-sm px-4">
                 Sign out all other sessions
              </Button>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full">
                 <thead>
                    <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                       <th className="text-left pb-3 font-bold">Location</th>
                       <th className="text-left pb-3 font-bold">Device</th>
                       <th className="text-left pb-3 font-bold">IP Address</th>
                       <th className="text-left pb-3 font-bold">Time</th>
                       <th className="text-right pb-3 font-bold"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {loginSessions.map((session, i) => (
                       <tr key={i} className="text-[13px] group">
                          <td className="py-4 font-bold text-slate-900">{session.location}</td>
                          <td className="py-4 font-medium text-slate-500">{session.device}</td>
                          <td className="py-4 font-mono text-slate-500">{session.ip}</td>
                          <td className="py-4 font-medium text-slate-500">{session.time}</td>
                          <td className="py-4 text-right font-medium text-slate-500">{session.status}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </section>

        {/* Accounts Section */}
        <section className="space-y-6 pb-20">
           <div className="border-b border-slate-100 pb-2">
              <h2 className="text-[18px] font-bold text-slate-900">Accounts</h2>
              <p className="text-[13px] text-slate-500 font-medium mt-1">The list of accounts to which you are a member.</p>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full">
                 <thead>
                    <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                       <th className="text-left pb-3 font-bold">Name</th>
                       <th className="text-left pb-3 font-bold">ID</th>
                       <th className="text-right pb-3 font-bold"></th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr className="text-[13px] group">
                       <td className="py-4 flex items-center gap-3">
                          <Building2 size={16} className="text-slate-400" />
                          <span className="font-bold text-slate-900">{user?.business_name || 'nextpayments'}</span>
                       </td>
                       <td className="py-4 font-mono text-slate-500">{user?.id || 'grape_1RoibjDcLq3VFmkC72819283748291'}</td>
                       <td className="py-4 text-right">
                          <button className="text-slate-300 hover:text-slate-600 transition-colors"><MoreHorizontal size={18} /></button>
                       </td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
