import { Router } from 'express';
import handleErrorMiddleware from '../middlewares/handleErrorMiddleware';
import UserController from '../controllers/user';

const router = Router();

/*
GetUsers
 */
router.get('/get-all-users', handleErrorMiddleware(UserController.getAllUser));

export default router;