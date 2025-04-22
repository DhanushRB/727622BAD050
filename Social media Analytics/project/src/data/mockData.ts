import { Platform, PlatformData, Post, ReportData } from '../types';
import { 
  Twitter, 
  Instagram, 
  Facebook, 
  Linkedin 
} from 'lucide-react';

export const platforms: Platform[] = [
  {
    id: 'twitter',
    name: 'Twitter',
    icon: 'Twitter',
    color: '#1DA1F2',
    connected: true
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'Instagram',
    color: '#C13584',
    connected: true
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'Facebook',
    color: '#4267B2',
    connected: true
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'Linkedin',
    color: '#0077B5',
    connected: false
  }
];

// Generate historical data for the past 30 days
const generateHistoricalData = (baseValue: number, volatility: number) => {
  const result = [];
  let currentValue = baseValue;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Add some random variation
    const change = (Math.random() - 0.5) * volatility;
    currentValue = Math.max(0, currentValue + change);
    
    result.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(currentValue)
    });
  }
  
  return result;
};

// Generate trend based on recent history
const getTrend = (history: any[]) => {
  const last = history[history.length - 1].value;
  const secondLast = history[history.length - 2].value;
  
  if (last > secondLast) return 'up';
  if (last < secondLast) return 'down';
  return 'neutral';
};

// Generate platform data
export const platformData: PlatformData[] = platforms.map(platform => {
  // Generate followers with appropriate scale for each platform
  const followerBase = platform.id === 'twitter' ? 5200 : 
                      platform.id === 'instagram' ? 12500 : 
                      platform.id === 'facebook' ? 8700 : 3200;
  
  const followersHistory = generateHistoricalData(followerBase - 300, 30);
  const followersCurrent = followersHistory[followersHistory.length - 1].value;
  const followersPrevious = followersHistory[followersHistory.length - 8].value;
  const followersChange = Math.round(((followersCurrent - followersPrevious) / followersPrevious) * 100);
  
  // Generate engagement data
  const engagementBase = platform.id === 'instagram' ? 450 : 
                        platform.id === 'facebook' ? 380 : 
                        platform.id === 'twitter' ? 290 : 150;
  
  const engagementHistory = generateHistoricalData(engagementBase - 50, 20);
  const engagementCurrent = engagementHistory[engagementHistory.length - 1].value;
  const engagementPrevious = engagementHistory[engagementHistory.length - 8].value;
  const engagementChange = Math.round(((engagementCurrent - engagementPrevious) / engagementPrevious) * 100);
  
  // Generate impressions data
  const impressionsBase = followerBase * (platform.id === 'instagram' ? 2.5 : 
                                          platform.id === 'facebook' ? 1.8 : 
                                          platform.id === 'twitter' ? 3.2 : 1.5);
  
  const impressionsHistory = generateHistoricalData(impressionsBase - 500, 200);
  const impressionsCurrent = impressionsHistory[impressionsHistory.length - 1].value;
  const impressionsPrevious = impressionsHistory[impressionsHistory.length - 8].value;
  const impressionsChange = Math.round(((impressionsCurrent - impressionsPrevious) / impressionsPrevious) * 100);
  
  // Generate click data
  const clicksBase = impressionsBase * (platform.id === 'instagram' ? 0.03 : 
                                       platform.id === 'facebook' ? 0.02 : 
                                       platform.id === 'twitter' ? 0.015 : 0.04);
  
  const clicksHistory = generateHistoricalData(clicksBase - 20, 15);
  const clicksCurrent = clicksHistory[clicksHistory.length - 1].value;
  const clicksPrevious = clicksHistory[clicksHistory.length - 8].value;
  const clicksChange = Math.round(((clicksCurrent - clicksPrevious) / clicksPrevious) * 100);
  
  return {
    platform,
    metrics: [
      {
        id: 'followers',
        name: 'Followers',
        value: followersCurrent,
        change: followersChange,
        trend: getTrend(followersHistory),
        history: followersHistory
      },
      {
        id: 'engagement',
        name: 'Engagement',
        value: engagementCurrent,
        change: engagementChange,
        trend: getTrend(engagementHistory),
        history: engagementHistory
      },
      {
        id: 'impressions',
        name: 'Impressions',
        value: impressionsCurrent,
        change: impressionsChange,
        trend: getTrend(impressionsHistory),
        history: impressionsHistory
      },
      {
        id: 'clicks',
        name: 'Clicks',
        value: clicksCurrent,
        change: clicksChange,
        trend: getTrend(clicksHistory),
        history: clicksHistory
      }
    ],
    audience: {
      total: followersCurrent,
      growth: followersChange,
      demographics: {
        ageGroups: [
          { label: '18-24', value: 22 },
          { label: '25-34', value: 38 },
          { label: '35-44', value: 25 },
          { label: '45-54', value: 10 },
          { label: '55+', value: 5 }
        ],
        genders: [
          { label: 'Male', value: 48 },
          { label: 'Female', value: 51 },
          { label: 'Other', value: 1 }
        ],
        locations: [
          { label: 'United States', value: 45 },
          { label: 'United Kingdom', value: 15 },
          { label: 'Canada', value: 12 },
          { label: 'Australia', value: 8 },
          { label: 'Other', value: 20 }
        ]
      }
    },
    topPosts: generateTopPosts(platform, 5)
  };
});

