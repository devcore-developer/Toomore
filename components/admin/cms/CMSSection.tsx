'use client'

import { useState } from 'react'
import CMSImageUploader from './CMSImageUploader'
import { CMSFieldConfig, CMSSectionConfig } from '@/lib/cms-config'

interface Props {
  section: CMSSectionConfig
  data: any
  defaults: Record<string, any>
  onSave: (sectionId: string, data: any) => void
}

export default function CMSSection({ section, data, defaults, onSave }: Props) {
  const [isOpen, setIsOpen] = useState(true)
  const [localData, setLocalData] = useState(data || defaults[section.id] || {})

  const handleFieldChange = (key: string, value: string) => {
    setLocalData((prev: any) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    onSave(section.id, localData)
  }

  const renderField = (field: CMSFieldConfig, value: any, onChange: (v: string) => void) => {
    switch (field.type) {
      case 'image':
        return (
          <CMSImageUploader
            value={value || ''}
            label={field.label}
            recommendedWidth={field.recommendedWidth}
            recommendedHeight={field.recommendedHeight}
            aspectRatio={field.aspectRatio}
            maxFileSize={field.maxFileSize}
            formats={field.formats}
            onChange={onChange}
          />
        )
      case 'textarea':
        return (
          <div className="cms-field">
            <label className="cms-field-label">{field.label}</label>
            <textarea
              className="cms-field-textarea"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              rows={3}
              placeholder={field.defaultValue || ''}
            />
          </div>
        )
      default:
        return (
          <div className="cms-field">
            <label className="cms-field-label">{field.label}</label>
            <input
              className="cms-field-input"
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={field.defaultValue || ''}
            />
          </div>
        )
    }
  }

  // Array sections (flavors, products, why toomore)
  if (section.type === 'array') {
    const items: any[] = Array.isArray(localData) ? localData : defaults[section.id] || []
    const itemFields = section.arrayItemFields || []

    const handleItemChange = (index: number, key: string, value: string) => {
      setLocalData((prev: any) => {
        const arr = Array.isArray(prev) ? [...prev] : []
        arr[index] = { ...arr[index], [key]: value }
        return arr
      })
    }

    const addItem = () => {
      const newItem: any = {}
      itemFields.forEach(f => { newItem[f.key] = '' })
      setLocalData((prev: any) => [...(Array.isArray(prev) ? prev : []), newItem])
    }

    const removeItem = (index: number) => {
      setLocalData((prev: any) => (Array.isArray(prev) ? prev.filter((_, i) => i !== index) : []))
    }

    return (
      <div className="cms-section">
        <button className="cms-section-header" onClick={() => setIsOpen(!isOpen)}>
          <div className="cms-section-title-wrap">
            <span className="cms-section-icon">{section.icon}</span>
            <h3 className="cms-section-title">{section.title}</h3>
          </div>
          <span className={`cms-section-chevron${isOpen ? ' cms-section-chevron--open' : ''}`}>▼</span>
        </button>
        {isOpen && (
          <div className="cms-section-body">
            {items.map((item, i) => (
              <div key={i} className="cms-array-item">
                <div className="cms-array-item-header">
                  <span>Item {i + 1}</span>
                  <button className="cms-btn-danger" onClick={() => removeItem(i)}>Remove</button>
                </div>
                {itemFields.map(field => (
                  <div key={field.key}>{renderField(field, item[field.key], (v) => handleItemChange(i, field.key, v))}</div>
                ))}
              </div>
            ))}
            <button className="cms-btn-add" onClick={addItem}>+ Add Item</button>
            <button className="cms-btn-save" onClick={handleSave}>Save Changes</button>
          </div>
        )}
      </div>
    )
  }

  // Regular fields sections
  return (
    <div className="cms-section">
      <button className="cms-section-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="cms-section-title-wrap">
          <span className="cms-section-icon">{section.icon}</span>
          <h3 className="cms-section-title">{section.title}</h3>
        </div>
        <span className={`cms-section-chevron${isOpen ? ' cms-section-chevron--open' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className="cms-section-body">
          {section.fields.map(field => (
            <div key={field.key}>{renderField(field, localData[field.key], (v) => handleFieldChange(field.key, v))}</div>
          ))}
          <button className="cms-btn-save" onClick={handleSave}>Save Changes</button>
        </div>
      )}
    </div>
  )
}