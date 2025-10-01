import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { assignTask } from '@/redux/slices/membersSlice';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

const TaskForm = () => {
  const dispatch = useDispatch();
  const members = useSelector((state: RootState) => state.members.members);

  const [selectedMember, setSelectedMember] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMember || !taskTitle || !dueDate) {
      toast.error('Please fill in all fields');
      return;
    }

    dispatch(assignTask({
      userId: selectedMember,
      title: taskTitle,
      dueDate,
    }));

    toast.success('Task assigned successfully!');
    setTaskTitle('');
    setDueDate('');
  };

  return (
    <Card className="p-8 bg-white/90 dark:bg-gray-900/75 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-[0_0_35px_rgba(0,255,255,0.25)] transition-all">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <PlusCircle className="w-6 h-6 text-cyan-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Assign New Task
        </h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Team Member */}
        <div className="flex flex-col">
          <Label htmlFor="member" className="text-gray-700 dark:text-gray-300 font-medium mb-1">Team Member</Label>
          <Select value={selectedMember} onValueChange={setSelectedMember}>
            <SelectTrigger id="member" className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-cyan-400">
              <SelectValue placeholder="Select a member" />
            </SelectTrigger>
            <SelectContent>
              {members.map((member) => (
                <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Task Title */}
        <div className="flex flex-col">
          <Label htmlFor="title" className="text-gray-700 dark:text-gray-300 font-medium mb-1">Task Title</Label>
          <Input
            id="title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter task description"
            className="mt-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Due Date */}
        <div className="flex flex-col">
          <Label htmlFor="dueDate" className="text-gray-700 dark:text-gray-300 font-medium mb-1">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="mt-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-3 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-cyan-400 dark:hover:bg-cyan-600 shadow-md transition-colors"
        >
          Assign Task
        </Button>
      </form>
    </Card>
  );
};

export default TaskForm;
