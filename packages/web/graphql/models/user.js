"use-strict";

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [4, 12],
            msg: "Name must be between 4 and 12 characters long."
          }
        }
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        values: ["USER", "ADMIN"]
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Email addres must be valid"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          {
            user.password =
              user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
          }
        }
      }
    }
  );

  User.associate = function(models) {
    User.hasMany(models.article, { foreignKey: "authorId", as: "articles" });
    User.belongsToMany(models.article, {
      through: "favourite_articles",
      foreignKey: "userId",
      as: "favourites"
    });
  };

  return User;
};
