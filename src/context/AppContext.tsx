import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTranslation } from '../i18n/languages';
import { authService, AuthState } from '../services/authService';
import { currencyService } from '../services/currency';
import {
  AdPlatform,
  Campaign,
  GeneratedAd,
  SupportedCurrencyCode,
  SupportedLanguageCode,
  UserProfile,
  WalletTransaction,
} from '../types';

export type ActiveView = 'landing' | 'dashboard' | 'pricing' | 'about' | 'help';

export type DashboardTab =
  | 'overview'
  | 'ai_assistant'
  | 'create_ad'
  | 'ad_analysis'
  | 'ad_issue_analyzer'
  | 'my_ads'
  | 'campaigns'
  | 'analytics'
  | 'wallet'
  | 'profile'
  | 'settings'
  | 'admin_panel'
  | 'help_center';

export interface AppContextType {
  // Navigation & View
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  activeDashboardTab: DashboardTab;
  setActiveDashboardTab: (tab: DashboardTab) => void;

  // Internationalization
  currentLanguage: SupportedLanguageCode;
  setLanguage: (lang: SupportedLanguageCode) => void;
  t: (key: string) => string;

  // Currency
  currentCurrency: SupportedCurrencyCode;
  setCurrency: (curr: SupportedCurrencyCode) => void;
  formatCurrency: (amountInUSD: number) => string;
  formatRawCurrency: (amount: number, curr?: SupportedCurrencyCode) => string;

  // Authentication
  auth: AuthState;
  openAuthModal: (mode?: 'signin' | 'signup' | 'phone' | 'forgot') => void;
  closeAuthModal: () => void;
  authModalOpen: boolean;
  authModalMode: 'signin' | 'signup' | 'phone' | 'forgot' | 'reset';
  setAuthModalMode: (mode: 'signin' | 'signup' | 'phone' | 'forgot' | 'reset') => void;

  // Saved Data Store
  savedAds: GeneratedAd[];
  saveAd: (ad: GeneratedAd) => void;
  deleteAd: (id: string) => void;

  // Campaigns Store
  campaigns: Campaign[];
  addCampaign: (campaign: Campaign) => void;
  updateCampaignStatus: (id: string, status: Campaign['status']) => void;

  // Wallet Store
  walletBalanceUSD: number;
  transactions: WalletTransaction[];
  addFunds: (amountUSD: number, description?: string) => void;
  withdrawFunds: (amountUSD: number) => boolean;

