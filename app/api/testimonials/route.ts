import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/db'

export async function GET() {
  try {
    const snapshot = await adminDb
      .collection('testimonials')
      .orderBy('createdAt', 'desc')
      .get()

    const testimonials = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((t: any) => t.active !== false)

    return NextResponse.json(testimonials)
  } catch (error: any) {
    console.error('Testimonials API error:', error?.message)
    return NextResponse.json({ error: 'فشل في تحميل التقييمات' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, title, text, rating } = body

    if (!name || !text) {
      return NextResponse.json({ error: 'الاسم والنص مطلوبين' }, { status: 400 })
    }

    const docRef = await adminDb.collection('testimonials').add({
      name,
      title: title || '',
      text,
      rating: rating || 5,
      active: true,
      createdAt: new Date().toISOString(),
    })

    const doc = await docRef.get()

    return NextResponse.json({ id: doc.id, ...doc.data() }, { status: 201 })
  } catch (error: any) {
    console.error('Testimonials POST error:', error?.message)
    return NextResponse.json({ error: 'فشل في إضافة التقييم' }, { status: 500 })
  }
}