import { merge } from "lodash";

import { typeDef as User, resolvers as userRes } from "./typedefs/user";
import {
  typeDef as Article,
  resolvers as articleRes
} from "./typedefs/article";
import {
  typeDef as ArticleModification,
  resolvers as articleModificationRes
} from "./typedefs/articleModification";
import {
  typeDef as Scalars,
  resolvers as scalarsRes
} from "./typedefs/scalars";

export const typeDefs = [Scalars, User, Article, ArticleModification];
export const resolvers = merge(
  scalarsRes,
  userRes,
  articleRes,
  articleModificationRes
);
