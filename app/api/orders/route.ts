import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { generateOrderId } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const order = {
      ...body,
      id: generateOrderId(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    const docRef = await addDoc(collection(db, 'orders'), order)

    return NextResponse.json(
      { success: true, orderId: docRef.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create order' },
      { status: 500 }
    )
  }
}