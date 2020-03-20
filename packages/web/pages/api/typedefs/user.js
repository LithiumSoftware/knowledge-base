import { UserInputError } from "apollo-server-micro";
import { Op } from "sequelize";

export const typeDef = `
  extend type Query {
    verifiedUser: User
  }

  extend type Mutation {
    signedUser(userInput: UserCreateInput!): User
    loggedUser(userInput: UserLoginInput!): User
  }

  input UserLoginInput {
    identifier: String!
    password: String!
  }

  input UserCreateInput {
    email: String!
    username: String
    password: String!
  }

  type User {
    id: ID!
    username: String
    email: String!
    role: Role!
    articles: [Article]
    favourites: [Article]
    createdAt: Date
    updatedAt: Date
  }

  enum Role {
    USER
    ADMIN
  }
`;

export const resolvers = {
  Query: {
    verifiedUser: (_, _, { dataSources: { db }, currentUserId }) =>
      db.user.findByPk(currentUserId)
  },
  Mutation: {
    signedUser: (_, { userInput }, { dataSources: { db }, res }) =>
      db.user
        .create({ ...userInput, role: "USER" })
        .then(user => {
          const tokens = setTokens(user);
          res.setHeader("Set-Cookie", `token=${tokens.accessToken}; httpOnly`);
          return user;
        })
        .catch(err => {
          throw new UserInputError(
            "There's already an account with this email"
          );
        }),
    loggedUser: (
      _,
      { userInput: { identifier, password } },
      { dataSources: { db }, res }
    ) =>
      db.user
        .findOne({
          where: { [Op.or]: [{ username: identifier }, { email: identifier }] }
        })
        .then(user => {
          if (user) {
            if (bcrypt.compareSync(password, user.password)) {
              const tokens = setTokens(user);
              res.setHeader(
                "Set-Cookie",
                `token=${tokens.accessToken}; httpOnly`
              );
              return user;
            } else {
              throw null;
            }
          } else {
            throw null;
          }
        })
        .catch(err => {
          if (err.errors[0].message.includes("username")) {
            return dataBase.Users.findOne({
              where: { email: email }
            }).then(user => {
              const message =
                user && user.dataValues
                  ? "Both username and email address are already in use."
                  : "Username is already in use.";
              throw new UserInputError(message);
            });
          } else {
            throw new UserInputError("Email address is already in use.");
          }
        })
  },
  User: {
    articles: user => user.getArticles(),
    favourites: user => user.getFavourites()
  }
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "supersecret";

const setTokens = ({ dataValues: { id, email } }) => {
  const sevenDays = 60 * 60 * 24 * 7 * 1000;
  const fifteenMins = 60 * 15 * 1000;
  const accessUser = {
    id: id
  };

  const accessToken = jwt.sign({ user: accessUser }, secret, {
    expiresIn: fifteenMins
  });

  const refreshUser = {
    id: id
  };

  const refreshToken = jwt.sign({ user: refreshUser }, secret, {
    expiresIn: sevenDays
  });

  return { accessToken, refreshToken };
};
