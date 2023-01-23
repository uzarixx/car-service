import { Request, Response } from 'express';
import { getAllUsers } from '../db/users';


const UserController = {
  getAllUser: async (req: Request, res: Response) => {
    const users = await getAllUsers()
    res.json(users);
  },
};

export default UserController;