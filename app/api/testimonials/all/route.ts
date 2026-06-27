import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/db'

export async function GET() {
  try {
    const snapshot = await adminDb
      .collection('testimonials')
      .orderBy('createdAt', 'desc')
      .get()

    const testimonials = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json(testimonials)
  } catch (error) {
    return NextResponse.json({ error: 'فشل في تحميل التقييمات' }, { status: 500 })
  }
}