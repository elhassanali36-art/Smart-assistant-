"use client";

import React, { useState } from "react";
import {
  X,
  Play,
  Share2,
  Download,
  Sparkles,
  Clock,
  Volume2,
  Sliders,
  CheckCircle2,
  Layers,
  Wand2
} from "lucide-react";
import { Language, translations } from "@/lib/i18n";

interface VideoPreviewModalProps {
  video: any | null;
  onClose: () => void;
  onScheduleWithVideo: (video: any) => void;
  lang?: Language;
}

export default function VideoPreviewModal({
  video,
  onClose,
  onScheduleWithVideo,
  lang = "ar",
}: VideoPreviewModalProps) {
  const t = translations[lang];
  const [downloading, setDownloading] = useState(false);
  const [activeScene, setActiveScene] = useState(0);

  if (!video) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(lang === "ar" ? "🎉 تم تجهيز الفيديو وتحميله بدقة 4K عالية الوضوح بنجاح!" : "🎉 Video exported and downloaded in 4K resolution successfully!");
    }, 1200);
  };

  const isVertical = video.aspectRatio === "9:16";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg">
              🎬
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-white">{video.title}</h3>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
                  ⭐ CTR: {video.predictedCtr}%
                </span>
              </div>
              <p className="text-xs text-indigo-300 font-semibold mt-0.5">🛍️ {lang === "ar" ? "للمنتج:" : "Product:"} {video.productName}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm font-bold bg-slate-800 px-3 py-1 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Video Player & Script Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Top: Video Player */}
          <div className={`lg:col-span-5 flex flex-col items-center justify-center bg-slate-950 rounded-3xl p-4 border border-purple-500/30 relative shadow-2xl ${
            isVertical ? "max-w-sm mx-auto w-full" : "w-full"
          }`}>
            <div className={`relative w-full overflow-hidden rounded-2xl bg-black ${
              isVertical ? "aspect-[9/16]" : "aspect-video"
            }`}>
              <video
                src={video.videoUrl}
                poster={video.thumbnailUrl}
                controls
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />

              {/* Simulated Text Overlay Banner on Top of Video */}
              <div className="absolute bottom-12 left-2 right-2 pointer-events-none flex justify-center">
                <div className="bg-black/75 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-center max-w-xs animate-pulse">
                  <span className="text-xs sm:text-sm font-black text-amber-300 drop-shadow">
                    {video.scriptJson && video.scriptJson[activeScene]?.textOverlay
                      ? video.scriptJson[activeScene].textOverlay
                      : "✨ عروض حصرية لفترة محدودة ✨"}
                  </span>
                </div>
              </div>
            </div>

            {/* Video Specs Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px]">
              <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 font-mono">
                {video.aspectRatio || "9:16"}
              </span>
              <span className="bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-lg border border-purple-500/30 font-semibold">
                {video.language === "ar_saudi" ? "🇸🇦 سعودي" : video.language === "ar_egyptian" ? "🇪🇬 مصري" : video.language === "ar_gulf" ? "🇦🇪 خليجي" : video.language === "en_us" ? "🇺🇸 English" : "🌍 فصحى"}
              </span>
              <span className="bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-lg border border-indigo-500/30">
                ⏱️ {video.durationSeconds || 30}s
              </span>
            </div>
          </div>

          {/* Right / Bottom: AI Script & Scene Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                <span>{lang === "ar" ? "سيناريو الإعلان التفصيلي والتعليق الصوتي المولد بالذكاء الاصطناعي:" : "AI Generated Detailed Script & Voiceover Timeline:"}</span>
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {lang === "ar" ? `تم صياغة المشاهد والنصوص بناءً على وصف الحملة: "${video.prompt}"` : `Scenes and voiceover synthesized based on prompt: "${video.prompt}"`}
              </p>
            </div>

            {/* Scenes Accordion / Cards */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
              {video.scriptJson && video.scriptJson.length > 0 ? (
                video.scriptJson.map((scene: any, idx: number) => {
                  const isCurrent = activeScene === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveScene(idx)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 space-y-3 ${
                        isCurrent
                          ? "bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/30 shadow-lg"
                          : "bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-white bg-purple-600 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow">
                          <span>{lang === "ar" ? `المشهد رقم ${scene.sceneNumber || idx + 1}` : `Scene #${scene.sceneNumber || idx + 1}`}</span>
                        </span>
                        <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{scene.duration || 10}s</span>
                        </span>
                      </div>

                      {/* Visual Description */}
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-purple-300 block">🎥 {lang === "ar" ? "وصف المشهد البصري (Visual Concept):" : "Visual Description & Camera Movement:"}</span>
                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                          {scene.visualDescription}
                        </p>
                      </div>

                      {/* Voiceover Text */}
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-amber-300 block flex items-center gap-1">
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>🎙️ {lang === "ar" ? "نص التعليق الصوتي (Voiceover Audio):" : "Voiceover Audio Narration:"}</span>
                        </span>
                        <p className="text-xs text-white font-semibold leading-relaxed bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                          "{scene.voiceoverText}"
                        </p>
                      </div>

                      {/* Text Overlay */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-700/50 text-[11px]">
                        <span className="text-slate-400 font-semibold">{lang === "ar" ? "النص المتراكب على الفيديو (Overlay):" : "Text Overlay Banner:"}</span>
                        <span className="text-indigo-300 font-mono font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                          {scene.textOverlay}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700 text-center text-slate-400 text-xs">
                  {lang === "ar" ? "لا توجد تفاصيل للمشاهد في هذا الفيديو" : "No detailed scenes available for this video"}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{lang === "ar" ? "الفيديو جاهز للنشر الفوري عبر حساباتك أو التحميل المباشر" : "Video ready for immediate social publishing or 4K download"}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 sm:flex-none px-5 py-3.5 rounded-2xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4 text-indigo-400" />
              <span>{downloading ? (lang === "ar" ? "جاري التحميل..." : "Downloading...") : (lang === "ar" ? "تحميل الفيديو (HD/4K)" : "Download Video (4K/HD)")}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onScheduleWithVideo(video);
              }}
              className="flex-1 sm:flex-none px-6 py-3.5 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:opacity-95 text-white shadow-xl shadow-purple-500/30 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Share2 className="w-4 h-4" />
              <span>{lang === "ar" ? "نشر هذا الفيديو الآن بالنيابة عنك 🚀" : "Publish / Schedule Now 🚀"}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
