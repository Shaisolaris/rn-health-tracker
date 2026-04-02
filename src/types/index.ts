export interface Workout {
  id: string;
  name: string;
  type: WorkoutType;
  exercises: Exercise[];
  duration: number; // minutes
  caloriesBurned: number;
  date: string;
  completed: boolean;
}

export type WorkoutType = "strength" | "cardio" | "flexibility" | "hiit" | "yoga" | "swimming";

export interface Exercise {
  id: string;
  name: string;
  sets: ExerciseSet[];
  restSeconds: number;
  muscleGroup: string;
}

export interface ExerciseSet {
  reps?: number;
  weight?: number;
  duration?: number;
  distance?: number;
  completed: boolean;
}

export interface NutritionEntry {
  id: string;
  meal: "breakfast" | "lunch" | "dinner" | "snack";
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
}

export interface DailyStats {
  date: string;
  steps: number;
  stepsGoal: number;
  calories: number;
  caloriesGoal: number;
  water: number;
  waterGoal: number;
  sleep: number;
  sleepGoal: number;
  activeMinutes: number;
  activeGoal: number;
  workoutsCompleted: number;
}

export interface WeeklyProgress {
  week: string;
  avgSteps: number;
  avgCalories: number;
  totalWorkouts: number;
  avgSleep: number;
  avgWater: number;
}

export interface HealthGoals {
  dailySteps: number;
  dailyCalories: number;
  dailyWater: number;
  dailySleep: number;
  dailyActiveMinutes: number;
  weeklyWorkouts: number;
}

export type RootStackParamList = {
  Main: undefined;
  WorkoutDetail: { id: string };
  LogWorkout: undefined;
  LogMeal: undefined;
  ProgressDetail: { metric: string };
};

export type MainTabParamList = {
  Today: undefined;
  Workouts: undefined;
  Nutrition: undefined;
  Progress: undefined;
  Settings: undefined;
};
