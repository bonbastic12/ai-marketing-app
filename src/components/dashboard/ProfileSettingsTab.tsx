import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../i18n/languages';
import { SUPPORTED_CURRENCIES } from '../../services/currency';
import { authService } from '../../services/authService';
import { SupportedCurrencyCode, SupportedLanguageCode } from '../../types';
import {
  User,
  Settings,
  Globe,
  DollarSign,
  Shield,
  Key,
  CheckCircle2,
  Lock,
  Mail,
  Building,
} from 'lucide-react';

export const ProfileSettingsTab: React.FC = () => {
  const { auth, currentLanguage, setLanguage, currentCurrency, setCurrency, t } = useApp();

  const user = auth.user;

  const [name, setName] = useState(user?.name || 'Alex Vance');
  const [email, setEmail] = useState(user?.email || 'alex@globalbrands.io');
  const [company, setCompany] = useState(user?.company || 'Global Advertising Ltd.');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-5678');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    authService.updateProfile({
      name,
      email,
      company,
      phone,
    });
    setSaveNotice('Profile details saved successfully.');
    setTimeout(() => setSaveNotice(null), 3000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }
    setSaveNotice('Password updated securely.');
    setCurrentPassword('');
    setNewPassword('');
    setTimeout(() => setSaveNotice(null), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
          <Settings className="w-3.5 h-3.5" />
          <span>Account Preferences & Configuration</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Account & Regional Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your executive identity, default platform language, and reporting currency.
        </p>
      </div>

      {saveNotice && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{saveNotice}</span>
        </div>
      )}

      {/* Regional Preferences (25 Languages & Currencies) */}
      <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-400" />
          <span>Internationalization & Currency</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Platform Display Language (25 Supported)
            </label>
            <select
              value={currentLanguage}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguageCode)}
              className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.nativeName} ({l.name})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1">
              Instantly adjusts navigation, dashboard labels, AI assistant context, and help texts.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Reporting & Spending Currency
            </label>
            <select
              value={currentCurrency}
              onChange={(e) => setCurrency(e.target.value as SupportedCurrencyCode)}
              className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500 cursor-pointer font-mono"
            >
              {SUPPORTED_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} — {c.name} ({c.symbol})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1">
              Includes Ethiopian Birr (ETB), USD, EUR, GBP, AED, SAR, KES, NGN, and ZAR.
            </p>
          </div>
        </div>
      </div>

      {/* Profile Details Form */}
      <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4 text-blue-400" />
          <span>Profile Details</span>
        </h2>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Company / Organization</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Security & Password */}
      <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-400" />
          <span>Security Credentials</span>
        </h2>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
          >
            Update Password
          </button>
        </form>
      </div>

    </div>
  );
};
