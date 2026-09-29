import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/navigation/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { PricingPage } from './components/pricing/PricingPage';
import { AboutPage } from './components/about/AboutPage';
import { HelpPage } from './components/help/HelpPage';
import { AuthModal } from './components/auth/AuthModal';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { OverviewTab } from './components/dashboard/OverviewTab';
import { AiAssistantTab } from './components/dashboard/AiAssistantTab';
import { CreateAdTab } from './components/dashboard/CreateAdTab';
import { AnalyzeAdTab } from './components/dashboard/AnalyzeAdTab';
import { AdIssueAnalyzerTab } from './components/dashboard/AdIssueAnalyzerTab';
import { MyAdsTab } from './components/dashboard/MyAdsTab';
import { CampaignsTab } from './components/dashboard/CampaignsTab';
import { AnalyticsTab } from './components/dashboard/AnalyticsTab';
import { WalletTab } from './components/dashboard/WalletTab';
import { ProfileSettingsTab } from './components/dashboard/ProfileSettingsTab';
import { AdminPanelTab } from './components/dashboard/AdminPanelTab';
import { HelpCenterTab } from './components/dashboard/HelpCenterTab';

const AppContent: React.FC = () => {
  const { activeView, activeDashboardTab } = useApp();

  const renderDashboardTab = () => {
    switch (activeDashboardTab) {
      case 'overview':
        return <OverviewTab />;
      case 'ai_assistant':
        return <AiAssistantTab />;
      case 'create_ad':
        return <CreateAdTab />;
      case 'ad_analysis':
        return <AnalyzeAdTab />;
      case 'ad_issue_analyzer':
        return <AdIssueAnalyzerTab />;
      case 'my_ads':
        return <MyAdsTab />;
      case 'campaigns':
        return <CampaignsTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'wallet':
        return <WalletTab />;
      case 'profile':
      case 'settings':
        return <ProfileSettingsTab />;
      case 'admin_panel':
        return <AdminPanelTab />;
      case 'help_center':
        return <HelpCenterTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Router */}
      <div className="flex-1">
        {activeView === 'landing' && <LandingPage />}
        {activeView === 'pricing' && <PricingPage />}
        {activeView === 'about' && <AboutPage />}
        {activeView === 'help' && <HelpPage />}
        {activeView === 'dashboard' && (
          <DashboardLayout>{renderDashboardTab()}</DashboardLayout>
        )}
      </div>

      {/* Global Authentication Modal */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
