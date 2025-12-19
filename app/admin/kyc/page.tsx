'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileCheck, Eye, CheckCircle, XCircle, Clock, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';

interface KYCRequest {
  id: string;
  businessName: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  region: string;
  documents: {
    identity: string;
    address: string;
    selfie: string;
  };
}

export default function KYCReviewPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKYC, setSelectedKYC] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const kycRequests: KYCRequest[] = [
    {
      id: "KYC-12345",
      businessName: "Sample Business",
      email: "business@example.com",
      status: "pending",
      submittedDate: new Date().toISOString(),
      region: "United States",
      documents: { identity: "passport.pdf", address: "utility_bill.pdf", selfie: "selfie.jpg" }
    }
  ];

  const handleApprove = (kycId: string) => {
    toast.success(`KYC ${kycId} approved successfully!`);
    // Update status logic here
  };

  const handleReject = (kycId: string) => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }
    toast.success(`KYC ${kycId} rejected with reason provided`);
    setRejectionReason('');
    // Update status logic here
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'secondary',
      approved: 'default',
      rejected: 'destructive'
    } as const;

    const icons = {
      pending: Clock,
      approved: CheckCircle,
      rejected: XCircle
    };

    const Icon = icons[status as keyof typeof icons];

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const pendingCount = kycRequests.filter(kyc => kyc.status === 'pending').length;
  const approvedCount = kycRequests.filter(kyc => kyc.status === 'approved').length;
  const rejectedCount = kycRequests.filter(kyc => kyc.status === 'rejected').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">KYC Review</h1>
            <p className="text-gray-600 dark:text-gray-400">Review and approve merchant KYC documents</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{pendingCount} pending reviews</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by business name, email, or KYC ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {kycRequests.map((kyc) => (
                <div
                  key={kyc.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <FileCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {kyc.businessName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {kyc.email} • {kyc.id} • {kyc.region}
                      </div>
                      <div className="text-xs text-gray-400">
                        Submitted: {new Date(kyc.submittedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {getStatusBadge(kyc.status)}
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedKYC(kyc)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>KYC Review - {selectedKYC?.businessName}</DialogTitle>
                          </DialogHeader>
                          {selectedKYC && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Business Name</label>
                                  <p className="text-gray-900 dark:text-white">{selectedKYC.businessName}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                  <p className="text-gray-900 dark:text-white">{selectedKYC.email}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Region</label>
                                  <p className="text-gray-900 dark:text-white">{selectedKYC.region}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                                  <div className="mt-1">{getStatusBadge(selectedKYC.status)}</div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Documents</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-sm">Identity Document</span>
                                    <Button size="sm" variant="outline">
                                      View {selectedKYC.documents.identity}
                                    </Button>
                                  </div>
                                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-sm">Proof of Address</span>
                                    <Button size="sm" variant="outline">
                                      View {selectedKYC.documents.address}
                                    </Button>
                                  </div>
                                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-sm">Selfie Verification</span>
                                    <Button size="sm" variant="outline">
                                      View {selectedKYC.documents.selfie}
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              {selectedKYC.status === 'pending' && (
                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                      Rejection Reason (if rejecting)
                                    </label>
                                    <Textarea
                                      value={rejectionReason}
                                      onChange={(e) => setRejectionReason(e.target.value)}
                                      placeholder="Provide reason for rejection..."
                                      rows={3}
                                    />
                                  </div>
                                  <div className="flex space-x-3">
                                    <Button 
                                      onClick={() => handleApprove(selectedKYC.id)}
                                      className="flex-1 bg-green-600 hover:bg-green-700"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve
                                    </Button>
                                    <Button 
                                      onClick={() => handleReject(selectedKYC.id)}
                                      variant="destructive"
                                      className="flex-1"
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {kyc.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleApprove(kyc.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleReject(kyc.id)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
