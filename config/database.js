const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const environment = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${environment}` }); 


module.exports =  new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USERNAME,
  process.env.PG_PASSWORD,
  {
  dialect: 'postgres',
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
});