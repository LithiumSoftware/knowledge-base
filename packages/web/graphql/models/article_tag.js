"use-strict";

module.exports = (sequelize, DataTypes) => {
  const ArticleTag = sequelize.define(
    "article_tag",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "articles",
          key: "id"
        }
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tags",
          key: "id"
        }
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  ArticleTag.associate = function(models) {
    ArticleTag.belongsTo(models.article, { foreignKey: "articleId" });
    ArticleTag.belongsTo(models.tag, { foreignKey: "tagId" });
  };

  return ArticleTag;
};
