import { Router } from 'express';
import { getToDoList } from '../../controllers/toDoListController';

export const toDoListRouter = Router();

toDoListRouter.get('/:id', getToDoList);
