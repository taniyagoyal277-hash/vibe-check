import React, { useState, useEffect } from 'react';
import MaterialIcon from '../components/MaterialIcon';
import { useVibe } from '../context/VibeContext';
import api from '../services/api';

export const InsightsPage = () => {
  const { timeframe, setTimeframe, selectedVibeDay, setSelectedVibeDay, showToast } = useVibe();

  const [insights, setInsights] = useState({
    dominantVibe: {
      name: 'Peaceful Lavender',
      emoji: '🪻',
      frequencyPercent: 68,
      description: 'Occurred 68% of the past 14 days',
    },
    auraComposition: {
      joyful: 45,
      calm: 25,
      reflective: 18,
      low: 12,
    },
    weeklyLift: '+14% Lift',
    sleepCorrelation: 'You feel 40% more radiant on days you sleep over 7.5 hours 😴',
    bestActivity: 'Your happiest entries mention “Nature Walk” and “Reading” 🌿',
    peakHours: 'Peak vibe hours are between 10:00 AM and 1:00 PM ☀️',
  });

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const data = await api.vibes.getInsights();
        if (data) {
          setInsights(data);
        }
      } catch (err) {
        console.warn('API fetch insights note:', err.message);
      }
    };
    fetchInsights();
  }, [timeframe]);

  const calendarDays = [
    { day: 1, vibe: 'Joyful', bg: 'bg-primary-fixed text-on-primary-fixed' },
    { day: 2, vibe: 'Peaceful', bg: 'bg-secondary-fixed text-on-secondary-fixed' },
    { day: 3, vibe: 'Reflective', bg: 'bg-tertiary-fixed text-on-tertiary-fixed' },
    { day: 4, vibe: 'Joyful', bg: 'bg-primary-fixed text-on-primary-fixed' },
    { day: 5, vibe: 'Calm', bg: 'bg-secondary-fixed text-on-secondary-fixed' },
    { day: 6, vibe: 'Soft Blue', bg: 'bg-surface-container text-on-surface-variant' },
    { day: 7, vibe: 'Joyful', bg: 'bg-primary-fixed text-on-primary-fixed' },
    { day: 8, vibe: 'Peaceful', bg: 'bg-secondary-fixed text-on-secondary-fixed' },
    { day: 9, vibe: 'Peaceful', bg: 'bg-secondary-fixed text-on-secondary-fixed' },
    { day: 10, vibe: 'Radiant', bg: 'bg-primary-fixed text-on-primary-fixed' },
    { day: 11, vibe: 'Reflective', bg: 'bg-tertiary-fixed text-on-tertiary-fixed' },
    { day: 12, vibe: 'Calm', bg: 'bg-secondary-fixed text-on-secondary-fixed' },
    { day: 13, vibe: 'Joyful', bg: 'bg-primary-fixed text-on-primary-fixed' },
    { day: 14, vibe: 'Joyful', bg: 'bg-primary-fixed text-on-primary-fixed' },
    { day: 15, vibe: 'Low', bg: 'bg-surface-container text-on-surface-variant' },
    { day: 16, vibe: 'Peaceful', bg: 'bg-secondary-fixed text-on-secondary-fixed' },
    { day: 17, vibe: 'Peaceful', bg: 'bg-secondary-fixed text-on-secondary-fixed' },
    { day: 18, vibe: 'Radiant', bg: 'bg-primary-fixed text-on-primary-fixed' },
    { day: 19, vibe: 'Joyful', bg: 'bg-primary-fixed text-on-primary-fixed' },
    { day: 20, vibe: 'Grateful', bg: 'bg-tertiary-fixed text-on-tertiary-fixed' },
    { day: 21, vibe: 'Calm', bg: 'bg-secondary-fixed text-on-secondary-fixed' },
    { day: 22, vibe: 'Calm', bg: 'bg-secondary-fixed text-on-secondary-fixed' },
    { day: 23, vibe: 'Reflective', bg: 'bg-tertiary-fixed text-on-tertiary-fixed' },
    { day: 24, vibe: 'Joyful', bg: 'bg-primary-fixed text-on-primary-fixed' },
    { day: 25, vibe: 'Super High Fri', bg: 'bg-primary-fixed-dim text-on-primary-fixed ring-2 ring-primary shadow-md' },
    { day: 26, vibe: 'Peaceful', bg: 'bg-secondary-fixed text-on-secondary-fixed' },
    { day: 27, vibe: 'Joyful', bg: 'bg-primary-fixed text-on-primary-fixed' },
    { day: 28, vibe: 'Peaceful', bg: 'bg-secondary-fixed text-on-secondary-fixed' },
    { day: 29, vibe: 'Chill', bg: 'bg-surface-container text-on-surface-variant' },
    { day: 30, vibe: 'Bright', bg: 'bg-primary-fixed text-on-primary-fixed' },
  ];

  const handleDayClick = (item) => {
    setSelectedVibeDay({
      day: item.day,
      label: item.vibe,
    });
    showToast(`Day ${item.day} Moment 🌸`, `Replaying your ${item.vibe} vibe.`);
  };

  const handleShareAura = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'My Monthly Vibe Aura',
          text: 'I spent 68% of this month in Peaceful Lavender vibe on VibeCheck! 🪻✨',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      showToast('Aura Link Copied ✨', 'Share your cozy wellness aura with friends!');
    }
  };

  return (
    <div className="flex flex-col w-full px-margin-mobile pb-space-xl gap-space-lg relative overflow-hidden">
      {/* Header & Temporal Filter Pills */}
      <div className="flex flex-col gap-space-sm pt-space-xs relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight font-bold">
              Mood Insights
            </span>
            <span className="text-xl">📊</span>
          </div>
          <div className="flex items-center gap-1 bg-surface-container-low px-space-xs py-1 rounded-full shadow-sm">
            {['Week', 'Month', 'Year'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTimeframe(t)}
                className={`font-label-sm text-label-sm px-3 py-1 rounded-full transition-all ${
                  timeframe === t
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Here is your emotional ecosystem over the last 14 days.
        </p>
      </div>

      {/* Hero Card: Dominant Vibe */}
      <div className="relative w-full rounded-lg bg-surface-container-lowest/80 backdrop-blur-xl p-space-lg shadow-[0_12px_32px_-8px_rgba(244,114,182,0.22)] overflow-hidden border border-white/50">
        {/* Glowing Halo Backing */}
        <div className="absolute -top-16 -right-12 w-40 h-40 bg-gradient-to-br from-primary-fixed-dim/40 to-secondary-fixed/40 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-start justify-between relative z-10">
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary uppercase tracking-wider mb-1 font-bold">
              <MaterialIcon name="spa" fill size={14} /> Dominant Vibe
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-1.5 font-bold">
              {insights.dominantVibe.name} <span className="text-lg">{insights.dominantVibe.emoji}</span>
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              {insights.dominantVibe.description}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center shadow-inner">
            <MaterialIcon name="psychology_alt" fill className="text-secondary" size={24} />
          </div>
        </div>

        {/* Soft Mood Distribution Stacked Pill Bar */}
        <div className="mt-space-lg flex flex-col gap-space-xs relative z-10">
          <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
            <span>Aura Composition</span>
            <span className="text-primary font-semibold">Active Cycle</span>
          </div>

          {/* Progress Bar Mosaics */}
          <div className="h-3.5 w-full rounded-full bg-surface-container-high flex overflow-hidden p-0.5 shadow-inner">
            <div
              className="h-full bg-primary-container rounded-l-full relative transition-all"
              style={{ width: `${insights.auraComposition.joyful}%` }}
              title={`Joyful ${insights.auraComposition.joyful}%`}
            ></div>
            <div
              className="h-full bg-secondary-container relative transition-all ml-0.5"
              style={{ width: `${insights.auraComposition.calm}%` }}
              title={`Calm ${insights.auraComposition.calm}%`}
            ></div>
            <div
              className="h-full bg-tertiary-container relative transition-all ml-0.5"
              style={{ width: `${insights.auraComposition.reflective}%` }}
              title={`Reflective ${insights.auraComposition.reflective}%`}
            ></div>
            <div
              className="h-full bg-outline-variant rounded-r-full relative transition-all ml-0.5"
              style={{ width: `${insights.auraComposition.low}%` }}
              title={`Low ${insights.auraComposition.low}%`}
            ></div>
          </div>

          {/* Distribution Legends */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-space-sm pt-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
              <span className="font-body-sm text-body-sm text-on-surface">
                Joyful <strong className="text-primary font-bold">{insights.auraComposition.joyful}%</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
              <span className="font-body-sm text-body-sm text-on-surface">
                Calm <strong className="text-secondary font-bold">{insights.auraComposition.calm}%</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span>
              <span className="font-body-sm text-body-sm text-on-surface">
                Reflective <strong className="text-tertiary font-bold">{insights.auraComposition.reflective}%</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-outline-variant"></span>
              <span className="font-body-sm text-body-sm text-on-surface">
                Low <strong className="text-on-surface-variant font-bold">{insights.auraComposition.low}%</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Mood Wave Chart */}
      <div className="rounded-lg bg-surface-container-lowest/80 backdrop-blur-xl p-space-lg shadow-sm flex flex-col gap-space-sm relative border border-surface-container-high/40">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
              Weekly Mood Wave
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Energy rhythm across daylight hours
            </p>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm flex items-center gap-1 font-bold">
            <MaterialIcon name="show_chart" size={16} />
            <span>{insights.weeklyLift}</span>
          </div>
        </div>

        {/* Annotated Wave Graph (Inline SVG) */}
        <div className="relative w-full h-44 mt-space-xs flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 320 120">
            <defs>
              <linearGradient id="waveGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#f472b6" stopOpacity="0.45"></stop>
                <stop offset="60%" stopColor="#ddb7ff" stopOpacity="0.2"></stop>
                <stop offset="100%" stopColor="#fdf9f3" stopOpacity="0"></stop>
              </linearGradient>
              <linearGradient id="lineStroke" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#a43073"></stop>
                <stop offset="50%" stopColor="#8127cf"></stop>
                <stop offset="100%" stopColor="#f472b6"></stop>
              </linearGradient>
            </defs>
            {/* Wave Fill */}
            <path
              d="M 0,85 C 30,85 45,55 75,60 C 105,65 125,45 155,50 C 185,55 200,90 230,80 C 260,70 270,15 295,20 C 310,24 315,35 320,38 L 320,120 L 0,120 Z"
              fill="url(#waveGradient)"
            ></path>
            {/* Wave Line */}
            <path
              d="M 0,85 C 30,85 45,55 75,60 C 105,65 125,45 155,50 C 185,55 200,90 230,80 C 260,70 270,15 295,20 C 310,24 315,35 320,38"
              fill="none"
              stroke="url(#lineStroke)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            ></path>
            {/* Peak Day Node on Friday (x: 295, y: 20) */}
            <circle className="animate-pulse" cx="295" cy="20" fill="#f472b6" r="5" stroke="#ffffff" strokeWidth="2.5"></circle>
            {/* Minor Nodes */}
            <circle cx="75" cy="60" fill="#a43073" opacity="0.6" r="3"></circle>
            <circle cx="155" cy="50" fill="#8127cf" opacity="0.6" r="3"></circle>
            <circle cx="230" cy="80" fill="#874b69" opacity="0.6" r="3"></circle>
          </svg>

          {/* Friday Callout Floating Tag */}
          <div className="absolute right-2 top-0 px-2 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm shadow-md flex items-center gap-1 pointer-events-none transform -translate-y-1">
            <span>Fri: High Energy</span>
            <span>🌟</span>
          </div>
        </div>

        {/* Day Labels below chart */}
        <div className="flex justify-between items-center px-1 font-label-sm text-label-sm text-on-surface-variant font-medium">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span className="text-secondary font-bold">Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>

      {/* Correlation Insights Cards */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Vibe Patterns
          </h3>
          <span className="font-label-sm text-label-sm text-primary flex items-center gap-0.5 font-bold">
            AI Synced <MaterialIcon name="bolt" size={14} />
          </span>
        </div>

        {/* Card 1: Sleep & Mood */}
        <div className="rounded-lg bg-surface-container-low p-space-md flex items-center gap-space-md shadow-sm border border-surface-container-high/30">
          <div className="w-12 h-12 shrink-0 rounded-2xl bg-secondary-fixed flex items-center justify-center text-secondary shadow-sm">
            <MaterialIcon name="bedtime" size={24} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-secondary uppercase tracking-wide font-bold">
              Sleep &amp; Mood
            </span>
            <p className="font-body-md text-body-md text-on-surface line-clamp-2 mt-0.5">
              You feel <strong className="text-primary font-bold">40% more radiant</strong> on days you sleep over 7.5 hours <span className="inline-block">😴</span>
            </p>
          </div>
        </div>

        {/* Card 2: Best Activity */}
        <div className="rounded-lg bg-surface-container-low p-space-md flex items-center gap-space-md shadow-sm border border-surface-container-high/30">
          <div className="w-12 h-12 shrink-0 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
            <MaterialIcon name="forest" fill size={24} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-primary uppercase tracking-wide font-bold">
              Best Activity
            </span>
            <p className="font-body-md text-body-md text-on-surface line-clamp-2 mt-0.5">
              Your happiest entries mention <strong className="text-on-surface font-semibold">“Nature Walk”</strong> and <strong className="text-on-surface font-semibold">“Reading”</strong> <span className="inline-block">🌿</span>
            </p>
          </div>
        </div>

        {/* Card 3: Time of Day */}
        <div className="rounded-lg bg-surface-container-low p-space-md flex items-center gap-space-md shadow-sm border border-surface-container-high/30">
          <div className="w-12 h-12 shrink-0 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-tertiary shadow-sm">
            <MaterialIcon name="wb_sunny" size={24} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-tertiary uppercase tracking-wide font-bold">
              Time of Day
            </span>
            <p className="font-body-md text-body-md text-on-surface line-clamp-2 mt-0.5">
              Peak vibe hours are between <strong className="text-secondary font-bold">10:00 AM and 1:00 PM</strong> <span className="inline-block">☀️</span>
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Mood Calendar Matrix */}
      <div className="rounded-lg bg-surface-container-lowest/80 backdrop-blur-xl p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container-high/40">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              30-Day Vibe Matrix
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Tap a day to replay journal moment
            </p>
          </div>
          <MaterialIcon name="calendar_month" className="text-primary-container" size={24} />
        </div>

        {/* 7-Column Dot/Squircle Grid */}
        <div className="grid grid-cols-7 gap-2 pt-1 place-items-center">
          {/* Day headers */}
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((h, i) => (
            <span key={i} className="font-label-sm text-label-sm text-outline font-bold">
              {h}
            </span>
          ))}

          {/* 30 Calendar Days */}
          {calendarDays.map((item) => (
            <button
              key={item.day}
              type="button"
              onClick={() => handleDayClick(item)}
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold shadow-sm transition-transform active:scale-90 ${item.bg}`}
            >
              {item.day}
            </button>
          ))}
          <div className="w-8 h-8 rounded-xl bg-surface-container-high/40 opacity-30 flex items-center justify-center text-[11px] text-outline">
            31
          </div>
        </div>

        {/* Day details banner hook */}
        <div className="flex items-center justify-between px-space-md py-2.5 rounded-full bg-surface-container-low text-on-surface transition-all border border-surface-container-high/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
            <span className="font-label-md text-label-md font-semibold">
              Selected: Day {selectedVibeDay.day} • {selectedVibeDay.label}
            </span>
          </div>
          <MaterialIcon name="arrow_forward_ios" className="text-primary" size={13} />
        </div>
      </div>

      {/* Export / Share Insight Card */}
      <div className="relative w-full rounded-lg bg-gradient-to-br from-primary-fixed/40 via-surface-container-lowest to-secondary-fixed/40 p-space-lg shadow-[0_12px_32px_-8px_rgba(244,114,182,0.18)] flex flex-col gap-space-md overflow-hidden border border-white/60">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <MaterialIcon name="auto_awesome" className="text-primary" size={18} />
              <span className="font-label-sm text-label-sm text-primary font-bold tracking-wide uppercase">
                Shareable Aura
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mt-0.5 font-bold">
              Your Monthly Vibe Aura
            </h3>
          </div>

          {/* Mini Preview Aura Badge */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary-container via-secondary to-primary-fixed-dim p-0.5 shadow-md flex items-center justify-center animate-spin-slow">
            <div className="w-full h-full bg-surface-container-lowest rounded-full flex flex-col items-center justify-center text-center p-1">
              <span className="text-sm leading-none">🪻✨</span>
              <span className="text-[9px] font-bold text-secondary uppercase tracking-tight">Nov</span>
            </div>
          </div>
        </div>

        {/* Aesthetic Card Mockup Preview */}
        <div className="w-full bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl p-space-md shadow-sm relative z-10 flex items-center justify-between border border-surface-container-high/40">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center shadow-xs">
              <span className="text-lg">🌸</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Peaceful Radiance
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Top Harmony Match • 89%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-primary-fixed px-2.5 py-1 rounded-full text-on-primary-fixed font-label-sm text-label-sm font-bold">
            <span>HQ Story</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={handleShareAura}
          className="w-full py-3.5 px-space-lg rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary font-label-lg text-label-lg shadow-md hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 relative z-10 font-bold"
        >
          <MaterialIcon name="share" size={20} />
          <span>Share your Monthly Vibe Aura ✨</span>
        </button>
      </div>
    </div>
  );
};

export default InsightsPage;

