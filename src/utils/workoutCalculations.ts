import { WorkoutEntry, WorkoutStats, WorkoutSuggestion } from '../types/workout';

export function calculateWorkoutStats(workouts: WorkoutEntry[]): WorkoutStats {
  if (workouts.length === 0) {
    return {
      totalWorkouts: 0,
      totalVolume: 0,
      totalReps: 0,
      averageWeight: 0,
      workoutsByType: {},
      recentProgress: { thisWeek: 0, lastWeek: 0 }
    };
  }

  const totalVolume = workouts.reduce((sum, workout) => sum + workout.totalVolume, 0);
  const totalReps = workouts.reduce((sum, workout) => sum + workout.totalReps, 0);
  const averageWeight = workouts.reduce((sum, workout) => sum + workout.weight, 0) / workouts.length;

  const workoutsByType = workouts.reduce((acc, workout) => {
    acc[workout.workoutType] = (acc[workout.workoutType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const thisWeekWorkouts = workouts.filter(w => new Date(w.date) >= oneWeekAgo).length;
  const lastWeekWorkouts = workouts.filter(w => {
    const workoutDate = new Date(w.date);
    return workoutDate >= twoWeeksAgo && workoutDate < oneWeekAgo;
  }).length;

  return {
    totalWorkouts: workouts.length,
    totalVolume,
    totalReps,
    averageWeight: Math.round(averageWeight * 10) / 10,
    workoutsByType,
    recentProgress: {
      thisWeek: thisWeekWorkouts,
      lastWeek: lastWeekWorkouts
    }
  };
}

export function generateWorkoutSuggestions(workouts: WorkoutEntry[]): WorkoutSuggestion[] {
  if (workouts.length === 0) {
    return [
      {
        workoutType: 'Push-ups',
        suggestedReps: 10,
        suggestedSets: 3,
        suggestedWeight: 0,
        reason: 'Great starting exercise for upper body strength'
      },
      {
        workoutType: 'Squats',
        suggestedReps: 12,
        suggestedSets: 3,
        suggestedWeight: 0,
        reason: 'Essential lower body compound movement'
      }
    ];
  }

  const suggestions: WorkoutSuggestion[] = [];
  const workoutTypes = [...new Set(workouts.map(w => w.workoutType))];

  workoutTypes.forEach(type => {
    const typeWorkouts = workouts.filter(w => w.workoutType === type);
    const latest = typeWorkouts[typeWorkouts.length - 1];
    
    if (latest) {
      const progressiveOverload = {
        workoutType: type,
        suggestedReps: latest.repsPerSet + 1,
        suggestedSets: latest.numberOfSets,
        suggestedWeight: latest.weight + 2.5,
        reason: 'Progressive overload - increase weight and reps'
      };
      suggestions.push(progressiveOverload);
    }
  });

  return suggestions.slice(0, 3);
}
