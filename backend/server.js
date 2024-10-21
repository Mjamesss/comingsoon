const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import CORS
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Use CORS middleware to allow all origins
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('Connected to MySQL database:', process.env.DB_NAME);
});

// Endpoint to handle email submissions
app.post('/api/subscribe', (req, res) => {
    const email = req.body.email;

    // Insert the email into the subscribers table
    const query = 'INSERT INTO subscribers (email) VALUES (?)';
    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('Error saving email:', err);
            return res.status(500).json({ message: 'Error saving email' });
        }
        res.status(200).json({ message: 'Email submitted successfully!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
