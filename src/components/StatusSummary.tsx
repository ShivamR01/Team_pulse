import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Card } from '@/components/ui/card';
import { Activity, Coffee, MessageSquare, Power } from 'lucide-react';
import { motion } from 'framer-motion';

const StatusSummary = () => {
  const members = useSelector((state: RootState) => state.members.members);

  const statusCounts = {
    Working: members.filter((m) => m.status === 'Working').length,
    Break: members.filter((m) => m.status === 'Break').length,
    Meeting: members.filter((m) => m.status === 'Meeting').length,
    Offline: members.filter((m) => m.status === 'Offline').length,
  };

  const statusConfig = [
    { 
      label: 'Working', 
      count: statusCounts.Working, 
      icon: Activity, 
      color: 'cyan-400',
      bgColor: 'bg-cyan-400/10',
      shadow: 'shadow-cyan-400/40'
    },
    { 
      label: 'On Break', 
      count: statusCounts.Break, 
      icon: Coffee, 
      color: 'yellow-400',
      bgColor: 'bg-yellow-400/10',
      shadow: 'shadow-yellow-400/40'
    },
    { 
      label: 'In Meeting', 
      count: statusCounts.Meeting, 
      icon: MessageSquare, 
      color: 'purple-400',
      bgColor: 'bg-purple-400/10',
      shadow: 'shadow-purple-400/40'
    },
    { 
      label: 'Offline', 
      count: statusCounts.Offline, 
      icon: Power, 
      color: 'red-400',
      bgColor: 'bg-red-400/10',
      shadow: 'shadow-red-400/40'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {statusConfig.map((status, idx) => {
        const Icon = status.icon;
        return (
          <motion.div
            key={status.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 + idx * 0.1 }}
          >
            <Card
              className={`
                relative p-8 rounded-3xl border border-gray-300 dark:border-gray-700
                bg-white dark:bg-gray-900 shadow-lg hover:scale-105 transition-transform
                hover:shadow-[0_0_40px_${status.shadow}]
              `}
            >
              <div className="flex items-center justify-between">
                {/* Text info */}
                <div className="flex-1 pr-4">
                  <p className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    {status.label}
                  </p>
                  <p className="text-5xl font-bold text-gray-900 dark:text-white">
                    {status.count}
                  </p>
                </div>

                {/* Icon */}
                <div className={`
                  w-20 h-20 flex items-center justify-center rounded-xl
                  ${status.bgColor} shadow-md
                `}>
                  <Icon className={`w-10 h-10 text-${status.color}`} />
                </div>
              </div>

              {/* Futuristic gradient bar */}
              <div className={`mt-6 h-2 w-full rounded-full bg-gradient-to-r from-${status.color}/50 to-${status.color}/20`} />
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatusSummary;
