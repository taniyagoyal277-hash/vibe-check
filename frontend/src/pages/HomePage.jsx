import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialIcon from '../components/MaterialIcon';
import { useVibe } from '../context/VibeContext';

export const HomePage = () => {
  const navigate = useNavigate();
  const {
    user,
    currentMood,
    setMoodByPill,
    intentions,
    toggleIntention,
    addIntention,
    currentAffirmation,
    shuffleAffirmation,
    showToast,
  } = useVibe();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [newIntentionModal, setNewIntentionModal] = useState(false);
  const [newIntentionText, setNewIntentionText] = useState('');

  const completedCount = intentions.filter((i) => i.completed).length;

  const moodPills = [
    { label: 'Radiant', emoji: '🌸' },
    { label: 'Calm', emoji: '☁️' },
    { label: 'Balanced', emoji: '🌿' },
    { label: 'Tired', emoji: '🌙' },
    { label: 'Low', emoji: '🌧️' },
  ];

  const handleQuickLog = () => {
    showToast(`${currentMood.vibe} vibe anchored for today ✨`, 'Recorded in your daily rhythm journal.');
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    showToast(
      isBookmarked ? 'Removed from saved' : 'Saved to Gentle Wisdom! 🔖',
      isBookmarked ? 'Quote removed.' : 'You can find it in your sanctuary notebook.'
    );
  };

  const handleSoundToggle = () => {
    setIsPlayingSound(!isPlayingSound);
    showToast(
      isPlayingSound ? 'Sound immersion paused' : 'Playing Celestial Meadow 🎶',
      isPlayingSound ? 'Enjoy the silence.' : 'Breathe deep with soft harmonic tones.'
    );
  };

  return (
    <div className="flex flex-col w-full px-margin-mobile pb-space-lg gap-space-lg relative">
      {/* Top Welcome & Streak Section */}
      <div className="flex flex-col gap-space-xs relative z-10 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">
              Good morning, {user.name.split(' ')[0]}
            </span>
            <span className="text-primary text-[20px] animate-pulse">✨</span>
          </div>
          {/* Streak Badge Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed shadow-sm">
            <span className="text-base select-none">🔥</span>
            <span className="font-label-sm text-label-sm tracking-wide uppercase font-bold">
              {user.streak} Day Streak
            </span>
          </div>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          How is your energy feeling today?
        </p>
      </div>

      {/* Hero Daily Check-in Card (Glassmorphic Pastel) */}
      <div className="relative w-full rounded-lg bg-surface-container-lowest/85 backdrop-blur-xl p-space-lg shadow-[0_12px_32px_-8px_rgba(244,114,182,0.22)] flex flex-col gap-space-md border border-white/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
              <MaterialIcon name="sentiment_satisfied" size={18} />
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Today's Vibe
            </span>
          </div>
          <button
            onClick={() => navigate('/daily-vibe')}
            className="font-label-sm text-label-sm text-tertiary font-bold tracking-wider uppercase bg-tertiary-fixed/60 hover:bg-tertiary-fixed px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
          >
            <span>Daily Pulse</span>
            <MaterialIcon name="chevron_right" size={14} />
          </button>
        </div>

        {/* Interactive Mood Face Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
          {moodPills.map((pill) => {
            const isSelected = currentMood.vibe === pill.label;
            return (
              <button
                key={pill.label}
                type="button"
                onClick={() => setMoodByPill(pill.label)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all transform active:scale-95 shrink-0 shadow-xs ${
                  isSelected
                    ? 'bg-primary-container text-on-primary-container shadow-sm font-semibold scale-105 ring-2 ring-primary-container/30'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-secondary-fixed/50'
                }`}
              >
                <span className="text-base">{pill.emoji}</span>
                <span className="font-label-md text-label-md">{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* Note & Quick Log CTA Button */}
        <div className="flex flex-col gap-space-sm pt-space-xs">
          <div
            onClick={() => navigate('/daily-vibe')}
            className="w-full bg-surface-container-low rounded-xl px-space-md py-2.5 flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors"
          >
            <span className="font-body-sm text-body-sm text-on-surface-variant/80 italic">
              {currentMood.statusText}
            </span>
            <MaterialIcon name="edit_note" className="text-primary" size={18} />
          </div>

          <button
            type="button"
            onClick={handleQuickLog}
            className="w-full py-3.5 px-space-lg rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(244,114,182,0.45)] hover:opacity-95 active:scale-[0.98] transition-all font-bold"
          >
            <MaterialIcon name="favorite" fill size={20} />
            <span>Quick Log Vibe</span>
          </button>
        </div>
      </div>

      {/* Weekly Rhythm Mini Strip */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className="font-label-lg text-label-lg text-on-surface font-bold">Weekly Rhythm</span>
          <span className="font-label-sm text-label-sm text-primary font-bold cursor-pointer" onClick={() => navigate('/insights')}>
            Past 7 Days
          </span>
        </div>
        <div className="grid grid-cols-7 gap-1.5 bg-surface-container-low p-2.5 rounded-lg shadow-sm">
          {/* Mon */}
          <div className="flex flex-col items-center gap-1 py-1.5 rounded-full bg-surface-container-lowest">
            <span className="font-label-sm text-label-sm text-on-surface-variant">M</span>
            <span className="text-sm">🌸</span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
          </div>
          {/* Tue */}
          <div className="flex flex-col items-center gap-1 py-1.5 rounded-full bg-surface-container-lowest">
            <span className="font-label-sm text-label-sm text-on-surface-variant">T</span>
            <span className="text-sm">🌿</span>
            <div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div>
          </div>
          {/* Wed */}
          <div className="flex flex-col items-center gap-1 py-1.5 rounded-full bg-surface-container-lowest">
            <span className="font-label-sm text-label-sm text-on-surface-variant">W</span>
            <span className="text-sm">☁️</span>
            <div className="w-1.5 h-1.5 rounded-full bg-secondary-container"></div>
          </div>
          {/* Thu */}
          <div className="flex flex-col items-center gap-1 py-1.5 rounded-full bg-surface-container-lowest">
            <span className="font-label-sm text-label-sm text-on-surface-variant">T</span>
            <span className="text-sm">🌸</span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
          </div>
          {/* Fri */}
          <div className="flex flex-col items-center gap-1 py-1.5 rounded-full bg-surface-container-lowest">
            <span className="font-label-sm text-label-sm text-on-surface-variant">F</span>
            <span className="text-sm">✨</span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary-container"></div>
          </div>
          {/* Sat */}
          <div className="flex flex-col items-center gap-1 py-1.5 rounded-full bg-surface-container-lowest">
            <span className="font-label-sm text-label-sm text-on-surface-variant">S</span>
            <span className="text-sm">🌿</span>
            <div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div>
          </div>
          {/* Sun (Today - Active Highlight) */}
          <div className="flex flex-col items-center gap-1 py-1.5 rounded-full bg-primary text-on-primary shadow-sm scale-105">
            <span className="font-label-sm text-label-sm font-bold text-on-primary">S</span>
            <span className="text-sm">{currentMood.emoji}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-on-primary animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Mindful Tools Quick Bento Grid */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className="font-label-lg text-label-lg text-on-surface font-bold">Mindful Sanctuary</span>
          <span className="font-label-sm text-label-sm text-secondary font-bold">4 Tools</span>
        </div>
        <div className="grid grid-cols-2 gap-space-sm">
          {/* Tool 1: Breathing Bloom */}
          <div
            onClick={() => showToast('Breathing Bloom 🌸', 'Inhale calm... hold... exhale softness.')}
            className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between h-40 relative overflow-hidden group active:scale-[0.98] transition-transform cursor-pointer border border-surface-container-high/40 hover:shadow-md"
          >
            <div className="flex items-start justify-between relative z-10">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                <svg className="w-6 h-6 animate-spin" fill="none" style={{ animationDuration: '9s' }} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" fill="currentColor" fillOpacity="0.25" r="8"></circle>
                  <circle cx="12" cy="7" fill="currentColor" fillOpacity="0.6" r="4"></circle>
                  <circle cx="16" cy="14" fill="currentColor" fillOpacity="0.6" r="4"></circle>
                  <circle cx="8" cy="14" fill="currentColor" fillOpacity="0.6" r="4"></circle>
                </svg>
              </div>
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-fixed-dim text-on-secondary-fixed">
                3 min
              </span>
            </div>
            <div className="relative z-10">
              <h2 className="font-headline-sm text-headline-sm text-on-surface text-[16px] leading-tight font-bold">
                Breathing Bloom
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Gentle lung reset</p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-secondary-fixed/30 pointer-events-none"></div>
          </div>

          {/* Tool 2: Gratitude Jar */}
          <div
            onClick={() => showToast('Gratitude Jar 🍯', 'Your heart has 3 tiny joys recorded today.')}
            className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between h-40 relative overflow-hidden group active:scale-[0.98] transition-transform cursor-pointer border border-surface-container-high/40 hover:shadow-md"
          >
            <div className="flex items-start justify-between relative z-10">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                <MaterialIcon name="auto_stories" size={22} />
              </div>
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-fixed-dim text-on-primary-fixed">
                3 notes
              </span>
            </div>
            <div className="relative z-10">
              <h2 className="font-headline-sm text-headline-sm text-on-surface text-[16px] leading-tight font-bold">
                Gratitude Jar
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Cherish tiny joys</p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-primary-fixed/30 pointer-events-none"></div>
          </div>

          {/* Tool 3: Soundscapes */}
          <div
            onClick={handleSoundToggle}
            className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between h-40 relative overflow-hidden group active:scale-[0.98] transition-transform cursor-pointer border border-surface-container-high/40 hover:shadow-md"
          >
            <div className="flex items-start justify-between relative z-10">
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <MaterialIcon name="graphic_eq" size={22} />
              </div>
              <div className="flex items-center gap-0.5 text-primary">
                <span className="w-1 h-3 rounded-full bg-tertiary animate-pulse"></span>
                <span className="w-1 h-4 rounded-full bg-tertiary animate-pulse" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1 h-2 rounded-full bg-tertiary animate-pulse" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
            <div className="relative z-10">
              <h2 className="font-headline-sm text-headline-sm text-on-surface text-[16px] leading-tight font-bold">
                Soundscapes
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {isPlayingSound ? 'Playing: Meadow' : 'Rain, Lo-fi, Cosmos'}
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-tertiary-fixed/30 pointer-events-none"></div>
          </div>

          {/* Tool 4: Gentle Affirmations */}
          <div
            onClick={shuffleAffirmation}
            className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between h-40 relative overflow-hidden group active:scale-[0.98] transition-transform cursor-pointer border border-surface-container-high/40 hover:shadow-md"
          >
            <div className="flex items-start justify-between relative z-10">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <MaterialIcon name="style" size={22} />
              </div>
              <span className="font-label-sm text-label-sm text-primary flex items-center gap-0.5 font-semibold">
                <MaterialIcon name="shuffle" size={14} />
                Shuffle
              </span>
            </div>
            <div className="relative z-10">
              <h2 className="font-headline-sm text-headline-sm text-on-surface text-[16px] leading-tight font-bold">
                Affirmations
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 italic line-clamp-2">
                {currentAffirmation}
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-surface-container-high/60 pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Visual Serenity Card with Sound Immersion */}
      <div className="relative rounded-lg overflow-hidden h-32 w-full shadow-sm bg-surface-container-high">
        <div
          className="bg-cover bg-center w-full h-full transform transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhgOym2OvPKuDdKIc74ydKR6X27w5UlDo8G2ETyGFavKl6O3-BDGCKRgm-w_o4D_V05KOw8Pywq0tR2fJ5fA3GbbPSgbhzyHy9iZAqMFktQi147zTztsPc_866wBzT_68hM5PT6D4-i1z2AcceLw-iHUHHu2kSK0WQqDJ7iC7enmXNU7mOEqi6QUsm30metrk8AF6l-iaAFoNL-7Yyj29YV-d5hLa7plXCaTW1Jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-on-surface/75 via-on-surface/40 to-transparent flex items-center px-space-lg">
          <div className="flex flex-col text-surface-bright max-w-[70%]">
            <span className="font-label-sm text-label-sm tracking-widest uppercase text-primary-fixed-dim font-bold">
              Sound Immersion
            </span>
            <h3 className="font-headline-sm text-headline-sm leading-tight text-white mt-0.5 font-bold">
              Celestial Meadow
            </h3>
            <p className="font-body-sm text-body-sm text-surface-container-low opacity-90 line-clamp-1">
              Soft harmonic tones for rest
            </p>
          </div>
          <button
            onClick={handleSoundToggle}
            className="ml-auto w-11 h-11 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-lg active:scale-95 transition-transform hover:bg-white"
          >
            <MaterialIcon
              name={isPlayingSound ? 'pause' : 'play_arrow'}
              fill
              size={24}
            />
          </button>
        </div>
      </div>

      {/* Daily Intention Tracker Checklist */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="font-label-lg text-label-lg text-on-surface font-bold">Daily Intentions</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold">
              {completedCount}/{intentions.length} Done
            </span>
          </div>
          <button
            onClick={() => {
              const text = prompt('Enter your gentle daily intention:');
              if (text && text.trim()) {
                addIntention(text.trim());
                showToast('Intention Added ✨', `"${text.trim()}"`);
              }
            }}
            className="font-label-sm text-label-sm text-primary hover:underline font-semibold"
          >
            Add New
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {intentions.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleIntention(item.id)}
              className="flex items-center justify-between p-3.5 rounded-full bg-surface-container-lowest shadow-sm cursor-pointer transition-all active:scale-[0.99] border border-surface-container-high/40 hover:bg-surface-container-low/50"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                    item.completed
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-high text-transparent'
                  }`}
                >
                  <MaterialIcon name="check" size={16} />
                </div>
                <span
                  className={`font-body-md text-body-md transition-all ${
                    item.completed
                      ? 'line-through opacity-70 text-on-surface-variant'
                      : 'text-on-surface font-medium'
                  }`}
                >
                  {item.text}
                </span>
              </div>
              <MaterialIcon name={item.icon} className={item.iconColor} size={18} />
            </div>
          ))}
        </div>
      </div>

      {/* Quote of the Day Card (Soft Pastel Gradient Box) */}
      <div className="rounded-lg p-space-lg bg-gradient-to-br from-tertiary-fixed via-primary-fixed-dim/40 to-secondary-fixed/50 shadow-sm relative overflow-hidden flex flex-col gap-2 border border-white/40">
        <div className="flex items-center justify-between text-on-tertiary-container">
          <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold">
            Gentle Wisdom
          </span>
          <MaterialIcon name="format_quote" size={18} />
        </div>
        <p className="font-headline-sm text-headline-sm text-on-tertiary-container text-[17px] leading-relaxed italic font-medium">
          "Gentle reminder: You do not need to bloom every single day. Rest is also growth. 🌷"
        </p>
        <div className="flex items-center justify-between mt-1 text-on-tertiary-container/80">
          <span className="font-body-sm text-body-sm">— Daily Nurture Journal</span>
          <button
            onClick={handleBookmarkToggle}
            className="w-8 h-8 rounded-full bg-surface-bright/70 text-on-surface flex items-center justify-center active:scale-90 transition-transform hover:bg-surface-bright shadow-xs"
          >
            <MaterialIcon
              name={isBookmarked ? 'bookmark' : 'bookmark_border'}
              fill={isBookmarked}
              size={16}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

