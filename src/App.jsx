import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0); // Menyimpan waktu dalam detik
  const [isRunning, setIsRunning] = useState(false); // Menandakan apakah stopwatch berjalan
  const [history, setHistory] = useState([]); // Menyimpan history waktu
  const intervalId = useRef(null); // Menggunakan useRef untuk menyimpan intervalId

  // Mengatur interval saat stopwatch aktif
  useEffect(() => {
    if (isRunning) {
      // Jika stopwatch berjalan, mulai interval
      intervalId.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      // Jika stopwatch berhenti, hentikan interval
      clearInterval(intervalId.current);
    }

    return () => clearInterval(intervalId.current); // Bersihkan interval saat komponen unmount
  }, [isRunning]);

  // Fungsi untuk mulai atau menghentikan stopwatch
  const toggleStopwatch = () => {
    setIsRunning(prevState => !prevState);
  };

  // Fungsi untuk mereset stopwatch
  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0);
    clearInterval(intervalId.current); // Pastikan interval dibersihkan saat reset
  };

  // Fungsi untuk menyimpan waktu ke dalam history saat stopwatch berhenti
  const stopAndSave = () => {
    setHistory([...history, formatTime(time)]); // Simpan waktu ke dalam history
    setIsRunning(false); // Hentikan stopwatch
  };

  // Format waktu dalam mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="stopwatch-container">
      <h1>Stopwatch</h1>
      <div className={`time-display ${isRunning ? 'running' : ''}`}>
        {formatTime(time)}
      </div>
      <div className="controls">
        <button className="start-stop" onClick={toggleStopwatch}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button className="stop-and-save" onClick={stopAndSave} disabled={!isRunning}>
          Save Time
        </button>
        <button className="reset" onClick={resetStopwatch}>Reset</button>
      </div>

      {/* Display History */}
      <div className="history">
        <h2>History</h2>
        <ul>
          {history.length > 0 ? (
            history.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))
          ) : (
            <p>No history yet</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
