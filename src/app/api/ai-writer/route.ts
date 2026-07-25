import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { topic, tone = "حماسي", platform = "instagram", language = "ar" } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: "الرجاء تحديد موضوع المنشور" }, { status: 400 });
    }

    let title = "";
    let content = "";
    let hashtags: string[] = [];

    const isLinkedIn = platform === "linkedin";
    const isTwitter = platform === "twitter";
    const isTikTok = platform === "tiktok";
    const isEnglish = language === "en";

    if (isEnglish) {
      if (isLinkedIn) {
        title = `Strategic Insight: How ${topic} is Transforming Modern Business 💼`;
        content = `We are excited to share some key perspectives and developments regarding ${topic}.\n\nIn today's fast-paced business landscape, continuous innovation, uncompromising quality, and strong operational excellence are the fundamental pillars for achieving sustainable growth and earning customer trust.\n\nWe remain deeply committed to delivering exceptional solutions that exceed market expectations.\n\nWhat are your thoughts on this? Let us know in the comments below 👇\n\n🌐 For more details and professional partnerships, visit our official portal.`;
        hashtags = ["#BusinessLeadership", "#Innovation", "#Entrepreneurship", "#Strategy", "#Success", "#Growth"];
      } else if (isTwitter) {
        title = `🔥 BREAKING / Exclusive Offer on ${topic}! ✨`;
        content = `Looking for top-tier quality and unbeatable value at the same time? 🚀\n\nWe just launched our new collection for ${topic} with game-changing features and incredible limited-time discounts!\n\n🎁 Use promo code SPECIAL50 for instant savings and complimentary express delivery.\n\nShop online now 👇\n🌐 saudistyle.store`;
        hashtags = ["#Deals", "#Discounts", "#Fashion", "#NewArrivals", "#Trending", "#MustHave"];
      } else if (isTikTok) {
        title = `Viral Trend: The Secret behind ${topic} 🎬`;
        content = `Watch till the end! The secret nobody told you about ${topic} 🔥😍\n\nInsane build quality, unbeatable price, and FREE express shipping straight to your doorstep!\n\nLink in bio 👆 Don't wait until it sells out!`;
        hashtags = ["#FYP", "#Trending", "#TikTokMadeMeBuyIt", "#Viral", "#Sale", "#MustHave"];
      } else {
        // Instagram / Facebook / general English
        title = `Shine bright with our latest in ${topic} ✨👑`;
        content = `Because your details deserve only the absolute best, we introduce our signature excellence collection in ${topic}, crafted with passion and precision to suit your refined taste! ❤️✨\n\nWhy you'll love this offer:\n🔹 100% premium quality materials and authentic ingredients\n🔹 Complimentary fast express shipping globally\n🔹 Easy hassle-free returns and replacement guarantee\n\n🎁 Order now and claim your exclusive end-of-season discount 👇\n🌐 saudistyle.store`;
        hashtags = ["#Style", "#Shopping", "#Deals", "#Lifestyle", "#Luxury", "#Trending", "#Explore"];
      }

      if (tone === "رسمي" || tone === "professional") {
        content = content.replace(/Insane|Nobody told you|Shine bright/g, "Exceptional | Industry insights | Elevate your standard");
      }
    } else {
      // Arabic writing
      if (isLinkedIn) {
        title = `رؤية تحليلية: ${topic} وأثره في نمو الأعمال 💼`;
        content = `يسعدنا اليوم مشاركة بعض الأفكار والتطورات حول ${topic}.\n\nفي بيئة الأعمال المتسارعة اليوم، يعد الابتكار والجودة والالتزام بالمعايير المهنية العالية هي الركائز الأساسية لتحقيق التميز المستدام وبناء ثقة العملاء والشركاء.\n\nنحن مستمرون في تقديم حلول استثنائية تلبي تطلعات السوق وتتجاوز التوقعات.\n\nشاركونا آرائكم في التعليقات حول هذا الموضوع 👇\n\n🌐 للمزيد من التفاصيل والتعاون المهني تواصلوا معنا عبر موقعنا.`;
        hashtags = ["#ريادة_الأعمال", "#قيادة", "#ابتكار", "#تطوير_الأعمال", "#السوق_السعودي", "#نجاح"];
      } else if (isTwitter) {
        title = `عرض أو خبر عاجل عن: ${topic} 🔥`;
        content = `تبي التميز والجودة العالية في نفس الوقت؟ ✨\n\nأطلقنا لكم جديدنا في ${topic} بمميزات خرافية وأسعار تنافسية ما تتفوت!\n\n🎁 استخدم كود الخصم الحصري واحصل على خصم فوري وتوصيل سريع.\n\nاطلب الآن عبر الرابط 👇\n🌐 saudistyle.store`;
        hashtags = ["#عروض", "#تخفيضات", "#السعودية", "#أناقة", "#جديد", "#ترند"];
      } else if (isTikTok) {
        title = `فيديو ترند: سر التميز في ${topic} 🎬`;
        content = `شاهد للآخير! السر اللي ما أحد قالك عنه في ${topic} 🔥😍\n\nجودة رهيبة وسعر خرافي والتوصيل لباب بيتك مجاناً!\n\nالرابط في البايو 👆 الحقوا قبل نفاذ الكمية!`;
        hashtags = ["#اكسبلور", "#ترند", "#تيك_توك", "#الشعب_الصيني_ماله_حل", "#عروض_السعودية", "#تخفيضات"];
      } else {
        title = `تألق مع جديدنا في ${topic} ✨👑`;
        content = `لأن تفاصيلك تستحق الأفضل دائماً، نقدم لك مجموعة التميز في ${topic} المصممة بعناية وشغف لتناسب ذوقك الرفيع! ❤️✨\n\nمميزات العرض الحالي:\n🔹 خامات ومكونات عالية الجودة بنسبة 100%\n🔹 شحن مجاني وسريع لجميع المدن\n🔹 ضمان استبدال واسترجاع بكل سهولة\n\n🎁 اطلب الآن واستفد من خصومات نهاية الموسم الحصرية 👇\n🌐 saudistyle.store`;
        hashtags = ["#أناقة", "#تسوق", "#عروض", "#لايف_ستايل", "#عطور", "#موضة", "#السعودية", "#اكسبلور"];
      }

      if (tone === "رسمي") {
        content = content.replace(/تبي|خرافية|الحقوا/g, "هل تبحث عن | استثنائية | سارعوا");
      }
    }

    return NextResponse.json({
      title,
      content,
      hashtags,
    });
  } catch (error) {
    console.error("Error generating AI content:", error);
    return NextResponse.json({ error: "فشل في توليد المحتوى بالذكاء الاصطناعي" }, { status: 500 });
  }
}
