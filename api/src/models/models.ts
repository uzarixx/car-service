import { User } from './user';
import { Offer } from './offer';
import { Photo } from './photo';
import { Messages } from './messages';
import { AuthTokens } from './authTokens';
import { Chat } from './chat';
import { AvatarsPhoto } from './avatarsPhoto';
import { OfferParams } from './offerParams';

User.hasOne(Offer, { foreignKey: 'userId' });
User.hasMany(Photo, { foreignKey: 'userId' });
User.hasMany(AvatarsPhoto, { foreignKey: 'userId' });
User.hasOne(AuthTokens, { foreignKey: 'userId' });
Offer.hasMany(OfferParams, { foreignKey: 'offerId' });
Chat.hasMany(Messages, { foreignKey: 'chatId' });


export const models = {
  User,
  Offer,
  Photo,
  Chat,
  Messages,
  AuthTokens,
  AvatarsPhoto,
  OfferParams,
};


