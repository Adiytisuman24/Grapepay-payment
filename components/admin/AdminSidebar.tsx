'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  Users,
  FileCheck,
  Activity,
  BarChart3,
  Settings,
  Shield,
  AlertTriangle,
  Wallet,
  CreditCard,
  X,
  Grape
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'KYC Review', href: '/admin/kyc', icon: FileCheck },
  { name: 'Merchants', href: '/admin/merchants', icon: Users },
  { name: 'Transactions', href: '/admin/transactions', icon: Activity },
  { name: 'Profit Analytics', href: '/admin/reports', icon: BarChart3 },
  { name: 'Wallet Verification', href: '/admin/wallets', icon: Wallet },
  { name: 'Security Logs', href: '/admin/security', icon: Shield },
  { name: 'System Health', href: '/admin/system', icon: Shield },
  { name: 'Alerts', href: '/admin/alerts', icon: AlertTriangle },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose} />
        </div>
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200 dark:border-gray-700",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
              <Grape className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">GrapePay</span>
              <div className="text-xs text-red-600 dark:text-red-400 font-medium">ADMIN</div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  <Icon className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive ? "text-red-600 dark:text-red-400" : "text-gray-400"
                  )} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 dark:text-gray-400">Admin Mode</p>
              <p className="text-sm font-medium text-red-700 dark:text-red-300">Full Access</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
