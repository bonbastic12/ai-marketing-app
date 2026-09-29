import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { currentCurrency, formatCurrency, openAuthModal, setActiveDashboardTab, setActiveView, t } = useApp();

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simple, Scalable Pricing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Invest in High-Converting Ads Globally
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Select a tier tailored to your growth ambitions. All plans include 25+ language translations and multi-currency billing in <span className="font-semibold text-white">{currentCurrency}</span>.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
        
        {/* Starter Plan */}
        <div className="p-8 rounded-2xl bg-neutral-950 border border-neutral-900 flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Starter</span>
            <h2 className="text-2xl font-bold text-white mt-1 mb-2">Free Explorer</h2>
            <div className="flex items-baseline gap-1 my-4">
              <span className="text-4xl font-extrabold font-mono text-white">{formatCurrency(0)}</span>
              <span className="text-xs text-slate-400">/ forever</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Ideal for new advertisers testing AI ad copies and basic analysis.
            </p>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>15 Ad Generations / month</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Basic Ad Analysis (5 audits)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Access to 25 languages & 9 currencies</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Save up to 10 ads in library</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => openAuthModal('signup')}
            className="mt-8 w-full py-2.5 px-4 text-xs font-semibold text-slate-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-colors cursor-pointer"
          >
            Start For Free
          </button>
        </div>

        {/* Pro Marketer Plan (Featured) */}
        <div className="p-8 rounded-2xl bg-neutral-900 border border-blue-500 shadow-2xl relative flex flex-col justify-between glow-blue">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
            Most Popular
          </div>
          <div>
            <span className="text-xs text-blue-400 uppercase tracking-wider font-semibold">Scaling Growth</span>
            <h2 className="text-2xl font-bold text-white mt-1 mb-2">Pro Marketer</h2>
            <div className="flex items-baseline gap-1 my-4">
              <span className="text-4xl font-extrabold font-mono text-white">{formatCurrency(49)}</span>
              <span className="text-xs text-slate-400">/ month</span>
            </div>
            <p className="text-xs text-slate-300 mb-6">
              For growth teams and independent performance advertisers.
            </p>

            <ul className="space-y-3 text-xs text-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Unlimited AI Ad Generations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Unlimited Ad Analysis & Score Audits</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Ad Issue Analyzer (Rejection Resolver)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Live Interactive Social Mocks (Instagram, TikTok, Google)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Campaign Analytics & CSV Exports</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => openAuthModal('signup')}
            className="mt-8 w-full py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition-all cursor-pointer glow-blue"
          >
            Start Pro 14-Day Free Trial
          </button>
        </div>

        {/* Business Agency Plan */}
        <div className="p-8 rounded-2xl bg-neutral-950 border border-neutral-900 flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Enterprise & Agency</span>
            <h2 className="text-2xl font-bold text-white mt-1 mb-2">Agency Suite</h2>
            <div className="flex items-baseline gap-1 my-4">
              <span className="text-4xl font-extrabold font-mono text-white">{formatCurrency(199)}</span>
              <span className="text-xs text-slate-400">/ month</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              For marketing agencies running high-volume multi-client ad campaigns.
            </p>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Everything in Pro for up to 10 team seats</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Meta & Google Ads direct API publishing hooks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Dedicated SLA & Priority AI Strategist</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Custom Brand Voice tuning</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => openAuthModal('signup')}
            className="mt-8 w-full py-2.5 px-4 text-xs font-semibold text-slate-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-colors cursor-pointer"
          >
            Contact Sales
          </button>
        </div>

      </div>

      <div className="max-w-2xl mx-auto p-4 rounded-xl bg-neutral-950 border border-neutral-900 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-blue-400" />
        <span>30-Day Money Back Guarantee · Cancel Anytime · Transparent Multi-Currency Billing</span>
      </div>

    </div>
  );
};
