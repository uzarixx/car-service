import sequelize from '../db/connect';
import { DataTypes } from 'sequelize';

export const AvatarsPhoto = sequelize.define('avatarsPhoto', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  secure_url: { type: DataTypes.STRING },
  public_id: { type: DataTypes.STRING},
});