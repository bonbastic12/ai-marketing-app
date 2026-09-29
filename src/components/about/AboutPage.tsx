import React from 'react';
import { useApp } from '../../context/AppContext';
import { Globe2, ShieldCheck, Zap, Bot, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActiveView, setActiveDashboardTab } = useApp();

  return (
    <div className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-in fade-in duration-300">
      <div className="space-y-4 text-center">
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          About Digital Product
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Democratizing High-Performance Global Advertising
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Digital Product was founded on the belief that any business — whether an artisan coffee roastery in Ethiopia, a software startup in Europe, or a retail brand in the Americas — should have access to world-class advertising intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 space-y-2">
          <Globe2 className="w-6 h-6 text-blue-400 mb-2" />
          <h3 className="text-base font-bold text-white">25+ Languages</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Eliminating linguistic barriers by training models to understand idiomatic marketing nuances across African, European, Middle Eastern, and Asian markets.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 space-y-2">
          <ShieldCheck className="w-6 h-6 text-blue-400 mb-2" />
          <h3 className="text-base font-bold text-white">Compliance First</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Protecting advertiser ad accounts from unexpected bans and disapproved creatives with proactive AI policy checks.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 space-y-2">
          <Zap className="w-6 h-6 text-blue-400 mb-2" />
          <h3 className="text-base font-bold text-white">Direct-Response Rigor</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Prioritizing tangible return on ad spend (ROAS) and clear conversion hooks over generic, fluffy brand slogans.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 via-neutral-950 to-neutral-950 border border-blue-900/40 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Ready to advertise across borders?</h2>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Join thousands of international advertisers creating and auditing campaigns with Digital Product.
        </p>
        <button
          onClick={() => {
            setActiveDashboardTab('create_ad');
            setActiveView('dashboard');
          }}
          className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Get Started Free</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
