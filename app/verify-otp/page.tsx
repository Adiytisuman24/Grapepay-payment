'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedIdentifier = localStorage.getItem('grapepay_reset_identifier');
    if (storedIdentifier) {
      setIdentifier(storedIdentifier);
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      toast.error('Please enter the full 6-digit code');
      setIsLoading(false);
      return;
    }

    // Simulate verification
    setTimeout(() => {
      // Find the user to log them in automatically
      const allUsers = JSON.parse(localStorage.getItem('grapepay_all_users') || '[]');
      const user = allUsers.find((u: any) => u.email === identifier || u.username === identifier);
      
      if (user) {
        localStorage.setItem('grapepay_user', JSON.stringify(user));
        // Add a flag for the dashboard to trigger the password change requirement
        localStorage.setItem('grapepay_force_password_change', 'true');
        toast.success('Identity verified! Redirecting to dashboard...');
        router.push('/');
      } else {
        // Fallback for demo if user not found in local list
        toast.error('Session expired. Please try again.');
        router.push('/forgot-password');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/20 rounded-full blur-[100px]" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
           <img src="/logo.jpg" alt="GrapePay" className="w-24 h-24 mx-auto mb-4 rounded-3xl shadow-lg border-4 border-white dark:border-slate-800" />
           <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
             GrapePay
           </h1>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-purple-600 to-blue-600" />
          <CardHeader className="space-y-1 pt-8">
            <CardTitle className="text-2xl font-bold text-center text-slate-900 dark:text-white">
              Verify OTP
            </CardTitle>
            <p className="text-center text-sm text-slate-500 px-6 font-medium">
              We&apos;ve sent a 6-digit code to the email associated with <span className="text-slate-950 font-bold">{identifier}</span>.
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleVerify} className="space-y-8">
              <div className="flex justify-between gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-12 h-14 text-center text-2xl font-bold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                    required
                  />
                ))}
              </div>

              <div className="space-y-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/30 text-white font-bold rounded-xl transition-all"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Continue'}
                </Button>

                <p className="text-center text-sm text-slate-500 font-medium">
                  Didn&apos;t receive code? <span className="text-[#635bff] font-bold cursor-pointer hover:underline">Resend code</span>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
