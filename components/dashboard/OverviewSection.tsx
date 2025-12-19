'use client';

import { useState, useMemo, useEffect } from 'react';
import { 
  Plus, 
  Settings, 
  ChevronDown, 
  Info, 
  LayoutGrid, 
  X,
  Check,
  Calendar as CalendarIcon, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, subDays, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, subWeeks, addMonths, subMonths, setYear, getYear } from "date-fns"
import { getCurrencyForCountry } from '@/lib/currencies';

interface Widget {
  id: string;
  title: string;
  type: 'chart' | 'empty';
  value?: string;
  previousValue?: string;
  data?: any;
}

export function OverviewSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [widgets, setWidgets] = useState<Widget[]>([]);
  
  const [dateRange, setDateRange] = useState({
    label: 'Last 7 days',
    start: subDays(new Date(), 7),
    end: new Date()
  });
  const [frequency, setFrequency] = useState('Daily');
  const [compare, setCompare] = useState('Previous period');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [viewMonths, setViewMonths] = useState([new Date(), addMonths(new Date(), 1)]);

  useEffect(() => {
    const userStr = localStorage.getItem('grapepay_user');
    let userCurrency = 'USD';
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.region) {
          userCurrency = getCurrencyForCountry(user.region);
        }
      } catch (e) {}
    }
    setCurrency(userCurrency);

    setWidgets([
      { id: 'payments', title: 'Payments', type: 'empty' },
      { id: 'gross-volume', title: 'Gross volume', type: 'chart', value: `${userCurrency} 0.00`, previousValue: `${userCurrency} 0.00 previous period` },
      { id: 'net-volume', title: 'Net volume', type: 'chart', value: `${userCurrency} 0.00`, previousValue: `${userCurrency} 0.00 previous period` },
      { id: 'failed-payments', title: 'Failed payments', type: 'empty' },
      { id: 'new-customers', title: 'New customers', type: 'chart', value: '0', previousValue: '0 previous period' },
      { id: 'top-customers', title: 'Top customers by spend', type: 'empty' },
    ]);
  }, []);

  const datePresets = [
    { label: 'Today', getValue: () => ({ start: new Date(), end: new Date() }) },
    { label: 'Last 7 days', getValue: () => ({ start: subDays(new Date(), 7), end: new Date() }) },
    { label: 'Last 4 weeks', getValue: () => ({ start: subWeeks(new Date(), 4), end: new Date() }) },
    { label: 'Month to date', getValue: () => ({ start: startOfMonth(new Date()), end: new Date() }) },
    { label: 'Quarter to date', getValue: () => ({ start: startOfQuarter(new Date()), end: new Date() }) },
    { label: 'All time', getValue: () => ({ start: new Date(2020, 0, 1), end: new Date() }) },
  ];

  const handlePrevMonth = () => {
    setViewMonths(prev => prev.map(m => subMonths(m, 1)));
  };

  const handleNextMonth = () => {
    setViewMonths(prev => prev.map(m => addMonths(m, 1)));
  };

  const handleYearChange = (index: number, year: string) => {
    const y = parseInt(year);
    if (isNaN(y) || y < 2000 || y > 3000) return;
    setViewMonths(prev => {
      const next = [...prev];
      next[index] = setYear(next[index], y);
      if (index === 0) {
        next[1] = addMonths(next[0], 1);
      } else {
        next[0] = subMonths(next[1], 1);
      }
      return next;
    });
  };

  const toggleEdit = () => setIsEditing(!isEditing);
  
  const removeWidget = (id: string) => {
    setWidgets(widgets.filter(w => w.id !== id));
  };

  const addWidget = () => {
    const initialWidgets = [
      { id: 'payments', title: 'Payments', type: 'empty' },
      { id: 'gross-volume', title: 'Gross volume', type: 'chart', value: `${currency} 0.00`, previousValue: `${currency} 0.00 previous period` },
      { id: 'net-volume', title: 'Net volume', type: 'chart', value: `${currency} 0.00`, previousValue: `${currency} 0.00 previous period` },
      { id: 'failed-payments', title: 'Failed payments', type: 'empty' },
      { id: 'new-customers', title: 'New customers', type: 'chart', value: '0', previousValue: '0 previous period' },
      { id: 'top-customers', title: 'Top customers by spend', type: 'empty' },
    ];
    if (widgets.length < initialWidgets.length) {
      const missing = initialWidgets.find(iw => !widgets.find(w => w.id === iw.id));
      if (missing) setWidgets([...widgets, missing]);
    }
  };

  const years = Array.from({ length: 1001 }, (_, i) => 2000 + i);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Your overview</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={addWidget}
            className="h-8 gap-2 bg-white border-slate-200 text-slate-600 font-bold px-3 hover:bg-slate-50"
          >
            <Plus size={14} className="text-slate-400"/> Add
          </Button>
          <Button 
            variant={isEditing ? "default" : "outline"}
            size="sm" 
            onClick={toggleEdit}
            className={cn(
              "h-8 gap-2 font-bold px-3",
              isEditing 
                ? "bg-[#635bff] hover:bg-[#5249f0] text-white border-transparent" 
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            )}
          >
            {isEditing ? 'Done' : <><Settings size={14} className="text-slate-400"/> Edit</>}
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 text-[13px] font-bold">
        {/* Date Range Picker */}
        <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 cursor-pointer shadow-sm transition-all active:scale-95">
              <span className="text-slate-400 font-bold">Date range</span> 
              <span className="text-[#635bff]">{dateRange.label}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-slate-200 shadow-2xl rounded-2xl overflow-hidden" align="start">
            <div className="flex h-[420px]">
              {/* Presets Sidebar */}
              <div className="w-48 border-r border-slate-100 p-2 space-y-1 bg-slate-50/50">
                {datePresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      const range = preset.getValue();
                      setDateRange({ label: preset.label, ...range });
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-[14px] font-medium rounded-xl transition-all",
                      dateRange.label === preset.label 
                        ? "bg-white text-[#635bff] shadow-sm ring-1 ring-slate-200/50 font-bold" 
                        : "text-slate-600 hover:bg-white hover:text-slate-900"
                    )}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              
              {/* Custom Picker Area */}
              <div className="p-6 space-y-6 bg-white min-w-[600px]">
                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Start</p>
                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-50/50 border border-blue-200 rounded-lg text-slate-700 font-bold shadow-inner">
                       {format(dateRange.start, 'MM / dd / yyyy')}
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">End</p>
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-bold">
                       {format(dateRange.end, 'MM / dd / yyyy')}
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 justify-center">
                   {/* Left Month */}
                   {viewMonths.map((viewDate, idx) => (
                     <div key={idx} className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                           {idx === 0 ? (
                             <ChevronLeft className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-900" onClick={handlePrevMonth} />
                           ) : <div className="w-4" />}
                           <div className="flex items-center gap-1">
                             <span className="text-sm font-bold text-slate-700">{format(viewDate, 'MMMM')}</span>
                             <select 
                               value={getYear(viewDate)} 
                               onChange={(e) => handleYearChange(idx, e.target.value)}
                               className="text-sm font-bold text-slate-700 bg-transparent border-none focus:ring-0 cursor-pointer"
                             >
                               {years.map(y => (
                                 <option key={y} value={y}>{y}</option>
                               ))}
                             </select>
                           </div>
                           {idx === 1 ? (
                             <ChevronRight className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-900" onClick={handleNextMonth} />
                           ) : <div className="w-4" />}
                        </div>
                        <Calendar
                          mode="range"
                          selected={{ from: dateRange.start, to: dateRange.end }}
                          onSelect={(range: any) => {
                            if (range?.from && range?.to) {
                              setDateRange({ label: 'Custom', start: range.from, end: range.to });
                            } else if (range?.from) {
                              setDateRange({ ...dateRange, label: 'Custom', start: range.from, end: range.from });
                            }
                          }}
                          month={viewDate}
                          className="p-0 pointer-events-auto"
                          classNames={{
                            month: "space-y-4",
                            caption: "hidden",
                            table: "w-full border-collapse space-y-1",
                            head_row: "flex",
                            head_cell: "text-slate-400 rounded-md w-8 font-bold text-[11px] uppercase",
                            row: "flex w-full mt-1",
                            cell: "h-8 w-8 text-center text-[13px] p-0 relative focus-within:relative focus-within:z-20",
                            day: cn(
                              "h-8 w-8 p-0 font-medium text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                            ),
                            day_selected: "bg-[#635bff] text-white hover:bg-[#635bff] hover:text-white focus:bg-[#635bff] focus:text-white rounded-full",
                            day_range_middle: "bg-[#635bff]/10 text-[#635bff] rounded-none",
                            day_today: "text-[#635bff] font-black",
                            day_outside: "text-slate-300 opacity-50",
                          }}
                        />
                     </div>
                   ))}
                </div>

                <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                   <Button variant="ghost" size="sm" className="font-bold text-slate-500 hover:text-slate-900" onClick={() => setIsDatePickerOpen(false)}>Clear</Button>
                   <Button size="sm" className="bg-[#635bff] hover:bg-[#5249f0] text-white font-bold px-6 rounded-lg shadow-lg shadow-purple-500/20" onClick={() => setIsDatePickerOpen(false)}>Apply</Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Frequency Selector */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="px-3 py-1 bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 cursor-pointer shadow-sm flex items-center gap-1.5 transition-all active:scale-95">
              <span>{frequency}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-1.5 border-slate-200 shadow-xl rounded-xl" align="start">
            {['Hourly', 'Daily', 'Weekly', 'Monthly'].map((f) => (
              <button
                key={f}
                onClick={() => setFrequency(f)}
                className="flex items-center justify-between w-full px-3 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50 rounded-lg group transition-colors"
              >
                <span>{f}</span>
                {frequency === f && <Check size={14} className="text-[#635bff]" />}
              </button>
            ))}
          </PopoverContent>
        </Popover>

        {/* Compare Selector */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="px-3 py-1 bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 cursor-pointer shadow-sm flex items-center gap-2 transition-all active:scale-95">
              <div className="w-3.5 h-3.5 flex items-center justify-center border border-slate-300 rounded-full text-[10px] font-black text-slate-400 group hover:border-[#635bff] hover:text-[#635bff] transition-colors">×</div>
              <span className="text-slate-400">Compare</span>
              <span className="text-[#635bff]">{compare}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-1.5 border-slate-200 shadow-xl rounded-xl" align="start">
            {['Previous period', 'Previous week', 'Previous month', 'Previous year', 'Custom'].map((c) => (
              <button
                key={c}
                onClick={() => setCompare(c)}
                className="flex items-center justify-between w-full px-3 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50 rounded-lg group transition-colors"
              >
                <span>{c}</span>
                {compare === c && <Check size={14} className="text-[#635bff]" />}
              </button>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {widgets.map((widget) => (
          <Card key={widget.id} className={cn(
            "p-5 bg-white border-slate-200 shadow-none transition-all group rounded-xl relative overflow-hidden",
            isEditing ? "ring-2 ring-purple-100 border-purple-200" : "hover:bg-slate-50/50 cursor-pointer"
          )}>
            {isEditing && (
              <button 
                onClick={(e) => { e.stopPropagation(); removeWidget(widget.id); }}
                className="absolute top-3 right-3 z-10 p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm"
              >
                <X size={14} strokeWidth={3} />
              </button>
            )}

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <p className="text-[13px] font-bold text-slate-500 tracking-tight uppercase tracking-[0.05em]">{widget.title}</p>
                <Info size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              {widget.id === 'gross-volume' && (
                <Button variant="outline" size="sm" className="h-7 px-2.5 text-[11px] font-bold bg-[#f7f8f9] border-slate-200 text-slate-600 hover:bg-white transition-colors">
                  <LayoutGrid size={12} className="mr-1.5 text-slate-400" /> Explore
                </Button>
              )}
            </div>

            {widget.type === 'chart' ? (
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <h4 className="text-[20px] font-black text-slate-900 tracking-tight">{widget.value}</h4>
                  <p className="text-[12px] font-bold text-slate-400">{widget.previousValue}</p>
                </div>
                <div className="flex-1 min-h-[100px] relative border-b border-slate-50 mt-auto">
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#635bff] rounded-full opacity-60"></div>
                  <div className="absolute left-0 bottom-3 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Dec 12</div>
                  <div className="absolute right-0 bottom-3 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Dec 18</div>
                  <div className="absolute right-0 top-0 text-[10px] font-bold text-slate-300 uppercase tracking-tighter">{currency} 0.01</div>
                  <div className="absolute right-0 bottom-1/2 translate-y-1/2 text-[10px] font-bold text-slate-300 uppercase tracking-tighter">{currency} 0</div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-300 italic">Updated 2 minutes ago</span>
                  <button className="text-[11px] font-bold text-[#635bff] hover:underline flex items-center gap-0.5">
                    More details <ChevronRight size={10} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-[180px] w-full border border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center bg-slate-50/30 group-hover:bg-white transition-colors">
                <div className="px-5 py-2.5 bg-[#f7f8f9] border border-slate-200/50 rounded-xl group-hover:bg-white transition-all shadow-sm">
                  <p className="text-slate-400 text-[14px] font-bold uppercase tracking-widest">No data</p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
      
      {/* Dynamic Footer with Icons matching 4th image */}
      <div className="fixed bottom-6 right-8 flex items-center gap-4 animate-in slide-in-from-bottom-4 duration-500">
         <div className="flex items-center bg-white border border-slate-200 rounded-full shadow-2xl p-1 gap-1">
            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors group">
               <LayoutGrid size={18} className="text-slate-400 group-hover:text-slate-900" />
            </button>
            <div className="h-4 w-px bg-slate-100 mx-1" />
            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors group">
               <Info size={18} className="text-slate-400 group-hover:text-slate-900" />
            </button>
            <div className="h-4 w-px bg-slate-100 mx-1" />
            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors group">
               <Settings size={18} className="text-slate-400 group-hover:text-slate-900" />
            </button>
            <div className="h-4 w-px bg-slate-100 mx-1" />
            <button className="p-2 bg-slate-50 rounded-full group">
               <ChevronRight size={18} className="text-slate-900 rotate-[270deg]" />
            </button>
         </div>
      </div>
    </div>
  );
}
