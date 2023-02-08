import sequelize from '../db/connect';
import { DataTypes } from 'sequelize';

export const Responses = sequelize.define('responses', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  senderId: { type: DataTypes.INTEGER },
  receiverId: { type: DataTypes.INTEGER },
  expires: {type: DataTypes.DATE}
});