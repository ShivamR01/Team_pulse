import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useEffect, useState } from 'react';

const StatusChart = () => {
  const members = useSelector((state: RootState) => state.members.members);

  const statusCounts = members.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = [
    { name: 'Working', value: statusCounts['Working'] || 0, color: 'hsl(var(--status-working))' },
    { name: 'On Break', value: statusCounts['Break'] || 0, color: 'hsl(var(--status-break))' },
    { name: 'In Meeting', value: statusCounts['Meeting'] || 0, color: 'hsl(var(--status-meeting))' },
    { name: 'Offline', value: statusCounts['Offline'] || 0, color: 'hsl(var(--status-offline))' },
  ];

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getOuterRadius = () => {
    if (windowWidth < 480) return 60;
    if (windowWidth < 768) return 80;
    return 100;
  };

  // Check if we are on a small screen
  const isSmallScreen = windowWidth < 480;

  return (
    <Card className="p-4 sm:p-6 shadow-card">
      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Status Distribution</h3>

      <ResponsiveContainer width="100%" height={isSmallScreen ? 250 : 300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={getOuterRadius()}
            fill="#8884d8"
            dataKey="value"
            label={!isSmallScreen ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` : undefined}
            labelLine={!isSmallScreen}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          {!isSmallScreen && (
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
          )}
        </PieChart>
      </ResponsiveContainer>

      {/* Show list for small screens */}
      {isSmallScreen && (
        <ul className="mt-4 space-y-2 text-sm">
          {data.map((entry) => {
            const total = members.length || 1;
            const percent = ((entry.value / total) * 100).toFixed(0);
            return (
              <li key={entry.name} className="flex items-center">
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                ></span>
                {entry.name}: {percent}%
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
};

export default StatusChart;
