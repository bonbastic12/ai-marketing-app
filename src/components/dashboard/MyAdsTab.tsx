import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookmarkCheck, Copy, Check, Trash2, ExternalLink, Search, Filter } from 'lucide-react';

export const MyAdsTab: React.FC = () => {
  const { savedAds, deleteAd, setActiveDashboardTab, formatRawCurrency } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredAds = savedAds.filter((ad) => {
    const matchesSearch =
      ad.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.primaryText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.input.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || ad.input.platform === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Saved Advertisements</h1>
          <p className="text-xs text-slate-400 mt-1">
            Library of all AI-generated campaign copies, social variants, and targeting metadata.
          </p>
        </div>

        <button
          onClick={() => setActiveDashboardTab('create_ad')}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow transition-colors cursor-pointer"
        >
          + Build New Ad
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search saved advertisements by headline or keyword..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-950 border border-neutral-900 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
          className="w-full sm:w-48 px-3 py-2 text-xs bg-neutral-950 border border-neutral-900 rounded-xl text-slate-300 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer capitalize"
        >
          <option value="all">All Platforms</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
          <option value="google_ads">Google Ads</option>
          <option value="telegram">Telegram</option>
        </select>
      </div>

      {/* Grid of Ads */}
      {filteredAds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAds.map((ad) => (
            <div
              key={ad.id}
              className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl flex flex-col justify-between space-y-4 hover:border-neutral-800 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-blue-400 uppercase font-semibold">
                      {ad.input.platform.replace('_', ' ')}
                    </span>
                    <span>·</span>
                    <span className="text-[11px]">{ad.input.language.toUpperCase()}</span>
                  </div>
                  <span className="text-[11px] font-mono">
                    {new Date(ad.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{ad.headline}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3 line-clamp-3">
                  {ad.primaryText}
                </p>

                <div className="p-2.5 bg-neutral-900/60 rounded-xl border border-neutral-800/80 text-[11px] text-slate-400 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Target: {ad.input.targetAudience}</span>
                    <span className="text-blue-400 font-semibold">{ad.ctaText}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-900 flex items-center justify-between">
                <button
                  onClick={() =>
                    handleCopy(
                      ad.id,
                      `${ad.headline}\n\n${ad.primaryText}\n\nCTA: ${ad.ctaText}\n\nSocial:\n${ad.socialMediaVersion}`
                    )
                  }
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer font-medium"
                >
                  {copiedId === ad.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === ad.id ? 'Copied' : 'Copy Full Ad'}</span>
                </button>

                <button
                  onClick={() => deleteAd(ad.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Delete ad"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 bg-neutral-950 border border-neutral-900 rounded-2xl text-center space-y-3">
          <p className="text-sm font-semibold text-white">No advertisements found</p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or generate new advertisements with the Ad Builder.
          </p>
        </div>
      )}

    </div>
  );
};
