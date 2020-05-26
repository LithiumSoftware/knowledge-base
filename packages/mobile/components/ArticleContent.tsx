import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  Button,
} from "react-native";
import { ActivityIndicator, IconButton, Colors } from "react-native-paper";
import moment, { isDate } from "moment";
import Breadcrumbs from "./Breadcrumbs";
import ArticleEditor from "./ArticleEditor";
import ArticleViewer from "./ArticleViewer";
import { Heart, Menu, Save, Edit } from "../assets/icons";

import {
  useArticleQuery,
  useUpdateArticleMutation,
  useToggleFavouriteMutation,
  Article,
  ArticlesDocument,
  ArticleDocument,
  FavouriteArticlesDocument,
} from "../local_core/generated/graphql";

const ArticleContent = ({ route, navigation }: Props) => {
  const { data, loading, error } = useArticleQuery({
    variables: { id: route.params.articleId },
    fetchPolicy: "network-only",
  });

  const [article, setArticle] = useState<Article | undefined | null>(
    data?.article
  );
  const [lastUpdatedAt, setLastUpdatedAt] = useState(data?.article?.updatedAt);
  const [title, setTitle] = useState(data?.article?.title);
  const [content, setContent] = useState(data?.article?.body);
  const [favourited, setFavourited] = useState(data?.article?.favourited);

  const [updateArticle] = useUpdateArticleMutation();
  const [toggleFavouriteMutation] = useToggleFavouriteMutation();
  const [fontSize, setFontSize] = useState(36);
  const [lastModificationTime, setLastModificationTime] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [lastEditedBody, setLastEditedBody] = useState(data?.article?.body);

  useEffect(() => {
    setArticle(data?.article);
    setLastUpdatedAt(data?.article?.updatedAt);
    setLastModificationTime(
      data?.article?.updatedAt ? moment(data?.article?.updatedAt).fromNow() : ""
    );
    setTitle(data?.article?.title);
    setContent(data?.article?.body);
    setFavourited(data?.article?.favourited);
    setLastEditedBody(data?.article?.body);
    if (route.params.isEditing) {
      setIsEditing(true);
    }
  }, [data?.article?.id]);

  useEffect(() => {
    setFavourited(data?.article?.favourited);
  }, [data?.article?.favourited]);

  useEffect(() => {
    setFontSize(title && title.length > 48 ? 28 : 36);
  }, [title]);

  useEffect(() => {
    const timeOut = setInterval(() => {
      setLastModificationTime(
        lastUpdatedAt ? moment(lastUpdatedAt).fromNow() : ""
      );
    }, 15 * 1000);
    return () => {
      clearInterval(timeOut);
    };
  }, [lastUpdatedAt]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: isEditing ? "#FFC200" : "white" },
      headerLeft: () => (
        <IconButton
          color="black"
          style={{ left: 4, height: "100%" }}
          icon={() => <Menu />}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            paddingRight: 8,
            alignItems: "center",
          }}
        >
          {isEditing ? (
            <>
              <IconButton
                icon={() => <Heart fill={favourited ? "black" : "#E0AA00"} />}
                onPress={() => {
                  setFavourited(!favourited);
                  toggleFavouriteAction();
                }}
              />
              <IconButton
                icon={() => <Save fill={"black"} />}
                onPress={() => {
                  setContent(lastEditedBody);
                  setIsEditing(!isEditing);
                }}
              />
            </>
          ) : (
            <>
              <IconButton
                icon={() => <Heart fill={favourited ? "#FFC200" : "#D6D6D6"} />}
                onPress={() => {
                  setFavourited(!favourited);
                  toggleFavouriteAction();
                }}
              />
              <IconButton
                icon={() => <Edit fill={"black"} />}
                onPress={() => {
                  setContent(lastEditedBody);
                  setIsEditing(!isEditing);
                }}
              />
            </>
          )}
        </View>
      ),
    });
  }, [navigation, article, favourited, isEditing, lastEditedBody]);

  function toggleFavouriteAction() {
    toggleFavouriteMutation({
      variables: {
        articleId: article?.id,
      },
      update(cache, { data: { toggleFavourite } }) {
        try {
          const cachedArticles = cache.readQuery({ query: ArticlesDocument });
          cachedArticles.articles.some((el) => {
            if (el.id == article?.id) {
              el.favourited = toggleFavourite;
              return true;
            }
          });
          cache.writeQuery({ query: ArticlesDocument, data: cachedArticles });

          const cachedArticle = cache.readQuery({
            query: ArticleDocument,
            variables: {
              id: article?.id,
            },
          });

          cachedArticle.article.favourited = toggleFavourite;

          cache.writeQuery({
            query: ArticleDocument,
            variables: {
              id: article?.id,
            },
            data: cachedArticle,
          });

          const cachedFavouriteList = cache.readQuery({
            query: FavouriteArticlesDocument,
          });

          if (toggleFavourite) {
            const newFavourite = {
              id: article?.id,
              title: article?.title,
              parent: article?.parent || null,
              __typename: "Article",
            };

            cachedFavouriteList.me.favourites = [
              ...cachedFavouriteList.me.favourites,
              newFavourite,
            ];
          } else {
            cachedFavouriteList.me.favourites = cachedFavouriteList.me.favourites.filter(
              (el) => {
                return el.id != article?.id;
              }
            );
          }

          cache.writeQuery({
            query: FavouriteArticlesDocument,
            data: cachedFavouriteList,
          });
        } catch (err) {
          // If the user has not opened the favourite
          // articles tab the query has not been loaded
          // yet and it will land on this catch.
        }
      },
    }).catch((err: any) => console.log(`Error togglefavourite: ${err}`));
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
          if (el.id == article?.id) {
            el.title = newTitle;
            return true;
          }
        });
        cache.writeQuery({ query: ArticlesDocument, data: cachedData });

        const cachedArticle = cache.readQuery({
          query: ArticleDocument,
          variables: {
            id: article?.id,
          },
        });

        cachedArticle.article.title = newTitle;

        cache.writeQuery({
          query: ArticleDocument,
          variables: {
            id: article?.id,
          },
          data: cachedArticle,
        });
      },
    })
      .then(
        ({
          data: {
            updateArticle: { updatedAt },
          },
        }) => {
          setLastUpdatedAt(updatedAt);
        }
      )
      .catch((err: any) => console.log(`Error onSaveTitle: ${err}`));
  }

  function onSaveBody(newBody: string) {
    updateArticle({
      variables: {
        id: article.id,
        body: newBody,
      },
    })
      .then(
        ({
          data: {
            updateArticle: { updatedAt },
          },
        }) => {
          setLastUpdatedAt(updatedAt);
        }
      )
      .catch((err) => console.log(`Error onSaveBody: ${err}`));
  }

  return loading ? (
    <StyledLoadingView>
      <ActivityIndicator color="primary" />
    </StyledLoadingView>
  ) : article ? (
    <StyledScrollView
      contentContainerStyle={{
        flexGrow: 1,
        minHeight: windowHeight * 0.9 + (isEditing ? windowHeight * 0.48 : 0),
        paddingBottom: isEditing ? windowHeight * 0.46 : "2.1%",
      }}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={false}
      bounces={true}
    >
      <Breadcrumbs
        separator="/"
        titles={[
          ...(article.rootPath
            ? article.rootPath.map(
                (titleAndId) => titleAndId?.split("-")[0] || ""
              )
            : []),
          title,
        ]}
      />
      <TitleTextInput
        editable={isEditing}
        style={{ fontSize: fontSize }}
        multiline={true}
        scrollEnabled={false}
        value={title}
        blurOnSubmit={true}
        nestedScrollEnabled={false}
        onChangeText={(text: string) => {
          if (text.length <= 90) {
            setTitle(text);
            if (text.length > 45) {
              setFontSize(28);
            } else {
              setFontSize(36);
            }
            onSaveTitle(text);
          }
        }}
      />
      {isEditing ? (
        <ArticleEditor
          content={content}
          onSave={{ setLastEditedBody, onSaveBody }}
        />
      ) : (
        <ArticleViewer content={content} />
      )}
      <StyledText>{`Last modified ${lastModificationTime}`}</StyledText>
    </StyledScrollView>
  ) : (
    <Text>{error}</Text>
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
  text-align: center;
  color: #bdbdbd;
`;

interface Props {
  route: any;
  navigation: any;
}

export default ArticleContent;
