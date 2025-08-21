import React from 'react';

function Highlights({ highlights, setHighlights }) {
  // Handle highlight change for a specific line
  const handleChange = (idx, value) => {
    const updated = [...highlights];
    updated[idx] = value;
    setHighlights(updated);
  };

  return (
    <div style={{ minWidth: 220, marginRight: 16 }}>
      <h3 style={{ marginBottom: 8 }}>Highlights</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {[...Array(15)].map((_, idx) => (
          <input
            key={idx}
            type="text"
            value={highlights[idx] || ''}
            onChange={e => handleChange(idx, e.target.value)}
            placeholder={`Highlight ${idx + 1}`}
            style={{ width: '100%', padding: 4, borderRadius: 4, border: '1px solid #ddd', fontSize: 14 }}
          />
        ))}
      </div>
    </div>
  );
}

export default Highlights;
