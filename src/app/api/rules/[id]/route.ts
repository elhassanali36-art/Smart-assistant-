import { NextResponse } from "next/server";
import { db, autoPublishRules } from "@/db";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updated = await db
      .update(autoPublishRules)
      .set(body)
      .where(eq(autoPublishRules.id, Number(id)))
      .returning();

    if (!updated.length) {
      return NextResponse.json({ error: "قاعدة الأتمتة غير موجودة" }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Error updating rule:", error);
    return NextResponse.json({ error: "فشل في تحديث قاعدة الأتمتة" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.delete(autoPublishRules).where(eq(autoPublishRules.id, Number(id)));
    return NextResponse.json({ success: true, message: "تم حذف قاعدة الأتمتة بنجاح" });
  } catch (error) {
    console.error("Error deleting rule:", error);
    return NextResponse.json({ error: "فشل في حذف قاعدة الأتمتة" }, { status: 500 });
  }
}
