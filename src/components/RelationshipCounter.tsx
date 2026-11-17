import { useEffect, useState } from 'react';

interface DurationResult {
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  years: number;
  months: number;
  days: number;
}

const MEET_DATE = new Date(2025, 5, 15, 0, 0, 0); // June 15, 2025 (month is 0-indexed: 5 = June)

function calcDuration(): DurationResult {
  const now = new Date();
  const diff = Math.max(0, now.getTime() - MEET_DATE.getTime());

  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Exact calendar years, months, and remaining days since June 15, 2025
  let years = now.getFullYear() - MEET_DATE.getFullYear();
  let months = now.getMonth() - MEET_DATE.getMonth();
  let days = now.getDate() - MEET_DATE.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    hours,
    minutes,
    seconds,
    totalDays,
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
  };
}

export default function RelationshipCounter(_props: { startDate?: string }) {
  const [duration, setDuration] = useState<DurationResult>(() => calcDuration());

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(calcDuration());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
        {duration.years} {duration.years === 1 ? 'year' : 'years'}, {duration.months}{' '}
        {duration.months === 1 ? 'month' : 'months'}, and {duration.days}{' '}
        {duration.days === 1 ? 'day' : 'days'} since June 15, 2025 ♥
      </p>
    </div>
  );
}