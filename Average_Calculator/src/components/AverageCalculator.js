import React, { useState } from 'react';
import { fetchNumbers } from '../services/api';

const VALID_IDS = ['Prime', 'Fibo', 'Even', 'Random'];
const WINDOW_SIZE = 10;

const AverageCalculator = () => {
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(null);
  const [inputType, setInputType] = useState('');

  const handleFetch = async () => {
    const type = inputType.trim().toLowerCase();
    if (!VALID_IDS.includes(type)) {
      alert('Enter a valid ID: p (prime), f (fibo), e (even), r (random)');
      return;
    }

    const result = await fetchNumbers(type);
    if (!result || !result.numbers) return;

    const fetchedNums = result.numbers;
    const uniqueNew = fetchedNums.filter((num) => !windowCurrState.includes(num));
    const updatedWindow = [...windowCurrState, ...uniqueNew].slice(-WINDOW_SIZE);

    setWindowPrevState(windowCurrState);
    setWindowCurrState(updatedWindow);
    setNumbers(fetchedNums);
    setAvg((updatedWindow.reduce((a, b) => a + b, 0) / updatedWindow.length).toFixed(2));
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Average Calculator</h1>
      <input
        type="text"
        placeholder="Enter ID (prime, fibo, even, random)"
        value={inputType}
        onChange={(e) => setInputType(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "1rem" }}
      />
      <button onClick={handleFetch} style={{ padding: "0.5rem" }}>
        Fetch
      </button>

      <div style={{ marginTop: "2rem" }}>
        <pre>{JSON.stringify({
          windowPrevState,
          windowCurrState,
          numbers,
          avg: avg ? parseFloat(avg) : 0
        }, null, 2)}</pre>
      </div>
    </div>
  );
};

export default AverageCalculator;
