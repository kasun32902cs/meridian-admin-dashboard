import { apiClient } from './client'
import type { TaskItem, TaskPriority, WorkItemStatus } from '@/types'

export const getTasks = (projectId?: number) =>
  apiClient
    .get<TaskItem[]>('/tasks', { params: projectId ? { projectId } : {} })
    .then((r) => r.data)

export const createTask = (data: {
  title: string
  notes: string | null
  priority: TaskPriority
  projectId: number
  assigneeId: number | null
  dueDate: string | null
}) => apiClient.post<TaskItem>('/tasks', data).then((r) => r.data)

export const updateTask = (
  id: number,
  data: {
    title: string
    notes: string | null
    priority: TaskPriority
    status: WorkItemStatus
    assigneeId: number | null
    dueDate: string | null
  },
) => apiClient.put<TaskItem>(`/tasks/${id}`, data).then((r) => r.data)

export const deleteTask = (id: number) => apiClient.delete(`/tasks/${id}`)
