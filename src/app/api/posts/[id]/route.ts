import { NextResponse } from "next/server";
import { db, scheduledPosts } from "@/db";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // If updating status to "published" now
    let extraUpdates: any = {};
    if (body.status === "published") {
      extraUpdates.publishedAt = new Date();
      extraUpdates.analytics = {
        views: Math.floor(Math.random() * 3000) + 500,
        likes: Math.floor(Math.random() * 300) + 40,
        comments: Math.floor(Math.random() * 50) + 8,
        shares: Math.floor(Math.random() * 30) + 4,
        clicks: Math.floor(Math.random() * 150) + 20,
        engagementRate: Number((Math.random() * 7 + 3).toFixed(1)),
      };
    }

    const updated = await db
      .update(scheduledPosts)
      .set({
        ...body,
        ...extraUpdates,
        scheduledFor: body.scheduledFor ? new Date(body.scheduledFor) : undefined,
      })
      .where(eq(scheduledPosts.id, Number(id)))
      .returning();

    if (!updated.length) {
      return NextResponse.json({ error: "المنشور غير موجود" }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "فشل في تحديث المنشور" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.delete(scheduledPosts).where(eq(scheduledPosts.id, Number(id)));
    return NextResponse.json({ success: true, message: "تم حذف المنشور بنجاح" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "فشل في حذف المنشور" }, { status: 500 });
  }
}
