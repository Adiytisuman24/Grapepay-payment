'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  X, 
  Plus, 
  ChevronDown, 
  Monitor, 
  Smartphone, 
  Check,
  ShieldCheck,
  Info,
  CreditCard,
  Upload,
  CircleCheck,
  LayoutGrid
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { getCurrencyForCountry } from '@/lib/currencies';

type PaymentType = 'products' | 'donation';

export default function CreatePaymentLink() {
  const router = useRouter();
  const [currency, setCurrency] = useState('USD');
  const [activeTab, setActiveTab] = useState<'payment-page' | 'after-payment'>('payment-page');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [paymentType, setPaymentType] = useState<PaymentType>('products');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    suggestPreset: false,
    setLimits: false,
    afterPaymentChoice: 'show-confirmation' as 'show-confirmation' | 'no-confirmation',
    replaceDefaultMessage: false,
    splitPayment: false,
    createInvoicePdf: false,
  });

  // Options state
  const [options, setOptions] = useState({
    collectTax: true,
    collectNames: false,
    collectBusinesses: false,
    collectAddresses: false,
    requirePhone: false,
    limitPayments: false,
    addCustomFields: false,
    allowPromoCodes: false,
    allowTaxIds: false,
    saveDetails: false,
    requireTerms: false,
    cta: 'Pay'
  });

  useEffect(() => {
    const userStr = localStorage.getItem('grapepay_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.region) {
          setCurrency(getCurrencyForCountry(user.region));
        }
      } catch (e) {}
    }
  }, []);

  const toggleOption = (key: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateFormData = (key: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-slate-100 flex items-center justify-between px-4 fixed top-0 left-0 right-0 bg-white z-[60]">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
          <div className="h-6 w-px bg-slate-200" />
          <h1 className="text-[14px] font-bold text-slate-900 tracking-tight">Create a payment link</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            className="h-8 bg-[#635bff] hover:bg-[#5249f0] text-white text-[13px] font-bold px-4 rounded-lg shadow-sm"
          >
            Create link <Check size={14} className="ml-1.5 opacity-60" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex pt-14 h-[calc(100vh)]">
        {/* Left Side - Configuration */}
        <div className="w-[480px] border-r border-slate-100 flex flex-col bg-white overflow-hidden">
          <div className="flex-1 overflow-y-auto p-12 space-y-10 custom-scrollbar">
            {/* Select Type */}
            <div className="space-y-4">
              <Label className="text-[16px] font-black text-slate-950">Select type</Label>
              <Select value={paymentType} onValueChange={(v) => setPaymentType(v as PaymentType)}>
                <SelectTrigger className="h-[44px] bg-white border-slate-200 rounded-xl px-4 text-[14px] font-medium transition-all hover:bg-slate-50">
                  <SelectValue placeholder="Products or subscriptions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="products">Products or subscriptions</SelectItem>
                  <SelectItem value="donation">Customers choose what to pay</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-slate-100">
              <button 
                onClick={() => setActiveTab('payment-page')}
                className={cn(
                  "pb-4 text-[14px] font-semibold transition-all relative",
                  activeTab === 'payment-page' ? "text-[#635bff]" : "text-slate-400 hover:text-slate-600"
                )}
              >
                Payment page
                {activeTab === 'payment-page' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#635bff] rounded-full" />}
              </button>
              <button 
                onClick={() => setActiveTab('after-payment')}
                className={cn(
                  "pb-4 text-[14px] font-semibold transition-all relative",
                  activeTab === 'after-payment' ? "text-[#635bff]" : "text-slate-400 hover:text-slate-600"
                )}
              >
                After payment
                {activeTab === 'after-payment' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#635bff] rounded-full" />}
              </button>
            </div>

            {activeTab === 'payment-page' ? (
              <>
                {paymentType === 'products' ? (
                  /* Products Mode */
                  <div className="space-y-10 animate-in fade-in slide-in-from-left-2 duration-500">
                    <div className="space-y-4">
                       <Label className="text-[16px] font-black text-slate-950 uppercase tracking-tight">Product</Label>
                       <div className="space-y-3">
                          <div className="relative group">
                            <Input 
                              placeholder="Find or add a product..."
                              className="h-[48px] border-slate-200 rounded-xl pl-4 pr-10 focus:ring-2 focus:ring-[#635bff]/20 group-focus-within:border-[#635bff] transition-all"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded border-2 border-slate-200 group-focus-within:border-[#635bff]" />
                          </div>
                          <Button 
                            variant="ghost" 
                            className="h-10 text-[#635bff] font-bold text-[14px] hover:bg-slate-50 justify-start px-2 gap-2 w-full"
                          >
                            <Plus size={16} /> Add new product
                          </Button>
                          <button className="text-[12px] font-bold text-[#635bff] flex items-center gap-1.5 mt-2">
                             <PlusCircleIcon size={14} /> Add recommended products <Info size={12} className="text-slate-300"/>
                          </button>
                       </div>
                    </div>

                    {/* Options Section */}
                    <div className="space-y-6 pt-2">
                        <Label className="text-[16px] font-black text-slate-950 uppercase tracking-tight">Options</Label>
                        
                        <div className="space-y-4">
                            {[
                            { id: 'collectTax', label: 'Collect tax automatically', icon: null },
                            { id: 'collectNames', label: "Collect customers' names", badge: 'New' },
                            { id: 'collectBusinesses', label: "Collect businesses' names", badge: 'New' },
                            { id: 'collectAddresses', label: "Collect customers' addresses", tooltip: true },
                            { id: 'requirePhone', label: "Require customers to provide a phone number", tooltip: true },
                            { id: 'limitPayments', label: "Limit the number of payments", tooltip: true }
                            ].map((option) => (
                            <div key={option.id} className="group">
                                <div 
                                className="flex items-center gap-3 cursor-pointer select-none"
                                onClick={() => toggleOption(option.id as any)}
                                >
                                <div className={cn(
                                    "w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center",
                                    options[option.id as keyof typeof options] 
                                    ? "bg-[#635bff] border-[#635bff]" 
                                    : "bg-white border-slate-200 hover:border-slate-300"
                                )}>
                                    {options[option.id as keyof typeof options] && <Check size={14} className="text-white" strokeWidth={4} />}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[14px] font-medium text-slate-700 leading-none">{option.label}</span>
                                    {option.badge && <Badge className="bg-[#635bff]/10 text-[#635bff] text-[10px] font-black px-1.5 py-0 h-4 border-none hover:bg-purple-100 transition-colors">{option.badge}</Badge>}
                                    {option.tooltip && <Info size={14} className="text-slate-300 hover:text-slate-400" />}
                                </div>
                                </div>
                                
                                {/* Mark as Optional sub-option */}
                                {(option.id === 'collectNames' || option.id === 'collectBusinesses') && options[option.id as keyof typeof options] && (
                                <div className="ml-8 mt-3 animate-in slide-in-from-top-2 duration-300">
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <div className="w-4 h-4 rounded border border-slate-200 flex items-center justify-center" />
                                        <span className="text-[12px] font-semibold text-slate-500">Mark as optional</span>
                                    </div>
                                </div>
                                )}
                            </div>
                            ))}
                        </div>
                    </div>
                  </div>
                ) : (
                  /* Donation Mode */
                  <div className="space-y-10 animate-in fade-in slide-in-from-left-2 duration-500">
                    <div className="grid grid-cols-1 gap-8">
                       <div className="space-y-8">
                          <div className="space-y-4">
                             <div className="flex justify-between items-center">
                                <Label className="text-[14px] font-black text-slate-950">Title</Label>
                                <div className="flex items-center gap-2">
                                   <Label className="text-[14px] font-black text-slate-950">Image</Label>
                                   <Info size={14} className="text-slate-300" />
                                   <Badge className="bg-slate-100 text-slate-500 text-[10px] uppercase font-black hover:bg-slate-200">Optional</Badge>
                                </div>
                             </div>
                             <div className="flex gap-4">
                                <div className="flex-1">
                                   <Input 
                                      placeholder="Name of cause or service"
                                      className="h-[40px] border-slate-200 rounded-lg"
                                      value={formData.title}
                                      onChange={(e) => updateFormData('title', e.target.value)}
                                   />
                                </div>
                                <div className="w-24 h-24 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center bg-slate-50 hover:bg-white transition-colors cursor-pointer group">
                                   <Upload size={20} className="text-slate-300 group-hover:text-[#635bff] transition-colors" />
                                   <span className="text-[10px] font-bold text-[#635bff] mt-1">Upload</span>
                                </div>
                             </div>
                          </div>

                          <div className="space-y-4">
                             <div className="flex items-center gap-2">
                                <Label className="text-[14px] font-black text-slate-950">Description</Label>
                                <Badge className="bg-slate-100 text-slate-500 text-[10px] uppercase font-black hover:bg-slate-200">Optional</Badge>
                             </div>
                             <Textarea 
                                placeholder="Give customers more detail about what they're paying for."
                                className="min-h-[100px] border-slate-200 rounded-lg resize-none"
                                value={formData.description}
                                onChange={(e) => updateFormData('description', e.target.value)}
                             />
                          </div>

                          <div className="space-y-4">
                             <Label className="text-[14px] font-black text-slate-950">Currency</Label>
                             <Select value={currency} onValueChange={setCurrency}>
                                <SelectTrigger className="h-[40px] border-slate-200 rounded-lg">
                                   <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                   <SelectItem value="AED">AED - United Arab Emirates Dirham</SelectItem>
                                   <SelectItem value="USD">USD - US Dollar</SelectItem>
                                   <SelectItem value="EUR">EUR - Euro</SelectItem>
                                   <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                                </SelectContent>
                             </Select>
                          </div>

                          <div className="space-y-4 pt-2">
                             <div className="flex items-center gap-3 cursor-pointer group" onClick={() => updateFormData('suggestPreset', !formData.suggestPreset)}>
                                <div className={cn(
                                   "w-4 h-4 rounded border transition-all flex items-center justify-center",
                                   formData.suggestPreset ? "bg-[#635bff] border-[#635bff]" : "border-slate-200 bg-white"
                                )}>
                                   {formData.suggestPreset && <Check size={12} className="text-white" strokeWidth={4} />}
                                </div>
                                <span className="text-[13px] font-medium text-slate-600">Suggest a preset amount <Info size={12} className="inline text-slate-300 ml-1"/></span>
                             </div>

                             <div className="flex items-center gap-3 cursor-pointer group" onClick={() => updateFormData('setLimits', !formData.setLimits)}>
                                <div className={cn(
                                   "w-4 h-4 rounded border transition-all flex items-center justify-center",
                                   formData.setLimits ? "bg-[#635bff] border-[#635bff]" : "border-slate-200 bg-white"
                                )}>
                                   {formData.setLimits && <Check size={12} className="text-white" strokeWidth={4} />}
                                </div>
                                <span className="text-[13px] font-medium text-slate-600">Set limits <Info size={12} className="inline text-slate-300 ml-1"/></span>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
                )}

                {/* Shared Advanced Options for Payment Page Tab */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <button 
                    onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                    className="flex items-center justify-between w-full py-2 group"
                  >
                    <span className="text-[16px] font-black text-slate-950 uppercase tracking-tight">Advanced options</span>
                    <ChevronDown className={cn("text-slate-400 group-hover:text-slate-600 transition-transform", isAdvancedOpen && "rotate-180")} size={20} />
                  </button>

                  {isAdvancedOpen && (
                    <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
                       <div className="flex items-center gap-4">
                          <Select 
                            value={options.cta} 
                            onValueChange={(v) => setOptions(prev => ({...prev, cta: v}))}
                          >
                            <SelectTrigger className="w-24 h-9 border-slate-200 rounded-lg font-bold">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pay">Pay</SelectItem>
                              <SelectItem value="Book">Book</SelectItem>
                              <SelectItem value="Donate">Donate</SelectItem>
                            </SelectContent>
                          </Select>
                          <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">as the call to action</span>
                       </div>

                       <div className="space-y-4">
                          {[
                            { id: 'collectNames', label: "Collect customers' names", badge: 'New' },
                            { id: 'collectBusinesses', label: "Collect businesses' names", badge: 'New' },
                            { id: 'limitPayments', label: "Limit the number of payments", tooltip: true },
                            { id: 'addCustomFields', label: 'Add custom fields', tooltip: true },
                            { id: 'allowTaxIds', label: 'Allow business customers to provide tax IDs', tooltip: true },
                            { id: 'requireTerms', label: 'Require customers to accept your terms of service', tooltip: true },
                            { id: 'collectTax', label: 'Collect tax automatically', icon: null },
                            { id: 'collectAddresses', label: "Collect customers' addresses", icon: null },
                            { id: 'requirePhone', label: "Require customers to provide a phone number", tooltip: true },
                          ].map((option) => (
                            <div key={option.id} className="space-y-2">
                               <div className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleOption(option.id as any)}>
                                <div className={cn(
                                    "w-4 h-4 rounded border transition-all flex items-center justify-center",
                                    options[option.id as keyof typeof options] ? "bg-[#635bff] border-[#635bff]" : "bg-white border-slate-200"
                                )}>
                                    {options[option.id as keyof typeof options] && <Check size={12} className="text-white" strokeWidth={4} />}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[13px] font-medium text-slate-700">{option.label}</span>
                                    {option.badge && <Badge className="bg-[#635bff]/10 text-[#635bff] text-[9px] font-black h-3.5 px-1">{option.badge}</Badge>}
                                    {option.tooltip && <Info size={12} className="text-slate-300" />}
                                </div>
                               </div>
                               
                               {/* Sub-option for Tax ID */}
                               {option.id === 'allowTaxIds' && options.allowTaxIds && (
                                 <div className="ml-7 flex items-center gap-2 animate-in slide-in-from-top-1 duration-300">
                                    <div className="w-3.5 h-3.5 border border-slate-200 rounded" />
                                    <span className="text-[12px] text-slate-400 font-medium">Require tax ID collection for customers in supported countries</span>
                                 </div>
                               )}
                            </div>
                          ))}
                       </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* After Payment Tab */
              <div className="space-y-10 animate-in fade-in slide-in-from-right-2 duration-500">
                <div className="space-y-6">
                   <div className="space-y-2">
                      <Label className="text-[16px] font-black text-slate-950 tracking-tight">Confirmation page</Label>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="flex items-start gap-3 cursor-pointer" onClick={() => updateFormData('afterPaymentChoice', 'show-confirmation')}>
                         <div className={cn(
                            "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all mt-0.5",
                            formData.afterPaymentChoice === 'show-confirmation' ? "border-[#635bff]" : "border-slate-300"
                         )}>
                            {formData.afterPaymentChoice === 'show-confirmation' && <div className="w-2 h-2 rounded-full bg-[#635bff]" />}
                         </div>
                         <div className="space-y-3">
                            <span className="text-[14px] font-bold text-slate-700 leading-none">Show confirmation page</span>
                            
                            {formData.afterPaymentChoice === 'show-confirmation' && (
                               <div className="flex items-center gap-2 py-1 animate-in slide-in-from-top-2 duration-300">
                                  <div 
                                    className={cn(
                                       "w-4 h-4 rounded border transition-all flex items-center justify-center",
                                       formData.replaceDefaultMessage ? "bg-[#635bff] border-[#635bff]" : "border-slate-200 bg-white"
                                    )}
                                    onClick={(e) => { e.stopPropagation(); updateFormData('replaceDefaultMessage', !formData.replaceDefaultMessage); }}
                                  >
                                     {formData.replaceDefaultMessage && <Check size={12} className="text-white" strokeWidth={4} />}
                                  </div>
                                  <span className="text-[13px] font-semibold text-slate-600">Replace default with custom message</span>
                               </div>
                            )}
                         </div>
                      </div>

                      <div className="flex items-start gap-3 cursor-pointer" onClick={() => updateFormData('afterPaymentChoice', 'no-confirmation')}>
                         <div className={cn(
                            "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all mt-0.5",
                            formData.afterPaymentChoice === 'no-confirmation' ? "border-[#635bff]" : "border-slate-300"
                         )}>
                            {formData.afterPaymentChoice === 'no-confirmation' && <div className="w-2 h-2 rounded-full bg-[#635bff]" />}
                         </div>
                         <div className="space-y-1">
                            <span className="text-[14px] font-bold text-slate-700 leading-none">Don&apos;t show confirmation page</span>
                            <p className="text-[12px] text-slate-400 font-medium">Redirect customers to your website.</p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100">
                   <Label className="text-[16px] font-black text-slate-950 tracking-tight">Connect</Label>
                   <div className="flex items-center gap-3 cursor-pointer group" onClick={() => updateFormData('splitPayment', !formData.splitPayment)}>
                      <div className={cn(
                         "w-4 h-4 rounded border transition-all flex items-center justify-center",
                         formData.splitPayment ? "bg-[#635bff] border-[#635bff]" : "border-slate-200 bg-white"
                      )}>
                         {formData.splitPayment && <Check size={12} className="text-white" strokeWidth={4} />}
                      </div>
                      <span className="text-[13px] font-medium text-slate-600">Split the payment with a connected account</span>
                   </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100">
                   <Label className="text-[16px] font-black text-slate-950 tracking-tight">Post-payment invoice</Label>
                   <div className="flex items-start gap-3 cursor-pointer group" onClick={() => updateFormData('createInvoicePdf', !formData.createInvoicePdf)}>
                      <div className={cn(
                         "w-4 h-4 rounded border transition-all flex items-center justify-center mt-1",
                         formData.createInvoicePdf ? "bg-[#635bff] border-[#635bff]" : "border-slate-200 bg-white"
                      )}>
                         {formData.createInvoicePdf && <Check size={12} className="text-white" strokeWidth={4} />}
                      </div>
                      <div className="space-y-1.5 flex-1">
                         <span className="text-[13px] font-bold text-slate-700">Create an invoice PDF</span>
                         <p className="text-[12px] text-slate-400 font-medium leading-relaxed">
                            GrapePay charges 0.4% of the transaction total, up to a maximum of $2.00 per invoice. <button className="text-[#635bff] hover:underline">Learn more.</button>
                         </p>
                      </div>
                   </div>
                   <p className="text-[12px] text-slate-400 font-medium leading-relaxed pl-7">
                      Post-payment invoices provide more information than a regular receipt. If you want to send a regular receipt, you can choose to email customers about successful payments in <button className="text-[#635bff] hover:underline">email settings</button>. Configure your invoice, including adding a memo, footer, and your tax ID in <button className="text-[#635bff] hover:underline">invoice template settings</button>.
                   </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="flex-1 bg-[#f7f8f9] flex flex-col items-center justify-center relative p-8">
           <div className="absolute top-8 right-8 flex items-center bg-white rounded-xl shadow-lg border border-slate-200 p-1 z-10">
              <button 
                onClick={() => setPreviewDevice('desktop')}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  previewDevice === 'desktop' ? "bg-slate-50 text-[#635bff]" : "text-slate-400 hover:bg-slate-50"
                )}
              >
                <Monitor size={18} />
              </button>
              <button 
                onClick={() => setPreviewDevice('mobile')}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  previewDevice === 'mobile' ? "bg-slate-50 text-[#635bff]" : "text-slate-400 hover:bg-slate-50"
                )}
              >
                <Smartphone size={18} />
              </button>
           </div>

           <div className="p-8 text-center absolute top-4">
              <h2 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest border-b-2 border-slate-200 pb-0.5 relative">
                 Preview
                 {activeTab === 'after-payment' && <div className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-[#635bff]" />}
              </h2>
              {activeTab === 'after-payment' && (
                 <div className="text-[12px] font-bold text-[#635bff] uppercase mt-2">Confirmation page</div>
              )}
           </div>

           {/* Preview Card */}
           <div className={cn(
              "bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-700 border border-slate-100 relative",
              previewDevice === 'desktop' ? "w-full max-w-[950px] h-[600px]" : "w-[375px] h-[667px]"
           )}>
              {activeTab === 'payment-page' ? (
                /* Payment Page Preview */
                <>
                  {paymentType === 'donation' && !options.collectNames && !options.collectBusinesses ? (
                    <div className="h-full flex items-center justify-center bg-slate-50/50 p-20 text-center">
                       <div className="px-8 py-3 bg-white rounded-full shadow-sm border border-[#635bff]/20">
                          <p className="text-[#635bff] font-bold text-[14px]">Turn on a payment method to see a preview of your checkout</p>
                       </div>
                    </div>
                  ) : (
                    <div className={cn(
                      "h-full flex overflow-hidden",
                      previewDevice === 'desktop' ? "flex-row" : "flex-col overflow-y-auto custom-scrollbar"
                    )}>
                      {/* Left Half / Top - Summary */}
                      <div className={cn(
                        "p-12 space-y-12 transition-all duration-500",
                        previewDevice === 'desktop' ? "w-[45%] border-r border-slate-50" : "w-full text-center space-y-4 pb-0"
                      )}>
                          <div className={cn("flex items-center gap-2", previewDevice === 'mobile' && "justify-center")}>
                            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-xs italic">G</div>
                            <span className="text-sm font-black text-slate-950 uppercase tracking-tighter">GrapePay</span>
                          </div>

                          <div className={cn("space-y-1", previewDevice === 'mobile' && "space-y-0 pt-4")}>
                            {previewDevice === 'desktop' && <p className="text-slate-400 text-[14px] font-bold">Pay</p>}
                            <p className={cn("text-slate-600 font-bold", previewDevice === 'mobile' ? "text-[16px]" : "text-[14px]")}>Product name</p>
                            <h3 className={cn(
                              "font-black text-slate-900 tracking-tight",
                              previewDevice === 'mobile' ? "text-[28px]" : "text-[32px]"
                            )}>
                              {currency} 0.00
                            </h3>
                          </div>

                          {previewDevice === 'desktop' && (
                            <div className="space-y-4 animate-in fade-in duration-700">
                              <div className="flex items-center justify-between text-[14px] font-bold">
                                  <span className="text-slate-400">Product name</span>
                                  <span className="text-slate-900">{currency} 0.00</span>
                              </div>
                              <div className="h-px bg-slate-50" />
                              <div className="flex items-center justify-between text-[14px] font-bold">
                                  <span className="text-slate-400">Subtotal</span>
                                  <span className="text-slate-900">{currency} 0.00</span>
                              </div>
                              <div className="flex items-center justify-between text-[14px] font-bold">
                                  <div className="flex items-center gap-1.5 text-slate-400">
                                    Tax <Info size={12} />
                                  </div>
                                  <span className="text-slate-400 text-[12px] font-semibold italic">Enter address to calculate</span>
                              </div>
                              <div className="h-px bg-slate-50" />
                              <div className="flex items-center justify-between text-[14px] font-black">
                                  <span className="text-slate-400 uppercase tracking-widest">Total due</span>
                                  <span className="text-slate-900">{currency} 0.00</span>
                              </div>
                            </div>
                          )}
                      </div>

                      {/* Right Half / Bottom - Form */}
                      <div className={cn(
                        "flex-1 p-12 lg:space-y-8 h-full transition-all duration-500",
                        previewDevice === 'desktop' ? "overflow-y-auto custom-scrollbar" : "px-6 pt-8 pb-12"
                      )}>
                          <div className="space-y-8">
                            {previewDevice === 'desktop' && <h4 className="text-[20px] font-black text-slate-950 tracking-tight">Pay with card</h4>}
                            
                            <div className="space-y-6">
                                <div className="space-y-1.5">
                                  <Label className="text-[13px] font-bold text-slate-500">Email</Label>
                                  <Input placeholder="email@example.com" className="h-11 border-slate-200 rounded-xl font-medium focus:ring-1 focus:ring-[#635bff]" />
                                </div>

                                {(options.collectNames || options.collectBusinesses) && (
                                  <div className="space-y-4 animate-in slide-in-from-top-4 duration-500">
                                    <div className="text-[13px] font-bold text-slate-900 uppercase tracking-widest mb-2 border-b border-slate-50 pb-1">Contact details</div>
                                    {options.collectNames && (
                                      <div className="space-y-1.5 animate-in fade-in duration-500">
                                          <div className="relative group">
                                            <Input placeholder="Full name" className="h-11 border-slate-200 rounded-xl font-medium pl-10" />
                                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300">
                                                <Smartphone size={16} />
                                            </div>
                                          </div>
                                      </div>
                                    )}
                                    {options.collectBusinesses && (
                                      <div className="space-y-1.5 animate-in fade-in duration-500">
                                          <div className="relative group">
                                            <Input placeholder="Business name" className="h-11 border-slate-200 rounded-xl font-medium pl-10" />
                                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300">
                                                <ShieldCheck size={16} />
                                            </div>
                                          </div>
                                      </div>
                                    )}
                                  </div>
                                )}

                                <div className="space-y-1.5">
                                  <Label className="text-[13px] font-bold text-slate-500">Payment method</Label>
                                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                      <div className="px-4 py-3 bg-slate-50/50">
                                        <span className="text-[13px] font-bold text-slate-900">Card information</span>
                                      </div>
                                      <div className="p-4 space-y-0 bg-white border-t border-slate-100">
                                        <div className="relative">
                                            <Input placeholder="1234 1234 1234 1234" className="h-11 border-none rounded-none border-b border-slate-100 focus-visible:ring-0 text-slate-600 font-mono tracking-widest pl-0" />
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-1 items-center">
                                              <CreditCard size={18} className="text-slate-300 mr-2" />
                                              <div className="w-6 h-4 bg-slate-100 rounded-sm" />
                                              <div className="w-6 h-4 bg-slate-100 rounded-sm" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <Input placeholder="MM / YY" className="h-11 border-none rounded-none border-r border-slate-100 focus-visible:ring-0 pl-0" />
                                            <div className="relative">
                                              <Input placeholder="CVC" className="h-11 border-none rounded-none focus-visible:ring-0 pl-4 pr-10" />
                                              <CreditCard size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                            </div>
                                        </div>
                                      </div>
                                  </div>
                                </div>

                                <div className="space-y-1.5">
                                  <Label className="text-[13px] font-bold text-slate-500">Cardholder name</Label>
                                  <Input placeholder="Full name on card" className="h-11 border-slate-200 rounded-xl font-medium" />
                                </div>

                                <div className="space-y-1.5">
                                  <Label className="text-[13px] font-bold text-slate-500">Country or region</Label>
                                  <div className="space-y-0 shadow-sm border border-slate-200 rounded-xl overflow-hidden">
                                      <Select defaultValue="us">
                                        <SelectTrigger className="h-11 bg-white border-none rounded-none border-b border-slate-100 focus:ring-0 px-4 font-bold text-slate-700">
                                          <SelectValue placeholder="United States" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="us">United States</SelectItem>
                                          <SelectItem value="ae">United Arab Emirates</SelectItem>
                                          <SelectItem value="in">India</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      {previewDevice === 'desktop' && (
                                        <>
                                          <Input placeholder="Address line 1" className="h-11 bg-white border-none rounded-none border-b border-slate-100 focus-visible:ring-0 px-4 font-medium" />
                                          <Input placeholder="Address line 2" className="h-11 bg-white border-none rounded-none border-b border-slate-100 focus-visible:ring-0 px-4 font-medium" />
                                          <div className="grid grid-cols-2">
                                            <Input placeholder="City" className="h-11 bg-white border-none rounded-none border-r border-slate-100 focus-visible:ring-0 px-4 font-medium" />
                                            <Input placeholder="ZIP" className="h-11 bg-white border-none rounded-none focus-visible:ring-0 px-4 font-medium" />
                                          </div>
                                          <Select defaultValue="ny">
                                            <SelectTrigger className="h-11 bg-white border-none rounded-none focus:ring-0 px-4 font-bold text-slate-700">
                                              <SelectValue placeholder="State" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="ny">New York</SelectItem>
                                              <SelectItem value="ca">California</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </>
                                      )}
                                      {previewDevice === 'mobile' && (
                                        <Input placeholder="ZIP" className="h-11 bg-white border-none rounded-none focus-visible:ring-0 px-4 font-medium" />
                                      )}
                                  </div>
                                </div>
                            </div>

                             <Button className="w-full h-12 bg-[#0070f3] hover:bg-[#0761d1] text-white font-black text-[15px] rounded-xl shadow-lg shadow-blue-500/10 transition-all active:scale-[0.98]">
                                 {options.cta}
                             </Button>

                            <p className="text-[11px] text-center text-slate-400 font-bold uppercase tracking-widest pb-8">
                                Powered by <span className="text-[#635bff] italic">GrapePay</span> • <span className="hover:text-slate-600 cursor-pointer">Terms</span> • <span className="hover:text-slate-600 cursor-pointer">Privacy</span>
                            </p>
                          </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* After Payment Preview */
                <div className="h-full flex flex-col lg:flex-row animate-in fade-in duration-700">
                   {/* Left Summary Side */}
                   <div className="lg:w-[45%] p-12 lg:border-r border-slate-50 space-y-12">
                      <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-xs italic">G</div>
                         <span className="text-sm font-black text-slate-950 uppercase tracking-tighter">GrapePay</span>
                      </div>

                      <div className="space-y-4">
                         <div className="flex items-center justify-between text-[14px] font-bold">
                            <span className="text-slate-400">Product name</span>
                            <span className="text-slate-900">{currency} 0.00</span>
                         </div>
                         <div className="h-px bg-slate-50" />
                         <div className="flex items-center justify-between text-[20px] font-black text-slate-900">
                            <span>{currency}</span>
                            <span>0.00</span>
                         </div>
                      </div>
                   </div>

                   {/* Right Confirmation Side */}
                   <div className="flex-1 p-12 flex flex-col items-center justify-center text-center space-y-8">
                      <div className="w-16 h-16 bg-[#ebfff5] border border-[#a7f3d0] rounded-full flex items-center justify-center text-[#059669] shadow-inner animate-in zoom-in-50 duration-500">
                         <CircleCheck size={36} fill="#ecfdf5" strokeWidth={1.5} />
                      </div>
                      
                      <div className="space-y-2">
                         <h3 className="text-[28px] font-black text-slate-950 tracking-tight">Thanks for your order</h3>
                         <p className="text-slate-500 font-semibold italic text-[14px]">Payment successful</p>
                      </div>

                      <div className="pt-8 space-y-4">
                         <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                            Powered by <span className="text-[#635bff] italic">GrapePay</span> • <span className="hover:text-slate-600 cursor-pointer">Terms</span> • <span className="hover:text-slate-600 cursor-pointer">Privacy</span>
                         </p>
                      </div>
                   </div>
                </div>
              )}
           </div>

           <div className="p-8 text-center absolute bottom-4">
              <p className="text-[12px] font-bold text-slate-400">
                 You can <button className="text-[#635bff] hover:underline">enable more payment methods</button> and <button className="text-[#635bff] hover:underline">change how this page looks</button> in your account settings.
              </p>
           </div>
        </div>
      </main>

    </div>
  );
}

function PlusCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  )
}
