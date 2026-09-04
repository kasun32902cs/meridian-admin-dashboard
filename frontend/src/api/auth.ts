import { apiClient } from './client'
import type { AuthResponse } from '@/types'

export const login = (email: string, password: string) =>
  apiClient.post<AuthResponse>('/auth/login', { email, password }).then((r) => r.data)

export const register = (fullName: string, email: string, password: string) =>
  apiClient.post<AuthResponse>('/auth/register', { fullName, email, password }).then((r) => r.data)
