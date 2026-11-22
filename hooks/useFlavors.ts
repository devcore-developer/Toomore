'use client'

import { useCallback, useEffect, useState } from 'react'
import { Flavor } from '@/lib/flavors'

// حدث عام يُطلق بعد حفظ النكهات من لوحة الأدمن
// كل مكون مفتوح يستخدم useFlavors يعيد الجلب فورًا بدون reload
export const FLAVORS_UPDATED_EVENT = 'toomore:flavors-updated'

// الخطاف الموحد لجلب النكهات في واجهة العميل
// يجلب دائمًا من /api/flavors (الذي يقرأ من قاعدة البيانات في كل طلب)
// حتى تظهر نكهات الأدمن الجديدة فورًا بدون أي redeploy
export function useFlavors() {
  const [flavors, setFlavors] = useState<Flavor[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/flavors')
      const data = await res.json()
      setFlavors(Array.isArray(data.flavors) ? data.flavors : [])
    } catch {
      // في حال فشل الطلب نبقي القائمة الحالية كما هي (بدون تدمير الواجهة)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
    const handler = () => { refresh() }
    window.addEventListener(FLAVORS_UPDATED_EVENT, handler)
    return () => window.removeEventListener(FLAVORS_UPDATED_EVENT, handler)
  }, [refresh])

  return { flavors, loading, refresh }
}