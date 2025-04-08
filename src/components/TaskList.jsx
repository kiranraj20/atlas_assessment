import React, { useState } from 'react';

const TaskList = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState({ title: '', estimate: 1 });
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState({ title: '', estimate: 1, completed: 0 });

  const addTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, { ...newTask, completed: 0 }]);
      setNewTask({ title: '', estimate: 1 });
    }
  };

  const deleteTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

  const startEdit = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index]);
  };

  const saveEdit = () => {
    setTasks(tasks.map((task, i) => (i === editIndex ? editTask : task)));
    setEditIndex(null);
  };

  const incrementCompleted = (index) => {
    setTasks(tasks.map((task, i) =>
      i === index && task.completed < task.estimate
        ? { ...task, completed: task.completed + 1 }
        : task
    ));
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-lg p-4 w-full max-w-md shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Tasks</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task name"
          className="flex-1 p-2 rounded-md border"
        />
        <input
          type="number"
          value={newTask.estimate}
          onChange={(e) => setNewTask({ ...newTask, estimate: Math.max(1, e.target.value) })}
          className="w-20 p-2 rounded-md border"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Add
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="flex items-center justify-between mb-2">
            {editIndex === index ? (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={editTask.title}
                  onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                  className="flex-1 p-2 rounded-md border"
                />
                <input
                  type="number"
                  value={editTask.estimate}
                  onChange={(e) => setEditTask({ ...editTask, estimate: Math.max(1, e.target.value) })}
                  className="w-20 p-2 rounded-md border"
                />
                <button
                  onClick={saveEdit}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-gray-800">{task.title}</p>
                  <div className="w-48 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{ width: `${(task.completed / task.estimate) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {task.completed}/{task.estimate} Pomodoros
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => incrementCompleted(index)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => startEdit(index)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;