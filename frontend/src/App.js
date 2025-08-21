import React, { useState } from 'react';
import HabitGrid from './components/HabitGrid';
import HabitGraph from './components/HabitGraph';
import Highlights from './components/Highlights';

function App() {
  // State for habits and entries
  const [habits, setHabits] = useState([
    { name: 'Exercise', type: 'binary' },
    { name: 'Read', type: 'binary' },
  ]);
  // entries[day][habit] = value
  const [entries, setEntries] = useState([]);
  // highlights: array of 15 lines
  const [highlights, setHighlights] = useState([]);

  return (
    <div className="App" style={{ fontFamily: 'sans-serif', background: '#f7f7f7', minHeight: '100vh' }}>
      <header style={{ background: '#4ECDC4', color: '#fff', padding: '1rem', textAlign: 'center' }}>
        <h1 style={{ margin: 0 }}>Habit Tracking Journal</h1>
      </header>
      <main style={{
        maxWidth: 1400,
        margin: '2rem auto',
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px #0001',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'row',
        gap: 24,
        minHeight: 600
      }}>
        {/* Left: Days + Highlights */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 120 }}>
          <h3 style={{ marginBottom: 8 }}>Days</h3>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 8 }}>
              {[...Array(31)].map((_, i) => (
                <div key={i} style={{ width: 32, textAlign: 'center', color: '#888', fontSize: 14 }}>{i + 1}</div>
              ))}
            </div>
            <Highlights highlights={highlights} setHighlights={setHighlights} />
          </div>
        </div>
        {/* Middle: Habit Table */}
        <div style={{ flex: 1, minWidth: 400, overflowX: 'auto' }}>
          <HabitGrid habits={habits} setHabits={setHabits} entries={entries} setEntries={setEntries} />
        </div>
        {/* Right: Graph */}
        <div style={{ minWidth: 350, maxWidth: 400 }}>
          <HabitGraph habits={habits} entries={entries} />
        </div>
      </main>
    </div>
  );
}

export default App;