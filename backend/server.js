const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic GET route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Email Subscription API!'); // Simple response
});

// Sample endpoint to handle email submissions
app.post('/api/subscribe', (req, res) => {
    const email = req.body.email;

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Save email to a JSON file
    fs.readFile('emails.json', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' });
        }

        const emails = JSON.parse(data || '[]');
        emails.push(email);

        fs.writeFile('emails.json', JSON.stringify(emails), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving email' });
            }
            res.status(200).json({ message: 'Email submitted successfully!' });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
