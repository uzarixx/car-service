import sequelize from '../db/connect';
import { DataTypes } from 'sequelize';

export const OfferParams = sequelize.define('offerParams', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  offerId: {type: DataTypes.INTEGER},
  carType: { type: DataTypes.STRING, defaultValue: '' },
  carTransmission: { type: DataTypes.STRING, defaultValue: '' },
  carDrive: { type: DataTypes.STRING, defaultValue: '' },
  carGas: {type: DataTypes.STRING, defaultValue: ''},
  carBrand: { type: DataTypes.STRING, defaultValue: '' },
  carModel: { type: DataTypes.STRING, defaultValue: '' },
  carYear: { type: DataTypes.STRING, defaultValue: '' },
  carLiters: {type: DataTypes.STRING, defaultValue: ''},
  carForces: {type: DataTypes.STRING, defaultValue: ''},
  city: { type: DataTypes.STRING, defaultValue: '' },
  budgetService: { type: DataTypes.STRING, defaultValue: '' },
});