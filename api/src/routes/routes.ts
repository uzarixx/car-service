import { Router } from 'express';
import {
  AuthController,
  UserController,
  OfferController,
} from '../controllers';
import authUser from '../middlewares/authMiddlewate';
import {
  pickerChangePortfolioValidate,
  validationCreateOffer,
  validationLogin,
  validationSignUp, validationUserSettings,
} from '../service/validateParams';
import { CheckRoleMiddleware } from '../middlewares/checkRoleMiddlewate';
import handleErrorMiddleware from '../middlewares/handleErrorMiddleware';

const router = Router();

/*
Authorization
 */

router.post('/signup', ...validationSignUp, handleErrorMiddleware(AuthController.signUp));
router.post('/login', ...validationLogin, handleErrorMiddleware(AuthController.login));
router.get('/auth-user', authUser, handleErrorMiddleware(AuthController.authUser));

/*
User
 */

router.patch('/user-info-settings', ...validationUserSettings, authUser, handleErrorMiddleware(UserController.userInfoSettings));
router.patch('/picker-change-portfolio', ...pickerChangePortfolioValidate, authUser, CheckRoleMiddleware('Picker'), handleErrorMiddleware(UserController.pickerChangePortfolio));
router.get('/get-all-pickers', authUser, CheckRoleMiddleware('Client'), handleErrorMiddleware(UserController.getAllPickers));
router.get('/get-picker-id/:id', authUser, CheckRoleMiddleware('Client'), handleErrorMiddleware(UserController.getPickerById))


/*
Offers
 */

router.delete('/offer-delete', authUser, handleErrorMiddleware(OfferController.offerDelete));
router.post('/offer-new-create', authUser, ...validationCreateOffer, handleErrorMiddleware(OfferController.createOffer));
router.get('/offer-get-id/:id', authUser, handleErrorMiddleware(OfferController.getOfferById));
router.get('/offer-get-all', CheckRoleMiddleware('Picker'), handleErrorMiddleware(OfferController.getAllOffers));
router.get('/offer-get-client', CheckRoleMiddleware('Client'), authUser, handleErrorMiddleware(OfferController.getOffers));

export default router;