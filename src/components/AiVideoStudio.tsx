"use client";

import React, { useState } from "react";
import {
  Video,
  Sparkles,
  Play,
  Share2,
  Clock,
  Layers,
  Volume2,
  Sliders,
  CheckCircle2,
  Loader2,
  Trash2,
  PlusCircle,
  Wand2
} from "lucide-react";
import { Language, translations } from "@/lib/i18n";

interface AiVideoStudioProps {
  videos: any[];
  onRefreshVideos: () => void;
  onSelectVideo: (video: any) => void;
  onDeleteVideo: (id: number) => void;
  onOpenScheduleWithVideo: (video: any) => void;
  lang: Language;
}

export default function AiVideoStudio({
  videos,
  onRefreshVideos,
  onSelectVideo,
  onDeleteVideo,
  onOpenScheduleWithVideo,
  lang,
}: AiVideoStudioProps) {
  const t = translations[lang];
  const [prompt, setPrompt] = useState("");
  const [productName, setProductName] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [style, setStyle] = useState("ugc_influencer");
  const [language, setLanguage] = useState(lang === "en" ? "en_us" : "ar_saudi");
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [durationSeconds, setDurationSeconds] = useState("30");
  const [voiceTone, setVoiceTone] = useState("enthusiastic");
  const [bgMusic, setBgMusic] = useState("upbeat_electronic");

  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [showForm, setShowForm] = useState(true);

  const styleOptions = [
    { id: "ugc_influencer", name: lang === "ar" ? "أناقة المؤثرين (UGC Influencer)" : "UGC Influencer Style", desc: lang === "ar" ? "لقطات واقعية وكأنها ترشيح شخصي صادق من مؤثر محلي، يحقق أعلى نسبة نقرات (CTR)." : "Authentic user-generated style, feeling like a genuine influencer recommendation with highest CTR.", icon: "📱", badge: lang === "ar" ? "الأعلى تحويلاً 🔥" : "High Converting 🔥" },
    { id: "luxury_promo", name: lang === "ar" ? "فخامة سينمائية (Luxury Cinematic)" : "Luxury Cinematic Promo", desc: lang === "ar" ? "إضاءة مخملية وتركيز على جودة وأناقة المنتج، مثالي للعطور والساعات والمجوهرات." : "Velvety studio lighting focusing on elegance and quality, ideal for watches, perfumes & jewelry.", icon: "💎", badge: lang === "ar" ? "فخم وأنيق ✨" : "Premium & Elegant ✨" },
    { id: "tech_showcase", name: lang === "ar" ? "استعراض تقني (Tech Showcase)" : "Tech & Gadget Showcase", desc: lang === "ar" ? "إبراز للميزات وحركات بصرية سريعة مع نصوص توضيحية للأجهزة والإلكترونيات." : "Fast-paced visual cuts highlighting tech features, specs and dynamic text overlays.", icon: "🎧", badge: lang === "ar" ? "عصري وسريع 🚀" : "Modern & Fast 🚀" },
    { id: "minimalist_ecommerce", name: lang === "ar" ? "بساطة المتاجر (Minimalist E-commerce)" : "Minimalist E-commerce", desc: lang === "ar" ? "خلفيات نظيفة وتركيز هادئ وجذاب للمنتج اليومي والقهوة والأطعمة والملابس." : "Clean backgrounds and calm focus on daily products, coffee, food & fashion items.", icon: "☕", badge: lang === "ar" ? "بسيط ومُركّز 🛍️" : "Clean & Focused 🛍️" },
    { id: "kinetic_typography", name: lang === "ar" ? "نصوص حركية (Kinetic Typography)" : "Kinetic Typography Flash", desc: lang === "ar" ? "إيقاع سريع مع كلمات متراكبة تتفاعل مع الموسيقى، ممتاز لتخفيضات نهاية الأسبوع." : "Rhythmic typography overlays dancing with upbeat music, perfect for flash weekend sales.", icon: "⚡", badge: lang === "ar" ? "للعروض العاجلة 🏷️" : "Flash Deals 🏷️" },
    { id: "3d_animation", name: lang === "ar" ? "تجسيد ثلاثي الأبعاد (3D Animation)" : "3D Digital Animation", desc: lang === "ar" ? "رسوم مبتكرة وحركات ديناميكية للتطبيقات والخدمات والمنتجات الرقمية الحديثة." : "Innovative dynamic renders and motion graphics for digital apps and tech services.", icon: "🌐", badge: lang === "ar" ? "إبداعي ومبتكر 🎨" : "Creative & 3D 🎨" },
  ];

  const languageOptions = [
    { id: "en_us", name: "🇺🇸 English (US International)", desc: lang === "ar" ? "للجمهور الدولي والعالمي في الحملات الشاملة" : "Fluent native English voiceover for global reach and international campaigns" },
    { id: "ar_saudi", name: "🇸🇦 اللهجة السعودية (Saudi Arabic)", desc: lang === "ar" ? "حماسي، عفوي، ومحبب للجمهور في المملكة والخليج" : "Enthusiastic, spontaneous Saudi dialect loved across KSA and Gulf" },
    { id: "ar_egyptian", name: "🇪🇬 اللهجة المصرية (Egyptian Arabic)", desc: lang === "ar" ? "حيوي، خفيف الظل، وسريع الانتشار والتفاعل" : "Vibrant, lighthearted and viral Egyptian dialect for high engagement" },
    { id: "ar_gulf", name: "🇦🇪 اللهجة الخليجية (Gulf Arabic)", desc: lang === "ar" ? "راقي، فخم، ويعكس الهيبة والثقة في التحدث" : "Sophisticated Gulf tone reflecting prestige and confidence" },
    { id: "ar_msa", name: "🌍 العربية الفصحى الحديثة (MSA)", desc: lang === "ar" ? "احترافي، رسمي، ومفهوم في جميع أنحاء الوطن العربي" : "Professional Modern Standard Arabic understood across the entire MENA region" },
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !prompt) return;

    setIsGenerating(true);
    setGenStep(1); // Analyzing prompt
    await new Promise((r) => setTimeout(r, 1000));
    setGenStep(2); // Writing script
    await new Promise((r) => setTimeout(r, 1200));
    setGenStep(3); // Generating video footage & audio
    await new Promise((r) => setTimeout(r, 1400));
    setGenStep(4); // Finalizing

    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          productName,
          productUrl,
          style,
          language,
          aspectRatio,
          durationSeconds: Number(durationSeconds),
          voiceTone,
          bgMusic,
        }),
      });

      if (res.ok) {
        const newVideo = await res.json();
        onRefreshVideos();
        setPrompt("");
        setProductName("");
        setProductUrl("");
        onSelectVideo(newVideo); // Open preview modal immediately!
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
      setGenStep(0);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-indigo-950/70 to-slate-900 rounded-3xl border border-purple-500/30 p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-3">
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === "ar" ? "محرك الفيديو الإعلاني الذكي (AI Video Ad Studio)" : "AI Video Ad Studio & Script Engine"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t.studioTitle}
          </h2>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
            {t.studioSubtitle}
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2 self-stretch md:self-center justify-center"
        >
          <PlusCircle className="w-5 h-5 shrink-0" />
          <span>{showForm ? t.hideFormBtn : t.newVideoBtn}</span>
        </button>
      </div>

      {/* AI Generator Form */}
      {showForm && (
        <form onSubmit={handleGenerate} className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-8 animate-in slide-in-from-top duration-300">
          
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>{t.step1ProductDetails}</span>
            </h3>
            <p className="text-slate-400 text-xs mt-1">{lang === "ar" ? "كلما كان الوصف دقيقاً، زادت قوة واحترافية السيناريو المُنتج" : "The more specific your description, the higher converting the AI script will be"}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-300 mb-2 block">{t.productNameLabel}</label>
              <input
                type="text"
                required
                placeholder={lang === "ar" ? "مثال: عطر العود الملكي (Royal Oud)" : "e.g. Royal Oud Perfume or SonicPro Headphones"}
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 mb-2 block">{t.productUrlLabel}</label>
              <input
                type="text"
                placeholder="https://saudistyle.store/oud"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm font-mono focus:outline-none focus:border-purple-500 text-left transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 mb-2 block">{t.promptDescriptionLabel}</label>
            <textarea
              required
              rows={3}
              placeholder={lang === "ar" ? "مثال: عطر فاخر برائحة العود الصافي والعنبر الطبيعي، ثبات يدوم 48 ساعة، مناسب للمناسبات الرسمية، مع التركيز على كود الخصم الحصري OUD50 والتوصيل السريع والمجاني." : "e.g. Luxury unisex perfume with authentic Oud and Amber notes, 48-hour lasting fragrance, ideal for special occasions with exclusive 50% discount code OUD50 and free express shipping."}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors leading-relaxed"
            />
          </div>

          {/* Style selection */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-300">{t.step2ChooseStyle}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {styleOptions.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setStyle(opt.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between gap-3 relative overflow-hidden ${
                    style === opt.id
                      ? "bg-purple-900/30 border-purple-500 ring-2 ring-purple-500/40 shadow-lg shadow-purple-500/10"
                      : "bg-slate-800/50 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-2xl">{opt.icon}</span>
                    <span className="text-[10px] bg-slate-900/80 px-2 py-0.5 rounded-full font-bold text-purple-300 border border-purple-500/30">
                      {opt.badge}
                    </span>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">{opt.name}</h5>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">{opt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Language & Dialect selection */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-300">{t.step3ChooseLanguage}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {languageOptions.map((langOpt) => (
                <div
                  key={langOpt.id}
                  onClick={() => setLanguage(langOpt.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    language === langOpt.id
                      ? "bg-indigo-900/30 border-indigo-500 text-white ring-2 ring-indigo-500/30"
                      : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <input
                    type="radio"
                    checked={language === langOpt.id}
                    onChange={() => setLanguage(langOpt.id)}
                    className="mt-1 accent-indigo-500"
                  />
                  <div>
                    <div className="text-sm font-bold">{langOpt.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{langOpt.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs: Aspect Ratio, Duration, Voice Tone */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
            <div>
              <label className="text-xs font-bold text-slate-300 mb-2 block flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-purple-400" />
                <span>{t.aspectRatioLabel}</span>
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="9:16">📱 {lang === "ar" ? "عمودي (9:16) - ريلز / تيك توك / شورتس" : "Vertical (9:16) - TikTok / Reels / Shorts"}</option>
                <option value="16:9">🖥️ {lang === "ar" ? "أفقي (16:9) - يوتيوب ومقاطع عريضة" : "Landscape (16:9) - YouTube & Wide Ads"}</option>
                <option value="1:1">⬛ {lang === "ar" ? "مربع (1:1) - إنستغرام وفيسبوك ادز" : "Square (1:1) - Instagram / Facebook Feed"}</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 mb-2 block flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>{t.durationLabel}</span>
              </label>
              <select
                value={durationSeconds}
                onChange={(e) => setDurationSeconds(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="15">⏱️ 15s ({lang === "ar" ? "سريع وإيقاعي للستوري" : "Fast-paced for story flash ads"})</option>
                <option value="30">⏱️ 30s ({lang === "ar" ? "المثالي للإعلانات الممولة" : "Optimal duration for paid campaigns"})</option>
                <option value="45">⏱️ 45s ({lang === "ar" ? "شرح تفصيلي للمنتج" : "In-depth product feature breakdown"})</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 mb-2 block flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-purple-400" />
                <span>{t.voiceToneLabel}</span>
              </label>
              <select
                value={voiceTone}
                onChange={(e) => setVoiceTone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="enthusiastic">🔥 {lang === "ar" ? "حماسي ومحفز للجمهور" : "Enthusiastic & Exciting"}</option>
                <option value="dramatic">🎬 {lang === "ar" ? "درامي جذاب ومؤثر" : "Dramatic & Emotional"}</option>
                <option value="professional">👔 {lang === "ar" ? "رسمي واحترافي موثوق" : "Professional & Trustworthy"}</option>
                <option value="friendly">🤝 {lang === "ar" ? "ودي وقريب للقلب (عفوي)" : "Friendly & Relatable (Casual)"}</option>
              </select>
            </div>
          </div>

          {/* Submit Generator Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-5 rounded-2xl font-black text-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:opacity-95 text-white shadow-2xl shadow-purple-500/30 flex items-center justify-center gap-3 disabled:opacity-50 transition-all cursor-pointer active:scale-98"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
                  <span>
                    {genStep === 1
                      ? (lang === "ar" ? "1/4 جاري تحليل وصف الحملة واختيار الكلمات المفتاحية..." : "1/4 Analyzing campaign prompt & selecting visual assets...")
                      : genStep === 2
                      ? (lang === "ar" ? "2/4 جاري كتابة السيناريو الترويجي باللهجة المختارة..." : "2/4 Drafting persuasive ad script in selected dialect...")
                      : genStep === 3
                      ? (lang === "ar" ? "3/4 جاري توليد المشاهد البصرية وتركيب التعليق الصوتي..." : "3/4 Creating dynamic footage & synthesizing voiceover...")
                      : (lang === "ar" ? "4/4 اللمسات الأخيرة... جاري حفظ الفيديو في الاستوديو 🎬" : "4/4 Finalizing video render... Saving to studio 🎬")}
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 text-amber-300 animate-bounce" />
                  <span>{t.generateVideoBtn}</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}

      {/* Generated Videos Gallery */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              <span>{t.readyVideosTitle} ({videos.length})</span>
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              {lang === "ar" ? "اضغط على أي فيديو لمعاينة المشاهد والسيناريو الكامل ونشره أو جدولته بالنيابة عنك" : "Click any video to preview scenes, voiceover script, and schedule it across your social accounts"}
            </p>
          </div>
          <span className="text-xs font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-xl self-start sm:self-center">
            {lang === "ar" ? "تحديث تلقائي للاستوديو ✨" : "Auto-Updating Studio ✨"}
          </span>
        </div>

        {videos.length === 0 ? (
          <div className="border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center bg-slate-900/30">
            <Video className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h4 className="text-base font-bold text-white">{t.noVideosYet}</h4>
            <p className="text-xs text-slate-400 mt-1">{lang === "ar" ? "استخدم النموذج بالأعلى لإنشاء أول إعلان بالذكاء الاصطناعي لمنتجك!" : "Use the form above to generate your first AI video advertisement!"}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="bg-slate-900/90 rounded-3xl border border-slate-800 hover:border-purple-500/50 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between group"
              >
                {/* Thumbnail Preview Banner */}
                <div
                  onClick={() => onSelectVideo(vid)}
                  className="relative aspect-[9/14] sm:aspect-square w-full overflow-hidden bg-slate-950 cursor-pointer"
                >
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-amber-300 border border-slate-700 shadow-lg">
                    ⭐ CTR: {vid.predictedCtr || 88}%
                  </div>
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-white font-mono uppercase">
                    {vid.aspectRatio || "9:16"}
                  </div>

                  {/* Bottom Duration */}
                  <div className="absolute bottom-3 right-3 bg-black/80 px-2.5 py-1 rounded-lg text-xs text-white font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-purple-400" />
                    <span>{vid.durationSeconds || 30}s</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-purple-600/80 px-2.5 py-1 rounded-lg text-[11px] text-white font-semibold">
                    {vid.language === "ar_saudi" ? "🇸🇦 سعودي" : vid.language === "ar_egyptian" ? "🇪🇬 مصري" : vid.language === "ar_gulf" ? "🇦🇪 خليجي" : vid.language === "en_us" ? "🇺🇸 English" : "🌍 فصحى"}
                  </div>
                </div>

                {/* Video Info Card */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4
                      onClick={() => onSelectVideo(vid)}
                      className="text-base font-bold text-white line-clamp-1 cursor-pointer hover:text-purple-400 transition-colors"
                    >
                      {vid.title}
                    </h4>
                    <p className="text-xs text-indigo-300 font-semibold mt-1 line-clamp-1">
                      🛍️ {vid.productName}
                    </p>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {vid.prompt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenScheduleWithVideo(vid)}
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white shadow-md flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{lang === "ar" ? "نشر أو جدولة 🚀" : "Schedule 🚀"}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(lang === "ar" ? "هل أنت متأكد من رغبتك في حذف هذا الفيديو الإعلاني؟" : "Are you sure you want to delete this ad video?")) {
                          onDeleteVideo(vid.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all"
                      title="Delete Video"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
