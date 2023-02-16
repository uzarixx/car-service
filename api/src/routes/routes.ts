import { Router } from 'express';
import multer from 'multer';
import {
  AuthController,
  UserController,
  OfferController,
} from '../controllers';
import authUser from '../middlewares/authMiddlewate';
import {
  chatCreateValidate, createMessageValidate,
  pickerChangePortfolioValidate,
  validationCreateOffer,
  validationLogin,
  validationSignUp, validationUserSettings,
} from '../service/validateParams';
import { CheckRoleMiddleware } from '../middlewares/checkRoleMiddlewate';
import handleErrorMiddleware from '../middlewares/handleErrorMiddleware';
import ChatController from '../controllers/chat';
import UserActivateController from '../controllers/userActivate';
import UserAvatarController from '../controllers/userAvatar';
import UserForgot from '../controllers/userForgot';
import FavoriteController from '../controllers/favorite';
import ResponsesController from '../controllers/responses';

const storage = multer.memoryStorage();
const multerUpload = multer({ storage });
const router = Router();

/*
Authorization
 */

router.post('/signup', ...validationSignUp, handleErrorMiddleware(AuthController.signUp));
router.post('/login', ...validationLogin, handleErrorMiddleware(AuthController.login));
router.get('/auth-user', authUser, handleErrorMiddleware(AuthController.authUser));

/*
UserActivate
 */
router.get('/create-activate-token', authUser, handleErrorMiddleware(UserActivateController.createActivateToken));
router.get('/user-activated/:token', authUser, handleErrorMiddleware(UserActivateController.userActivate));


/*
UserForgot
 */

router.post('/create-forgot-token', handleErrorMiddleware(UserForgot.createForgotToken));
router.post('/update-user-password/:token', handleErrorMiddleware(UserForgot.resetPassword));
router.post('/update-password', authUser, handleErrorMiddleware(UserForgot.updatePassword));
router.get('/verify-forgot-token/:token', handleErrorMiddleware(UserForgot.verifyForgotToken));


/*
User
 */
router.patch('/user-info-settings', ...validationUserSettings, authUser, handleErrorMiddleware(UserController.userInfoSettings));
router.patch('/picker-change-portfolio', ...pickerChangePortfolioValidate, authUser, CheckRoleMiddleware('Picker'), multerUpload.array('image'), handleErrorMiddleware(UserController.pickerChangePortfolio));
router.delete('/delete-picker-portfolio-images', CheckRoleMiddleware('Picker'), handleErrorMiddleware(UserController.deletePickerPortfolioImages));
router.get('/picker-portfolio-images', authUser, CheckRoleMiddleware('Picker'), handleErrorMiddleware(UserController.pickerPortfolioImages));
router.get('/get-all-pickers', handleErrorMiddleware(UserController.getAllPickers));
router.get('/get-picker-id/:id', handleErrorMiddleware(UserController.getPickerById));
router.get('/telegram-activate', authUser, handleErrorMiddleware(UserController.telegramActivate));
router.get('/telegram-notifications', authUser, handleErrorMiddleware(UserController.telegramNotifications));


/*
UserAvatar
 */
router.post('/user-upload-avatar', authUser, multerUpload.single('image'), handleErrorMiddleware(UserAvatarController.uploadAvatar));
router.delete('/user-delete-avatar', authUser, handleErrorMiddleware(UserAvatarController.deleteAvatar));


/*
Offers
 */
router.delete('/offer-delete', authUser, handleErrorMiddleware(OfferController.offerDelete));
router.post('/offer-new-create', authUser, ...validationCreateOffer, handleErrorMiddleware(OfferController.createOffer));
router.get('/offer-get-id/:id', handleErrorMiddleware(OfferController.getOfferById));
router.get('/offer-get-all', handleErrorMiddleware(OfferController.getAllOffers));
router.get('/offer-get-client', authUser, handleErrorMiddleware(OfferController.getOffers));


/*
Favorite
 */
router.post('/create-favorite', authUser, CheckRoleMiddleware('Picker'), handleErrorMiddleware(FavoriteController.createFavorite));
router.delete('/delete-favorite', authUser, CheckRoleMiddleware('Picker'), handleErrorMiddleware(FavoriteController.deleteFavorite));
router.get('/get-favorites-id', authUser, CheckRoleMiddleware('Picker'), handleErrorMiddleware(FavoriteController.getFavoritesId));
router.get('/get-favorites', authUser, CheckRoleMiddleware('Picker'), handleErrorMiddleware(FavoriteController.getAllFavorites));

/*
Chat
 */
router.post('/new-chat-create', authUser, ...chatCreateValidate, handleErrorMiddleware(ChatController.createChat));
router.post('/new-message', authUser, ...createMessageValidate, handleErrorMiddleware(ChatController.createMessage));
router.get('/get-messages/:chatId', authUser, handleErrorMiddleware(ChatController.getMessage));
router.get('/get-chat/:chatId', authUser, handleErrorMiddleware(ChatController.getChat));
router.get('/get-chats', authUser, handleErrorMiddleware(ChatController.getChats));

/*
Responses
 */
router.get('/get-all-responses', authUser, handleErrorMiddleware(ResponsesController.getAllResponses));

export default router;