import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import DashboardLayout from '@/components/layout/DashboardLayout'
import LoginPage from '@/pages/LoginPage'
import DashboardHome from '@/pages/DashboardHome'
import ProjectsPage from '@/pages/ProjectsPage'
import UsersPage from '@/pages/UsersPage'
import NotFoundPage from '@/pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/users" element={<UsersPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
