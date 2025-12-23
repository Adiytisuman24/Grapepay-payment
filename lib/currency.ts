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
    'INR': '₹',
    'JPY': '¥',
    'CNY': '¥',
    'AUD': 'A$',
    'CAD': 'C$',
    'SGD': 'S$',
    'AED': 'د.إ',
    'SAR': 'ر.س',
    'BRL': 'R$',
    'MXN': 'Mex$',
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
    'INR': '₹',
    'JPY': '¥',
    'CNY': '¥',
    'AUD': 'A$',
    'CAD': 'C$',
    'SGD': 'S$',
    'AED': 'د.إ',
    'SAR': 'ر.س',
    'BRL': 'R$',
    'MXN': 'Mex$',
    'CHF': 'Fr',
    'SEK': 'kr',
    'NOK': 'kr',
    'DKK': 'kr',
    'PLN': 'zł',
    'ZAR': 'R',
    'HKD': 'HK$',
    'KRW': '₩',
    'THB': '฿',
    'IDR': 'Rp',
    'MYR': 'RM',
    'PHP': '₱',
    'VND': '₫',
    'TRY': '₺',
    'ILS': '₪',
  };
  
  return symbols[currency] || currency;
}
