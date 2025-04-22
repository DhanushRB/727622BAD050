export interface Platform {
  id: string;
  name: 'Twitter' | 'Instagram' | 'Facebook' | 'LinkedIn';
  icon: string;
  color: string;
  connected: boolean;
}

export interface Metric {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  unit?: string;
}

export interface HistoricalData {
  date: string;
  value: number;
}

export interface MetricWithHistory extends Metric {
  history: HistoricalData[];
}

export interface Post {
  id: string;
  platform: Platform['id'];
  content: string;
  imageUrl?: string;
  publishedAt: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  engagementRate: number;
  impressions: number;
  reach: number;
}

export interface Audience {
  total: number;
  growth: number;
  demographics: {
    ageGroups: {
      label: string;
      value: number;
    }[];
    genders: {
      label: string;
      value: number;
    }[];
    locations: {
      label: string;
      value: number;
    }[];
  };
}

export interface PlatformData {
  platform: Platform;
  metrics: MetricWithHistory[];
  audience: Audience;
  topPosts: Post[];
}

export interface DateRange {
  start: string;
  end: string;
}

export interface ReportData {
  id: string;
  name: string;
  dateRange: DateRange;
  createdAt: string;
  platforms: string[];
}