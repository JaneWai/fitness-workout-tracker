import React, { useState } from 'react';
import { History, Trash2, Filter } from 'lucide-react';
import { WorkoutEntry } from '../types/workout';

interface WorkoutHistoryProps {
  workouts: WorkoutEntry[];
  onDeleteWorkout: (id: string) => void;
}

export function WorkoutHistory({ workouts, onDeleteWorkout }: WorkoutHistoryProps) {
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'volume'>('date');

  const workoutTypes = [...new Set(workouts.map(w => w.workoutType))];
  
  const filteredWorkouts = workouts
    .filter(workout => filterType === 'all' || workout.workoutType === filterType)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.totalVolume - a.totalVolume;
    });

  if (workouts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <History className="text-gray-400 mx-auto mb-4" size={48} />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Workouts Yet</h3>
        <p className="text-gray-500">Start tracking your workouts to see your history here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <History className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Workout History</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Workouts</option>
            {workoutTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'volume')}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="date">Sort by Date</option>
          <option value="volume">Sort by Volume</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredWorkouts.map((workout) => (
          <div key={workout.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h4 className="font-semibold text-gray-800">{workout.workoutType}</h4>
                  <span className="text-sm text-gray-500">{workout.date}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Reps per Set:</span>
                    <span className="font-medium ml-1">{workout.repsPerSet}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Sets:</span>
                    <span className="font-medium ml-1">{workout.numberOfSets}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium ml-1">{workout.weight}kg</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Volume:</span>
                    <span className="font-medium ml-1">{workout.totalVolume}kg</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onDeleteWorkout(workout.id)}
                className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                title="Delete workout"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
