// frontend/src/pages/ProjectsPage.tsx
import { useEffect, useState } from 'react';
import { getProjects, createProject, deleteProject, Project } from '../api/projects';
import Topbar from '../components/layout/Topbar';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        await fetchProjects();
      } catch (err) {
        alert('Failed to delete project');
        console.error(err);
      }
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: 'green' | 'red' | 'yellow' | 'blue' | 'gray' } = {
      'Completed': 'green',
      'InProgress': 'blue',
      'Planning': 'yellow',
      'OnHold': 'red',
      'Cancelled': 'gray'
    };
    return colors[status] || 'gray';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
            <Button onClick={() => alert('Add project functionality coming soon!')}>
              Add Project
            </Button>
          </div>
          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">{error}</div>
          ) : (
            <Table
              headers={['Name', 'Description', 'Status', 'Priority', 'Actions']}
              data={projects}
              renderRow={(project, index) => (
                <tr key={project.id || index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {project.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge color={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.priority}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}