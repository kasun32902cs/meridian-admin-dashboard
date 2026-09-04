// frontend/src/components/ui/StatCard.tsx
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray';
  change?: string;
}

export default function StatCard({ title, value, icon, color = 'blue', change }: StatCardProps) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
    gray: 'bg-gray-50 text-gray-600',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-2xl font-bold text-gray-800">{value}</p>
          {change && (
            <p className="mt-1 text-xs text-green-600">
              {change} from last month
            </p>
          )}
        </div>
        {icon && (
          <div className={`rounded-lg p-3 ${colors[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}