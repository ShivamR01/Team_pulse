import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateTaskProgress } from '@/redux/slices/membersSlice';
import { Minus, Plus, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskListProps {
  selectedMemberId: string;
}

const TaskList = ({ selectedMemberId }: TaskListProps) => {
  const dispatch = useDispatch();
  const members = useSelector((state: RootState) => state.members.members);
  const selectedMember = members.find((m) => m.id === selectedMemberId);
  const tasks = selectedMember?.tasks || [];

  const handleProgressChange = (taskId: string, change: number) => {
    if (selectedMember) {
      dispatch(
        updateTaskProgress({
          userId: selectedMember.id,
          taskId,
          progressChange: change,
        })
      );
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500 dark:text-gray-400 text-lg">
        No tasks assigned yet
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-3">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative flex flex-col justify-between p-8 bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all"
        >
          {/* Header */}
          <div className="mb-5">
            <h4 className="text-gray-900 dark:text-white font-bold text-lg truncate">
              {task.title}
            </h4>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mt-1">
              <Calendar className="w-4 h-4" />
              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Progress Section */}
          <div className="flex items-center gap-5 mb-5">
            {/* Circular Progress */}
            <div className="relative w-20 h-20 rounded-full flex items-center justify-center bg-gray-100/20 dark:bg-gray-800/20 border border-cyan-400 dark:border-cyan-500 shadow-inner">
              <svg className="absolute w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                <circle
                  className="text-gray-300 dark:text-gray-700"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="transparent"
                  r="16"
                  cx="18"
                  cy="18"
                />
                <circle
                  className="text-cyan-500 dark:text-cyan-400"
                  strokeWidth="3"
                  strokeDasharray={`${task.progress}, 100`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="16"
                  cx="18"
                  cy="18"
                />
              </svg>
              <span className="text-gray-900 dark:text-white font-semibold">{task.progress}%</span>
            </div>

            {/* Linear Progress */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-3 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${task.progress}%` }}
                  className="absolute h-3 rounded-full bg-cyan-400 dark:bg-cyan-500 shadow-md"
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-auto">
            <button
              className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 border border-cyan-400 dark:border-cyan-500 hover:bg-cyan-400 hover:text-black dark:hover:text-white transition-all shadow-md"
              onClick={() => handleProgressChange(task.id, -10)}
              disabled={task.progress === 0}
            >
              <Minus className="w-5 h-5" />
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-200 dark:bg-gray-800 border border-cyan-400 dark:border-cyan-500 hover:bg-cyan-400 hover:text-black dark:hover:text-white transition-all shadow-md"
              onClick={() => handleProgressChange(task.id, 10)}
              disabled={task.progress === 100}
            >
              <Plus className="w-5 h-5" />
              Update Progress
            </button>
          </div>

          {/* Completed Badge - Optimized */}
          {task.progress === 100 && (
            <div className="absolute top-2 right-6 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-semibold px-3 py-1 rounded-full shadow-md whitespace-nowrap text-sm">
              ✔ Completed
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default TaskList;