  // Stats
  aiUsageCount: number;
  incrementAiUsage: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

// Initial realistic demo advertisements
const INITIAL_DEMO_ADS: GeneratedAd[] = [
  {
    id: 'ad_demo_01',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    input: {
      productName: 'CloudERP Global',
      businessName: 'Apex Systems',
      targetAudience: 'Chief Technology Officers & Operations Managers',
      country: 'United States & Europe',
      platform: 'google_ads',
      goal: 'conversions',
      budget: 1500,
      currency: 'USD',
      style: 'direct_response',
      language: 'en',
    },
    headline: 'Unified ERP for Multi-Entity Global Enterprises',
    primaryText:
      'Eliminate fragmented accounting and manual reconciliation. Apex CloudERP consolidates multi-currency books and real-time inventory into one compliant ledger.',
    description: 'Trusted by 450+ multinational operations. Deploy within 14 days.',
    ctaText: 'Schedule Technical Demo',
    shortVersion: 'Unified ERP for Multi-Entity Global Enterprises: Deploy within 14 days.',
    longVersion:
      'Unified ERP for Multi-Entity Global Enterprises\n\nEliminate fragmented accounting and manual reconciliation. Apex CloudERP consolidates multi-currency books and real-time inventory into one compliant ledger.\n\nKey Highlights:\n• Automated currency conversion and consolidated balance sheets\n• SOC2 Type II and GDPR enterprise verified\n• Real-time supply chain forecasting',
    socialMediaVersion: 'Ad · www.apexsystems.io/erp\nUnified ERP for Multi-Entity Global Enterprises | Schedule Technical Demo',
    recommendedKeywords: ['enterprise erp', 'multicurrency erp', 'cloud erp software'],
    audienceInsights: 'High intent among mid-market enterprise leaders looking for migration paths from legacy SAP/Oracle.',
  },
  {
    id: 'ad_demo_02',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    input: {
      productName: 'Specialty Ethiopian Yirgacheffe Coffee',
      businessName: 'Addis Roast & Export',
      targetAudience: 'Artisanal Cafes & Global Coffee Enthusiasts',
      country: 'Worldwide',
      platform: 'instagram',
      goal: 'sales',
      budget: 800,
      currency: 'ETB',
      style: 'storytelling',
      language: 'en',
    },
    headline: 'Direct from the Highlands of Yirgacheffe to Your Roastery',
    primaryText:
      'Cultivated at 2,000 meters above sea level. Floral jasmine aromas, vibrant bergamot acidity, and hand-sorted single origin beans sourced directly with direct farmer partnerships.',
    description: 'Specialty grade 88+ SCA micro-lots shipped worldwide in protective hermetic bags.',
    ctaText: 'Order Sample Lot',
    shortVersion: 'Direct from the Highlands of Yirgacheffe: Specialty single origin green coffee beans.',
    longVersion:
      'Direct from the Highlands of Yirgacheffe to Your Roastery\n\nCultivated at 2,000 meters above sea level. Floral jasmine aromas, vibrant bergamot acidity, and hand-sorted single origin beans sourced directly with direct farmer partnerships.\n\n• 88+ Cup Score\n• Fully Washed & Natural Sun-Dried micro lots\n• Transparent direct trade pricing',
    socialMediaVersion:
      'Direct from the Highlands of Yirgacheffe to Your Roastery ☕✨\n\nFloral jasmine aromas and vibrant bergamot acidity hand-sorted at origin. Order your roaster sample today!\n\n#SpecialtyCoffee #EthiopianCoffee #Yirgacheffe #DirectTrade',
    recommendedKeywords: ['ethiopian coffee beans', 'specialty green coffee', 'yirgacheffe micro lot'],
    audienceInsights: 'Engaged specialty coffee roasters across Europe, North America, and East Asia.',
  },
];

// Initial realistic campaigns
const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'cmp_01',
    name: 'Global Enterprise ERP Search',
    status: 'active',
    platform: 'google_ads',
    country: 'United States, UK, Germany',
    budgetDaily: 85,
    budgetTotal: 2500,
    currency: 'USD',
    impressions: 48920,
    clicks: 1840,
    conversions: 142,
    spend: 1820,
    revenue: 9400,
    ctr: 3.76,
    cpc: 0.99,
    roi: 416,
    startDate: '2026-09-01',
  },
  {
    id: 'cmp_02',
    name: 'Artisan Coffee Direct Instagram',
    status: 'active',
    platform: 'instagram',
    country: 'UAE, Saudi Arabia, Japan',
    budgetDaily: 45,
    budgetTotal: 1200,
    currency: 'USD',
    impressions: 92400,
    clicks: 3410,
    conversions: 218,
    spend: 960,
    revenue: 4100,
    ctr: 3.69,
    cpc: 0.28,
    roi: 327,
    startDate: '2026-09-10',
  },
  {
    id: 'cmp_03',
    name: 'FinTech Mobile App Installs TikTok',
    status: 'active',
    platform: 'tiktok',
    country: 'Kenya, Nigeria, South Africa',
    budgetDaily: 60,
    budgetTotal: 1800,
    currency: 'USD',
    impressions: 165000,
    clicks: 5200,
    conversions: 780,
    spend: 1150,
    revenue: 3450,
    ctr: 3.15,
    cpc: 0.22,
    roi: 200,
    startDate: '2026-09-15',
  },
  {
    id: 'cmp_04',
    name: 'B2B Logistics Telegram Blast',
    status: 'completed',
    platform: 'telegram',
    country: 'Ethiopia, UAE, Turkey',
    budgetDaily: 30,
    budgetTotal: 500,
    currency: 'USD',
    impressions: 34000,
    clicks: 1420,
    conversions: 89,
    spend: 490,
    revenue: 1680,
    ctr: 4.18,
    cpc: 0.35,
    roi: 242,
    startDate: '2026-08-20',
    endDate: '2026-09-05',
  },
];

