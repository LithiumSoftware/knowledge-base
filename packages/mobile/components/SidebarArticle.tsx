import React, { useState, useEffect } from "react";
import { List, Divider, IconButton } from "react-native-paper";
import Collapsible from "react-native-collapsible";

import styled from "styled-components/native";
import { Heart, Plus, ChevronDown, ChevronRight, File } from "../assets/icons";

import {
  useArticleQuery,
  useToggleFavouriteMutation,
  useCreateArticleMutation,
  Article,
  ArticleDocument,
  FavouriteArticlesDocument,
} from "../local_core/generated/graphql";

interface Props {
  hierarchy: number;
  id: string;
  rootPath?: string[];
  navigation: any;
}

const SidebarArticle = ({ hierarchy, id, rootPath, navigation }: Props) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [isFavourite, setFavourite] = useState<boolean | null>(null);

  const { loading, error, data } = useArticleQuery({
    variables: { id: id },
  });

  const [toggleFavouriteMutation] = useToggleFavouriteMutation();
  const [createArticle] = useCreateArticleMutation();

  useEffect(() => {
    !!rootPath && !collapsed && setCollapsed(true);
  }, [rootPath]);

  useEffect(() => {
    setFavourite(data?.article?.favourited);
  }, [data]);

  const toggleFavouriteAction = () =>
    toggleFavouriteMutation({
      variables: {
        articleId: article.id,
      },
      update(cache, { data: { toggleFavourite } }) {
        try {
          const cachedData = cache.readQuery({
            query: FavouriteArticlesDocument,
          });

          if (toggleFavourite) {
            const newFavourite = {
              id: article.id,
              title: article.title,
              parent: article.parent || null,
              __typename: "Article",
            };

            cachedData.me.favourites = [
              ...cachedData.me.favourites,
              newFavourite,
            ];
          } else {
            cachedData.me.favourites = cachedData.me.favourites.filter((el) => {
              return el.id != article.id;
            });
          }

          cache.writeQuery({
            query: FavouriteArticlesDocument,
            data: cachedData,
          });

          const cachedArticle = cache.readQuery({
            query: ArticleDocument,
            variables: {
              id: article.id,
            },
          });

          cachedArticle.article.favourited = toggleFavourite;

          cache.writeQuery({
            query: ArticleDocument,
            variables: {
              id: article.id,
            },
            data: cachedArticle,
          });
        } catch (err) {
          // If the user has not opened the favourite
          // articles tab the query has not been loaded
          // yet and it will land on this catch.
        }
      },
    })
      .then(({ data: { toggleFavourite } }) => {
        setFavourite(toggleFavourite);
      })
      .catch((err: any) => console.log(`Error togglefavourite: ${err}`));

  const addSubArticle = () =>
    createArticle({
      variables: {
        parentId: article.id,
      },
      update(cache, { data: { createArticle } }) {
        const cachedData = cache.readQuery({
          query: ArticleDocument,
          variables: {
            id: id,
          },
        });

        const newArticle = {
          id: createArticle.id,
          title: createArticle.title,
          __typename: "Article",
        };

        cachedData.article.children = [
          ...cachedData.article.children,
          newArticle,
        ];

        cache.writeQuery({
          query: ArticleDocument,
          variables: {
            id: id,
          },
          data: cachedData,
        });
      },
    })
      .then(
        ({
          data: {
            createArticle: { id },
          },
        }) => {
          navigation.navigate("Article", { articleId: id });
        }
      )
      .catch((err: any) => {
        console.log(`Error create subArticle: ${err}`);
      });

  const article = data?.article;
  const titleId = `${article?.title}-${article?.id}`;
  isFavourite === null && article && setFavourite(article?.favourited);

  return (
    <>
      {article && (
        <List.Item
          style={{
            paddingLeft: hierarchy * 4,
          }}
          title={article?.title}
          onPress={() => {
            navigation.navigate("Article", { articleId: article?.id });
          }}
          left={(props: any) => (
            <NoMarginIcon
              icon={() =>
                article?.children?.length ? (
                  collapsed ? (
                    <ChevronDown />
                  ) : (
                    <ChevronRight />
                  )
                ) : (
                  <File />
                )
              }
              onPress={() => setCollapsed(!collapsed)}
            />
          )}
          right={(props: any) => (
            <>
              <NoMarginIcon
                {...props}
                icon={() => (
                  <Heart fill={isFavourite ? "#FFC200" : "#D6D6D6"} />
                )}
                onPress={() => toggleFavouriteAction()}
              />
              {hierarchy < 17 && (
                <NoMarginIcon
                  {...props}
                  icon={() => <Plus />}
                  onPress={() => addSubArticle()}
                />
              )}
            </>
          )}
        />
      )}
      <Collapsible collapsed={!collapsed}>
        {article?.children?.map(
          (subArticle: { id: string; title: string }, index: number) => (
            <SidebarArticle
              hierarchy={hierarchy + 8}
              id={subArticle?.id}
              key={index}
              rootPath={
                rootPath &&
                `${subArticle?.title}-${subArticle?.id}` === rootPath[hierarchy]
                  ? rootPath
                  : undefined
              }
              navigation={navigation}
            />
          )
        )}
      </Collapsible>
    </>
  );
};

export default SidebarArticle;

const NoMarginIcon = styled(IconButton)`
  margin: 0px;
`;
