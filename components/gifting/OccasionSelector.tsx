'use client'

import { useState } from 'react'
import { OCCASIONS } from '@/lib/constants'

interface OccasionSelectorProps {
  selected: string
  onChange: (occasion: string) => void
}

export default function OccasionSelector({ selected, onChange }: OccasionSelectorProps) {
  const [otherValue, setOtherValue] = useState('')
  const allOccasions = [...OCCASIONS, 'Other']

  const handleSelect = (occ: string) => {
    if (occ === 'Other') {
      onChange('Other')
    } else {
      setOtherValue('')
      onChange(occ)
    }
  }

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherValue(e.target.value)
    onChange(`Other: ${e.target.value}`)
  }

  const isOtherSelected = selected === 'Other' || selected?.startsWith('Other:')

  return (
    <div>
      <div className="modal-occasions" role="radiogroup" aria-label="Select occasion">
        {allOccasions.map((occ) => (
          <span
            key={occ}
            className={`modal-occ-tag${isOtherSelected && occ === 'Other' ? ' modal-occ-tag--active' : ''}${selected === occ && occ !== 'Other' ? ' modal-occ-tag--active' : ''}`}
            onClick={() => handleSelect(occ)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleSelect(occ)
              }
            }}
            role="radio"
            tabIndex={0}
            aria-checked={
              occ === 'Other'
                ? isOtherSelected
                : selected === occ
            }
          >
            {occ}
          </span>
        ))}
      </div>
      {isOtherSelected && (
        <input
          className="form-input"
          placeholder="Please specify your occasion..."
          value={otherValue}
          onChange={handleOtherChange}
          style={{ marginTop: 12 }}
          aria-label="Specify your occasion"
        />
      )}
    </div>
  )
}