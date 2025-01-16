import { Request, Response } from 'express';
import supabase from '../utils/supabaseClient.ts'; // Import your Supabase client

const getSplashEmailsCount = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Fetching user count...');

    const { data: users, error } = await supabase
      .from('splash_email_signups')
      .select('*')
      // Option to explicitly get just number of rows: { count: 'exact', head: true }

    //console.log(`Line 13 users: ${typeof(users)}`)
    
    if (error) {
      console.error('Line 14: Error fetching user count: ', error);
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(200).json({ totalUsers: users.length });
    console.log('Successfully fetched total user count: ', users);

  } catch (err) {
    console.error('Unexpected error fetching user count: ', err);
    res.status(500).json({ error: 'Internal server error '});
  };
};

const submitEmailSignup = async (req: Request, res: Response): Promise<void> => {
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
};

export default {
  getSplashEmailsCount,
  submitEmailSignup
};