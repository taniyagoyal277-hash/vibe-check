import React from 'react';
import { NavLink } from 'react-router-dom';
import MaterialIcon from './MaterialIcon';

export const BottomNav = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: 'favorite' },
    { path: '/daily-vibe', label: 'Vibe Log', icon: 'sentiment_satisfied' },
    { path: '/insights', label: 'Insights', icon: 'insights' },
    { path: '/space', label: 'Space', icon: 'self_improvement' },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 z-50 pb-safe bg-surface/85 backdrop-blur-xl border-t border-surface-container-high/40 shadow-[0_-4px_20px_rgba(244,114,182,0.12)]">
      <div className="h-16 px-gutter flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-space-xs min-w-[56px] min-h-[44px] transition-all py-1 px-2 rounded-2xl ${
                isActive
                  ? 'text-primary font-bold scale-105'
                  : 'text-on-surface-variant hover:text-primary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <MaterialIcon
                  name={item.icon}
                  fill={isActive}
                  size={24}
                  className="transition-transform duration-200"
                />
                <span className="font-label-sm text-label-sm tracking-wide">
                  {item.label}
                </span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-primary -mt-0.5 animate-pulse" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;

