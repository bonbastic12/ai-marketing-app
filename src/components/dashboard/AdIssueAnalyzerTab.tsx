import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { aiService } from '../../services/aiService';
import { AdPlatform, AdRejectionAnalysis, AdRejectionInput } from '../../types';
import {
  AlertTriangle,
  Shield,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  Info,
} from 'lucide-react';

export const AdIssueAnalyzerTab: React.FC = () => {
  const { incrementAiUsage } = useApp();

  const [rejectionMessage, setRejectionMessage] = useState(
    'Disapproved: Misleading Claims. Your ad makes unrealistic or unverified promises regarding financial or business returns.'
  );
  const [adText, setAdText] = useState(
    '100% Guaranteed: Make $15,000 every month working from your laptop with our automated system. Zero risk, instant setup.'
  );
  const [platform, setPlatform] = useState<AdPlatform>('facebook');
  const [campaignInfo, setCampaignInfo] = useState('Traffic campaign targeting users interested in remote business');

  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AdRejectionAnalysis | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleAnalyzeIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);

    const input: AdRejectionInput = {
      rejectionMessage,
      adText,
      platform,
      campaignInfo,
    };

    const res = await aiService.analyzeAdIssue(input);
    setResult(res);
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
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-1">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Policy Compliance Diagnostic Console</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Ad Issue & Rejection Analyzer
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Decode platform rejection notices from Meta, Google, TikTok, or Telegram, and receive compliant, rewritten advertising copy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form (5 Cols) */}
        <div className="lg:col-span-5 bg-neutral-950 border border-neutral-900 rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleAnalyzeIssue} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Platform Rejection Message *
              </label>
              <textarea
                required
                rows={3}
                value={rejectionMessage}
                onChange={(e) => setRejectionMessage(e.target.value)}
                placeholder="Paste the rejection email or ad manager error notice here..."
                className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Rejected Advertisement Copy *
              </label>
              <textarea
                required
                rows={5}
                value={adText}
                onChange={(e) => setAdText(e.target.value)}
                placeholder="Paste the headline and ad text that was disapproved..."
                className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as AdPlatform)}
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-500 transition-colors cursor-pointer capitalize"
                >
                  <option value="facebook">Meta (Facebook)</option>
                  <option value="instagram">Instagram</option>
                  <option value="google_ads">Google Ads</option>
                  <option value="tiktok">TikTok Ads</option>
                  <option value="telegram">Telegram Ads</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Campaign Category
                </label>
                <input
                  type="text"
                  value={campaignInfo}
                  onChange={(e) => setCampaignInfo(e.target.value)}
                  placeholder="e.g. Lead Generation, E-commerce"
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={analyzing}
              className="w-full mt-3 py-3 px-4 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-white" />
                  <span>Cross-Referencing Advertising Policies...</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-white" />
                  <span>Diagnose Rejection & Propose Fix</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Output Area (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6">
              
              {/* Diagnosis Header */}
              <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                    <Shield className="w-4 h-4" />
                    <span>Policy Category: {result.policyCategory}</span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    High Risk Violation
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">Root Cause Analysis</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{result.possibleReason}</p>
                </div>
              </div>

              {/* What Must Be Changed */}
              <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Required Modifications</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {result.whatShouldBeChanged.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold shrink-0">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Corrected Version */}
              <div className="p-6 bg-gradient-to-br from-blue-950/40 via-neutral-950 to-neutral-950 border border-blue-900/40 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      Recommended Compliant Version
                    </h4>
                  </div>
                  <button
                    onClick={() =>
                      handleCopy(
                        'corrected',
                        `${result.recommendedCorrectedVersion.headline}\n\n${result.recommendedCorrectedVersion.primaryText}\n\nCTA: ${result.recommendedCorrectedVersion.cta}`
                      )
                    }
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer font-medium"
                  >
                    {copiedKey === 'corrected' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'corrected' ? 'Copied' : 'Copy Corrected Ad'}</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400">Headline:</span>
                    <p className="font-bold text-white mt-0.5">{result.recommendedCorrectedVersion.headline}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400">Primary Copy:</span>
                    <p className="text-slate-200 mt-0.5 leading-relaxed">
                      {result.recommendedCorrectedVersion.primaryText}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400">Compliant CTA:</span>
                    <p className="font-semibold text-blue-400 mt-0.5">{result.recommendedCorrectedVersion.cta}</p>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Suggestions */}
              <div className="p-5 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Step-by-Step Approval Protocol
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300">
                  {result.stepByStepSuggestions.map((st, idx) => (
                    <li key={idx}>{st}</li>
                  ))}
                </ol>
              </div>

              {/* Mandatory Policy Disclaimer (Anti-Hallucination & Legal Rigor) */}
              <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl flex items-start gap-2.5 text-[11px] text-slate-400 leading-relaxed">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-300">Compliance Disclaimer:</strong> {result.disclaimer}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 bg-neutral-950 border border-neutral-900 rounded-2xl text-center space-y-4 flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-slate-400">
                <AlertTriangle className="w-6 h-6 text-rose-400" />
              </div>
              <div className="max-w-sm">
                <h3 className="text-base font-bold text-white mb-1">Diagnose Disapproved Ads</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Paste the network notice and copy on the left to uncover why your ad was flagged and receive a compliant, rewrite-ready version.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
