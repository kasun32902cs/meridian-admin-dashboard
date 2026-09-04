import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function ProtectedRoute() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-canvas">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return <Outlet />
}
