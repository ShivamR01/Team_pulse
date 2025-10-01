import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';

interface MemberProgressChartProps {
  memberId: string;
}

const MemberProgressChart = ({ memberId }: MemberProgressChartProps) => {
  const members = useSelector((state: RootState) => state.members.members);
  const member = members.find((m) => m.id === memberId);
  const tasks = member?.tasks || [];

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Adjust chart settings based on screen width
  const getChartHeight = () => (windowWidth < 480 ? 250 : windowWidth < 768 ? 300 : 350);
  const getBarGap = () => (windowWidth < 480 ? 10 : 20);
  const getLabelFontSize = () => (windowWidth < 480 ? 10 : 12);
  const getXAxisAngle = () => (windowWidth < 480 ? -45 : -20);
  const showLabels = () => windowWidth >= 480;

  // Map data for chart
  const data = tasks.map((task) => ({
    name: task.title.length > 18 ? task.title.slice(0, 18) + '...' : task.title,
    Completed: task.completed ? 100 : task.progress,
  }));

  const colors = ['#06b6d4', '#3b82f6', '#10b981', '#f59e0b', '#f87171'];

  return (
    <Card className="p-4 sm:p-6 bg-white/90 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg hover:shadow-xl transition-all">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center sm:text-left">
        {member?.name}'s Task Progress
      </h3>

      {tasks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-10">
          No tasks assigned yet
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={getChartHeight()}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
            barGap={getBarGap()}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
            <XAxis
              dataKey="name"
              tick={{ fill: 'currentColor', fontSize: getLabelFontSize() }}
              interval={0}
              angle={getXAxisAngle()}
              textAnchor={windowWidth < 480 ? 'end' : 'middle'}
              height={windowWidth < 480 ? 80 : 60}
            />
            <YAxis tick={{ fill: 'currentColor', fontSize: getLabelFontSize() }} domain={[0, 100]} unit="%" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                borderRadius: '10px',
                border: 'none',
                color: '#f9fafb',
                fontSize: '14px',
              }}
              formatter={(value: number, name: string) => [`${value}%`, name]}
            />
            <Bar dataKey="Completed" radius={[8, 8, 8, 8]} isAnimationActive={true}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
              {showLabels() && (
                <LabelList
                  dataKey="Completed"
                  position="top"
                  formatter={(val) => `${val}%`}
                  style={{ fill: '#fff', fontWeight: 'bold', fontSize: getLabelFontSize() }}
                />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default MemberProgressChart;
