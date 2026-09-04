import { useEffect, useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import Table from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import { getUsers, updateUser, deleteUser } from '@/api/users'
import { useAuth } from '@/context/AuthContext'
import type { User } from '@/types'

export default function UsersPage() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)

  const load = () => {
    getUsers().then(setUsers).catch(() => setError('Could not load team members.'))
  }

  useEffect(load, [])

  const toggleActive = async (u: User) => {
    await updateUser(u.id, { fullName: u.fullName, role: u.role, isActive: !u.isActive })
    load()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Remove this user? This cannot be undone.')) return
    await deleteUser(id)
    load()
  }

  const isAdmin = currentUser?.role === 'Admin'

  return (
    <>
      <Topbar title="Team" />
      <main className="flex-1 overflow-y-auto scrollbar-thin px-8 py-6">
        {error && <p className="mb-4 text-sm text-rose-500">{error}</p>}
        <p className="mb-5 text-sm text-ink-400">{users.length} people</p>

        <Table
          columns={[
            { header: 'Name', render: (u) => <span className="font-medium">{u.fullName}</span> },
            { header: 'Email', render: (u) => u.email },
            { header: 'Role', render: (u) => <Badge label={u.role} tone="neutral" /> },
            { header: 'Status', render: (u) => <Badge label={u.isActive ? 'Active' : 'Disabled'} /> },
            {
              header: '',
              render: (u) =>
                isAdmin ? (
                  <div className="flex gap-3 text-xs">
                    <button onClick={() => toggleActive(u)} className="text-ink-400 hover:text-ink-900">
                      {u.isActive ? 'Disable' : 'Enable'}
                    </button>
                    <button onClick={() => handleDelete(u.id)} className="text-ink-400 hover:text-rose-500">
                      Remove
                    </button>
                  </div>
                ) : null,
            },
          ]}
          rows={users}
          keyFn={(u) => u.id}
        />
      </main>
    </>
  )
}
