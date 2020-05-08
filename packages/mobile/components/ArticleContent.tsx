import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import { View, Text, TextInput, ScrollView, Dimensions } from "react-native";
import { ActivityIndicator, IconButton, Colors } from "react-native-paper";
import moment, { isDate } from "moment";
import Breadcrumbs from "./Breadcrumbs";
import ArticleEditor from "./ArticleEditor";
import { Heart, Search } from "../assets/icons";

import {
  useArticleQuery,
  useUpdateArticleMutation,
  useToggleFavouriteMutation,
  ArticlesDocument,
  ArticleDocument,
  FavouriteArticlesDocument,
} from "../local_core/generated/graphql";

const ArticleContent = ({ route, navigation }: Props) => {
  const { data, loading, error } = useArticleQuery({
    variables: { id: route.params.articleId },
  });
  const [updateArticle] = useUpdateArticleMutation();
  const [title, setTitle] = useState(data?.article?.title);
  const [fontSize, setFontSize] = useState(36);
  const [updatedTime, setUpdatedTime] = useState(
    data?.article?.updatedAt !== data?.article?.createdAt
      ? data?.article?.updatedAt
      : null
  );
  const [lastModificationTime, setLastModificationTime] = useState(
    updatedTime ? moment(updatedTime).fromNow() : ""
  );
  const [toggleFavouriteMutation] = useToggleFavouriteMutation();
  const [isFavourite, setFavourite] = useState(data?.article?.favourited);

  useEffect(() => {
    setFontSize(
      data?.article?.title?.length
        ? data?.article?.title?.length > 48
          ? 28
          : 36
        : 36
    );
    setTitle(data?.article?.title);
  }, [data?.article?.title]);

  useEffect(() => {
    setUpdatedTime(
      data?.article?.updatedAt !== data?.article?.createdAt
        ? data?.article?.updatedAt
        : null
    );
  }, [data?.article?.updatedAt]);

  useEffect(() => {
    setLastModificationTime(updatedTime ? moment(updatedTime).fromNow() : "");
    const timeOut = setInterval(() => {
      setLastModificationTime(updatedTime ? moment(updatedTime).fromNow() : "");
    }, 15 * 1000);
    return () => {
      clearInterval(timeOut);
    };
  }, [updatedTime]);

  useEffect(() => {
    setFavourite(data?.article?.favourited);
  }, [data?.article?.favourited]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", paddingRight: 8 }}>
          <IconButton
            icon={() => <Heart fill={isFavourite ? "#FFC200" : "#D6D6D6"} />}
            onPress={() => toggleFavouriteAction()}
          />
          <IconButton icon={() => <Search fill={Colors.grey300} />} />
        </View>
      ),
    });
  }, [navigation, data?.article?.favourited, isFavourite]);

  function toggleFavouriteAction() {
    setFavourite(!isFavourite);
    toggleFavouriteMutation({
      variables: {
        articleId: data?.article?.id,
      },
      update(cache, { data: { toggleFavourite } }) {
        try {
          const cachedData = cache.readQuery({
            query: FavouriteArticlesDocument,
          });

          if (toggleFavourite) {
            const newFavourite = {
              id: data?.article?.id,
              title: data?.article?.title,
              parent: data?.article?.parent || null,
              __typename: "Article",
            };

            cachedData.me.favourites = [
              ...cachedData.me.favourites,
              newFavourite,
            ];
          } else {
            cachedData.me.favourites = cachedData.me.favourites.filter((el) => {
              return el.id != data?.article?.id;
            });
          }

          cache.writeQuery({
            query: FavouriteArticlesDocument,
            data: cachedData,
          });

          const cachedArticles = cache.readQuery({ query: ArticlesDocument });
          cachedArticles.articles.some((el) => {
            if (el.id == data.article?.id) {
              el.favourited = toggleFavourite;
              return true;
            }
          });
          cache.writeQuery({ query: ArticlesDocument, data: cachedData });

          const cachedArticle = cache.readQuery({
            query: ArticleDocument,
            variables: {
              id: data?.article?.id,
            },
          });

          cachedArticle.article.favourited = toggleFavourite;

          cache.writeQuery({
            query: ArticleDocument,
            variables: {
              id: data?.article?.id,
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
  }

  function onSaveTitle(newTitle: string) {
    updateArticle({
      variables: {
        id: data?.article?.id,
        title: newTitle,
      },
      update(cache) {
        const cachedData = cache.readQuery({ query: ArticlesDocument });
        cachedData.articles.some((el) => {
          if (el.id == data.article?.id) {
            el.title = newTitle;
            return true;
          }
        });
        cache.writeQuery({ query: ArticlesDocument, data: cachedData });

        const cachedArticle = cache.readQuery({
          query: ArticleDocument,
          variables: {
            id: data?.article?.id,
          },
        });

        cachedArticle.article.title = newTitle;

        cache.writeQuery({
          query: ArticleDocument,
          variables: {
            id: data?.article?.id,
          },
          data: cachedArticle,
        });
      },
    }).then(({ data }) => setUpdatedTime(data?.updateArticle?.updatedAt));
  }

  function onSaveBody(newBody: string) {
    updateArticle({
      variables: {
        id: data?.article?.id,
        body: newBody,
      },
    }).then(({ data }) => {
      setUpdatedTime(data?.updateArticle?.updatedAt);
    });
  }

  return loading ? (
    <StyledLoadingView>
      <ActivityIndicator color="primary" />
    </StyledLoadingView>
  ) : data && data.article ? (
    <StyledScrollView
      contentContainerStyle={{
        flexGrow: 1,
        minHeight: windowHeight + windowHeight * 0.4,
      }}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={false}
      bounces={true}
    >
      <Breadcrumbs
        separator="/"
        titles={[
          ...(data.article.rootPath
            ? data.article.rootPath.map(
                (titleAndId) => titleAndId?.split("-")[0] || ""
              )
            : []),
          title ? title : "",
        ]}
      />
      <TitleTextInput
        style={{ fontSize: fontSize }}
        multiline={true}
        scrollEnabled={false}
        value={title}
        blurOnSubmit={true}
        nestedScrollEnabled={false}
        onChangeText={(text: string) => {
          if (text.length <= 90) {
            if (text.length > 45) {
              setFontSize(28);
            } else {
              setFontSize(36);
            }
            setTitle(text);
            onSaveTitle(text);
          }
        }}
      />
      <ArticleEditor content={data.article.body || ""} onSave={onSaveBody} />
      <StyledText>
        {updatedTime ? `Last modified ${lastModificationTime}` : ""}
      </StyledText>
    </StyledScrollView>
  ) : (
    <Text>{error?.message}</Text>
  );
};

const windowHeight = Dimensions.get("window").height;

const StyledLoadingView = styled(View)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledScrollView = styled(ScrollView)`
  flex-grow: 1;
  background: #fff;
`;

const TitleTextInput = styled(TextInput)`
  margin-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  font-weight: bold;
  flex-wrap: wrap;
  padding-top: -1px;
`;

const StyledText = styled(Text)`
  display: flex;
  font-size: 12px;
  margin: 16px;
  padding-bottom: 78%;
  text-align: center;
  color: #bdbdbd;
`;

interface Props {
  route: any;
  navigation: any;
}

export default ArticleContent;
