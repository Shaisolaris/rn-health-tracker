# rn-health-tracker

![CI](https://github.com/Shaisolaris/rn-health-tracker/actions/workflows/ci.yml/badge.svg)



React Native health and fitness tracker with step counting, workout logging, meal tracking, and weekly progress. Expo + TypeScript + Zustand.

## Quick Start

```bash
git clone https://github.com/Shaisolaris/rn-health-tracker.git
cd rn-health-tracker
npm install --legacy-peer-deps
npx expo start
```

React Native health and fitness tracker built with Expo featuring daily activity rings (steps, calories, active minutes), workout logging with exercise sets, nutrition tracking with macro breakdowns, water intake counter, sleep monitoring, and weekly progress charts with bar visualizations. Uses Zustand for state management and SVG for ring progress indicators.

## Stack

- **Framework:** React Native 0.74 with Expo SDK 51
- **Language:** TypeScript 5 strict mode
- **Navigation:** React Navigation 6 (native stack + bottom tabs)
- **State:** Zustand
- **Charts:** react-native-svg (ring progress indicators), custom bar charts
- **Styling:** StyleSheet API with health-focused color palette

## Features

### Today Dashboard
- Three activity rings (steps, calories, active minutes) with SVG circular progress
- Steps and calories metric cards with progress bars
- Interactive water intake tracker (tap glasses to fill/unfill)
- Sleep duration with progress bar toward goal
- Today's completed workouts list

### Workout Tracking
- Workout cards with type icons, duration, calories, exercise count
- Quick-start workout type templates (Strength, Cardio, Yoga, HIIT, Swim)
- Exercise detail with sets (reps, weight, duration, distance)
- Set completion toggling
- Workout history grouped by date

### Nutrition Logging
- Macro ring progress (calories, protein, carbs, fat)
- Meals grouped by type (breakfast, lunch, dinner, snack)
- Per-item display with protein/carbs/fat breakdown
- Calorie tracking against daily goal

### Weekly Progress
- 5-week bar charts for steps, calories, workouts, sleep, and water
- Visual trend analysis with color-coded bars
- Automatic data aggregation from daily stats

### Settings
- Editable daily goals (steps, calories, water, sleep, active minutes)
- Weekly workout goal
- Profile, notifications, connected devices menu

## Architecture

```
src/
├── App.tsx
├── navigation/AppNavigator.tsx
├── screens/
│   ├── TodayScreen.tsx           # Rings, metrics, water, sleep, workouts
│   ├── WorkoutsScreen.tsx        # Workout list, templates, history
│   ├── NutritionScreen.tsx       # Macro rings, meal groups
│   ├── ProgressScreen.tsx        # Weekly bar charts for all metrics
│   └── SettingsScreen.tsx        # Goals editor, general settings
├── components/
│   ├── common/
│   │   ├── RingProgress.tsx      # SVG circular progress with label
│   │   └── MetricCard.tsx        # Metric with progress bar
│   ├── workout/
│   │   └── WorkoutCard.tsx       # Workout summary card
│   └── nutrition/
│       └── MealRow.tsx           # Food item with macros
├── store/index.ts                # Zustand: workouts, nutrition, stats, goals, water
├── theme/index.ts                # Health-focused colors (blue steps, red calories, purple sleep)
├── types/index.ts                # Workout, Exercise, NutritionEntry, DailyStats, HealthGoals
└── utils/index.ts                # formatDuration, formatSleep, progressPercent
```

## Data Model

- **4 workouts** across strength, cardio, yoga, HIIT with real exercises and sets
- **5 nutrition entries** with realistic macro breakdowns
- **Daily stats** tracking 6 health metrics with goals
- **5 weeks** of historical progress data for trend charts

## Setup

```bash
git clone https://github.com/Shaisolaris/rn-health-tracker.git
cd rn-health-tracker
npm install
npx expo start
```

## Key Design Decisions

**SVG ring progress.** The activity rings use react-native-svg Circle elements with strokeDasharray/strokeDashoffset for smooth animated progress. This avoids third-party chart libraries while delivering the Apple Health / Google Fit ring aesthetic.

**Custom bar charts.** Weekly progress uses a lightweight custom bar chart component rather than a charting library. Each bar's height is calculated as a percentage of a known maximum, keeping the bundle small and the rendering fast.

**Water intake as interactive UI.** The water tracker uses tappable glass icons rather than a slider or input field. Tapping a filled glass removes it; tapping an empty glass fills it. This matches the quick-tap pattern used by popular health apps.

**Macro-level nutrition.** Rather than a full food database, the nutrition screen tracks the four key macros (calories, protein, carbs, fat) per entry. This balances usefulness with simplicity — in production, you'd integrate a food API like Nutritionix.

**Metric-specific colors.** Each health metric has a dedicated color (blue = steps, red = calories, cyan = water, purple = sleep, orange = active). These colors are consistent across all screens — rings, cards, charts, and progress bars.

## License

MIT
