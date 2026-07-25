"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Share2,
  Trash2,
  CheckCircle2,
  Filter,
  PlusCircle,
  Video,
  TrendingUp,
  Send,
  Sparkles,
  Eye,
  MessageSquare,
  Heart,
  Repeat
} from "lucide-react";
import { Language, translations } from "@/lib/i18n";

interface PostsSchedulerProps {
  posts: any[];
  videos: any[];
  onRefreshPosts: () => void;
  onOpenNewPostModal: () => void;
  onPublishNow: (id: number) => void;
  onDeletePost: (id: number) => void;
  lang: Language;
}

export default function PostsScheduler({
  posts,
  videos,
  onRefreshPosts,
  onOpenNewPostModal,
  onPublishNow,
  onDeletePost,
  lang,
}: PostsSchedulerProps) {
  const t = translations[lang];
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const platformFilterOptions = [
    { id: "all", label: t.allPlatforms },
    { id: "twitter", label: "𝕏 Twitter" },
    { id: "instagram", label: "📸 Instagram" },
    { id: "tiktok", label: "🎵 TikTok" },
    { id: "linkedin", label: "💼 LinkedIn" },
    { id: "youtube", label: "▶️ YouTube" },
    { id: "facebook", label: "📘 Facebook" },
  ];

  const statusFilterOptions = [
    { id: "all", label: t.allStatuses },
    { id: "scheduled", label: t.scheduledStatus },
    { id: "published", label: t.publishedStatus },
    { id: "draft", label: t.draftStatus },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesPlatform = selectedPlatform === "all" || (post.targetPlatforms && post.targetPlatforms.includes(selectedPlatform));
    const matchesStatus = selectedStatus === "all" || post.status === selectedStatus;
    return matchesPlatform && matchesStatus;
  });

  const getVideoById = (vidId: number) => {
    return videos.find((v) => v.id === vidId);
  };

  const platformColors: Record<string, string> = {
    twitter: "bg-slate-800 text-slate-200 border-slate-700",
    instagram: "bg-pink-950/60 text-pink-300 border-pink-500/30",
    tiktok: "bg-teal-950/60 text-teal-300 border-teal-500/30",
    linkedin: "bg-blue-950/60 text-blue-300 border-blue-500/30",
    youtube: "bg-red-950/60 text-red-300 border-red-500/30",
    facebook: "bg-blue-900/60 text-blue-300 border-blue-400/30",
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Top Banner */}
      <div className="bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>{lang === "ar" ? "جدولة ونشر تلقائي دقيق بالثانية مع التكرار اليومي" : "Precision publishing with recurring daily time slots"}</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            {t.schedulerTitle}
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            {t.schedulerSubtitle}
          </p>
        </div>

        <button
          onClick={onOpenNewPostModal}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 text-white shadow-lg shadow-indigo-500/25 active:scale-95 transition-all w-full md:w-auto justify-center"
        >
          <PlusCircle className="w-5 h-5 shrink-0" />
          <span>{t.createNewPost}</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900/90 p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          {/* Platform Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>{t.filterByPlatform}</span>
            </span>
            {platformFilterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedPlatform(opt.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedPlatform === opt.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700/60"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-400 mr-2">{t.filterByStatus}</span>
            {statusFilterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedStatus(opt.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedStatus === opt.id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700/60"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Posts Feed List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center bg-slate-900/30">
            <CalendarIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h4 className="text-base font-bold text-white">{lang === "ar" ? "لا توجد منشورات مطابقة لهذا الفلتر" : "No scheduled posts match this filter"}</h4>
            <p className="text-xs text-slate-400 mt-1">{lang === "ar" ? "اضغط على زر (إنشاء منشور / جدولة) للبدء في النشر أو التكرار اليومي" : "Click (Create / Schedule Post) above to schedule your daily posts"}</p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isPublished = post.status === "published";
            const isRecurring = post.isRecurring;
            const attachedVideo = post.attachedVideoId ? getVideoById(post.attachedVideoId) : null;

            return (
              <div
                key={post.id}
                className={`bg-slate-900/90 rounded-3xl border p-6 sm:p-8 shadow-xl transition-all duration-300 ${
                  isPublished
                    ? "border-slate-800 hover:border-emerald-500/40"
                    : isRecurring
                    ? "border-amber-500/30 hover:border-amber-500/50 bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-900"
                    : "border-slate-800 hover:border-indigo-500/40"
                }`}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  
                  {/* Left Column: Post details */}
                  <div className="space-y-4 flex-1">
                    
                    {/* Tags & Time */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                        isPublished
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : isRecurring
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                      }`}>
                        {isPublished ? <CheckCircle2 className="w-3.5 h-3.5" /> : isRecurring ? <Repeat className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        <span>
                          {isPublished
                            ? (lang === "ar" ? "تم النشر عبر الحسابات" : "Published across channels")
                            : isRecurring
                            ? (lang === "ar" ? "مجدول متكرر يومياً 🔄" : "Daily Recurring Schedule 🔄")
                            : (lang === "ar" ? "مجدول في قائمة الانتظار" : "Scheduled in Queue")}
                        </span>
                      </span>

                      {/* Display Multiple Times Per Day if recurring */}
                      {isRecurring && post.publishTimeSlots && post.publishTimeSlots.length > 0 && (
                        <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold font-mono flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>
                            {lang === "ar" ? "أوقات النشر اليومية: " : "Daily Times: "}
                            {post.publishTimeSlots.join(" • ")}
                          </span>
                        </span>
                      )}

                      <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {isPublished ? (lang === "ar" ? "نُشر في: " : "Published at: ") : (lang === "ar" ? "التاريخ: " : "Date: ")}
                          {new Date(post.scheduledFor).toLocaleString(lang === "ar" ? "ar-SA" : "en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </span>

                      {post.aiGenerated && (
                        <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>{lang === "ar" ? "صياغة الذكاء الاصطناعي" : "AI Copywriter"}</span>
                        </span>
                      )}
                    </div>

                    {/* Title & Body Content */}
                    <div>
                      <h3 className="text-lg font-bold text-white">{post.title}</h3>
                      <p className="text-sm text-slate-300 mt-2 whitespace-pre-line leading-relaxed max-w-4xl font-sans">
                        {post.content}
                      </p>
                    </div>

                    {/* Hashtags & Target Platforms */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800">
                      
                      {/* Target Platforms Badges */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-slate-400 font-semibold">{lang === "ar" ? "ينشر على:" : "Targets:"}</span>
                        {post.targetPlatforms?.map((plat: string) => {
                          const badgeColor = platformColors[plat] || "bg-slate-800 text-slate-200 border-slate-700";
                          return (
                            <span
                              key={plat}
                              className={`text-xs px-2.5 py-1 rounded-lg uppercase font-mono font-bold border ${badgeColor}`}
                            >
                              {plat === "twitter" ? "𝕏 Twitter" : plat === "instagram" ? "📸 Instagram" : plat === "tiktok" ? "🎵 TikTok" : plat === "linkedin" ? "💼 LinkedIn" : plat}
                            </span>
                          );
                        })}
                      </div>

                      {/* Hashtags */}
                      {post.hashtags && post.hashtags.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {post.hashtags.map((tag: string) => (
                            <span key={tag} className="text-xs text-indigo-400 font-medium font-mono">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                    </div>

                    {/* Published Analytics Section */}
                    {isPublished && post.analytics && (
                      <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl p-4 border border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <Eye className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs text-slate-400">{t.viewsMetric}</div>
                            <div className="text-base font-black text-white font-mono">
                              {(post.analytics.views || 0).toLocaleString(lang === "ar" ? "ar-SA" : "en-US")}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400">
                            <Heart className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs text-slate-400">{t.likesMetric}</div>
                            <div className="text-base font-black text-white font-mono">
                              {(post.analytics.likes || 0).toLocaleString(lang === "ar" ? "ar-SA" : "en-US")}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                            <MessageSquare className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs text-slate-400">{t.commentsSharesMetric}</div>
                            <div className="text-base font-black text-white font-mono">
                              {((post.analytics.comments || 0) + (post.analytics.shares || 0)).toLocaleString(lang === "ar" ? "ar-SA" : "en-US")}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <TrendingUp className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs text-slate-400">{t.engagementRateMetric}</div>
                            <div className="text-base font-black text-emerald-400 font-mono">
                              {post.analytics.engagementRate || 9.4}%
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Right Column: Attached Video Thumbnail + Action Buttons */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-4 w-full lg:w-60 shrink-0 border-t lg:border-t-0 lg:border-r border-slate-800 lg:pr-6 pt-4 lg:pt-0">
                    
                    {/* Video Attachment Card if any */}
                    {attachedVideo ? (
                      <div className="w-full bg-slate-950 rounded-2xl overflow-hidden border border-purple-500/30 relative group flex items-center gap-3 p-2">
                        <img
                          src={attachedVideo.thumbnailUrl}
                          alt={attachedVideo.title}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="overflow-hidden flex-1">
                          <div className="text-xs font-bold text-white line-clamp-1 flex items-center gap-1">
                            <Video className="w-3.5 h-3.5 text-purple-400" />
                            <span>{lang === "ar" ? "فيديو إعلاني مرفق" : "Attached AI Video"}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{attachedVideo.title}</div>
                          <div className="text-[10px] text-amber-300 font-mono mt-0.5">⭐ CTR: {attachedVideo.predictedCtr}%</div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full bg-slate-800/40 rounded-2xl p-3 border border-slate-700/50 text-center text-xs text-slate-400">
                        <span>📝 {lang === "ar" ? "منشور نصي / صورة" : "Text / Image Post"}</span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full">
                      {!isPublished && (
                        <button
                          onClick={() => onPublishNow(post.id)}
                          className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{t.publishNowBtn}</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (confirm(lang === "ar" ? "هل أنت متأكد من رغبتك في حذف هذا المنشور من التقويم؟" : "Are you sure you want to delete this post from calendar?")) {
                            onDeletePost(post.id);
                          }
                        }}
                        className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{t.deletePostBtn}</span>
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
