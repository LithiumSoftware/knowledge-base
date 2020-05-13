"use-strict";

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "article",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true
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
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "articles",
          key: "id"
        }
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  Article.associate = function(models) {
    Article.belongsTo(models.user, { foreignKey: "authorId", as: "author" });
    Article.belongsTo(models.article, {
      foreignKey: "parentId",
      as: "parent"
    });
    Article.hasMany(models.article, {
      foreignKey: "parentId",
      as: "children"
    });
    Article.hasMany(models.article_modification, {
      foreignKey: "articleId",
      as: "modifications"
    });
    Article.belongsToMany(models.tag, {
      through: "article_tags",
      foreignKey: "articleId"
    });
    Article.belongsToMany(models.user, {
      through: "favourite_articles",
      foreignKey: "articleId"
    });
  };

  return Article;
};
