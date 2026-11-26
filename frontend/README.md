# VibeCheck — Dreamy Pastel Wellness Companion Frontend

Converted from the Google Stitch design specification into a modern, responsive React + Tailwind CSS single-page application.

## 🌸 Overview

VibeCheck is an ethereal, pastel wellness companion featuring dreamy glassmorphism, soft tactile minimalism, and mindful self-reflection tools.

## 🎨 Design System Preservation

- **Color Palette**: Exact hex color tokens defined in `DESIGN.md` (`primary: #a43073`, `primary-container: #f472b6`, `secondary: #8127cf`, `surface: #fdf9f3`, etc.)
- **Typography**: Paired `Epilogue` (warm geometric headings) with `Plus Jakarta Sans` (clean body text and ergonomic mobile labels)
- **Glassmorphism**: Translucent surfaces with soft blur (`backdrop-blur-xl`), halo outlines, and ambient radial glow drops
- **Icons**: Google Material Symbols Outlined with support for filled/duotone accents and custom SVGs

## 📂 Project Structure

```
frontend/
├── index.html                   # HTML template with Google Fonts & Material Symbols
├── package.json                 # React 18, React Router v6, Tailwind CSS, Vite
├── vite.config.js               # Vite config
├── tailwind.config.js           # Extended theme with VibeCheck design tokens
├── postcss.config.js            # PostCSS configuration
├── src/
│   ├── main.jsx                 # Application entry point
│   ├── App.jsx                  # React Router configuration
│   ├── index.css                # Global base styles & font definitions
│   ├── context/
│   │   └── VibeContext.jsx      # Global state for mood, streak, affirmations, preferences
│   ├── components/
│   │   ├── AmbientBlooms.jsx    # Ethereal floating background glows
│   │   ├── AppHeader.jsx        # Mobile status bar & top navigation header
│   │   ├── BottomNav.jsx        # Fixed bottom navigation bar with active states
│   │   ├── Layout.jsx           # Responsive centered shell with background aura
│   │   ├── MaterialIcon.jsx     # Google Material Symbols helper component
│   │   └── Toast.jsx            # Dynamic toast feedback system
│   └── pages/
│       ├── AuthPage.jsx         # Login & Sign Up with switcher, 4-bar strength indicator & modal
│       ├── HomePage.jsx         # Home dashboard: Today's Vibe, Bento Sanctuary, Weekly Rhythm
│       ├── DailyVibePage.jsx    # Step 1 Check-In: Interactive mood orb, sliders, micro-tags
│       ├── InsightsPage.jsx     # Analytics: Dominant Vibe, SVG wave chart, 30-day matrix
│       └── PersonalSpacePage.jsx# Profile, aura status, wellness toolkit & preferences
```

## 🚀 Routes

| Route | Page | Description |
|---|---|---|
| `/` | `HomePage` | Home dashboard with mood logging, daily intentions & mindful tools |
| `/login` | `AuthPage` | Log In form with switcher to Sign Up & forgot password modal |
| `/signup` | `AuthPage` | Sign Up form with password strength indicator & terms |
| `/daily-vibe` | `DailyVibePage` | Daily check-in step with glowing aura orb & intensity slider |
| `/insights` | `InsightsPage` | Mood insights, SVG energy wave chart & 30-day vibe matrix |
| `/space` | `PersonalSpacePage` | Personal space, wellness toolkit, preferences & sign out |

## 🛠️ Installation and Run Commands

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

