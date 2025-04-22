import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Bell, User } from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';
import DateRangePicker from '../ui/DateRangePicker';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dateRange, setDateRange } = useAnalytics();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`
      sticky top-0 z-30 w-full transition-all duration-200
      ${isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'}
    `}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex lg:hidden">
            <button
              onClick={onMenuToggle}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-1 flex items-center justify-end md:justify-between">
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search analytics..."
                  className="py-2 pl-10 pr-4 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <DateRangePicker dateRange={dateRange} onChange={setDateRange} />
              </div>
              
              <button className="relative p-2 text-gray-500 hover:text-gray-600">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
              
              <div className="border-l h-8 border-gray-200 mx-1"></div>
              
              <button className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <span className="hidden md:inline-block text-sm font-medium">John Doe</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;