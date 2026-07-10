import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const giftRequest = {
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    const docRef = await addDoc(collection(db, 'gifts'), giftRequest)

    return NextResponse.json(
      { success: true, requestId: docRef.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Gift request error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit gift request' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Gift request ID is required' },
        { status: 400 }
      )
    }

    await deleteDoc(doc(db, 'gifts', id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Gift deletion error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete gift request' },
      { status: 500 }
    )
  }
}