'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate finding user and sending OTP
    setTimeout(() => {
      const allUsers = JSON.parse(localStorage.getItem('grapepay_all_users') || '[]');
      const user = allUsers.find((u: any) => u.email === identifier || u.username === identifier);
      
      // Even if user not found, we simulate for security (standard practice)
      // but the user wants to redirect and show OTP flow.
      localStorage.setItem('grapepay_reset_identifier', identifier);
      toast.success('Verification code sent to your registered email!');
      router.push('/verify-otp');
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
           <p className="text-slate-500 dark:text-slate-400 font-medium">
             Account Recovery
           </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-purple-600 to-blue-600" />
          <CardHeader className="space-y-1 pt-8">
            <CardTitle className="text-2xl font-bold text-center text-slate-900 dark:text-white">
              Forgot Password
            </CardTitle>
            <p className="text-center text-sm text-slate-500 px-6">
              Enter your email or username to receive a verification code.
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email or Username</Label>
                <Input
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Email or Username"
                  required
                  className="h-12 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl px-4 focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/30 text-white font-bold rounded-xl transition-all"
              >
                {isLoading ? 'Sending...' : 'Send Verification Code'}
              </Button>

              <div className="text-center">
                <Link href="/login" className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
                  Back to Sign In
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
