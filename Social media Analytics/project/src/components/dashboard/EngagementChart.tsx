import React, { useState, useEffect, useRef } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import Card, { CardContent, CardHeader, CardTitle } from '../ui/Card';

const EngagementChart: React.FC = () => {
  const { platformData, selectedPlatform } = useAnalytics();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chartCreated, setChartCreated] = useState(false);
  
  const filteredData = selectedPlatform
    ? platformData.filter(data => data.platform.id === selectedPlatform)
    : platformData.filter(data => data.platform.connected);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
  
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
  
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, width, height);
  
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    for (let i = 1; i < 5; i++) {
      const y = height - (i * height / 5);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    filteredData.forEach((data, index) => {
      const colors = ['#3B82F6', '#8B5CF6', '#14B8A6', '#F97316'];
      ctx.strokeStyle = data.platform.color || colors[index % colors.length];
      ctx.lineWidth = 3;
      
      ctx.beginPath();
  
      ctx.moveTo(0, height * 0.7);
    
      for (let x = 0; x < width; x += width / 10) {
        const heightMultiplier = 0.7 - (x / width * 0.4);
        const randomVariation = (Math.sin(x / 20) * 0.1) + (Math.random() * 0.05);
        const y = height * (heightMultiplier + randomVariation);
        
        ctx.lineTo(x, y);
      }
      
      ctx.stroke();
      
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, `${data.platform.color}33` || `${colors[index % colors.length]}33`);
      gradient.addColorStop(1, `${data.platform.color}00` || `${colors[index % colors.length]}00`);
      
      ctx.fillStyle = gradient;
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.fill();
    });
    
    setChartCreated(true);
    
  }, [filteredData, selectedPlatform]);
  
  return (
    <Card className="h-full">
      <CardHeader className="flex items-start justify-between">
        <div>
          <CardTitle>Engagement Over Time</CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Compare engagement across platforms
          </p>
        </div>
        <div className="flex space-x-2">
          {filteredData.map((data, index) => (
            <div key={index} className="flex items-center">
              <span 
                className="w-3 h-3 rounded-full mr-1"
                style={{ backgroundColor: data.platform.color }}
              ></span>
              <span className="text-xs">{data.platform.name}</span>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px] w-full">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full" 
            width={800} 
            height={300}
          ></canvas>
          
          {!chartCreated && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementChart;