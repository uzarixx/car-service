import sequelize from '../db/connect';
import { DataTypes } from 'sequelize';

export const Messages = sequelize.define('messages', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  chatId: {type: DataTypes.INTEGER},
  message: {type: DataTypes.STRING},
  senderId: { type: DataTypes.INTEGER }
});
