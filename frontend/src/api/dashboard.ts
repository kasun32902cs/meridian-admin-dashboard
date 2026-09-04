// frontend/src/api/dashboard.ts
import { apiClient } from './client';

export interface Activity {
  id: number;
  type: string;
  description: string;
  timestamp: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalProjects: number;
  totalTasks: number;
  completionRate?: number;
  recentActivities?: Activity[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await apiClient.get('/dashboard/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalUsers: 0,
      totalProjects: 0,
      totalTasks: 0,
      completionRate: 75,
      recentActivities: []
    };
  }
};

export const getRecentActivities = async (): Promise<Activity[]> => {
  try {
    const response = await apiClient.get('/dashboard/activities');
    return response.data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
};