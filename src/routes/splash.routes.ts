import { Router } from 'express';
import splashController from '../controllers/splash.controller.ts';

const router = Router();

// Route to get total user count
router.get('/splash-emails-count', splashController.getSplashEmailsCount);

// Route to submit email signup
router.post('/splash-email-signups', splashController.submitEmailSignup)

export default router;