import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/db'

export async function GET() {
  try {
    const snap = await adminDb.collection('promo_codes').get()
    const list: any[] = []
    snap.forEach((d) => list.push({ id: d.id, ...d.data() }))
    return NextResponse.json({ promoCodes: list })
  } catch (error) {
    console.error('Error fetching promo codes:', error)
    return NextResponse.json({ promoCodes: [] }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const code = body.code.toUpperCase().trim()
    
    if (!code || !body.discountValue) {
      return NextResponse.json({ success: false, message: 'Code and discount value are required' }, { status: 400 })
    }

    const docRef = adminDb.collection('promo_codes').doc(code)
    await docRef.set({
      ...body,
      code,
      usedCount: 0,
      createdAt: new Date().toISOString()
    })

    return NextResponse.json({ success: true, id: code }, { status: 201 })
  } catch (error) {
    console.error('Error creating promo code:', error)
    return NextResponse.json({ success: false, message: 'Failed to create promo code' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    if (!id) return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 })

    const docRef = adminDb.collection('promo_codes').doc(id)
    await docRef.update(data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating promo code:', error)
    return NextResponse.json({ success: false, message: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 })

    await adminDb.collection('promo_codes').doc(id).delete()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting promo code:', error)
    return NextResponse.json({ success: false, message: 'Failed to delete' }, { status: 500 })
  }
}