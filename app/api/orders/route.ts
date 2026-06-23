import { NextRequest, NextResponse } from 'next/server'
import { generateOrderId } from '@/lib/utils'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const order = {
    id: generateOrderId(),
    ...body,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  // TODO: Save to database
  console.log('New order:', order)

  return NextResponse.json(
    { success: true, orderId: order.id },
    { status: 201 }
  )
}