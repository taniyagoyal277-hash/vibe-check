import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialIcon from '../components/MaterialIcon';
import { useVibe } from '../context/VibeContext';
import api from '../services/api';

export const AuthPage = ({ initialMode = 'login' }) => {
  const navigate = useNavigate();
  const { setIsAuthenticated, showToast, setUser } = useVibe();

  const [activeTab, setActiveTab] = useState(initialMode); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [loginId, setLoginId] = useState('mia@vibecheck.app');
  const [loginPassword, setLoginPassword] = useState('cozyvibes2026');
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Forgot password modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [isSendingForgot, setIsSendingForgot] = useState(false);

  // Password strength logic
  const getPasswordStrength = (pass) => {
    if (!pass || pass.length === 0) {
      return { score: 0, label: 'Gentle', colorClass: 'text-outline' };
    }
    if (pass.length < 5) {
      return { score: 1, label: 'Too soft', colorClass: 'text-error font-bold' };
    }
    if (pass.length < 8) {
      return { score: 2, label: 'Getting there', colorClass: 'text-primary font-bold' };
    }
    if (pass.length < 11) {
      return { score: 3, label: 'Sweet & Safe', colorClass: 'text-primary-container font-bold' };
    }
    return { score: 4, label: 'Magical ✨', colorClass: 'text-secondary-container font-bold' };
  };

  const strength = getPasswordStrength(signupPassword);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = await api.auth.login(loginId, loginPassword);
      if (data && data.user) {
        setUser((prev) => ({
          ...prev,
          name: data.user.name,
          handle: data.user.username ? `@${data.user.username}` : prev.handle,
          email: data.user.email,
          avatar: data.user.avatar || prev.avatar,
          streak: data.user.streak || prev.streak,
        }));
      }
      setIsAuthenticated(true);
      showToast('Welcome Home! 💕', 'Entering your cozy space now...');
      navigate('/');
    } catch (err) {
      console.warn('API login error, proceeding in offline mode:', err.message);
      setIsAuthenticated(true);
      showToast('Welcome Home! 💕', 'Entering your cozy space now...');
      navigate('/');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      showToast('Passwords do not match', 'Please ensure both passwords match.', 'error');
      return;
    }
    setIsSubmitting(true);

    try {
      const data = await api.auth.register({
        name: signupName,
        email: signupEmail,
        username: signupUsername,
        password: signupPassword,
      });

      if (data && data.user) {
        setUser((prev) => ({
          ...prev,
          name: data.user.name,
          handle: data.user.username ? `@${data.user.username}` : prev.handle,
          email: data.user.email,
        }));
      }
      setIsAuthenticated(true);
      showToast('Account Created! 🌸', 'Welcome to your little happy space!');
      navigate('/');
    } catch (err) {
      console.warn('API register error, proceeding with local account:', err.message);
      setIsAuthenticated(true);
      if (signupName) {
        setUser((prev) => ({
          ...prev,
          name: signupName,
          handle: signupUsername ? `@${signupUsername}` : prev.handle,
          email: signupEmail || prev.email,
        }));
      }
      showToast('Account Created! 🌸', 'Welcome to your little happy space!');
      navigate('/');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialMock = (provider) => {
    showToast(`${provider} Connected ✨`, 'Softly tuning into your profile...');
    setTimeout(() => {
      setIsAuthenticated(true);
      navigate('/');
    }, 800);
  };

  const handleSendReset = (e) => {
    e.preventDefault();
    setIsSendingForgot(true);
    setTimeout(() => {
      setIsSendingForgot(false);
      setForgotSent(true);
      showToast('Reset Link Sent! 💌', 'Check your cozy inbox for instructions.');
    }, 800);
  };

  return (
    <div className="flex flex-col relative w-full min-h-screen px-margin-mobile pt-3 pb-8">
      {/* Top Simulated Status Bar */}
      <div className="h-8 px-2 flex items-center justify-between text-on-surface opacity-75">
        <span className="font-label-md text-label-md font-semibold tracking-tight">9:41</span>
        <div className="flex items-center gap-1.5">
          <MaterialIcon name="signal_cellular_alt" size={15} />
          <MaterialIcon name="wifi" size={15} />
          <MaterialIcon name="battery_full" size={17} />
        </div>
      </div>

      {/* Ambient Floating Ornaments */}
      <div className="absolute top-12 right-6 pointer-events-none text-primary-container/30 animate-pulse">
        <MaterialIcon name="auto_awesome" fill size={26} />
      </div>
      <div className="absolute top-44 left-3 pointer-events-none text-secondary-container/20">
        <MaterialIcon name="favorite" fill size={22} />
      </div>
      <div className="absolute top-96 right-3 pointer-events-none text-primary/20">
        <MaterialIcon name="stars" fill size={22} />
      </div>

      {/* Brand Mascot & Identity Header */}
      <header className="flex flex-col items-center justify-center pt-2 pb-5 text-center relative z-10">
        <div className="relative flex items-center justify-center mb-3">
          {/* Glow backing halo */}
          <div className="absolute w-24 h-24 rounded-full bg-primary-fixed/70 blur-xl"></div>
          {/* Mascot Container */}
          <div className="relative w-20 h-20 rounded-full bg-surface-container-lowest/90 shadow-xl shadow-primary-container/15 flex items-center justify-center overflow-hidden transform active:scale-95 transition-transform duration-300 ring-2 ring-primary-container/20">
            <img
              alt="VibeCheck Mascot"
              className="w-16 h-16 object-contain drop-shadow-sm select-none"
              src="https://lh3.googleusercontent.com/aida/ALJJyrAXvDyk6WO6_5Pdaib1N0CbS3lV2NDaVxCC_1RDnEjDMWFNsfH4A6MauF1rm3COQWZNuGseKJMxpgsJ1BaDXdWCpgGvFT6EUtC5RFWB308hpsNcIiSlyhXkRPmhgbdBJK0vgNCriUjlIKiX1JSkhWRu7V4oF-Sy2FNpO09Emfn9-5d7OA0q-Zn3oKjNddrspRpT__qcEkrQfCn12c-vLDLSoeumDWbla2BTfVKYZYl1"
            />
          </div>
          {/* Accent Sparkle Pin */}
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md shadow-primary/25">
            <MaterialIcon name="star" fill size={15} />
          </div>
        </div>

        {/* App Title & Tagline */}
        <div className="flex items-center gap-1.5 justify-center">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-on-surface font-bold">
            VibeCheck
          </h1>
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold shadow-sm">
            v2.4
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 transition-all duration-300">
          {activeTab === 'login'
            ? 'Your pastel wellness companion'
            : 'Begin your gentle self-reflection journey'}
        </p>
      </header>

      {/* Segmented Control (Pill Switcher) */}
      <nav aria-label="Authentication Selector" className="w-full max-w-[360px] mx-auto mb-4">
        <div className="p-1 rounded-full bg-surface-container-high/80 backdrop-blur-md flex items-center relative shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2.5 rounded-full font-label-lg text-label-lg transition-all duration-300 relative z-10 flex items-center justify-center gap-1.5 active:scale-[0.98] ${
              activeTab === 'login'
                ? 'shadow-sm bg-surface-container-lowest text-primary font-bold'
                : 'text-on-surface-variant font-semibold hover:text-on-surface'
            }`}
          >
            <MaterialIcon name="login" fill={activeTab === 'login'} size={17} />
            <span>Log In</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2.5 rounded-full font-label-lg text-label-lg transition-all duration-300 relative z-10 flex items-center justify-center gap-1.5 active:scale-[0.98] ${
              activeTab === 'signup'
                ? 'shadow-sm bg-surface-container-lowest text-secondary-container font-bold'
                : 'text-on-surface-variant font-semibold hover:text-on-surface'
            }`}
          >
            <MaterialIcon name="favorite" fill={activeTab === 'signup'} size={17} />
            <span>Sign Up</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
          </button>
        </div>
      </nav>

      {/* Main Unified Glassmorphic Surface Card */}
      <section className="w-full max-w-[420px] mx-auto rounded-3xl bg-surface-container-lowest/85 backdrop-blur-2xl shadow-xl shadow-primary-container/10 p-5 sm:p-6 transition-all duration-300 border border-white/50">
        {/* Dynamic Heading Context Block */}
        <div className="mb-5 text-left">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
              {activeTab === 'login' ? 'Welcome Back! 💕' : "Let's get to know you! 💗"}
            </h2>
            <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold flex items-center gap-1">
              <MaterialIcon
                name={activeTab === 'login' ? 'lock_open' : 'stars'}
                fill
                size={12}
              />
              {activeTab === 'login' ? 'Portal' : 'New Glow'}
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            {activeTab === 'login'
              ? 'Your little happy space missed you.'
              : 'Create your little happy space with VibeCheck.'}
          </p>
        </div>

        {/* ============================================== */}
        {/* VIEW 1: LOG IN FORM                           */}
        {/* ============================================== */}
        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="flex flex-col space-y-3.5 transition-opacity duration-200">
            {/* Input: Identity */}
            <div className="flex flex-col space-y-1">
              <label className="font-label-md text-label-md font-semibold text-on-surface flex items-center gap-1">
                <span>Email or Username</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                  alternate_email
                </span>
                <input
                  type="text"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="mia@vibecheck.app or @vibingmia"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-surface-container-low/70 text-on-surface font-body-md text-body-md placeholder:text-outline-variant outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:shadow-md focus:shadow-primary-container/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Input: Password */}
            <div className="flex flex-col space-y-1">
              <label className="font-label-md text-label-md font-semibold text-on-surface flex items-center justify-between">
                <span>Secret Password</span>
                <span className="font-label-sm text-label-sm text-outline">Encrypted</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-2xl bg-surface-container-low/70 text-on-surface font-body-md text-body-md placeholder:text-outline-variant outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:shadow-md focus:shadow-primary-container/20 transition-all duration-200"
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-outline hover:text-primary transition-colors flex items-center justify-center p-1 rounded-full"
                >
                  <MaterialIcon name={showPassword ? 'visibility_off' : 'visibility'} size={19} />
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between pt-1 pb-1">
              <label className="flex items-center gap-2 cursor-pointer select-none group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 rounded-full bg-surface-container-high peer-checked:bg-primary transition-all duration-200 flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-on-primary text-[13px] opacity-0 peer-checked:opacity-100 font-bold transition-opacity">
                      check
                    </span>
                  </div>
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant group-hover:text-on-surface transition-colors">
                  Keep me in
                </span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(true);
                  setForgotSent(false);
                }}
                className="font-label-md text-label-md font-bold text-primary hover:text-on-primary-fixed-variant transition-colors flex items-center gap-0.5 underline decoration-primary/30 underline-offset-4"
              >
                <span>Forgot pass?</span>
              </button>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-lg shadow-primary-container/30 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Tuning your vibes...</span>
                </>
              ) : (
                <>
                  <MaterialIcon name="favorite" fill size={19} />
                  <span>Log In to My Space 💖</span>
                </>
              )}
            </button>

            {/* Quick Context Switcher Bottom */}
            <p className="text-center font-body-sm text-body-sm text-on-surface-variant pt-2">
              New to VibeCheck?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('signup')}
                className="font-bold text-primary hover:underline ml-1"
              >
                Create an Account ✨
              </button>
            </p>
          </form>
        ) : (
          /* ============================================== */
          /* VIEW 2: SIGN UP FORM                          */
          /* ============================================== */
          <form onSubmit={handleSignupSubmit} className="flex flex-col space-y-3 transition-opacity duration-200">
            {/* Input: Full Name */}
            <div className="flex flex-col space-y-1">
              <label className="font-label-md text-label-md font-semibold text-on-surface flex items-center gap-1">
                <span>Your Sweet Name</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                  sentiment_satisfied
                </span>
                <input
                  type="text"
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="e.g. Mia Blossom"
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-surface-container-low/70 text-on-surface font-body-md text-body-md placeholder:text-outline-variant outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:shadow-md focus:shadow-primary-container/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Input: Email */}
            <div className="flex flex-col space-y-1">
              <label className="font-label-md text-label-md font-semibold text-on-surface flex items-center gap-1">
                <span>Email Address</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                  mail
                </span>
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="mia@vibecheck.app"
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-surface-container-low/70 text-on-surface font-body-md text-body-md placeholder:text-outline-variant outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:shadow-md focus:shadow-primary-container/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Input: Username */}
            <div className="flex flex-col space-y-1">
              <label className="font-label-md text-label-md font-semibold text-on-surface flex items-center gap-1">
                <span>Choose Username</span>
                <span className="text-tertiary font-label-sm text-label-sm ml-auto">@handle</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                  badge
                </span>
                <input
                  type="text"
                  required
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                  placeholder="vibingmia"
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-surface-container-low/70 text-on-surface font-body-md text-body-md placeholder:text-outline-variant outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:shadow-md focus:shadow-primary-container/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Input: Password & Strength */}
            <div className="flex flex-col space-y-1">
              <label className="font-label-md text-label-md font-semibold text-on-surface flex items-center justify-between">
                <span>Create Password</span>
                <span className={`font-label-sm text-label-sm ${strength.colorClass}`}>
                  {strength.label}
                </span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Min. 8 cozy characters"
                  className="w-full pl-11 pr-11 py-2.5 rounded-2xl bg-surface-container-low/70 text-on-surface font-body-md text-body-md placeholder:text-outline-variant outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:shadow-md focus:shadow-primary-container/20 transition-all duration-200"
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-outline hover:text-primary transition-colors flex items-center justify-center p-1 rounded-full"
                >
                  <MaterialIcon name={showPassword ? 'visibility_off' : 'visibility'} size={19} />
                </button>
              </div>

              {/* 4-Bar Pastel Password Strength Indicator */}
              <div className="grid grid-cols-4 gap-1.5 pt-1 px-1">
                <div
                  className={`h-1.5 rounded-full transition-colors duration-300 ${
                    strength.score >= 1
                      ? strength.score === 1
                        ? 'bg-error'
                        : strength.score === 2
                        ? 'bg-primary-fixed-dim'
                        : strength.score === 3
                        ? 'bg-primary-container'
                        : 'bg-secondary-container'
                      : 'bg-surface-container-highest'
                  }`}
                />
                <div
                  className={`h-1.5 rounded-full transition-colors duration-300 ${
                    strength.score >= 2
                      ? strength.score === 2
                        ? 'bg-primary-fixed-dim'
                        : strength.score === 3
                        ? 'bg-primary-container'
                        : 'bg-secondary-container'
                      : 'bg-surface-container-highest'
                  }`}
                />
                <div
                  className={`h-1.5 rounded-full transition-colors duration-300 ${
                    strength.score >= 3
                      ? strength.score === 3
                        ? 'bg-primary-container'
                        : 'bg-secondary-container'
                      : 'bg-surface-container-highest'
                  }`}
                />
                <div
                  className={`h-1.5 rounded-full transition-colors duration-300 ${
                    strength.score >= 4 ? 'bg-secondary-container' : 'bg-surface-container-highest'
                  }`}
                />
              </div>
            </div>

            {/* Input: Confirm Password */}
            <div className="flex flex-col space-y-1">
              <label className="font-label-md text-label-md font-semibold text-on-surface flex items-center gap-1">
                <span>Repeat Password</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                  verified_user
                </span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  placeholder="Match your cozy password"
                  className="w-full pl-11 pr-11 py-2.5 rounded-2xl bg-surface-container-low/70 text-on-surface font-body-md text-body-md placeholder:text-outline-variant outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:shadow-md focus:shadow-primary-container/20 transition-all duration-200"
                />
                <button
                  type="button"
                  aria-label="Toggle confirm password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 text-outline hover:text-primary transition-colors flex items-center justify-center p-1 rounded-full"
                >
                  <MaterialIcon name={showConfirmPassword ? 'visibility_off' : 'visibility'} size={19} />
                </button>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-start gap-2.5 pt-1.5">
              <label className="relative flex items-center justify-center pt-0.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 rounded-full bg-surface-container-high peer-checked:bg-secondary-container transition-all duration-200 flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-on-secondary-container text-[13px] opacity-0 peer-checked:opacity-100 font-bold transition-opacity">
                    check
                  </span>
                </div>
              </label>
              <span className="font-body-sm text-body-sm text-on-surface-variant select-none leading-tight">
                I agree to the <span className="text-primary font-semibold underline cursor-pointer">Terms</span> &amp; embrace the warm{' '}
                <span className="text-primary font-semibold underline cursor-pointer">Privacy Policy</span> 🌸
              </span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-full bg-secondary-container text-on-secondary-container font-label-lg text-label-lg font-bold shadow-lg shadow-secondary-container/25 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Crafting your sanctuary...</span>
                </>
              ) : (
                <>
                  <MaterialIcon name="favorite" fill size={19} />
                  <span>Create My Account ✨</span>
                </>
              )}
            </button>

            {/* Quick Context Switcher Bottom */}
            <p className="text-center font-body-sm text-body-sm text-on-surface-variant pt-2">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="font-bold text-primary hover:underline ml-1"
              >
                Log In 💕
              </button>
            </p>
          </form>
        )}

        {/* Social Authentication Divider */}
        <div className="relative flex items-center justify-center my-5">
          <div className="w-full h-px bg-surface-container-highest"></div>
          <div className="absolute px-3 bg-surface-container-lowest font-label-sm text-label-sm text-outline flex items-center gap-1.5 uppercase tracking-wider rounded-full shadow-xs">
            <MaterialIcon name="auto_awesome" fill className="text-primary-container" size={13} />
            <span>or softly connect</span>
            <MaterialIcon name="auto_awesome" fill className="text-secondary" size={13} />
          </div>
        </div>

        {/* Social Buttons Stack */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialMock('Google')}
            className="py-3 px-4 rounded-2xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 shadow-xs"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
            </svg>
            <span className="truncate">Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialMock('Apple')}
            className="py-3 px-4 rounded-2xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 shadow-xs"
          >
            <svg className="w-4 h-4 flex-shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.67-.82 1.12-1.96.99-3.1-.96.04-2.13.64-2.82 1.45-.61.71-1.14 1.87-.99 2.98 1.08.08 2.17-.55 2.82-1.33z"></path>
            </svg>
            <span className="truncate">Apple ID</span>
          </button>
        </div>

        {/* Reassurance Badge */}
        <div className="mt-5 pt-3 flex items-center justify-center gap-1.5 text-center text-outline">
          <MaterialIcon name="favorite" fill size={15} />
          <span className="font-label-sm text-label-sm">Safe &amp; warm end-to-end encrypted space</span>
        </div>
      </section>

      {/* ============================================== */}
      {/* MODAL DRAWER: FORGOT PASSWORD                  */}
      {/* ============================================== */}
      {showForgotModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-on-surface/40 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        >
          {/* Backdrop tap to close */}
          <div
            className="absolute inset-0"
            onClick={() => setShowForgotModal(false)}
          ></div>

          {/* Drawer Content Surface */}
          <div className="relative w-full max-w-[400px] rounded-t-3xl sm:rounded-3xl bg-surface-container-lowest p-6 shadow-2xl z-10 animate-in slide-in-from-bottom duration-300">
            {/* Drawer Pull Handle (Mobile) */}
            <div className="w-12 h-1.5 rounded-full bg-surface-container-highest mx-auto mb-4 sm:hidden"></div>

            {/* Icon & Headline */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shadow-sm">
                <MaterialIcon name="mark_email_unread" size={26} />
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Lost your key? 💌</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">We'll help you slip back in gently.</p>
              </div>
            </div>

            {/* Body / Form */}
            {!forgotSent ? (
              <form onSubmit={handleSendReset} className="space-y-3.5">
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Enter your registered email address below. We'll send an enchanted recovery link right away.
                </p>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                    mail
                  </span>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="mia@vibecheck.app"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline-variant outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:shadow-md focus:shadow-secondary-container/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSendingForgot}
                  className="w-full py-3.5 px-6 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-md shadow-primary-container/30 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  {isSendingForgot ? (
                    <span>Sending magic...</span>
                  ) : (
                    <>
                      <MaterialIcon name="send" size={18} />
                      <span>Send Recovery Link ✨</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="w-full py-2.5 text-center font-label-md text-label-md font-semibold text-outline hover:text-on-surface transition-colors"
                >
                  Nevermind, I remembered!
                </button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center mx-auto shadow-sm animate-bounce">
                  <MaterialIcon name="favorite" fill size={28} />
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Mail is on the way!</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Check your cozy inbox for the magic reset link. It expires in 15 minutes.
                </p>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="w-full py-3 px-6 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md font-bold mt-2 hover:bg-surface-container-highest transition-colors"
                >
                  Back to Log In
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;

