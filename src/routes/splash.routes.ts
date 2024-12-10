import { Router } from 'express';
import getSplashEmailsCount from '../controllers/splash.controller.ts';

const router = Router();

// Route to get total user count
router.get('/splash-emails-count', getSplashEmailsCount);

export default router;