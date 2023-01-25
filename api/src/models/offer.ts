import sequelize from '../db/connect';
import { DataTypes } from 'sequelize';

export const Offer = sequelize.define('offer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  budget: { type: DataTypes.STRING, defaultValue: '' },
  phoneNumber: { type: DataTypes.STRING, defaultValue: '' },
  title: { type: DataTypes.STRING, defaultValue: '' },
  description: { type: DataTypes.TEXT, defaultValue: '' },
  sliceDesc: {type: DataTypes.STRING, defaultValue: ''},
  currency: {type: DataTypes.STRING, defaultValue: ''},
  userName: {type: DataTypes.STRING, defaultValue: ''},
  city: { type: DataTypes.STRING, defaultValue: '' },
  budgetService: { type: DataTypes.STRING, defaultValue: '' },
  carBrand: { type: DataTypes.STRING, defaultValue: '' },
  carModel: { type: DataTypes.STRING, defaultValue: '' },
  isVerify: {type: DataTypes.BOOLEAN, defaultValue: false}
});