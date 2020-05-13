"use-strict";

module.exports = (sequelize, DataTypes) => {
  const ArticleModification = sequelize.define(
    "article_modification",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
      },
      articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "articles",
          key: "id"
        }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  ArticleModification.associate = function(models) {
    ArticleModification.belongsTo(models.user, { foreignKey: "userId" });
    ArticleModification.belongsTo(models.user, {
      foreignKey: "authorId",
      as: "author"
    });
    ArticleModification.belongsTo(models.article, { foreignKey: "articleId" });
  };

  return ArticleModification;
};
