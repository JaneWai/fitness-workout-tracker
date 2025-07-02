export interface WorkoutEntry {
  id: string;
  workoutType: string;
  repsPerSet: number;
  numberOfSets: number;
  weight: number;
  date: string;
  totalReps: number;
  totalVolume: number;
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalVolume: number;
  totalReps: number;
  averageWeight: number;
  workoutsByType: Record<string, number>;
  recentProgress: {
    thisWeek: number;
    lastWeek: number;
  };
}

export interface WorkoutSuggestion {
  workoutType: string;
  suggestedReps: number;
  suggestedSets: number;
  suggestedWeight: number;
  reason: string;
}
