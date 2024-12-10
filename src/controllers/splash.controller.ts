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


export default getSplashEmailsCount;