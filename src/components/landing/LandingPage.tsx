import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../i18n/languages';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  Shield,
  Layers,
  BarChart3,
  Bot,
  Zap,
  Globe2,
  ChevronRight,
  HelpCircle,
  Sliders,
  DollarSign,
  Send,
  Copy,
  ExternalLink,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveView, setActiveDashboardTab, openAuthModal, currentCurrency, formatCurrency, t, setLanguage, currentLanguage } = useApp();

  const [activePreviewTab, setActivePreviewTab] = useState<'feed' | 'search' | 'telegram'>('feed');
  const [copiedDemo, setCopiedDemo] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleCopyDemo = () => {
    navigator.clipboard?.writeText(
      'Scale Your Results With CloudERP Global — Trusted in North America & Europe. Experience verified workflow ROI.'
    );
    setCopiedDemo(true);
    setTimeout(() => setCopiedDemo(false), 2000);
  };

  const faqs = [
    {
      q: 'Does Digital Product automatically publish ads to every network?',
      a: 'Digital Product provides an integration-ready ad studio. It crafts tailored creatives for Meta (Facebook & Instagram), Google Ads, TikTok, and Telegram. Direct API publishing requires your network ad account credentials, which connect via our secure integration tokens.',
    },
    {
      q: 'How does the 25+ languages AI engine work?',
      a: 'Our international engine adapts not merely words, but cultural hooks, idiomatic nuances, and regional advertising regulations across all 25 supported languages (including Amharic, Oromo, Tigrinya, Arabic, French, Spanish, and German).',
    },
    {
      q: 'How does the Ad Issue Analyzer diagnose rejections?',
      a: 'When an ad is disapproved or limited by an ad network, you paste the rejection notice and copy. The analyzer identifies the exact policy chapter (e.g. Sensationalism, Personal Attributes, Unrealistic Claims) and outputs compliant, re-engineered copy.',
    },
    {
      q: 'Can I select local currencies like Ethiopian Birr (ETB)?',
      a: 'Yes. You can switch between ETB, USD, EUR, GBP, AED, SAR, KES, NGN, and ZAR across the entire dashboard, budget planner, and billing reports.',
    },
    {
      q: 'How can developers connect their own AI and Database backends?',
      a: 'The application architecture is structured with clean service layers (`aiService`, `authService`, `currencyService`) ready to bind directly to Firebase Authentication, PostgreSQL (Cloud SQL), and Gemini API backend endpoints.',
    },
  ];

  return (
    <div className="w-full bg-[#030712] text-slate-100 min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-neutral-900">
        {/* Subtle radial ambient blue glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            
            {/* Meta indicator */}
            <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-400 mb-6 tracking-wide">
              <span>Next-Gen Advertising Engine</span>
              <span aria-hidden="true">·</span>
              <span>25+ Languages Supported</span>
              <span aria-hidden="true">·</span>
              <span>Multi-Platform AI</span>
            </div>

            {/* Exact Required Hero Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Create Smarter. Advertise Globally. Grow Faster.
            </h1>

            {/* Exact Required Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              An AI-powered advertising assistant for creating, analyzing, and improving digital advertisements for global audiences.
            </p>

            {/* Exact Required Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  setActiveDashboardTab('create_ad');
                  setActiveView('dashboard');
                }}
                className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer glow-blue"
              >
                <span>{t('startCreating')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveDashboardTab('ai_assistant');
                  setActiveView('dashboard');
                }}
                className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-slate-200 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-blue-400" />
                <span>{t('tryAiAssistant')}</span>
              </button>
            </div>

            {/* Adjacent Trust Signals & Quantified Proof */}
            <div className="mt-14 pt-8 border-t border-neutral-900 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
              <div>
                <p className="text-2xl font-bold font-mono text-white tabular-nums">25+</p>
                <p className="text-xs text-slate-400 mt-0.5">Native Languages</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-white tabular-nums">98.4%</p>
                <p className="text-xs text-slate-400 mt-0.5">Policy Compliance Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-white tabular-nums">+42%</p>
                <p className="text-xs text-slate-400 mt-0.5">Average CTR Uplift</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-white tabular-nums">9 Currencies</p>
                <p className="text-xs text-slate-400 mt-0.5">ETB, USD, EUR & More</p>
              </div>
            </div>

          </div>

          {/* Interactive Hero Visual Showcase */}
          <div className="mt-14 max-w-4xl mx-auto rounded-2xl border border-neutral-800 bg-neutral-950/80 p-4 sm:p-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs text-slate-400 ml-2 font-mono">Digital Product Studio — Live Preview</span>
              </div>
              <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800 text-xs">
                <button
                  onClick={() => setActivePreviewTab('feed')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    activePreviewTab === 'feed' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Instagram Feed
                </button>
                <button
                  onClick={() => setActivePreviewTab('search')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    activePreviewTab === 'search' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Google Search
                </button>
                <button
                  onClick={() => setActivePreviewTab('telegram')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    activePreviewTab === 'telegram' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Telegram Ad
                </button>
              </div>
            </div>

            {/* Dynamic ad mockup */}
            {activePreviewTab === 'feed' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center font-bold text-blue-400 text-xs">
                      DP
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Digital Product Global</p>
                      <p className="text-[11px] text-slate-400">Sponsored · Worldwide Audience</p>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Unlock High-Intent International Buyers with Autonomous AI Campaigns
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Stop burning budget on generic campaigns. Build, localize into 25 languages, and pre-verify policy compliance in minutes.
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setActiveDashboardTab('create_ad');
                        setActiveView('dashboard');
                      }}
                      className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow cursor-pointer"
                    >
                      Start Free Trial
                    </button>
                    <button
                      onClick={handleCopyDemo}
                      className="px-3 py-2 text-xs text-slate-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedDemo ? 'Copied!' : 'Copy Ad Text'}</span>
                    </button>
                  </div>
                </div>

                {/* Styled Visual Canvas Card */}
                <div className="h-64 rounded-xl bg-gradient-to-br from-blue-950/60 via-slate-900 to-black border border-blue-900/40 p-5 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-blue-400">CAMPAIGN PREVIEW</span>
                    <span className="font-mono">ROAS: 4.2x</span>
                  </div>
                  <div className="my-auto">
                    <p className="text-xl font-bold text-white tracking-tight">
                      Empowering Global Advertisers
                    </p>
                    <p className="text-xs text-slate-300 mt-1 max-w-xs">
                      Continuous headline variation, audience segmentation, and automated policy guardrails.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 text-[11px] text-slate-400 font-mono">
                    <span>Target: 14 Countries</span>
                    <span className="text-emerald-400">+128% Conversions</span>
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'search' && (
              <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span className="font-semibold text-white">Ad</span>
                  <span>·</span>
                  <span className="text-slate-300">https://www.digitalproduct.ai/global-ads</span>
                </div>
                <h4 className="text-base font-semibold text-blue-400 hover:underline cursor-pointer">
                  AI Advertising Platform | Scale in 25 Languages & 9 Currencies
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Generate high-converting headlines, descriptions, and CTA text in seconds. Prevent ad account bans with real-time policy rejection diagnostics. Free trial available.
                </p>
                <div className="flex gap-4 pt-2 text-xs text-blue-400">
                  <span className="hover:underline cursor-pointer">Ad Generator</span>
                  <span className="hover:underline cursor-pointer">Issue Analyzer</span>
                  <span className="hover:underline cursor-pointer">Currency Calculator</span>
                </div>
              </div>
            )}

            {activePreviewTab === 'telegram' && (
              <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold">
                      TG
                    </div>
                    <span className="text-xs font-semibold text-white">Digital Product Global Channel</span>
                  </div>
                  <span className="text-[11px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded font-mono">Sponsored</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-mono">
                  🚀 **Scale Your International Advertising with Zero Friction**
                  <br /><br />
                  Transform your regional product into a worldwide brand. Our AI assistant analyzes conversion friction, crafts platform-native copy, and ensures strict policy alignment.
                </p>
                <div className="pt-1">
                  <a
                    href="#ai-assistant"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveDashboardTab('ai_assistant');
                      setActiveView('dashboard');
                    }}
                    className="inline-block px-4 py-1.5 text-xs font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-lg"
                  >
                    Open AI Assistant
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* SECTION 1: HOW IT WORKS */}
      <section className="py-20 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
              Simple 3-Step Workflow
            </h2>
            <p className="text-3xl font-bold text-white tracking-tight">
              From Campaign Concept to High-Converting Ads in Seconds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 font-mono font-bold">
                01
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Define Your Offering</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter your product name, target countries, preferred platforms (Meta, Google, TikTok, Telegram), and advertising goals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 font-mono font-bold">
                02
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Generates Multi-Variation Copy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive headlines, primary text, descriptions, actionable CTAs, short & social media variants in any of the 25 supported languages.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 font-mono font-bold">
                03
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Analyze & Optimize Live</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Audit copy with our Ad Analyzer and Ad Issue Resolver to ensure maximum conversion potential and strict network policy approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: AI ADVERTISEMENT ASSISTANT */}
      <section className="py-20 border-b border-neutral-900 bg-neutral-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-400 mb-3">
                <Bot className="w-4 h-4" />
                <span>Conversational Advertising Intelligence</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                An AI Assistant Tailored Strictly for Digital Advertising
              </h2>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Unlike generic chatbots, our assistant is trained specifically on conversion copywriting frameworks, direct-response tactics, and platform policies across Facebook, TikTok, Google, and Telegram.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300">
                    <strong>Headline & Hook Engineering:</strong> Craft curiosity hooks, direct benefit angles, and urgency triggers.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300">
                    <strong>Audience & Angle Suggestions:</strong> Pinpoint buyer personas, emotional pain points, and demographic targeting.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300">
                    <strong>Conversion Diagnosis:</strong> Understand why an ad is underperforming and how to lift CTR immediately.
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveDashboardTab('ai_assistant');
                  setActiveView('dashboard');
                }}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Launch AI Assistant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Interactive Mock Chat Display */}
            <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-white">AI Advertising Assistant</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Response Time: 0.4s</span>
              </div>

              <div className="space-y-3 text-xs">
                {/* User Bubble */}
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
                    Can you write 3 high-converting headlines for our Ethiopian specialty coffee brand targeting buyers in UAE and Europe?
                  </div>
                </div>

                {/* Assistant Bubble */}
                <div className="flex justify-start">
                  <div className="bg-neutral-950 border border-neutral-800 text-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%] space-y-2">
                    <p className="font-semibold text-blue-400">Here are 3 tested angles for high-ticket coffee buyers:</p>
                    <ol className="list-decimal list-inside space-y-1 text-slate-300">
                      <li><strong>Direct Origin:</strong> &quot;Direct from Yirgacheffe: 88+ Cup Score Specialty Micro-Lots for Artisanal Roasters.&quot;</li>
                      <li><strong>Urgency / Exclusivity:</strong> &quot;Limited 2026 Harvest Allocation: Reserve Verified Direct-Trade Ethiopian Lots.&quot;</li>
                      <li><strong>Quality Hook:</strong> &quot;Why Leading Gulf & European Roasters are Sourcing Hand-Picked Highlands Arabica.&quot;</li>
                    </ol>
                    <p className="text-[11px] text-slate-400 pt-1">
                      💡 <em>Recommended CTA:</em> &quot;Order Cupping Sample Kit&quot; (reduces decision friction).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ADVERTISEMENT BUILDER & AD ANALYSIS */}
      <section className="py-20 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
              Comprehensive Suite
            </h2>
            <p className="text-3xl font-bold text-white tracking-tight">
              Create, Audit, and Repair Advertisements in One Unified Hub
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Builder */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Advertisement Builder</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Enter your business, product, budget, region, and platform. The engine crafts complete multi-format copy: Primary text, headlines, descriptions, and CTA variants.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveDashboardTab('create_ad');
                  setActiveView('dashboard');
                }}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 cursor-pointer pt-4 border-t border-neutral-900"
              >
                <span>Launch Ad Builder</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: Analysis */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Advertisement Analysis</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Paste existing ad copy to receive an objective breakdown across 8 key criteria: Clarity, Relevance, Conversion Probability, CTA Strength, and Engagement Potential.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveDashboardTab('ad_analysis');
                  setActiveView('dashboard');
                }}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 cursor-pointer pt-4 border-t border-neutral-900"
              >
                <span>Run Ad Analysis</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3: Issue Analyzer */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Ad Issue Analyzer</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Disapproved ad? Paste the platform notice to identify policy violations (sensationalism, unverified claims, personal attributes) and generate compliant re-writes.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveDashboardTab('ad_issue_analyzer');
                  setActiveView('dashboard');
                }}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 cursor-pointer pt-4 border-t border-neutral-900"
              >
                <span>Fix Rejected Ads</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: 25+ LANGUAGES & INTERNATIONAL AUDIENCES */}
      <section className="py-20 border-b border-neutral-900 bg-neutral-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-400 mb-2">
              <Globe2 className="w-4 h-4" />
              <span>Truly International Reach</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Native Localization Across 25 World Languages
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Target hyper-local markets in East Africa, the Middle East, Europe, Asia, and the Americas without losing contextual tone or copywriting rhythm.
            </p>
          </div>

          {/* Interactive Language Grid Showcase */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 max-w-4xl mx-auto">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  currentLanguage === lang.code
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                    : 'bg-neutral-900/60 border-neutral-800 text-slate-300 hover:border-neutral-700 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{lang.flag}</span>
                  <div>
                    <p className="text-xs font-medium truncate max-w-[90px]">{lang.nativeName}</p>
                    <p className="text-[10px] text-slate-500">{lang.name}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{lang.code.toUpperCase()}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-slate-400">
            Selected Language: <strong className="text-blue-400">{SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.nativeName}</strong> · UI dynamically updates instantly.
          </div>
        </div>
      </section>

      {/* SECTION 5: PRICING PLANS */}
      <section id="pricing" className="py-20 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
              Transparent Pricing
            </h2>
            <p className="text-3xl font-bold text-white tracking-tight">
              Flexible Plans for Individual Creators and Scaling Agencies
            </p>
            <p className="text-xs text-slate-400 mt-2">
              All prices shown in your preferred currency: <span className="font-semibold text-white">{currentCurrency}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Plan 1: Free */}
            <div className="p-7 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Free Tier</p>
                <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-3xl font-extrabold text-white font-mono">{formatCurrency(0)}</span>
                  <span className="text-xs text-slate-400">/ forever</span>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  Perfect for exploring the AI Assistant and creating initial ad tests.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Up to 15 AI Ad Generations / month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Ad Analysis (5 audits / month)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Access to 25 languages & 9 currencies</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-500">
                    <span>· API integrations & webhooks (Disabled)</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => openAuthModal('signup')}
                className="mt-8 w-full py-2.5 px-4 text-xs font-semibold text-slate-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-colors cursor-pointer"
              >
                Get Started Free
              </button>
            </div>

            {/* Plan 2: Pro (Featured) */}
            <div className="p-7 rounded-2xl bg-neutral-900 border border-blue-500/80 shadow-2xl relative flex flex-col justify-between glow-blue">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <p className="text-xs text-blue-400 uppercase tracking-wider font-semibold mb-1">Growth & Creators</p>
                <h3 className="text-2xl font-bold text-white mb-2">Pro Marketer</h3>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-3xl font-extrabold text-white font-mono">{formatCurrency(49)}</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-300 mb-6">
                  For active advertisers running multi-channel campaigns.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Unlimited AI Ad Generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Full Ad Issue Analyzer (Rejection repair)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Real-time ROAS & CTR performance analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Multi-platform mockups (Instagram, TikTok, Google)</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => openAuthModal('signup')}
                className="mt-8 w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow transition-colors cursor-pointer"
              >
                Start Pro 14-Day Trial
              </button>
            </div>

            {/* Plan 3: Business */}
            <div className="p-7 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Agencies & Enterprise</p>
                <h3 className="text-2xl font-bold text-white mb-2">Business</h3>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-3xl font-extrabold text-white font-mono">{formatCurrency(199)}</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  For cross-border marketing agencies and enterprise teams.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Multi-team collaborative workspaces</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Meta & Google Marketing API direct hooks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Dedicated account strategist & SLA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Custom AI training on your historical winners</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => openAuthModal('signup')}
                className="mt-8 w-full py-2.5 px-4 text-xs font-semibold text-slate-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-colors cursor-pointer"
              >
                Contact Enterprise Sales
              </button>
            </div>

          </div>

          <p className="text-center text-[11px] text-slate-500 mt-6">
            Billing integration ready (Stripe & Telebirr / Chapa compliant). Transactions in sandbox mode until payment provider keys are attached.
          </p>
        </div>
      </section>

      {/* SECTION 6: FAQ */}
      <section className="py-20 border-b border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
              Common Questions
            </h2>
            <p className="text-3xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-blue-400 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      activeFaq === idx ? 'rotate-90 text-blue-400' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-neutral-900 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-neutral-950 border-t border-neutral-900 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <span className="text-lg font-bold text-white tracking-tight">Digital Product</span>
              <p className="text-xs text-slate-400 mt-2 max-w-sm leading-relaxed">
                The international AI advertising suite for modern businesses, growth teams, and digital marketing leaders worldwide.
              </p>
              <div className="mt-4 text-[11px] text-slate-500">
                Operating in 25 native languages and 9 multi-region currencies.
              </div>
            </div>

            <div>
              <p className="font-semibold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">Platform</p>
              <ul className="space-y-2">
                <li><button onClick={() => { setActiveDashboardTab('ai_assistant'); setActiveView('dashboard'); }} className="hover:text-white">AI Assistant</button></li>
                <li><button onClick={() => { setActiveDashboardTab('create_ad'); setActiveView('dashboard'); }} className="hover:text-white">Ad Builder</button></li>
                <li><button onClick={() => { setActiveDashboardTab('ad_analysis'); setActiveView('dashboard'); }} className="hover:text-white">Ad Analysis</button></li>
                <li><button onClick={() => { setActiveDashboardTab('ad_issue_analyzer'); setActiveView('dashboard'); }} className="hover:text-white">Issue Analyzer</button></li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">Resources</p>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveView('help')} className="hover:text-white">Help Center</button></li>
                <li><button onClick={() => setActiveView('pricing')} className="hover:text-white">Pricing Plans</button></li>
                <li><span className="text-slate-500">Policy Guidelines</span></li>
                <li><span className="text-slate-500">API Documentation</span></li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">Legal & Trust</p>
              <ul className="space-y-2">
                <li><span className="hover:text-white cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-white cursor-pointer">Terms of Service</span></li>
                <li><span className="hover:text-white cursor-pointer">Cookie Policy</span></li>
                <li><span className="hover:text-white cursor-pointer">Security Standards</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} Digital Product AI. All rights reserved.</p>
            <p className="mt-2 sm:mt-0">
              International AI Advertising Platform · Engineered for Global Growth
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};
