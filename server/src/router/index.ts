import { Router } from 'express';
import { toDoListRouter } from './routers/toDoListRouter';
import { userRouter } from './routers/userRouter';

export const router = Router();

router.use('/user', userRouter);
router.use('/todolist', toDoListRouter);
