
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function HabitGraph({ habits, entries }) {
  const [habitIdx, setHabitIdx] = useState(0);
  const [label, setLabel] = useState('');

  // Prepare data for the selected habit
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const data = entries.map(day => day?.[habitIdx] || 0);

  const chartData = {
    labels: days,
    datasets: [
      {
        label: label || habits[habitIdx]?.name || 'Habit',
        data,
        fill: false,
        borderColor: '#4ECDC4',
        backgroundColor: '#4ECDC4',
        tension: 0.2,
      },
    ],
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h3>Graph</h3>
      <div>
        <label>Habit: </label>
        <select value={habitIdx} onChange={e => setHabitIdx(Number(e.target.value))}>
          {habits.map((h, i) => (
            <option key={i} value={i}>{h.name}</option>
          ))}
        </select>
        <label style={{ marginLeft: 10 }}>Label: </label>
        <input value={label} onChange={e => setLabel(e.target.value)} placeholder="Y Axis Label" />
      </div>
      <Line data={chartData} options={{
        scales: {
          x: { title: { display: true, text: 'Day of Month' } },
          y: { title: { display: true, text: label || 'Value' } },
        },
      }} />
    </div>
  );
}

export default HabitGraph;
