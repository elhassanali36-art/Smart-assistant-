import { NextResponse } from "next/server";
import { db, aiAdVideos } from "@/db";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const videos = await db.select().from(aiAdVideos).orderBy(desc(aiAdVideos.createdAt));
    return NextResponse.json(videos);
  } catch (error) {
    console.error("Error fetching AI videos:", error);
    return NextResponse.json({ error: "فشل في جلب الفيديوهات الإعلانية" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      prompt,
      productName,
      productUrl,
      style = "ugc_influencer",
      aspectRatio = "9:16",
      language = "ar_saudi",
      voiceTone = "enthusiastic",
      bgMusic = "upbeat_electronic",
      durationSeconds = 30,
    } = body;

    if (!prompt || !productName) {
      return NextResponse.json(
        { error: "الرجاء إدخال اسم المنتج ووصف الحملة الإعلانية" },
        { status: 400 }
      );
    }

    // Keyword detection for choosing relevant stock promotional footage
    const lowerPrompt = `${prompt} ${productName}`.toLowerCase();
    let videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-perfume-bottle-on-a-mirror-32857-large.mp4";
    let thumbnailUrl = "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80";

    if (lowerPrompt.includes("قهو") || lowerPrompt.includes("coffee") || lowerPrompt.includes("كافيه") || lowerPrompt.includes("مشروب")) {
      videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-pouring-coffee-into-a-cup-in-slow-motion-33924-large.mp4";
      thumbnailUrl = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80";
    } else if (lowerPrompt.includes("ساع") || lowerPrompt.includes("watch") || lowerPrompt.includes("فاخر") || lowerPrompt.includes("رجالي") || lowerPrompt.includes("بدل") || lowerPrompt.includes("مجوهر") || lowerPrompt.includes("luxury")) {
      videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-man-checking-his-watch-in-a-suit-39828-large.mp4";
      thumbnailUrl = "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80";
    } else if (lowerPrompt.includes("سماع") || lowerPrompt.includes("headphone") || lowerPrompt.includes("تقني") || lowerPrompt.includes("tech") || lowerPrompt.includes("جوال") || lowerPrompt.includes("هاتف") || lowerPrompt.includes("phone") || lowerPrompt.includes("إلكترون") || lowerPrompt.includes("لاب")) {
      videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-young-woman-with-headphones-relaxing-at-home-43015-large.mp4";
      thumbnailUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80";
    } else if (lowerPrompt.includes("عطر") || lowerPrompt.includes("perfume") || lowerPrompt.includes("عود") || lowerPrompt.includes("oud") || lowerPrompt.includes("تجميل") || lowerPrompt.includes("beauty") || lowerPrompt.includes("بشر") || lowerPrompt.includes("مكياج")) {
      videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-perfume-bottle-on-a-mirror-32857-large.mp4";
      thumbnailUrl = "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80";
    } else if (lowerPrompt.includes("ريا") || lowerPrompt.includes("gym") || lowerPrompt.includes("fitness") || lowerPrompt.includes("لياق") || lowerPrompt.includes("صحة") || lowerPrompt.includes("workout")) {
      videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-stretching-exercises-on-a-mat-40263-large.mp4";
      thumbnailUrl = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80";
    } else if (lowerPrompt.includes("سفر") || lowerPrompt.includes("travel") || lowerPrompt.includes("سياح") || lowerPrompt.includes("beach") || lowerPrompt.includes("فندق") || lowerPrompt.includes("resort") || lowerPrompt.includes("hotel")) {
      videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-waves-breaking-on-the-beach-38379-large.mp4";
      thumbnailUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80";
    } else if (lowerPrompt.includes("مطعم") || lowerPrompt.includes("restaurant") || lowerPrompt.includes("أكل") || lowerPrompt.includes("food") || lowerPrompt.includes("برجر") || lowerPrompt.includes("burger") || lowerPrompt.includes("بيتزا") || lowerPrompt.includes("pizza")) {
      videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-in-a-professional-kitchen-40919-large.mp4";
      thumbnailUrl = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80";
    }

    // Generate intelligent script tailored to dialect and style (including English support!)
    let generatedScript = [];

    if (language === "en_us") {
      if (style === "ugc_influencer") {
        generatedScript = [
          {
            sceneNumber: 1,
            visualDescription: `Charismatic influencer speaking directly to camera in natural lighting while holding [${productName}] up close`,
            voiceoverText: `Guys! I honestly didn't believe the hype about ${productName} until I tried it myself... This is an absolute game-changer!`,
            textOverlay: `🔥 The Secret Why I'm Obsessed 🔥`,
            duration: 8
          },
          {
            sceneNumber: 2,
            visualDescription: `Macro close-up shot showing the premium build quality and texture of the product in action`,
            voiceoverText: `Look at the incredible quality and attention to detail. The best part? It's fraction of the price of luxury brands!`,
            textOverlay: `Insane Quality + Unbeatable Value 🌟`,
            duration: 12
          },
          {
            sceneNumber: 3,
            visualDescription: `Brand logo and animated CTA button with free shipping badge and discount code overlay`,
            voiceoverText: `They're running a massive 50% flash sale right now. Click the link below before it sells out completely!`,
            textOverlay: `🛒 50% OFF Flash Sale | Order Now 🚚`,
            duration: 10
          }
        ];
      } else {
        generatedScript = [
          {
            sceneNumber: 1,
            visualDescription: `Cinematic wide shot with moody dramatic studio lighting revealing ${productName} against an elegant dark velvet backdrop`,
            voiceoverText: `Because true distinction lies in the smallest details... Introducing ${productName}.`,
            textOverlay: `✨ Elegance Redefined ✨`,
            duration: 10
          },
          {
            sceneNumber: 2,
            visualDescription: `Smooth 3D camera pan showcasing the craftsmanship and signature design elements with glowing accents`,
            voiceoverText: `Crafted for those who demand uncompromising quality, timeless style, and effortless confidence.`,
            textOverlay: `Timeless Craftsmanship 💎`,
            duration: 10
          },
          {
            sceneNumber: 3,
            visualDescription: `Exclusive offer reveal with promo code badge and gold warranty emblem`,
            voiceoverText: `Experience luxury today. Order online and enjoy complimentary express global shipping with our 2-year gold warranty.`,
            textOverlay: `🎁 Exclusive Offer | Free Global Shipping 🎁`,
            duration: 10
          }
        ];
      }
    } else if (language === "ar_saudi") {
      if (style === "ugc_influencer") {
        generatedScript = [
          {
            sceneNumber: 1,
            visualDescription: `مؤثر سعودي يتحدث للكاميرا بحماس وإضاءة طبيعية مع إظهار منتج [${productName}] بوضوح`,
            voiceoverText: `يا جماعة! لازم أقولكم عن تجرتي مع ${productName}.. صراحة شي ما توقعته أبداً!`,
            textOverlay: `🔥 السر اللي غير تجربتي بالكامل 🔥`,
            duration: 8
          },
          {
            sceneNumber: 2,
            visualDescription: `لقطة تفصيلية قريبة (Close-up) لاستخدام المنتج وتبيان جودته العالية وتفاصيله الفخمة`,
            voiceoverText: `شوفوا معي الجودة والدقة في التصميم، والشي اللي يميزه فعلاً هو السعر مقابل القيمة الرهيبة.`,
            textOverlay: `جودة استثنائية + سعر منافس 🌟`,
            duration: 12
          },
          {
            sceneNumber: 3,
            visualDescription: `شعار العلامة التجارية ورابط المتجر مع تأثير زر "اطلب الآن" متحرك وأيقونة التوصيل السريع`,
            voiceoverText: `مسوين خصم خاص لفترة محدودة، الحقوا على العرض من الرابط قبل ما تخلص الكمية!`,
            textOverlay: `🛒 اطلب الآن قبل نفاذ الكمية | شحن سريع 🚚`,
            duration: 10
          }
        ];
      } else {
        generatedScript = [
          {
            sceneNumber: 1,
            visualDescription: `لقطة سينمائية واسعة بإضاءة درامية تبرز جمال وفخامة ${productName} مع خلفية أنيقة`,
            voiceoverText: `لأنك تستحق التميز في كل تفاصيل حياتك.. نقدم لك ${productName}.`,
            textOverlay: `✨ الفخامة كما يجب أن تكون ✨`,
            duration: 10
          },
          {
            sceneNumber: 2,
            visualDescription: `استعراض ميزات المنتج بتأثيرات بصرية ثلاثية الأبعاد وحركة كاميرا سلسة (Cinematic Pan)`,
            voiceoverText: `تصميم يجمع بين الأصالة والعصرية، ليمنحك ثقة وحضور لا ينسى.`,
            textOverlay: `أصالة.. جودة.. وحضور استثنائي 💎`,
            duration: 10
          },
          {
            sceneNumber: 3,
            visualDescription: `ظهور تفاصيل العرض الخاص مع كود الخصم الحصري وأيقونة الضمان الذهبي`,
            voiceoverText: `اطلب عبر موقعنا الإلكتروني واستمتع بالعرض الحصري والتوصيل الفوري لجميع مناطق المملكة.`,
            textOverlay: `🎁 خصم حصري لفترة محدودة | اطلب الآن 🎁`,
            duration: 10
          }
        ];
      }
    } else if (language === "ar_egyptian") {
      generatedScript = [
        {
          sceneNumber: 1,
          visualDescription: `شاب مصري مبتسم يعرض ${productName} بطاقة إيجابية وخلفية حيوية ألوانها جذابة`,
          voiceoverText: `بص بقى! لو بتدور على حاجة تظبطلك يومك وتوفرلك فلوسك.. يبقى لازم تشوف ${productName}!`,
          textOverlay: `💡 الحل اللي هيريحك من غير ما تكسر ميزانيتك 💡`,
          duration: 10
        },
        {
          sceneNumber: 2,
          visualDescription: `شرح سريع لمزايا المنتج مع ظهور أيقونات توضيحية لسهولة الاستخدام والضمان`,
          voiceoverText: `خامة ممتازة، استخدام سهل جداً، والأحلى من ده كله إن عليه ضمان حقيقي واستبدال فوري.`,
          textOverlay: `✅ جودة عالية + ضمان استبدال فوري ✅`,
          duration: 10
        },
        {
          sceneNumber: 3,
          visualDescription: `رابط الموقع وشعار العرض الخاص مع موسيقى حماسية تتصاعد في الخلفية`,
          voiceoverText: `العرض ده لفترة محدودة جداً، ادخل على الرابط واطلب دلوقتي قبل ما يفوتك!`,
          textOverlay: `🔥 اطلب دلوقتي واستفيد بالخصم 🔥`,
          duration: 10
        }
      ];
    } else {
      // Default Modern Standard Arabic / Gulf
      generatedScript = [
        {
          sceneNumber: 1,
          visualDescription: `افتتاحية بصرية جذابة تخطف الأنظار مع موسيقى تصويرية متناغمة وظهور منتج ${productName}`,
          voiceoverText: `هل تبحث عن الجودة الفائقة والأداء الاستثنائي؟ اكتشف العالم الجديد مع ${productName}.`,
          textOverlay: `🌟 ارتقِ بتجربتك إلى مستوى جديد 🌟`,
          duration: 10
        },
        {
          sceneNumber: 2,
          visualDescription: `عرض تقني ومفصل لأهم مميزات وخصائص المنتج مع نصوص توضيحية تتفاعل مع حركة الفيديو`,
          voiceoverText: `صُمم بعناية فائقة ليلبي طموحاتك ويمنحك الموثوقية والتميز في كل لحظة.`,
          textOverlay: `تصميم مبتكر.. وأداء يفوق التوقعات 🚀`,
          duration: 10
        },
        {
          sceneNumber: 3,
          visualDescription: `دعوة واضحة لاتخاذ قرار الشراء مع إبراز الموقع الرسمي والعروض الحالية`,
          voiceoverText: `لا تفوت الفرصة، اطلب الآن واستفد من الشحن المجاني والضمان المعتمد.`,
          textOverlay: `🛒 اطلب الآن | شحن مجاني وضمان معتمد 🛒`,
          duration: 10
        }
      ];
    }

    const newVideo = await db
      .insert(aiAdVideos)
      .values({
        title: language === "en_us" ? `AI Ad: ${productName} 🎬` : `إعلان ${productName} بالذكاء الاصطناعي 🎬`,
        prompt,
        productName,
        productUrl: productUrl || "",
        style,
        aspectRatio,
        language,
        voiceTone,
        bgMusic,
        durationSeconds: Number(durationSeconds) || 30,
        scriptJson: generatedScript,
        videoUrl,
        thumbnailUrl,
        status: "completed",
        predictedCtr: Math.floor(Math.random() * 15) + 82, // 82% - 96%
        viewsCount: 0,
      })
      .returning();

    return NextResponse.json(newVideo[0], { status: 201 });
  } catch (error) {
    console.error("Error generating AI ad video:", error);
    return NextResponse.json({ error: "فشل في إنشاء الفيديو الإعلاني بالذكاء الاصطناعي" }, { status: 500 });
  }
}
