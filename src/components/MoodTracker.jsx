import React from 'react';

const MoodTracker = ({ moods }) => (
  <div className="bg-white/80 backdrop-blur-md rounded-lg p-4 w-full max-w-md shadow-lg mt-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Mood Tracker</h2>
    {moods.length === 0 ? (
      <p className="text-gray-600">No moods logged yet.</p>
    ) : (
      <ul>
        {moods.map((mood, index) => (
          <li key={index} className="text-gray-800">
            Session {index + 1}: {mood}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default MoodTracker;