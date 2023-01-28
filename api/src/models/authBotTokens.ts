import sequelize from '../db/connect';
import { DataTypes } from 'sequelize';

export const AuthBotTokens = sequelize.define('authBotTokens', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user: { type: DataTypes.STRING },
  token: { type: DataTypes.STRING },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, { timestamps: false });