import { NextResponse } from "next/server";
import { db, socialAccounts } from "@/db";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const accounts = await db
      .select()
      .from(socialAccounts)
      .orderBy(desc(socialAccounts.createdAt));
    return NextResponse.json(accounts);
  } catch (error) {
    console.error("Error fetching social accounts:", error);
    return NextResponse.json(
      { error: "فشل في جلب حسابات التواصل الاجتماعي" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      platform,
      accountName,
      username,
      avatarUrl,
      followerCount,
      platformCategory,
      permissions,
      autoPublishEnabled,
    } = body;

    if (!platform || !accountName || !username) {
      return NextResponse.json(
        { error: "يرجى ملء جميع البيانات الأساسية للحساب" },
        { status: 400 }
      );
    }

    const defaultAvatars: Record<string, string> = {
      twitter: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      instagram: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      tiktok: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      linkedin: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      youtube: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      facebook: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
      threads: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
    };

    const newAccount = await db
      .insert(socialAccounts)
      .values({
        platform,
        accountName,
        username: username.startsWith("@") ? username : `@${username}`,
        avatarUrl: avatarUrl || defaultAvatars[platform] || defaultAvatars.twitter,
        followerCount: followerCount ? Number(followerCount) : Math.floor(Math.random() * 50000) + 1200,
        status: "connected",
        accessToken: `oauth_token_${platform}_${Date.now()}`,
        autoPublishEnabled: autoPublishEnabled !== undefined ? autoPublishEnabled : true,
        platformCategory: platformCategory || (platform === "tiktok" || platform === "youtube" || platform === "instagram" ? "video" : "text"),
        permissions: permissions || ["read", "write", "video_upload", "analytics"],
        lastSyncAt: new Date(),
      })
      .returning();

    return NextResponse.json(newAccount[0], { status: 201 });
  } catch (error) {
    console.error("Error connecting social account:", error);
    return NextResponse.json(
      { error: "فشل في ربط الحساب الجديد" },
      { status: 500 }
    );
  }
}
