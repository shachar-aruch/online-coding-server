const Sequelize = require("sequelize");
require("dotenv").config();

console.log(
  "DB -" +
    process.env.POSTGRES_DB +
    " User -" +
    process.env.POSTGRES_USER +
    " Password -" +
    process.env.POSTGRES_PASSWORD +
    " URL -" +
    process.env.DATABASE_URL
);

module.exports = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.DATABASE_URL,
    dialect: "postgres",
  }
);
