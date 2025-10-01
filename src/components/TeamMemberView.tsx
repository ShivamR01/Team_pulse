import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import StatusSelector from "./StatusSelector";
import TaskList from "./TaskList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import { setUser } from "@/redux/slices/roleSlice";
import { motion } from "framer-motion";
import MemberProgressChart from "./MemberProgressChart";

const TeamMemberView = () => {
  const dispatch = useDispatch();
  const members = useSelector((state: RootState) => state.members.members);
  const { currentUserId } = useSelector((state: RootState) => state.role);

  const currentMember =
    members.find((m) => m.id === currentUserId) || members[0];
  const [selectedMemberId, setSelectedMemberId] = useState(currentMember?.id);

  const handleMemberChange = (id: string) => {
    setSelectedMemberId(id);
    dispatch(setUser(id));
  };

  useEffect(() => {
    if (currentMember) dispatch(setUser(currentMember.id));
  }, [dispatch, currentMember]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Member Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="flex flex-col sm:flex-row items-center gap-4 p-6 bg-white/80 dark:bg-gray-900/60 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg hover:shadow-2xl transition-all">
          <Users className="w-7 h-7 text-gray-700 dark:text-gray-300" />
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Select Team Member
            </label>
            <Select value={selectedMemberId} onValueChange={handleMemberChange}>
              <SelectTrigger className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm hover:shadow-md transition">
                <SelectValue placeholder="Choose member" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                {members.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>
      </motion.div>

      {/* Status Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StatusSelector selectedMemberId={selectedMemberId!} />
      </motion.div>

      {/* Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <MemberProgressChart memberId={selectedMemberId!} />
      </motion.div>

      {/* Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
          Tasks
        </h2>
        <TaskList selectedMemberId={selectedMemberId!} />
      </motion.div>
    </div>
  );
};

export default TeamMemberView;
