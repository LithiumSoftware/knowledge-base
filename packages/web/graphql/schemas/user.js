import { UserInputError } from "apollo-server-micro";
import { Op } from "sequelize";

export const typeDef = `
  extend type Query {
    me: User
  }

  extend type Mutation {
    signedUser(input: UserCreateInput!): User
    loggedUser(input: UserLoginInput!): User
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
    me: (root, args, { db, currentUserId }) => db.user.findByPk(currentUserId),
  },
  Mutation: {
    signedUser: (_, { input }, { db, res }) =>
      db.user
        .create({
          ...input,
          role: "USER",
        })
        .then((user) => {
          const tokens = setTokens(user);
          res.setHeader("Set-Cookie", `token=${tokens.accessToken}; httpOnly`);
          return user;
        })
        .catch((err) => {
          if (err.errors[0].message.includes("username")) {
            return db.user
              .findOne({
                where: { email: input.email },
              })
              .then((user) => {
                const message =
                  user && user.dataValues
                    ? "Both username and email address are already in use."
                    : "Username is already in use.";
                throw new UserInputError(message);
              });
          } else {
            throw new UserInputError("Email address is already in use.");
          }
        }),
    loggedUser: (_, { input: { identifier, password } }, { db, res }) =>
      db.user
        .findOne({
          where: { [Op.or]: [{ username: identifier }, { email: identifier }] },
        })
        .then((user) => {
          if (!user || !user.dataValues) {
            throw new UserInputError(
              "The username or email address is not registered."
            );
          }
          if (!bcrypt.compareSync(password, user.dataValues.password)) {
            throw new UserInputError("Incorrect password.");
          }
          const tokens = setTokens(user);
          res.setHeader("Set-Cookie", `token=${tokens.accessToken}; httpOnly`);
          return user;
        })
        .catch((err) => {
          throw new UserInputError("Username or email isn't registered.");
        }),
  },
  User: {
    articles: (user) => user.getArticles(),
    favourites: (user) => user.getFavourites(),
  },
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "supersecret";

const setTokens = ({ dataValues: { id, email } }) => {
  const sevenDays = 60 * 60 * 24 * 7 * 1000;
  const fifteenMins = 60 * 15 * 1000;
  const accessUser = {
    id: id,
  };

  const accessToken = jwt.sign({ user: accessUser }, secret, {
    expiresIn: fifteenMins,
  });

  const refreshUser = {
    id: id,
  };

  const refreshToken = jwt.sign({ user: refreshUser }, secret, {
    expiresIn: sevenDays,
  });

  return { accessToken, refreshToken };
};
