import { NextResponse } from "next/server";
import { db, scheduledPosts } from "@/db";
import { desc, eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status");
    
    let query = db.select().from(scheduledPosts).orderBy(desc(scheduledPosts.scheduledFor));
    
    if (statusFilter && statusFilter !== "all") {
      query = db.select().from(scheduledPosts).where(eq(scheduledPosts.status, statusFilter)).orderBy(desc(scheduledPosts.scheduledFor)) as any;
    }

    const posts = await query;
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "فشل في جلب المنشورات المجدولة" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      content,
      mediaUrls,
      attachedVideoId,
      targetPlatforms,
      scheduledFor,
      status,
      aiGenerated,
      aiPrompt,
      hashtags,
      isRecurring,
      recurrenceFrequency,
      publishTimeSlots,
      recurrenceEndDate,
      postLanguage,
    } = body;

    if (!title || !content || !targetPlatforms || !targetPlatforms.length) {
      return NextResponse.json(
        { error: "الرجاء إدخال عنوان ومحتوى المنشور وتحديد منصة واحدة على الأقل" },
        { status: 400 }
      );
    }

    const isPublishingNow = status === "published";
    const now = new Date();
    const scheduledDate = scheduledFor ? new Date(scheduledFor) : now;
    const slots = (publishTimeSlots && Array.isArray(publishTimeSlots) && publishTimeSlots.length > 0)
      ? publishTimeSlots
      : ["14:00"];

    // Simulate instant analytics if published immediately
    const initialAnalytics = isPublishingNow
      ? {
          views: Math.floor(Math.random() * 5000) + 800,
          likes: Math.floor(Math.random() * 400) + 60,
          comments: Math.floor(Math.random() * 80) + 12,
          shares: Math.floor(Math.random() * 50) + 5,
          clicks: Math.floor(Math.random() * 250) + 30,
          engagementRate: Number((Math.random() * 8 + 4).toFixed(1)),
        }
      : {
          views: 0,
          likes: 0,
          comments: 0,
          shares: 0,
          clicks: 0,
          engagementRate: 0,
        };

    // Insert main / recurring rule record
    const newPost = await db
      .insert(scheduledPosts)
      .values({
        title,
        content,
        mediaUrls: mediaUrls || [],
        attachedVideoId: attachedVideoId ? Number(attachedVideoId) : null,
        targetPlatforms,
        scheduledFor: isPublishingNow ? now : scheduledDate,
        status: isPublishingNow ? "published" : status || "scheduled",
        aiGenerated: aiGenerated || false,
        aiPrompt: aiPrompt || null,
        hashtags: hashtags || [],
        analytics: initialAnalytics,
        publishedAt: isPublishingNow ? now : null,
        isRecurring: isRecurring || false,
        recurrenceFrequency: recurrenceFrequency || "none",
        publishTimeSlots: slots,
        recurrenceEndDate: recurrenceEndDate ? new Date(recurrenceEndDate) : null,
        postLanguage: postLanguage || "ar",
      })
      .returning();

    // If it is a recurring daily schedule with multiple times per day, let's auto-generate 3 future scheduled instances
    // so the user immediately sees their multiple times per day appearing in the publishing calendar!
    if (isRecurring && !isPublishingNow) {
      const generatedInstances = [];
      const baseDate = new Date(scheduledDate);
      
      // Let's generate slots for the next 2 days to populate the calendar
      for (let dayOffset = 0; dayOffset <= 2; dayOffset++) {
        for (const timeStr of slots) {
          if (dayOffset === 0 && timeStr === slots[0]) continue; // Skip first one as it's the master record
          
          const [hours, minutes] = timeStr.split(":").map(Number);
          const instanceDate = new Date(baseDate);
          instanceDate.setDate(instanceDate.getDate() + dayOffset);
          if (!isNaN(hours) && !isNaN(minutes)) {
            instanceDate.setHours(hours, minutes, 0, 0);
          }

          generatedInstances.push({
            title: `${title} (${timeStr} - يومي متكرر)`,
            content,
            mediaUrls: mediaUrls || [],
            attachedVideoId: attachedVideoId ? Number(attachedVideoId) : null,
            targetPlatforms,
            scheduledFor: instanceDate,
            status: "scheduled" as const,
            aiGenerated: aiGenerated || false,
            aiPrompt: aiPrompt || null,
            hashtags: hashtags || [],
            analytics: { views: 0, likes: 0, comments: 0, shares: 0, clicks: 0, engagementRate: 0 },
            isRecurring: true,
            recurrenceFrequency: recurrenceFrequency || "daily",
            publishTimeSlots: [timeStr],
            postLanguage: postLanguage || "ar",
          });
        }
      }

      if (generatedInstances.length > 0) {
        await db.insert(scheduledPosts).values(generatedInstances);
      }
    }

    return NextResponse.json(newPost[0], { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "فشل في إنشاء المنشور" }, { status: 500 });
  }
}
