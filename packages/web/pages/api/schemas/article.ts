import { ApolloError } from "apollo-server-micro";
import { authenticated } from "./scalars";
import { getRootPath, moment } from "../getRoothPath";

export const typeDef = `
  extend type Query {
    article(id: ID!): Article
    articles: [Article]
  }

  extend type Mutation {
    createArticle(input: CreateInput!): Article!
    updateArticle(input: UpdateInput): Article
    
    toggleFavourite(articleId: ID!): Boolean

    moveArticle(id: ID!, parentId: ID): Boolean
  }

  input CreateInput {
    title: String!
    body: String
    authorId: ID
    parentId: ID
  }

  input UpdateInput {
    id: ID
    title: String
    body: String
    children: [ID]
  }

  type Article {
    id: ID!
    title: String!
    body: String
    author: User
    parent: Article
    children: [Article]
    rootPath: [String]
    favourited: Boolean!
    createdAt: Date
    updatedAt: Date
  }
`;

export const resolvers = {
  Query: {
    article: authenticated((_, { id }, { dataSources: { db } }) =>
      db.article.findByPk(id)
    ),
    articles: authenticated((_, args, { dataSources: { db } }) =>
      db.article.findAll({
        order: [["createdAt", "ASC"]],
      })
    ),
  },
  Mutation: {
    createArticle: authenticated(
      (_, { input }, { dataSources: { db }, currentUserId }) =>
        db.article.create({ ...input, authorId: currentUserId })
    ),
    updateArticle: authenticated(
      (_, { input }, { dataSources: { db }, currentUserId }) =>
        db.article
          .findByPk(input.id)
          .then((article) =>
            article.update(input).then((updated) =>
              db.article_modification
                .findOne({
                  where: {
                    userId: currentUserId,
                    articleId: article.dataValues.id,
                  },
                  order: [["updatedAt", "DESC"]],
                })
                .then((articleModification) => {
                  const updatedArticle = updated.dataValues;
                  const updatedData = {
                    userId: currentUserId,
                    articleId: updatedArticle.id,
                    title: updatedArticle.title,
                    body: updatedArticle.body,
                    authorId: updatedArticle.authorId,
                  };

                  if (
                    articleModification?.dataValues &&
                    moment(articleModification.dataValues.updatedAt).isSame(
                      moment(),
                      "minute"
                    )
                  ) {
                    return articleModification
                      .update(updatedData)
                      .then(() => updated);
                  } else {
                    return db.article_modification
                      .create(updatedData)
                      .then(() => updated);
                  }
                })
            )
          )
          .catch((err) => {
            throw new ApolloError(err);
          })
    ),
    toggleFavourite: authenticated(
      (_, { articleId }, { dataSources: { db }, currentUserId }) =>
        db.favourite_article
          .findOne({
            where: { userId: currentUserId, articleId: articleId },
          })
          .then((favouriteArticle) =>
            favouriteArticle
              ? favouriteArticle.destroy().then(() => false)
              : db.favourite_article
                  .create({
                    userId: currentUserId,
                    articleId: articleId,
                  })
                  .then(() => true)
          )
    ),
    moveArticle: authenticated(
      (_, { id, parentId }, { dataSources: { db }, currentUserId }) =>
        id === parentId
          ? false
          : db.article.findByPk(parentId).then((parent) =>
              getRootPath(parent, false).then((rootPath) => {
                if (rootPath.includes(id)) return false;
                return db.article.findByPk(id).then((article) => {
                  if (article.dataValues.parentId == parentId) return false;
                  return article
                    .update({ parentId: parentId })
                    .then(() => true);
                });
              })
            )
    ),
  },
  Article: {
    author: (article) => article.getAuthor(),
    parent: (article) => article.getParent(),
    children: (article) => article.getChildren(),
    favourited: (article, args, { dataSources: { db }, currentUserId }) =>
      db.favourite_article
        .findOne({
          where: { userId: currentUserId, articleId: article.id },
        })
        .then((favouriteArticle) => !!favouriteArticle),
    rootPath: (article) => getRootPath(article).then((path) => path),
  },
};
