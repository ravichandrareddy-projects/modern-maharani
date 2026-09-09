import { NextResponse } from 'next/server';
import { getStoreData, saveStoreData } from '@/lib/db';
import { Order, OrderStatus } from '@/lib/types';

export async function GET() {
  const store = getStoreData();
  return NextResponse.json({ orders: store.orders || [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const store = getStoreData();

    const orderCount = (store.orders ? store.orders.length : 0) + 1;
    const orderNumber = `MM-${1000 + orderCount}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: body.customerName || "Customer",
      phone: body.phone || "",
      email: body.email || "",
      deliveryType: body.deliveryType || "Home Delivery",
      shippingAddress: body.shippingAddress || "",
      paymentMethod: body.paymentMethod || "Cash on Delivery (COD)",
      items: body.items || [],
      subtotal: Number(body.subtotal) || 0,
      discountAmount: Number(body.discountAmount) || 0,
      appliedCoupon: body.appliedCoupon || "",
      totalAmount: Number(body.totalAmount) || 0,
      status: "Pending",
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    if (!store.orders) store.orders = [];
    store.orders.unshift(newOrder);

    // Deduct stock automatically for each ordered item
    if (newOrder.items && newOrder.items.length > 0 && store.products) {
      newOrder.items.forEach((item) => {
        const prodIndex = store.products.findIndex(
          (p) => p.id === item.productId || p.slug === item.productSlug
        );
        if (prodIndex !== -1) {
          const currentStock = store.products[prodIndex].stock || 0;
          const qty = item.quantity || 1;
          const newStock = Math.max(0, currentStock - qty);
          store.products[prodIndex].stock = newStock;

          if (store.products[prodIndex].sizeStock && item.selectedSize) {
            const szStock = store.products[prodIndex].sizeStock[item.selectedSize] || 0;
            store.products[prodIndex].sizeStock[item.selectedSize] = Math.max(0, szStock - qty);
          }

          if (newStock === 0) {
            store.products[prodIndex].availability = 'Out of Stock';
          } else if (newStock <= 3) {
            store.products[prodIndex].availability = 'Limited Stock';
          }
        }
      });
    }

    // Update analytics
    store.analytics.ordersCount = store.orders.length;
    store.analytics.totalRevenue = (store.analytics.totalRevenue || 0) + newOrder.totalAmount;

    saveStoreData(store);

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ success: false, message: "Failed to place order" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orderId, status, notes } = body;
    const store = getStoreData();

    if (!store.orders) store.orders = [];

    store.orders = store.orders.map((ord) => {
      if (ord.id === orderId) {
        return {
          ...ord,
          status: status !== undefined ? (status as OrderStatus) : ord.status,
          notes: notes !== undefined ? notes : ord.notes
        };
      }
      return ord;
    });

    saveStoreData(store);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
