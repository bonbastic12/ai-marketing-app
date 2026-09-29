import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart2,
  TrendingUp,
  Download,
  Calendar,
  Layers,
  ArrowUpRight,
  Filter,
} from 'lucide-react';

export const AnalyticsTab: React.FC = () => {
  const { campaigns, formatCurrency, currentCurrency, t } = useApp();
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | 'ytd'>('30d');

  // Aggregated totals
  const totalImpressions = campaigns.reduce((acc, c) => acc + c.impressions, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
  const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0);
  const totalSpend = campaigns.reduce((acc, c) => acc + c.spend, 0);
  const totalRevenue = campaigns.reduce((acc, c) => acc + c.revenue, 0);
  const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '3.45';
  const avgConversionRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : '8.6';
  const overallROI = totalSpend > 0 ? Math.round(((totalRevenue - totalSpend) / totalSpend) * 100) : 310;

  // Monthly trends for visual bar graph
  const trendData = [
    { label: 'May', spend: 850, revenue: 2600, conversions: 180 },
    { label: 'Jun', spend: 1200, revenue: 4100, conversions: 290 },
    { label: 'Jul', spend: 1600, revenue: 5800, conversions: 420 },
    { label: 'Aug', spend: 2100, revenue: 7900, conversions: 580 },
    { label: 'Sep', spend: 2450, revenue: 10400, conversions: 740 },
  ];

  const maxRevenue = Math.max(...trendData.map((d) => d.revenue));

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Campaign,Platform,Spend,Revenue,Impressions,Clicks,Conversions,CTR,ROI\n' +
      campaigns
        .map(
          (c) =>
            `"${c.name}",${c.platform},${c.spend},${c.revenue},${c.impressions},${c.clicks},${c.conversions},${c.ctr}%,${c.roi}%`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'digital_product_campaign_analytics.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-blue-400">Campaign Intelligence</span>
            <span className="text-[10px] font-mono font-bold bg-amber-500/15 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded">
              {t('demoData')}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Performance Analytics</h1>
          <p className="text-xs text-slate-400 mt-1">
            Audience acquisition funnels, cost per conversion, and international return on ad spend.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setTimeframe('7d')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                timeframe === '7d' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              7D
            </button>
            <button
              onClick={() => setTimeframe('30d')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                timeframe === '30d' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              30D
            </button>
            <button
              onClick={() => setTimeframe('ytd')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                timeframe === 'ytd' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              YTD
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-neutral-950 border border-neutral-800 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 bg-neutral-950 border border-neutral-900 rounded-2xl">
          <p className="text-xs text-slate-400 mb-1">{t('impressions')}</p>
          <p className="text-2xl font-bold font-mono text-white tabular-nums">
            {new Intl.NumberFormat().format(totalImpressions)}
          </p>
          <p className="text-[11px] text-emerald-400 font-mono mt-2">+18.4% vs last period</p>
        </div>

        <div className="p-5 bg-neutral-950 border border-neutral-900 rounded-2xl">
          <p className="text-xs text-slate-400 mb-1">{t('clicks')} & {t('ctr')}</p>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold font-mono text-white tabular-nums">
              {new Intl.NumberFormat().format(totalClicks)}
            </p>
            <span className="text-xs font-mono text-blue-400 font-semibold">{avgCTR}% CTR</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Avg. CPC: {formatCurrency(0.48)}</p>
        </div>

        <div className="p-5 bg-neutral-950 border border-neutral-900 rounded-2xl">
          <p className="text-xs text-slate-400 mb-1">{t('conversions')} & CVR</p>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold font-mono text-white tabular-nums">
              {new Intl.NumberFormat().format(totalConversions)}
            </p>
            <span className="text-xs font-mono text-emerald-400 font-semibold">{avgConversionRate}% CVR</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Cost per Lead: {formatCurrency(5.2)}</p>
        </div>

        <div className="p-5 bg-neutral-950 border border-neutral-900 rounded-2xl">
          <p className="text-xs text-slate-400 mb-1">{t('revenue')} & {t('roi')}</p>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
              {formatCurrency(totalRevenue)}
            </p>
            <span className="text-xs font-mono text-emerald-400 font-semibold">+{overallROI}% ROI</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Total Spend: {formatCurrency(totalSpend)}</p>
        </div>

      </div>

      {/* Main Bar Chart: Revenue vs Spend Comparison */}
      <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Monthly Ad Spend vs. Attributed Revenue</h3>
            <p className="text-xs text-slate-400">Currency normalized in {currentCurrency}</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-blue-600 inline-block" />
              <span className="text-slate-300">Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-neutral-700 inline-block" />
              <span className="text-slate-400">Ad Spend</span>
            </div>
          </div>
        </div>

        {/* Visual Bar Graph */}
        <div className="h-64 flex items-end justify-between gap-4 pt-4 border-b border-neutral-800">
          {trendData.map((d, i) => {
            const revenueHeight = (d.revenue / maxRevenue) * 100;
            const spendHeight = (d.spend / maxRevenue) * 100;

            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full max-w-[64px] flex items-end justify-center gap-1.5 h-full">
                  {/* Spend bar */}
                  <div
                    style={{ height: `${spendHeight}%` }}
                    className="w-1/2 bg-neutral-700 hover:bg-neutral-600 rounded-t transition-all relative group-hover:opacity-90"
                    title={`Spend: ${formatCurrency(d.spend)}`}
                  />
                  {/* Revenue bar */}
                  <div
                    style={{ height: `${revenueHeight}%` }}
                    className="w-1/2 bg-blue-600 hover:bg-blue-500 rounded-t transition-all relative glow-blue"
                    title={`Revenue: ${formatCurrency(d.revenue)}`}
                  />
                </div>
                <span className="text-[11px] font-mono text-slate-400">{d.label}</span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Attribution Model: 7-Day Click / 1-Day View</span>
          <span>Verified Conversion Margin: 68.2%</span>
        </div>
      </div>

      {/* Conversion Funnel Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Top Performing Platforms
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-neutral-900">
              <span className="text-slate-200">Google Ads (Search Intent)</span>
              <span className="font-mono text-emerald-400 font-semibold">4.8x ROAS</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-neutral-900">
              <span className="text-slate-200">Instagram Feed & Stories</span>
              <span className="font-mono text-emerald-400 font-semibold">3.7x ROAS</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-neutral-900">
              <span className="text-slate-200">TikTok Short Video Ads</span>
              <span className="font-mono text-emerald-400 font-semibold">3.1x ROAS</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-200">Telegram Direct Broadcast</span>
              <span className="font-mono text-emerald-400 font-semibold">2.9x ROAS</span>
            </div>
          </div>
        </div>

        <div className="p-5 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Audience Geos
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-neutral-900">
              <span className="text-slate-200">North America (US & CA)</span>
              <span className="font-mono text-slate-300">42% of Sales</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-neutral-900">
              <span className="text-slate-200">Gulf Region (UAE, SA)</span>
              <span className="font-mono text-slate-300">28% of Sales</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-neutral-900">
              <span className="text-slate-200">European Union</span>
              <span className="font-mono text-slate-300">19% of Sales</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-200">East Africa (ET & KE)</span>
              <span className="font-mono text-slate-300">11% of Sales</span>
            </div>
          </div>
        </div>

        <div className="p-5 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Creative Copy Resonance
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-neutral-900">
              <span className="text-slate-200">Direct Response Hooks</span>
              <span className="font-mono text-blue-400">4.12% CTR</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-neutral-900">
              <span className="text-slate-200">Origin Storytelling</span>
              <span className="font-mono text-blue-400">3.68% CTR</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-neutral-900">
              <span className="text-slate-200">Urgency Scarcity</span>
              <span className="font-mono text-blue-400">3.41% CTR</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-200">Minimalist Statement</span>
              <span className="font-mono text-blue-400">2.95% CTR</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
