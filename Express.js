const express = require('express');
const bodyParser = require('body-parser');
const { OpenAIApi } = require('your-openai-library'); // Replace with your library for accessing the OpenAI API

const app = express();
const port = process.env.PORT || 3000;
const apiKey = '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'; // Replace with your OpenAI API key

app.use(bodyParser.json());

// Handle incoming chat messages from the frontend
app.post('/api/chatbot', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // Use your OpenAI library to make a request to the GPT-3.5 model
        const botResponse = await openAIChat(userMessage);

        res.json({ botResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

async function openAIChat(userMessage) {
    // Make a request to the OpenAI API with userMessage
    // Handle authentication and API call here using your chosen library
    // Example: Replace with the actual OpenAI API call
    const response = await OpenAIApi.sendMessage(userMessage, apiKey);

    // Extract and return the chatbot's response from the API response
    return response.data.choices[0].text.trim();
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
