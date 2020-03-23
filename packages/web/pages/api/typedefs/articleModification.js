import { authenticated } from "./scalars";

export const typeDef = `
  extend type Query {
    articleModifications(id: ID!): [ArticleModification]
  }

  type ArticleModification {
    id: ID!
    articleId: ID!
    title: String!
    body: String
    user: User!
    author: User!
    createdAt: Date
    updatedAt: Date
  }
`;

export const resolvers = {
  Query: {
    articleModifications: authenticated((_, { id }, { dataSources: { db } }) =>
      db.article_modification.findAll({
        where: { articleId: id },
        order: [["updatedAt", "DESC"]]
      })
    )
  },

  ArticleModification: {
    user: articleModification => articleModification.getUser(),
    author: articleModification => articleModification.getAuthor()
  }
};
