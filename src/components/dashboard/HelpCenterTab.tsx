import React from 'react';
import {
  HelpCircle,
  Terminal,
  Key,
  Database,
  ShieldCheck,
  Globe2,
  ExternalLink,
  Code2,
  Server,
  Layers,
} from 'lucide-react';

export const HelpCenterTab: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Integration & Developer Manual</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Help Center & Architecture Docs</h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete production setup guidelines for connecting AI keys, databases, authentications, and advertising APIs.
        </p>
      </div>

      {/* Guide 1: How to Run the Project */}
      <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span>1. How to Run the Project</span>
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          The project is engineered as a modern, high-performance React application with Tailwind CSS and Vite.
        </p>
        <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl font-mono text-xs text-slate-200 space-y-1">
          <p className="text-slate-500"># Install dependencies</p>
          <p>npm install</p>
          <p className="text-slate-500 pt-2"># Run local development server (Port 3000)</p>
          <p>npm run dev</p>
          <p className="text-slate-500 pt-2"># Compile production distribution bundle</p>
          <p>npm run build</p>
        </div>
      </div>

      {/* Guide 2: Required Environment Variables */}
      <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Key className="w-4 h-4 text-blue-400" />
          <span>2. Required Environment Variables (.env)</span>
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Configure these environment variables in your server hosting environment. Sensitive API keys are never bundled into the client-side JavaScript.
        </p>
        <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl font-mono text-xs text-slate-200 space-y-1">
          <p><span className="text-blue-400">GEMINI_API_KEY</span>=&quot;your_gemini_api_key_here&quot;</p>
          <p><span className="text-blue-400">DATABASE_URL</span>=&quot;postgresql://user:password@host:5432/digital_product&quot;</p>
          <p><span className="text-blue-400">GOOGLE_CLIENT_ID</span>=&quot;your_google_oauth_client_id.apps.googleusercontent.com&quot;</p>
          <p><span className="text-blue-400">META_MARKETING_TOKEN</span>=&quot;EAAB...&quot;</p>
          <p><span className="text-blue-400">STRIPE_SECRET_KEY</span>=&quot;sk_live_...&quot;</p>
          <p><span className="text-blue-400">CHAPA_SECRET_KEY</span>=&quot;CHASECK_LIVE_...&quot;  <span className="text-slate-500"># For ETB Telebirr</span></p>
        </div>
      </div>

      {/* Guide 3: Connecting Authentication (Firebase / OAuth) */}
      <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>3. How to Connect Authentication</span>
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          The code is structured with an adapter in <code className="text-blue-400 bg-neutral-900 px-1 py-0.5 rounded font-mono text-[11px]">src/services/authService.ts</code>. To link Firebase Authentication:
        </p>
        <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300">
          <li>Initialize the Firebase Web SDK in <code className="text-slate-200 font-mono">firebase.ts</code> using your Firebase App configuration.</li>
          <li>In <code className="text-slate-200 font-mono">authService.signInWithEmail</code>, replace the dev session with <code className="text-blue-400 font-mono">signInWithEmailAndPassword(auth, email, password)</code>.</li>
          <li>For Google OAuth, trigger <code className="text-blue-400 font-mono">signInWithPopup(auth, googleProvider)</code>.</li>
          <li>For Phone & OTP, connect <code className="text-blue-400 font-mono">signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)</code>.</li>
        </ol>
      </div>

      {/* Guide 4: Connecting the AI Model / Gemini API */}
      <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Server className="w-4 h-4 text-blue-400" />
          <span>4. Connecting the AI API Server-Side</span>
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Digital Product uses a backend proxy route for AI requests to guarantee zero client exposure of secret keys. The routes are mapped in <code className="text-blue-400 bg-neutral-900 px-1 py-0.5 rounded font-mono text-[11px]">server.ts</code> using the official <code className="text-blue-400 font-mono text-[11px]">@google/genai</code> SDK:
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
          <li><code className="text-slate-200 font-mono">POST /api/ai/chat</code>: Real-time conversational ad strategist.</li>
          <li><code className="text-slate-200 font-mono">POST /api/ai/generate-ad</code>: Multi-format ad copy synthesis.</li>
          <li><code className="text-slate-200 font-mono">POST /api/ai/analyze-ad</code>: 8-metric diagnostic analysis.</li>
          <li><code className="text-slate-200 font-mono">POST /api/ai/issue-analyzer</code>: Policy rejection compliance repair.</li>
        </ul>
      </div>

      {/* Guide 5: Connecting the Database */}
      <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-blue-400" />
          <span>5. Connecting PostgreSQL or Cloud SQL Database</span>
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          The entity schemas for Users, Advertisements, Campaigns, Transactions, and Settings are defined in <code className="text-blue-400 bg-neutral-900 px-1 py-0.5 rounded font-mono text-[11px]">src/types/index.ts</code>. You can attach Drizzle ORM or Prisma to synchronize state directly to PostgreSQL.
        </p>
      </div>

      {/* Guide 6: Advertising Policy Disclaimers */}
      <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-xs text-slate-400 leading-relaxed">
        <strong className="text-slate-300">Platform Policy Disclaimer:</strong> Digital Product provides heuristic compliance diagnostics and conversion recommendations. Individual ad platforms (Meta, Google, TikTok, Telegram) maintain proprietary approval systems and update guidelines frequently. Final approval decisions belong exclusively to the advertising platform.
      </div>

    </div>
  );
};
