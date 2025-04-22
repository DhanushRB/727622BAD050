import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  bordered = false,
  hoverable = false
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8'
  };
  
  const borderStyle = bordered ? 'border border-gray-200' : '';
  const hoverStyle = hoverable ? 'transition-shadow duration-200 hover:shadow-lg' : '';
  
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-sm
        ${paddingStyles[padding]}
        ${borderStyle}
        ${hoverStyle}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children,
  className = '' 
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children,
  className = '' 
}) => {
  return (
    <h3 className={`text-lg font-medium text-gray-900 ${className}`}>
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children,
  className = '' 
}) => {
  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children,
  className = '' 
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children,
  className = '' 
}) => {
  return (
    <div className={`mt-4 flex items-center ${className}`}>
      {children}
    </div>
  );
};

export default Card;