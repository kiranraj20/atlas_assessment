# FocusFlow - Customizable Task Timer

## Overview
FocusFlow is a ReactJS-based productivity web app designed as a customizable Pomodoro-style timer. It features an analog clock, task management, and enhancements like a focus streak counter, mood tracker, sound notifications, focus mode, and statistics, all styled with an iOS-like gradient UI using Tailwind CSS.

## Features
- **Timer**: Analog clock with customizable work (default 25 min) and break (default 5 min) sessions. Includes start, pause, and reset controls.
- **Task Management**: Add, edit (title, estimate, completed Pomodoros), and delete tasks with progress bars.
- **Focus Streak Counter**: Tracks consecutive completed work sessions, resetting on pause/reset, with motivational feedback.
- **Mood Tracker**: Prompts for mood (e.g., Happy, Neutral, Stressed) after each work session.
- **Sound Notifications**: Plays `workout.mp3` when a break ends and a beep when a work session ends.
- **Focus Mode**: Hides tasks, settings, and stats during work sessions for distraction-free focus.
- **Statistics**: Displays total Pomodoros, average streak, and mood trends.
- **UI**: iOS-like gradient (blue-to-purple) with Tailwind CSS.

## Prerequisites
- Node.js and npm installed (recommended versions: Node.js 16+, npm 6+).
- A modern web browser (e.g., Chrome, Firefox).

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <your-repo-link>
   cd focusflow
Install Dependencies:
npm install
Add Audio File:
Place workout.mp3 in src/assets/. This file is used for the work session start sound. (If not available, move it to public/ and update Timer.jsx to const workAudio = new Audio('/workout.mp3');.)
The break sound uses an online URL (https://www.soundjay.com/buttons/beep-02.mp3). Optionally, replace it with a local file in src/assets/ or public/.
Run the App:
npm start
The app will open in your browser at http://localhost:3000.
How to Use FocusFlow
1. Timer Controls
Start/Pause: Click "Start" to begin the timer. Click "Pause" to stop it (audio stops too).
Reset: Click "Reset" to return to the initial work session time and clear the streak.
Customize Durations: Adjust "Work Time" and "Break Time" (in minutes) via the input fields below the clock. Minimum is 1 minute.
2. Task Management
Add a Task: Enter a task name and estimated Pomodoros (e.g., 2), then click "Add".
Edit a Task: Click "Edit" next to a task, modify the title or estimate, and click "Save".
Track Progress: Click "+1" to increment completed Pomodoros. A progress bar shows completion percentage.
Delete a Task: Click "Delete" to remove a task.
3. Focus Mode
Click "Focus Mode" to hide tasks, settings, and stats during a work session. Click "Exit Focus" to return to normal view.
4. Mood Tracker
After each work session ends, a prompt appears asking, "How do you feel? (Happy/Neutral/Stressed)". Enter a mood (case-sensitive) and press OK. View logged moods below the task list.
5. Sound Notifications
Work Start: workout.mp3 plays when a break ends and a new work session begins.
Break Start: A beep sound plays when a work session ends. Pausing the timer stops any playing audio.
6. Statistics
View total completed Pomodoros, average streak length, and mood trends at the bottom of the page (hidden in focus mode).
7. Testing Tip
For quick testing, set work and break times to 5 seconds (0.083 minutes) in App.jsx:
setWorkTime(0.083);
setBreakTime(0.083);
Troubleshooting
Audio Not Playing: Ensure workout.mp3 is in src/assets/ or public/. If it fails, use the public/ approach and check browser console for errors.
Prompt Appearing Twice: This was fixed using a useRef flag. If it persists, disable Strict Mode in index.js (not recommended) or verify the fix in production (npm run build).