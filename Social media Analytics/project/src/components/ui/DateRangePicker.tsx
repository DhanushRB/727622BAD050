import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { DateRange } from '../../types';

interface DateRangePickerProps {
  dateRange: DateRange;
  onChange: (range: DateRange) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ dateRange, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Predefined ranges
  const ranges = [
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 14 days', days: 14 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 90 days', days: 90 }
  ];
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  const handleRangeSelect = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    
    onChange({
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    });
    
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
        <span>
          {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <div className="space-y-2">
              {ranges.map((range) => (
                <button
                  key={range.days}
                  onClick={() => handleRangeSelect(range.days)}
                  className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100"
                >
                  {range.label}
                </button>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label htmlFor="start-date" className="block text-xs font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    value={dateRange.start}
                    onChange={(e) => onChange({ ...dateRange, start: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="end-date" className="block text-xs font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="end-date"
                    value={dateRange.end}
                    onChange={(e) => onChange({ ...dateRange, end: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;