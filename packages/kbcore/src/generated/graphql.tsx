import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
};

export type Article = {
   __typename?: 'Article';
  id: Scalars['ID'];
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  author?: Maybe<User>;
  parent?: Maybe<Article>;
  children?: Maybe<Array<Maybe<Article>>>;
  rootPath?: Maybe<Array<Maybe<Scalars['String']>>>;
  favourited?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type ArticleModification = {
   __typename?: 'ArticleModification';
  id: Scalars['ID'];
  articleId: Scalars['ID'];
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  user: User;
  author: User;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type CreateInput = {
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  authorId?: Maybe<Scalars['ID']>;
  parentId?: Maybe<Scalars['ID']>;
};


export type Mutation = {
   __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  signedUser?: Maybe<User>;
  loggedUser?: Maybe<User>;
  createArticle: Article;
  updateArticle?: Maybe<Article>;
  toggleFavourite?: Maybe<Scalars['Boolean']>;
  moveArticle?: Maybe<Scalars['Boolean']>;
};


export type MutationSignedUserArgs = {
  input: UserCreateInput;
};


export type MutationLoggedUserArgs = {
  input: UserLoginInput;
};


export type MutationCreateArticleArgs = {
  input: CreateInput;
};


export type MutationUpdateArticleArgs = {
  input?: Maybe<UpdateInput>;
};


export type MutationToggleFavouriteArgs = {
  articleId: Scalars['ID'];
};


export type MutationMoveArticleArgs = {
  id: Scalars['ID'];
  parentId?: Maybe<Scalars['ID']>;
};

export type Query = {
   __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  me?: Maybe<User>;
  article?: Maybe<Article>;
  articles?: Maybe<Array<Maybe<Article>>>;
  articleModifications?: Maybe<Array<Maybe<ArticleModification>>>;
};


export type QueryArticleArgs = {
  id: Scalars['ID'];
};


export type QueryArticleModificationsArgs = {
  id: Scalars['ID'];
};

export enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

export type UpdateInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Maybe<Scalars['ID']>>>;
};


export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  role: Role;
  articles?: Maybe<Array<Maybe<Article>>>;
  favourites?: Maybe<Array<Maybe<Article>>>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type UserLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
};

export type CreateArticleMutationVariables = {
  title: Scalars['String'];
  parentId?: Maybe<Scalars['ID']>;
};


export type CreateArticleMutation = (
  { __typename?: 'Mutation' }
  & { createArticle: (
    { __typename?: 'Article' }
    & Pick<Article, 'id' | 'title'>
  ) }
);

export type SignupMutationVariables = {
  username?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { signedUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type LoginMutationVariables = {
  identifier: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { loggedUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type MoveArticleMutationVariables = {
  id: Scalars['ID'];
  parentId: Scalars['ID'];
};


export type MoveArticleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'moveArticle'>
);

export type ToggleFavouriteMutationVariables = {
  articleId: Scalars['ID'];
};


export type ToggleFavouriteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'toggleFavourite'>
);

export type UpdateArticleMutationVariables = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
};


export type UpdateArticleMutation = (
  { __typename?: 'Mutation' }
  & { updateArticle?: Maybe<(
    { __typename?: 'Article' }
    & Pick<Article, 'updatedAt'>
  )> }
);

export type ArticlesQueryVariables = {};


export type ArticlesQuery = (
  { __typename?: 'Query' }
  & { articles?: Maybe<Array<Maybe<(
    { __typename?: 'Article' }
    & Pick<Article, 'id' | 'title'>
    & { parent?: Maybe<(
      { __typename?: 'Article' }
      & Pick<Article, 'id'>
    )> }
  )>>> }
);

export type ArticleModificationsQueryVariables = {
  id: Scalars['ID'];
};


export type ArticleModificationsQuery = (
  { __typename?: 'Query' }
  & { articleModifications?: Maybe<Array<Maybe<(
    { __typename?: 'ArticleModification' }
    & Pick<ArticleModification, 'id' | 'title' | 'body' | 'updatedAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )>>> }
);

export type ArticleQueryVariables = {
  id: Scalars['ID'];
};


export type ArticleQuery = (
  { __typename?: 'Query' }
  & { article?: Maybe<(
    { __typename?: 'Article' }
    & Pick<Article, 'id' | 'title' | 'body' | 'rootPath' | 'updatedAt'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  )> }
);

export type FavouriteArticlesQueryVariables = {
  id: Scalars['ID'];
};


export type FavouriteArticlesQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { favourites?: Maybe<Array<Maybe<(
      { __typename?: 'Article' }
      & Pick<Article, 'id' | 'title'>
      & { parent?: Maybe<(
        { __typename?: 'Article' }
        & Pick<Article, 'id'>
      )> }
    )>>> }
  )> }
);

