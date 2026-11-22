// lib/flavors.ts — المصدر الموحد لتعريف النكهة والتطبيع والـ fallback
// آمن للاستخدام في Client و Server (لا يستورد أي SDK)
import { CMS_DEFAULTS } from './cms-config'

export interface Flavor {
  name: string
  image?: string
  desc?: string
  badge?: string
  type?: string
}

// تطبيع أي شكل بيانات نكهات (string أو object) إلى شكل Flavor موحد
export function normalizeFlavors(raw: unknown): Flavor[] {
  if (!Array.isArray(raw)) return []
  return (raw as any[])
    .map((f) => (typeof f === 'string' ? { name: f } : f))
    .filter((f) => f && typeof f.name === 'string' && f.name.trim() !== '')
}

// الـ fallback الرسمي = نفس الإعدادات الافتراضية الموجودة في الـ CMS
// (بدون إنشاء أي قائمة نكهات جديدة — الإعدادات دي هي نفسها المستخدمة في لوحة الأدمن)
export const FALLBACK_FLAVORS: Flavor[] = normalizeFlavors(CMS_DEFAULTS.flavors || [])