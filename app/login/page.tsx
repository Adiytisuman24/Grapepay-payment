'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { authenticate, setCurrentUser } from '@/lib/auth';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = authenticate(identifier, password);
      if (!user) {
        toast.error('Invalid credentials');
        setIsLoading(false);
        return;
      }
      const userData = {
        id: user.id,
        email: user.email,
        role: user.role,
        business_name: user.business_name || user.name,
        kyc_status: user.role === 'admin' ? 'approved' : 'pending'
      };
      localStorage.setItem('grapepay_user', JSON.stringify(userData));

      // Record session
      const sessions = JSON.parse(localStorage.getItem('grapepay_sessions') || '[]');
      sessions.unshift({
        location: 'India (KA)',
        device: 'Edge - Windows',
        ip: '103.214.63.' + Math.floor(Math.random() * 255),
        time: 'Just now',
        status: 'Current session'
      });
      localStorage.setItem('grapepay_sessions', JSON.stringify(sessions.slice(0, 50)));

      setCurrentUser(user);
      toast.success(`Welcome back, ${user.name}!`);
      router.push('/');
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    toast.info('Google Sign In is being initialized...');
    // Simulated Google Auth flow
    setTimeout(() => {
      const demoUser = {
        id: ('grape-googleventures' + Math.random().toString(36).substring(2, 11)).padEnd(30, '0').substring(0, 30),
        email: 'google@grapepay.com',
        role: 'merchant',
        name: 'Google User',
        business_name: 'Google Ventures',
        kyc_status: 'pending'
      };
      localStorage.setItem('grapepay_user', JSON.stringify(demoUser));

      // Record session
      const sessions = JSON.parse(localStorage.getItem('grapepay_sessions') || '[]');
      sessions.unshift({
        location: 'India (KA)',
        device: 'Edge - Windows',
        ip: '103.214.63.' + Math.floor(Math.random() * 255),
        time: 'Just now',
        status: 'Current session'
      });
      localStorage.setItem('grapepay_sessions', JSON.stringify(sessions.slice(0, 50)));
      toast.success('Signed in with Google!');
      router.push('/');
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
            Crypto to Fiat, Simplified.
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-purple-600 to-blue-600" />
          <CardHeader className="space-y-1 pt-8">
            <CardTitle className="text-2xl font-bold text-center text-slate-900 dark:text-white">
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full h-12 flex items-center justify-center gap-3 border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-semibold"
                onClick={handleGoogleSignIn}
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                <span>Continue with Google</span>
              </Button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-slate-900 px-4 text-slate-500">Or email</span>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
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

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</Label>
                    <Link href="/forgot-password" className="text-xs font-bold text-purple-600 hover:text-purple-500">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="h-12 pr-12 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl px-4 focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/30 text-white font-bold rounded-xl transition-all"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                New to GrapePay?{' '}
                <Link href="/register" className="font-bold text-purple-600 hover:text-purple-500">
                  Create Account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-500 px-8 leading-relaxed">
          By continuing, you agree to GrapePay's <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
