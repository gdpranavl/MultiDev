const express = require('express');
const cors = require('cors');
const htmlAgent = require('./agents/htmlAgent');
const jsLogicAgent = require('./agents/jsLogicAgent');
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: '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',  // Replace with your actual API key
});

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
    const description = req.body.description;
    let logs = [];
    logs.push(`Received description: "${description}"`);
  
    const prompt = `Based on the description: "${description}", generate a complete HTML page. 
  First, think step by step about what elements to include and how to structure the page. 
  Then, provide your explanation wrapped in <explanation> tags. 
  Finally, provide the HTML code wrapped in <code> tags. 
  Make sure the HTML includes a <head> with a <title>, and a <body> with the requested elements.`;
  
    try {
      logs.push('Calling OpenAI API...');
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });
      logs.push('Received response from OpenAI');
  
      const generatedText = completion.choices[0].message.content;
  
      // Extract explanation and code using regex
      const explanationMatch = generatedText.match(/<explanation>([\s\S]*?)<\/explanation>/);
      const codeMatch = generatedText.match(/<code>([\s\S]*?)<\/code>/);
  
      let generatedHtml;
      if (codeMatch) {
        generatedHtml = codeMatch[1].trim();
      } else {
        generatedHtml = generatedText.trim();
        logs.push('Warning: Could not find <code> tags in the response. Using the entire response as HTML.');
      }
  
      if (explanationMatch) {
        logs.push('AI explanation: ' + explanationMatch[1].trim());
      } else {
        logs.push('No explanation provided by the AI.');
      }
  
      res.json({ html: generatedHtml, logs: logs });
    } catch (error) {
      logs.push('Error: ' + error.message);
      res.status(500).json({ error: 'An error occurred while generating the HTML.', logs: logs });
    }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});