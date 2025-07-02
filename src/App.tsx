import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';
import { WorkoutForm } from './components/WorkoutForm';
import { Dashboard } from './components/Dashboard';
import { WorkoutSuggestions } from './components/WorkoutSuggestions';
import { WorkoutHistory } from './components/WorkoutHistory';
import { WorkoutEntry, WorkoutSuggestion } from './types/workout';
import { calculateWorkoutStats, generateWorkoutSuggestions } from './utils/workoutCalculations';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [workouts, setWorkouts] = useLocalStorage<WorkoutEntry[]>('fitness-workouts', []);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'add' | 'history'>('dashboard');

  const addWorkout = (workoutData: Omit<WorkoutEntry, 'id' | 'totalReps' | 'totalVolume'>) => {
    const newWorkout: WorkoutEntry = {
      ...workoutData,
      id: Date.now().toString(),
      totalReps: workoutData.repsPerSet * workoutData.numberOfSets,
      totalVolume: workoutData.repsPerSet * workoutData.numberOfSets * workoutData.weight
    };

    setWorkouts(prev => [...prev, newWorkout]);
    setActiveTab('dashboard');
  };

  const deleteWorkout = (id: string) => {
    setWorkouts(prev => prev.filter(workout => workout.id !== id));
  };

  const applySuggestion = (suggestion: WorkoutSuggestion) => {
    const workoutData = {
      workoutType: suggestion.workoutType,
      repsPerSet: suggestion.suggestedReps,
      numberOfSets: suggestion.suggestedSets,
      weight: suggestion.suggestedWeight,
      date: new Date().toISOString().split('T')[0]
    };
    
    addWorkout(workoutData);
  };

  const stats = calculateWorkoutStats(workouts);
  const suggestions = generateWorkoutSuggestions(workouts);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Dumbbell className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">FitTracker Pro</h1>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('add')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'add'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Add Workout
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'history'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                History
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <Dashboard stats={stats} />
            <WorkoutSuggestions 
              suggestions={suggestions} 
              onApplySuggestion={applySuggestion}
            />
            {workouts.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {workouts.slice(-5).reverse().map((workout) => (
                    <div key={workout.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-800">{workout.workoutType}</span>
                        <span className="text-gray-600 ml-2">
                          {workout.repsPerSet} × {workout.numberOfSets} @ {workout.weight}kg
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{workout.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'add' && (
          <WorkoutForm onAddWorkout={addWorkout} />
        )}

        {activeTab === 'history' && (
          <WorkoutHistory workouts={workouts} onDeleteWorkout={deleteWorkout} />
        )}
      </main>
    </div>
  );
}

export default App;
