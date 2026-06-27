import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/db'

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await adminDb.collection('testimonials').doc(params.id).delete()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'فشل في الحذف' }, { status: 500 })
  }
}