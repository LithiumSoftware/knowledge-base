"use-strict";

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "tag",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  Tag.associate = function(models) {
    Tag.belongsToMany(models.article, {
      through: "article_tags",
      foreignKey: "tagId",
      as: "articles"
    });
  };

  return Tag;
};
