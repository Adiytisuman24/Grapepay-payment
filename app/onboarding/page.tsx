'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Info, ChevronLeft, Headphones, Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const steps = [
  { id: 'email', label: 'Email Verification', status: 'completed' },
  { id: 'pan', label: 'Business PAN', status: 'completed' },
  { id: 'details', label: 'Business Details', status: 'completed' },
  { id: 'owner', label: 'Business Owner Details', status: 'active' },
  { id: 'registration', label: 'Business Registration Details', status: 'pending' },
  { id: 'bank', label: 'Bank Account Details', status: 'upcoming' },
  { id: 'docs', label: 'Upload Business Documents', status: 'upcoming' },
  { id: 'website', label: 'Website Details', status: 'upcoming' },
  { id: 'additional', label: 'Additional details', status: 'pending' },
];

export default function OnboardingPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(3); // Starting at Business Owner Details for simulation
  const [aadhaar, setAadhaar] = useState('');
  const [declared, setDeclared] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNext = async () => {
    if (steps[currentStepIndex].id === 'owner') {
      if (aadhaar.length !== 12) {
        toast.error('Please enter a valid 12-digit Aadhaar number');
        return;
      }
      if (!declared) {
        toast.error('Please accept the declaration');
        return;
      }

      setLoading(true);
      // Simulate validation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (aadhaar.endsWith('0')) {
        setLoading(false);
        toast.error('Aadhaar verification failed. Simulation failed.');
        return;
      }
      
      toast.success('Aadhaar verified successfully!');
      setLoading(false);
    }

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      toast.success('Onboarding complete!');
      router.push('/');
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      {/* Sidebar */}
      <aside className="w-[300px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-8 flex flex-col gap-10 z-20">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="GrapePay" className="w-12 h-12 rounded-xl shadow-md border-2 border-slate-100" />
          <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
            Grape<span className="text-purple-600">Pay</span>
          </span>
        </div>

        <div className="flex flex-col gap-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4 relative group">
              {index !== steps.length - 1 && (
                <div className={`absolute left-[11px] top-[28px] bottom-[-16px] w-[2px] transition-colors duration-500 
                  ${index < currentStepIndex ? 'bg-green-500' : 'bg-slate-100 dark:bg-slate-800'}`} />
              )}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 transition-all duration-300 shadow-sm
                ${index < currentStepIndex ? 'bg-green-500 text-white scale-110' : 
                  index === currentStepIndex ? 'bg-white border-2 border-purple-600 text-purple-600 ring-4 ring-purple-100 dark:ring-purple-900/30' : 
                  step.status === 'pending' ? 'bg-orange-400 text-white' : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'}`}>
                {index < currentStepIndex ? <Check size={14} className="stroke-[3]" /> : 
                 index === currentStepIndex ? <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" /> : 
                 step.status === 'pending' ? <Info size={14} /> : null}
              </div>
              <div className="flex flex-col">
                <span className={`text-[13px] font-bold transition-colors duration-300 
                  ${index === currentStepIndex ? 'text-purple-600' : 
                    index < currentStepIndex ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400'}`}>
                  {step.label}
                </span>
                {index === currentStepIndex && (
                  <span className="text-[10px] text-slate-400 font-medium animate-in fade-in slide-in-from-left-1">Current Step</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-100/30 dark:bg-purple-900/10 rounded-full blur-[120px] -mr-64 -mt-64" />
        
        <header className="px-16 py-8 flex justify-between items-center z-10">
          <button onClick={handleBack} className="group flex items-center gap-2 text-slate-500 hover:text-purple-600 font-bold text-sm transition-all bg-white dark:bg-slate-900 px-4 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          <div className="flex items-center gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-3 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600">
                <Headphones size={20} />
              </div>
              <div>
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">Need Help?</div>
                <div className="text-[12px] font-bold text-slate-700 dark:text-slate-200">24/7 Live Support</div>
              </div>
            </div>
            <div className="w-[1px] h-8 bg-slate-100 dark:bg-slate-800" />
            <div className="flex items-center gap-2 text-purple-600 group cursor-pointer">
              <Mail size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-[13px] font-bold">care@grapepay.com</span>
            </div>
          </div>
        </header>

        <div className="px-16 flex-1 flex items-center justify-center z-10">
          <div className="w-full max-w-[700px] animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight leading-tight">
                {steps[currentStepIndex].label}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                {steps[currentStepIndex].id === 'owner' ? 
                  "We need identity verification of the business owner to ensure account security." : 
                  `Complete this section to proceed with your ${steps[currentStepIndex].label.toLowerCase()}.`}
              </p>
            </div>

            <Card className="p-10 border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[40px] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600/50 via-blue-600/50 to-purple-600/50" />
              {steps[currentStepIndex].id === 'owner' ? (
                <div className="space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-black text-slate-500 uppercase tracking-widest ml-1">Aadhaar Number</Label>
                      <span className="text-[10px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-lg">Indian Citizens Only</span>
                    </div>
                    <div className="relative">
                      <Input 
                        placeholder="0000 0000 0000"
                        className="h-16 text-2xl font-mono tracking-[0.2em] border-slate-200 dark:border-slate-800 rounded-2xl px-6 focus:ring-4 focus:ring-purple-500/10 transition-all bg-slate-50/50 dark:bg-slate-800/50"
                        maxLength={12}
                        value={aadhaar}
                        onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
                      />
                      {aadhaar.length > 0 && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full transition-colors ${aadhaar.length >= (i+1)*4 ? 'bg-green-500' : 'bg-slate-200'}`} />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
                      <Info size={14} className="text-blue-500" />
                      <p className="text-[11px] text-blue-700 dark:text-blue-300 font-bold italic">
                        Simulation: Numbers ending in '0' will fail verification.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer" onClick={() => setDeclared(!declared)}>
                    <Checkbox 
                      id="declaration" 
                      className="mt-1 w-6 h-6 rounded-lg border-2" 
                      checked={declared}
                      onCheckedChange={(checked) => setDeclared(!!checked)}
                    />
                    <label htmlFor="declaration" className="text-[13px] text-slate-600 dark:text-slate-400 font-semibold leading-relaxed cursor-pointer select-none">
                      I/We hereby declare and undertake that the information provided is true and I authorize GrapePay to verify the same through authorized channels. Read full <span className="text-purple-600 font-bold underline decoration-2 underline-offset-4">declaration</span>.
                    </label>
                  </div>
                </div>
              ) : (
                <div className="py-24 text-center flex flex-col items-center gap-6">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 animate-pulse">
                    <Info size={32} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-black text-slate-900 dark:text-white">Module Initializing</p>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Step: {steps[currentStepIndex].label}</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>

        <footer className="px-16 py-10 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl flex justify-end gap-6 sticky bottom-0 z-20">
          <Button variant="ghost" className="text-slate-500 font-bold px-10 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl">Cancel</Button>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-2xl hover:shadow-purple-500/40 px-12 h-14 rounded-2xl font-black text-white text-lg transition-all group"
            disabled={loading}
            onClick={handleNext}
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <Loader2 className="animate-spin" size={24} />
                <span>Verifying...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Continue</span>
                <Check size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </Button>
        </footer>
      </main>
    </div>
  );
}
