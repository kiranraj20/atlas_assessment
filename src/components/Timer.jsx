/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ workTime, breakTime, setStreak, setStats, setMoods, focusMode, setFocusMode }) => {
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const hasPromptedRef = useRef(false); // Flag to prevent double prompts

  // Audio instances
  const workAudio = new Audio('https://www.soundjay.com/buttons/beep-02.mp3');
  const breakAudio = new Audio('https://www.soundjay.com/buttons/beep-02.mp3');

  // Timer logic
  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (isWorkSession) {
        setStreak((prev) => prev + 1);
        setStats((prev) => ({
          ...prev,
          totalPomodoros: prev.totalPomodoros + 1,
          streaks: [...prev.streaks, prev.streaks.length > 0 ? prev.streaks.slice(-1)[0] + 1 : 1],
        }));
        breakAudio.play();
        setTimeLeft(breakTime * 60);
        setIsWorkSession(false);
      } else {
        workAudio.play();
        setTimeLeft(workTime * 60);
        setIsWorkSession(true);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, workTime, breakTime, isWorkSession, setStreak, setStats, breakAudio, workAudio]);

  // Separate effect for mood prompt, triggered only once per work session end
  useEffect(() => {
    if (timeLeft === 0 && isWorkSession && !hasPromptedRef.current) {
      hasPromptedRef.current = true; // Set flag to true to prevent re-trigger
      const mood = prompt('How do you feel? (Happy/Neutral/Stressed)');
      if (mood) {
        setMoods((prev) => [...prev, mood]);
      }
    } else if (timeLeft > 0 || !isWorkSession) {
      hasPromptedRef.current = false; // Reset flag when timer restarts or switches to break
    }
  }, [timeLeft, isWorkSession, setMoods]);

  // Pause audio when timer is paused
  useEffect(() => {
    if (!isActive) {
      workAudio.pause();
      workAudio.currentTime = 0;
      breakAudio.pause();
      breakAudio.currentTime = 0;
    }
  }, [breakAudio, isActive, workAudio]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(workTime * 60);
    setIsWorkSession(true);
    setStreak(0);
    workAudio.pause();
    workAudio.currentTime = 0;
    breakAudio.pause();
    breakAudio.currentTime = 0;
  };

  const totalTime = isWorkSession ? workTime * 60 : breakTime * 60;
  const angle = (timeLeft / totalTime) * 360;

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {isWorkSession ? 'Work' : 'Break'}
      </h2>
      <svg className="w-48 h-48 mx-auto" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="gray" strokeWidth="5" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="indigo"
          strokeWidth="5"
          strokeDasharray="283"
          strokeDashoffset={283 - (angle / 360) * 283}
          transform="rotate(-90 50 50)"
        />
        <text x="50" y="55" textAnchor="middle" className="text-xl font-bold fill-gray-800">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </text>
      </svg>
      <div className="mt-4 space-x-4">
        <button
          onClick={toggleTimer}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Reset
        </button>
        <button
          onClick={() => setFocusMode(!focusMode)}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          {focusMode ? 'Exit Focus' : 'Focus Mode'}
        </button>
      </div>
    </div>
  );
};

export default Timer;