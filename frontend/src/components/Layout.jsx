import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from './AppHeader';
import BottomNav from './BottomNav';
import AmbientBlooms from './AmbientBlooms';
import Toast from './Toast';

export const Layout = () => {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/':
        return 'Home';
      case '/daily-vibe':
        return 'Daily Vibe';
      case '/insights':
        return 'Insights';
      case '/space':
        return 'Space';
      default:
        return 'VibeCheck';
    }
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-surface flex justify-center items-center py-4 px-2 sm:px-4">
        <AmbientBlooms variant="auth" />
        <div className="w-full max-w-md min-h-screen flex flex-col justify-between relative shadow-xl rounded-3xl overflow-hidden bg-transparent border border-surface-container-high/30">
          <Outlet />
          <Toast />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-high/20 flex justify-center">
      <AmbientBlooms />
      <div className="w-full max-w-md min-h-screen flex flex-col relative bg-surface shadow-2xl border-x border-surface-container/40">
        <AppHeader title={getPageTitle(location.pathname)} />
        <main className="flex-1 flex flex-col relative w-full pt-20 pb-24 bg-transparent overflow-x-hidden">
          <Outlet />
        </main>
        <BottomNav />
        <Toast />
      </div>
    </div>
  );
};

export default Layout;

