import { NextResponse } from 'next/server';
import { getStoreData, saveStoreData } from '@/lib/db';
import { CustomerEnquiry } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const store = getStoreData();

    const newEnquiry: CustomerEnquiry = {
      id: `enq-${Date.now()}`,
      customerName: body.customerName || body.name || "Valued Customer",
      phone: body.phone || "",
      email: body.email || "",
      productName: body.productName || "",
      productSlug: body.productSlug || "",
      categoryInterested: body.categoryInterested || "",
      message: body.message || "",
      status: 'New',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    store.enquiries.unshift(newEnquiry);
    store.analytics.enquiriesCount = store.enquiries.length;
    saveStoreData(store);

    return NextResponse.json({ success: true, enquiry: newEnquiry });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
