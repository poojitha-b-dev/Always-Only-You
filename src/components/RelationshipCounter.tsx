import { useEffect, useState } from 'react';

interface DurationResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalMonths: number;
  totalYears: number;
}

function calcDuration(startDate: string): DurationResult {
  const start = new Date(startDate).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - start);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const startYear = new Date(startDate).getFullYear();
  const totalYears = days / 365;
  const totalMonths = Math.floor(totalYears * 12);

  return {
    days: days % 30,
    hours,
    minutes,
    seconds,
    totalDays: days,
    totalMonths,
    totalYears: Math.floor(totalYears),
  };
}

export default function RelationshipCounter({ startDate }: { startDate: string }) {
  const [duration, setDuration] = useState<DurationResult>(() => calcDuration(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(calcDuration(startDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const units = [
    { label: 'Days', value: duration.totalDays },
    { label: 'Hours', value: duration.hours },
    { label: 'Minutes', value: duration.minutes },
    { label: 'Seconds', value: duration.seconds },
  ];

  return (
    <div className="text-center">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="glass-card rounded-2xl p-4 sm:p-6 hover-lift"
          >
            <div className="text-3xl sm:text-4xl font-bold gradient-text tabular-nums">
              {unit.value.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm text-lavender-700 font-medium mt-1">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 font-hand text-xl text-blush-600">
        {duration.totalYears} years, {duration.totalMonths % 12} months, and {duration.totalDays} days of loving you
      </p>
    </div>
  );
}
