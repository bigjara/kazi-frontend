import { Briefcase, Users, CheckCircle, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    activeTasks: number;
    totalApplications: number;
    tasksCompleted: number;
    avgCompletionRate: number;
  } | null;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  if (!stats) {
    return <div className="text-gray-500">No stats available</div>;
  }
  const cards = [
    {
      title: 'Active Tasks',
      value: stats.activeTasks || '–',
      subtitle: stats.activeTasks === 0 ? 'Create your first task' : `${stats.activeTasks} active`,
      icon: Briefcase,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50'
    },
    {
      title: 'Total Applications',
      value: stats.totalApplications || '–',
      subtitle: stats.totalApplications === 0 ? 'No applications yet' : `${stats.totalApplications} total`,
      icon: Users,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50'
    },
    {
      title: 'Tasks Completed',
      value: stats.tasksCompleted || '–',
      subtitle: stats.tasksCompleted === 0 ? 'Complete your first task' : `${stats.tasksCompleted} completed`,
      icon: CheckCircle,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-50'
    },
    {
      title: 'Avg Completion Rate',
      value: stats.avgCompletionRate ? `${stats.avgCompletionRate}%` : '–',
      subtitle: stats.avgCompletionRate === 0 ? 'Data will appear here' : 'Success rate',
      icon: TrendingUp,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200 p-5"
        >
          <div className="flex items-start justify-between mb-4">
            <span className="text-sm text-gray-600">{card.title}</span>
            <div className={`p-2 rounded-lg ${card.iconBg}`}>
              <card.icon size={20} className={card.iconColor} />
            </div>
          </div>
          <div className="text-3xl font-semibold text-gray-900 mb-1">
            {card.value}
          </div>
          <div className="text-sm text-gray-500">{card.subtitle}</div>
        </div>
      ))}
    </div>
  );
}