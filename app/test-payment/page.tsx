'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CreditCard, Loader2, CheckCircle, AlertCircle, Repeat, Calendar } from 'lucide-react';
import { getUserCurrency } from '@/lib/currency';
import { cn } from '@/lib/utils';

type PaymentType = 'one_time' | 'recurring' | 'subscription';
type Interval = 'daily' | 'weekly' | 'monthly' | 'yearly';

export default function CreatePaymentPage() {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [userCurrency, setUserCurrency] = useState('USD');
  const [paymentType, setPaymentType] = useState<PaymentType>('one_time');
  const [interval, setInterval] = useState<Interval>('monthly');
  const [billingCycles, setBillingCycles] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('grapepay_user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        const currency = getUserCurrency(user.country || user.region);
        setUserCurrency(currency);
      } catch (e) {
        console.error('Error loading user data:', e);
      }
    }
  }, []);

  const handleCreatePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!email) {
      toast.error('Please enter customer email');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency: userCurrency,
          customer_email: email,
          description: description || 'Payment',
          payment_type: paymentType,
          interval: paymentType !== 'one_time' ? interval : undefined,
          billing_cycles: billingCycles ? parseInt(billingCycles) : undefined
        })
      });

      const payment = await response.json();
      
      const typeLabel = paymentType === 'one_time' ? 'Payment' : paymentType === 'recurring' ? 'Recurring Payment' : 'Subscription';
      
      toast.success(`${typeLabel} initiated!`, {
        description: `Payment ID: ${payment.id}`,
        icon: <CreditCard className="text-blue-600" />
      });

      // Reset form
      setAmount('');
      setEmail('');
      setDescription('');
      setBillingCycles('');
      
    } catch (error) {
      toast.error('Failed to create payment', {
        description: 'Please make sure the backend is running on port 3001'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Payment</h1>
          <p className="text-slate-500">Create one-time payments, recurring charges, or subscriptions</p>
        </div>

        <Card className="p-6 border-slate-200 shadow-sm">
          <div className="space-y-6">
            {/* Payment Type Selection */}
            <div>
              <Label className="text-sm font-bold text-slate-700 mb-3 block">Payment Type</Label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentType('one_time')}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-all text-left",
                    paymentType === 'one_time'
                      ? "border-[#635bff] bg-purple-50"
                      : "border-slate-200 hover:border-slate-300"
                  )}
                >
                  <CreditCard className={cn("mb-2", paymentType === 'one_time' ? "text-[#635bff]" : "text-slate-400")} size={20} />
                  <div className="font-bold text-sm text-slate-900">One-time</div>
                  <div className="text-xs text-slate-500 mt-1">Single payment</div>
                </button>

                <button
                  onClick={() => setPaymentType('recurring')}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-all text-left",
                    paymentType === 'recurring'
                      ? "border-[#635bff] bg-purple-50"
                      : "border-slate-200 hover:border-slate-300"
                  )}
                >
                  <Repeat className={cn("mb-2", paymentType === 'recurring' ? "text-[#635bff]" : "text-slate-400")} size={20} />
                  <div className="font-bold text-sm text-slate-900">Recurring</div>
                  <div className="text-xs text-slate-500 mt-1">Fixed duration</div>
                </button>

                <button
                  onClick={() => setPaymentType('subscription')}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-all text-left",
                    paymentType === 'subscription'
                      ? "border-[#635bff] bg-purple-50"
                      : "border-slate-200 hover:border-slate-300"
                  )}
                >
                  <Calendar className={cn("mb-2", paymentType === 'subscription' ? "text-[#635bff]" : "text-slate-400")} size={20} />
                  <div className="font-bold text-sm text-slate-900">Subscription</div>
                  <div className="text-xs text-slate-500 mt-1">Until cancelled</div>
                </button>
              </div>
            </div>

            {/* Interval Selection (for recurring/subscription) */}
            {paymentType !== 'one_time' && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <Label className="text-sm font-bold text-slate-700 mb-3 block">Billing Interval</Label>
                <div className="grid grid-cols-4 gap-2">
                  {(['daily', 'weekly', 'monthly', 'yearly'] as Interval[]).map((int) => (
                    <button
                      key={int}
                      onClick={() => setInterval(int)}
                      className={cn(
                        "px-4 py-2 rounded-md border-2 transition-all text-sm font-bold capitalize",
                        interval === int
                          ? "border-[#635bff] bg-purple-50 text-[#635bff]"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      )}
                    >
                      {int}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Billing Cycles (for recurring only) */}
            {paymentType === 'recurring' && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <Label htmlFor="cycles" className="text-sm font-bold text-slate-700 mb-2 block">
                  Billing Cycles (Optional)
                </Label>
                <Input
                  id="cycles"
                  type="number"
                  placeholder="e.g., 12 for 12 months"
                  value={billingCycles}
                  onChange={(e) => setBillingCycles(e.target.value)}
                  min="1"
                />
                <p className="text-xs text-slate-500 mt-1">Leave empty for unlimited cycles</p>
              </div>
            )}

            <div className="border-t border-slate-200 pt-6"></div>

            {/* Amount */}
            <div>
              <Label htmlFor="amount" className="text-sm font-bold text-slate-700 mb-2 block">
                Amount ({userCurrency})
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg font-mono"
                step="0.01"
                min="0"
              />
              <p className="text-xs text-slate-500 mt-1">
                {paymentType === 'one_time' 
                  ? `One-time charge in ${userCurrency}` 
                  : `Charged ${interval} in ${userCurrency}`}
              </p>
            </div>

            {/* Customer Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-bold text-slate-700 mb-2 block">
                Customer Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="customer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-sm font-bold text-slate-700 mb-2 block">
                Description (Optional)
              </Label>
              <Input
                id="description"
                placeholder="What is this payment for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Button
              onClick={handleCreatePayment}
              disabled={loading}
              className="w-full bg-[#635bff] hover:bg-[#5851eb] text-white font-bold py-6"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {paymentType === 'one_time' ? <CreditCard className="mr-2 h-4 w-4" /> : 
                   paymentType === 'recurring' ? <Repeat className="mr-2 h-4 w-4" /> :
                   <Calendar className="mr-2 h-4 w-4" />}
                  Create {paymentType === 'one_time' ? 'Payment' : paymentType === 'recurring' ? 'Recurring Payment' : 'Subscription'}
                </>
              )}
            </Button>
          </div>
        </Card>

        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <AlertCircle size={18} />
            How it works
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="mt-0.5 shrink-0" />
              <span>Your currency is automatically set to <strong>{userCurrency}</strong> based on your region</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="mt-0.5 shrink-0" />
              <span>Choose between one-time, recurring (fixed duration), or subscription (until cancelled)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="mt-0.5 shrink-0" />
              <span>The payment will be processed in 2-5 seconds</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="mt-0.5 shrink-0" />
              <span>You'll receive a real-time notification when it completes</span>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
