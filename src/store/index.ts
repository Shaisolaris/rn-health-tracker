import { create } from "zustand";
import type { Workout, NutritionEntry, DailyStats, HealthGoals, WeeklyProgress } from "../types/index.js";
import { generateId } from "../utils/index.js";

const today = new Date().toISOString().split("T")[0]!;

const mockWorkouts: Workout[] = [
  {
    id: "w1", name: "Upper Body Strength", type: "strength", duration: 45, caloriesBurned: 320, date: today, completed: true,
    exercises: [
      { id: "e1", name: "Bench Press", muscleGroup: "Chest", restSeconds: 90, sets: [{ reps: 10, weight: 135, completed: true }, { reps: 8, weight: 155, completed: true }, { reps: 6, weight: 175, completed: true }] },
      { id: "e2", name: "Overhead Press", muscleGroup: "Shoulders", restSeconds: 90, sets: [{ reps: 10, weight: 85, completed: true }, { reps: 8, weight: 95, completed: true }, { reps: 8, weight: 95, completed: true }] },
      { id: "e3", name: "Barbell Row", muscleGroup: "Back", restSeconds: 90, sets: [{ reps: 10, weight: 115, completed: true }, { reps: 10, weight: 115, completed: true }, { reps: 8, weight: 135, completed: true }] },
      { id: "e4", name: "Bicep Curls", muscleGroup: "Arms", restSeconds: 60, sets: [{ reps: 12, weight: 30, completed: true }, { reps: 10, weight: 35, completed: true }, { reps: 10, weight: 35, completed: false }] },
    ],
  },
  {
    id: "w2", name: "Morning Run", type: "cardio", duration: 30, caloriesBurned: 280, date: today, completed: true,
    exercises: [{ id: "e5", name: "Running", muscleGroup: "Cardio", restSeconds: 0, sets: [{ duration: 30, distance: 5.2, completed: true }] }],
  },
  {
    id: "w3", name: "Yoga Flow", type: "yoga", duration: 60, caloriesBurned: 180, date: new Date(Date.now() - 86400000).toISOString().split("T")[0]!, completed: true,
    exercises: [{ id: "e6", name: "Vinyasa Flow", muscleGroup: "Full Body", restSeconds: 0, sets: [{ duration: 60, completed: true }] }],
  },
  {
    id: "w4", name: "HIIT Circuit", type: "hiit", duration: 25, caloriesBurned: 350, date: new Date(Date.now() - 172800000).toISOString().split("T")[0]!, completed: true,
    exercises: [
      { id: "e7", name: "Burpees", muscleGroup: "Full Body", restSeconds: 30, sets: [{ reps: 15, completed: true }, { reps: 12, completed: true }, { reps: 10, completed: true }] },
      { id: "e8", name: "Mountain Climbers", muscleGroup: "Core", restSeconds: 30, sets: [{ reps: 20, completed: true }, { reps: 20, completed: true }, { reps: 15, completed: true }] },
      { id: "e9", name: "Box Jumps", muscleGroup: "Legs", restSeconds: 30, sets: [{ reps: 12, completed: true }, { reps: 10, completed: true }, { reps: 10, completed: true }] },
    ],
  },
];

const mockNutrition: NutritionEntry[] = [
  { id: "n1", meal: "breakfast", name: "Oatmeal with Berries", calories: 350, protein: 12, carbs: 58, fat: 8, date: today },
  { id: "n2", meal: "breakfast", name: "Protein Shake", calories: 220, protein: 30, carbs: 15, fat: 5, date: today },
  { id: "n3", meal: "lunch", name: "Grilled Chicken Salad", calories: 480, protein: 42, carbs: 22, fat: 18, date: today },
  { id: "n4", meal: "snack", name: "Greek Yogurt", calories: 150, protein: 15, carbs: 12, fat: 4, date: today },
  { id: "n5", meal: "dinner", name: "Salmon with Vegetables", calories: 520, protein: 38, carbs: 30, fat: 22, date: today },
];

const mockDailyStats: DailyStats = {
  date: today, steps: 8742, stepsGoal: 10000, calories: 1720, caloriesGoal: 2200,
  water: 6, waterGoal: 8, sleep: 7.5, sleepGoal: 8, activeMinutes: 75, activeGoal: 60, workoutsCompleted: 2,
};

const mockWeeklyProgress: WeeklyProgress[] = [
  { week: "Mar 4", avgSteps: 7200, avgCalories: 2100, totalWorkouts: 4, avgSleep: 7.2, avgWater: 6.5 },
  { week: "Mar 11", avgSteps: 8100, avgCalories: 2050, totalWorkouts: 5, avgSleep: 7.5, avgWater: 7.0 },
  { week: "Mar 18", avgSteps: 8500, avgCalories: 1980, totalWorkouts: 4, avgSleep: 7.8, avgWater: 7.2 },
  { week: "Mar 25", avgSteps: 9200, avgCalories: 2150, totalWorkouts: 5, avgSleep: 7.4, avgWater: 6.8 },
  { week: "Apr 1", avgSteps: 8742, avgCalories: 1720, totalWorkouts: 2, avgSleep: 7.5, avgWater: 6.0 },
];

interface AppStore {
  workouts: Workout[];
  nutrition: NutritionEntry[];
  dailyStats: DailyStats;
  weeklyProgress: WeeklyProgress[];
  goals: HealthGoals;

  addWater: () => void;
  removeWater: () => void;
  addNutrition: (entry: Omit<NutritionEntry, "id" | "date">) => void;
  updateGoals: (goals: Partial<HealthGoals>) => void;
  completeSet: (workoutId: string, exerciseId: string, setIndex: number) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  workouts: mockWorkouts,
  nutrition: mockNutrition,
  dailyStats: mockDailyStats,
  weeklyProgress: mockWeeklyProgress,
  goals: { dailySteps: 10000, dailyCalories: 2200, dailyWater: 8, dailySleep: 8, dailyActiveMinutes: 60, weeklyWorkouts: 5 },

  addWater: () => set((s) => ({ dailyStats: { ...s.dailyStats, water: s.dailyStats.water + 1 } })),
  removeWater: () => set((s) => ({ dailyStats: { ...s.dailyStats, water: Math.max(0, s.dailyStats.water - 1) } })),

  addNutrition: (entry) => set((s) => ({
    nutrition: [...s.nutrition, { ...entry, id: generateId(), date: today }],
    dailyStats: { ...s.dailyStats, calories: s.dailyStats.calories + entry.calories },
  })),

  updateGoals: (goals) => set((s) => ({ goals: { ...s.goals, ...goals } })),

  completeSet: (workoutId, exerciseId, setIndex) => set((s) => ({
    workouts: s.workouts.map((w) =>
      w.id === workoutId
        ? { ...w, exercises: w.exercises.map((e) =>
            e.id === exerciseId
              ? { ...e, sets: e.sets.map((set, i) => i === setIndex ? { ...set, completed: !set.completed } : set) }
              : e,
          )}
        : w,
    ),
  })),
}));
