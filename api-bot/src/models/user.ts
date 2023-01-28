import sequelize from '../db/connect';
import { DataTypes } from 'sequelize';

export const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  userName: { type: DataTypes.STRING, defaultValue: '' },
  userLastName: { type: DataTypes.STRING, defaultValue: '' },
  city: { type: DataTypes.STRING, defaultValue: '' },
  photo: { type: DataTypes.STRING, defaultValue: '' },
  phoneNumber: { type: DataTypes.STRING, defaultValue: '' },
  role: { type: DataTypes.STRING, defaultValue: '' },
  description: { type: DataTypes.TEXT, defaultValue: ''},
  sliceDesc: {type: DataTypes.STRING, defaultValue: ''},
  experience: {type: DataTypes.STRING, defaultValue: ''},
  status: {type: DataTypes.BOOLEAN, defaultValue: false},
  verify: {type: DataTypes.BOOLEAN, defaultValue: false}
});