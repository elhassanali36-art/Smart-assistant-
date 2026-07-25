import { NextResponse } from "next/server";
import { db, socialAccounts } from "@/db";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updated = await db
      .update(socialAccounts)
      .set({
        ...body,
        lastSyncAt: body.status === "connected" ? new Date() : undefined,
      })
      .where(eq(socialAccounts.id, Number(id)))
      .returning();

    if (!updated.length) {
      return NextResponse.json({ error: "الحساب غير موجود" }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Error updating account:", error);
    return NextResponse.json({ error: "فشل في تحديث الحساب" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.delete(socialAccounts).where(eq(socialAccounts.id, Number(id)));
    return NextResponse.json({ success: true, message: "تم فصل الحساب بنجاح" });
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json({ error: "فشل في فصل الحساب" }, { status: 500 });
  }
}
