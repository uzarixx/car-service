import sequelize from '../db/connect';
import { DataTypes } from 'sequelize';

export const Favorite = sequelize.define('favorite', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  offerId: { type: DataTypes.INTEGER },
}, { timestamps: true });