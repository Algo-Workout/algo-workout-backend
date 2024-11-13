import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const app = express();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

// Allow requests from http://localhost:8080
app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'], // specify allowed methods if needed
    credentials: true
}));

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Example defining a route in Express
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

//writing to supabase table spash_email_signups
app.post('/splash-email-signups', async (req, res) => {
    console.log("this is the req.body", req.body)
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // Insert the email into Supabase table
    const { data, error } = await supabase
        .from('splash_email_signups')
        .insert([{ email }]);

    if (error) {
        return res.status(400).json({ error: error.message });
    }
    res.status(200).json({ message: 'Email saved successfully', data });
});


// Example specifying the port and starting the server
const port = process.env.PORT || 3000; // You can use environment variables for port configuration
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
