// frontend/src/pages/DashboardHome.tsx
import { useEffect, useState } from 'react';
import {
  Users,
  FolderKanban,
  CheckSquare,
  TrendingUp,
  Activity,
  Clock,
} from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import { getDashboardStats, DashboardStats } from '../api/dashboard';

interface Activity {
  id: number;
  type: string;
  description: string;
  timestamp: string;
}

export default function DashboardHome() {
  // Use a more flexible state type
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    totalTasks: 0,
    completionRate: 0,
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: DashboardStats = await getDashboardStats();
        
        // Map the API response to our state structure
        setStats({
          totalUsers: data.totalUsers || 0,
          totalProjects: data.totalProjects || 0,
          totalTasks: data.totalTasks || 0,
          completionRate: data.completionRate || 75, // Default if not provided
        });

        // Set activities from API response or use mock data
        if (data.recentActivities && data.recentActivities.length > 0) {
          setActivities(data.recentActivities);
        } else {
          // Mock activities if backend doesn't provide them
          setActivities([
            { 
              id: 1, 
              type: 'user', 
              description: 'New user registered', 
              timestamp: '2 hours ago' 
            },
            { 
              id: 2, 
              type: 'project', 
              description: 'Project "Website Redesign" completed', 
              timestamp: '4 hours ago' 
            },
            { 
              id: 3, 
              type: 'task', 
              description: 'Task "UI Design" assigned to John', 
              timestamp: '6 hours ago' 
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Set default values on error
        setStats({
          totalUsers: 0,
          totalProjects: 0,
          totalTasks: 0,
          completionRate: 0,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="h-6 w-6" />}
          color="blue"
        />
        <StatCard
          title="Projects"
          value={stats.totalProjects}
          icon={<FolderKanban className="h-6 w-6" />}
          color="green"
        />
        <StatCard
          title="Tasks"
          value={stats.totalTasks}
          icon={<CheckSquare className="h-6 w-6" />}
          color="purple"
        />
        <StatCard
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          icon={<TrendingUp className="h-6 w-6" />}
          color="orange"
          change="+12%"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Activity</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart Component Here</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                  <div className="mt-1">
                    <Activity className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{activity.description}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.timestamp}
                    </p>
                  </div>
                  <Badge color="blue">{activity.type}</Badge>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <button className="bg-blue-600 text-white rounded-lg shadow p-4 hover:bg-blue-700 transition-colors card-hover">
          <FolderKanban className="h-6 w-6 mb-2 inline-block" />
          <p className="font-semibold">Create Project</p>
        </button>
        <button className="bg-green-600 text-white rounded-lg shadow p-4 hover:bg-green-700 transition-colors card-hover">
          <Users className="h-6 w-6 mb-2 inline-block" />
          <p className="font-semibold">Add User</p>
        </button>
        <button className="bg-purple-600 text-white rounded-lg shadow p-4 hover:bg-purple-700 transition-colors card-hover">
          <CheckSquare className="h-6 w-6 mb-2 inline-block" />
          <p className="font-semibold">New Task</p>
        </button>
      </div>
    </div>
  );
}