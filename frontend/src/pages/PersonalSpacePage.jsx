import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialIcon from '../components/MaterialIcon';
import { useVibe } from '../context/VibeContext';
import api from '../services/api';

export const PersonalSpacePage = () => {
  const navigate = useNavigate();
  const { user, preferences, setPreferences, showToast, setIsAuthenticated } = useVibe();

  const [isPlayingPlaylist, setIsPlayingPlaylist] = useState(false);

  const toggleReminder = async () => {
    const nextVal = !preferences.reminders;
    setPreferences((prev) => ({ ...prev, reminders: nextVal }));

    try {
      await api.preferences.update({ reminders: nextVal });
    } catch (err) {
      console.warn('API update preferences note:', err.message);
    }

    showToast(
      nextVal ? 'Gentle Reminders Active 🔔' : 'Reminders Silenced 🌙',
      nextVal ? '9:00 PM Bedtime Vibe scheduled.' : 'You can enable them anytime.'
    );
  };

  const handlePlaylistToggle = () => {
    setIsPlayingPlaylist(!isPlayingPlaylist);
    showToast(
      isPlayingPlaylist ? 'Safe Space paused ⏸️' : 'Playing Safe Space Playlist 🎵',
      isPlayingPlaylist ? 'Silence is golden.' : 'Dreamy Lo-fi & Soft Piano filling your room.'
    );
  };

  const handleExportPDF = () => {
    showToast('Exporting Journal 📄', 'Packaging your thoughts into a soft pastel PDF...');
  };

  const handleSignOut = () => {
    api.auth.logout();
    setIsAuthenticated(false);
    showToast('See you soon, love 💕', 'Rest easy and come back whenever you need peace.');
    navigate('/login');
  };

  return (
    <div className="flex flex-col w-full px-margin-mobile pb-space-xl relative overflow-hidden">
      {/* Profile Hero Glass Section */}
      <div className="relative w-full rounded-lg bg-surface-container-lowest/80 backdrop-blur-xl p-space-lg shadow-lg flex flex-col items-center text-center mt-space-sm mb-space-lg border border-white/60">
        {/* Top Sparkle Accents */}
        <div className="w-full flex justify-between items-center text-tertiary">
          <MaterialIcon name="stars" fill size={18} className="opacity-60" />
          <span className="inline-flex items-center gap-1 bg-surface-container-high/80 text-on-surface-variant font-label-sm text-label-sm px-3 py-1 rounded-full shadow-sm">
            <MaterialIcon name="favorite" fill className="text-primary" size={14} />
            Synced Just Now
          </span>
          <MaterialIcon name="hotel_class" size={18} className="opacity-60" />
        </div>

        {/* Circular Avatar with Soft Halo Glow */}
        <div className="relative my-space-md flex items-center justify-center">
          <div className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-primary-fixed via-secondary-fixed to-primary-container animate-pulse blur-md opacity-70"></div>
          <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-md p-1 bg-surface-container-lowest ring-2 ring-primary-container/30">
            <img
              alt="Mia Sterling"
              className="w-full h-full object-cover rounded-full"
              src={user.avatar}
            />
          </div>
          {/* Edit Profile Micro Pill */}
          <button
            type="button"
            aria-label="Edit Profile photo"
            onClick={() => showToast('Magic Avatar Glow ✨', 'Your aura is shining beautifully!')}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-md active:scale-95 transition-transform hover:brightness-110"
          >
            <MaterialIcon name="magic_button" size={16} />
          </button>
        </div>

        {/* Identity & Badges */}
        <div className="flex items-center gap-space-xs justify-center">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-semibold tracking-tight">
            {user.name}
          </h2>
          <MaterialIcon name="verified" fill className="text-primary" size={20} />
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
          {user.handle}
        </p>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-space-xs mt-space-sm">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md shadow-sm font-semibold">
            <MaterialIcon name="spa" size={15} />
            VibeCheck Plus 🌸
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md">
            <MaterialIcon name="cloud_download" className="text-tertiary" size={15} />
            Member for {user.memberDays} cozy days
          </span>
        </div>
      </div>

      {/* Stats Summary Row (3 Rounded Glass Cards) */}
      <div className="grid grid-cols-3 gap-gutter-mobile mb-space-lg">
        {/* Stat 1 */}
        <div className="flex flex-col items-center justify-center p-space-sm rounded-lg bg-surface-container-lowest/85 backdrop-blur-md shadow-sm text-center border border-surface-container-high/40">
          <div className="w-8 h-8 rounded-full bg-primary-fixed/60 text-primary flex items-center justify-center mb-1">
            <MaterialIcon name="edit_note" size={18} />
          </div>
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
            {user.entriesCount}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight mt-0.5">
            Entries Logged
          </span>
        </div>

        {/* Stat 2 */}
        <div className="flex flex-col items-center justify-center p-space-sm rounded-lg bg-surface-container-lowest/85 backdrop-blur-md shadow-sm text-center border border-surface-container-high/40">
          <div className="w-8 h-8 rounded-full bg-secondary-fixed/70 text-secondary flex items-center justify-center mb-1">
            <MaterialIcon name="auto_stories" size={18} />
          </div>
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
            {user.affirmationsCount}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight mt-0.5">
            Affirmations Saved
          </span>
        </div>

        {/* Stat 3 */}
        <div className="flex flex-col items-center justify-center p-space-sm rounded-lg bg-surface-container-lowest/85 backdrop-blur-md shadow-sm text-center border border-surface-container-high/40">
          <div className="w-8 h-8 rounded-full bg-tertiary-fixed/60 text-tertiary flex items-center justify-center mb-1">
            <MaterialIcon name="self_improvement" size={18} />
          </div>
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
            {user.sessionsCount}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight mt-0.5">
            Guided Sessions
          </span>
        </div>
      </div>

      {/* Personal Vibe Aura Card */}
      <div className="relative w-full rounded-lg overflow-hidden p-space-lg mb-space-lg bg-gradient-to-br from-primary-fixed via-secondary-fixed-dim/40 to-primary-container text-on-primary-fixed shadow-md border border-white/50">
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-surface-container-lowest/40 blur-xl pointer-events-none"></div>
        <div className="absolute left-1/3 bottom-0 w-28 h-28 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none"></div>

        <div className="relative flex flex-col z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-surface-container-lowest/60 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
              <MaterialIcon name="grain" className="text-primary" size={16} />
              <span className="font-label-sm text-label-sm text-on-primary-fixed font-bold tracking-wider uppercase">
                Weekly Aura Status
              </span>
            </div>
            <MaterialIcon name="magic_exchange" className="text-primary-container" size={24} />
          </div>

          <div className="mt-space-md">
            <p className="font-headline-lg-mobile text-headline-lg-mobile font-bold tracking-tight text-on-primary-fixed">
              Rose Quartz &amp; Starlight ✨
            </p>
            <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full bg-primary/10 backdrop-blur-sm">
              <MaterialIcon name="stars" fill className="text-primary" size={14} />
              <span className="font-label-md text-label-md font-semibold text-primary">
                The Gentle Dreamer Archetype
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm leading-relaxed">
              Your heart energy resonates with grounded compassion, quiet intuition, and soft artistic flow this week. You feel calmest under low, warm lights.
            </p>
          </div>

          {/* Energy Frequency Bar */}
          <div className="mt-space-md pt-space-sm flex flex-col gap-1.5">
            <div className="flex justify-between items-center font-label-sm text-label-sm text-on-primary-fixed">
              <span>Emotional Serenity</span>
              <span className="font-bold">94%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-surface-container-lowest/50 overflow-hidden p-0.5">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary w-[94%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Wellness Toolkit Quick Toggles & Favorites Section */}
      <div className="flex flex-col mb-space-lg">
        <div className="flex items-center justify-between mb-space-sm px-1">
          <div className="flex items-center gap-1.5">
            <MaterialIcon name="healing" className="text-primary" size={20} />
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Wellness Toolkit
            </h3>
          </div>
          <span className="font-label-sm text-label-sm text-primary font-bold">Personalized</span>
        </div>

        {/* Favorite 1: Safe Space Playlist */}
        <div className="rounded-lg bg-surface-container-lowest/90 backdrop-blur-md p-space-md shadow-sm mb-space-sm flex items-center justify-between border border-surface-container-high/40">
          <div className="flex items-center gap-space-md min-w-0">
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 relative shadow-sm">
              <img
                alt="Safe Space Playlist"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWUG7emtGgQNee-yCckw2ZagsWgl0ExO1Kvh-QpDv7Y-teSAhbE49MPa2IwUeQpKQ9TQBmmE51yDYbbAUiJrOV_diAEln2tIO3udtzt1540voq4DfXLnawgzKE2o0senSPyGIrtTB-Yzouokb1jfjrktLrp3_GKc-d0w90yi_Gnf3nfv3rIN1pyBiZfww_P4rBjIcJEDhND5U_mSwZjQMuPIWf43MKOwfuZMQ92YY"
              />
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <MaterialIcon name="music_note" className="text-surface" size={20} />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-label-lg text-label-lg text-on-surface font-bold truncate">
                  My Safe Space Playlist
                </span>
                <MaterialIcon name="favorite" fill className="text-primary" size={16} />
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Dreamy Lo-fi &amp; Soft Piano
              </p>
              <span className="font-label-sm text-label-sm text-tertiary mt-0.5">
                48 tracks • 2h 45m
              </span>
            </div>
          </div>
          <button
            type="button"
            aria-label="Play Safe Space Playlist"
            onClick={handlePlaylistToggle}
            className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shadow-sm active:scale-95 transition-all hover:bg-primary hover:text-on-primary"
          >
            <MaterialIcon
              name={isPlayingPlaylist ? 'pause' : 'play_arrow'}
              fill
              size={22}
            />
          </button>
        </div>

        {/* Favorite 2: Saved Journal Prompts */}
        <div
          onClick={() => showToast('Journal Prompts ✍️', '5 reflection prompts ready for tonight.')}
          className="rounded-lg bg-surface-container-lowest/90 backdrop-blur-md p-space-md shadow-sm mb-space-sm flex items-center justify-between cursor-pointer border border-surface-container-high/40 hover:bg-surface-container-low/50 transition-colors"
        >
          <div className="flex items-center gap-space-md min-w-0">
            <div className="w-12 h-12 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center flex-shrink-0 shadow-sm">
              <MaterialIcon name="stylus_note" size={24} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-lg text-label-lg text-on-surface font-bold truncate">
                Saved Journal Prompts
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                5 curated bedtime reflection sparks
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-xs">
            <span className="px-2.5 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed font-label-sm text-label-sm font-bold">
              5 ready
            </span>
            <MaterialIcon name="chevron_right" className="text-outline-variant" size={20} />
          </div>
        </div>

        {/* Favorite 3: Gratitude Memories Gallery */}
        <div
          onClick={() => showToast('Gratitude Gallery 🖼️', 'Browsing 30 joyful photo moments.')}
          className="rounded-lg bg-surface-container-lowest/90 backdrop-blur-md p-space-md shadow-sm flex flex-col gap-space-sm cursor-pointer border border-surface-container-high/40 hover:bg-surface-container-low/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-12 h-12 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center flex-shrink-0 shadow-sm">
                <MaterialIcon name="photo_library" size={24} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-lg text-label-lg text-on-surface font-bold truncate">
                  Gratitude Memories Gallery
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Moments that sparked pure joy
                </p>
              </div>
            </div>
            <MaterialIcon name="chevron_right" className="text-outline-variant" size={20} />
          </div>

          {/* Preview Image Thumbnails */}
          <div className="grid grid-cols-3 gap-gutter-mobile pt-space-xs">
            <div className="h-20 rounded-md overflow-hidden relative shadow-sm">
              <img
                alt="Journal and tea"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqwdBycQ5k7_SRHOTJOMQ8Es76-tZnYW5rCUkdlXtkili0SINk5hUPbjFIvlo2BurRN7aL_BVvd3kQkYhflD968g1hmCQDR1hoRJS-HplHPyjHSheCGTcEBSleCw1088f765YZWxRCGa3RnRjCbPyIWIey5vgw6iTcryMxFchHnzVj1R0IePgj3FOuLo0X95fpGdd5RM_vYrtcSPgmLL1BVqmH5kzGDGbhyQO4EMw"
              />
            </div>
            <div className="h-20 rounded-md overflow-hidden relative shadow-sm">
              <img
                alt="Sunset ocean"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6Z4o1diax7ebh4h05pzQBMS8bEI1LhveOhLF7MIXEt-FogwHk6ggBbV1M7ICykF-YtJTd4K0uOPXHB02Ork5EEskB_r8vIObcyF7itnJtHV-QocT528Q2wHI6WvyuJG65TFWEEtDZiDm-4rPawgCjrhABAU4T0L77kj3FG4NzsDbLPFdnLJGQX7y1SM4haq74P6e7J3g5DEP10UYZeRSyNHyuV6iPy9KMvWBIV2g"
              />
            </div>
            <div className="h-20 rounded-md overflow-hidden relative shadow-sm flex items-center justify-center bg-tertiary-fixed text-on-tertiary-fixed">
              <div className="flex flex-col items-center">
                <span className="font-label-lg text-label-lg font-bold">+28</span>
                <span className="font-label-sm text-label-sm">more</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings & Preferences Section */}
      <div className="flex flex-col mb-space-lg">
        <div className="flex items-center gap-1.5 mb-space-sm px-1">
          <MaterialIcon name="tune" className="text-secondary" size={20} />
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Preferences &amp; Space Settings
          </h3>
        </div>
        <div className="rounded-lg bg-surface-container-lowest/90 backdrop-blur-md shadow-sm overflow-hidden flex flex-col border border-surface-container-high/40">
          {/* Setting 1: Gentle Reminders (Toggle Switch) */}
          <div className="p-space-md flex items-center justify-between border-b border-surface-container/60">
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
                <MaterialIcon name="notifications_active" size={20} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                  Gentle Daily Reminders
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                  9:00 PM Bedtime Vibe 🔔
                </span>
              </div>
            </div>

            {/* Custom Interactive Pill Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={preferences.reminders}
              onClick={toggleReminder}
              className={`w-12 h-7 rounded-full p-0.5 flex items-center transition-colors focus:outline-none shadow-inner ${
                preferences.reminders ? 'bg-primary-container' : 'bg-surface-container-high'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center transition-transform ${
                  preferences.reminders ? 'translate-x-5' : 'translate-x-0'
                }`}
              >
                <MaterialIcon
                  name="favorite"
                  fill
                  className={preferences.reminders ? 'text-primary' : 'text-outline-variant'}
                  size={13}
                />
              </div>
            </button>
          </div>

          {/* Setting 2: App Appearance */}
          <div className="p-space-md flex items-center justify-between bg-surface-container-low/40 border-b border-surface-container/60">
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary flex-shrink-0">
                <MaterialIcon name="palette" size={20} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                  App Appearance
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Theme aesthetic</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container px-3 py-1 rounded-full text-on-surface shadow-xs">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-primary-container to-secondary-container"></span>
              <span className="font-label-sm text-label-sm font-semibold truncate">Cotton Candy Dream</span>
              <MaterialIcon name="unfold_more" className="text-outline-variant" size={16} />
            </div>
          </div>

          {/* Setting 3: Passcode & Biometrics */}
          <div
            onClick={() => showToast('Biometrics Active 🔒', 'Protected by Face ID.')}
            className="p-space-md flex items-center justify-between border-b border-surface-container/60 cursor-pointer hover:bg-surface-container-low/30 transition-colors"
          >
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-tertiary flex-shrink-0">
                <MaterialIcon name="lock" size={20} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                  Passcode &amp; Biometrics
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Protecting your sacred notes
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-primary font-label-md text-label-md font-semibold">
              <span>Face ID enabled 🔒</span>
              <MaterialIcon name="chevron_right" size={18} />
            </div>
          </div>

          {/* Setting 4: Export Journal to PDF */}
          <button
            type="button"
            onClick={handleExportPDF}
            className="p-space-md flex items-center justify-between text-left hover:bg-surface-container-low/30 active:bg-surface-container-low transition-colors border-b border-surface-container/60"
          >
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant flex-shrink-0">
                <MaterialIcon name="download" size={20} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                  Export Journal to PDF
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Archived entries, mood charts &amp; letters
                </span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
              <MaterialIcon name="file_download" size={18} />
            </div>
          </button>

          {/* Setting 5: Support & Cozy Community */}
          <div
            onClick={() => showToast('Community Sanctum 🌸', 'Connecting to the gentle discord community.')}
            className="p-space-md flex items-center justify-between text-left bg-surface-container-low/30 hover:bg-surface-container-low/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
                <MaterialIcon name="diversity_1" size={20} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                  Support &amp; Cozy Community
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Connect with gentle kindred spirits
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-primary">
              <span className="font-label-sm text-label-sm font-bold">Visit Club</span>
              <MaterialIcon name="arrow_outward" size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out & Account Management Text Links */}
      <div className="flex flex-col items-center justify-center gap-space-sm pt-space-xs text-center">
        <button
          type="button"
          onClick={handleSignOut}
          className="font-label-lg text-label-lg text-primary hover:text-surface-tint active:scale-95 transition-all flex items-center gap-1.5 py-1 font-bold"
        >
          <MaterialIcon name="logout" size={18} />
          Sign Out of VibeCheck
        </button>
        <div className="flex items-center gap-space-sm text-outline font-body-sm text-body-sm">
          <span className="hover:text-on-surface transition-colors cursor-pointer">
            Privacy Sanctum
          </span>
          <span>•</span>
          <span className="hover:text-on-surface transition-colors cursor-pointer">
            Account Terms
          </span>
          <span>•</span>
          <span className="text-tertiary font-semibold">v3.4.2 Cozy Release</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalSpacePage;

