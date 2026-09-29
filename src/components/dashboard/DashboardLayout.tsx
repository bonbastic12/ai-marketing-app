import React, { useState } from 'react';
import { useApp, DashboardTab } from '../../context/AppContext';
import {
  LayoutDashboard,
  Bot,
  PlusCircle,
  FileSearch,
  AlertTriangle,
  BookmarkCheck,
  Megaphone,
  BarChart2,
  Wallet,
  User,
  Settings,
  ShieldAlert,
  HelpCircle,
  Globe,
  DollarSign,
  ChevronRight,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { authService } from '../../services/authService';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    activeDashboardTab,
    setActiveDashboardTab,
    setActiveView,
    auth,
    currentLanguage,
    currentCurrency,
    t,
  } = useApp();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuItems: { id: DashboardTab; label: string; icon: React.ElementType; adminOnly?: boolean }[] = [
    { id: 'overview', label: t('overview'), icon: LayoutDashboard },
    { id: 'ai_assistant', label: t('navAiAssistant'), icon: Bot },
    { id: 'create_ad', label: t('adBuilder'), icon: PlusCircle },
    { id: 'ad_analysis', label: t('adAnalysis'), icon: FileSearch },
    { id: 'ad_issue_analyzer', label: t('adIssueAnalyzer'), icon: AlertTriangle },
    { id: 'my_ads', label: t('myAds'), icon: BookmarkCheck },
    { id: 'campaigns', label: t('navCampaigns'), icon: Megaphone },
    { id: 'analytics', label: t('analytics'), icon: BarChart2 },
    { id: 'wallet', label: t('walletEarnings'), icon: Wallet },
    { id: 'profile', label: t('profile'), icon: User },
    { id: 'settings', label: t('settings'), icon: Settings },
    { id: 'admin_panel', label: t('adminPanel'), icon: ShieldAlert },
    { id: 'help_center', label: t('helpCenter'), icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col md:flex-row">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-neutral-950 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('landing')}
            className="text-base font-bold text-white tracking-tight"
          >
            Digital Product
          </button>
          <span className="text-xs text-slate-500 font-mono">/ Console</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-neutral-900"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation (240px - 260px) */}
      <aside
        className={`${
          mobileSidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-neutral-950 border-r border-neutral-900 md:min-h-screen p-4 flex flex-col justify-between shrink-0 z-40`}
      >
        <div>
          {/* Brand header */}
          <div className="hidden md:flex items-center justify-between px-2 mb-6">
            <button
              onClick={() => setActiveView('landing')}
              className="text-lg font-bold tracking-tight text-white hover:text-blue-400 transition-colors text-left"
            >
              Digital Product
            </button>
            <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 border border-blue-800/40 px-1.5 py-0.5 rounded">
              v2.4
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeDashboardTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveDashboardTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-3 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card & Quick Controls */}
        <div className="pt-4 border-t border-neutral-900 mt-6 space-y-3">
          <div className="px-2 py-1 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>{currentLanguage.toUpperCase()}</span>
            <span>·</span>
            <span className="text-blue-400 font-semibold">{currentCurrency}</span>
            <span>·</span>
            <span>Pro Plan</span>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-blue-600/30 text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">
                {auth.user ? auth.user.name.charAt(0) : 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">
                  {auth.user ? auth.user.name : 'Executive User'}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {auth.user ? auth.user.email : 'marketing@enterprise.io'}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                authService.logout();
                setActiveView('landing');
              }}
              title="Logout"
              className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 min-w-0 bg-[#030712] overflow-y-auto min-h-screen">
        {/* Contextual Top Header Breadcrumbs */}
        <header className="px-4 sm:px-8 py-3.5 border-b border-neutral-900 bg-neutral-950/60 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button onClick={() => setActiveView('landing')} className="hover:text-white transition-colors">
              Platform
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-white font-medium capitalize">
              {activeDashboardTab.replace(/_/g, ' ')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveDashboardTab('create_ad')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Ad</span>
            </button>
          </div>
        </header>

        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
};
