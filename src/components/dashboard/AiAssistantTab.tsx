import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { aiService } from '../../services/aiService';
import { ChatMessage } from '../../types';
import {
  Bot,
  Send,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  PlusCircle,
  HelpCircle,
  ArrowRight,
  Sliders,
} from 'lucide-react';

export const AiAssistantTab: React.FC = () => {
  const { currentLanguage, currentCurrency, incrementAiUsage, setActiveDashboardTab, t } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      role: 'assistant',
      content: `Welcome to your International AI Advertising Assistant!\n\nI can help you:\n• **Create High-Converting Ads**: Write headlines, hooks, primary copy, and descriptions.\n• **Rewrite & Optimize**: Transform existing ad copy into high-CTR direct-response messaging.\n• **Suggest Strategy & Audiences**: Find high-intent regional segments and platform angles.\n• **Diagnose Rejections**: Fix policy non-compliance issues for Meta, Google, TikTok, and Telegram.\n\nTry selecting a starter prompt below or enter your product details to get started.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const starterPrompts = [
    'Generate 4 high-converting headlines for B2B SaaS targeting USA & Germany',
    'Write an engaging Instagram story script for Ethiopian specialty coffee',
    'Analyze why an ad with high impressions has low CTR and how to fix it',
    'Suggest target audiences and angles for TikTok in the Middle East & Africa',
    'Explain the most common causes for ad account rejections on Meta',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      role: 'user',
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const chatHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const replyText = await aiService.chatWithAssistant(chatHistory, {
        language: currentLanguage,
      });

      const assistantMsg: ChatMessage = {
        id: 'ast_' + Date.now(),
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      incrementAiUsage();
    } catch {
      const errorMsg: ChatMessage = {
        id: 'err_' + Date.now(),
        role: 'assistant',
        content:
          'I encountered a temporary connection issue. Please retry your query or check your network connectivity.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRegenerateLast = async () => {
    if (loading || messages.length < 2) return;
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      handleSendMessage(lastUserMsg.content);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-135px)] bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in duration-300">
      
      {/* Top Header of Chat */}
      <div className="px-6 py-4 bg-neutral-900/60 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>AI Advertising Strategist</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            </h1>
            <p className="text-[11px] text-slate-400">
              International copywriter, audience analyst & compliance validator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveDashboardTab('create_ad')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            <span>Open Ad Builder</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`relative max-w-[90%] sm:max-w-[78%] rounded-2xl px-4 py-3.5 text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-sm shadow-md'
                  : 'bg-neutral-900 border border-neutral-800 text-slate-200 rounded-tl-sm shadow-sm'
              }`}
            >
              {/* Message Header */}
              <div className="flex items-center justify-between gap-4 mb-1.5 pb-1 border-b border-neutral-800/40 text-[10px] text-slate-400 font-mono">
                <span className="font-semibold text-slate-300">
                  {msg.role === 'user' ? 'You' : 'AI Assistant'}
                </span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Message Markdown-like Body */}
              <div className="whitespace-pre-wrap font-sans text-xs space-y-2">
                {msg.content}
              </div>

              {/* Assistant Actions: Copy & Regenerate */}
              {msg.role === 'assistant' && (
                <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleCopyMessage(msg.id, msg.content)}
                    className="p-1 text-slate-400 hover:text-white rounded hover:bg-neutral-800 transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
                    title="Copy to clipboard"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Bubble */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-neutral-900 border border-neutral-800 text-slate-300 rounded-2xl rounded-tl-sm px-4 py-3 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400 animate-spin" />
              <span>Analyzing advertising strategy & synthesizing copy...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompts Carousel */}
      <div className="px-4 py-2 border-t border-neutral-900 bg-neutral-950 flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-slate-500 shrink-0 font-medium">Quick Starters:</span>
        {starterPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            disabled={loading}
            className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-slate-300 hover:text-white shrink-0 transition-colors cursor-pointer disabled:opacity-50"
          >
            {prompt.length > 40 ? prompt.slice(0, 40) + '...' : prompt}
          </button>
        ))}
      </div>

      {/* Input Box Footer */}
      <div className="p-4 bg-neutral-900/40 border-t border-neutral-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask the AI Assistant to create copy, analyze your hook, or suggest a campaign angle..."
              disabled={loading}
              className="w-full pl-4 pr-10 py-3 text-xs bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !inputQuery.trim()}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed glow-blue"
          >
            <Send className="w-4 h-4" />
          </button>

          {messages.length > 2 && (
            <button
              type="button"
              onClick={handleRegenerateLast}
              disabled={loading}
              title="Regenerate last response"
              className="p-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer disabled:opacity-40"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </form>

        <p className="text-[10px] text-slate-500 text-center mt-2">
          Engineered for international copy optimization. Always review platform policy guidelines prior to live media spend.
        </p>
      </div>

    </div>
  );
};
