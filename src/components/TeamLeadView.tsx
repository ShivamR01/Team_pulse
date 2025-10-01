import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Status } from '@/redux/membersSlice';
import StatusSummary from './StatusSummary';
import StatusChart from './StatusChart';
import TaskForm from './TaskForm';
import MemberCard from './MemberCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, ArrowUpDown } from 'lucide-react';

const TeamLeadView = () => {
  const members = useSelector((state: RootState) => state.members.members);
  const [filterStatus, setFilterStatus] = useState<Status | 'All'>('All');
  const [sortBy, setSortBy] = useState<'name' | 'tasks'>('name');

  let filteredMembers = members;
  if (filterStatus !== 'All') {
    filteredMembers = members.filter((m) => m.status === filterStatus);
  }

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    const aActiveTasks = a.tasks.filter((t) => !t.completed).length;
    const bActiveTasks = b.tasks.filter((t) => !t.completed).length;
    return bActiveTasks - aActiveTasks;
  });

  return (
    <div className="space-y-8">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-900/70 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-[0_0_35px_rgba(0,255,255,0.15)] transition-all">
          <StatusSummary />
        </div>
        <div className="bg-white dark:bg-gray-900/70 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-[0_0_35px_rgba(0,255,255,0.15)] transition-all">
          <StatusChart />
        </div>
      </div>

      {/* Task Form & Member List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Task Form */}
        <div className="lg:col-span-1">
          <TaskForm />
        </div>

        {/* Members + Filters */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters & Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-gray-900/60 backdrop-blur-md rounded-2xl shadow hover:shadow-lg transition-all">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as Status | 'All')}>
                <SelectTrigger className="w-48 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-3 py-2">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Working">Working</SelectItem>
                  <SelectItem value="Break">On Break</SelectItem>
                  <SelectItem value="Meeting">In Meeting</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              <ArrowUpDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as 'name' | 'tasks')}>
                <SelectTrigger className="w-48 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-3 py-2">
                  <SelectValue placeholder="Sort Members" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="tasks">Sort by Tasks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Member Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sortedMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-gray-900/60 backdrop-blur-md rounded-3xl p-5 shadow hover:shadow-[0_0_25px_rgba(0,255,255,0.15)] transition-all"
              >
                <MemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamLeadView;
