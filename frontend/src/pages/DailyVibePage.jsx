import React, { useState } from 'react';
import MaterialIcon from '../components/MaterialIcon';
import { useVibe } from '../context/VibeContext';
import api from '../services/api';

export const DailyVibePage = () => {
  const { currentMood, setCurrentMood, showToast, setUser } = useVibe();

  const [intensity, setIntensity] = useState(currentMood.intensity || 82);
  const [orbPulsing, setOrbPulsing] = useState(false);
  const [energyLevel, setEnergyLevel] = useState(currentMood.energy || 75);
  const [noteText, setNoteText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  // Baseline options
  const baselineMoods = [
    {
      vibe: 'Euphoric',
      icon: '✨',
      pct: 96,
      sub: 'Floating on pure sunshine & bliss',
      gradient: 'from-primary-container via-secondary-container to-secondary',
    },
    {
      vibe: 'Grateful',
      icon: '💖',
      pct: 88,
      sub: 'Full of tenderness and quiet appreciation',
      gradient: 'from-primary via-primary-container to-tertiary-container',
    },
    {
      vibe: 'Peaceful',
      icon: '☁️',
      pct: 82,
      sub: 'Serene waters, unbothered rhythm',
      gradient: 'from-secondary-fixed via-primary-fixed-dim to-surface-tint',
    },
    {
      vibe: 'Overwhelmed',
      icon: '🫧',
      pct: 45,
      sub: 'Lots in the air, soft breath needed',
      gradient: 'from-tertiary via-surface-tint to-secondary',
    },
    {
      vibe: 'Anxious',
      icon: '🌧️',
      pct: 32,
      sub: 'Tender nervous system, holding space',
      gradient: 'from-tertiary-container via-outline to-surface-dim',
    },
    {
      vibe: 'Exhausted',
      icon: '💤',
      pct: 20,
      sub: 'Crying out for a cozy warm blanket',
      gradient: 'from-surface-dim via-tertiary-fixed to-outline-variant',
    },
  ];

  const [selectedVibe, setSelectedVibe] = useState(
    baselineMoods.find((m) => m.vibe === currentMood.vibe) || baselineMoods[2]
  );

  // Micro sensation tags
  const [tags, setTags] = useState([
    { id: 1, name: '#content ✨', selected: true },
    { id: 2, name: '#focused 🎯', selected: false },
    { id: 3, name: '#loved 🌸', selected: true },
    { id: 4, name: '#overthinking 🌀', selected: false },
    { id: 5, name: '#sleepy 🌙', selected: false },
    { id: 6, name: '#creative 🎨', selected: true },
    { id: 7, name: '#motivated 🌿', selected: false },
    { id: 8, name: '#lonely 🕯️', selected: false },
  ]);

  const toggleTag = (id) => {
    setTags((prev) =>
      prev.map((t) => (t.id === id ? { ...t, selected: !t.selected } : t))
    );
  };

  const handleMoodSelect = (mood) => {
    setSelectedVibe(mood);
    setIntensity(mood.pct);
    setCurrentMood((prev) => ({
      ...prev,
      vibe: mood.vibe,
      emoji: mood.icon,
      intensity: mood.pct,
      statusText: `"${mood.sub}"`,
    }));
  };

  const handleOrbClick = () => {
    setOrbPulsing(true);
    setTimeout(() => setOrbPulsing(false), 300);
  };

  const getEnergyDescriptor = (val) => {
    if (val > 70) return 'Vibrant';
    if (val > 40) return 'Balanced';
    return 'Soft Rest';
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      showToast('Recording voice note... 🎙️', 'Whispering your gentle thoughts.');
    } else {
      showToast('Voice vibe preserved 🌸', 'Recorded into your daily entry.');
    }
  };

  const handleSaveVibe = async () => {
    setUser((prev) => ({
      ...prev,
      entriesCount: prev.entriesCount + 1,
      streak: prev.streak + 1,
    }));

    try {
      await api.vibes.create({
        vibe: selectedVibe.vibe,
        emoji: selectedVibe.icon,
        intensity,
        energy: energyLevel,
        tags: tags.filter((t) => t.selected).map((t) => t.name),
        note: noteText,
        voiceMemo: { recorded: isRecording, duration: isRecording ? 15 : 0 },
      });
    } catch (err) {
      console.warn('API save vibe note:', err.message);
    }

    showToast('Vibe saved with love & intention! 🌸', 'Encrypted in your personal wellness constellation.');
  };

  return (
    <div className="flex flex-col w-full px-margin-mobile space-y-space-lg select-none pb-8">
      {/* Intro / Progress Header Card */}
      <div className="flex flex-col space-y-space-xs bg-surface-container-lowest/80 backdrop-blur-xl p-space-md rounded-lg shadow-sm border border-white/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="text-primary text-body-lg">💌</span>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">
              Daily Check-in
            </h2>
          </div>
          <span className="font-label-sm text-label-sm bg-primary-fixed text-on-primary-fixed px-space-sm py-1 rounded-full flex items-center gap-1 font-semibold">
            <MaterialIcon name="spa" fill size={13} />
            Step 1 of 3
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          How does your heart feel right now, love?
        </p>
        {/* Mini Progress Pill Track */}
        <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden mt-space-xs">
          <div className="bg-gradient-to-r from-primary to-secondary-container h-full w-1/3 rounded-full transition-all duration-500"></div>
        </div>
      </div>

      {/* Interactive Mood Orb Hero Section */}
      <div className="relative flex flex-col items-center justify-center p-space-lg bg-surface-container-lowest/80 backdrop-blur-xl rounded-xl shadow-[0_12px_32px_-8px_rgba(244,114,182,0.22)] overflow-hidden border border-white/60">
        {/* Ambient Inner Light */}
        <div className="absolute w-44 h-44 rounded-full bg-primary-container/20 blur-2xl transition-all duration-700 pointer-events-none"></div>

        {/* The Glowing Mood Orb */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Touch to pulse aura"
          onClick={handleOrbClick}
          className="relative my-space-sm group cursor-pointer"
        >
          {/* Outer Pulsing Glow */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary-fixed-dim via-primary-container to-secondary-fixed opacity-70 blur-xl animate-pulse"></div>

          {/* Orb Body */}
          <div
            className={`relative w-36 h-36 rounded-full bg-gradient-to-br ${
              selectedVibe.gradient || 'from-primary-container via-surface-tint to-secondary'
            } flex flex-col items-center justify-center shadow-lg transition-transform duration-300 ${
              orbPulsing ? 'scale-110' : 'active:scale-95'
            }`}
          >
            <span className="text-3xl transition-transform duration-300 select-none">
              {selectedVibe.icon}
            </span>
            <div className="flex items-center gap-0.5 mt-1">
              <MaterialIcon name="bolt" className="text-white" size={14} />
              <span className="font-label-sm text-label-sm text-white drop-shadow-sm font-bold">
                {intensity}%
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-white/90 text-[10px] tracking-wider uppercase">
              Positive Vibe
            </span>
          </div>

          {/* Sparkle Accents */}
          <MaterialIcon
            name="arrow_back_ios_new"
            fill
            className="absolute -top-1 -right-1 text-primary animate-bounce"
            size={20}
          />
          <MaterialIcon
            name="favorite"
            fill
            className="absolute -bottom-2 -left-2 text-secondary-container"
            size={18}
          />
        </div>

        {/* Active Mood Title */}
        <div className="text-center mt-space-xs">
          <h3 className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
            {selectedVibe.vibe}
          </h3>
          <p className="font-body-sm text-body-sm text-tertiary">
            {selectedVibe.sub}
          </p>
        </div>

        {/* Slider to fine-tune intensity */}
        <div className="w-full mt-space-md flex flex-col items-center space-y-1">
          <div className="flex justify-between w-full font-label-sm text-label-sm text-on-surface-variant px-1">
            <span>Gentle Rest</span>
            <span className="text-primary font-bold">
              Vibe Intensity: {intensity}%
            </span>
            <span>High Euphoria</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full h-2 bg-surface-container-high rounded-full accent-primary cursor-pointer transition-all"
          />
        </div>
      </div>

      {/* Mood Pill Palette */}
      <div className="flex flex-col space-y-space-xs">
        <div className="flex items-center justify-between px-1">
          <span className="font-label-md text-label-md text-on-surface font-bold">
            Choose Your Baseline Vibe
          </span>
          <span className="font-label-sm text-label-sm text-primary">Tap to switch</span>
        </div>
        <div className="grid grid-cols-2 gap-space-xs">
          {baselineMoods.map((m) => {
            const isActive = selectedVibe.vibe === m.vibe;
            return (
              <button
                key={m.vibe}
                type="button"
                onClick={() => handleMoodSelect(m)}
                className={`flex items-center gap-space-xs p-space-sm rounded-lg transition-all text-left shadow-sm ${
                  isActive
                    ? 'bg-primary-fixed text-on-primary-fixed font-bold ring-2 ring-primary/40'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <span className="text-xl">{m.icon}</span>
                <span className="font-label-md text-label-md truncate">{m.vibe}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Emotion Tags Multi-Select */}
      <div className="flex flex-col space-y-space-xs">
        <div className="flex items-center justify-between px-1">
          <span className="font-label-md text-label-md text-on-surface font-bold">
            Micro-Sensations Today
          </span>
          <span className="font-label-sm text-label-sm text-tertiary">Select any</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggleTag(tag.id)}
              className={`px-3 py-1.5 rounded-full font-label-md text-label-md transition-all shadow-xs ${
                tag.selected
                  ? 'bg-primary-fixed text-on-primary-fixed font-semibold scale-105'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sleep & Energy Dual Meters */}
      <div className="grid grid-cols-1 gap-space-sm">
        {/* Energy Slider Card */}
        <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col space-y-space-xs border border-surface-container-high/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <MaterialIcon
                name="battery_charging_full"
                fill
                className="text-secondary"
                size={20}
              />
              <span className="font-label-md text-label-md text-on-surface font-bold">
                Energy Level
              </span>
            </div>
            <span className="font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-full font-semibold">
              {energyLevel}% {getEnergyDescriptor(energyLevel)}
            </span>
          </div>
          <div className="relative w-full py-1">
            <input
              type="range"
              min="0"
              max="100"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
              className="w-full h-2 bg-surface-container rounded-full accent-secondary cursor-pointer"
            />
          </div>
        </div>

        {/* Sleep Quality Card */}
        <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col space-y-space-xs border border-surface-container-high/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <MaterialIcon name="bedtime" fill className="text-primary" size={20} />
              <span className="font-label-md text-label-md text-on-surface font-bold">
                Sleep Quality
              </span>
            </div>
            <span className="font-label-sm text-label-sm bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded-full font-semibold">
              7.5 hrs · Restful
            </span>
          </div>
          <div className="flex items-center gap-1.5 pt-1">
            <div className="flex-1 bg-primary/20 h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '85%' }}></div>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">
              Deep &amp; Sweet
            </span>
          </div>
        </div>
      </div>

      {/* Daily Journal Note Prompt Box */}
      <div className="bg-surface-container-lowest/90 backdrop-blur-xl p-space-md rounded-lg shadow-sm flex flex-col space-y-space-xs relative border border-surface-container-high/40">
        <div className="flex items-center justify-between">
          <label className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-1">
            <span>A few soft words for your future self...</span>
            <span className="text-primary text-[14px]">✍️</span>
          </label>
          <span className="font-label-sm text-label-sm text-tertiary">
            {noteText.length}/280
          </span>
        </div>
        <div className="relative">
          <textarea
            maxLength={280}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            rows={3}
            placeholder="Today I felt so light when the afternoon breeze touched the kitchen curtains..."
            className="w-full bg-surface-container-low/70 rounded-md p-space-sm font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-all resize-none border border-transparent focus:border-primary/20"
          ></textarea>
          {/* Voice Note Pastel Button */}
          <button
            type="button"
            aria-label="Record voice note"
            onClick={handleVoiceToggle}
            className={`absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-label-sm hover:scale-105 active:scale-95 transition-all shadow-sm ${
              isRecording
                ? 'bg-primary text-on-primary animate-pulse'
                : 'bg-secondary-fixed text-on-secondary-fixed'
            }`}
          >
            <MaterialIcon name="mic" fill size={15} />
            <span>{isRecording ? 'Listening...' : 'Voice vibe'}</span>
          </button>
        </div>
      </div>

      {/* Photo of the Day / Gratitude Snapshot */}
      <div className="flex flex-col space-y-space-xs">
        <span className="font-label-md text-label-md text-on-surface font-bold px-1">
          Gratitude Snapshot 📷
        </span>
        <div className="grid grid-cols-3 gap-space-xs">
          {/* Upload Placeholder Box */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => showToast('Moment captured 📸', 'Added to your gratitude reel!')}
            className="col-span-1 h-28 bg-surface-container-low rounded-lg flex flex-col items-center justify-center p-2 text-center cursor-pointer hover:bg-surface-container transition-all group border border-dashed border-outline-variant"
          >
            <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-1">
              <MaterialIcon name="add_a_photo" size={18} />
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
              Add a moment that smiled
            </span>
          </div>

          {/* Existing Daily Moments Mini Carousel items */}
          <div className="relative col-span-1 h-28 rounded-lg overflow-hidden group shadow-sm">
            <img
              alt="Cozy latte"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6T2t8yhTW3huHwfClRc2po7jfXC2bawZUozEKtN1bNAbUB3D0tW7u7rrhgyR7dl_HHXPWb62CGgebfXncP2F73c_tsdwPtvyiYOCfNrgLVBRV6rWY2PaPd6lGoTzw0k8ndA1B-mnfbLzQe7OzereOxVsf_vMd5yUKjG7DIYJ4yg-sRS8kcHO2H_KwF5HkF9h7KJqJUTBg655hnnjEx0Mnb-hSJWKKvGppQ8VyA8w"
            />
            <div className="absolute bottom-1 left-1 bg-surface-container-lowest/80 backdrop-blur-md px-1.5 py-0.5 rounded-full font-label-sm text-label-sm text-on-surface text-[10px] font-semibold">
              9:15 AM
            </div>
          </div>

          <div className="relative col-span-1 h-28 rounded-lg overflow-hidden group shadow-sm">
            <img
              alt="Sunset walk meadow"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3VX9BAgT_qxulL9oKNXk9irpW-KPc8X1n-_bB9zbBplHBnHwwjrk7QU_ZPJRhwgWIT6FjV_ameZAvu9HWRBq_ZPzYM4hQog9Iqk-g9AKoVuYTPEvBu3rUlXYKZfeJDUMafThJ61QLu1Uv1uB3pidDVm8qxzlF_QA8acFWl8p3XO4-VnAWsXi4dz31oZmUi6-8lJkIqRXNLK6L9DE4ZguyB0_NyUugO3HExYw0ub8"
            />
            <div className="absolute bottom-1 left-1 bg-surface-container-lowest/80 backdrop-blur-md px-1.5 py-0.5 rounded-full font-label-sm text-label-sm text-on-surface text-[10px] font-semibold">
              Sunset walk
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Button with Glow */}
      <div className="pt-space-xs pb-space-sm flex flex-col items-center space-y-space-xs">
        <button
          type="button"
          onClick={handleSaveVibe}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary text-white font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-[0_12px_32px_-8px_rgba(244,114,182,0.45)] hover:opacity-95 active:scale-[0.98] transition-all"
        >
          <MaterialIcon name="favorite" fill size={20} />
          <span>Save Today's Vibe 💖</span>
        </button>
        <p className="font-body-sm text-body-sm text-tertiary text-center flex items-center gap-1">
          <MaterialIcon name="lock" size={14} />
          Encrypted in your personal wellness constellation
        </p>
      </div>
    </div>
  );
};

export default DailyVibePage;

