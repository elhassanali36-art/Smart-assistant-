import { NextResponse } from "next/server";
import { db, aiAdVideos } from "@/db";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updated = await db
      .update(aiAdVideos)
      .set(body)
      .where(eq(aiAdVideos.id, Number(id)))
      .returning();

    if (!updated.length) {
      return NextResponse.json({ error: "الفيديو غير موجود" }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Error updating AI video:", error);
    return NextResponse.json({ error: "فشل في تحديث الفيديو الإعلاني" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.delete(aiAdVideos).where(eq(aiAdVideos.id, Number(id)));
    return NextResponse.json({ success: true, message: "تم حذف الفيديو الإعلاني بنجاح" });
  } catch (error) {
    console.error("Error deleting AI video:", error);
    return NextResponse.json({ error: "فشل في حذف الفيديو الإعلاني" }, { status: 500 });
  }
}
