'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
}

export function PriceCards() {
  const prices: CryptoPrice[] = [
    { symbol: 'BTC', name: 'Bitcoin', price: 43250.00, change24h: 2.4, icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', price: 2680.50, change24h: 1.8, icon: 'Ξ' },
    { symbol: 'USDT', name: 'Tether', price: 1.00, change24h: 0.1, icon: '₮' },
    { symbol: 'BNB', name: 'Binance Coin', price: 315.20, change24h: -0.8, icon: 'Ḃ' },
    { symbol: 'ADA', name: 'Cardano', price: 0.62, change24h: 3.2, icon: '₳' },
    { symbol: 'SOL', name: 'Solana', price: 98.45, change24h: 5.7, icon: '◎' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Live Crypto Prices</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {prices.map((crypto) => {
          const isPositive = crypto.change24h >= 0;
          const TrendIcon = isPositive ? TrendingUp : TrendingDown;
          
          return (
            <Card key={crypto.symbol} className="relative overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{crypto.icon}</span>
                    <div>
                      <CardTitle className="text-sm font-medium">{crypto.symbol}</CardTitle>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{crypto.name}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    ${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="flex items-center text-xs">
                    <TrendIcon className={`h-3 w-3 mr-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
                    <span className={isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                      {isPositive ? '+' : ''}{crypto.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
