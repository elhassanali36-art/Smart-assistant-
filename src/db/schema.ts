import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";

// 1. حسابات التواصل الاجتماعي المربوطة بالموقع (Social Accounts)
export const socialAccounts = pgTable("social_accounts", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(), // 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'threads'
  accountName: text("account_name").notNull(),
  username: text("username").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  followerCount: integer("follower_count").default(0),
  status: text("status").notNull().default("connected"), // 'connected' | 'paused' | 'error' | 'disconnected'
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  autoPublishEnabled: boolean("auto_publish_enabled").default(true),
  platformCategory: text("platform_category").default("social"), // 'video' | 'text' | 'business'
  permissions: jsonb("permissions").$type<string[]>().default(["read", "write", "video_upload", "analytics"]),
  lastSyncAt: timestamp("last_sync_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// 2. المنشورات (المجدولة، المنشورة، والمسودات) مع تحليلات التفاعل
export const scheduledPosts = pgTable("scheduled_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  mediaUrls: jsonb("media_urls").$type<string[]>().default([]), // صور أو فيديوهات مرفقة
  attachedVideoId: integer("attached_video_id"), // ربط بفيديو إعلاني تم إنشاؤه بالذكاء الاصطناعي
  targetPlatforms: jsonb("target_platforms").$type<string[]>().notNull(), // منصات النشر ['twitter', 'linkedin', 'tiktok', etc.]
  scheduledFor: timestamp("scheduled_for").notNull(),
  status: text("status").notNull().default("scheduled"), // 'draft' | 'scheduled' | 'publishing' | 'published' | 'failed'
  aiGenerated: boolean("ai_generated").default(false),
  aiPrompt: text("ai_prompt"),
  hashtags: jsonb("hashtags").$type<string[]>().default([]),
  analytics: jsonb("analytics").$type<{
    views: number;
    likes: number;
    comments: number;
    shares: number;
    clicks: number;
    engagementRate: number;
  }>().default({
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    clicks: 0,
    engagementRate: 0,
  }),
  publishedAt: timestamp("published_at"),
  isRecurring: boolean("is_recurring").default(false), // هل هذا منشور متكرر يومياً / أسبوعياً
  recurrenceFrequency: text("recurrence_frequency").default("none"), // 'daily' | 'weekly' | 'monthly' | 'workdays' | 'none'
  publishTimeSlots: jsonb("publish_time_slots").$type<string[]>().default([]), // أوقات النشر المتعددة في اليوم مثلاً ["09:00", "14:30", "21:00"]
  recurrenceEndDate: timestamp("recurrence_end_date"), // تاريخ انتهاء التكرار (أو لا نهائي إذا كان فارغاً)
  postLanguage: text("post_language").default("ar"), // 'ar' | 'en'
  createdAt: timestamp("created_at").defaultNow(),
});

// 3. الفيديوهات الإعلانية المُنشأة بالذكاء الاصطناعي (AI Ad Videos Studio)
export const aiAdVideos = pgTable("ai_ad_videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), // عنوان الإعلان
  prompt: text("prompt").notNull(), // وصف المنتج أو الفكرة العودية
  productName: text("product_name").notNull(),
  productUrl: text("product_url"),
  style: text("style").notNull().default("ugc_influencer"), // 'ugc_influencer' | '3d_animation' | 'luxury_promo' | 'tech_showcase' | 'kinetic_typography' | 'minimalist_ecommerce'
  aspectRatio: text("aspect_ratio").notNull().default("9:16"), // '9:16' (Reels/TikTok/Shorts) | '16:9' (YouTube) | '1:1' (Instagram/FB Square)
  language: text("language").notNull().default("ar_saudi"), // 'ar_saudi' | 'ar_egyptian' | 'ar_gulf' | 'ar_msa' | 'en_us'
  voiceTone: text("voice_tone").notNull().default("enthusiastic"), // 'enthusiastic' | 'dramatic' | 'professional' | 'friendly' | 'storytelling'
  bgMusic: text("bg_music").notNull().default("upbeat_electronic"), // 'upbeat_electronic' | 'corporate_inspiring' | 'dramatic_cinematic' | 'chill_lofi' | 'none'
  durationSeconds: integer("duration_seconds").default(30), // 15, 30, 45, 60
  scriptJson: jsonb("script_json").$type<Array<{
    sceneNumber: number;
    visualDescription: string;
    voiceoverText: string;
    textOverlay: string;
    duration: number;
  }>>().default([]),
  videoUrl: text("video_url").notNull(), // رابط معاينة الفيديو الإعلاني
  thumbnailUrl: text("thumbnail_url").notNull(),
  status: text("status").notNull().default("completed"), // 'generating' | 'completed' | 'failed'
  predictedCtr: integer("predicted_ctr").default(85), // النسبة المئوية المتوقعة للنقرات والتحويل CTR (مثلاً 85%)
  viewsCount: integer("views_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// 4. قواعد النشر التلقائي الذكية (Automated AI Publishing Workflows)
export const autoPublishRules = pgTable("auto_publish_rules", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  promptTemplate: text("prompt_template").notNull(),
  targetPlatforms: jsonb("target_platforms").$type<string[]>().notNull(),
  scheduleType: text("schedule_type").notNull().default("daily"), // 'daily' | 'weekly' | 'monthly' | 'custom'
  timeOfDay: text("time_of_day").notNull().default("14:00"), // وقت النشر الرئيسي
  publishTimeSlots: jsonb("publish_time_slots").$type<string[]>().default(["14:00"]), // أوقات النشر المتعددة في اليوم الواحد
  ruleLanguage: text("rule_language").default("ar"), // 'ar' | 'en'
  includeAiVideo: boolean("include_ai_video").default(true), // هل يقوم بتوليد فيديو إعلاني تلقائياً مع المنشور
  videoStyle: text("video_style").default("ugc_influencer"),
  isActive: boolean("is_active").default(true),
  lastRunAt: timestamp("last_run_at"),
  nextRunAt: timestamp("next_run_at"),
  createdAt: timestamp("created_at").defaultNow(),
});
