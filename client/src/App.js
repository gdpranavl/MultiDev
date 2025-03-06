import React, { useState } from 'react';
import DescriptionInput from './components/DescriptionInput';
import Preview from './components/Preview';

function App() {
  const [description, setDescription] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState('');

  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      });
      const html = await response.text();
      setGeneratedHtml(html);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Multi-Agent Dev Platform</h1>
      <DescriptionInput
        description={description}
        onDescriptionChange={handleDescriptionChange}
        onSubmit={handleSubmit}
      />
      <Preview html={generatedHtml} />
    </div>
  );
}

export default App;