// Currency mapping based on country/region
export const CURRENCY_MAP: { [key: string]: string } = {
  // Americas
  'United States': 'USD',
  'USA': 'USD',
  'US': 'USD',
  'Canada': 'CAD',
  'Mexico': 'MXN',
  'Brazil': 'BRL',
  'Argentina': 'ARS',
  
  // Europe
  'United Kingdom': 'GBP',
  'UK': 'GBP',
  'Germany': 'EUR',
  'France': 'EUR',
  'Italy': 'EUR',
  'Spain': 'EUR',
  'Portugal': 'EUR',
  'Netherlands': 'EUR',
  'Belgium': 'EUR',
  'Austria': 'EUR',
  'Ireland': 'EUR',
  'Greece': 'EUR',
  'Poland': 'PLN',
  'Switzerland': 'CHF',
  'Sweden': 'SEK',
  'Norway': 'NOK',
  'Denmark': 'DKK',
  
  // Asia Pacific
  'India': 'INR',
  'China': 'CNY',
  'Japan': 'JPY',
  'South Korea': 'KRW',
  'Singapore': 'SGD',
  'Hong Kong': 'HKD',
  'Australia': 'AUD',
  'New Zealand': 'NZD',
  'Indonesia': 'IDR',
  'Thailand': 'THB',
  'Malaysia': 'MYR',
  'Philippines': 'PHP',
  'Vietnam': 'VND',
  
  // Middle East & Africa
  'United Arab Emirates': 'AED',
  'UAE': 'AED',
  'Saudi Arabia': 'SAR',
  'South Africa': 'ZAR',
  'Israel': 'ILS',
  'Turkey': 'TRY',
  'Egypt': 'EGP',
  'Nigeria': 'NGN',
  'Kenya': 'KES',
};

export const EXCHANGE_RATES: { [key: string]: number } = {
  'USD': 1,
  'EUR': 0.92,
  'GBP': 0.79,
  'JPY': 148.50,
  'CAD': 1.35,
  'AUD': 1.52,
  'CHF': 0.88,
  'CNY': 7.19,
  'INR': 83.30,
  'ZAR': 19.10,
  'BRL': 4.95,
  'MXN': 17.10,
  'SGD': 1.34,
  'HKD': 7.82,
  'NZD': 1.63,
  'BTC': 0.000023, // 1 USD = 0.000023 BTC
  'ETH': 0.00044,  // 1 USD = 0.00044 ETH
  'SOL': 0.010,    // 1 USD = 0.010 SOL
};

export function convertCurrency(amount: number, from: string, to: string): number {
  if (from === to) return amount;
  
  // Convert from source to USD first
  const rateFrom = EXCHANGE_RATES[from] || 1;
  const inUSD = amount / rateFrom;
  
  // Convert from USD to target
  const rateTo = EXCHANGE_RATES[to] || 1;
  return inUSD * rateTo;
}

// Get currency from user's country
export function getUserCurrency(country?: string): string {
  if (!country) return 'USD';
  
  // Check direct mapping
  const currency = CURRENCY_MAP[country];
  if (currency) return currency;
  
  // Check for partial matches (e.g., "United States of America")
  for (const [key, value] of Object.entries(CURRENCY_MAP)) {
    if (country.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  
  return 'USD'; // Default fallback
}

// Format currency with symbol
export function formatCurrency(amount: number, currency: string): string {
  const symbols: { [key: string]: string } = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'CAD': 'C$',
    'AUD': 'A$',
    'CHF': 'Fr',
    'CNY': '¥',
    'INR': '₹',
    'ZAR': 'R',
    'BRL': 'R$',
    'MXN': 'MX$',
    'SGD': 'S$',
    'HKD': 'HK$',
    'NZD': 'NZ$',
  };
  
  const symbol = symbols[currency] || currency;
  
  // Format number with commas
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  
  return `${symbol}${formatted}`;
}

// Get currency symbol only
export function getCurrencySymbol(currency: string): string {
  const symbols: { [key: string]: string } = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'CAD': 'C$',
    'AUD': 'A$',
    'CHF': 'Fr',
    'CNY': '¥',
    'INR': '₹',
    'ZAR': 'R',
    'BRL': 'R$',
    'MXN': 'MX$',
    'SGD': 'S$',
    'HKD': 'HK$',
    'NZD': 'NZ$',
    'AED': 'د.إ',
  };
  
  return symbols[currency] || currency;
}

// Regional Taxation Data (CIT = Corporate Income Tax, VAT = Value Added Tax)
export const REGIONAL_TAX_DATA: { [key: string]: { CIT: number; VAT: number; surgeFee?: number } } = {
  'India': { CIT: 18, VAT: 18 }, // 18% CIT as requested by user, 18% GST
  'United Arab Emirates': { CIT: 0, VAT: 5, surgeFee: 2 }, // Dubai: 0% tax, 2% surge fee for payouts
  'USA': { CIT: 25.57, VAT: 0 },
  'United Kingdom': { CIT: 25, VAT: 20 },
  'Germany': { CIT: 30.06, VAT: 19 },
  'France': { CIT: 36.13, VAT: 20 },
  'Japan': { CIT: 30.62, VAT: 10 },
  'Canada': { CIT: 26.5, VAT: 5 },
  'Australia': { CIT: 30, VAT: 10 },
  'Singapore': { CIT: 17, VAT: 9 },
  'Brazil': { CIT: 34, VAT: 17 },
  'China': { CIT: 25, VAT: 13 },
};

export function getTaxRates(region: string) {
  // Default fallback
  const fallback = { CIT: 24, VAT: 15 };
  
  if (!region) return fallback;
  
  // Check direct mapping
  const data = REGIONAL_TAX_DATA[region];
  if (data) return data;
  
  // Check for partial matches
  const match = Object.keys(REGIONAL_TAX_DATA).find(key => 
    region.toLowerCase().includes(key.toLowerCase())
  );
  
  return match ? REGIONAL_TAX_DATA[match] : fallback;
}
