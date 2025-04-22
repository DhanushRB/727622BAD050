import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import Card, { CardContent, CardTitle } from '../ui/Card';
import { LineChart, Users, TrendingUp, BarChart } from 'lucide-react';

const AnalyticsSummary: React.FC = () => {
  const { overallStats } = useAnalytics();
  
  const summaryItems = [
    {
      title: 'Total Followers',
      value: overallStats.totalFollowers.toLocaleString(),
      change: overallStats.followerGrowth,
      icon: <Users className="h-8 w-8 text-blue-500" />,
      color: 'text-blue-600'
    },
    {
      title: 'Total Engagement',
      value: overallStats.totalEngagement.toLocaleString(),
      change: 8.2,
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
      color: 'text-purple-600'
    },
    {
      title: 'Total Impressions',
      value: overallStats.totalImpressions.toLocaleString(),
      change: 12.5,
      icon: <LineChart className="h-8 w-8 text-teal-500" />,
      color: 'text-teal-600'
    },
    {
      title: 'Total Posts',
      value: overallStats.postCount.toLocaleString(),
      change: 5.3,
      icon: <BarChart className="h-8 w-8 text-orange-500" />,
      color: 'text-orange-600'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryItems.map((item, index) => (
        <Card key={index} className="transition-all duration-300 hover:shadow-md">
          <CardContent>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{item.title}</p>
                <p className={`mt-2 text-3xl font-bold ${item.color}`}>{item.value}</p>
                <p className={`mt-1 text-sm ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change >= 0 ? '+' : ''}{item.change}% from last period
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                {item.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnalyticsSummary;