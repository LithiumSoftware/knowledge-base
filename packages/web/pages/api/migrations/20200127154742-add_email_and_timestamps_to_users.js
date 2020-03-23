"use strict";
const { QueryTypes } = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface
          .addColumn(
            "users",
            "email",
            {
              type: Sequelize.STRING,
              unique: true,
              validate: {
                isEmail: {
                  msg: "Email addres must be valid"
                }
              }
            },
            { transaction: t }
          )
          .then(data => {
            queryInterface.sequelize.query(
              `UPDATE users SET email = CONCAT(id, '@lithium.com') WHERE email IS NULL;`,
              {
                type: QueryTypes.UPDATE
              }
            );
          })
          .then(data => {
            queryInterface.changeColumn("users", "email", {
              type: Sequelize.STRING,
              allowNull: false
            });
          }),

        queryInterface
          .addColumn(
            "users",
            "password",
            {
              type: Sequelize.STRING
            },
            { transaction: t }
          )
          .then(data => {
            queryInterface.sequelize.query(
              "UPDATE users SET password = CONCAT('examplePw', id) WHERE password IS NULL;",
              {
                type: QueryTypes.UPDATE
              }
            );
          })
          .then(data => {
            queryInterface.changeColumn("users", "password", {
              type: Sequelize.STRING,
              allowNull: false
            });
          }),
        queryInterface.addColumn(
          "users",
          "createdAt",
          { type: Sequelize.DATE },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "users",
          "updatedAt",
          { type: Sequelize.DATE },
          { transaction: t }
        )
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("users", "email", { transaction: t }),
        queryInterface.removeColumn("users", "password", { transaction: t }),
        queryInterface.removeColumn("users", "createdAt", { transaction: t }),
        queryInterface.removeColumn("users", "updatedAt", { transaction: t })
      ]);
    });
  }
};
