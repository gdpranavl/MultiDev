const express = require('express');
const cors = require('cors');
const htmlAgent = require('./agents/htmlAgent');
const jsLogicAgent = require('./agents/jsLogicAgent');
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: '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',  // Replace with your actual API key
});

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
    const description = req.body.description;

    const prompt = `Generate a complete HTML page based on the following description: "${description}". 
    Include a <head> section with a <title>, and a <body> containing the requested elements. 
    Make sure the HTML is valid and can be directly rendered in a browser.`;

    try {
        // Make the API call and assign the response to 'completion'
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });

        // Access the generated content from the API response
        let generatedHtml = completion.choices[0].message.content;

        // Send the response back to the client
        res.send(generatedHtml);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while generating the HTML.');
    }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});