import { Member } from '@/redux/membersSlice';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle } from 'lucide-react';

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  const activeTasks = member.tasks.filter((t) => !t.completed).length;
  const completedTasks = member.tasks.filter((t) => t.completed).length;

  const statusConfig = {
    Working: { color: 'text-green-600 dark:text-green-400', badge: 'bg-green-200/30 dark:bg-green-600/40', glow: 'shadow-[0_0_15px_2px_rgba(34,197,94,0.4)]' },
    Break: { color: 'text-yellow-600 dark:text-yellow-400', badge: 'bg-yellow-200/30 dark:bg-yellow-600/40', glow: 'shadow-[0_0_15px_2px_rgba(234,179,8,0.4)]' },
    Meeting: { color: 'text-purple-600 dark:text-purple-400', badge: 'bg-purple-200/30 dark:bg-purple-600/40', glow: 'shadow-[0_0_15px_2px_rgba(168,85,247,0.4)]' },
    Offline: { color: 'text-red-600 dark:text-red-400', badge: 'bg-red-200/30 dark:bg-red-600/40', glow: 'shadow-[0_0_15px_2px_rgba(239,68,68,0.4)]' },
  };

  const config = statusConfig[member.status];

  return (
    <Card className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300
                     bg-white/80 dark:bg-gray-900/60 backdrop-blur-md hover:scale-[1.02] hover:shadow-xl">
      <div className="flex items-start gap-4">
        {/* Avatar with glow */}
        <div className={`w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 ${config.glow}`}>
          <img
            src={member.avatar}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Name + Status */}
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 truncate">{member.name}</h4>
            <Badge
              className={`uppercase font-semibold text-sm ${config.badge} backdrop-blur-sm`}
            >
              <span className={`${config.color}`}>{member.status}</span>
            </Badge>
          </div>

          {/* Task indicators */}
          <div className="flex items-center gap-6 text-sm mt-1">
            <div className="flex items-center gap-2">
              <Circle className={`w-5 h-5 animate-pulse ${config.color}`} />
              <span className={`font-medium ${config.color}`}>{activeTasks} Active</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`w-5 h-5 ${config.color}`} />
              <span className={`font-medium ${config.color}`}>{completedTasks} Done</span>
            </div>
          </div>

          {/* Futuristic progress bar */}
          <div className="mt-3 h-2 w-full bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${config.color} transition-all duration-500`}
              style={{ width: `${(completedTasks / Math.max(activeTasks + completedTasks, 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MemberCard;
