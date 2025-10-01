import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Status = 'Working' | 'Break' | 'Meeting' | 'Offline';

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  progress: number;
  completed: boolean;
}

export interface Member {
  id: string;
  name: string;
  status: Status;
  tasks: Task[];
  avatar: string;
}

interface MembersState {
  members: Member[];
}

const initialState: MembersState = {
 members: [
  {
    id: '1',
    name: 'Alex Morgan',
    status: 'Working',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    tasks: [
      { id: 't1', title: 'Design system updates', dueDate: '2025-10-05', progress: 60, completed: false },
      { id: 't2', title: 'Review pull requests', dueDate: '2025-10-03', progress: 100, completed: true },
      { id: 't7', title: 'UI component library', dueDate: '2025-10-09', progress: 30, completed: false },
      { id: 't8', title: 'Accessibility audit', dueDate: '2025-10-10', progress: 0, completed: false },
      { id: 't27', title: 'Prototype new dashboard', dueDate: '2025-10-12', progress: 20, completed: false },
      { id: 't28', title: 'Conduct UX testing', dueDate: '2025-10-13', progress: 0, completed: false },
    ],
  },
  {
    id: '2',
    name: 'Jordan Lee',
    status: 'Meeting',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    tasks: [
      { id: 't3', title: 'Client presentation prep', dueDate: '2025-10-04', progress: 80, completed: false },
      { id: 't9', title: 'Budget review', dueDate: '2025-10-06', progress: 20, completed: false },
      { id: 't10', title: 'Team sync-up', dueDate: '2025-10-07', progress: 50, completed: false },
      { id: 't29', title: 'Update meeting notes', dueDate: '2025-10-08', progress: 0, completed: false },
      { id: 't30', title: 'Client follow-up call', dueDate: '2025-10-09', progress: 10, completed: false },
    ],
  },
  {
    id: '3',
    name: 'Casey Kim',
    status: 'Working',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey',
    tasks: [
      { id: 't4', title: 'Backend API integration', dueDate: '2025-10-06', progress: 40, completed: false },
      { id: 't5', title: 'Database optimization', dueDate: '2025-10-08', progress: 20, completed: false },
      { id: 't11', title: 'Caching strategy', dueDate: '2025-10-09', progress: 60, completed: false },
      { id: 't12', title: 'Logging & monitoring setup', dueDate: '2025-10-11', progress: 10, completed: false },
      { id: 't31', title: 'API documentation', dueDate: '2025-10-13', progress: 0, completed: false },
      { id: 't32', title: 'Unit testing for endpoints', dueDate: '2025-10-14', progress: 0, completed: false },
    ],
  },
  {
    id: '4',
    name: 'Riley Chen',
    status: 'Break',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riley',
    tasks: [
      { id: 't6', title: 'Testing suite expansion', dueDate: '2025-10-07', progress: 50, completed: false },
      { id: 't13', title: 'Bug triage', dueDate: '2025-10-08', progress: 70, completed: false },
      { id: 't14', title: 'Code review', dueDate: '2025-10-09', progress: 40, completed: false },
      { id: 't33', title: 'Refactor test cases', dueDate: '2025-10-12', progress: 0, completed: false },
      { id: 't34', title: 'Performance testing', dueDate: '2025-10-13', progress: 0, completed: false },
    ],
  },
  {
    id: '5',
    name: 'Taylor Swift',
    status: 'Offline',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor',
    tasks: [
      { id: 't15', title: 'Social media report', dueDate: '2025-10-05', progress: 0, completed: false },
      { id: 't16', title: 'Content calendar', dueDate: '2025-10-06', progress: 0, completed: false },
      { id: 't35', title: 'Analyze engagement metrics', dueDate: '2025-10-08', progress: 0, completed: false },
      { id: 't36', title: 'Plan newsletter', dueDate: '2025-10-09', progress: 0, completed: false },
    ],
  },
  {
    id: '6',
    name: 'Morgan Black',
    status: 'Working',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan',
    tasks: [
      { id: 't17', title: 'Frontend feature integration', dueDate: '2025-10-07', progress: 25, completed: false },
      { id: 't18', title: 'Design QA', dueDate: '2025-10-08', progress: 0, completed: false },
      { id: 't37', title: 'Responsive design check', dueDate: '2025-10-10', progress: 0, completed: false },
      { id: 't38', title: 'Cross-browser testing', dueDate: '2025-10-11', progress: 10, completed: false },
    ],
  },
  {
    id: '7',
    name: 'Jamie Fox',
    status: 'Meeting',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie',
    tasks: [
      { id: 't19', title: 'Project roadmap review', dueDate: '2025-10-09', progress: 50, completed: false },
      { id: 't20', title: 'Team performance report', dueDate: '2025-10-10', progress: 10, completed: false },
      { id: 't39', title: 'Stakeholder feedback', dueDate: '2025-10-12', progress: 0, completed: false },
      { id: 't40', title: 'Update project timeline', dueDate: '2025-10-13', progress: 20, completed: false },
    ],
  },
  {
    id: '8',
    name: 'Sam Taylor',
    status: 'Break',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
    tasks: [
      { id: 't21', title: 'Marketing strategy review', dueDate: '2025-10-07', progress: 80, completed: false },
      { id: 't22', title: 'Client follow-up emails', dueDate: '2025-10-08', progress: 20, completed: false },
      { id: 't41', title: 'Social campaign planning', dueDate: '2025-10-10', progress: 0, completed: false },
      { id: 't42', title: 'Content review', dueDate: '2025-10-11', progress: 10, completed: false },
    ],
  },
  {
    id: '9',
    name: 'Alexis Rivera',
    status: 'Offline',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexis',
    tasks: [
      { id: 't23', title: 'SEO optimization', dueDate: '2025-10-09', progress: 0, completed: false },
      { id: 't24', title: 'Website analytics report', dueDate: '2025-10-10', progress: 0, completed: false },
      { id: 't43', title: 'Update meta tags', dueDate: '2025-10-11', progress: 0, completed: false },
      { id: 't44', title: 'Competitor analysis', dueDate: '2025-10-12', progress: 0, completed: false },
    ],
  },
  {
    id: '10',
    name: 'Jordan Brooks',
    status: 'Working',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JordanB',
    tasks: [
      { id: 't25', title: 'New feature prototyping', dueDate: '2025-10-11', progress: 30, completed: false },
      { id: 't26', title: 'Code refactoring', dueDate: '2025-10-12', progress: 50, completed: false },
      { id: 't45', title: 'Integrate analytics', dueDate: '2025-10-13', progress: 0, completed: false },
      { id: 't46', title: 'Optimize loading speed', dueDate: '2025-10-14', progress: 0, completed: false },
    ],
  },
]


};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    updateStatus: (
      state,
      action: PayloadAction<{ userId: string; newStatus: Status }>
    ) => {
      const member = state.members.find((m) => m.id === action.payload.userId);
      if (member) {
        member.status = action.payload.newStatus;
      }
    },
    assignTask: (
      state,
      action: PayloadAction<{ userId: string; title: string; dueDate: string }>
    ) => {
      const member = state.members.find((m) => m.id === action.payload.userId);
      if (member) {
        const newTask: Task = {
          id: `t${Date.now()}`,
          title: action.payload.title,
          dueDate: action.payload.dueDate,
          progress: 0,
          completed: false,
        };
        member.tasks.push(newTask);
      }
    },
    updateTaskProgress: (
      state,
      action: PayloadAction<{ userId: string; taskId: string; progressChange: number }>
    ) => {
      const member = state.members.find((m) => m.id === action.payload.userId);
      if (member) {
        const task = member.tasks.find((t) => t.id === action.payload.taskId);
        if (task) {
          task.progress = Math.max(0, Math.min(100, task.progress + action.payload.progressChange));
          task.completed = task.progress === 100;
        }
      }
    },
  },
});

export const { updateStatus, assignTask, updateTaskProgress } = membersSlice.actions;
export default membersSlice.reducer;
