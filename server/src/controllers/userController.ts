import { Request, Response } from 'express';

export const registration = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const response = { email, password, role };
    console.log(req.body);
    return res.json({ response });
  } catch (e: any) {
    throw new Error(e.message);
  }
};
