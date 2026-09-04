import { useEffect, useState, type FormEvent } from 'react'
import Topbar from '@/components/layout/Topbar'
import Table from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { getProjects, createProject, deleteProject } from '@/api/projects'
import { getUsers } from '@/api/users'
import type { ProjectItem, User } from '@/types'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [ownerId, setOwnerId] = useState<number | ''>('')
  const [error, setError] = useState<string | null>(null)

  const load = () => {
    getProjects().then(setProjects).catch(() => setError('Could not load projects.'))
  }

  useEffect(() => {
    load()
    getUsers().then(setUsers).catch(() => {})
  }, [])

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault()
    if (!ownerId) return
    await createProject({ name, description, ownerId: Number(ownerId), dueDate: null })
    setName('')
    setDescription('')
    setOwnerId('')
    setShowForm(false)
    load()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this project? Its tasks will be removed too.')) return
    await deleteProject(id)
    load()
  }

  return (
    <>
      <Topbar title="Projects" />
      <main className="flex-1 overflow-y-auto scrollbar-thin px-8 py-6">
        {error && <p className="mb-4 text-sm text-rose-500">{error}</p>}

        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-ink-400">{projects.length} projects</p>
          <Button onClick={() => setShowForm((v) => !v)}>{showForm ? 'Cancel' : 'New project'}</Button>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="mb-6 grid grid-cols-1 gap-4 rounded-md border border-ink-50 bg-white p-5 shadow-panel sm:grid-cols-4">
            <input
              required
              placeholder="Project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border border-ink-100 px-3 py-2 text-sm outline-none focus:border-teal-500 sm:col-span-2"
            />
            <input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-md border border-ink-100 px-3 py-2 text-sm outline-none focus:border-teal-500"
            />
            <select
              required
              value={ownerId}
              onChange={(e) => setOwnerId(Number(e.target.value))}
              className="rounded-md border border-ink-100 px-3 py-2 text-sm outline-none focus:border-teal-500"
            >
              <option value="">Owner…</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.fullName}</option>
              ))}
            </select>
            <div className="sm:col-span-4">
              <Button type="submit">Create project</Button>
            </div>
          </form>
        )}

        <Table
          columns={[
            { header: 'Name', render: (p) => <span className="font-medium">{p.name}</span> },
            { header: 'Owner', render: (p) => p.ownerName },
            { header: 'Status', render: (p) => <Badge label={p.status} /> },
            { header: 'Tasks', render: (p) => p.taskCount },
            {
              header: '',
              render: (p) => (
                <button onClick={() => handleDelete(p.id)} className="text-xs text-ink-400 hover:text-rose-500">
                  Delete
                </button>
              ),
            },
          ]}
          rows={projects}
          keyFn={(p) => p.id}
          emptyMessage="No projects yet. Create your first one above."
        />
      </main>
    </>
  )
}
