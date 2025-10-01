import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import TeamLeadView from './TeamLeadView';
import TeamMemberView from './TeamMemberView';

const Dashboard = () => {
  const currentRole = useSelector((state: RootState) => state.role.currentRole);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {currentRole === 'lead' ? <TeamLeadView /> : <TeamMemberView />}
      </div>
    </main>
  );
};

export default Dashboard;
