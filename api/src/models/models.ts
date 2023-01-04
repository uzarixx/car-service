import { User } from './user';
import { Offer } from './offer';
import { Photo } from './photo';
import { Messages } from './messages';
import {Chat} from './chat';

User.hasOne(Offer, { foreignKey: 'userId' });
User.hasMany(Photo, { foreignKey: 'userId' });
Chat.hasMany(Messages, {foreignKey: 'chatId'})
export const models = {
  User,
  Offer,
  Photo,
  Chat,
  Messages
};

