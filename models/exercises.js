const Sequelize = require("sequelize");
const db = require("../config/database");
const exercise = db.define("exercises", {
  id: {
    type: Sequelize.NUMBER,
    allowNull: false,
    primaryKey: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  solution: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = exercise;
