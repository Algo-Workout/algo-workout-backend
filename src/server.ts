import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const app = express();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Ensure environment variables are defined
if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)

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
app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

//writing to supabase table spash_email_signups
app.post('/splash-email-signups', async (req: Request, res: Response): Promise<void> => {
    // console.log(
    //     "req.body",req.body
    // )
    // const firstName = req.body.firstName;
    // const email = req.body.email;
    // console.log('firstName', firstName)
    // console.log('email', email)
    try{
        console.log('Incoming POST request to /splash-email-signups with body:', req.body);
        const { firstName, email } = req.body;

        if (!email) {
            res.status(400).json({ error: 'Email is required' });
            return; 
        }

        // Insert the email into Supabase table
        const { data, error } = await supabase
        .from('splash_email_signups')
        .insert({ 
            email: email,
            name: firstName,
        })
        .select();

        if (error) {
            res.status(400).json({ error: error.message });
            return; 
        }
    
        res.status(200).json({ message: 'Email saved successfully', data });
        console.log('Email inserted successfully:', { firstName, email });
    
    } catch (err) {
        console.error('Unexpected error during POST /splash-email-signups:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Example specifying the port and starting the server
const port = process.env.PORT || 3000; // You can use environment variables for port configuration
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