// Initial realistic transactions
const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx_01',
    date: '2026-09-28T14:30:00Z',
    type: 'ad_spend',
    description: 'Ad Delivery: Global Enterprise ERP Search',
    amount: -85.0,
    currency: 'USD',
    status: 'completed',
    referenceId: 'AD-GOOGLE-4820',
  },
  {
    id: 'tx_02',
    date: '2026-09-27T09:15:00Z',
    type: 'earnings',
    description: 'Affiliate Campaign Revenue Share (Middle East)',
    amount: 340.0,
    currency: 'USD',
    status: 'completed',
    referenceId: 'REV-ME-9182',
  },
  {
    id: 'tx_03',
    date: '2026-09-25T11:00:00Z',
    type: 'deposit',
    description: 'Prepaid Wallet Top-Up (Direct Wire / Stripe)',
    amount: 1500.0,
    currency: 'USD',
    status: 'completed',
    referenceId: 'PAY-STRIPE-7104',
  },
  {
    id: 'tx_04',
    date: '2026-09-20T16:45:00Z',
    type: 'withdrawal',
    description: 'Bank Wire Transfer to USD Account',
    amount: -600.0,
    currency: 'USD',
    status: 'completed',
    referenceId: 'WTH-WIRE-3912',
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('landing');
  const [activeDashboardTab, setActiveDashboardTab] = useState<DashboardTab>('overview');

  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguageCode>('en');
  const [currentCurrency, setCurrentCurrency] = useState<SupportedCurrencyCode>('USD');

  const [auth, setAuth] = useState<AuthState>(authService.getState());
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup' | 'phone' | 'forgot' | 'reset'>('signin');

  const [savedAds, setSavedAds] = useState<GeneratedAd[]>(() => {
    try {
      const saved = localStorage.getItem('digital_product_saved_ads');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_ADS;
    } catch {
      return INITIAL_DEMO_ADS;
    }
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    try {
      const saved = localStorage.getItem('digital_product_campaigns');
      return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
    } catch {
      return INITIAL_CAMPAIGNS;
    }
  });

  const [walletBalanceUSD, setWalletBalanceUSD] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('digital_product_wallet_balance');
      return saved ? parseFloat(saved) : 2355.0;
    } catch {
      return 2355.0;
    }
  });

  const [transactions, setTransactions] = useState<WalletTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('digital_product_transactions');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  const [aiUsageCount, setAiUsageCount] = useState<number>(38);

  useEffect(() => {
    const unsub = authService.subscribe((newAuth) => {
      setAuth(newAuth);
      if (newAuth.user) {
        if (newAuth.user.preferredLanguage) setCurrentLanguage(newAuth.user.preferredLanguage);
        if (newAuth.user.preferredCurrency) setCurrentCurrency(newAuth.user.preferredCurrency);
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('digital_product_saved_ads', JSON.stringify(savedAds));
    } catch {
      // Ignore
    }
  }, [savedAds]);

  useEffect(() => {
    try {
      localStorage.setItem('digital_product_campaigns', JSON.stringify(campaigns));
    } catch {
      // Ignore
    }
  }, [campaigns]);

  useEffect(() => {
    try {
      localStorage.setItem('digital_product_wallet_balance', walletBalanceUSD.toString());
    } catch {
      // Ignore
    }
  }, [walletBalanceUSD]);

  useEffect(() => {
    try {
      localStorage.setItem('digital_product_transactions', JSON.stringify(transactions));
    } catch {
      // Ignore
    }
  }, [transactions]);

  const t = (key: string): string => {
    return getTranslation(currentLanguage, key);
  };

  const formatCurrency = (amountInUSD: number): string => {
    return currencyService.formatFromUSD(amountInUSD, currentCurrency);
  };

  const formatRawCurrency = (amount: number, curr?: SupportedCurrencyCode): string => {
    return currencyService.format(amount, curr || currentCurrency);
  };

  const openAuthModal = (mode: 'signin' | 'signup' | 'phone' | 'forgot' = 'signin') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const saveAd = (ad: GeneratedAd) => {
    setSavedAds((prev) => [ad, ...prev]);
  };

  const deleteAd = (id: string) => {
    setSavedAds((prev) => prev.filter((a) => a.id !== id));
  };

  const addCampaign = (campaign: Campaign) => {
    setCampaigns((prev) => [campaign, ...prev]);
  };

  const updateCampaignStatus = (id: string, status: Campaign['status']) => {
    setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const addFunds = (amountUSD: number, description = 'Prepaid Wallet Deposit') => {
    setWalletBalanceUSD((prev) => prev + amountUSD);
    const newTx: WalletTransaction = {
      id: 'tx_' + Math.random().toString(36).substr(2, 8),
      date: new Date().toISOString(),
      type: 'deposit',
      description,
      amount: amountUSD,
      currency: 'USD',
      status: 'completed',
      referenceId: 'DEP-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const withdrawFunds = (amountUSD: number): boolean => {
    if (amountUSD > walletBalanceUSD) return false;
    setWalletBalanceUSD((prev) => prev - amountUSD);
    const newTx: WalletTransaction = {
      id: 'tx_' + Math.random().toString(36).substr(2, 8),
      date: new Date().toISOString(),
      type: 'withdrawal',
      description: 'Payout Transfer',
      amount: -amountUSD,
      currency: 'USD',
      status: 'completed',
      referenceId: 'WTH-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    };
    setTransactions((prev) => [newTx, ...prev]);
    return true;
  };

  const incrementAiUsage = () => {
    setAiUsageCount((prev) => prev + 1);
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        activeDashboardTab,
        setActiveDashboardTab,
        currentLanguage,
        setLanguage: setCurrentLanguage,
        t,
        currentCurrency,
        setCurrency: setCurrentCurrency,
        formatCurrency,
        formatRawCurrency,
        auth,
        openAuthModal,
        closeAuthModal,
        authModalOpen,
        authModalMode,
        setAuthModalMode,
        savedAds,
        saveAd,
        deleteAd,
        campaigns,
        addCampaign,
        updateCampaignStatus,
        walletBalanceUSD,
        transactions,
        addFunds,
        withdrawFunds,
        aiUsageCount,
        incrementAiUsage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
