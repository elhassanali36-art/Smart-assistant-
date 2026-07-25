"use client";

import React from "react";
import {
  Users,
  Video,
  Calendar,
  TrendingUp,
  Sparkles,
  Share2,
  Clock,
  Play,
  ArrowUpRight,
  Zap
} from "lucide-react";
import { Language, translations } from "@/lib/i18n";

interface DashboardOverviewProps {
  accounts: any[];
  posts: any[];
  videos: any[];
  rules: any[];
  onNavigateTab: (tab: string) => void;
  onSelectVideo: (video: any) => void;
  onToggleAccountAutoPublish: (id: number, currentStatus: boolean) => void;
  lang: Language;
}

export default function DashboardOverview({
  accounts,
  posts,
  videos,
  rules,
  onNavigateTab,
  onSelectVideo,
  onToggleAccountAutoPublish,
  lang,
}: DashboardOverviewProps) {
  const t = translations[lang];

  // Calculate aggregate metrics
  const totalFollowers = accounts.reduce((sum, acc) => sum + (acc.followerCount || 0), 0);
  const connectedCount = accounts.filter((a) => a.status === "connected").length;
  const publishedPostsCount = posts.filter((p) => p.status === "published").length;
  const scheduledPostsCount = posts.filter((p) => p.status === "scheduled" || p.isRecurring).length;
  const avgCtr = videos.length
    ? Math.round(videos.reduce((sum, v) => sum + (v.predictedCtr || 85), 0) / videos.length)
    : 88;

  const platformIcons: Record<string, string> = {
    twitter: "𝕏 Twitter / تويتر",
    instagram: "📸 Instagram",
    tiktok: "🎵 TikTok",
    linkedin: "💼 LinkedIn",
    youtube: "▶️ YouTube",
    facebook: "📘 Facebook",
    threads: "🧵 Threads",
  };

  const platformColors: Record<string, string> = {
    twitter: "from-slate-800 to-black border-slate-700 text-white",
    instagram: "from-purple-900/40 via-pink-900/30 to-amber-900/30 border-pink-500/30 text-pink-300",
    tiktok: "from-slate-900 to-zinc-900 border-teal-500/30 text-teal-300",
    linkedin: "from-blue-950/50 to-indigo-950/50 border-blue-500/30 text-blue-300",
    youtube: "from-red-950/40 to-slate-900 border-red-500/30 text-red-400",
    facebook: "from-blue-900/40 to-slate-900 border-blue-400/30 text-blue-300",
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/80 via-purple-900/70 to-slate-900 p-8 border border-indigo-500/30 shadow-2xl">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.serverOnline}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.welcomeTitle}
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              {t.welcomeSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
            <button
              onClick={() => onNavigateTab("ai-videos")}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25 transition-all duration-200"
            >
              <Video className="w-4 h-4 shrink-0" />
              <span>{t.createAdVideoBtn}</span>
            </button>
            <button
              onClick={() => onNavigateTab("accounts")}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all duration-200"
            >
              <Share2 className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>{t.connectAccountBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-3xl border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 shadow-xl group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium">{t.totalFollowers}</span>
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{totalFollowers.toLocaleString(lang === "ar" ? "ar-SA" : "en-US")}</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> 14.2%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">{t.connectedAccounts} ({connectedCount})</p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-3xl border border-slate-800 hover:border-purple-500/40 transition-all duration-300 shadow-xl group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium">{t.postsCountLabel}</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{publishedPostsCount + scheduledPostsCount}</span>
            <span className="text-xs font-bold text-purple-400">({publishedPostsCount} published)</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">{scheduledPostsCount} in publishing schedule queue</p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-3xl border border-slate-800 hover:border-pink-500/40 transition-all duration-300 shadow-xl group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium">{t.aiVideosLabel}</span>
            <div className="w-10 h-10 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Video className="w-5 h-5 text-pink-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{videos.length}</span>
            <span className="text-xs font-bold text-amber-400 flex items-center">
              ⭐ CTR {avgCtr}%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Ready for instant sharing & campaigns</p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 shadow-xl group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium">{t.avgEngagement}</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">9.6%</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> Above avg
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Compared to last month performance</p>
        </div>
      </div>

      {/* Grid Section: Connected Accounts + Auto-Publish Status */}
      <div className="bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-indigo-400" />
              <span>{t.accountsSectionTitle}</span>
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              {t.accountsSectionSub}
            </p>
          </div>
          <button
            onClick={() => onNavigateTab("accounts")}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl transition-all self-start sm:self-center"
          >
            {t.manageAllAccounts} ({accounts.length})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.slice(0, 6).map((acc) => {
            const colorClass = platformColors[acc.platform] || "from-slate-800 to-slate-900 border-slate-700 text-slate-200";
            return (
              <div
                key={acc.id}
                className={`bg-gradient-to-br ${colorClass} p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg flex flex-col justify-between gap-4`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={acc.avatarUrl}
                      alt={acc.accountName}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/10"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">{acc.accountName}</h4>
                      <p className="text-xs text-slate-400 font-mono">{acc.username}</p>
                      <span className="inline-block mt-1 text-[11px] font-semibold text-indigo-300">
                        {platformIcons[acc.platform] || acc.platform} • {(acc.followerCount || 0).toLocaleString(lang === "ar" ? "ar-SA" : "en-US")}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    acc.status === "connected" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  }`}>
                    {acc.status === "connected" ? (lang === "ar" ? "متصل" : "Connected") : (lang === "ar" ? "متوقف" : "Paused")}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                  <span className="text-slate-300 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.autoPublishStatus}</span>
                  </span>
                  <button
                    onClick={() => onToggleAccountAutoPublish(acc.id, acc.autoPublishEnabled)}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      acc.autoPublishEnabled
                        ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700"
                    }`}
                  >
                    {acc.autoPublishEnabled ? t.activeEnabled : t.disabledLabel}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout: AI Videos Gallery & Upcoming Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Latest AI Videos */}
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-purple-400" />
                <span>{t.latestAiVideos}</span>
              </h3>
              <button
                onClick={() => onNavigateTab("ai-videos")}
                className="text-xs font-bold text-purple-400 hover:text-purple-300"
              >
                {t.viewAll}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videos.slice(0, 4).map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => onSelectVideo(vid)}
                  className="group relative rounded-2xl overflow-hidden bg-slate-800/50 border border-slate-700/60 hover:border-purple-500/50 cursor-pointer transition-all duration-300 shadow-md hover:shadow-purple-500/10 flex flex-col justify-between"
                >
                  <div className="relative aspect-video sm:aspect-square w-full overflow-hidden bg-slate-950">
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-amber-300 border border-slate-700">
                      ⭐ CTR: {vid.predictedCtr}%
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white font-mono">
                      {vid.durationSeconds}s
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/90">
                    <h4 className="text-xs font-bold text-white line-clamp-1">{vid.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{vid.productName}</p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800 text-[10px] text-purple-300 font-semibold">
                      <span>{vid.style === "ugc_influencer" ? "UGC Style" : "Luxury Cinematic"}</span>
                      <span>{lang === "ar" ? "معاينة 🚀" : "Preview 🚀"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent & Upcoming Posts Feed */}
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <span>{t.publishingHistory}</span>
              </h3>
              <button
                onClick={() => onNavigateTab("posts")}
                className="text-xs font-bold text-indigo-400 hover:text-indigo-300"
              >
                {t.manageCalendar}
              </button>
            </div>

            <div className="space-y-4">
              {posts.slice(0, 4).map((post) => {
                const isPublished = post.status === "published";
                const isRecurring = post.isRecurring;
                return (
                  <div
                    key={post.id}
                    className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 hover:bg-slate-800/70 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isPublished
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : isRecurring
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                        }`}>
                          {isPublished ? (lang === "ar" ? "تم النشر ✅" : "Published ✅") : isRecurring ? (lang === "ar" ? "تكرار يومي 🔄" : "Daily Recurring 🔄") : (lang === "ar" ? "مجدول ⏳" : "Scheduled ⏳")}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" />
                          {isRecurring && post.publishTimeSlots && post.publishTimeSlots.length > 0 ? (
                            <span>{lang === "ar" ? `أوقات: ${post.publishTimeSlots.join("، ")}` : `Slots: ${post.publishTimeSlots.join(", ")}`}</span>
                          ) : (
                            new Date(post.scheduledFor).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {post.targetPlatforms?.map((p: string) => (
                          <span key={p} className="text-xs px-1.5 py-0.5 rounded bg-slate-700/80 text-slate-200 uppercase font-mono text-[9px]">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-white line-clamp-1">{post.title}</h4>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{post.content}</p>

                    {isPublished && post.analytics && (
                      <div className="flex items-center gap-4 pt-2 border-t border-slate-700/50 text-[11px] text-slate-400">
                        <span>👁️ {(post.analytics.views || 0).toLocaleString(lang === "ar" ? "ar-SA" : "en-US")} views</span>
                        <span>❤️ {post.analytics.likes} likes</span>
                        <span className="text-emerald-400 font-bold">📈 {post.analytics.engagementRate}%</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
