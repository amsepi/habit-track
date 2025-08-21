import React, { useState } from 'react';

function HabitGrid({ habits, setHabits, entries, setEntries }) {
  // Add a new habit column
  const addHabit = () => {
    const name = prompt('Enter habit name:');
    if (name) {
      setHabits([...habits, { name, type: 'binary' }]);
    }
  };

  // Add entry for a habit on a specific day
  const handleEntryChange = (dayIdx, habitIdx, value) => {
    const updated = [...entries];
    if (!updated[dayIdx]) updated[dayIdx] = [];
    updated[dayIdx][habitIdx] = value;
    setEntries(updated);
  };

  // Render 31 days (rows) and habits (columns)
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="habit-grid">
        <thead>
          <tr>
            <th>Day</th>
            {habits.map((h, i) => (
              <th key={i}>{h.name}</th>
            ))}
            <th>
              <button onClick={addHabit}>+ Add Habit</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(31)].map((_, dayIdx) => (
            <tr key={dayIdx}>
              <td>{dayIdx + 1}</td>
              {habits.map((h, habitIdx) => (
                <td key={habitIdx}>
                  <input
                    type={h.type === 'binary' ? 'checkbox' : 'number'}
                    checked={h.type === 'binary' ? entries[dayIdx]?.[habitIdx] || false : undefined}
                    value={h.type === 'quantitative' ? entries[dayIdx]?.[habitIdx] || '' : undefined}
                    onChange={e => handleEntryChange(
                      dayIdx,
                      habitIdx,
                      h.type === 'binary' ? e.target.checked : e.target.value
                    )}
                  />
                </td>
              ))}
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HabitGrid;
