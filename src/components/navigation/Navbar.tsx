import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../i18n/languages';
import { SUPPORTED_CURRENCIES } from '../../services/currency';
import { Globe, DollarSign, User, LogOut, ChevronDown, Menu, X, LayoutDashboard } from 'lucide-react';
import { authService } from '../../services/authService';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    currentLanguage,
    setLanguage,
    currentCurrency,
    setCurrency,
    auth,
    openAuthModal,
    t,
  } = useApp();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currDropdownOpen, setCurrDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark (strict Top Bar Contract) */}
        <button
          onClick={() => setActiveView('landing')}
          className="text-xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors cursor-pointer select-none"
        >
          Digital Product
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveView('landing')}
            className={`cursor-pointer transition-colors hover:text-white ${
              activeView === 'landing' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            {t('navHome')}
          </button>
          <button
            onClick={() => {
              setActiveView('dashboard');
            }}
            className={`cursor-pointer transition-colors hover:text-white ${
              activeView === 'dashboard' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            {t('navDashboard')}
          </button>
          <button
            onClick={() => {
              setActiveView('dashboard');
            }}
            className="cursor-pointer transition-colors hover:text-white"
          >
            {t('navAiAssistant')}
          </button>
          <button
            onClick={() => {
              setActiveView('dashboard');
            }}
            className="cursor-pointer transition-colors hover:text-white"
          >
            {t('navCreateAd')}
          </button>
          <button
            onClick={() => setActiveView('pricing')}
            className={`cursor-pointer transition-colors hover:text-white ${
              activeView === 'pricing' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            {t('navPricing')}
          </button>
          <button
            onClick={() => setActiveView('help')}
            className={`cursor-pointer transition-colors hover:text-white ${
              activeView === 'help' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            {t('navHelp')}
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Language, Currency, Auth) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Selector (All 25 Languages) */}
          <div className="relative">
            <button
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setCurrDropdownOpen(false);
                setUserMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors cursor-pointer"
              title="Select Language (25 Available)"
            >
              <span className="text-sm">{currentLangObj.flag}</span>
              <span className="hidden xl:inline text-xs font-mono">{currentLangObj.code.toUpperCase()}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 max-h-80 overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl p-2 z-50">
                <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider border-b border-neutral-800 mb-1">
                  Supported Languages (25)
                </div>
                <div className="grid grid-cols-1 gap-0.5">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`flex items-center justify-between w-full px-2.5 py-1.5 text-xs rounded-lg text-left transition-colors cursor-pointer ${
                        currentLanguage === lang.code
                          ? 'bg-blue-600/20 text-blue-400 font-medium'
                          : 'text-slate-300 hover:bg-neutral-900 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Currency Selector (ETB, USD, EUR, GBP, AED, SAR, KES, NGN, ZAR) */}
          <div className="relative">
            <button
              onClick={() => {
                setCurrDropdownOpen(!currDropdownOpen);
                setLangDropdownOpen(false);
                setUserMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors cursor-pointer"
              title="Select Currency"
            >
              <span className="font-mono text-blue-400 font-semibold">{currentCurrency}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {currDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl p-2 z-50">
                <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider border-b border-neutral-800 mb-1">
                  Supported Currencies
                </div>
                {SUPPORTED_CURRENCIES.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setCurrency(curr.code);
                      setCurrDropdownOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-2.5 py-1.5 text-xs rounded-lg text-left transition-colors cursor-pointer ${
                      currentCurrency === curr.code
                        ? 'bg-blue-600/20 text-blue-400 font-medium'
                        : 'text-slate-300 hover:bg-neutral-900 hover:text-white'
                    }`}
                  >
                    <div>
                      <span className="font-mono font-medium mr-1.5 text-white">{curr.code}</span>
                      <span className="text-[11px] text-slate-400">({curr.symbol})</span>
                    </div>
                    <span className="text-[11px] text-slate-500 truncate max-w-[90px]">{curr.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Auth Actions */}
          {auth.isAuthenticated && auth.user ? (
            <div className="relative">
              <button
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setLangDropdownOpen(false);
                  setCurrDropdownOpen(false);
                }}
                className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 bg-blue-600/10 border border-blue-600/30 rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  {auth.user.name.charAt(0)}
                </div>
                <span className="text-xs font-medium text-slate-200 hidden sm:inline max-w-[100px] truncate">
                  {auth.user.name}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-neutral-800 text-xs">
                    <p className="font-semibold text-white truncate">{auth.user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{auth.user.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveView('dashboard');
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-slate-300 hover:bg-neutral-900 hover:text-white rounded-lg cursor-pointer"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
                      <span>{t('navDashboard')}</span>
                    </button>
                    <button
                      onClick={() => {
                        authService.logout();
                        setUserMenuOpen(false);
                        setActiveView('landing');
                      }}
                      className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('signin')}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {t('signIn')}
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap glow-blue"
              >
                {t('getStarted')}
              </button>
            </div>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-neutral-900 cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (15% height compliant) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-4 py-3 space-y-2">
          <button
            onClick={() => {
              setActiveView('landing');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
          >
            {t('navHome')}
          </button>
          <button
            onClick={() => {
              setActiveView('dashboard');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
          >
            {t('navDashboard')}
          </button>
          <button
            onClick={() => {
              setActiveView('pricing');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
          >
            {t('navPricing')}
          </button>
          <button
            onClick={() => {
              setActiveView('help');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
          >
            {t('navHelp')}
          </button>
        </div>
      )}
    </header>
  );
};
