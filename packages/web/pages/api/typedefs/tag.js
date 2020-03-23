export const typeDef = `
  type Tag {
    id: ID!
    name: String!
    articles: [Article]
    createdAt: Date
    updatedAt: Date
  }
`;

export const resolvers = {
  Tag: {
    articles: tag => tag.getArticles()
  }
};
