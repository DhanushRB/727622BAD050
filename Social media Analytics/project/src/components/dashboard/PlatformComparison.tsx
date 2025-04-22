import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import Card, { CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Twitter, Instagram, Facebook, Linkedin, TrendingUp, TrendingDown } from 'lucide-react';

const PlatformComparison: React.FC = () => {
  const { platformData } = useAnalytics();
  
  
  const connectedPlatforms = platformData.filter(data => data.platform.connected);
  

  const platformIcons: Record<string, React.ReactElement> = {
    twitter: <Twitter className="h-5 w-5" />,
    instagram: <Instagram className="h-5 w-5" />,
    facebook: <Facebook className="h-5 w-5" />,
    linkedin: <Linkedin className="h-5 w-5" />
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Platform Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Followers
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {connectedPlatforms.map((data, index) => {
                const followersMetric = data.metrics.find(m => m.id === 'followers');
                const engagementMetric = data.metrics.find(m => m.id === 'engagement');
                
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center"
                             style={{ backgroundColor: `${data.platform.color}20` }}>
                          <span style={{ color: data.platform.color }}>
                            {platformIcons[data.platform.id]}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {data.platform.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {followersMetric ? followersMetric.value.toLocaleString() : 'N/A'}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {engagementMetric ? engagementMetric.value.toLocaleString() : 'N/A'}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {followersMetric && (
                        <div className={`text-sm flex items-center ${
                          followersMetric.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {followersMetric.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          <span>
                            {followersMetric.change >= 0 ? '+' : ''}{followersMetric.change}%
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformComparison;