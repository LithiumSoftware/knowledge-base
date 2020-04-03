var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from 'graphql-tag';
import * as ApolloReactHooks from '@apollo/react-hooks';
export var CacheControlScope;
(function (CacheControlScope) {
    CacheControlScope["Public"] = "PUBLIC";
    CacheControlScope["Private"] = "PRIVATE";
})(CacheControlScope || (CacheControlScope = {}));
export var Role;
(function (Role) {
    Role["User"] = "USER";
    Role["Admin"] = "ADMIN";
})(Role || (Role = {}));
export var CreateArticleDocument = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation CreateArticle($title: String!, $parentId: ID) {\n  createArticle(input: {title: $title, parentId: $parentId}) {\n    id\n    title\n  }\n}\n    "], ["\n    mutation CreateArticle($title: String!, $parentId: ID) {\n  createArticle(input: {title: $title, parentId: $parentId}) {\n    id\n    title\n  }\n}\n    "])));
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
export function useCreateArticleMutation(baseOptions) {
    return ApolloReactHooks.useMutation(CreateArticleDocument, baseOptions);
}
export var SignupDocument = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    mutation Signup($username: String, $email: String!, $password: String!) {\n  signedUser(input: {username: $username, email: $email, password: $password}) {\n    id\n  }\n}\n    "], ["\n    mutation Signup($username: String, $email: String!, $password: String!) {\n  signedUser(input: {username: $username, email: $email, password: $password}) {\n    id\n  }\n}\n    "])));
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
export function useSignupMutation(baseOptions) {
    return ApolloReactHooks.useMutation(SignupDocument, baseOptions);
}
export var LoginDocument = gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    mutation Login($identifier: String!, $password: String!) {\n  loggedUser(input: {identifier: $identifier, password: $password}) {\n    id\n  }\n}\n    "], ["\n    mutation Login($identifier: String!, $password: String!) {\n  loggedUser(input: {identifier: $identifier, password: $password}) {\n    id\n  }\n}\n    "])));
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
export function useLoginMutation(baseOptions) {
    return ApolloReactHooks.useMutation(LoginDocument, baseOptions);
}
export var MoveArticleDocument = gql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    mutation MoveArticle($id: ID!, $parentId: ID!) {\n  moveArticle(id: $id, parentId: $parentId)\n}\n    "], ["\n    mutation MoveArticle($id: ID!, $parentId: ID!) {\n  moveArticle(id: $id, parentId: $parentId)\n}\n    "])));
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
export function useMoveArticleMutation(baseOptions) {
    return ApolloReactHooks.useMutation(MoveArticleDocument, baseOptions);
}
export var ToggleFavouriteDocument = gql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    mutation ToggleFavourite($articleId: ID!) {\n  toggleFavourite(articleId: $articleId)\n}\n    "], ["\n    mutation ToggleFavourite($articleId: ID!) {\n  toggleFavourite(articleId: $articleId)\n}\n    "])));
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
export function useToggleFavouriteMutation(baseOptions) {
    return ApolloReactHooks.useMutation(ToggleFavouriteDocument, baseOptions);
}
export var UpdateArticleDocument = gql(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    mutation UpdateArticle($id: ID, $title: String, $body: String) {\n  updateArticle(input: {id: $id, title: $title, body: $body}) {\n    updatedAt\n  }\n}\n    "], ["\n    mutation UpdateArticle($id: ID, $title: String, $body: String) {\n  updateArticle(input: {id: $id, title: $title, body: $body}) {\n    updatedAt\n  }\n}\n    "])));
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
export function useUpdateArticleMutation(baseOptions) {
    return ApolloReactHooks.useMutation(UpdateArticleDocument, baseOptions);
}
export var ArticlesDocument = gql(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    query Articles {\n  articles {\n    id\n    title\n    parent {\n      id\n    }\n  }\n}\n    "], ["\n    query Articles {\n  articles {\n    id\n    title\n    parent {\n      id\n    }\n  }\n}\n    "])));
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
export function useArticlesQuery(baseOptions) {
    return ApolloReactHooks.useQuery(ArticlesDocument, baseOptions);
}
export function useArticlesLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(ArticlesDocument, baseOptions);
}
export var ArticleModificationsDocument = gql(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    query ArticleModifications($id: ID!) {\n  articleModifications(id: $id) {\n    id\n    user {\n      id\n      username\n    }\n    title\n    body\n    author {\n      id\n      username\n    }\n    updatedAt\n  }\n}\n    "], ["\n    query ArticleModifications($id: ID!) {\n  articleModifications(id: $id) {\n    id\n    user {\n      id\n      username\n    }\n    title\n    body\n    author {\n      id\n      username\n    }\n    updatedAt\n  }\n}\n    "])));
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
export function useArticleModificationsQuery(baseOptions) {
    return ApolloReactHooks.useQuery(ArticleModificationsDocument, baseOptions);
}
export function useArticleModificationsLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(ArticleModificationsDocument, baseOptions);
}
export var ArticleDocument = gql(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    query Article($id: ID!) {\n  article(id: $id) {\n    id\n    title\n    body\n    rootPath\n    author {\n      id\n      username\n    }\n    updatedAt\n  }\n}\n    "], ["\n    query Article($id: ID!) {\n  article(id: $id) {\n    id\n    title\n    body\n    rootPath\n    author {\n      id\n      username\n    }\n    updatedAt\n  }\n}\n    "])));
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
export function useArticleQuery(baseOptions) {
    return ApolloReactHooks.useQuery(ArticleDocument, baseOptions);
}
export function useArticleLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(ArticleDocument, baseOptions);
}
export var FavouriteArticlesDocument = gql(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    query FavouriteArticles($id: ID!) {\n  me {\n    id\n    favourites {\n      id\n      title\n      parent {\n        id\n      }\n    }\n  }\n}\n    "], ["\n    query FavouriteArticles($id: ID!) {\n  me {\n    id\n    favourites {\n      id\n      title\n      parent {\n        id\n      }\n    }\n  }\n}\n    "])));
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
export function useFavouriteArticlesQuery(baseOptions) {
    return ApolloReactHooks.useQuery(FavouriteArticlesDocument, baseOptions);
}
export function useFavouriteArticlesLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(FavouriteArticlesDocument, baseOptions);
}
export var SidebarArticleDocument = gql(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    query SidebarArticle($id: ID!) {\n  article(id: $id) {\n    id\n    title\n    favourited\n    children {\n      id\n      title\n    }\n  }\n}\n    "], ["\n    query SidebarArticle($id: ID!) {\n  article(id: $id) {\n    id\n    title\n    favourited\n    children {\n      id\n      title\n    }\n  }\n}\n    "])));
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
export function useSidebarArticleQuery(baseOptions) {
    return ApolloReactHooks.useQuery(SidebarArticleDocument, baseOptions);
}
export function useSidebarArticleLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(SidebarArticleDocument, baseOptions);
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
