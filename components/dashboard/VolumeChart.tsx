'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface VolumeData {
  date: string;
  volume: number;
  conversions: number;
}

export function VolumeChart() {
  const data: VolumeData[] = [
    // Empty array - no data to display
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Volume Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              formatter={(value, name) => [
                name === 'volume' ? `$${value.toLocaleString()}` : value,
                name === 'volume' ? 'Volume' : 'Conversions'
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="volume" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              dot={{ fill: '#8b5cf6' }}
            />
            <Line 
              type="monotone" 
              dataKey="conversions" 
              stroke="#06b6d4" 
              strokeWidth={2}
              dot={{ fill: '#06b6d4' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
