import { NextResponse } from 'next/server';
import { getStoreData } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const store = getStoreData();

    const expectedPassword = store.siteSettings.adminPasswordHash || "maharani2026";

    if (password === expectedPassword) {
      return NextResponse.json({ success: true, message: "Authentication successful" });
    } else {
      return NextResponse.json({ success: false, message: "Invalid Admin Password" }, { status: 401 });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
