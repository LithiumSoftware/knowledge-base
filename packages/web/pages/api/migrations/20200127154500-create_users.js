"use strict";
const { QueryTypes } = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        validate: {
          len: {
            args: [4, 12],
            msg: "Name must be between 4 and 12 characters long."
          }
        }
      },
      role: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ["USER", "ADMIN"]
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users", {
      cascade: true
    });
  }
};
