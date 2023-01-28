import sequelize from '../db/connect';
import { DataTypes } from 'sequelize';

export const AuthTokens = sequelize.define('authTokens', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  token: { type: DataTypes.STRING },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, { timestamps: false });