import React from 'react';

interface TimerProps {
  timeRemaining: number;
  totalTime: number;
}

export const Timer: React.FC<TimerProps> = ({ timeRemaining, totalTime }) => {
  const percentage = (timeRemaining / totalTime) * 100;
  
  let timerColor = 'bg-green-500';
  if (percentage < 50) timerColor = 'bg-yellow-500';
  if (percentage < 25) timerColor = 'bg-red-500';

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
      <div
        className={`h-4 rounded-full transition-all duration-1000 ${timerColor}`}
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="text-center text-sm text-gray-600 mt-1">
        {timeRemaining}s remaining
      </div>
    </div>
  );
};