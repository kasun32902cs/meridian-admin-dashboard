export type UserRole = 'Admin' | 'Manager' | 'Member'
export type ProjectStatus = 'Planned' | 'Active' | 'OnHold' | 'Completed'
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent'
export type WorkItemStatus = 'Todo' | 'InProgress' | 'Blocked' | 'Done'

export interface User {
  id: number
  fullName: string
  email: string
  role: UserRole
  isActive: boolean
  createdAt: string
  lastLoginAt: string | null
}

export interface AuthResponse {
  token: string
  expiresAt: string
  user: User
}

export interface ProjectItem {
  id: number
  name: string
  description: string
  status: ProjectStatus
  createdAt: string
  dueDate: string | null
  ownerId: number
  ownerName: string
  taskCount: number
}

export interface TaskItem {
  id: number
  title: string
  notes: string | null
  priority: TaskPriority
  status: WorkItemStatus
  createdAt: string
  dueDate: string | null
  projectId: number
  projectName: string
  assigneeId: number | null
  assigneeName: string | null
}

export interface DashboardSummary {
  totalUsers: number
  activeUsers: number
  totalProjects: number
  activeProjects: number
  totalTasks: number
  tasksDone: number
  tasksOverdue: number
  taskStatusBreakdown: { status: string; count: number }[]
  recentTasks: { id: number; title: string; projectName: string; status: string; createdAt: string }[]
}
