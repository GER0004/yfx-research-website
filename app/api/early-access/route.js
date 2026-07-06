import { NextResponse } from "next/server";
import { insertRequest, emailExists, getAllRequests } from "@/lib/db";
import { sendNewRequestNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full name and email are required." },
        { status: 400 },
      );
    }

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json(
        { error: "Please enter a valid name." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (emailExists(trimmedEmail)) {
      return NextResponse.json(
        { error: "This email has already been registered for early access." },
        { status: 409 },
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    insertRequest({ fullName: trimmedName, email: trimmedEmail, ip });

    const now = new Date().toISOString();
    sendNewRequestNotification({
      fullName: trimmedName,
      email: trimmedEmail,
      ip,
      date: now,
    }).catch((err) => console.error("[email] Failed to send notification:", err));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[early-access] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const requests = getAllRequests();
    return NextResponse.json({ requests });
  } catch (err) {
    console.error("[early-access] Error fetching requests:", err);
    return NextResponse.json({ requests: [] }, { status: 500 });
  }
}
