'use client'

import { useState, useEffect } from 'react'
import CMSSection from './CMSSection'
import { CMS_SECTIONS, CMS_DEFAULTS } from '@/lib/cms-config'

export default function CMSPage() {
  const [data, setData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [hasUnsaved, setHasUnsaved] = useState(false)

  useEffect(() => {
    const fetchCMS = async () => {
      try {
        const res = await fetch('/api/cms')
        const result = await res.json()
        setData(result.data || {})
      } catch {
        // Silently fall back to defaults
      } finally {
        setLoading(false)
      }
    }
    fetchCMS()
  }, [])

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasUnsaved) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [hasUnsaved])

  const handleSave = async (sectionId: string, sectionData: any) => {
    try {
      const res = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: sectionId, data: sectionData }),
      })
      if (res.ok) {
        setData(prev => ({ ...prev, [sectionId]: sectionData }))
        setHasUnsaved(false)
        // تم تصحيح الرسالة هنا لتطبع اسم القسم الحقيقي
        setToast({ message: `Section "${sectionId}" saved successfully!`, type: 'success' })
      } else {
        setToast({ message: 'Failed to save changes', type: 'error' })
      }
    } catch {
      setToast({ message: 'Network error', type: 'error' })
    }
  }

  if (loading) {
    return (
      <div className="cms-page">
        <div className="cms-loading">
          <div className="cms-loading-spinner" />
          <p>Loading content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="cms-page">
      <h1 className="cms-page-title">Website Content</h1>
      <p className="cms-page-subtitle">Manage all website images and content from one place.</p>
      {CMS_SECTIONS.map(section => (
        <CMSSection
          key={section.id}
          section={section}
          data={data[section.id]}
          defaults={CMS_DEFAULTS}
          onSave={handleSave}
        />
      ))}
      {toast && (
        <div className={`cms-toast cms-toast--${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}
    </div>
  )
}