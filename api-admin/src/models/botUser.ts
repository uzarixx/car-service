import sequelize from '../db/connect';
import { DataTypes } from 'sequelize';

export const BotUser = sequelize.define('botUser', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING, unique: true },
});