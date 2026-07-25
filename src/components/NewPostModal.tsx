"use client";

import React, { useState } from "react";
import {
  X,
  Sparkles,
  Send,
  Clock,
  Video,
  Check,
  Wand2,
  Calendar,
  Share2,
  Loader2,
  FileText,
  Repeat,
  Plus
} from "lucide-react";
import { Language, translations } from "@/lib/i18n";

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: any[];
  videos: any[];
  onRefreshPosts: () => void;
  initialSelectedVideo?: any;
  lang: Language;
}

export default function NewPostModal({
  isOpen,
  onClose,
  accounts,
  videos,
  onRefreshPosts,
  initialSelectedVideo,
  lang,
}: NewPostModalProps) {
  const t = translations[lang];
  const connectedAccounts = accounts.filter((a) => a.status === "connected");
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>(
    connectedAccounts.map((a) => a.platform)
  );

  const [title, setTitle] = useState(initialSelectedVideo ? (lang === "ar" ? `إطلاق إعلان: ${initialSelectedVideo.productName} 🎬` : `Ad Launch: ${initialSelectedVideo.productName} 🎬`) : "");
  const [content, setContent] = useState(initialSelectedVideo ? (lang === "ar" ? `شاهدوا إعلاننا الجديد لـ ${initialSelectedVideo.productName}! 🔥✨\nاطلب الآن واستفد من العروض الحصرية.\n#عروض #ترند #اكسبلور` : `Check out our brand new ad for ${initialSelectedVideo.productName}! 🔥✨\nOrder now and enjoy exclusive deals.\n#Trending #Deals #Explore`) : "");
  const [hashtags, setHashtags] = useState<string[]>(initialSelectedVideo ? (lang === "ar" ? ["#عروض", "#ترند", "#اكسبلور", "#أناقة"] : ["#Deals", "#Trending", "#Explore", "#Fashion"]) : []);
  const [attachedVideoId, setAttachedVideoId] = useState<number | null>(
    initialSelectedVideo ? initialSelectedVideo.id : null
  );

  const [publishMode, setPublishMode] = useState<"now" | "schedule" | "recurring" | "draft">("recurring");
  const [scheduledDate, setScheduledDate] = useState(() => {
    const tmr = new Date();
    return tmr.toISOString().slice(0, 10);
  });
  const [scheduledTime, setScheduledTime] = useState("14:00");

  // Recurring specific state
  const [recurrenceFreq, setRecurrenceFreq] = useState("daily");
  const [timeSlots, setTimeSlots] = useState<string[]>(["09:00", "14:30", "20:00"]);
  const [endDate, setEndDate] = useState("");

  // AI Copywriter states
  const [aiTopic, setAiTopic] = useState("");
  const [aiTone, setAiTone] = useState(lang === "ar" ? "حماسي" : "Enthusiastic");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleToggleAccount = (platform: string) => {
    if (selectedAccounts.includes(platform)) {
      setSelectedAccounts(selectedAccounts.filter((p) => p !== platform));
    } else {
      setSelectedAccounts([...selectedAccounts, platform]);
    }
  };

  const handleSelectAll = () => {
    if (selectedAccounts.length === connectedAccounts.length) {
      setSelectedAccounts([]);
    } else {
      setSelectedAccounts(connectedAccounts.map((a) => a.platform));
    }
  };

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, "18:00"]);
  };

  const handleTimeChange = (idx: number, val: string) => {
    const next = [...timeSlots];
    next[idx] = val;
    setTimeSlots(next);
  };

  const handleRemoveTimeSlot = (idx: number) => {
    if (timeSlots.length <= 1) return;
    setTimeSlots(timeSlots.filter((_, i) => i !== idx));
  };

  const handleAiGenerateCopy = async () => {
    if (!aiTopic) return;
    setIsAiGenerating(true);
    try {
      const res = await fetch("/api/ai-writer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: aiTopic,
          tone: aiTone,
          platform: selectedAccounts[0] || "instagram",
          language: lang,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.title) setTitle(data.title);
        if (data.content) setContent(data.content);
        if (data.hashtags) setHashtags(data.hashtags);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || selectedAccounts.length === 0) {
      alert(lang === "ar" ? "الرجاء إدخال العنوان والمحتوى واختيار حساب واحد على الأقل للنشر" : "Please enter title, content, and select at least one target account");
      return;
    }

    setIsSubmitting(true);
    try {
      const isNow = publishMode === "now";
      const isRecur = publishMode === "recurring";
      const scheduledDateTime = new Date(`${scheduledDate}T${isRecur ? timeSlots[0] || "09:00" : scheduledTime}:00`);

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          targetPlatforms: selectedAccounts,
          attachedVideoId,
          status: isNow ? "published" : publishMode === "draft" ? "draft" : "scheduled",
          scheduledFor: isNow ? new Date() : scheduledDateTime,
          aiGenerated: true,
          aiPrompt: aiTopic || (lang === "ar" ? "تم التصميم عبر بوستك الذكي" : "Created with Postik AI"),
          hashtags,
          isRecurring: isRecur,
          recurrenceFrequency: isRecur ? recurrenceFreq : "none",
          publishTimeSlots: isRecur ? timeSlots : [scheduledTime],
          recurrenceEndDate: isRecur && endDate ? new Date(endDate) : null,
          postLanguage: lang,
        }),
      });

      if (res.ok) {
        onRefreshPosts();
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const platformIcons: Record<string, string> = {
    twitter: "𝕏 Twitter",
    instagram: "📸 Instagram",
    tiktok: "🎵 TikTok",
    linkedin: "💼 LinkedIn",
    youtube: "▶️ YouTube",
    facebook: "📘 Facebook",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/25">
              ✨
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{t.modalTitle}</h3>
              <p className="text-xs text-slate-400">{t.modalSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm font-bold bg-slate-800 px-3 py-1 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Step 1: Target Accounts */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-indigo-400" />
                <span>{t.selectTargetAccounts}</span>
              </label>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-xs font-bold text-indigo-400 hover:text-indigo-300"
              >
                {selectedAccounts.length === connectedAccounts.length
                  ? (lang === "ar" ? "إلغاء تحديد الكل" : "Deselect All")
                  : (lang === "ar" ? "تحديد جميع الحسابات" : "Select All")}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {connectedAccounts.map((acc) => {
                const isSelected = selectedAccounts.includes(acc.platform);
                return (
                  <div
                    key={acc.id}
                    onClick={() => handleToggleAccount(acc.platform)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      isSelected
                        ? "bg-indigo-900/40 border-indigo-500 text-white ring-2 ring-indigo-500/30"
                        : "bg-slate-800/60 border-slate-700/80 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isSelected ? "bg-indigo-500 text-white" : "bg-slate-700 text-transparent"
                    }`}>
                      ✓
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold line-clamp-1 text-white">{acc.accountName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {platformIcons[acc.platform] || acc.platform}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: AI Copywriter Box */}
          <div className="bg-gradient-to-r from-purple-950/50 to-indigo-950/50 rounded-2xl p-4 border border-purple-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <Wand2 className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>{t.aiWriterTitle}</span>
              </span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">
                {t.aiWriterSub}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder={t.aiTopicPlaceholder}
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900/80 border border-purple-500/40 text-white text-xs focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <select
                  value={aiTone}
                  onChange={(e) => setAiTone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900/80 border border-purple-500/40 text-white text-xs font-bold focus:outline-none focus:border-purple-400"
                >
                  {lang === "ar" ? (
                    <>
                      <option value="حماسي">🔥 نبرة حماسية وترويجية</option>
                      <option value="رسمي">👔 نبرة رسمية واحترافية</option>
                      <option value="فكاهي">😄 نبرة خفيفة وحيوية</option>
                    </>
                  ) : (
                    <>
                      <option value="Enthusiastic">🔥 Enthusiastic & Engaging</option>
                      <option value="Professional">👔 Professional & Formal</option>
                      <option value="Humorous">😄 Fun & Casual Tone</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAiGenerateCopy}
              disabled={isAiGenerating || !aiTopic}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white shadow-md flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
            >
              {isAiGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>{t.aiGeneratingBtn}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{t.aiGenerateBtn}</span>
                </>
              )}
            </button>
          </div>

          {/* Step 3: Title & Content fields */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <div>
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">{t.postTitleLabel}</label>
              <input
                type="text"
                required
                placeholder={lang === "ar" ? "مثال: إطلاق أكبر تشكيلة عطور لفصل الخريف والشتاء 👑✨" : "e.g. Launching our biggest Winter Fragrance Collection 👑✨"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">{t.postContentLabel}</label>
              <textarea
                required
                rows={4}
                placeholder={lang === "ar" ? "اكتب هنا محتوى المنشور، الروابط، وأكواد الخصم..." : "Write post text, links, discount codes and details here..."}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
              />
            </div>

            {/* Hashtags preview */}
            {hashtags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-400">{lang === "ar" ? "الهاشتاقات المرفقة:" : "Attached Hashtags:"}</span>
                {hashtags.map((tag) => (
                  <span key={tag} className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded font-mono font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Step 4: Attach AI Video from Studio */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Video className="w-4 h-4 text-purple-400" />
                <span>{t.attachVideoLabel}</span>
              </span>
              {attachedVideoId && (
                <button
                  type="button"
                  onClick={() => setAttachedVideoId(null)}
                  className="text-xs font-bold text-red-400 hover:text-red-300"
                >
                  {lang === "ar" ? "إلغاء الإرفاق" : "Remove Video"}
                </button>
              )}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
              {videos.map((vid) => {
                const isSelected = attachedVideoId === vid.id;
                return (
                  <div
                    key={vid.id}
                    onClick={() => setAttachedVideoId(isSelected ? null : vid.id)}
                    className={`p-2.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      isSelected
                        ? "bg-purple-900/40 border-purple-500 text-white ring-2 ring-purple-500/30"
                        : "bg-slate-800/50 border-slate-700/80 text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="overflow-hidden flex-1">
                      <div className="text-xs font-bold line-clamp-1">{vid.title}</div>
                      <div className="text-[10px] text-purple-300 mt-0.5">⭐ CTR: {vid.predictedCtr}%</div>
                    </div>
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected ? "bg-purple-500 text-white" : "bg-slate-700 text-transparent"
                    }`}>
                      ✓
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 5: Publishing & Recurring Mode */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <label className="text-xs font-bold text-slate-300 block">{t.publishModeLabel}</label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div
                onClick={() => setPublishMode("recurring")}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                  publishMode === "recurring"
                    ? "bg-amber-600/20 border-amber-500 text-amber-300 ring-2 ring-amber-500/30 font-bold shadow-lg"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600"
                }`}
              >
                <input type="radio" checked={publishMode === "recurring"} readOnly className="accent-amber-500" />
                <div>
                  <div className="text-xs font-bold">{t.modeRecurring}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{lang === "ar" ? "تكرار يومي بعدة أوقات في اليوم" : "Repeat daily at multiple time slots"}</div>
                </div>
              </div>

              <div
                onClick={() => setPublishMode("now")}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                  publishMode === "now"
                    ? "bg-emerald-600/20 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/30 font-bold"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600"
                }`}
              >
                <input type="radio" checked={publishMode === "now"} readOnly className="accent-emerald-500" />
                <div>
                  <div className="text-xs font-bold">{t.modeNow}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{lang === "ar" ? "توصيل فوري لجميع الحسابات" : "Broadcast immediately"}</div>
                </div>
              </div>

              <div
                onClick={() => setPublishMode("schedule")}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                  publishMode === "schedule"
                    ? "bg-indigo-600/20 border-indigo-500 text-indigo-300 ring-2 ring-indigo-500/30 font-bold"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600"
                }`}
              >
                <input type="radio" checked={publishMode === "schedule"} readOnly className="accent-indigo-500" />
                <div>
                  <div className="text-xs font-bold">{t.modeSchedule}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{lang === "ar" ? "تحديد تاريخ وساعة لمرة واحدة" : "One-time future slot"}</div>
                </div>
              </div>

              <div
                onClick={() => setPublishMode("draft")}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                  publishMode === "draft"
                    ? "bg-purple-600/20 border-purple-500 text-purple-300 ring-2 ring-purple-500/30 font-bold"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600"
                }`}
              >
                <input type="radio" checked={publishMode === "draft"} readOnly className="accent-purple-500" />
                <div>
                  <div className="text-xs font-bold">{t.modeDraft}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{lang === "ar" ? "للمراجعة والتعديل لاحقاً" : "Save for review"}</div>
                </div>
              </div>
            </div>

            {/* Recurring Daily Multi-Slot Settings Box */}
            {publishMode === "recurring" && (
              <div className="bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 p-5 rounded-3xl border border-amber-500/40 space-y-5 shadow-xl animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Repeat className="w-5 h-5 text-amber-400" />
                    <span className="text-sm font-bold text-white">{t.recurringFreqLabel}</span>
                  </div>
                  <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-bold">
                    ✨ {lang === "ar" ? "جدولة يومية بأوقات متعددة" : "Multi-Time Daily Schedules"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block font-semibold">{t.recurringFreqLabel}</label>
                    <select
                      value={recurrenceFreq}
                      onChange={(e) => setRecurrenceFreq(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-amber-500"
                    >
                      <option value="daily">{t.freqDaily}</option>
                      <option value="workdays">{t.freqWorkdays}</option>
                      <option value="weekly">{t.freqWeekly}</option>
                      <option value="monthly">{t.freqMonthly}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 mb-1 block font-semibold">{t.scheduledDateLabel} ({lang === "ar" ? "تاريخ البدء" : "Start Date"}):</label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500 text-center"
                    />
                  </div>
                </div>

                {/* Multiple time slots per day builder! */}
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>{t.multipleTimesPerDayLabel}</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAddTimeSlot}
                      className="text-xs font-extrabold text-amber-300 hover:text-white bg-amber-500/20 border border-amber-500/40 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{t.addTimeSlotBtn}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {timeSlots.map((timeVal, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 bg-slate-950 p-2.5 rounded-xl border border-amber-500/30 shadow-md">
                        <span className="text-xs text-amber-400 font-mono font-bold shrink-0">#{idx + 1}:</span>
                        <input
                          type="time"
                          value={timeVal}
                          onChange={(e) => handleTimeChange(idx, e.target.value)}
                          className="w-full bg-transparent text-white text-sm font-mono font-black focus:outline-none text-center"
                        />
                        {timeSlots.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveTimeSlot(idx)}
                            className="text-red-400 hover:text-red-300 p-1 font-bold"
                            title="Remove Slot"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {lang === "ar" ? "سيقوم الموقع بنشر هذا المنشور تلقائياً كل يوم عند حلول كل وقت من هذه الأوقات المحددة!" : "The platform will automatically publish this post every day at each of these specified time slots!"}
                  </p>
                </div>

                {/* Optional End Date */}
                <div className="pt-2 border-t border-slate-800">
                  <label className="text-xs text-slate-400 mb-1 block font-semibold">{t.endDateLabel}</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full sm:w-1/2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500 text-center"
                  />
                  {!endDate && <span className="text-[11px] text-emerald-400 font-bold ml-2 block mt-1">✨ {t.noEndDate}</span>}
                </div>
              </div>
            )}

            {/* Simple One-time schedule box */}
            {publishMode === "schedule" && (
              <div className="grid grid-cols-2 gap-4 pt-2 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block font-semibold">{t.scheduledDateLabel}</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500 text-center"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 mb-1 block font-semibold">{t.scheduledTimeLabel}</label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-indigo-500 text-center"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              {lang === "ar" ? "إلغاء" : "Cancel"}
            </button>

            <button
              type="submit"
              disabled={isSubmitting || selectedAccounts.length === 0}
              className={`flex-1 py-3.5 rounded-2xl font-extrabold text-base text-white shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-all ${
                publishMode === "now"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/25"
                  : publishMode === "recurring"
                  ? "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:opacity-95 shadow-amber-500/25"
                  : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 shadow-indigo-500/25"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{lang === "ar" ? "جاري حفظ الأوامر وتنفيذ الجدولة..." : "Saving & Processing Schedule..."}</span>
                </>
              ) : publishMode === "now" ? (
                <>
                  <Send className="w-5 h-5 shrink-0" />
                  <span>{t.submitPostNow}</span>
                </>
              ) : publishMode === "recurring" ? (
                <>
                  <Repeat className="w-5 h-5 shrink-0" />
                  <span>{t.submitPostRecurring}</span>
                </>
              ) : publishMode === "schedule" ? (
                <>
                  <Clock className="w-5 h-5 shrink-0" />
                  <span>{t.submitPostSchedule}</span>
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 shrink-0" />
                  <span>{t.submitPostDraft}</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
