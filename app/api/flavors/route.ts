import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/db'
import { CMS_DEFAULTS } from '@/lib/cms-config'

export async function GET() {
  try {
    // جلب كل مستندات الـ CMS للعثور على النكهات أينما كانت مخزنة
    const snap = await adminDb.collection('cms').get()
    let flavorsData: any[] = []
    
    snap.forEach((doc) => {
      const data = doc.data()
      // البحث عن مستند النكهات سواء كان الـ ID هو 'flavors' أو يحتوي على المصفوفة داخله
      if (doc.id === 'flavors' || data.id === 'flavors') {
        flavorsData = data.items || data.flavors || []
      } else if (data.flavors && Array.isArray(data.flavors)) {
        flavorsData = data.flavors
      }
    })

    if (flavorsData.length > 0) {
      // تطبيع البيانات لضمان وجود اسم لكل نكهة
      const normalizedFlavors = flavorsData
        .map((f: any) => (typeof f === 'string' ? { name: f, image: '', desc: '' } : f))
        .filter((f: any) => f && f.name)
      return NextResponse.json({ flavors: normalizedFlavors })
    }
    
    // التراجع للإعدادات الافتراضية فقط إذا لم تجد أي بيانات
    const defaultNormalized = (CMS_DEFAULTS.flavors || [])
      .map((f: any) => (typeof f === 'string' ? { name: f } : f))
      .filter((f: any) => f && f.name)
      
    return NextResponse.json({ flavors: defaultNormalized })
  } catch (error) {
    console.error('Error fetching flavors:', error)
    return NextResponse.json({ flavors: [] }, { status: 500 })
  }
}