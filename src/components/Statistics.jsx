import React from 'react';

const Statistics = ({ stats, moods }) => {
  const avgStreak = stats.streaks.length > 0
    ? (stats.streaks.reduce((a, b) => a + b, 0) / stats.streaks.length).toFixed(1)
    : 0;
  const moodCounts = moods.reduce((acc, mood) => {
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-lg p-4 w-full max-w-md shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistics</h2>
      <p className="text-gray-800">Total Pomodoros: {stats.totalPomodoros}</p>
      <p className="text-gray-800">Average Streak: {avgStreak}</p>
      <p className="text-gray-800">Mood Trends:</p>
      <ul>
        {Object.entries(moodCounts).map(([mood, count]) => (
          <li key={mood} className="text-gray-600">
            {mood}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Statistics;