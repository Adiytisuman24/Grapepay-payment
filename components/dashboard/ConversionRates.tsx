'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface ConversionRate {
  from: string;
  to: string;
  rate: number;
  fromSymbol: string;
  toSymbol: string;
}

export function ConversionRates() {
  const rates: ConversionRate[] = [
    { from: 'USD', to: 'INR', rate: 83.15, fromSymbol: '$', toSymbol: '₹' },
    { from: 'USD', to: 'EUR', rate: 0.92, fromSymbol: '$', toSymbol: '€' },
    { from: 'USD', to: 'GBP', rate: 0.79, fromSymbol: '$', toSymbol: '£' },
    { from: 'USD', to: 'AED', rate: 3.67, fromSymbol: '$', toSymbol: 'د.إ' },
    { from: 'USD', to: 'JPY', rate: 149.50, fromSymbol: '$', toSymbol: '¥' },
    { from: 'USD', to: 'CAD', rate: 1.35, fromSymbol: '$', toSymbol: 'C$' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Fiat Conversion Rates</span>
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rates.map((rate) => (
            <div
              key={`${rate.from}-${rate.to}`}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {rate.fromSymbol}1 {rate.from}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {rate.toSymbol}{rate.rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{rate.to}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
