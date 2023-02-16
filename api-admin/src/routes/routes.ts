import { Router } from 'express';
import handleErrorMiddleware from '../middlewares/handleErrorMiddleware';
import UserController from '../controllers/user';
import authUser from '../middlewares/authMiddlewate';
import OffersController from '../controllers/offers';

const router = Router();


/*
AUTH
 */

router.post('/login', handleErrorMiddleware(UserController.login));

/*
GetUsers
 */
router.get('/get-all-users', authUser, handleErrorMiddleware(UserController.getAllUser));
router.get('/get-user/:id', authUser, handleErrorMiddleware(UserController.getUserById));
router.post('/update-user', authUser, handleErrorMiddleware(UserController.updateUser));
router.post('/verify-user', authUser, handleErrorMiddleware(UserController.verifyUser));

/*
Offers
 */
router.get('/get-all-offers', authUser, handleErrorMiddleware(OffersController.getAllOffers));
router.get('/get-offer/:id', authUser, handleErrorMiddleware(OffersController.getOfferById));
router.post('/update-offer-by-id', authUser, handleErrorMiddleware(OffersController.updateOfferById));
router.post('/remove-verification', authUser, handleErrorMiddleware(OffersController.removeVerification));
router.delete('/delete-offer/:id', authUser, handleErrorMiddleware(OffersController.deleteOffer));


export default router;