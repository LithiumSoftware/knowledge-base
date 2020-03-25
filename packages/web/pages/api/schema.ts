import { merge } from "lodash";

import { typeDef as User, resolvers as userRes } from "./schemas/user";
import { typeDef as Article, resolvers as articleRes } from "./schemas/article";
import {
  typeDef as ArticleModification,
  resolvers as articleModificationRes,
} from "./schemas/articleModification";
import { typeDef as Scalars, resolvers as scalarsRes } from "./schemas/scalars";

export const typeDefs = [
  Scalars,
  User,
  Article,
  ArticleModification
];
export const resolvers = merge(
  scalarsRes,
  userRes,
  articleRes,
  articleModificationRes
);
