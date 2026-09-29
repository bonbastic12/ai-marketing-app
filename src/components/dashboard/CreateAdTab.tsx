import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { aiService } from '../../services/aiService';
import { SUPPORTED_LANGUAGES } from '../../i18n/languages';
import { SUPPORTED_CURRENCIES } from '../../services/currency';
import {
  AdBuilderInput,
  AdCampaignGoal,
  AdPlatform,
  AdStyle,
  GeneratedAd,
  SupportedLanguageCode,
} from '../../types';
import {
  Sparkles,
  Copy,
  Check,
  BookmarkPlus,
  RefreshCw,
  Sliders,
  Send,
  Globe,
  Share2,
  CheckCircle,
  Eye,
} from 'lucide-react';

export const CreateAdTab: React.FC = () => {
  const { currentLanguage, currentCurrency, saveAd, incrementAiUsage, formatRawCurrency, t } = useApp();

  // Form State
  const [productName, setProductName] = useState('Enterprise Cloud ERP');
  const [businessName, setBusinessName] = useState('Apex Systems Global');
  const [targetAudience, setTargetAudience] = useState('CTOs, VPs of Finance & Scaling Mid-Market Ops');
  const [country, setCountry] = useState('North America & Gulf Region (UAE, Saudi Arabia)');
  const [platform, setPlatform] = useState<AdPlatform>('instagram');
  const [goal, setGoal] = useState<AdCampaignGoal>('conversions');
  const [budget, setBudget] = useState(1200);
  const [style, setStyle] = useState<AdStyle>('direct_response');
  const [language, setLanguage] = useState<SupportedLanguageCode>(currentLanguage);

  // Generation state
  const [generating, setGenerating] = useState(false);
  const [generatedAd, setGeneratedAd] = useState<GeneratedAd | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [savedNotification, setSavedNotification] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setSavedNotification(false);

    const input: AdBuilderInput = {
      productName,
      businessName,
      targetAudience,
      country,
      platform,
      goal,
      budget,
      currency: currentCurrency,
      style,
      language,
    };

    const ad = await aiService.generateAdvertisement(input);
    setGeneratedAd(ad);
    setGenerating(false);
    incrementAiUsage();
  };

  const handleCopyText = (key: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveToMyAds = () => {
    if (generatedAd) {
      saveAd(generatedAd);
      setSavedNotification(true);
      setTimeout(() => setSavedNotification(false), 3000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Autonomous Advertisement Builder</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Create International Advertisements
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Generate multi-format campaign copy optimized for conversion rates across any target country and platform.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Parameters (5 Cols) */}
        <div className="lg:col-span-5 bg-neutral-950 border border-neutral-900 rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleGenerate} className="space-y-4">
            
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Product or Service *
              </label>
              <input
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Specialty Yirgacheffe Coffee or Cloud Accounting"
                className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Business / Brand Name *
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Addis Roast & Export"
                className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Target Audience *
              </label>
              <input
                type="text"
                required
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Roastery Owners, Cafes, Specialty Coffee Lovers"
                className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Country / Region *
                </label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. UAE, Europe, USA"
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Language (25 Available)
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as SupportedLanguageCode)}
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                >
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.flag} {l.nativeName} ({l.code.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Advertising Platform *
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as AdPlatform)}
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer capitalize"
                >
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                  <option value="telegram">Telegram</option>
                  <option value="google_ads">Google Ads</option>
                  <option value="websites">Websites / Display</option>
                  <option value="other">Other Internet Channels</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Campaign Goal *
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as AdCampaignGoal)}
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer capitalize"
                >
                  <option value="conversions">Conversions / Purchases</option>
                  <option value="sales">E-Commerce Sales</option>
                  <option value="lead_generation">Lead Generation</option>
                  <option value="traffic">Website Traffic</option>
                  <option value="brand_awareness">Brand Awareness</option>
                  <option value="app_installs">Mobile App Installs</option>
                  <option value="video_views">Video Views</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Ad Copy Style *
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value as AdStyle)}
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                >
                  <option value="direct_response">Direct Response (High ROI)</option>
                  <option value="storytelling">Storytelling & Origin</option>
                  <option value="minimalist_luxury">Minimalist & Luxury</option>
                  <option value="urgency_scarcity">Urgency & Limited Spots</option>
                  <option value="educational">Educational Breakdown</option>
                  <option value="humorous">Engaging & Humorous</option>
                  <option value="bold_disruptive">Bold & Disruptive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Budget ({currentCurrency})
                </label>
                <input
                  type="number"
                  min={10}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={generating}
              className="w-full mt-4 py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 glow-blue"
            >
              {generating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-white" />
                  <span>Synthesizing Ad Packages...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Generate Advertisement Copy</span>
                </>
              )}
            </button>

          </form>
        </div>

        {/* Right Preview & Generated Copy (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {generatedAd ? (
            <div className="space-y-6">
              
              {/* Actions Bar */}
              <div className="flex items-center justify-between p-4 bg-neutral-950 border border-neutral-900 rounded-2xl">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Generated Ad Package
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Platform: <span className="text-blue-400 uppercase font-mono">{generatedAd.input.platform}</span> · Language: <span className="font-mono text-white">{generatedAd.input.language.toUpperCase()}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveToMyAds}
                    className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <BookmarkPlus className="w-3.5 h-3.5 text-blue-400" />
                    <span>{savedNotification ? 'Saved to My Ads!' : 'Save to My Ads'}</span>
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="p-1.5 text-slate-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                    title="Regenerate"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Copy Fields Grid */}
              <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-4">
                
                {/* Headline */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-semibold uppercase tracking-wider text-slate-300">Headline</span>
                    <button
                      onClick={() => handleCopyText('headline', generatedAd.headline)}
                      className="text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'headline' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'headline' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-bold text-white">
                    {generatedAd.headline}
                  </div>
                </div>

                {/* Primary Text */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-semibold uppercase tracking-wider text-slate-300">Primary Text</span>
                    <button
                      onClick={() => handleCopyText('primaryText', generatedAd.primaryText)}
                      className="text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'primaryText' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'primaryText' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {generatedAd.primaryText}
                  </div>
                </div>

                {/* Description & CTA Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span className="font-semibold uppercase tracking-wider text-slate-300">Description</span>
                      <button
                        onClick={() => handleCopyText('desc', generatedAd.description)}
                        className="text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'desc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </div>
                    <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-slate-300">
                      {generatedAd.description}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span className="font-semibold uppercase tracking-wider text-slate-300">Call to Action (CTA)</span>
                      <button
                        onClick={() => handleCopyText('cta', generatedAd.ctaText)}
                        className="text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'cta' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </div>
                    <div className="p-3 bg-blue-950/40 border border-blue-900/40 rounded-xl text-xs font-semibold text-blue-300">
                      {generatedAd.ctaText}
                    </div>
                  </div>
                </div>

                {/* Social Media & Short Variants Accordion */}
                <div className="pt-2 border-t border-neutral-900 space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span className="font-semibold uppercase tracking-wider text-slate-300">
                        Social Media Version ({generatedAd.input.platform})
                      </span>
                      <button
                        onClick={() => handleCopyText('social', generatedAd.socialMediaVersion)}
                        className="text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'social' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </div>
                    <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-xl text-xs font-mono text-slate-300 whitespace-pre-wrap">
                      {generatedAd.socialMediaVersion}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span className="font-semibold uppercase tracking-wider text-slate-300">Short Version (SMS/Push)</span>
                      <button
                        onClick={() => handleCopyText('short', generatedAd.shortVersion)}
                        className="text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'short' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </div>
                    <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-xl text-xs text-slate-300">
                      {generatedAd.shortVersion}
                    </div>
                  </div>
                </div>

                {/* Audience Strategy Insight */}
                <div className="p-3.5 bg-blue-950/20 border border-blue-900/30 rounded-xl text-xs text-blue-200">
                  <p className="font-semibold text-blue-400 mb-0.5">Audience & Placement Recommendation:</p>
                  <p className="text-slate-300">{generatedAd.audienceInsights}</p>
                </div>

              </div>

            </div>
          ) : (
            /* Empty State */
            <div className="p-12 bg-neutral-950 border border-neutral-900 rounded-2xl text-center space-y-4 flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-slate-400">
                <Sliders className="w-6 h-6 text-blue-400" />
              </div>
              <div className="max-w-sm">
                <h3 className="text-base font-bold text-white mb-1">Ready to Build Advertisements</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fill in your target product, region, and network on the left, then click Generate to craft optimized ad copy, headlines, and platform previews.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
