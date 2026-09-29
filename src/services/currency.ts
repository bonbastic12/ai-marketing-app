import { CurrencyInfo, SupportedCurrencyCode } from '../types';

export const SUPPORTED_CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rateToUSD: 1.0 },
  { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr', rateToUSD: 124.5 },
  { code: 'EUR', symbol: '€', name: 'Euro', rateToUSD: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rateToUSD: 0.79 },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rateToUSD: 3.67 },
  { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal', rateToUSD: 3.75 },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', rateToUSD: 129.0 },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', rateToUSD: 1540.0 },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', rateToUSD: 18.2 },
];

/**
 * Exchange Rate Provider interface for production integration
 * Can be connected to OpenExchangeRates, Frankfurter, ExchangeRate-API, Fixer, etc.
 */
export interface ExchangeRateProvider {
  fetchRates: () => Promise<Record<SupportedCurrencyCode, number>>;
}

class CurrencyManager {
  private rates: Record<SupportedCurrencyCode, number> = {
    USD: 1.0,
    ETB: 124.5,
    EUR: 0.92,
    GBP: 0.79,
    AED: 3.67,
    SAR: 3.75,
    KES: 129.0,
    NGN: 1540.0,
    ZAR: 18.2,
  };

  private lastUpdated: string = new Date().toISOString();

  public getCurrencyInfo(code: SupportedCurrencyCode): CurrencyInfo {
    const found = SUPPORTED_CURRENCIES.find((c) => c.code === code);
    return found || SUPPORTED_CURRENCIES[0];
  }

  public convert(amountInUSD: number, targetCurrency: SupportedCurrencyCode): number {
    const rate = this.rates[targetCurrency] ?? 1.0;
    return amountInUSD * rate;
  }

  public format(amount: number, currency: SupportedCurrencyCode, showCode: boolean = false): string {
    const info = this.getCurrencyInfo(currency);
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);

    if (showCode) {
      return `${info.symbol}${formatted} ${currency}`;
    }
    return `${info.symbol}${formatted}`;
  }

  public formatFromUSD(amountInUSD: number, targetCurrency: SupportedCurrencyCode): string {
    const converted = this.convert(amountInUSD, targetCurrency);
    return this.format(converted, targetCurrency);
  }

  /**
   * Connect real exchange-rate API
   */
  public async updateLiveRates(provider?: ExchangeRateProvider): Promise<boolean> {
    try {
      if (provider) {
        const liveRates = await provider.fetchRates();
        this.rates = { ...this.rates, ...liveRates };
        this.lastUpdated = new Date().toISOString();
        return true;
      }
      return true;
    } catch (e) {
      console.warn('Could not fetch external exchange rates, using fallback baseline.', e);
      return false;
    }
  }

  public getLastUpdated(): string {
    return this.lastUpdated;
  }
}

export const currencyService = new CurrencyManager();
