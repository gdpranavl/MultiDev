import React, { useState, useEffect } from 'react';
import DescriptionInput from './components/DescriptionInput';
import Preview from './components/Preview';
import Log from './components/Log';
import './App.css';

function App() {
  const [description, setDescription] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [logs, setLogs] = useState([]);
  const [theme, setTheme] = useState('light');

  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      const data = await response.json();
      if (response.ok) {
        setGeneratedHtml(data.html);
        setLogs(data.logs);
      } else {
        console.error('Error:', data.error);
        setLogs(data.logs || ['Error occurred.']);
      }
    } catch (error) {
      console.error('Error:', error);
      setLogs(['Network error or server is down.']);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.className = `${theme}-theme`;
  }, [theme]);

  return (
    <div className="app">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
      <div className="container">
        <div className="left-section">
          <DescriptionInput
            description={description}
            onDescriptionChange={handleDescriptionChange}
            onSubmit={handleSubmit}
          />
          <Log logs={logs} />
        </div>
        <div className="right-section">
          <h2>Preview</h2>
          <Preview html={generatedHtml} />
        </div>
      </div>
    </div>
  );
}

export default App;