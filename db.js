const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:qqq@localhost:5432/workoutlog"
);

module.exports = sequelize;
