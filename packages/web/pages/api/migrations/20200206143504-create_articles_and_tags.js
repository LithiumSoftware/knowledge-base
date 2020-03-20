"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable(
          "articles",
          {
            id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
              allowNull: false
            },
            title: {
              type: Sequelize.STRING,
              allowNull: false
            },
            icon: {
              type: Sequelize.STRING,
              allowNull: true
            },
            body: {
              type: Sequelize.TEXT,
              allowNull: true
            },
            authorId: {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: {
                model: "users",
                key: "id"
              }
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
          },
          { transaction: t }
        ),
        queryInterface.createTable(
          "tags",
          {
            id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
              allowNull: false
            },
            name: {
              type: Sequelize.STRING,
              allowNull: false
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
          },
          { transaction: t }
        ),
        queryInterface.createTable(
          "article_tags",
          {
            id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
              allowNull: false
            },
            articleId: {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: {
                model: "articles",
                key: "id"
              }
            },
            tagId: {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: {
                model: "tags",
                key: "id"
              }
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
          },
          { transaction: t }
        )
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable("article_tags", { transaction: t }),
        queryInterface.dropTable("articles", { transaction: t }),
        queryInterface.dropTable("tags", { transaction: t })
      ]);
    });
  }
};
