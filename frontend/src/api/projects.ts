import { apiClient } from './client'
import type { ProjectItem, ProjectStatus } from '@/types'

export const getProjects = () => apiClient.get<ProjectItem[]>('/projects').then((r) => r.data)

export const createProject = (data: { name: string; description: string; ownerId: number; dueDate: string | null }) =>
  apiClient.post<ProjectItem>('/projects', data).then((r) => r.data)

export const updateProject = (
  id: number,
  data: { name: string; description: string; status: ProjectStatus; dueDate: string | null },
) => apiClient.put<ProjectItem>(`/projects/${id}`, data).then((r) => r.data)

export const deleteProject = (id: number) => apiClient.delete(`/projects/${id}`)
