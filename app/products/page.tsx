'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  Plus, 
  HelpCircle, 
  Settings, 
  ChevronRight, 
  X, 
  Download, 
  BarChart3, 
  ShoppingBag, 
  PlusCircle, 
  Calendar,
  Filter,
  ArrowRight,
  Package,
  Layers,
  ChevronDown,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState('all-products');
  const [data, setData] = useState({ products: [], features: [], coupons: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, featRes, cpnRes] = await Promise.all([
          fetch('http://localhost:3001/api/products'),
          fetch('http://localhost:3001/api/features'),
          fetch('http://localhost:3001/api/coupons')
        ]);
        
        const products = await prodRes.json();
        const features = await featRes.json();
        const coupons = await cpnRes.json();
        
        setData({ products, features, coupons });
      } catch (err) {
        console.error('Failed to fetch catalog data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const tabs = [
    { id: 'all-products', label: 'All products' },
    { id: 'features', label: 'Features' },
    { id: 'coupons', label: 'Coupons' },
    { id: 'shipping-rates', label: 'Shipping rates' },
    { id: 'tax-rates', label: 'Tax rates' },
    { id: 'pricing-tables', label: 'Pricing tables' },
  ];

  const renderContent = () => {
    if (loading) return (
      <div className="flex items-center justify-center py-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#635bff]"></div>
      </div>
    );

    switch (activeTab) {
      case 'all-products':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[
                 { label: 'All', count: data.products.length },
                 { label: 'Active', count: data.products.filter(p => p.status === 'active').length, active: true },
                 { label: 'Archived', count: data.products.filter(p => p.status === 'archived').length },
               ].map(card => (
                  <div 
                    key={card.label}
                    className={cn(
                       "p-5 bg-white border rounded-xl transition-all cursor-pointer group hover:bg-slate-50",
                       card.active ? "border-[#635bff] ring-2 ring-purple-50 shadow-sm shadow-purple-200" : "border-slate-200"
                    )}
                  >
                     <p className={cn("text-[13px] font-bold tracking-tight mb-2 transition-colors", card.active ? "text-[#635bff]" : "text-slate-500 group-hover:text-slate-700")}>{card.label}</p>
                     <p className="text-[24px] font-bold text-slate-900 tracking-tight">{card.count}</p>
                     {card.active && <div className="mt-4 h-1 w-full bg-[#635bff] rounded-full" />}
                  </div>
               ))}
            </div>

            {data.products.length > 0 ? (
               <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-white border-b border-slate-200">
                           <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Name</th>
                           <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                           <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Price</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        {data.products.map(product => (
                           <tr key={product.id} className="hover:bg-slate-50 cursor-pointer">
                              <td className="px-6 py-4">
                                 <p className="text-[14px] font-bold text-slate-900">{product.name}</p>
                                 <p className="text-[12px] text-slate-500">{product.description}</p>
                              </td>
                              <td className="px-6 py-4">
                                 <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[11px] font-bold border border-emerald-100 capitalize">{product.status}</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <p className="text-[14px] font-bold text-slate-900">${product.price.toFixed(2)} {product.currency}</p>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            ) : (
               <div className="flex flex-col items-center justify-center py-20 space-y-6 text-center">
                  <div className="h-12 w-12 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-300 shadow-sm">
                     <Package size={24} />
                  </div>
                  <div className="space-y-1.5">
                     <h3 className="text-[16px] font-bold text-slate-900 tracking-tight">Add your first product</h3>
                     <p className="text-[13px] text-slate-500 font-medium max-w-sm tracking-tight leading-relaxed">
                        Products are what you sell to customers. They can be anything from physical goods to digital services or subscription plans.
                     </p>
                  </div>
                  <Button className="bg-[#635bff] hover:bg-[#5851eb] h-9 px-5 gap-2 shadow-lg shadow-purple-600/10 font-bold text-sm rounded-lg mt-4 active:scale-95 transition-all">
                     <Plus size={16} /> Add a product
                  </Button>
               </div>
            )}
          </div>
        );
      case 'features':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[
                 { label: 'All features', count: data.features.length },
                 { label: 'Active', count: data.features.filter(f => f.status === 'active').length, active: true },
                 { label: 'Archived', count: data.features.filter(f => f.status === 'archived').length },
               ].map(card => (
                  <div 
                    key={card.label}
                    className={cn(
                       "p-5 bg-white border rounded-xl transition-all cursor-pointer group hover:bg-slate-50",
                       card.active ? "border-[#635bff] ring-2 ring-purple-50 shadow-sm shadow-purple-200" : "border-slate-200"
                    )}
                  >
                     <p className={cn("text-[13px] font-bold tracking-tight mb-2 transition-colors", card.active ? "text-[#635bff]" : "text-slate-500 group-hover:text-slate-700")}>{card.label}</p>
                     <p className="text-[24px] font-bold text-slate-900 tracking-tight">{card.count}</p>
                     {card.active && <div className="mt-4 h-1 w-full bg-[#635bff] rounded-full" />}
                  </div>
               ))}
            </div>

            {data.features.length > 0 ? (
               <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-white border-b border-slate-200">
                           <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Feature</th>
                           <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                           <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Created</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        {data.features.map(feat => (
                           <tr key={feat.id} className="hover:bg-slate-50 cursor-pointer">
                              <td className="px-6 py-4">
                                 <p className="text-[14px] font-bold text-slate-900">{feat.name}</p>
                              </td>
                              <td className="px-6 py-4">
                                 <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[11px] font-bold border border-blue-100 capitalize">{feat.status}</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <p className="text-[12px] font-bold text-slate-400">{new Date(feat.created).toLocaleDateString()}</p>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            ) : (
               <div className="flex flex-col items-center justify-center py-20 space-y-6 text-center">
                  <div className="h-12 w-12 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-300 shadow-sm">
                     <Layers size={24} />
                  </div>
                  <div className="space-y-1.5">
                     <h3 className="text-[16px] font-bold text-slate-900 tracking-tight">Start by adding a feature</h3>
                     <p className="text-[13px] text-slate-500 font-medium max-w-sm tracking-tight leading-relaxed">
                        Features are monetizable capabilities that can be linked to products.
                     </p>
                  </div>
                  <Button className="bg-[#635bff] hover:bg-[#5851eb] h-9 px-5 gap-2 shadow-lg shadow-purple-600/10 font-bold text-sm rounded-lg mt-4 shadow-lg shadow-purple-600/20 active:scale-95 transition-all">
                     <Plus size={16} /> Create feature
                  </Button>
               </div>
            )}
          </div>
        );
      case 'coupons':
        return (
          <div className="flex flex-col items-center justify-center py-32 space-y-6 text-center">
            <div className="h-12 w-12 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-300 shadow-sm">
               <Info size={24} />
            </div>
            <div className="space-y-1.5">
               <h3 className="text-[16px] font-bold text-slate-900 tracking-tight">No coupons</h3>
               <p className="text-[13px] text-slate-500 font-medium max-w-sm">Create coupons to offer discounts on invoices, subscriptions, or entire customer accounts.</p>
            </div>
            <Button className="bg-[#635bff] hover:bg-[#5851eb] h-9 px-5 gap-2 shadow-lg shadow-purple-600/10 font-bold text-sm rounded-lg mt-4">
               <Plus size={16} /> Create coupon
            </Button>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="h-12 w-12 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-300">
               <ShoppingBag size={24} />
            </div>
            <p className="text-slate-500 font-bold text-[15px]">No {activeTab.replace('-', ' ')} found</p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        {/* Page Content */}
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
             <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Product catalog</h1>
             <div className="flex items-center gap-2">
                <Button variant="outline" className="text-slate-600 font-bold text-sm h-8 px-4 bg-white shadow-sm hover:bg-slate-50 border-slate-200">
                   <BarChart3 size={14} className="mr-2 text-slate-400" /> Analyze
                </Button>
                <Button className="bg-[#635bff] hover:bg-[#5851eb] h-8 px-4 gap-1 shadow-lg shadow-purple-600/10 font-bold text-sm rounded-lg">
                   <Plus size={16} /> {activeTab === 'features' ? 'Create feature' : 'Create product'} <span className="opacity-50 text-[10px] ml-1 font-black">N</span>
                </Button>
             </div>
          </div>

          <div className="flex items-center gap-6 border-b border-slate-100 overflow-x-auto scrollbar-hide">
             {tabs.map(tab => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={cn(
                   "pb-3 text-[14px] font-bold transition-all whitespace-nowrap",
                   activeTab === tab.id ? "text-[#635bff] border-b-2 border-[#635bff]" : "text-slate-500 hover:text-slate-900"
                 )}
               >
                 {tab.label}
               </button>
             ))}
          </div>

          <div className="min-h-[400px]">
             {renderContent()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
