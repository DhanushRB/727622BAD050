import React, { createContext, useContext, useState, ReactNode } from 'react';
import { platformData, getOverallStats, platforms, reports } from '../data/mockData';
import { DateRange, Platform, PlatformData } from '../types';

interface AnalyticsContextType {
  platforms: Platform[];
  platformData: PlatformData[];
  selectedPlatform: string | null;
  setSelectedPlatform: (platformId: string | null) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  overallStats: {
    totalFollowers: number;
    totalEngagement: number;
    totalImpressions: number;
    followerGrowth: number;
    postCount: number;
  };
  reports: any[];
}

const defaultDateRange: DateRange = {
  start: (() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  })(),
  end: new Date().toISOString().split('T')[0]
};

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);
  
  const overallStats = getOverallStats();
  
  const value = {
    platforms,
    platformData,
    selectedPlatform,
    setSelectedPlatform,
    dateRange,
    setDateRange,
    overallStats,
    reports
  };
  
  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};