import React from 'react';
import { Activity, TrendingUp, Target, Calendar } from 'lucide-react';
import { WorkoutStats } from '../types/workout';

interface DashboardProps {
  stats: WorkoutStats;
}

export function Dashboard({ stats }: DashboardProps) {
  const progressPercentage = stats.recentProgress.lastWeek > 0 
    ? ((stats.recentProgress.thisWeek - stats.recentProgress.lastWeek) / stats.recentProgress.lastWeek) * 100
    : stats.recentProgress.thisWeek > 0 ? 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="text-blue-600" size={28} />
        <h2 className="text-3xl font-bold text-gray-800">Fitness Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Workouts</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalWorkouts}</p>
            </div>
            <Calendar className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Volume</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalVolume.toLocaleString()}</p>
              <p className="text-xs text-gray-500">kg lifted</p>
            </div>
            <Target className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reps</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalReps.toLocaleString()}</p>
            </div>
            <Activity className="text-purple-500" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Weekly Progress</p>
              <p className="text-3xl font-bold text-gray-900">{stats.recentProgress.thisWeek}</p>
              <p className={`text-xs ${progressPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {progressPercentage >= 0 ? '+' : ''}{progressPercentage.toFixed(1)}% vs last week
              </p>
            </div>
            <TrendingUp className={progressPercentage >= 0 ? 'text-green-500' : 'text-red-500'} size={24} />
          </div>
        </div>
      </div>

      {Object.keys(stats.workoutsByType).length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Workout Distribution</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(stats.workoutsByType).map(([type, count]) => (
              <div key={type} className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium text-gray-800">{type}</p>
                <p className="text-2xl font-bold text-blue-600">{count}</p>
                <p className="text-xs text-gray-500">sessions</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
