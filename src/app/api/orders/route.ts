import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer, totalAmount } = body;

    // Validation
    if (!items || !items.length) {
      return NextResponse.json({ error: 'Order must contain items' }, { status: 400 });
    }
    
    if (!customer || !customer.fullName || !customer.phone || !customer.pincode || !customer.city || !customer.address) {
      return NextResponse.json({ error: 'Incomplete customer details' }, { status: 400 });
    }

    // Generate unique mock string ID e.g., OD148392134
    const uniqueOrderId = `OD${Math.floor(Math.random() * 1000000000000000)}`;

    const order = await prisma.order.create({
      data: {
        id: uniqueOrderId,
        fullName: customer.fullName,
        email: customer.email || null,
        phone: customer.phone,
        pincode: customer.pincode,
        city: customer.city,
        address: customer.address,
        totalAmount: totalAmount,
        
        // Relationship insertion wrapper
        items: {
          create: items.map((item: any) => ({
            product: { connect: { id: item.id } }, // Connect to existing products
            quantity: item.quantity,
            pricePaid: item.numericPrice
          }))
        }
      },
      // Include items in response to verify deep save
      include: {
         items: true
      }
    });

    return NextResponse.json({ message: 'Order placed successfully', order }, { status: 201 });
  } catch (error: any) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('API Error processing order:', errorMsg);
    return NextResponse.json(
      { error: errorMsg }, 
      { status: 500 }
    );
  }
}
