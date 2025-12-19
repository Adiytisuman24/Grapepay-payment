'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { COUNTRIES_AND_CURRENCIES } from '@/lib/currencies';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    region: 'United States of America',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();

  const countries = COUNTRIES_AND_CURRENCIES.map(c => ({
    value: c.country,
    label: c.country
  }));

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value as string));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const allUsers = JSON.parse(localStorage.getItem('grapepay_all_users') || '[]');
      const usernameExists = allUsers.some((u: any) => u.username === formData.username);

      if (usernameExists) {
        toast.error('Username already taken. Please create another username.');
        setIsLoading(false);
        return;
      }

      const cleanName = formData.username.toLowerCase().replace(/[^a-z0-9]/g, '');
      const prefix = `grape-${cleanName}`.substring(0, 15);
      const remainingLength = 30 - prefix.length;
      const randomPart = Math.random().toString(36).substring(2, 2 + remainingLength);
      const accountId = (prefix + randomPart).padEnd(30, '0').substring(0, 30);
      
      const newUser = {
        id: accountId,
        email: formData.email,
        username: formData.username,
        role: 'merchant',
        name: formData.businessName,
        business_name: formData.businessName,
        region: formData.region,
        kyc_status: 'pending'
      };

      // Store in simple global user list
      allUsers.push(newUser);
      localStorage.setItem('grapepay_all_users', JSON.stringify(allUsers));
      
      localStorage.setItem('grapepay_user', JSON.stringify(newUser));
      
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
      toast.success('Account created successfully!');
      router.push('/');
    } catch (error) {
      toast.error('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    toast.info('Google Sign Up initialized...');
    setTimeout(() => {
      const demoUser = {
        id: "grape-googleventures" + Math.random().toString(36).substring(2, 11),
        email: 'google-new@grapepay.com',
        role: 'merchant',
        name: 'New Google User',
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
      toast.success('Signed up with Google!');
      router.push('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/20 rounded-full blur-[100px]" />

      <div className="w-full max-w-4xl z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col items-center text-center space-y-8">
          <img src="/logo.jpg" alt="GrapePay" className="w-48 h-48 rounded-[40px] shadow-2xl border-8 border-white dark:border-slate-800 transform -rotate-3 hover:rotate-0 transition-transform duration-500" />
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tighter">
              Join GrapePay
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium max-w-md">
              The fastest way to convert your crypto to fiat anywhere in the world.
            </p>
          </div>
          <div className="space-y-6 w-full max-w-sm px-4">
            {[
              { icon: Check, text: 'Instant multi-chain support', color: 'bg-green-100 text-green-600' },
              { icon: Check, text: 'Zero hidden fees on conversion', color: 'bg-green-100 text-green-600' },
              { icon: Check, text: 'Enterprise-grade observability', color: 'bg-green-100 text-green-600' }
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white dark:border-slate-800 shadow-sm">
                <div className={`p-2 rounded-full ${item.color}`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-[32px] overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-purple-600 to-blue-600" />
            <CardHeader className="space-y-1 pt-8">
              <div className="lg:hidden flex justify-center mb-4">
                <img src="/logo.jpg" alt="GrapePay" className="w-16 h-16 rounded-2xl shadow-lg border-2 border-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-center text-slate-900 dark:text-white">
                Create Account
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full h-11 flex items-center justify-center gap-3 border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 transition-all font-semibold"
                  onClick={handleGoogleSignUp}
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                  <span>Sign up with Google</span>
                </Button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
                  <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-white dark:bg-slate-900 px-4 text-slate-400">Or setup manually</span></div>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-500 ml-1">Business Name</Label>
                    <Input
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      placeholder="e.g. GrapePay Inc"
                      required
                      className="h-11 bg-slate-50 border-slate-200 rounded-xl px-4 focus:ring-2 focus:ring-purple-500 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-500 ml-1">Email Address</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="you@company.com"
                      required
                      className="h-11 bg-slate-50 border-slate-200 rounded-xl px-4"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-500 ml-1">Username</Label>
                    <Input
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      placeholder="e.g. janesmith"
                      required
                      className="h-11 bg-slate-50 border-slate-200 rounded-xl px-4"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-500 ml-1">Password</Label>
                      <Input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="••••••••"
                        required
                        className="h-11 bg-slate-50 border-slate-200 rounded-xl px-4"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-500 ml-1">Region</Label>
                      <Select value={formData.region} onValueChange={(v) => handleInputChange('region', v)}>
                        <SelectTrigger className="h-11 bg-slate-50 border-slate-200 rounded-xl px-4">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <input
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                      className="mt-1 h-3.5 w-3.5 text-purple-600 rounded"
                      required
                    />
                    <label className="text-[10px] text-slate-500 leading-tight">
                      I agree to the <span className="text-purple-600 font-bold underline">Terms of Service</span> and <span className="text-purple-600 font-bold underline">Privacy Policy</span>.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/30 text-white font-bold rounded-xl transition-all mt-4"
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-500 font-medium">
                  Already a member?{' '}
                  <Link href="/login" className="font-bold text-purple-600 hover:text-purple-500 line">
                    Sign In
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