function generateTopPosts(platform: Platform, count: number): Post[] {
  const posts: Post[] = [];
  
  const contentTemplates = [
    "Check out our latest product launch! #excited",
    "We're thrilled to announce our newest feature.",
    "Thanks to all our amazing customers for your support!",
    "Join us for our upcoming webinar on industry trends.",
    "It's been an incredible journey. Here's to more success!",
    "Have you tried our new service yet? Let us know what you think!",
    "Behind the scenes look at our team hard at work.",
    "We're hiring! Join our growing team of professionals.",
    "Happy holidays from our team to yours!",
    "Celebrating a milestone: 10 years of innovation!"
  ];
  
  const imageUrls = [
    "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg",
    "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
    "https://images.pexels.com/photos/3182777/pexels-photo-3182777.jpeg",
    "https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg"
  ];
  
  for (let i = 0; i < count; i++) {
    const likesBase = platform.id === 'instagram' ? 80 : 
                     platform.id === 'facebook' ? 45 : 
                     platform.id === 'twitter' ? 25 : 35;
    
    const commentsBase = platform.id === 'instagram' ? 20 : 
                        platform.id === 'facebook' ? 15 : 
                        platform.id === 'twitter' ? 5 : 8;
    
    const sharesBase = platform.id === 'instagram' ? 15 : 
                      platform.id === 'facebook' ? 12 : 
                      platform.id === 'twitter' ? 20 : 5;
    
    const likes = Math.floor(likesBase * (1 + Math.random()));
    const comments = Math.floor(commentsBase * (1 + Math.random()));
    const shares = Math.floor(sharesBase * (1 + Math.random()));
    
    const impressions = Math.floor((likes + comments + shares) * (5 + Math.random() * 3));
    const reach = Math.floor(impressions * (0.6 + Math.random() * 0.3));
    
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    posts.push({
      id: `post-${platform.id}-${i}`,
      platform: platform.id,
      content: contentTemplates[Math.floor(Math.random() * contentTemplates.length)],
      imageUrl: i % 2 === 0 ? imageUrls[i % imageUrls.length] : undefined,
      publishedAt: date.toISOString(),
      engagement: {
        likes,
        comments,
        shares
      },
      engagementRate: Number(((likes + comments + shares) / reach * 100).toFixed(2)),
      impressions,
      reach
    });
  }
  
  // Sort by engagement rate
  return posts.sort((a, b) => b.engagementRate - a.engagementRate);
}

export const reports: ReportData[] = [
  {
    id: 'report-1',
    name: 'Monthly Performance Summary',
    dateRange: {
      start: '2023-06-01',
      end: '2023-06-30'
    },
    createdAt: '2023-07-02T10:30:00Z',
    platforms: ['twitter', 'instagram', 'facebook']
  },
  {
    id: 'report-2',
    name: 'Q2 Social Media Analysis',
    dateRange: {
      start: '2023-04-01',
      end: '2023-06-30'
    },
    createdAt: '2023-07-05T14:15:00Z',
    platforms: ['twitter', 'instagram', 'facebook', 'linkedin']
  },
  {
    id: 'report-3',
    name: 'Campaign Performance',
    dateRange: {
      start: '2023-05-15',
      end: '2023-06-15'
    },
    createdAt: '2023-06-20T09:45:00Z',
    platforms: ['instagram', 'facebook']
  }
];

export const getOverallStats = () => {
  let totalFollowers = 0;
  let totalEngagement = 0;
  let totalImpressions = 0;
  let followerGrowth = 0;
  
  platformData.forEach(data => {
    if (data.platform.connected) {
      // Find metrics by ID
      const followersMetric = data.metrics.find(m => m.id === 'followers');
      const engagementMetric = data.metrics.find(m => m.id === 'engagement');
      const impressionsMetric = data.metrics.find(m => m.id === 'impressions');
      
      if (followersMetric) {
        totalFollowers += followersMetric.value;
        followerGrowth += followersMetric.change;
      }
      
      if (engagementMetric) {
        totalEngagement += engagementMetric.value;
      }
      
      if (impressionsMetric) {
        totalImpressions += impressionsMetric.value;
      }
    }
  });
  
  // Average the growth percentage
  const connectedPlatforms = platformData.filter(data => data.platform.connected).length;
  followerGrowth = connectedPlatforms > 0 ? Math.round(followerGrowth / connectedPlatforms) : 0;
  
  return {
    totalFollowers,
    totalEngagement,
    totalImpressions,
    followerGrowth,
    postCount: 42 // Mock total post count
  };
};