export type SidebarArticleQueryVariables = {
  id: Scalars['ID'];
};


export type SidebarArticleQuery = (
  { __typename?: 'Query' }
  & { article?: Maybe<(
    { __typename?: 'Article' }
    & Pick<Article, 'id' | 'title' | 'favourited'>
    & { children?: Maybe<Array<Maybe<(
      { __typename?: 'Article' }
      & Pick<Article, 'id' | 'title'>
    )>>> }
  )> }
);


export const CreateArticleDocument = gql`
    mutation CreateArticle($title: String!, $parentId: ID) {
  createArticle(input: {title: $title, parentId: $parentId}) {
    id
    title
  }
}
    `;
export type CreateArticleMutationFn = ApolloReactCommon.MutationFunction<CreateArticleMutation, CreateArticleMutationVariables>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      title: // value for 'title'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useCreateArticleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument, baseOptions);
      }
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationResult = ApolloReactCommon.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($username: String, $email: String!, $password: String!) {
  signedUser(input: {username: $username, email: $email, password: $password}) {
    id
  }
}
    `;
export type SignupMutationFn = ApolloReactCommon.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, baseOptions);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = ApolloReactCommon.MutationResult<SignupMutation>;
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const LoginDocument = gql`
    mutation Login($identifier: String!, $password: String!) {
  loggedUser(input: {identifier: $identifier, password: $password}) {
    id
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      identifier: // value for 'identifier'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MoveArticleDocument = gql`
    mutation MoveArticle($id: ID!, $parentId: ID!) {
  moveArticle(id: $id, parentId: $parentId)
}
    `;
export type MoveArticleMutationFn = ApolloReactCommon.MutationFunction<MoveArticleMutation, MoveArticleMutationVariables>;

/**
 * __useMoveArticleMutation__
 *
 * To run a mutation, you first call `useMoveArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveArticleMutation, { data, loading, error }] = useMoveArticleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useMoveArticleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MoveArticleMutation, MoveArticleMutationVariables>) {
        return ApolloReactHooks.useMutation<MoveArticleMutation, MoveArticleMutationVariables>(MoveArticleDocument, baseOptions);
      }
export type MoveArticleMutationHookResult = ReturnType<typeof useMoveArticleMutation>;
export type MoveArticleMutationResult = ApolloReactCommon.MutationResult<MoveArticleMutation>;
export type MoveArticleMutationOptions = ApolloReactCommon.BaseMutationOptions<MoveArticleMutation, MoveArticleMutationVariables>;
export const ToggleFavouriteDocument = gql`
    mutation ToggleFavourite($articleId: ID!) {
  toggleFavourite(articleId: $articleId)
}
    `;
export type ToggleFavouriteMutationFn = ApolloReactCommon.MutationFunction<ToggleFavouriteMutation, ToggleFavouriteMutationVariables>;

