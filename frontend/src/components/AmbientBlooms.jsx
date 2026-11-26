import React from 'react';

export const AmbientBlooms = ({ variant = 'default' }) => {
  if (variant === 'auth') {
    return (
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-primary-fixed/40 blur-3xl"></div>
        <div className="absolute top-1/4 -right-24 w-88 h-88 rounded-full bg-secondary-fixed/45 blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-surface-container-high/60 blur-3xl"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div className="absolute -top-12 -left-16 w-64 h-64 rounded-full bg-primary-fixed/40 blur-3xl pointer-events-none"></div>
      <div className="absolute top-44 -right-16 w-64 h-64 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/4 w-72 h-72 rounded-full bg-tertiary-fixed/25 blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default AmbientBlooms;

