import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET() {
  try {
    // تم تصحيح المسار ليكون نصاً واحداً
    const docRef = adminDb.doc('cms/content')
    const docSnap = await docRef.get()
    return NextResponse.json({ data: docSnap.exists ? docSnap.data() : {} })
  } catch (error) {
    return NextResponse.json({ data: {} })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { section, data } = await request.json()
    // تم تصحيح المسار ليكون نصاً واحداً
    const docRef = adminDb.doc('cms/content')
    await docRef.set({ [section]: data }, { merge: true })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving CMS:", error);
    return NextResponse.json({ success: false, message: 'Failed to save' }, { status: 500 })
  }
}