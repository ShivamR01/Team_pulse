import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateStatus, Status } from '@/redux/slices/membersSlice';
import { Card } from '@/components/ui/card';
import { Activity, Coffee, MessageSquare, Power } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatusSelectorProps {
  selectedMemberId: string;
}

const statusList: { value: Status; label: string; icon: typeof Activity; color: string }[] = [
  { value: 'Working', label: 'Working', icon: Activity, color: 'cyan-500' },
  { value: 'Break', label: 'On Break', icon: Coffee, color: 'yellow-400' },
  { value: 'Meeting', label: 'In Meeting', icon: MessageSquare, color: 'purple-500' },
  { value: 'Offline', label: 'Offline', icon: Power, color: 'red-500' },
];

const StatusSelector = ({ selectedMemberId }: StatusSelectorProps) => {
  const dispatch = useDispatch();
  const members = useSelector((state: RootState) => state.members.members);
  const selectedMember = members.find((m) => m.id === selectedMemberId);
  const currentStatus = selectedMember?.status || 'Offline';

  const handleStatusChange = (newStatus: Status) => {
    if (selectedMember) {
      dispatch(updateStatus({ userId: selectedMember.id, newStatus }));
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        {selectedMember?.name}'s Status
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statusList.map((status) => {
          const Icon = status.icon;
          const isActive = currentStatus === status.value;

          return (
            <motion.button
              key={status.value}
              onClick={() => handleStatusChange(status.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative flex flex-col items-center justify-center gap-2 w-full p-4 rounded-2xl border
                transition-all duration-300
                ${isActive
                  ? `bg-gradient-to-tr from-${status.color}/70 to-${status.color}/40 shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_25px_rgba(0,255,255,0.5)]`
                  : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700'}
              `}
            >
              <div
                className={`
                  flex items-center justify-center w-14 h-14 rounded-full
                  ${isActive ? `bg-white dark:bg-gray-900 shadow-md` : 'bg-gray-200 dark:bg-gray-700'}
                  transition-colors
                `}
              >
                <Icon
                  className={`
                    w-7 h-7 
                    ${isActive ? `text-${status.color}` : 'text-gray-500 dark:text-gray-300'}
                  `}
                />
              </div>
              <span
                className={`
                  text-sm font-medium
                  ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'}
                `}
              >
                {status.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-2 text-xs text-gray-400 dark:text-gray-300 font-semibold">
                  Active
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </Card>
  );
};

export default StatusSelector;
