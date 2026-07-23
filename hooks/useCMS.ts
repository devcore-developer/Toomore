'use client'

import { useState, useEffect } from 'react'
import { CMS_DEFAULTS } from '@/lib/cms-config'

// دالة مساعدة لفك أي أوبجكتات متداخلة (مثل hero: { hero_desktop: ... })
// وتحويلها إلى مستوى واحد (hero_desktop: ...)
function flattenData(obj: Record<string, any>): Record<string, any> {
  const flat: Record<string, any> = {}
  for (const key in obj) {
    const val = obj[key]
    // إذا كان القسم عبارة عن أوبجكت (مثل الهيرو) وليس Array (مثل النكهات)
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      Object.assign(flat, val) // نخرج محتوياته للمستوى الأول
    } else {
      flat[key] = val // نترك الـ Arrays كما هي
    }
  }
  return flat
}

export function useCMS() {
  const [data, setData] = useState<Record<string, any>>({})
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const fetchCMS = async () => {
      try {
        const res = await fetch('/api/cms')
        const result = await res.json()
        const rawData = result.data || {}
        
        // تسطيح البيانات قبل حفظها في الـ State
        setData(flattenData(rawData))
      } catch {
        // Silent fallback
      } finally {
        setReady(true)
      }
    }
    fetchCMS()
  }, [])

  const get = (key: string, fallback: string): string => {
    const val = ready ? data[key] : undefined
    if (val !== undefined && val !== null && val !== '') return val as string
    return fallback
  }

  const getArray = (key: string, fallback: any[]): any[] => {
    if (!ready) return fallback
    const val = data[key]
    if (Array.isArray(val) && val.length > 0) return val
    return fallback
  }

  return { data, get, getArray, ready }
}