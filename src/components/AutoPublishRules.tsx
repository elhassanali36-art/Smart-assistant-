"use client";

import React, { useState } from "react";
import {
  Zap,
  Plus,
  Trash2,
  Clock,
  Video,
  CheckCircle2,
  AlertCircle,
  Layers,
  Wand2
} from "lucide-react";
import { Language, translations } from "@/lib/i18n";

interface AutoPublishRulesProps {
  rules: any[];
  onRefreshRules: () => void;
  onToggleRuleActive: (id: number, currentStatus: boolean) => void;
  onDeleteRule: (id: number) => void;
  lang: Language;
}

export default function AutoPublishRules({
  rules,
  onRefreshRules,
  onToggleRuleActive,
  onDeleteRule,
  lang,
}: AutoPublishRulesProps) {
  const t = translations[lang];
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [promptTemplate, setPromptTemplate] = useState("");
  const [scheduleType, setScheduleType] = useState("daily");
  const [timeSlots, setTimeSlots] = useState<string[]>(["09:00", "15:00"]);
  const [includeAiVideo, setIncludeAiVideo] = useState(true);
  const [videoStyle, setVideoStyle] = useState("ugc_influencer");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram", "tiktok", "twitter"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const platformsList = [
    { id: "twitter", label: "𝕏 Twitter" },
    { id: "instagram", label: "📸 Instagram" },
    { id: "tiktok", label: "🎵 TikTok" },
    { id: "linkedin", label: "💼 LinkedIn" },
    { id: "youtube", label: "▶️ YouTube" },
    { id: "facebook", label: "📘 Facebook" },
  ];

  const handleTogglePlatform = (platId: string) => {
    if (selectedPlatforms.includes(platId)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platId]);
    }
  };

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, "18:00"]);
  };

  const handleTimeChange = (index: number, val: string) => {
    const next = [...timeSlots];
    next[index] = val;
    setTimeSlots(next);
  };

  const handleRemoveTimeSlot = (index: number) => {
    if (timeSlots.length <= 1) return;
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !promptTemplate || selectedPlatforms.length === 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          promptTemplate,
          targetPlatforms: selectedPlatforms,
          scheduleType,
          timeOfDay: timeSlots[0] || "14:00",
          publishTimeSlots: timeSlots,
          ruleLanguage: lang,
          includeAiVideo,
          videoStyle: includeAiVideo ? videoStyle : null,
        }),
      });

      if (res.ok) {
        onRefreshRules();
        setShowAddForm(false);
        setName("");
        setPromptTemplate("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Top Header */}
      <div className="bg-gradient-to-r from-amber-950/70 via-indigo-950/70 to-slate-900 rounded-3xl border border-amber-500/30 p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            <span>{lang === "ar" ? "نظام الأتمتة الكاملة والنشر التلقائي الأوتوماتيكي المتكرر" : "24/7 Automated Recurring AI Publishing Engine"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t.rulesTitle}
          </h2>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
            {t.rulesSubtitle}
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:opacity-95 text-white shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2 self-stretch md:self-center justify-center"
        >
          <Plus className="w-5 h-5 shrink-0" />
          <span>{showAddForm ? (lang === "ar" ? "إخفاء نموذج الإضافة ▲" : "Hide Add Form ▲") : t.addRuleBtn}</span>
        </button>
      </div>

      {/* Add New Rule Form */}
      {showAddForm && (
        <form onSubmit={handleCreateRule} className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 animate-in slide-in-from-top duration-300">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-amber-400" />
              <span>{lang === "ar" ? "إعداد قاعدة نشر تلقائي متكرر جديدة" : "Configure New Recurring Automation Workflow"}</span>
            </h3>
            <p className="text-slate-400 text-xs mt-1">{lang === "ar" ? "حدد القالب الترويجي، المنصات، وأوقات النشر اليومية المتكررة" : "Define prompt template, target platforms, and daily frequency slots"}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-300 mb-2 block">{t.ruleNameLabel}</label>
              <input
                type="text"
                required
                placeholder={lang === "ar" ? "مثال: النشر الصباحي والمسائي لعروض المتجر على تيك توك" : "e.g. Daily Morning & Evening Flash Sale Ads"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 mb-2 block">{t.scheduleRepetition}</label>
              <select
                value={scheduleType}
                onChange={(e) => setScheduleType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
              >
                <option value="daily">🔄 {t.freqDaily}</option>
                <option value="weekly">📅 {t.freqWeekly}</option>
                <option value="monthly">🗓️ {t.freqMonthly}</option>
              </select>
            </div>
          </div>

          {/* Multiple Times Per Day selection */}
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{t.multipleTimesPerDayLabel}</span>
              </label>
              <button
                type="button"
                onClick={handleAddTimeSlot}
                className="text-xs font-extrabold text-amber-300 hover:text-white bg-amber-500/20 border border-amber-500/40 px-3 py-1.5 rounded-xl transition-all"
              >
                {t.addTimeSlotBtn}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {timeSlots.map((timeVal, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-slate-900 p-2 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 font-mono shrink-0">#{idx + 1}:</span>
                  <input
                    type="time"
                    value={timeVal}
                    onChange={(e) => handleTimeChange(idx, e.target.value)}
                    className="w-full bg-transparent text-white text-xs font-mono font-bold focus:outline-none text-center"
                  />
                  {timeSlots.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTimeSlot(idx)}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Remove"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 mb-2 block">{t.promptTemplateLabel}</label>
            <textarea
              required
              rows={3}
              placeholder={lang === "ar" ? "مثال: اكتب منشور تسويقي حماسي وجذاب بأسلوب المؤثرين لترويج عروضنا اليومية مع تضمين كود الخصم ورابط المتجر." : "e.g. Write a persuasive influencer-style marketing post promoting our daily flash sales with discount code and store URL."}
              value={promptTemplate}
              onChange={(e) => setPromptTemplate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 leading-relaxed"
            />
          </div>

          {/* Platforms Checkboxes */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold text-slate-300 block">{t.targetPlatformsLabel}</label>
            <div className="flex flex-wrap gap-3">
              {platformsList.map((plat) => (
                <button
                  type="button"
                  key={plat.id}
                  onClick={() => handleTogglePlatform(plat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                    selectedPlatforms.includes(plat.id)
                      ? "bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-500/20"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                  }`}
                >
                  <span>{selectedPlatforms.includes(plat.id) ? "☑" : "☐"}</span>
                  <span>{plat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Video Ad Toggle */}
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.generateVideoWithRule}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{lang === "ar" ? "سيقوم الموقع تلقائياً بصناعة فيديو إعلاني قصير وإرفاقه بالمنشور المجدول في كل مرة" : "The platform will automatically synthesize a fresh ad video for every recurring run"}</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={includeAiVideo}
                onChange={(e) => setIncludeAiVideo(e.target.checked)}
                className="w-6 h-6 rounded accent-amber-500 cursor-pointer"
              />
            </div>

            {includeAiVideo && (
              <div className="pt-3 border-t border-slate-700/60 flex items-center gap-4">
                <span className="text-xs font-bold text-slate-300">{lang === "ar" ? "اختر نمط الفيديو المولد تلقائياً:" : "Choose Auto-Generated Video Style:"}</span>
                <select
                  value={videoStyle}
                  onChange={(e) => setVideoStyle(e.target.value)}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-amber-500"
                >
                  <option value="ugc_influencer">📱 {lang === "ar" ? "أسلوب المؤثرين (UGC Influencer)" : "UGC Influencer Style"}</option>
                  <option value="luxury_promo">💎 {lang === "ar" ? "فخامة سينمائية (Luxury Promo)" : "Luxury Cinematic Promo"}</option>
                  <option value="tech_showcase">🎧 {lang === "ar" ? "استعراض تقني حديث (Tech Showcase)" : "Tech Showcase Style"}</option>
                  <option value="minimalist_ecommerce">☕ {lang === "ar" ? "بساطة المتاجر (Minimalist E-commerce)" : "Minimalist E-commerce"}</option>
                </select>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:opacity-95 text-white shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
            >
              <Zap className="w-5 h-5 fill-white shrink-0" />
              <span>{isSubmitting ? (lang === "ar" ? "جاري حفظ قاعدة الأتمتة..." : "Saving Automation Rule...") : t.activateRuleBtn}</span>
            </button>
          </div>
        </form>
      )}

      {/* Rules List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <span>{t.activeRulesCount} ({rules.length})</span>
        </h3>

        {rules.length === 0 ? (
          <div className="border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center bg-slate-900/30">
            <Zap className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h4 className="text-base font-bold text-white">{t.noRulesYet}</h4>
            <p className="text-xs text-slate-400 mt-1">{lang === "ar" ? "اضغط على زر الإضافة بالأعلى لإنشاء أول قاعدة أتمتة ذكية بالنيابة عنك" : "Click the add button above to build your first AI recurring workflow"}</p>
          </div>
        ) : (
          rules.map((rule) => {
            const isActive = rule.isActive;
            const slots = rule.publishTimeSlots || [rule.timeOfDay || "14:00"];
            return (
              <div
                key={rule.id}
                className={`bg-slate-900/90 rounded-3xl border p-6 shadow-xl transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                  isActive ? "border-amber-500/30 hover:border-amber-500/60" : "border-slate-800 opacity-70"
                }`}
              >
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                      isActive ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-slate-800 text-slate-400 border border-slate-700"
                    }`}>
                      {isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      <span>{isActive ? (lang === "ar" ? "الأتمتة تعمل بانتظام 🔄" : "Active & Recurring 🔄") : (lang === "ar" ? "متوقف مؤقتاً" : "Paused")}</span>
                    </span>

                    <span className="bg-slate-800 text-amber-300 px-3 py-1 rounded-full text-xs font-mono font-bold border border-slate-700 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {rule.scheduleType === "daily" ? (lang === "ar" ? "يومي" : "Daily") : rule.scheduleType === "weekly" ? (lang === "ar" ? "أسبوعي" : "Weekly") : "Monthly"} - {lang === "ar" ? "أوقات: " : "Slots: "} {slots.join(" • ")}
                      </span>
                    </span>

                    {rule.includeAiVideo && (
                      <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-bold border border-purple-500/30 flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        <span>AI Video ({rule.videoStyle === "ugc_influencer" ? "UGC" : "Luxury"})</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-white">{rule.name}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-3xl font-mono bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                    "{rule.promptTemplate}"
                  </p>

                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    <span className="text-xs text-slate-400 font-semibold">{lang === "ar" ? "ينشر على:" : "Targets:"}</span>
                    {rule.targetPlatforms?.map((plat: string) => (
                      <span key={plat} className="text-xs px-2.5 py-0.5 rounded uppercase font-mono font-bold bg-slate-800 text-slate-200 border border-slate-700">
                        {plat === "twitter" ? "𝕏 Twitter" : plat === "instagram" ? "📸 Instagram" : plat === "tiktok" ? "🎵 TikTok" : plat === "linkedin" ? "💼 LinkedIn" : plat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-stretch md:self-center shrink-0">
                  <button
                    onClick={() => onToggleRuleActive(rule.id, rule.isActive)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                      isActive
                        ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30"
                        : "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30"
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{isActive ? t.pauseRuleBtn : t.resumeRuleBtn}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(lang === "ar" ? "هل أنت متأكد من رغبتك في حذف قاعدة الأتمتة هذه؟" : "Are you sure you want to delete this automation rule?")) {
                        onDeleteRule(rule.id);
                      }
                    }}
                    className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
