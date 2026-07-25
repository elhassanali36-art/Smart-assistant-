"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import DashboardOverview from "@/components/DashboardOverview";
import AccountsManager from "@/components/AccountsManager";
import AiVideoStudio from "@/components/AiVideoStudio";
import PostsScheduler from "@/components/PostsScheduler";
import AutoPublishRules from "@/components/AutoPublishRules";
import NewPostModal from "@/components/NewPostModal";
import VideoPreviewModal from "@/components/VideoPreviewModal";
import {
  LayoutDashboard,
  Share2,
  Video as VideoIcon,
  Calendar,
  Zap,
  Loader2,
  RefreshCw,
  CheckCircle
} from "lucide-react";
import { Language, translations } from "@/lib/i18n";

export default function HomePage() {
  const [lang, setLang] = useState<Language>("ar");
  const [activeTab, setActiveTab] = useState("overview");
  const [accounts, setAccounts] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [selectedVideoForPost, setSelectedVideoForPost] = useState<any | null>(null);
  const [previewVideo, setPreviewVideo] = useState<any | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const t = translations[lang];

  // Update HTML dir and lang attribute when language toggles
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const handleToggleLanguage = () => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const fetchAllData = useCallback(async () => {
    try {
      const [resAcc, resPos, resVid, resRul] = await Promise.all([
        fetch("/api/accounts"),
        fetch("/api/posts"),
        fetch("/api/videos"),
        fetch("/api/rules"),
      ]);

      if (resAcc.ok) setAccounts(await resAcc.json());
      if (resPos.ok) setPosts(await resPos.json());
      if (resVid.ok) setVideos(await resVid.json());
      if (resRul.ok) setRules(await resRul.json());
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Account actions
  const handleToggleAccountAutoPublish = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/accounts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ autoPublishEnabled: !currentStatus }),
      });
      if (res.ok) {
        showToast(
          currentStatus
            ? (lang === "ar" ? "تم تعطيل النشر الآلي لهذا الحساب 🛑" : "Auto-Publish Disabled 🛑")
            : (lang === "ar" ? "تم تفعيل النشر الآلي لهذا الحساب ✅" : "Auto-Publish Enabled ✅")
        );
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAccount = async (id: number) => {
    try {
      const res = await fetch(`/api/accounts/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast(lang === "ar" ? "تم فصل الحساب بنجاح 🗑️" : "Account disconnected successfully 🗑️");
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Post actions
  const handlePublishNow = async (id: number) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "published" }),
      });
      if (res.ok) {
        showToast(lang === "ar" ? "تم نشر المنشور عبر حسابات التواصل الاجتماعي فوراً 🚀" : "Published across social media channels instantly 🚀");
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast(lang === "ar" ? "تم حذف المنشور من التقويم 🗑️" : "Post deleted from calendar 🗑️");
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Video actions
  const handleDeleteVideo = async (id: number) => {
    try {
      const res = await fetch(`/api/videos/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast(lang === "ar" ? "تم حذف الفيديو الإعلاني من الاستوديو 🗑️" : "Video deleted from studio 🗑️");
        fetchAllData();
        if (previewVideo && previewVideo.id === id) setPreviewVideo(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleScheduleWithVideo = (vid: any) => {
    setSelectedVideoForPost(vid);
    setIsNewPostOpen(true);
  };

  // Rule actions
  const handleToggleRuleActive = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/rules/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      if (res.ok) {
        showToast(
          currentStatus
            ? (lang === "ar" ? "تم إيقاف قاعدة الأتمتة مؤقتاً 🛑" : "Automation workflow paused 🛑")
            : (lang === "ar" ? "تم تفعيل قاعدة النشر التلقائي بنجاح ✅" : "Automation workflow activated ✅")
        );
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRule = async (id: number) => {
    try {
      const res = await fetch(`/api/rules/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast(lang === "ar" ? "تم حذف قاعدة الأتمتة 🗑️" : "Automation workflow deleted 🗑️");
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const navTabs = [
    { id: "overview", label: t.overviewTab, icon: LayoutDashboard, badge: null },
    { id: "accounts", label: t.accountsTab, icon: Share2, badge: accounts.length },
    { id: "ai-videos", label: t.videoStudioTab, icon: VideoIcon, badge: videos.length },
    { id: "posts", label: t.postsTab, icon: Calendar, badge: posts.filter(p => p.status === "scheduled" || p.isRecurring).length },
    { id: "rules", label: t.rulesTab, icon: Zap, badge: rules.filter(r => r.isActive).length },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-400/30 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-bold">{notification}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewPostModal={() => {
          setSelectedVideoForPost(null);
          setIsNewPostOpen(true);
        }}
        lang={lang}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs Bar */}
        <div className="bg-slate-900/80 backdrop-blur-md p-2 rounded-3xl border border-slate-800/80 shadow-lg overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-start md:justify-between min-w-max gap-2">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-200 shrink-0 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-indigo-500/25 ring-2 ring-white/10"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                  {tab.badge !== null && tab.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-black ${
                      isActive ? "bg-black/30 text-white" : "bg-slate-800 text-slate-300"
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] gap-4 text-center">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl shadow-indigo-500/30">
              <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{lang === "ar" ? "جاري تحميل بيانات حساباتك واستوديو الذكاء الاصطناعي..." : "Loading social accounts and AI studio data..."}</h3>
              <p className="text-xs text-slate-400 mt-1">{lang === "ar" ? "يتم الآن مزامنة الجداول وأرصدة الفيديوهات الإعلانية" : "Syncing schedules and video credits..."}</p>
            </div>
          </div>
        ) : (
          <div className="transition-all duration-300">
            {activeTab === "overview" && (
              <DashboardOverview
                accounts={accounts}
                posts={posts}
                videos={videos}
                rules={rules}
                onNavigateTab={setActiveTab}
                onSelectVideo={(vid) => setPreviewVideo(vid)}
                onToggleAccountAutoPublish={handleToggleAccountAutoPublish}
                lang={lang}
              />
            )}

            {activeTab === "accounts" && (
              <AccountsManager
                accounts={accounts}
                onRefreshAccounts={fetchAllData}
                onToggleAutoPublish={handleToggleAccountAutoPublish}
                onDeleteAccount={handleDeleteAccount}
                lang={lang}
              />
            )}

            {activeTab === "ai-videos" && (
              <AiVideoStudio
                videos={videos}
                onRefreshVideos={fetchAllData}
                onSelectVideo={(vid) => setPreviewVideo(vid)}
                onDeleteVideo={handleDeleteVideo}
                onOpenScheduleWithVideo={handleScheduleWithVideo}
                lang={lang}
              />
            )}

            {activeTab === "posts" && (
              <PostsScheduler
                posts={posts}
                videos={videos}
                onRefreshPosts={fetchAllData}
                onOpenNewPostModal={() => {
                  setSelectedVideoForPost(null);
                  setIsNewPostOpen(true);
                }}
                onPublishNow={handlePublishNow}
                onDeletePost={handleDeletePost}
                lang={lang}
              />
            )}

            {activeTab === "rules" && (
              <AutoPublishRules
                rules={rules}
                onRefreshRules={fetchAllData}
                onToggleRuleActive={handleToggleRuleActive}
                onDeleteRule={handleDeleteRule}
                lang={lang}
              />
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900/60 border-t border-slate-800/80 mt-16 py-8 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-slate-300">{t.appTitle}</span>
            <span>— {t.allRightsReserved}</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={fetchAllData}
              className="hover:text-white flex items-center gap-1 font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.refreshData}</span>
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500 font-mono">Postik AI Engine v5.0 • Bilingual Recurring Multi-Slot Edition</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <NewPostModal
        isOpen={isNewPostOpen}
        onClose={() => {
          setIsNewPostOpen(false);
          setSelectedVideoForPost(null);
        }}
        accounts={accounts}
        videos={videos}
        onRefreshPosts={fetchAllData}
        initialSelectedVideo={selectedVideoForPost}
        lang={lang}
      />

      <VideoPreviewModal
        video={previewVideo}
        onClose={() => setPreviewVideo(null)}
        onScheduleWithVideo={handleScheduleWithVideo}
        lang={lang}
      />

    </div>
  );
}
