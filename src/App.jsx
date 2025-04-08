import React, { useState } from 'react';
import Timer from './components/Timer';
import TaskList from './components/TaskList';
import Statistics from './components/Statistics';
import MoodTracker from './components/MoodTracker';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [streak, setStreak] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [moods, setMoods] = useState([]);
  const [stats, setStats] = useState({ totalPomodoros: 0, streaks: [] });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-300 to-indigo-400 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-white mb-6">FocusFlow</h1>

      {/* Timer and Settings */}
      <div className="bg-white/80 backdrop-blur-md rounded-lg p-4 mb-6 w-full max-w-md shadow-lg">
        <Timer
          workTime={workTime}
          breakTime={breakTime}
          setStreak={setStreak}
          setStats={setStats}
          setMoods={setMoods}
          focusMode={focusMode}
          setFocusMode={setFocusMode}
        />
        {!focusMode && (
          <div className="mt-4">
            <label className="block text-gray-700">Work Time (min):</label>
            <input
              type="number"
              value={workTime}
              onChange={(e) => setWorkTime(Math.max(1, e.target.value))}
              className="w-full p-2 mt-1 rounded-md border"
            />
            <label className="block text-gray-700 mt-2">Break Time (min):</label>
            <input
              type="number"
              value={breakTime}
              onChange={(e) => setBreakTime(Math.max(1, e.target.value))}
              className="w-full p-2 mt-1 rounded-md border"
            />
          </div>
        )}
      </div>

      {/* Streak Display */}
      <div className="text-white mb-4">
        <p>Focus Streak: <span className="font-bold">{streak}</span></p>
        {streak > 0 && <p className="text-sm">Keep it up! 🔥</p>}
      </div>

      {/* Task List, Mood Tracker, and Statistics */}
      {!focusMode && (
        <>
          <TaskList tasks={tasks} setTasks={setTasks} />
          <MoodTracker moods={moods} />
          <Statistics stats={stats} moods={moods} />
        </>
      )}
    </div>
  );
};

export default App;