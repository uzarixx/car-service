import {Sequelize} from "sequelize";

export default module.exports = new Sequelize(
  'CarSevice',
  'postgres',
  'rootroot',
  {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    logging: false,
  },
);