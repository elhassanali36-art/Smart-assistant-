"use client";

import React from "react";
import { 
  Sparkles, 
  Video, 
  PlusCircle, 
  Zap,
  Globe
} from "lucide-react";
import { Language, translations } from "@/lib/i18n";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenNewPostModal: () => void;
  lang: Language;
  onToggleLanguage: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenNewPostModal,
  lang,
  onToggleLanguage,
}: NavbarProps) {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("overview")}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-2 ring-white/10">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
                  {t.appTitle}
                </h1>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-semibold px-2 py-0.5 rounded-full border border-indigo-500/30">
                  {t.proBadge}
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-1">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Quick Stats & Tokens */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/60 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4" />
              <span>{t.serverOnline}</span>
            </div>

            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-300">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
              <span>{t.videoCredits}</span>
              <span className="text-white font-bold">850 / 1000</span>
            </div>
          </div>

          {/* Actions & Language Switcher CTA */}
          <div className="flex items-center gap-2.5">
            {/* Language Toggle Button */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all duration-200 shadow-sm"
              title="Change Language / تبديل اللغة"
            >
              <Globe className="w-4 h-4 text-indigo-400" />
              <span>{lang === "ar" ? "English 🇬🇧" : "عربي 🇸🇦"}</span>
            </button>

            <button
              onClick={() => setActiveTab("ai-videos")}
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm ${
                activeTab === "ai-videos"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-indigo-500/25 ring-2 ring-purple-400/50"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              }`}
            >
              <Video className="w-4 h-4 text-purple-400" />
              <span>{t.videoStudioTab}</span>
            </button>

            <button
              onClick={onOpenNewPostModal}
              className="flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/30 hover:opacity-95 active:scale-95 transition-all duration-200"
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              <span>{t.createNewPost}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
