import { OCCASIONS } from '@/lib/constants'
import Badge from '@/components/ui/Badge'

interface OccasionSelectorProps {
  selected: string
  onChange: (occasion: string) => void
}

export default function OccasionSelector({ selected, onChange }: OccasionSelectorProps) {
  return (
    <div className="occasions">
      {OCCASIONS.map((occ) => (
        <span
          key={occ}
          className="occ-tag"
          style={{
            cursor: 'pointer',
            background: selected === occ ? 'rgba(199,165,106,.3)' : undefined,
            borderColor: selected === occ ? 'rgba(199,165,106,.6)' : undefined,
          }}
          onClick={() => onChange(occ)}
        >
          {occ}
        </span>
      ))}
    </div>
  )
}