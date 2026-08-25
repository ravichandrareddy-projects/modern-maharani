import { NextResponse } from 'next/server';
import { getStoreData, saveStoreData } from '@/lib/db';
import { WhatsAppLead } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const store = getStoreData();

    const newLead: WhatsAppLead = {
      id: `lead-${Date.now()}`,
      productName: body.productName || "",
      productSlug: body.productSlug || "",
      sourcePage: body.sourcePage || "Website",
      ctaClicked: body.ctaClicked || "WhatsApp Button",
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    store.whatsAppLeads.unshift(newLead);
    store.analytics.whatsAppLeadsCount = store.whatsAppLeads.length;
    saveStoreData(store);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error logging whatsapp lead:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
