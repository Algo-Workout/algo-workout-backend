import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import supabase from './utils/supabaseClient.ts';
import splashRoutes from './routes/splash.routes.ts';

const app = express();

// Allow requests from http://localhost:8080
app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'], // specify allowed methods if needed
    credentials: true
}));

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Routes for user table
app.use('/splash', splashRoutes);


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
    console.log('LINE 38!!!');
    console.log('Supabase URL:', process.env.SUPABASE_URL);

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

app.get('/test-supabase', async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Testing connection to Supabase...');
        const { data, error } = await supabase
            .from('splash_email_signups') // Ensure this any table from supabase
            .select('*');

        if (error) {
            console.error('Supabase error:', error);
            res.status(400).json({ error: error.message })
            return;
        }

        console.log('Fetched data:', data);
        res.status(200).json({ data });
    } catch (err) {
        console.error('LINE 89!!!! Unexpected error during Supabase test: ', err);
        res.status(500).json({ error: `Internal server error: ${err}` });
    }
});



// Example specifying the port and starting the server
const port = process.env.PORT || 3000; // You can use environment variables for port configuration
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
