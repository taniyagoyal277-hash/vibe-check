import React from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialIcon from './MaterialIcon';
import { useVibe } from '../context/VibeContext';

export const AppHeader = ({ title, showSparkle = true }) => {
  const navigate = useNavigate();
  const { user, showToast } = useVibe();

  const handleNotificationClick = () => {
    showToast('Cozy Whispers 🌸', 'You are all caught up on gentle nudges!');
  };

  return (
    <header className="fixed top-0 w-full max-w-md left-1/2 -translate-x-1/2 z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-surface-container-high/40 transition-all">
      {/* Mobile Top Status Bar */}
      <div className="h-6 px-5 flex items-center justify-between text-on-surface opacity-80 text-xs">
        <span className="font-semibold tracking-tight">9:41</span>
        <div className="flex items-center gap-1.5">
          <MaterialIcon name="signal_cellular_alt" size={13} />
          <MaterialIcon name="wifi" size={13} />
          <MaterialIcon name="battery_full" size={15} />
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="h-14 px-margin-mobile flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          {showSparkle && (
            <MaterialIcon name="auto_awesome" className="text-primary" size={22} />
          )}
          <h1 className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Notifications"
            onClick={handleNotificationClick}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 transition-all bg-surface-container-low/60 hover:bg-surface-container"
          >
            <MaterialIcon name="notifications" size={20} />
          </button>

          <button
            aria-label="Personal Space Profile"
            onClick={() => navigate('/space')}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center overflow-hidden ring-2 ring-primary-container/40 active:scale-95 transition-all"
          >
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <MaterialIcon name="person" className="text-on-primary" size={18} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

