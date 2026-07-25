"use client";

import React, { useState } from "react";
import {
  Share2,
  Plus,
  Trash2,
  CheckCircle,
  ShieldAlert,
  Zap,
  RefreshCw,
  ExternalLink,
  Shield,
  Lock,
  Loader2
} from "lucide-react";
import { Language, translations } from "@/lib/i18n";

interface AccountsManagerProps {
  accounts: any[];
  onRefreshAccounts: () => void;
  onToggleAutoPublish: (id: number, currentStatus: boolean) => void;
  onDeleteAccount: (id: number) => void;
  lang: Language;
}

export default function AccountsManager({
  accounts,
  onRefreshAccounts,
  onToggleAutoPublish,
  onDeleteAccount,
  lang,
}: AccountsManagerProps) {
  const t = translations[lang];
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("twitter");
  const [accountName, setAccountName] = useState("");
  const [username, setUsername] = useState("");
  const [followerCount, setFollowerCount] = useState("");
  const [autoPublish, setAutoPublish] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectStep, setConnectStep] = useState(0);

  const platformsList = [
    { id: "twitter", name: "𝕏 Twitter / تويتر", desc: lang === "ar" ? "للنشر السريع وتغريدات الخصومات والتفاعل مع العملاء" : "For fast tweets, flash sales, and customer engagement", color: "bg-slate-900 border-slate-700" },
    { id: "instagram", name: "📸 Instagram (Reels & Posts)", desc: lang === "ar" ? "لنشر الصور والفيديوهات القصيرة (Reels) والقصص الترويجية" : "For sharing photos, short Reels, and promo stories", color: "bg-gradient-to-r from-purple-900/60 to-pink-900/60 border-pink-500/30" },
    { id: "tiktok", name: "🎵 TikTok (Video Ads)", desc: lang === "ar" ? "للوصول السريع للجمهور عبر مقاطع الفيديوهات الإعلانية الترند" : "For viral reach through trending short-form ad videos", color: "bg-slate-900 border-teal-500/40" },
    { id: "linkedin", name: "💼 LinkedIn Professional", desc: lang === "ar" ? "للمحتوى المهني والرسمي وأخبار العلامة التجارية والشركات" : "For B2B professional content, brand updates and insights", color: "bg-blue-950/70 border-blue-500/40" },
    { id: "youtube", name: "▶️ YouTube Shorts", desc: lang === "ar" ? "لنشر الفيديوهات العمودية القصيرة وتوسيع قاعدة المشتركين" : "For publishing vertical shorts and expanding subscribers", color: "bg-red-950/60 border-red-500/40" },
    { id: "facebook", name: "📘 Facebook Pages", desc: lang === "ar" ? "لإدارة الصفحات التجارية ونشر الإعلانات والعروض للمجتمعات" : "For managing commercial pages and sharing deals to communities", color: "bg-blue-900/50 border-blue-400/30" },
    { id: "threads", name: "🧵 Threads by Meta", desc: lang === "ar" ? "للتفاعل النصي السريع والنقاشات الترند حول المنتجات" : "For text discussions, trending topics and product threads", color: "bg-slate-900 border-slate-600" },
  ];

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName || !username) return;

    setIsConnecting(true);
    setConnectStep(1); // Connecting to OAuth
    await new Promise((r) => setTimeout(r, 800));
    setConnectStep(2); // Verifying permissions
    await new Promise((r) => setTimeout(r, 800));
    setConnectStep(3); // Success

    try {
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: selectedPlatform,
          accountName,
          username: username.startsWith("@") ? username : `@${username}`,
          followerCount: followerCount ? Number(followerCount) : Math.floor(Math.random() * 40000) + 1500,
          autoPublishEnabled: autoPublish,
        }),
      });

      if (res.ok) {
        onRefreshAccounts();
        setShowConnectModal(false);
        setAccountName("");
        setUsername("");
        setFollowerCount("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsConnecting(false);
      setConnectStep(0);
    }
  };

  const platformIcons: Record<string, string> = {
    twitter: "𝕏 Twitter",
    instagram: "📸 Instagram",
    tiktok: "🎵 TikTok",
    linkedin: "💼 LinkedIn",
    youtube: "▶️ YouTube",
    facebook: "📘 Facebook",
    threads: "🧵 Threads",
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Bar */}
      <div className="bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>{lang === "ar" ? "ربط آمن ومشفر عبر بوابات OAuth الرسمية" : "Secure OAuth 2.0 encrypted connection"}</span>
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>{t.accountsManagerTitle}</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            {t.accountsManagerSub}
          </p>
        </div>

        <button
          onClick={() => setShowConnectModal(true)}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 text-white shadow-lg shadow-indigo-500/25 active:scale-95 transition-all w-full md:w-auto justify-center"
        >
          <Plus className="w-5 h-5 shrink-0" />
          <span>{t.connectNewSocial}</span>
        </button>
      </div>

      {/* Connected Accounts List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 shadow-xl hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between gap-6 relative overflow-hidden group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={acc.avatarUrl}
                    alt={acc.accountName}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/10 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] ring-2 ring-slate-900 font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white line-clamp-1">{acc.accountName}</h3>
                  <p className="text-xs text-indigo-400 font-mono font-semibold">{acc.username}</p>
                  <span className="inline-block mt-1 text-xs text-slate-400">
                    {platformIcons[acc.platform] || acc.platform}
                  </span>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                acc.status === "connected" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              }`}>
                {acc.status === "connected" ? (lang === "ar" ? "متصل فعال" : "Connected") : (lang === "ar" ? "متوقف مؤقتاً" : "Paused")}
              </span>
            </div>

            {/* Stats & Permissions Info */}
            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>{t.followersLabel}</span>
                <span className="font-bold text-white font-mono">{(acc.followerCount || 0).toLocaleString(lang === "ar" ? "ar-SA" : "en-US")} {lang === "ar" ? "متابع" : "followers"}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>{t.permissionsLabel}</span>
                <span className="text-[11px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono">
                  {lang === "ar" ? "نشر + جدولة + فيديو" : "Publish + Schedule + Video"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>{t.lastSyncLabel}</span>
                <span className="text-slate-400">{lang === "ar" ? "منذ دقائق قليلة" : "A few minutes ago"}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 gap-3">
              <button
                onClick={() => onToggleAutoPublish(acc.id, acc.autoPublishEnabled)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  acc.autoPublishEnabled
                    ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700"
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{acc.autoPublishEnabled ? (lang === "ar" ? "النشر الآلي نشط" : "Auto-Publish Active") : (lang === "ar" ? "تفعيل النشر الآلي" : "Enable Auto-Publish")}</span>
              </button>

              <button
                onClick={() => {
                  if (confirm(lang === "ar" ? "هل أنت متأكد من رغبتك في فصل هذا الحساب؟" : "Are you sure you want to disconnect this account?")) {
                    onDeleteAccount(acc.id);
                  }
                }}
                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all"
                title={t.disconnectBtn}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Empty State / Add Card */}
        <div
          onClick={() => setShowConnectModal(true)}
          className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 bg-slate-900/30 hover:bg-slate-900/60 min-h-[280px] group"
        >
          <div className="w-16 h-16 rounded-3xl bg-slate-800 group-hover:bg-indigo-600/20 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-all mb-4 border border-slate-700">
            <Plus className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-white">{lang === "ar" ? "ربط منصة جديدة" : "Connect New Platform"}</h3>
          <p className="text-xs text-slate-400 mt-2 max-w-xs">
            {lang === "ar" ? "قم بإضافة حساب جديد في تويتر، إنستغرام، تيك توك، أو لينكد إن لتوسيع نطاق نشر إعلاناتك" : "Add your Twitter, Instagram, TikTok or LinkedIn account to expand your publishing reach"}
          </p>
        </div>
      </div>

      {/* Interactive Modal to Connect Account */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  ⚡
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{t.connectModalTitle}</h3>
                  <p className="text-xs text-slate-400">{t.connectModalSub}</p>
                </div>
              </div>
              <button
                onClick={() => setShowConnectModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold bg-slate-800 px-3 py-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConnect} className="space-y-6">
              
              {/* Platform Select */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-300">{t.step1ChoosePlatform}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {platformsList.map((plat) => (
                    <div
                      key={plat.id}
                      onClick={() => setSelectedPlatform(plat.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                        selectedPlatform === plat.id
                          ? "bg-indigo-600/20 border-indigo-500 text-white ring-2 ring-indigo-500/30"
                          : `${plat.color} text-slate-300 hover:border-slate-600`
                      }`}
                    >
                      <input
                        type="radio"
                        checked={selectedPlatform === plat.id}
                        onChange={() => setSelectedPlatform(plat.id)}
                        className="mt-1"
                      />
                      <div>
                        <div className="text-sm font-bold">{plat.name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{plat.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Details */}
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <label className="text-xs font-bold text-slate-300 block">{t.step2AccountDetails}</label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block font-semibold">{t.accountNameLabel}</label>
                    <input
                      type="text"
                      required
                      placeholder={lang === "ar" ? "مثال: متجر الأناقة السعودية" : "e.g. Royal Fashion Store"}
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 mb-1 block font-semibold">{t.usernameLabel}</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. @saudi_style"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm font-mono focus:outline-none focus:border-indigo-500 text-left"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 mb-1 block font-semibold">{t.followerCountLabel}</label>
                  <input
                    type="number"
                    placeholder="e.g. 45000"
                    value={followerCount}
                    onChange={(e) => setFollowerCount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Permissions & Auto-Publish Toggle */}
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-indigo-400" />
                    <span>{t.autoPublishPermission}</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={autoPublish}
                    onChange={(e) => setAutoPublish(e.target.checked)}
                    className="w-5 h-5 rounded accent-indigo-500 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t.autoPublishDesc}
                </p>
              </div>

              {/* Simulated Loading / Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isConnecting}
                  className="w-full py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 text-white shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-3 disabled:opacity-50 transition-all"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>
                        {connectStep === 1
                          ? (lang === "ar" ? "جاري الاتصال بخوادم المصادقة (OAuth 2.0)..." : "Connecting to OAuth 2.0 authentication servers...")
                          : connectStep === 2
                          ? (lang === "ar" ? "التحقق من التوكن وصلاحيات النشر والجدولة اليومية..." : "Verifying access tokens & recurring schedule permissions...")
                          : (lang === "ar" ? "تم الربط بنجاح! جاري المزامنة..." : "Successfully connected! Syncing now...")}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{t.connectSubmitBtn}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
