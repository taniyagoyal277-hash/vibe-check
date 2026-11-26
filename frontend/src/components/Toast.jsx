import React from 'react';
import MaterialIcon from './MaterialIcon';
import { useVibe } from '../context/VibeContext';

export const Toast = () => {
  const { toast } = useVibe();

  if (!toast.show) return null;

  return (
    <div className="fixed bottom-24 max-w-sm left-1/2 -translate-x-1/2 w-[90%] z-50 pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-on-surface/95 text-inverse-on-surface shadow-2xl backdrop-blur-xl border border-surface-container-high/30">
        <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0 shadow-md">
          {typeof toast.icon === 'string' && toast.icon.length > 2 ? (
            <MaterialIcon name={toast.icon} fill size={18} />
          ) : (
            <span className="text-base">{toast.icon || '✨'}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-label-lg text-label-lg font-bold leading-tight text-white">
            {toast.title}
          </p>
          <p className="font-body-sm text-body-sm text-white/90 truncate mt-0.5">
            {toast.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Toast;

