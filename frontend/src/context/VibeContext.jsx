import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const VibeContext = createContext(null);

export const VibeProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('vibecheck_token')) || true;
  });

  const [user, setUser] = useState({
    name: 'Mia Sterling',
    handle: '@vibingmia',
    email: 'mia@vibecheck.app',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeLBn0mDwYnvaEagjwjqUfpEtpVFQo1c0lf8REPnTkqkVx7XThXvUL4D4_KaqQkYKkMnrfG-3vJkSlvZjbbtzziBaH4IO5auSj1hQDQCRD8rF3DYa-2wZgTZnKvMB06VLde028mWJjZcRx43yjYEcJKZrgTy4XTj_8H0LrG428K04HJ-Fe_IEXrAUaBFt9FplzJM4EVqatMnCNT0azd2l2J3l4JdyfujoSoCUqRrI',
    streak: 7,
    memberDays: 142,
    entriesCount: 74,
    affirmationsCount: 18,
    sessionsCount: 12
  });

  const [currentMood, setCurrentMood] = useState({
    vibe: 'Radiant',
    emoji: '🌸',
    statusText: '"Feeling luminous & grounded today"',
    intensity: 82,
    energy: 75,
    sleep: '7.5 hrs · Restful'
  });

  const [intentions, setIntentions] = useState([
    { id: '1', text: 'Drink warm lemon tea 🍵', completed: true, icon: 'spa', iconColor: 'text-tertiary' },
    { id: '2', text: '15 min nature walk 🍃', completed: true, icon: 'nature_people', iconColor: 'text-secondary' },
    { id: '3', text: 'No screens after 10 PM 🌙', completed: false, icon: 'bedtime', iconColor: 'text-on-surface-variant' }
  ]);

  const affirmationsList = [
    '"I am worthy of peace"',
    '"Joy finds me in quiet moments"',
    '"I am gentle with my pace"',
    '"My presence is already enough"',
    '"Softness is my quiet strength"'
  ];
  const [currentAffirmation, setCurrentAffirmation] = useState(affirmationsList[0]);

  const [toast, setToast] = useState({
    show: false,
    title: '',
    message: '',
    icon: '✨'
  });

  const [preferences, setPreferences] = useState({
    reminders: true,
    theme: 'Cotton Candy Dream',
    faceId: true
  });

  const [selectedVibeDay, setSelectedVibeDay] = useState({
    day: 25,
    label: 'Peak Joy & Energy'
  });

  const [timeframe, setTimeframe] = useState('Week');

  // Load from backend if token exists
  useEffect(() => {
    const initData = async () => {
      const token = localStorage.getItem('vibecheck_token');
      if (token) {
        try {
          const profile = await api.auth.getMe();
          if (profile) {
            setUser(prev => ({
              ...prev,
              name: profile.name,
              handle: profile.username ? `@${profile.username}` : prev.handle,
              email: profile.email,
              avatar: profile.avatar || prev.avatar,
              streak: profile.streak || prev.streak,
              memberDays: profile.memberDays || prev.memberDays
            }));
          }

          const backendTasks = await api.tasks.getAll();
          if (backendTasks && backendTasks.length > 0) {
            setIntentions(backendTasks.map(t => ({
              id: t._id,
              text: t.title,
              completed: t.completed,
              icon: t.icon || 'spa',
              iconColor: t.iconColor || 'text-primary'
            })));
          }

          const backendPrefs = await api.preferences.get();
          if (backendPrefs) {
            setPreferences({
              reminders: backendPrefs.reminders !== undefined ? backendPrefs.reminders : true,
              theme: backendPrefs.theme || 'Cotton Candy Dream',
              faceId: backendPrefs.faceId !== undefined ? backendPrefs.faceId : true
            });
          }
        } catch (err) {
          console.warn('Backend sync note:', err.message);
        }
      }
    };

    initData();
  }, [isAuthenticated]);

  const showToast = (title, message, icon = '✨') => {
    setToast({ show: true, title, message, icon });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 2800);
  };

  const toggleIntention = async (id) => {
    // Optimistic UI update
    setIntentions(prev =>
      prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item)
    );

    // Call backend API if authenticated with a real mongo id
    if (typeof id === 'string' && id.length === 24) {
      try {
        await api.tasks.toggle(id);
      } catch (err) {
        console.warn('Backend task toggle note:', err.message);
      }
    }
  };

  const addIntention = async (text) => {
    const tempId = Date.now().toString();
    const newIntention = {
      id: tempId,
      text,
      completed: false,
      icon: 'spa',
      iconColor: 'text-primary'
    };

    setIntentions(prev => [...prev, newIntention]);

    try {
      const created = await api.tasks.create({
        title: text,
        completed: false,
        icon: 'spa',
        iconColor: 'text-primary'
      });
      if (created && created._id) {
        setIntentions(prev =>
          prev.map(item => item.id === tempId ? { ...item, id: created._id } : item)
        );
      }
    } catch (err) {
      console.warn('Backend task creation note:', err.message);
    }
  };

  const shuffleAffirmation = () => {
    const next = affirmationsList[Math.floor(Math.random() * affirmationsList.length)];
    setCurrentAffirmation(next);
  };

  const setMoodByPill = (moodName) => {
    const statusMap = {
      'Radiant': { emoji: '🌸', text: '"Feeling luminous & grounded today"', intensity: 85 },
      'Calm': { emoji: '☁️', text: '"Peaceful, slow rhythms throughout the morning"', intensity: 70 },
      'Balanced': { emoji: '🌿', text: '"Centered, present, and gently moving forward"', intensity: 75 },
      'Tired': { emoji: '🌙', text: '"Resting gently, listening to internal energy"', intensity: 40 },
      'Low': { emoji: '🌧️', text: '"Holding space for softness and gentle comfort"', intensity: 30 },
      'Euphoric': { emoji: '✨', text: '"Floating on pure sunshine & bliss"', intensity: 96 },
      'Grateful': { emoji: '💖', text: '"Full of tenderness and quiet appreciation"', intensity: 88 },
      'Peaceful': { emoji: '☁️', text: '"Serene waters, unbothered rhythm"', intensity: 82 },
      'Overwhelmed': { emoji: '🫧', text: '"Lots in the air, soft breath needed"', intensity: 45 },
      'Anxious': { emoji: '🌧️', text: '"Tender nervous system, holding space"', intensity: 32 },
      'Exhausted': { emoji: '💤', text: '"Crying out for a cozy warm blanket"', intensity: 20 },
    };

    const details = statusMap[moodName] || { emoji: '🌸', text: `"${moodName} vibe today"`, intensity: 75 };
    setCurrentMood(prev => ({
      ...prev,
      vibe: moodName,
      emoji: details.emoji,
      statusText: details.text,
      intensity: details.intensity
    }));
  };

  return (
    <VibeContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        currentMood,
        setCurrentMood,
        setMoodByPill,
        intentions,
        toggleIntention,
        addIntention,
        currentAffirmation,
        shuffleAffirmation,
        toast,
        showToast,
        preferences,
        setPreferences,
        selectedVibeDay,
        setSelectedVibeDay,
        timeframe,
        setTimeframe
      }}
    >
      {children}
    </VibeContext.Provider>
  );
};

export const useVibe = () => useContext(VibeContext);
