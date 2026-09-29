import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../i18n/languages';
import {
  ShieldAlert,
  Users,
  Layers,
  Megaphone,
  CreditCard,
  Bot,
  Activity,
  CheckCircle,
  AlertCircle,
  Search,
} from 'lucide-react';

export const AdminPanelTab: React.FC = () => {
  const { savedAds, campaigns, aiUsageCount, formatCurrency, currentCurrency } = useApp();

  const [activeAdminSubtab, setActiveAdminSubtab] = useState<'users' | 'ads' | 'ai' | 'finance'>('users');

  const demoUsers = [
    { id: 'usr_01', name: 'Alex Vance', email: 'alex@globalbrands.io', plan: 'pro', status: 'active', ads: 12, spend: 3400 },
    { id: 'usr_02', name: 'Sophia Chen', email: 'sophia@orientex.cn', plan: 'business', status: 'active', ads: 28, spend: 8900 },
    { id: 'usr_03', name: 'Dawit Bekele', email: 'dawit@addiscoffee.et', plan: 'pro', status: 'active', ads: 9, spend: 1850 },
    { id: 'usr_04', name: 'Rashid Al-Maktoum', email: 'rashid@gulflogistics.ae', plan: 'business', status: 'active', ads: 41, spend: 14200 },
    { id: 'usr_05', name: 'Elena Rostova', email: 'elena@novatech.eu', plan: 'free', status: 'active', ads: 4, spend: 250 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Root Administration Console</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Platform Governance</h1>
          <p className="text-xs text-slate-400 mt-1">
            Superuser monitoring for tenant accounts, copy generation quotas, payment ledgers, and network health.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
            System Status: 100% Operational
          </span>
        </div>
      </div>

      {/* Admin KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-neutral-950 border border-neutral-900 rounded-2xl">
          <p className="text-[11px] text-slate-400">Total Registered Tenants</p>
          <p className="text-2xl font-bold font-mono text-white tabular-nums">1,428</p>
          <p className="text-[10px] text-emerald-400 font-mono mt-1">+34 this week</p>
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-900 rounded-2xl">
          <p className="text-[11px] text-slate-400">Total Advertisements Created</p>
          <p className="text-2xl font-bold font-mono text-white tabular-nums">18,940</p>
          <p className="text-[10px] text-blue-400 font-mono mt-1">Across 25 languages</p>
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-900 rounded-2xl">
          <p className="text-[11px] text-slate-400">Monthly Processed Ad Spend</p>
          <p className="text-2xl font-bold font-mono text-white tabular-nums">{formatCurrency(148200)}</p>
          <p className="text-[10px] text-slate-500 font-mono mt-1">Stripe & Chapa gateways</p>
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-900 rounded-2xl">
          <p className="text-[11px] text-slate-400">Total AI Tokens Dispatched</p>
          <p className="text-2xl font-bold font-mono text-white tabular-nums">42.8M</p>
          <p className="text-[10px] text-emerald-400 font-mono mt-1">Latency: 240ms avg</p>
        </div>
      </div>

      {/* Subtab Navigation (Interactive Segmented Control) */}
      <div className="flex items-center gap-1.5 p-1 bg-neutral-950 border border-neutral-900 rounded-xl w-fit text-xs">
        <button
          onClick={() => setActiveAdminSubtab('users')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeAdminSubtab === 'users' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
          }`}
        >
          User Management
        </button>
        <button
          onClick={() => setActiveAdminSubtab('ads')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeAdminSubtab === 'ads' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
          }`}
        >
          Ad Copy & Campaigns
        </button>
        <button
          onClick={() => setActiveAdminSubtab('ai')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeAdminSubtab === 'ai' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
          }`}
        >
          AI Usage & Quotas
        </button>
        <button
          onClick={() => setActiveAdminSubtab('finance')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeAdminSubtab === 'finance' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
          }`}
        >
          Payment Ledger
        </button>
      </div>

      {/* View 1: User Management */}
      {activeAdminSubtab === 'users' && (
        <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-neutral-900 flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Tenant Directory</h3>
            <span className="text-[11px] text-slate-500 font-mono">Showing 5 of 1,428</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-900 bg-neutral-900/40 text-slate-400">
                  <th className="py-3 px-4 font-medium">Tenant</th>
                  <th className="py-3 px-4 font-medium">Tier Plan</th>
                  <th className="py-3 px-4 font-medium text-right">Ads Generated</th>
                  <th className="py-3 px-4 font-medium text-right">Total Spend ({currentCurrency})</th>
                  <th className="py-3 px-4 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {demoUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-neutral-900/30">
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-white">{u.name}</p>
                      <p className="text-[11px] text-slate-400">{u.email}</p>
                    </td>
                    <td className="py-3.5 px-4 font-mono uppercase text-blue-400 font-medium">
                      {u.plan}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-200">
                      {u.ads}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-200">
                      {formatCurrency(u.spend)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        ACTIVE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 2: Ad Copy & Campaigns */}
      {activeAdminSubtab === 'ads' && (
        <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-6 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white">Global Creative Moderation</h3>
          <p className="text-slate-400">
            Real-time feed of newly synthesized advertisements passing automated policy validation.
          </p>

          <div className="space-y-3 pt-2">
            {savedAds.map((ad) => (
              <div key={ad.id} className="p-3.5 bg-neutral-900/50 border border-neutral-800 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono text-blue-400 uppercase">{ad.input.platform}</span>
                  <span className="text-emerald-400 font-mono">Passed Automated Policy Gate</span>
                </div>
                <p className="font-semibold text-white">{ad.headline}</p>
                <p className="text-slate-400 line-clamp-1">{ad.primaryText}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 3: AI Quotas */}
      {activeAdminSubtab === 'ai' && (
        <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white">LLM Provider & Rate Limit Governance</h3>
          <p className="text-slate-400">
            Server-side Gemini API endpoints monitored with exponential backoff and localized cache hits.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-1">
              <span className="text-[11px] text-slate-400">Active Model</span>
              <p className="text-base font-bold text-white font-mono">gemini-2.5-flash</p>
            </div>
            <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-1">
              <span className="text-[11px] text-slate-400">Avg Prompt Response Time</span>
              <p className="text-base font-bold text-emerald-400 font-mono">310ms</p>
            </div>
            <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-1">
              <span className="text-[11px] text-slate-400">Content Moderation Score</span>
              <p className="text-base font-bold text-blue-400 font-mono">99.98% Safe</p>
            </div>
          </div>
        </div>
      )}

      {/* View 4: Finance */}
      {activeAdminSubtab === 'finance' && (
        <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white">Consolidated Settlement Balance</h3>
          <p className="text-slate-400">
            Cross-currency multi-entity ledger for international ad spend distributions.
          </p>

          <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-slate-400">Net Escrow Balance</p>
              <p className="text-2xl font-bold font-mono text-white mt-1">{formatCurrency(482500)}</p>
            </div>
            <span className="text-emerald-400 text-xs font-mono font-semibold">Verified Reserve 1:1</span>
          </div>
        </div>
      )}

    </div>
  );
};
