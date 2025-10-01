import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { switchRole, Role } from '@/redux/slices/roleSlice';
import { Button } from '@/components/ui/button';
import { Users, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  const dispatch = useDispatch();
  const { currentUserId, currentRole } = useSelector((state: RootState) => state.role);
  const members = useSelector((state: RootState) => state.members.members);

  const currentMember = members.find((m) => m.id === currentUserId);

  const handleRoleToggle = () => {
    const newRole: Role = currentRole === 'lead' ? 'member' : 'lead';
    dispatch(switchRole(newRole));
  };

  const greeting =
    currentRole === 'lead'
      ? 'Welcome Team Lead'
      : `Welcome back, ${currentMember?.name || 'Member'}`;

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <div className="bg-cyan-500 dark:bg-cyan-600 p-2 rounded-lg shadow-md">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Team Pulse</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">{greeting}</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap items-center gap-3 justify-end">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {currentRole === 'lead' ? 'Team Lead' : 'Team Member'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Current View</p>
          </div>

          <ThemeToggle />

          <Button
            onClick={handleRoleToggle}
            variant="outline"
            size="sm"
            className="gap-2 border-cyan-400 text-cyan-500 dark:text-cyan-400 dark:border-cyan-600 hover:bg-cyan-500/10 dark:hover:bg-cyan-600/20 transition"
          >
            {currentRole === 'lead' ? <User className="w-4 h-4" /> : <Users className="w-4 h-4" />}
            Switch to {currentRole === 'lead' ? 'Member' : 'Lead'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
