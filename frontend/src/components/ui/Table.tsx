import type { ReactNode } from 'react'

interface Column<T> {
  header: string
  render: (row: T) => ReactNode
  className?: string
}

interface TableProps<T> {
  columns: Column<T>[]
  rows: T[]
  keyFn: (row: T) => string | number
  emptyMessage?: string
}

export default function Table<T>({ columns, rows, keyFn, emptyMessage = 'Nothing here yet.' }: TableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-ink-100 bg-white py-12 text-center text-sm text-ink-400">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-md border border-ink-50 bg-white shadow-panel">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-ink-50 bg-ink-50/40">
            {columns.map((col) => (
              <th key={col.header} className="px-5 py-3 font-medium text-ink-400">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={keyFn(row)} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/30">
              {columns.map((col) => (
                <td key={col.header} className={`px-5 py-3.5 text-ink-900 ${col.className ?? ''}`}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
