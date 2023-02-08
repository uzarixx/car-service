import { User } from './user';
import { Offer } from './offer';
import { Photo } from './photo';
import { Messages } from './messages';
import { AuthTokens } from './authTokens';
import { Chat } from './chat';
import { AvatarsPhoto } from './avatarsPhoto';
import { OfferParams } from './offerParams';
import { ForgotTokens } from './forgotTokens';
import { Favorite } from './favorite';
import { BotUser } from './botUser';
import { AuthBotTokens } from './authBotTokens';
import { Responses } from './responses';


User.hasMany(Responses, {foreignKey: 'receiverId'})
User.hasMany(Responses, {foreignKey: 'senderId'})
User.hasOne(Offer, { foreignKey: 'userId' });
User.hasMany(Photo, { foreignKey: 'userId' });
User.hasMany(AvatarsPhoto, { foreignKey: 'userId' });
User.hasMany(Favorite, { foreignKey: 'userId' });
User.hasOne(AuthTokens, { foreignKey: 'userId' });
User.hasOne(ForgotTokens, { foreignKey: 'userId' });
Offer.hasMany(OfferParams, { foreignKey: 'offerId' });
Offer.hasMany(Favorite, { foreignKey: 'offerId' });
Chat.hasMany(Messages, { foreignKey: 'chatId' });
BotUser.hasOne(User);
User.belongsTo(BotUser);

export const models = {
  User,
  Offer,
  Photo,
  Chat,
  Messages,
  AuthTokens,
  AvatarsPhoto,
  OfferParams,
  ForgotTokens,
  Favorite,
  BotUser,
  AuthBotTokens,
  Responses
};


