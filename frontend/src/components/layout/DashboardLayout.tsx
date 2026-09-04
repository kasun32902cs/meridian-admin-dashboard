import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}
