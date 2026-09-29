import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { aiService } from '../../services/aiService';
import { AdAnalysisInput, AdAnalysisResult, AdPlatform } from '../../types';
import {
  FileSearch,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  Copy,
  Check,
  Zap,
} from 'lucide-react';

export const AnalyzeAdTab: React.FC = () => {
  const { incrementAiUsage } = useApp();

  const [headline, setHeadline] = useState('Scale Your Results With CloudERP — Trusted Globally');
  const [adText, setAdText] = useState(
    'Stop wasting budget on broken legacy systems. CloudERP gives your operations real-time multi-currency accounting and verified automation. Try it today and save 40% on overhead.'
  );
  const [cta, setCta] = useState('Get Started Now');
  const [platform, setPlatform] = useState<AdPlatform>('facebook');
  const [targetAudience, setTargetAudience] = useState('Founders, CTOs and CFOs of growing companies');

  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AdAnalysisResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);

    const input: AdAnalysisInput = {
      headline,
      adText,
      cta,
      platform,
      targetAudience,
    };

    const res = await aiService.analyzeAdvertisement(input);
    setAnalysisResult(res);
    setAnalyzing(false);
    incrementAiUsage();
  };

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
          <FileSearch className="w-3.5 h-3.5" />
          <span>Objective Copy Diagnostics</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Advertisement Analysis & Optimization
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Paste your headline and ad copy to evaluate conversion potential, clarity, platform relevance, and receive AI improvements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Form (5 Cols) */}
        <div className="lg:col-span-5 bg-neutral-950 border border-neutral-900 rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Headline
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Enter current headline"
                className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Primary Ad Text *
              </label>
              <textarea
                required
                rows={5}
                value={adText}
                onChange={(e) => setAdText(e.target.value)}
                placeholder="Paste the primary advertisement copy here..."
                className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Call to Action (CTA)
                </label>
                <input
                  type="text"
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  placeholder="e.g. Sign Up Now"
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as AdPlatform)}
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer capitalize"
                >
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="google_ads">Google Ads</option>
                  <option value="telegram">Telegram</option>
                  <option value="websites">Websites / Display</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Target Audience Context
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Enterprise decision makers, retail shoppers"
                className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={analyzing}
              className="w-full mt-3 py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 glow-blue"
            >
              {analyzing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-white" />
                  <span>Auditing Copy & Conversion Probabilities...</span>
                </>
              ) : (
                <>
                  <FileSearch className="w-4 h-4 text-white" />
                  <span>Analyze Advertisement Copy</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results View (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {analysisResult ? (
            <div className="space-y-6">
              
              {/* Overall Score Header */}
              <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-semibold mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Conversion Readability Index</span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Audit Score Breakdown
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Evaluated against top direct-response standards on {platform.toUpperCase()}.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center shadow-inner">
                    <span className="text-3xl font-extrabold font-mono text-white tabular-nums">
                      {analysisResult.overallScore}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">/ 100</span>
                  </div>
                </div>
              </div>

              {/* 8 Diagnostic Criteria Grid with Progress Bars */}
              <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Performance Dimensions
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(analysisResult.metrics).map(([key, val]) => (
                    <div key={key} className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">{val.label}</span>
                        <span className="font-mono tabular-nums text-blue-400 font-bold">{val.score}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-500"
                          style={{ width: `${val.score}%` }}
                        />
                      </div>
                      
                      <p className="text-[11px] text-slate-400 pt-0.5">{val.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Identified Strengths</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {analysisResult.strengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400">·</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Areas for Improvement</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {analysisResult.weaknesses.length > 0 ? (
                      analysisResult.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-400">·</span>
                          <span>{w}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-slate-400">No major weaknesses flagged.</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* AI-Generated Optimized Rewrite */}
              <div className="p-6 bg-gradient-to-br from-blue-950/40 via-neutral-950 to-neutral-950 border border-blue-900/40 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      AI Optimized Revision
                    </h4>
                  </div>
                  <button
                    onClick={() =>
                      handleCopy(
                        'rewrite',
                        `${analysisResult.rewrittenHeadline}\n\n${analysisResult.rewrittenPrimaryText}\n\nCTA: ${analysisResult.improvedCta}`
                      )
                    }
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer font-medium"
                  >
                    {copiedKey === 'rewrite' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'rewrite' ? 'Copied Revision' : 'Copy All'}</span>
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400">Improved Headline:</span>
                    <p className="font-bold text-white mt-0.5">{analysisResult.rewrittenHeadline}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400">Improved Primary Copy:</span>
                    <p className="text-slate-200 mt-0.5 leading-relaxed">{analysisResult.rewrittenPrimaryText}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400">Recommended CTA:</span>
                    <p className="font-semibold text-blue-400 mt-0.5">{analysisResult.improvedCta}</p>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 bg-neutral-950 border border-neutral-900 rounded-2xl text-center space-y-4 flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-slate-400">
                <FileSearch className="w-6 h-6 text-blue-400" />
              </div>
              <div className="max-w-sm">
                <h3 className="text-base font-bold text-white mb-1">Awaiting Advertisement Copy</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter your ad details on the left and run analysis to receive objective scores across 8 metrics and AI rewrite recommendations.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
