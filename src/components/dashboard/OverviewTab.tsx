import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  Megaphone,
  BarChart3,
  Bot,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  PlusCircle,
  FileSearch,
  AlertTriangle,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const OverviewTab: React.FC = () => {
  const {
    savedAds,
    campaigns,
    walletBalanceUSD,
    aiUsageCount,
    formatCurrency,
    setActiveDashboardTab,
    currentCurrency,
    t,
  } = useApp();

  const activeCampaignsCount = campaigns.filter((c) => c.status === 'active').length;
  const totalSpend = campaigns.reduce((acc, c) => acc + c.spend, 0);
  const totalRevenue = campaigns.reduce((acc, c) => acc + c.revenue, 0);
  const overallROI = totalSpend > 0 ? Math.round(((totalRevenue - totalSpend) / totalSpend) * 100) : 284;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-neutral-950 to-neutral-950 border border-blue-900/40">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>International Marketing Command</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Performance Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Real-time analytics across your active digital campaigns, localized copy generation, and advertising audits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveDashboardTab('create_ad')}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer glow-blue"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Ad</span>
          </button>
          <button
            onClick={() => setActiveDashboardTab('ai_assistant')}
            className="px-4 py-2.5 text-xs font-medium text-slate-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Bot className="w-4 h-4 text-blue-400" />
            <span>AI Assistant</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid (Tabular Numerals & Anti-Slop Single-Elevation) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-900 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t('totalAds')}</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono text-white tabular-nums">
              {savedAds.length}
            </span>
            <span className="text-[11px] text-emerald-400 flex items-center font-mono">
              +4 this week
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-neutral-900">
            Across Meta, Google, TikTok & Telegram
          </p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-900 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t('activeCampaigns')}</span>
            <Megaphone className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono text-white tabular-nums">
              {activeCampaignsCount}
            </span>
            <span className="text-[11px] text-emerald-400 font-mono">
              Running
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-neutral-900">
            Targeting 14 international regions
          </p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-900 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t('estEarnings')}</span>
            <DollarSign className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-white tabular-nums">
              {formatCurrency(totalRevenue)}
            </span>
            <span className="text-[11px] text-emerald-400 flex items-center font-mono">
              <TrendingUp className="w-3 h-3 mr-0.5" />
              +{overallROI}% ROI
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-neutral-900">
            Spend: {formatCurrency(totalSpend)} in {currentCurrency}
          </p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-900 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t('aiUsage')}</span>
            <Bot className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono text-white tabular-nums">
              {aiUsageCount}
            </span>
            <span className="text-[11px] text-blue-400 font-mono">
              99.8% Success
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-neutral-900">
            Ad copy, audits, and translations
          </p>
        </div>

      </div>

      {/* Two Column Layout: Active Campaigns Table + Live Action Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main 2-Col: Campaigns Performance Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Active Campaigns</h2>
              <p className="text-xs text-slate-400">Continuous delivery metrics across networks</p>
            </div>
            <button
              onClick={() => setActiveDashboardTab('campaigns')}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
            >
              View all campaigns →
            </button>
          </div>

          <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-900 bg-neutral-900/40 text-slate-400">
                    <th className="py-3 px-4 font-medium">Campaign</th>
                    <th className="py-3 px-4 font-medium">Platform</th>
                    <th className="py-3 px-4 font-medium text-right">Spend ({currentCurrency})</th>
                    <th className="py-3 px-4 font-medium text-right">Revenue</th>
                    <th className="py-3 px-4 font-medium text-right">CTR</th>
                    <th className="py-3 px-4 font-medium text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  {campaigns.slice(0, 4).map((cmp) => (
                    <tr key={cmp.id} className="hover:bg-neutral-900/30 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-semibold text-white truncate max-w-[180px]">{cmp.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{cmp.country}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-slate-300 capitalize">
                          {cmp.platform.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-200">
                        {formatCurrency(cmp.spend)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-emerald-400 font-semibold">
                        {formatCurrency(cmp.revenue)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-200">
                        {cmp.ctr}%
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            cmp.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-neutral-800 text-slate-400'
                          }`}
                        >
                          {cmp.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-neutral-900/30 border-t border-neutral-900 flex items-center justify-between text-[11px] text-slate-500">
              <span>{t('demoData')}: Simulated performance based on real conversion benchmarks.</span>
              <span className="font-mono">Updated: Just now</span>
            </div>
          </div>
        </div>

        {/* Side Column: Quick Actions & Recent AI Activity */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-900 space-y-3">
            <h3 className="text-sm font-bold text-white">Quick Creative Tools</h3>
            <p className="text-xs text-slate-400">Launch direct-to-action AI modules</p>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => setActiveDashboardTab('create_ad')}
                className="w-full p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800/80 border border-neutral-800 text-left transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    <PlusCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Ad Builder</p>
                    <p className="text-[10px] text-slate-400">Multi-format campaign copy</p>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => setActiveDashboardTab('ad_analysis')}
                className="w-full p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800/80 border border-neutral-800 text-left transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    <FileSearch className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Ad Analysis</p>
                    <p className="text-[10px] text-slate-400">Score & improve headlines</p>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => setActiveDashboardTab('ad_issue_analyzer')}
                className="w-full p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800/80 border border-neutral-800 text-left transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Rejection Resolver</p>
                    <p className="text-[10px] text-slate-400">Repair disapproved ads</p>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Recent Saved Advertisements Card */}
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-900 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Recent Ads</h3>
              <button
                onClick={() => setActiveDashboardTab('my_ads')}
                className="text-[11px] text-blue-400 hover:underline cursor-pointer"
              >
                View all ({savedAds.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {savedAds.slice(0, 3).map((ad) => (
                <div
                  key={ad.id}
                  className="p-2.5 rounded-xl bg-neutral-900/50 border border-neutral-800/80 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono uppercase text-blue-400">{ad.input.platform}</span>
                    <span>{new Date(ad.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="font-semibold text-slate-200 line-clamp-1">{ad.headline}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{ad.primaryText}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
