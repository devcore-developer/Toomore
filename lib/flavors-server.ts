// lib/flavors-server.ts — جلب النكهات على السيرفر من مصدر واحد
// هذا هو المصدر الوحيد الذي تستخدمه: /api/flavors و /api/orders وأي Server Component
// المصدر الرسمي = مستند cms/content.flavors (الذي تديره لوحة الأدمن)
import { adminDb } from '@/lib/db'
import { Flavor, normalizeFlavors, FALLBACK_FLAVORS } from './flavors'

export async function getFlavors(): Promise<Flavor[]> {
  try {
    // 1) المصدر الأساسي: المستند الذي تكتبه لوحة الأدمن (cms/content.flavors)
    const docSnap = await adminDb.doc('cms/content').get()
    const raw = docSnap.exists ? docSnap.data() ?? {} : {}
    const flavors = normalizeFlavors(raw.flavors)
    if (flavors.length > 0) return flavors

    // 2) توافق مع بيانات قديمة محفوظة في مستند مستقل cms/flavors (إن وُجد)
    const legacySnap = await adminDb.doc('cms/flavors').get()
    const legacyRaw = legacySnap.exists ? legacySnap.data() ?? {} : {}
    const legacy = normalizeFlavors(legacyRaw.items || legacyRaw.flavors || [])
    if (legacy.length > 0) return legacy

    // 3) الـ fallback الرسمي (نفس سلوك النظام السابق عند عدم وجود بيانات)
    return FALLBACK_FLAVORS
  } catch (error) {
    console.error('Failed to fetch flavors:', error)
    // في حال فشل الاتصال نرجّع الإعدادات الافتراضية بدلاً من قائمة فاضية
    return FALLBACK_FLAVORS
  }
}