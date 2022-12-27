import { User } from './user';
import { Offer } from './offer';


User.hasOne(Offer, { foreignKey: 'userId' });

export const models = {
  User,
  Offer,
};

