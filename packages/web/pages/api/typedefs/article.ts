import { ApolloError } from "apollo-server-micro";
import { authenticated } from "./scalars";

export const typeDef = `
  extend type Query {
    article(id: ID!): Article
    articles: [Article]
  }

  extend type Mutation {
    createdArticle(articleInput: ArticleCreateInput!): Article
    updatedArticle(articleInput: ArticleUpdateInput): Article
    
    isFavourite(articleId: ID!): Boolean

    moveArticle(id: ID!, parentId: ID): Boolean
  }

  input ArticleCreateInput {
    title: String!
    body: String
    authorId: ID
    parentId: ID
  }

  input ArticleUpdateInput {
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
    favourited: Boolean
    createdAt: Date
    updatedAt: Date
  }
`;

export const resolvers = {
  Query: {
    article: (_, { id }, { dataSources: { db } }) => db.article.findByPk(id),
    articles: authenticated((_, args, { dataSources: { db } }) =>
      db.article.findAll()
    )
  },
  Mutation: {
    createdArticle: authenticated(
      (_, { articleInput }, { dataSources: { db }, currentUserId }) =>
        db.article.create({ ...articleInput, authorId: currentUserId })
    ),
    updatedArticle: authenticated(
      (_, { articleInput }, { dataSources: { db }, currentUserId }) =>
        db.article
          .findByPk(articleInput.id)
          .then(article =>
            article.update(articleInput).then(updated =>
              db.article_modification
                .findOne({
                  where: {
                    userId: currentUserId,
                    articleId: article.dataValues.id
                  },
                  order: [["updatedAt", "DESC"]]
                })
                .then(articleModification => {
                  const updatedArticle = updated.dataValues;
                  const updatedData = {
                    userId: currentUserId,
                    articleId: updatedArticle.id,
                    title: updatedArticle.title,
                    body: updatedArticle.body,
                    authorId: updatedArticle.authorId
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
          .catch(err => {
            throw new ApolloError(err);
          })
    ),
    isFavourite: authenticated(
      (_, { articleId }, { dataSources: { db }, currentUserId }) =>
        db.favourite_article
          .findOne({
            where: { userId: currentUserId, articleId: articleId }
          })
          .then(favouriteArticle =>
            favouriteArticle
              ? favouriteArticle.destroy().then(() => false)
              : db.favourite_article
                  .create({
                    userId: currentUserId,
                    articleId: articleId
                  })
                  .then(() => true)
          )
    ),
    moveArticle: authenticated(
      (_, { id, parentId }, { dataSources: { db }, currentUserId }) =>
        id === parentId
          ? false
          : db.article.findByPk(parentId).then(parent =>
              getRootPath(parent, false).then(rootPath => {
                if (rootPath.includes(id)) return false;
                return db.article.findByPk(id).then(article => {
                  if (article.dataValues.parentId == parentId) return false;
                  return article
                    .update({ parentId: parentId })
                    .then(() => true);
                });
              })
            )
    )
  },
  Article: {
    author: article => article.getAuthor(),
    parent: article => article.getParent(),
    children: article => article.getChildren(),
    favourited: (article, args, { dataSources: { db }, currentUserId }) =>
      db.favourite_article
        .findOne({
          where: { userId: currentUserId, articleId: article.id }
        })
        .then(favouriteArticle => !!favouriteArticle),
    rootPath: article => getRootPath(article).then(path => path)
  }
};

const moment = require("moment");

const getRootPath = async (article, isSlug = true) => {
  const path = [];

  var parent = article.parentId ? article : null;

  while (parent) {
    const newParent = await parent.getParent();
    if (newParent?.dataValues) {
      const newNode = isSlug
        ? `${newParent.dataValues.title}-${newParent.dataValues.id}`
        : `${newParent.dataValues.id}`;
      path.push(newNode);
      parent = newParent;
    } else {
      parent = null;
    }
  }

  return path.reverse();
};
