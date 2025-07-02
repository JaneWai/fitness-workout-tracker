import React from 'react';
import { Lightbulb, Play } from 'lucide-react';
import { WorkoutSuggestion } from '../types/workout';

interface WorkoutSuggestionsProps {
  suggestions: WorkoutSuggestion[];
  onApplySuggestion: (suggestion: WorkoutSuggestion) => void;
}

export function WorkoutSuggestions({ suggestions, onApplySuggestion }: WorkoutSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="text-yellow-500" size={24} />
        <h3 className="text-xl font-bold text-gray-800">Workout Suggestions</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-800 mb-2">{suggestion.workoutType}</h4>
            <div className="space-y-1 text-sm text-gray-600 mb-3">
              <p>Reps: <span className="font-medium">{suggestion.suggestedReps}</span></p>
              <p>Sets: <span className="font-medium">{suggestion.suggestedSets}</span></p>
              <p>Weight: <span className="font-medium">{suggestion.suggestedWeight}kg</span></p>
            </div>
            <p className="text-xs text-gray-500 mb-3">{suggestion.reason}</p>
            <button
              onClick={() => onApplySuggestion(suggestion)}
              className="w-full bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              <Play size={16} />
              Apply Suggestion
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
