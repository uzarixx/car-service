import { Router } from 'express';
import handleErrorMiddleware from '../middlewares/handleErrorMiddleware';
import UserController from '../controllers/user';

const router = Router();

/*
GetUsers
 */
router.post('/create-user', handleErrorMiddleware(UserController.createUser));
router.post('/activate-user', handleErrorMiddleware(UserController.activateUser))

export default router;