const dotenv = require("dotenv");

dotenv.config();
// To get the variables from the dotenv file by using "process.env.VARIABLE_NAME"
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERPASS,
  process.env.USERPASS,
  {
    host: process.env.HOST,
    dialect:
      "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
    logging: false,
  }
);

module.exports = sequelize;
