import { Request, Response } from 'express';
import { getAllUsers, getUserById } from '../db/users';


const UserController = {
  getAllUser: async (req: Request, res: Response) => {
    const users = await getAllUsers()
    res.json(users);
  },
  getUserById: async (req: Request, res: Response) => {
    const {id} = req.params
    const user = await getUserById(id)
    res.json(user)
  }
};

export default UserController;