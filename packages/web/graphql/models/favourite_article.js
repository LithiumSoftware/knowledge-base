"use-strict";

module.exports = (sequelize, DataTypes) => {
  const FavouriteArticle = sequelize.define(
    "favourite_article",
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
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  FavouriteArticle.associate = function(models) {
    FavouriteArticle.belongsTo(models.user, { foreignKey: "userId" });
    FavouriteArticle.belongsTo(models.article, { foreignKey: "articleId" });
  };

  return FavouriteArticle;
};
