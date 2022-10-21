import { Router } from 'express';
import { registration } from '../../controllers/userController';

export const userRouter = Router();

userRouter.post('/registration', registration);

userRouter.get('/auth');
