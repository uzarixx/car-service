import { Router } from 'express';
import handleErrorMiddleware from '../middlewares/handleErrorMiddleware';
import UserController from '../controllers/user';
import NotificationsController from '../controllers/notifications';
import authUser from '../middlewares/authMiddlewate';

const router = Router();

/*
GetUsers
 */
router.get('/get-user/:id', handleErrorMiddleware(UserController.getUser))
router.post('/create-user', handleErrorMiddleware(UserController.createUser));
router.post('/activate-user', handleErrorMiddleware(UserController.activateUser))
router.post('/notification-status', handleErrorMiddleware(UserController.notificationStatus))
router.post('/create-notification', authUser, handleErrorMiddleware(NotificationsController.createNotification))
router.post('/updateName', handleErrorMiddleware(UserController.updateName))

export default router;