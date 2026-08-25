import { NextResponse } from 'next/server';
import { getStoreData, saveStoreData } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { primaryColor, accentColor, adminPassword } = await request.json();
    const store = getStoreData();

    if (primaryColor) store.siteSettings.primaryColor = primaryColor;
    if (accentColor) store.siteSettings.accentColor = accentColor;
    if (adminPassword) store.siteSettings.adminPasswordHash = adminPassword;

    saveStoreData(store);
    return NextResponse.json({ success: true, siteSettings: store.siteSettings });
  } catch (error) {
    console.error("Admin settings update error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
