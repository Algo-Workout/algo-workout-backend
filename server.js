import { createClient } from '@supabase/supabase-js';
const express = require('express');
const app = express();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

// Example defining a route in Express
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

//writing to supabase table spash_email_signups
app.post('/splash-email-signups', async (req, res) => {
    const { email } = req.body;

    // Insert the email into a Supabase table, "splash_email_signups"
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
