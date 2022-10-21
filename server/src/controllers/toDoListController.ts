import { Request, Response } from 'express';
import { toDoList } from '../db';

export const getToDoList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    return res.json(toDoList);
  } catch (e: any) {
    throw new Error(e.message);
  }
};
