import { NextResponse } from 'next/server';
import { getStoreData, saveStoreData } from '@/lib/db';

export async function GET() {
  const data = getStoreData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const updatedData = await request.json();
    saveStoreData(updatedData);
    return NextResponse.json({ success: true, message: "Store data updated successfully" });
  } catch (error) {
    console.error("Failed to update store data:", error);
    return NextResponse.json({ success: false, message: "Failed to update store data" }, { status: 500 });
  }
}
