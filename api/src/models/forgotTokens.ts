import sequelize from '../db/connect';
import { DataTypes } from 'sequelize';

export const ForgotTokens = sequelize.define('forgotTokens', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  token: { type: DataTypes.STRING },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Date.now() + 1000 * 60 * 5,
  },
}, { timestamps: false });