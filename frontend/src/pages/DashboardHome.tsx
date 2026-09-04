import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import Topbar from '@/components/layout/Topbar'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import Table from '@/components/ui/Table'
import { getDashboardSummary } from '@/api/dashboard'
import type { DashboardSummary } from '@/types'

export default function DashboardHome() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getDashboardSummary()
      .then(setSummary)
      .catch(() => setError('Could not load dashboard data. Is the API running?'))
  }, [])

  return (
    <>
      <Topbar title="Overview" />
      <main className="flex-1 overflow-y-auto scrollbar-thin px-8 py-6">
        {error && (
          <div className="mb-6 rounded-md border border-rose-500/30 bg-rose-500/5 px-4 py-3 text-sm text-rose-500">
            {error}
          </div>
        )}

        {summary && (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard label="Active projects" value={summary.activeProjects} hint={`${summary.totalProjects} total`} accent="teal" emphasize />
              <StatCard label="Open tasks" value={summary.totalTasks - summary.tasksDone} hint={`${summary.tasksDone} completed`} accent="ochre" />
              <StatCard label="Overdue tasks" value={summary.tasksOverdue} accent="rose" />
              <StatCard label="Team members" value={summary.activeUsers} hint={`${summary.totalUsers} total`} accent="ink" />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
              <div className="rounded-md border border-ink-50 bg-white p-5 shadow-panel lg:col-span-2">
                <h2 className="font-display text-base font-semibold text-ink-900">Tasks by status</h2>
                <div className="mt-4 h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={summary.taskStatusBreakdown} margin={{ left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F3" vertical={false} />
                      <XAxis dataKey="status" tick={{ fontSize: 12, fill: '#4B5F6B' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: '#4B5F6B' }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip cursor={{ fill: '#F1F3F1' }} contentStyle={{ borderRadius: 8, border: '1px solid #EEF1F3', fontSize: 13 }} />
                      <Bar dataKey="count" fill="#1F6F6B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-3">
                <h2 className="mb-3 font-display text-base font-semibold text-ink-900">Recent activity</h2>
                <Table
                  columns={[
                    { header: 'Task', render: (r) => r.title },
                    { header: 'Project', render: (r) => r.projectName },
                    { header: 'Status', render: (r) => <Badge label={r.status} /> },
                  ]}
                  rows={summary.recentTasks}
                  keyFn={(r) => r.id}
                  emptyMessage="No tasks yet."
                />
              </div>
            </div>
          </>
        )}
      </main>
    </>
  )
}
