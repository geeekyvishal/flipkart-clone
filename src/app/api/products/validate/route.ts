import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { ids } = await request.json();
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ validIds: [] });
    }
    
    const products = await prisma.product.findMany({
      where: { id: { in: ids } },
      select: { id: true }
    });
    
    return NextResponse.json({ validIds: products.map(p => p.id) });
  } catch (error) {
    console.error("Cart validation API failed:", error);
    return NextResponse.json({ error: "Failed to validate" }, { status: 500 });
  }
}
