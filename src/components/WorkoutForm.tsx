import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { WorkoutEntry } from '../types/workout';

interface WorkoutFormProps {
  onAddWorkout: (workout: Omit<WorkoutEntry, 'id' | 'totalReps' | 'totalVolume'>) => void;
}

const WORKOUT_TYPES = [
  'Push-ups', 'Pull-ups', 'Squats', 'Deadlifts', 'Bench Press', 'Shoulder Press',
  'Bicep Curls', 'Tricep Dips', 'Lunges', 'Planks', 'Burpees', 'Mountain Climbers',
  'Jumping Jacks', 'Sit-ups', 'Russian Twists', 'Leg Press', 'Lat Pulldowns', 'Rows'
];

export function WorkoutForm({ onAddWorkout }: WorkoutFormProps) {
  const [formData, setFormData] = useState({
    workoutType: '',
    repsPerSet: '',
    numberOfSets: '',
    weight: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.workoutType || !formData.repsPerSet || !formData.numberOfSets || !formData.weight) {
      alert('Please fill in all fields');
      return;
    }

    onAddWorkout({
      workoutType: formData.workoutType,
      repsPerSet: parseInt(formData.repsPerSet),
      numberOfSets: parseInt(formData.numberOfSets),
      weight: parseFloat(formData.weight),
      date: formData.date
    });

    setFormData({
      workoutType: '',
      repsPerSet: '',
      numberOfSets: '',
      weight: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Plus className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Add New Workout</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workout Type
            </label>
            <select
              value={formData.workoutType}
              onChange={(e) => setFormData({ ...formData, workoutType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select workout type</option>
              {WORKOUT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reps per Set
            </label>
            <input
              type="number"
              min="1"
              value={formData.repsPerSet}
              onChange={(e) => setFormData({ ...formData, repsPerSet: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 12"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Sets
            </label>
            <input
              type="number"
              min="1"
              value={formData.numberOfSets}
              onChange={(e) => setFormData({ ...formData, numberOfSets: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 3"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 50.5"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Add Workout
        </button>
      </form>
    </div>
  );
}
