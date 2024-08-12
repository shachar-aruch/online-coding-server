const Sequelize = require("sequelize");

try {
  require("dotenv").config();
} catch (e) {}

module.exports = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT,
    dialect: "postgres",
  }
);
