const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const childProcess = require('child_process');
const app = express(); 

// MongoDB Connection
mongoose.connect('mongodb://localhost/safehaven').then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Hate Speech Detection Endpoint
const hateSpeechDetector = require('./hateSpeechDetector');
app.post('/detect-hate-speech', (req, res) => {
    try {
        const text = req.body.text;
        const results = hateSpeechDetector(text);
        res.json(results);
    } catch (error) {
        console.error('Error detecting hate speech:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Moderation Endpoint
app.post('/moderate', (req, res) => {
    const input = req.body.input;
    const pythonProcess = childProcess.spawn('python', ['moderation_model.py', input]);

    pythonProcess.stdout.on('data', (data) => {
        const output = data.toString();
        res.json({ output });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });
});

// Start Server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

// Route for Resource Library (Example Endpoint)
const resourceLibrary = require('./resourceLibrary');
app.use('/resources', resourceLibrary);

// Route for Community Forum (Example Endpoint)
const communityForum = require('./communityForum');
app.use('/forum', communityForum);

// Route for Reporting Tool (Example Endpoint)
const reportingTool = require('./reportingTool');
app.use('/report', reportingTool);
