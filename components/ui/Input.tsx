interface InputProps {
  label?: string
  placeholder?: string
  value?: string
  type?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  className?: string
  multiline?: boolean
  rows?: number
}

export default function Input({
  label,
  placeholder,
  value,
  type = 'text',
  onChange,
  className,
  multiline = false,
  rows = 3,
}: InputProps) {
  return (
    <div className={className}>
      {label && <div className="form-label">{label}</div>}
      {multiline ? (
        <textarea
          className="form-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          style={{ minHeight: 60 }}
        />
      ) : (
        <input
          className="form-input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  )
}