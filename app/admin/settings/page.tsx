'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings, DollarSign, Shield, Globe, Users, Plus, Trash2, Upload, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
  const [conversionFee, setConversionFee] = useState('0.25');
  const [minWalletBalance, setMinWalletBalance] = useState('0.001');
  const [maxWalletBalance, setMaxWalletBalance] = useState('100');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceBanner, setMaintenanceBanner] = useState('');
  const [isAddAdminDialogOpen, setIsAddAdminDialogOpen] = useState(false);

  const supportedCryptos = [
    { symbol: 'BTC', name: 'Bitcoin', enabled: true, minAmount: 0.0001 },
    { symbol: 'ETH', name: 'Ethereum', enabled: true, minAmount: 0.001 },
    { symbol: 'USDT', name: 'Tether', enabled: true, minAmount: 1 },
    { symbol: 'USDC', name: 'USD Coin', enabled: true, minAmount: 1 },
    { symbol: 'BNB', name: 'Binance Coin', enabled: true, minAmount: 0.01 },
    { symbol: 'ADA', name: 'Cardano', enabled: false, minAmount: 1 }
  ];

  const supportedFiats = [
    { code: 'USD', name: 'US Dollar', enabled: true },
    { code: 'INR', name: 'Indian Rupee', enabled: true },
    { code: 'EUR', name: 'Euro', enabled: true },
    { code: 'GBP', name: 'British Pound', enabled: true },
    { code: 'AED', name: 'UAE Dirham', enabled: false },
    { code: 'JPY', name: 'Japanese Yen', enabled: false }
  ];

  const adminUsers = [
    {
      id: 'ADM-001',
      name: 'Super Admin',
      email: 'admin@grapepay.com',
      role: 'super_admin',
      lastLogin: new Date('2024-01-07T10:30:00'),
      status: 'active'
    },
    {
      id: 'ADM-002',
      name: 'KYC Manager',
      email: 'kyc@grapepay.com',
      role: 'kyc_admin',
      lastLogin: new Date('2024-01-06T15:20:00'),
      status: 'active'
    }
  ];

  const kycRules = {
    maxFileSize: '10',
    allowedFormats: ['PDF', 'JPG', 'PNG'],
    requiredDocuments: ['identity', 'address', 'selfie'],
    autoApprovalThreshold: '1000'
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  const handleToggleCrypto = (symbol: string) => {
    toast.success(`${symbol} ${supportedCryptos.find(c => c.symbol === symbol)?.enabled ? 'disabled' : 'enabled'}`);
  };

  const handleToggleFiat = (code: string) => {
    toast.success(`${code} ${supportedFiats.find(f => f.code === code)?.enabled ? 'disabled' : 'enabled'}`);
  };

  const handleAddAdmin = () => {
    toast.success('New admin user added successfully!');
    setIsAddAdminDialogOpen(false);
  };

  const handleRemoveAdmin = (adminId: string) => {
    toast.success(`Admin ${adminId} removed successfully!`);
  };

  const handleToggleMaintenanceMode = () => {
    setMaintenanceMode(!maintenanceMode);
    toast.success(`Maintenance mode ${!maintenanceMode ? 'enabled' : 'disabled'}`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Configure platform settings and manage system parameters</p>
          </div>
          <Button onClick={handleSaveSettings}>
            Save All Changes
          </Button>
        </div>

        <Tabs defaultValue="fees" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="fees">Fees & Limits</TabsTrigger>
            <TabsTrigger value="currencies">Currencies</TabsTrigger>
            <TabsTrigger value="kyc">KYC Rules</TabsTrigger>
            <TabsTrigger value="admins">Admin Users</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="fees" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Conversion Fees & Limits</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Conversion Fee (%)</label>
                    <Input
                      type="number"
                      value={conversionFee}
                      onChange={(e) => setConversionFee(e.target.value)}
                      placeholder="0.25"
                      step="0.01"
                    />
                    <p className="text-xs text-gray-500 mt-1">Current: {conversionFee}% per conversion</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Min Wallet Balance (ETH)</label>
                    <Input
                      type="number"
                      value={minWalletBalance}
                      onChange={(e) => setMinWalletBalance(e.target.value)}
                      placeholder="0.001"
                      step="0.001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Wallet Balance (ETH)</label>
                    <Input
                      type="number"
                      value={maxWalletBalance}
                      onChange={(e) => setMaxWalletBalance(e.target.value)}
                      placeholder="100"
                      step="1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Daily Transaction Limit (USD)</label>
                    <Input type="number" placeholder="50000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Monthly Transaction Limit (USD)</label>
                    <Input type="number" placeholder="1000000" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="currencies" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Supported Cryptocurrencies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supportedCryptos.map((crypto) => (
                      <div
                        key={crypto.symbol}
                        className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                              {crypto.symbol.substring(0, 2)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {crypto.name} ({crypto.symbol})
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Min: {crypto.minAmount} {crypto.symbol}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={crypto.enabled ? 'default' : 'secondary'}>
                            {crypto.enabled ? 'Enabled' : 'Disabled'}
                          </Badge>
                          <Switch
                            checked={crypto.enabled}
                            onCheckedChange={() => handleToggleCrypto(crypto.symbol)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supported Fiat Currencies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supportedFiats.map((fiat) => (
                      <div
                        key={fiat.code}
                        className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-green-600 dark:text-green-400">
                              {fiat.code.substring(0, 2)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {fiat.name} ({fiat.code})
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={fiat.enabled ? 'default' : 'secondary'}>
                            {fiat.enabled ? 'Enabled' : 'Disabled'}
                          </Badge>
                          <Switch
                            checked={fiat.enabled}
                            onCheckedChange={() => handleToggleFiat(fiat.code)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="kyc" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>KYC Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Max File Size (MB)</label>
                    <Input
                      type="number"
                      value={kycRules.maxFileSize}
                      placeholder="10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Auto-Approval Threshold (USD)</label>
                    <Input
                      type="number"
                      value={kycRules.autoApprovalThreshold}
                      placeholder="1000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Allowed File Formats</label>
                  <div className="flex space-x-2">
                    {kycRules.allowedFormats.map((format) => (
                      <Badge key={format} variant="outline">
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Required Documents</label>
                  <div className="flex space-x-2">
                    {kycRules.requiredDocuments.map((doc) => (
                      <Badge key={doc} variant="default">
                        {doc.charAt(0).toUpperCase() + doc.slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enable Auto-Approval</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Automatically approve KYC for transactions under threshold
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admins" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Admin Users</span>
                  </CardTitle>
                  <Dialog open={isAddAdminDialogOpen} onOpenChange={setIsAddAdminDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Admin
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Admin User</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Full Name</label>
                          <Input placeholder="John Doe" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email Address</label>
                          <Input type="email" placeholder="john@grapepay.com" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Role</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="super_admin">Super Admin</SelectItem>
                              <SelectItem value="kyc_admin">KYC Admin</SelectItem>
                              <SelectItem value="support_admin">Support Admin</SelectItem>
                              <SelectItem value="finance_admin">Finance Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Temporary Password</label>
                          <Input type="password" placeholder="Generate secure password" />
                        </div>
                        <Button className="w-full" onClick={handleAddAdmin}>
                          Add Admin User
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminUsers.map((admin) => (
                    <div
                      key={admin.id}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {admin.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {admin.email} • {admin.role.replace('_', ' ').toUpperCase()}
                          </div>
                          <div className="text-xs text-gray-400">
                            Last login: {admin.lastLogin.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={admin.status === 'active' ? 'default' : 'secondary'}>
                          {admin.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveAdmin(admin.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Platform Branding</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Platform Name</label>
                    <Input defaultValue="GrapePay" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Support Email</label>
                    <Input defaultValue="support@grapepay.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company Logo</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Upload your company logo
                    </p>
                    <Button variant="outline">
                      Choose File
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Dashboard Footer Text</label>
                  <Textarea
                    placeholder="© 2024 GrapePay. All rights reserved."
                    rows={2}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Require GrapePay ID in Forms</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Show GrapePay branding in security forms
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>System Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <div>
                      <h3 className="font-medium">Maintenance Mode</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Enable to show maintenance banner to all users
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={maintenanceMode}
                    onCheckedChange={handleToggleMaintenanceMode}
                  />
                </div>

                {maintenanceMode && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Maintenance Banner Message</label>
                    <Textarea
                      value={maintenanceBanner}
                      onChange={(e) => setMaintenanceBanner(e.target.value)}
                      placeholder="We are currently performing scheduled maintenance. Service will be restored shortly."
                      rows={3}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">API Rate Limit (requests/minute)</label>
                    <Input type="number" defaultValue="1000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Session Timeout (minutes)</label>
                    <Input type="number" defaultValue="30" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enable Debug Mode</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Show detailed error messages and logs
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-Backup Database</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Automatically backup database daily
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
