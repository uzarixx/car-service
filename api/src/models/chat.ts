import sequelize from '../db/connect';
import { DataTypes } from 'sequelize';

export const Chat = sequelize.define('chat', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  secondId: { type: DataTypes.INTEGER },
  lastId: { type: DataTypes.INTEGER}
});
