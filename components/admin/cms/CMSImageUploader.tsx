'use client'

import { useState, useRef } from 'react'

interface Props {
  value: string
  label: string
  recommendedWidth?: number
  recommendedHeight?: number
  aspectRatio?: string
  maxFileSize?: number
  formats?: string
  onChange: (url: string) => void
}

export default function CMSImageUploader({
  value, label, recommendedWidth, recommendedHeight, aspectRatio, maxFileSize = 5, formats = 'JPG / PNG / WebP', onChange,
}: Props) {
  const [isUploading, setIsUploading] = useState(false)
  const [warning, setWarning] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (file.size > maxFileSize * 1024 * 1024) {
      alert(`File size must be under ${maxFileSize}MB`)
      return
    }
    if (recommendedWidth && recommendedHeight) {
      const img = new Image()
      img.onload = () => {
        if (img.width !== recommendedWidth || img.height !== recommendedHeight) {
          setWarning(`Recommended size is ${recommendedWidth} × ${recommendedHeight} px. Using different dimensions may affect the layout.`)
        }
        URL.revokeObjectURL(img.src)
      }
      img.src = URL.createObjectURL(file)
    }
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const result = await res.json()
      if (result.success) {
        onChange(result.url)
        setWarning('')
      } else {
        alert(result.message || 'Upload failed')
      }
    } catch {
      alert('Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className={`cms-uploader${isDragging ? ' cms-uploader--dragging' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="cms-uploader-info">
        <span className="cms-uploader-label">{label}</span>
        <div className="cms-uploader-meta">
          {recommendedWidth && <span>{recommendedWidth} × {recommendedHeight} px</span>}
          {aspectRatio && <span>Ratio: {aspectRatio}</span>}
          <span>{formats}</span>
          <span>Max: {maxFileSize} MB</span>
        </div>
      </div>
      <div className="cms-uploader-preview">
        {value ? (
          <img src={value} alt={label} className="cms-uploader-img" />
        ) : (
          <div className="cms-uploader-placeholder">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>No image uploaded</span>
          </div>
        )}
        {isUploading && (
          <div className="cms-uploader-overlay">
            <div className="cms-uploader-spinner" />
          </div>
        )}
      </div>
      {warning && <div className="cms-uploader-warning">{warning}</div>}
      <div className="cms-uploader-actions">
        <button className="cms-uploader-btn cms-uploader-btn--primary" onClick={() => fileRef.current?.click()}>
          {value ? 'Replace Image' : 'Upload Image'}
        </button>
        {value && (
          <button className="cms-uploader-btn cms-uploader-btn--danger" onClick={() => { onChange(''); setWarning('') }}>
            Remove Image
          </button>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
    </div>
  )
}