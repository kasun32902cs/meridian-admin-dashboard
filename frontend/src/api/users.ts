import { apiClient } from './client'
import type { User, UserRole } from '@/types'

export const getUsers = () => apiClient.get<User[]>('/users').then((r) => r.data)

export const updateUser = (id: number, data: { fullName: string; role: UserRole; isActive: boolean }) =>
  apiClient.put<User>(`/users/${id}`, data).then((r) => r.data)

export const deleteUser = (id: number) => apiClient.delete(`/users/${id}`)
