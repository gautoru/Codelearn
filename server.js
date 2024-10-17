require('dotenv').config();
const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'page1.html'));
});

// Endpoints for page1.js
app.post('/generate-initial', async (req, res) => {
    const { userInput } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Generate a message containing 5 initial steps for the user to learn the programming language
            mentioned in the prompt. Ensure that the responses are short, concise and easy to read. Begin with an 
            enthusiastic statement. If there is no programming language specified then apologize and ask again.
            User input: ${userInput}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.json({ text });
    } catch (error) {
        console.error("Error in generate-initial:", error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.post('/generate-resources', async (req, res) => {
    const { userInput } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Generate a list of 5 online resources for the user to learn the programming language mentioned in prompt.
            If there is no programming language mentioned, apologize and ask them to try again.
            Give the final response in the format resource_name: resource_link.
            User input: ${userInput}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.json({ text });
    } catch (error) {
        console.error("Error in generate-resources:", error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Endpoints for page2.js
app.post('/generate-problem', async (req, res) => {
    const { userInput } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Generate a beginner level program problem statement using the language described as in "${userInput}"`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.json({ text });
    } catch (error) {
        console.error("Error in generate-problem:", error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.post('/check-problem', async (req, res) => {
    const { userCode, problemstatement } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Read the user code: "${userCode}" and check for any errors and also it must be in accordance and correctly give the output if executed with the problem statement "${problemstatement}" and if not in accordance give a brief explanation`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.json({ text });
    } catch (error) {
        console.error("Error in check-problem:", error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});