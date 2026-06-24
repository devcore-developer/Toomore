'use client'

import { useState } from 'react'

interface Column {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  onAction?: (action: string, row: any) => void
  actions?: { label: string; value: string; color?: string }[]
}

export default function DataTable({ columns, data, onAction, actions }: DataTableProps) {
  const [search, setSearch] = useState('')

  const filtered = data.filter((row) =>
    columns.some((col) => {
      const val = row[col.key]
      return val && String(val).toLowerCase().includes(search.toLowerCase())
    })
  )

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div style={{ fontSize: 14, color: '#6A675F' }}>
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '10px 16px',
            borderRadius: 10,
            border: '1px solid rgba(14,91,79,0.12)',
            fontSize: 13,
            width: 240,
            fontFamily: 'var(--font-inter), sans-serif',
            outline: 'none',
            background: '#fff',
          }}
        />
      </div>

      <div style={{ overflowX: 'auto', borderRadius: 16, border: '1px solid rgba(14,91,79,0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={{
                  padding: '14px 20px',
                  textAlign: 'left',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#6A675F',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  borderBottom: '1px solid rgba(14,91,79,0.08)',
                  background: '#F9F6F0',
                  whiteSpace: 'nowrap',
                }}>
                  {col.label}
                </th>
              ))}
              {actions && (
                <th style={{
                  padding: '14px 20px',
                  textAlign: 'right',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#6A675F',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  borderBottom: '1px solid rgba(14,91,79,0.08)',
                  background: '#F9F6F0',
                }}>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} style={{
                  padding: 48,
                  textAlign: 'center',
                  color: '#6A675F',
                  fontSize: 14,
                }}>
                  No data found
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr key={row.id || i} style={{ borderBottom: '1px solid rgba(14,91,79,0.05)' }}>
                  {columns.map((col) => (
                    <td key={col.key} style={{
                      padding: '14px 20px',
                      fontSize: 14,
                      color: '#1E1E1E',
                      whiteSpace: 'nowrap',
                    }}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td style={{ padding: '14px 20px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      {actions.map((action) => (
                        <button
                          key={action.value}
                          onClick={() => onAction?.(action.value, row)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 500,
                            border: 'none',
                            cursor: 'pointer',
                            marginRight: 6,
                            background: action.color || 'rgba(14,91,79,0.08)',
                            color: action.color === '#C65A2E' ? '#fff' : '#0E5B4F',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {action.label}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}