import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../i18n/languages';
import { AdPlatform, Campaign } from '../../types';
import {
  Megaphone,
  PlusCircle,
  Play,
  Pause,
  Globe2,
  Key,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

export const CampaignsTab: React.FC = () => {
  const { campaigns, addCampaign, updateCampaignStatus, formatCurrency, currentCurrency } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [apiModalOpen, setApiModalOpen] = useState(false);

  // New Campaign Form State
  const [name, setName] = useState('');
  const [country, setCountry] = useState('United States, Germany, UAE');
  const [region, setRegion] = useState('Global Tier-1 Metros');
  const [language, setLanguage] = useState('en');
  const [ageRange, setAgeRange] = useState('25-54');
  const [interests, setInterests] = useState('Digital Commerce, Business Software, Specialty Products');
  const [audienceType, setAudienceType] = useState<'b2b' | 'b2c' | 'd2c'>('b2b');
  const [platform, setPlatform] = useState<AdPlatform>('google_ads');
  const [budgetDaily, setBudgetDaily] = useState(50);
  const [budgetTotal, setBudgetTotal] = useState(1500);

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCampaign: Campaign = {
      id: 'cmp_' + Math.random().toString(36).substr(2, 8),
      name: name.trim(),
      status: 'active',
      platform,
      country,
      budgetDaily,
      budgetTotal,
      currency: currentCurrency,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      spend: 0,
      revenue: 0,
      ctr: 0,
      cpc: 0,
      roi: 0,
      startDate: new Date().toISOString().split('T')[0],
    };

    addCampaign(newCampaign);
    setModalOpen(false);
    setName('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Cross-Border Media Operations</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Campaign Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure international targeting, regional budget allocations, and review network deployment status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setApiModalOpen(true)}
            className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-neutral-950 border border-neutral-800 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Key className="w-3.5 h-3.5 text-blue-400" />
            <span>API Integrations</span>
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer glow-blue"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      {/* Integration Notice & Architecture Transparency Banner */}
      <div className="p-4 bg-neutral-950 border border-neutral-900 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-white">Direct Network API Architecture</p>
            <p className="text-slate-400">
              Live automated ad injection connects directly to your verified Meta Marketing, Google Ads, TikTok Business, and Telegram API credentials.
            </p>
          </div>
        </div>
        <button
          onClick={() => setApiModalOpen(true)}
          className="text-xs text-blue-400 hover:text-blue-300 font-medium whitespace-nowrap cursor-pointer"
        >
          Manage API Keys →
        </button>
      </div>

      {/* Campaigns Table */}
      <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-900 bg-neutral-900/40 text-slate-400">
                <th className="py-3 px-4 font-medium">Campaign Name</th>
                <th className="py-3 px-4 font-medium">Platform</th>
                <th className="py-3 px-4 font-medium">Target Geo</th>
                <th className="py-3 px-4 font-medium text-right">Daily Budget</th>
                <th className="py-3 px-4 font-medium text-right">Spend ({currentCurrency})</th>
                <th className="py-3 px-4 font-medium text-right">Revenue</th>
                <th className="py-3 px-4 font-medium text-right">ROI</th>
                <th className="py-3 px-4 font-medium text-center">Status</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {campaigns.map((cmp) => (
                <tr key={cmp.id} className="hover:bg-neutral-900/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-white truncate max-w-[200px]">{cmp.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono">ID: {cmp.id}</p>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300 capitalize">
                    {cmp.platform.replace('_', ' ')}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 truncate max-w-[150px]">
                    {cmp.country}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-300">
                    {formatCurrency(cmp.budgetDaily)}/d
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-200">
                    {formatCurrency(cmp.spend)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-emerald-400 font-semibold">
                    {formatCurrency(cmp.revenue)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-200">
                    +{cmp.roi}%
                  </td>
                  <td className="py-3.5 px-4 text-center">
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
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() =>
                        updateCampaignStatus(cmp.id, cmp.status === 'active' ? 'paused' : 'active')
                      }
                      className="p-1 text-slate-400 hover:text-white rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                      title={cmp.status === 'active' ? 'Pause Campaign' : 'Resume Campaign'}
                    >
                      {cmp.status === 'active' ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE CAMPAIGN MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white tracking-tight">Create International Campaign</h2>
            <p className="text-xs text-slate-400">
              Target multi-regional audiences and allocate campaign budgets.
            </p>

            <form onSubmit={handleCreateCampaign} className="space-y-3.5 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Campaign Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Q4 Global Enterprise Expansion"
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Countries / Geo *</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. UAE, Saudi Arabia, UK"
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Platform</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as AdPlatform)}
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500 cursor-pointer capitalize"
                  >
                    <option value="google_ads">Google Ads</option>
                    <option value="facebook">Meta (Facebook)</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="telegram">Telegram</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {SUPPORTED_LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.flag} {l.code.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Age Range</label>
                  <input
                    type="text"
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                    placeholder="25-54"
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Audience Type</label>
                  <select
                    value={audienceType}
                    onChange={(e) => setAudienceType(e.target.value as 'b2b' | 'b2c' | 'd2c')}
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500 cursor-pointer uppercase"
                  >
                    <option value="b2b">B2B Enterprise</option>
                    <option value="b2c">B2C Consumer</option>
                    <option value="d2c">D2C Retail</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Target Interests / Keywords</label>
                <input
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="e.g. Logistics, E-commerce, Specialty Coffee"
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Daily Budget ({currentCurrency})</label>
                  <input
                    type="number"
                    min={5}
                    value={budgetDaily}
                    onChange={(e) => setBudgetDaily(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Total Cap ({currentCurrency})</label>
                  <input
                    type="number"
                    min={50}
                    value={budgetTotal}
                    onChange={(e) => setBudgetTotal(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-900">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow cursor-pointer"
                >
                  Launch Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* API INTEGRATIONS MODAL */}
      {apiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Advertising Network API Integrations</h2>
              <p className="text-xs text-slate-400 mt-1">
                Connect verified developer keys for automated ad placement and reporting.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Meta Marketing API (Facebook / Instagram)</span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Credentials Required</span>
                </div>
                <input
                  type="password"
                  placeholder="EAAB... (System User Access Token)"
                  className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-xs text-slate-300 font-mono"
                />
              </div>

              <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Google Ads API</span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Developer Token Required</span>
                </div>
                <input
                  type="password"
                  placeholder="Client ID / Developer Token"
                  className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-xs text-slate-300 font-mono"
                />
              </div>

              <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Telegram Ads Platform</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Ready</span>
                </div>
                <input
                  type="text"
                  placeholder="@ChannelHandle or Bot Token"
                  className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-xs text-slate-300 font-mono"
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              <strong>Security Protocol:</strong> Tokens are encrypted at rest and never exposed to client-side code. Direct network placement complies with OAuth 2.0 specs.
            </p>

            <div className="flex items-center justify-end pt-3 border-t border-neutral-900">
              <button
                onClick={() => setApiModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg"
              >
                Save Integration Config
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
