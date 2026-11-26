import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { VibeProvider } from './context/VibeContext';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import DailyVibePage from './pages/DailyVibePage';
import InsightsPage from './pages/InsightsPage';
import PersonalSpacePage from './pages/PersonalSpacePage';

export function App() {
  return (
    <VibeProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<AuthPage initialMode="login" />} />
          <Route path="/signup" element={<AuthPage initialMode="signup" />} />

          {/* Main App with shared Layout (Header, AmbientBlooms, BottomNav, Toast) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="daily-vibe" element={<DailyVibePage />} />
            <Route path="insights" element={<InsightsPage />} />
            <Route path="space" element={<PersonalSpacePage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </VibeProvider>
  );
}

export default App;