/**
 * __useToggleFavouriteMutation__
 *
 * To run a mutation, you first call `useToggleFavouriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleFavouriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleFavouriteMutation, { data, loading, error }] = useToggleFavouriteMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useToggleFavouriteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToggleFavouriteMutation, ToggleFavouriteMutationVariables>) {
        return ApolloReactHooks.useMutation<ToggleFavouriteMutation, ToggleFavouriteMutationVariables>(ToggleFavouriteDocument, baseOptions);
      }
export type ToggleFavouriteMutationHookResult = ReturnType<typeof useToggleFavouriteMutation>;
export type ToggleFavouriteMutationResult = ApolloReactCommon.MutationResult<ToggleFavouriteMutation>;
export type ToggleFavouriteMutationOptions = ApolloReactCommon.BaseMutationOptions<ToggleFavouriteMutation, ToggleFavouriteMutationVariables>;
export const UpdateArticleDocument = gql`
    mutation UpdateArticle($id: ID, $title: String, $body: String) {
  updateArticle(input: {id: $id, title: $title, body: $body}) {
    updatedAt
  }
}
    `;
export type UpdateArticleMutationFn = ApolloReactCommon.MutationFunction<UpdateArticleMutation, UpdateArticleMutationVariables>;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useUpdateArticleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateArticleMutation, UpdateArticleMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleDocument, baseOptions);
      }
export type UpdateArticleMutationHookResult = ReturnType<typeof useUpdateArticleMutation>;
export type UpdateArticleMutationResult = ApolloReactCommon.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables>;
export const ArticlesDocument = gql`
    query Articles {
  articles {
    id
    title
    parent {
      id
    }
  }
}
    `;

/**
 * __useArticlesQuery__
 *
 * To run a query within a React component, call `useArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useArticlesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
        return ApolloReactHooks.useQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, baseOptions);
      }
export function useArticlesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, baseOptions);
        }
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<typeof useArticlesLazyQuery>;
export type ArticlesQueryResult = ApolloReactCommon.QueryResult<ArticlesQuery, ArticlesQueryVariables>;
export const ArticleModificationsDocument = gql`
    query ArticleModifications($id: ID!) {
  articleModifications(id: $id) {
    id
    user {
      id
      username
    }
    title
    body
    author {
      id
      username
    }
    updatedAt
  }
}
    `;

/**
 * __useArticleModificationsQuery__
 *
 * To run a query within a React component, call `useArticleModificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleModificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleModificationsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArticleModificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ArticleModificationsQuery, ArticleModificationsQueryVariables>) {
        return ApolloReactHooks.useQuery<ArticleModificationsQuery, ArticleModificationsQueryVariables>(ArticleModificationsDocument, baseOptions);
      }
export function useArticleModificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ArticleModificationsQuery, ArticleModificationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ArticleModificationsQuery, ArticleModificationsQueryVariables>(ArticleModificationsDocument, baseOptions);
        }
export type ArticleModificationsQueryHookResult = ReturnType<typeof useArticleModificationsQuery>;
export type ArticleModificationsLazyQueryHookResult = ReturnType<typeof useArticleModificationsLazyQuery>;
export type ArticleModificationsQueryResult = ApolloReactCommon.QueryResult<ArticleModificationsQuery, ArticleModificationsQueryVariables>;
export const ArticleDocument = gql`
    query Article($id: ID!) {
  article(id: $id) {
    id
    title
    body
    rootPath
    author {
      id
      username
    }
    updatedAt
  }
}
    `;

/**
 * __useArticleQuery__
 *
 * To run a query within a React component, call `useArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArticleQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
        return ApolloReactHooks.useQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, baseOptions);
      }
export function useArticleLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, baseOptions);
        }
export type ArticleQueryHookResult = ReturnType<typeof useArticleQuery>;
export type ArticleLazyQueryHookResult = ReturnType<typeof useArticleLazyQuery>;
export type ArticleQueryResult = ApolloReactCommon.QueryResult<ArticleQuery, ArticleQueryVariables>;
export const FavouriteArticlesDocument = gql`
    query FavouriteArticles($id: ID!) {
  me {
    id
    favourites {
      id
      title
      parent {
        id
      }
    }
  }
}
    `;

/**
 * __useFavouriteArticlesQuery__
 *
 * To run a query within a React component, call `useFavouriteArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavouriteArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavouriteArticlesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFavouriteArticlesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FavouriteArticlesQuery, FavouriteArticlesQueryVariables>) {
        return ApolloReactHooks.useQuery<FavouriteArticlesQuery, FavouriteArticlesQueryVariables>(FavouriteArticlesDocument, baseOptions);
      }
export function useFavouriteArticlesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FavouriteArticlesQuery, FavouriteArticlesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FavouriteArticlesQuery, FavouriteArticlesQueryVariables>(FavouriteArticlesDocument, baseOptions);
        }
export type FavouriteArticlesQueryHookResult = ReturnType<typeof useFavouriteArticlesQuery>;
export type FavouriteArticlesLazyQueryHookResult = ReturnType<typeof useFavouriteArticlesLazyQuery>;
export type FavouriteArticlesQueryResult = ApolloReactCommon.QueryResult<FavouriteArticlesQuery, FavouriteArticlesQueryVariables>;
export const SidebarArticleDocument = gql`
    query SidebarArticle($id: ID!) {
  article(id: $id) {
    id
    title
    favourited
    children {
      id
      title
    }
  }
}
    `;

/**
 * __useSidebarArticleQuery__
 *
 * To run a query within a React component, call `useSidebarArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useSidebarArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSidebarArticleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSidebarArticleQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SidebarArticleQuery, SidebarArticleQueryVariables>) {
        return ApolloReactHooks.useQuery<SidebarArticleQuery, SidebarArticleQueryVariables>(SidebarArticleDocument, baseOptions);
      }
export function useSidebarArticleLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SidebarArticleQuery, SidebarArticleQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SidebarArticleQuery, SidebarArticleQueryVariables>(SidebarArticleDocument, baseOptions);
        }
export type SidebarArticleQueryHookResult = ReturnType<typeof useSidebarArticleQuery>;
export type SidebarArticleLazyQueryHookResult = ReturnType<typeof useSidebarArticleLazyQuery>;
export type SidebarArticleQueryResult = ApolloReactCommon.QueryResult<SidebarArticleQuery, SidebarArticleQueryVariables>;