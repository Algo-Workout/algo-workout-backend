const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Example defining a route in Express
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

// Create Mock data to test connecting to front end
const users = [
    { id: 1, username: 'Jason', password: 'Voorhees' },
    { id: 2, username: 'Michael', password: 'Myers' },
    { id: 3, username: 'Freddy', password: 'Krueger' },
    { id: 4, username: 'Ghostface', password: 'Killah' },
    { id: 5, username: 'Patrick', password: 'Bateman' },
];

// Middleware to parse JSON data (optional if plan to use JSON data in POST requests)
app.use(express.json());

// Route to get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Route to get user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (user) {
        `Is this your username: ${res.json(user)}?`;
    } else {
        res.status(404).json({ message: 'Lo siento, user not found.' });
    }
});

// Route to get user by username
app.get('/users/username/:username', (req, res) => {
    const user = users.find(u => u.username === req.params.username);

    if (user) {
        `Response, is ${res.json(user)} the user name you're looking for?`;
    } else {
        res.status(404).json({ message: 'Sorry, user does not exist!' });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    res.status(500).send({
        status: 500,
        message: 'Internal server error, global error handler.'
    });
});

// Example specifying the port and starting the server
const port = process.env.PORT || 4000; // You can use environment variables for port configuration
app.listen(port, () => {
    console.log(`Server is running on port ${port}. TESTING WAHOO!`);
});