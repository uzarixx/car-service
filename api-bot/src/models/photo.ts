import sequelize from '../db/connect';
import { DataTypes } from 'sequelize';

export const Photo = sequelize.define('photo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  secure_url: { type: DataTypes.STRING },
  public_id: { type: DataTypes.STRING},
});