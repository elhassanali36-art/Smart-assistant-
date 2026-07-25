import { NextResponse } from "next/server";
import { db, autoPublishRules } from "@/db";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const rules = await db.select().from(autoPublishRules).orderBy(desc(autoPublishRules.createdAt));
    return NextResponse.json(rules);
  } catch (error) {
    console.error("Error fetching rules:", error);
    return NextResponse.json({ error: "فشل في جلب قواعد النشر التلقائي" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      promptTemplate,
      targetPlatforms,
      scheduleType = "daily",
      timeOfDay = "14:00",
      publishTimeSlots = ["14:00"],
      ruleLanguage = "ar",
      includeAiVideo = true,
      videoStyle = "ugc_influencer",
    } = body;

    if (!name || !promptTemplate || !targetPlatforms || !targetPlatforms.length) {
      return NextResponse.json(
        { error: "يرجى إدخال اسم القاعدة والقالب النَصي واختيار المنصات المستهدفة" },
        { status: 400 }
      );
    }

    const now = new Date();
    const nextRun = new Date(now.getTime() + 1000 * 60 * 60 * 4); // Simulated next run in 4 hours
    const slots = Array.isArray(publishTimeSlots) && publishTimeSlots.length > 0 ? publishTimeSlots : [timeOfDay];

    const newRule = await db
      .insert(autoPublishRules)
      .values({
        name,
        description: description || `نشر تلقائي وفق جدولة (${scheduleType === "daily" ? "يومية متكررة" : scheduleType === "weekly" ? "أسبوعية" : "شهرية"}) بأوقات: ${slots.join("، ")}`,
        promptTemplate,
        targetPlatforms,
        scheduleType,
        timeOfDay: slots[0] || "14:00",
        publishTimeSlots: slots,
        ruleLanguage: ruleLanguage || "ar",
        includeAiVideo: includeAiVideo !== undefined ? includeAiVideo : true,
        videoStyle: videoStyle || "ugc_influencer",
        isActive: true,
        lastRunAt: null,
        nextRunAt: nextRun,
      })
      .returning();

    return NextResponse.json(newRule[0], { status: 201 });
  } catch (error) {
    console.error("Error creating auto-publish rule:", error);
    return NextResponse.json({ error: "فشل في إنشاء قاعدة النشر التلقائي" }, { status: 500 });
  }
}
