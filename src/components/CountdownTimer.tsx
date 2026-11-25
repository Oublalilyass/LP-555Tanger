import { useEffect, useState } from 'react';
import { VENUE_INFO } from '../data/nye2027Data';

import { SiteLanguage } from './Navbar';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isNewYearArrived: boolean;
}

function calculateTimeLeft(): TimeLeft {
  const targetMs = new Date(VENUE_INFO.targetIsoDate).getTime();
  const nowMs = Date.now();
  const diff = targetMs - nowMs;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isNewYearArrived: true,
    };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isNewYearArrived: false,
  };
}

function padTwo(num: number): string {
  return String(num).padStart(2, '0');
}

export function CountdownTimer({ language = 'fr' }: { language?: SiteLanguage }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (timeLeft.isNewYearArrived) {
    return (
      <div
        aria-live="polite"
        className="bg-transparent py-4 text-center"
      >
        <p className="font-sans text-3xl sm:text-4xl font-extrabold tracking-wide gold-bevel-text">
          {language === 'fr' ? 'Bonne Année 2027' : 'Happy New Year 2027'}
        </p>
      </div>
    );
  }

  const units =
    language === 'fr'
      ? [
          { label: 'Jours', value: padTwo(timeLeft.days) },
          { label: 'Heures', value: padTwo(timeLeft.hours) },
          { label: 'Minutes', value: padTwo(timeLeft.minutes) },
          { label: 'Secondes', value: padTwo(timeLeft.seconds) },
        ]
      : [
          { label: 'Days', value: padTwo(timeLeft.days) },
          { label: 'Hours', value: padTwo(timeLeft.hours) },
          { label: 'Minutes', value: padTwo(timeLeft.minutes) },
          { label: 'Seconds', value: padTwo(timeLeft.seconds) },
        ];

  return (
    <div
      aria-label="Countdown to New Year 2027 in Tangier"
      className="bg-[#09090B]/75 backdrop-blur-md border border-[#D4AF37]/30 rounded-xl px-4 sm:px-7 py-4 sm:py-5 shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
    >
      <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.2em] uppercase mb-3">
        <span className="text-[#A1A1AA]">
          {language === 'fr' ? 'SIGNAL MINUIT' : 'MIDNIGHT SIGNAL'}
        </span>
        <span className="text-[#D4AF37] font-semibold">FM 20.27</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 items-center">
        {units.map((unit, idx) => (
          <div
            key={unit.label}
            className="relative flex flex-col items-center justify-center py-1"
          >
            <span className="font-sans tabular-nums text-3xl sm:text-5xl font-extrabold leading-none tracking-[0.03em] gold-bevel-text">
              {unit.value}
            </span>
            <span className="mt-2 font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#F7DC88]/85 font-medium">
              {unit.label}
            </span>
            {idx < units.length - 1 && (
              <span
                aria-hidden="true"
                className="hidden sm:flex flex-col gap-1.5 absolute -right-2.5 top-3.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/70" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/70" />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
