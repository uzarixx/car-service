import { Router } from 'express';
import handleErrorMiddleware from '../middlewares/handleErrorMiddleware';
import UserController from '../controllers/user';
import authUser from '../middlewares/authMiddlewate';
import OffersController from '../controllers/offers';

const router = Router();

/*
GetUsers
 */
router.get('/get-all-users', authUser, handleErrorMiddleware(UserController.getAllUser));
router.get('/get-user/:id', authUser, handleErrorMiddleware(UserController.getUserById))
router.post('/update-user', authUser, handleErrorMiddleware(UserController.updateUser))
router.post('/verify-user', authUser, handleErrorMiddleware(UserController.verifyUser))

/*
GetOffers
 */
router.get('/get-all-offers', authUser, handleErrorMiddleware(OffersController.getAllOffers))


export default router;