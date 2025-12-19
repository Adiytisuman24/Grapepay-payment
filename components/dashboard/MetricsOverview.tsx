'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Users, Zap, Globe } from 'lucide-react';

export function MetricsOverview() {
  const metrics = {
    totalVolume: 0,
    activeUsers: 0,
    conversions: 0,
    supportedChains: 15,
  };

  const cards = [
    {
      title: 'Total Volume',
      value: `$${metrics.totalVolume.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      title: 'Active Users',
      value: metrics.activeUsers.toLocaleString(),
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Conversions',
      value: metrics.conversions.toLocaleString(),
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: Zap,
    },
    {
      title: 'Supported Chains',
      value: metrics.supportedChains.toString(),
      change: 'Stable',
      changeType: 'neutral' as const,
      icon: Globe,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {card.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {card.value}
              </div>
              <div className="flex items-center text-xs">
                {card.changeType === 'positive' && (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                )}
                {card.changeType === 'negative' && (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={
                  card.changeType === 'positive'
                    ? 'text-green-600 dark:text-green-400'
                    : card.changeType === 'negative'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400'
                }>
                  {card.change}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
