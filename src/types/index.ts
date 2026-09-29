export type SupportedLanguageCode =
  | 'en' // English
  | 'am' // Amharic
  | 'om' // Afaan Oromo
  | 'ti' // Tigrinya
  | 'ar' // Arabic
  | 'fr' // French
  | 'es' // Spanish
  | 'pt' // Portuguese
  | 'de' // German
  | 'it' // Italian
  | 'tr' // Turkish
  | 'ru' // Russian
  | 'zh' // Chinese
  | 'ja' // Japanese
  | 'ko' // Korean
  | 'hi' // Hindi
  | 'ur' // Urdu
  | 'bn' // Bengali
  | 'id' // Indonesian
  | 'ms' // Malay
  | 'sw' // Swahili
  | 'nl' // Dutch
  | 'pl' // Polish
  | 'vi' // Vietnamese
  | 'th'; // Thai

export interface LanguageInfo {
  code: SupportedLanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

export type SupportedCurrencyCode =
  | 'ETB'
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'AED'
  | 'SAR'
  | 'KES'
  | 'NGN'
  | 'ZAR';

export interface CurrencyInfo {
  code: SupportedCurrencyCode;
  symbol: string;
  name: string;
  rateToUSD: number; // Base rate relative to 1 USD
}

export type AdPlatform =
  | 'facebook'
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'telegram'
  | 'google_ads'
  | 'websites'
  | 'other';

export type AdCampaignGoal =
  | 'conversions'
  | 'traffic'
  | 'brand_awareness'
  | 'lead_generation'
  | 'app_installs'
  | 'video_views'
  | 'sales';

export type AdStyle =
  | 'direct_response'
  | 'storytelling'
  | 'minimalist_luxury'
  | 'urgency_scarcity'
  | 'educational'
  | 'humorous'
  | 'bold_disruptive';

export interface AdBuilderInput {
  productName: string;
  businessName: string;
  targetAudience: string;
  country: string;
  platform: AdPlatform;
  goal: AdCampaignGoal;
  budget: number;
  currency: SupportedCurrencyCode;
  style: AdStyle;
  language: SupportedLanguageCode;
}

export interface GeneratedAd {
  id: string;
  createdAt: string;
  input: AdBuilderInput;
  headline: string;
  primaryText: string;
  description: string;
  ctaText: string;
  shortVersion: string;
  longVersion: string;
  socialMediaVersion: string;
  recommendedKeywords: string[];
  audienceInsights: string;
}

export interface AdAnalysisInput {
  adText: string;
  headline?: string;
  cta?: string;
  platform: AdPlatform;
  targetAudience?: string;
  goal?: string;
}

export interface AdAnalysisResult {
  overallScore: number;
  metrics: {
    headline: { score: number; label: string; feedback: string };
    description: { score: number; label: string; feedback: string };
    cta: { score: number; label: string; feedback: string };
    audienceTargeting: { score: number; label: string; feedback: string };
    engagementPotential: { score: number; label: string; feedback: string };
    clarity: { score: number; label: string; feedback: string };
    relevance: { score: number; label: string; feedback: string };
    conversionPotential: { score: number; label: string; feedback: string };
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  rewrittenHeadline: string;
  rewrittenPrimaryText: string;
  improvedCta: string;
}

export interface AdRejectionInput {
  rejectionMessage: string;
  adText: string;
  platform: AdPlatform;
  campaignInfo: string;
}

export interface AdRejectionAnalysis {
  possibleReason: string;
  policyCategory: string;
  severity: 'high' | 'medium' | 'low';
  whatShouldBeChanged: string[];
  recommendedCorrectedVersion: {
    headline: string;
    primaryText: string;
    cta: string;
  };
  stepByStepSuggestions: string[];
  disclaimer: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actionPayload?: {
    type: 'ad_created' | 'ad_analyzed' | 'strategy_suggested';
    data?: any;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin' | 'business_creator';
  company?: string;
  preferredLanguage: SupportedLanguageCode;
  preferredCurrency: SupportedCurrencyCode;
  plan: 'free' | 'pro' | 'business';
  avatar?: string;
  createdAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft' | 'completed';
  platform: AdPlatform;
  country: string;
  budgetDaily: number;
  budgetTotal: number;
  currency: SupportedCurrencyCode;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
  ctr: number;
  cpc: number;
  roi: number;
  startDate: string;
  endDate?: string;
}

export interface WalletTransaction {
  id: string;
  date: string;
  type: 'deposit' | 'withdrawal' | 'ad_spend' | 'earnings';
  description: string;
  amount: number;
  currency: SupportedCurrencyCode;
  status: 'completed' | 'pending' | 'processing';
  referenceId: string;
}

export interface AnalyticsSummary {
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  conversionRate: number;
  cost: number;
  revenue: number;
  roi: number;
}
