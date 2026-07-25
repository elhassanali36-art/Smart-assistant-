import "dotenv/config";
import { db, socialAccounts, scheduledPosts, aiAdVideos, autoPublishRules } from "./index";

async function seed() {
  console.log("🌱 Seeding database with initial rich Bilingual & Recurring Arabic/English demo data...");

  // Clear existing tables
  await db.delete(socialAccounts);
  await db.delete(scheduledPosts);
  await db.delete(aiAdVideos);
  await db.delete(autoPublishRules);

  // 1. Seed Social Accounts
  const insertedAccounts = await db.insert(socialAccounts).values([
    {
      platform: "twitter",
      accountName: "متجر الأناقة السعودية | Saudi Style",
      username: "@SaudiStyle_Ar",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      followerCount: 42500,
      status: "connected",
      accessToken: "mock_token_twitter_9981",
      autoPublishEnabled: true,
      platformCategory: "text",
      permissions: ["read", "write", "analytics"],
      lastSyncAt: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
    },
    {
      platform: "instagram",
      accountName: "الأناقة للموضة والعطور | Royal Fashion",
      username: "@saudi_style_official",
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      followerCount: 89200,
      status: "connected",
      accessToken: "mock_token_instagram_3342",
      autoPublishEnabled: true,
      platformCategory: "video",
      permissions: ["read", "write", "video_upload", "analytics"],
      lastSyncAt: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      platform: "tiktok",
      accountName: "عروض وفيديوهات الأناقة | TikTok Deals",
      username: "@saudistyle.tiktok",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      followerCount: 156000,
      status: "connected",
      accessToken: "mock_token_tiktok_7721",
      autoPublishEnabled: true,
      platformCategory: "video",
      permissions: ["read", "write", "video_upload", "analytics"],
      lastSyncAt: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      platform: "linkedin",
      accountName: "Saudi Style Retail & Luxury Group",
      username: "Saudi Style Retail Group",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      followerCount: 14300,
      status: "connected",
      accessToken: "mock_token_linkedin_8819",
      autoPublishEnabled: true,
      platformCategory: "business",
      permissions: ["read", "write", "analytics"],
      lastSyncAt: new Date(Date.now() - 1000 * 60 * 120),
    },
    {
      platform: "youtube",
      accountName: "Saudi Style Shorts Channel",
      username: "Saudi Style Shorts",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      followerCount: 68000,
      status: "connected",
      accessToken: "mock_token_youtube_1122",
      autoPublishEnabled: true,
      platformCategory: "video",
      permissions: ["read", "write", "video_upload", "analytics"],
      lastSyncAt: new Date(Date.now() - 1000 * 60 * 45),
    },
    {
      platform: "facebook",
      accountName: "صفحة متجر الأناقة الرسمية | FB Community",
      username: "SaudiStylePage",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
      followerCount: 112000,
      status: "paused",
      accessToken: "mock_token_facebook_6654",
      autoPublishEnabled: false,
      platformCategory: "social",
      permissions: ["read", "write", "analytics"],
      lastSyncAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    }
  ]).returning();

  console.log(`✅ Seeded ${insertedAccounts.length} social accounts.`);

  // 2. Seed AI Ad Videos (Arabic and English)
  const insertedVideos = await db.insert(aiAdVideos).values([
    {
      title: "إعلان مجموعة عطور الخريف الملكية 👑",
      prompt: "عطر فاخر برائحة العود الملكي والعنبر، مصمم للمناسبات الخاصة مع خصم حصري لفترة محدودة",
      productName: "عطر العود الملكي (Royal Oud)",
      productUrl: "https://saudistyle.store/oud-royal",
      style: "ugc_influencer",
      aspectRatio: "9:16",
      language: "ar_saudi",
      voiceTone: "enthusiastic",
      bgMusic: "dramatic_cinematic",
      durationSeconds: 30,
      scriptJson: [
        {
          sceneNumber: 1,
          visualDescription: "مؤثرة سعودية تحمل زجاجة العطر الفاخرة في إضاءة دافئة وتبتسم للكاميرا بحماس",
          voiceoverText: "بنات! أخيراً لقيت العطر اللي يسألني عنه كل من شافني في المناسبات.. عطر العود الملكي!",
          textOverlay: "✨ السر وراء ثبات ريحتي 48 ساعة ✨",
          duration: 8
        },
        {
          sceneNumber: 2,
          visualDescription: "لقطة قريبة (Macro) لرش العطر مع تناثر قطرات ذهبية وخلفية مخملية سوداء",
          voiceoverText: "مزيج ساحر من العود الصافي والعنبر الطبيعي، ثبات فوّاح يشرفك في كل عزيمة.",
          textOverlay: "عود صافي + عنبر ملكي 🌟",
          duration: 12
        },
        {
          sceneNumber: 3,
          visualDescription: "ظهور كود الخصم على الشاشة مع زر اطلب الآن التفاعلي وشعار المتجر",
          voiceoverText: "ولفترة محدودة، استخدموا كود الخصم OUD50 عشان تحصلون على خصم نصف السعر والتوصيل مجاني!",
          textOverlay: "🔥 خصم 50% بكود: OUD50 | اطلب الآن 🔥",
          duration: 10
        }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-perfume-bottle-on-a-mirror-32857-large.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80",
      status: "completed",
      predictedCtr: 89,
      viewsCount: 14250,
    },
    {
      title: "Imperial Chronograph Watch Commercial ⌚",
      prompt: "Classic men's chronograph timepiece with genuine leather strap and water resistance, fast-paced luxury promo",
      productName: "Imperial Chronograph Watch",
      productUrl: "https://saudistyle.store/watch-imperial",
      style: "luxury_promo",
      aspectRatio: "9:16",
      language: "en_us",
      voiceTone: "dramatic",
      bgMusic: "upbeat_electronic",
      durationSeconds: 15,
      scriptJson: [
        {
          sceneNumber: 1,
          visualDescription: "Cinematic shot of a man wearing a bespoke suit checking his luxury timepiece inside a sports car",
          voiceoverText: "Time isn't just numbers on a dial. It is the ultimate statement of your character and presence.",
          textOverlay: "⌚ Elegance Begins with Details ⌚",
          duration: 7
        },
        {
          sceneNumber: 2,
          visualDescription: "Macro pan of the genuine leather strap and Swiss movement with neon lighting accents",
          voiceoverText: "Order your Imperial Chronograph today with our exclusive 40% flash discount. Limited stock available!",
          textOverlay: "⚡ 40% OFF for 24 Hours Only ⚡",
          duration: 8
        }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-checking-his-watch-in-a-suit-39828-large.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80",
      status: "completed",
      predictedCtr: 94,
      viewsCount: 28400,
    },
    {
      title: "استعراض سماعات الإلغاء الصوتي اللاسلكية 🎧",
      prompt: "سماعات رأس لاسلكية تعزل الضوضاء بالكامل ببطارية تدوم 40 ساعة وميكروفون فائق الدقة للمكالمات",
      productName: "سماعات SonicPro Ultra",
      productUrl: "https://saudistyle.store/sonicpro",
      style: "tech_showcase",
      aspectRatio: "16:9",
      language: "ar_msa",
      voiceTone: "professional",
      bgMusic: "corporate_inspiring",
      durationSeconds: 45,
      scriptJson: [
        {
          sceneNumber: 1,
          visualDescription: "شاب يعمل في مقهى مزدحم يرتدي السماعة وبمجرد تشغيل زر العزل يختفي كل إزعاج الخلفية بصرياً",
          voiceoverText: "هل تعاني من تشتت الانتباه في بيئات العمل المزدحمة؟ اكتشف القوة الحقيقية لعزل الضوضاء النشط.",
          textOverlay: "🤫 عزل ضوضاء بنسبة 99.4% 🤫",
          duration: 15
        },
        {
          sceneNumber: 2,
          visualDescription: "استعراض تقنية الشحن السريع ورسم ثلاثي الأبعاد لمكبرات الصوت الداخلية فائقة النقاء",
          voiceoverText: "مع بطارية تدوم حتى أربعين ساعة متواصلة وشحن سريع يمنحك خمس ساعات استماع في عشر دقائق فقط.",
          textOverlay: "🔋 40 ساعة من الموسيقى والمكالمات 🔋",
          duration: 15
        },
        {
          sceneNumber: 3,
          visualDescription: "عرض العلبة الأنيقة والضمان الذهبي لمدة سنتين مع رابط المتجر الرسمى",
          voiceoverText: "اطلبها اليوم مع ضمان ذهبي لمدة عامين وتوصيل فوري لجميع مدن المملكة.",
          textOverlay: "✅ ضمان ذهبي سنتين | شحن مجاني ✅",
          duration: 15
        }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-with-headphones-relaxing-at-home-43015-large.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      status: "completed",
      predictedCtr: 82,
      viewsCount: 9120,
    },
    {
      title: "Brazilian & Ethiopian Coffee Box Promo ☕",
      prompt: "Specialty coffee roaster offering freshly roasted coffee beans with chocolaty notes and balanced acidity",
      productName: "Specialty Tasting Box (4 Origins)",
      productUrl: "https://saudistyle.store/coffee-box",
      style: "minimalist_ecommerce",
      aspectRatio: "1:1",
      language: "en_us",
      voiceTone: "friendly",
      bgMusic: "chill_lofi",
      durationSeconds: 30,
      scriptJson: [
        {
          sceneNumber: 1,
          visualDescription: "Pouring steaming hot coffee into a crystal clear glass cup with freshly roasted coffee bags in background",
          voiceoverText: "Your morning is never truly complete without a perfectly brewed cup of specialty coffee!",
          textOverlay: "☕ Elevate Your Morning Mood ☕",
          duration: 15
        },
        {
          sceneNumber: 2,
          visualDescription: "Showcasing the 4-origin tasting box from Brazil, Ethiopia, Colombia, and Costa Rica with free ceramic mug gift",
          voiceoverText: "We curated the finest 4 single-origin coffees in one incredible tasting box with a complimentary ceramic mug!",
          textOverlay: "🎁 Tasting Box + FREE Mug Gift 🎁",
          duration: 15
        }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-pouring-coffee-into-a-cup-in-slow-motion-33924-large.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
      status: "completed",
      predictedCtr: 87,
      viewsCount: 18900,
    }
  ]).returning();

  console.log(`✅ Seeded ${insertedVideos.length} AI Ad Videos.`);

  // 3. Seed Scheduled, Published & Recurring Posts (Multiple times per day!)
  const now = Date.now();
  const insertedPosts = await db.insert(scheduledPosts).values([
    {
      title: "إطلاق حملة عروض الخريف الملكية 👑",
      content: "عطر العود الملكي الفاخر الآن بخصم 50% لفترة محدودة جداً! 🌟\nاستمتع بثبات يدوم حتى 48 ساعة ومكونات طبيعية 100% من العود والعنبر الفاخر.\n\nاستخدم كود: OUD50 واطلب الآن قبل نفاذ الكمية 👇\n🌐 saudistyle.store/oud-royal\n\n#عطور #عطور_سعودية #تخفيضات #أناقة #أناقة_سعودية #العود_الملكي",
      mediaUrls: ["https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"],
      attachedVideoId: insertedVideos[0].id,
      targetPlatforms: ["instagram", "tiktok", "twitter"],
      scheduledFor: new Date(now - 1000 * 60 * 60 * 24), // Published yesterday
      status: "published",
      aiGenerated: true,
      aiPrompt: "كتابة منشور تسويقي حماسي وجذاب لعطر العود الملكي مع إبراز كود الخصم OUD50 والهاشتاقات المتصدرة",
      hashtags: ["#عطور", "#عطور_سعودية", "#تخفيضات", "#أناقة", "#العود_الملكي"],
      analytics: {
        views: 48200,
        likes: 3840,
        comments: 642,
        shares: 890,
        clicks: 2150,
        engagementRate: 11.2,
      },
      publishedAt: new Date(now - 1000 * 60 * 60 * 24),
      isRecurring: false,
      recurrenceFrequency: "none",
      publishTimeSlots: ["14:00"],
      postLanguage: "ar",
    },
    {
      title: "Leadership & Executive Presence in Modern Business 👔",
      content: "In today's corporate world, success is not just defined by expertise—it extends to professional presence and attention to precision.\n\nThe Imperial Chronograph is crafted specifically for leaders and visionaries who value timeless elegance and uncompromising Swiss accuracy.\n\nDiscover our executive collection today: 🌐 saudistyle.store\n\n#Leadership #Business #ExecutiveStyle #LuxuryWatches #Success",
      mediaUrls: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80"],
      attachedVideoId: insertedVideos[1].id,
      targetPlatforms: ["linkedin", "twitter"],
      scheduledFor: new Date(now - 1000 * 60 * 60 * 5), // Published 5 hours ago
      status: "published",
      aiGenerated: true,
      aiPrompt: "Write a professional executive post for LinkedIn and Twitter about leadership and luxury timepieces",
      hashtags: ["#Leadership", "#Business", "#ExecutiveStyle", "#LuxuryWatches"],
      analytics: {
        views: 12400,
        likes: 980,
        comments: 145,
        shares: 210,
        clicks: 840,
        engagementRate: 8.7,
      },
      publishedAt: new Date(now - 1000 * 60 * 60 * 5),
      isRecurring: false,
      recurrenceFrequency: "none",
      publishTimeSlots: ["09:00"],
      postLanguage: "en",
    },
    // RECURRING POST WITH MULTIPLE TIMES PER DAY!
    {
      title: "🔄 تكرار يومي (09:00، 14:30، 20:00): عروض بوكس القهوة المختصة ☕",
      content: "مزاجك العالي في كل أوقات اليوم يحتاج قهوة تليق فيك! ☕✨\nبوكس التذوق الفاخر يجمع لك 4 محاصيل مختارة بعناية من البرازيل وإثيوبيا وكولومبيا مع كوب سيراميك هدية داخل البوكس!\n\nاطلبه الحين واستمتع بتوصيل سريع ومجاني لباب بيتك 🚚👇\n🌐 saudistyle.store/coffee-box\n\n#قهوة #قهوة_مختصة #ويكند #روقان #عشاق_القهوة #اسبريسو",
      mediaUrls: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"],
      attachedVideoId: insertedVideos[3].id,
      targetPlatforms: ["instagram", "tiktok", "twitter", "facebook"],
      scheduledFor: new Date(now + 1000 * 60 * 60 * 2), // Scheduled upcoming
      status: "scheduled",
      aiGenerated: true,
      aiPrompt: "بوست حماسي لترويج بوكس القهوة المختصة مع هدية كوب مجاني والتوصيل السريع",
      hashtags: ["#قهوة", "#قهوة_مختصة", "#روقان", "#عشاق_القهوة"],
      analytics: { views: 0, likes: 0, comments: 0, shares: 0, clicks: 0, engagementRate: 0 },
      isRecurring: true,
      recurrenceFrequency: "daily",
      publishTimeSlots: ["09:00", "14:30", "20:00"], // MULTIPLE DAILY SLOTS
      recurrenceEndDate: null,
      postLanguage: "ar",
    },
    {
      title: "Daily Recurring Tech Promo: SonicPro Noise Cancelling 🎧",
      content: "Transform your workspace instantly with SonicPro Ultra active noise cancelling headphones! 🎧🤫\nGet 30% OFF today with complimentary express delivery worldwide.\n\nTap link in bio to shop now 👆\n#TechDeals #Audio #Headphones #WorkFromHome #Explore #Trending",
      mediaUrls: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"],
      attachedVideoId: insertedVideos[2].id,
      targetPlatforms: ["youtube", "tiktok", "instagram"],
      scheduledFor: new Date(now + 1000 * 60 * 60 * 18), // Tomorrow
      status: "scheduled",
      aiGenerated: true,
      aiPrompt: "Short viral promo description for YouTube Shorts and Reels promoting wireless headphones",
      hashtags: ["#TechDeals", "#Audio", "#Headphones", "#Trending"],
      analytics: { views: 0, likes: 0, comments: 0, shares: 0, clicks: 0, engagementRate: 0 },
      isRecurring: true,
      recurrenceFrequency: "daily",
      publishTimeSlots: ["12:00", "19:00"], // 2 daily slots
      recurrenceEndDate: null,
      postLanguage: "en",
    },
    {
      title: "مسودة: تشكيلة الشتاء القادمة للسترات الجلدية 🧥",
      content: "انتظروا قريباً إطلاق أكبر تشكيلة من السترات الجلدية الإيطالية الفاخرة لفصل الشتاء بأسعار تنافسية وخامات طبيعية 100%...\n\n#شتاء #موضة_شتاء #سترات #أناقة_رجل #قريباً",
      mediaUrls: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"],
      attachedVideoId: null,
      targetPlatforms: ["instagram", "twitter"],
      scheduledFor: new Date(now + 1000 * 60 * 60 * 72), // In 3 days
      status: "draft",
      aiGenerated: false,
      aiPrompt: null,
      hashtags: ["#شتاء", "#موضة_شتاء", "#سترات", "#أناقة_رجل"],
      analytics: { views: 0, likes: 0, comments: 0, shares: 0, clicks: 0, engagementRate: 0 },
      isRecurring: false,
      recurrenceFrequency: "none",
      publishTimeSlots: ["15:00"],
      postLanguage: "ar",
    }
  ]).returning();

  console.log(`✅ Seeded ${insertedPosts.length} posts (with recurring daily schedules).`);

  // 4. Seed Auto-Publish Rules
  const insertedRules = await db.insert(autoPublishRules).values([
    {
      name: "أتمتة عروض المساء والصباح اليومية على تيك توك وإنستغرام 🚀",
      description: "يقوم الذكاء الاصطناعي يومياً بتوليد فيديو إعلاني قصير لأكثر منتج مبيعاً ونشره في أوقات ذروة التفاعل (09:00 صباحاً و 20:00 مساءً).",
      promptTemplate: "اكتب منشور تسويقي حماسي مع فيديو إعلاني قصير بأسلوب المؤثرين (UGC) لأبرز عروضنا الحصرية اليوم مع كود خصم وتوصيل مجاني",
      targetPlatforms: ["tiktok", "instagram"],
      scheduleType: "daily",
      timeOfDay: "20:00",
      publishTimeSlots: ["09:00", "20:00"], // MULTIPLE DAILY AUTOMATION SLOTS
      ruleLanguage: "ar",
      includeAiVideo: true,
      videoStyle: "ugc_influencer",
      isActive: true,
      lastRunAt: new Date(now - 1000 * 60 * 60 * 18),
      nextRunAt: new Date(now + 1000 * 60 * 60 * 6),
    },
    {
      name: "Weekly LinkedIn Executive Brand Storytelling 💼",
      description: "Publishing a professional executive brand update every Monday morning highlighting craftsmanship, quality standards and market growth.",
      promptTemplate: "Write a professional executive brand story for LinkedIn highlighting our dedication to luxury craftsmanship and customer satisfaction across international markets",
      targetPlatforms: ["linkedin"],
      scheduleType: "weekly",
      timeOfDay: "09:00",
      publishTimeSlots: ["09:00"],
      ruleLanguage: "en",
      includeAiVideo: false,
      videoStyle: "tech_showcase",
      isActive: true,
      lastRunAt: new Date(now - 1000 * 60 * 60 * 24 * 4),
      nextRunAt: new Date(now + 1000 * 60 * 60 * 24 * 3),
    }
  ]).returning();

  console.log(`✅ Seeded ${insertedRules.length} auto-publish rules.`);
  console.log("🎉 Seeding completed successfully!");
}

seed()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
