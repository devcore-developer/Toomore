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
  onRowClick?: (row: any) => void
}

export default function DataTable({ columns, data, onAction, actions, onRowClick }: DataTableProps) {
  const [search, setSearch] = useState('')

  const filtered = data.filter((row) =>
    columns.some((col) => {
      const val = row[col.key]
      return val && String(val).toLowerCase().includes(search.toLowerCase())
    })
  )

  return (
    <div className="data-table-wrapper">
      <div className="data-table-header">
        <div className="data-table-count">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="data-table-search"
          aria-label="Search table"
        />
      </div>

      <div className="data-table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
              {actions && <th className="data-table-th-actions">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="data-table-empty">
                  No data found
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr 
                  key={row.id || i} 
                  onClick={() => onRowClick?.(row)}
                  style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="data-table-td-actions">
                      {actions.map((action) => (
                        <button
                          key={action.value}
                          onClick={(e) => {
                            e.stopPropagation() // مهم جداً عشان لما تغير الحالة مفتحش الفاتورة
                            onAction?.(action.value, row)
                          }}
                          className={`data-table-action${action.color === '#C65A2E' ? ' data-table-action--danger' : ''}`}
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