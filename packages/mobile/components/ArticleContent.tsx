import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { View, Text, TextInput, ScrollView, Dimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import moment from "moment";
import Breadcrumbs from "./Breadcrumbs";
import ArticleEditor from "./ArticleEditor";

import { useArticleQuery } from "../local_core/generated/graphql";
import { useUpdateArticleMutation } from "../local_core/generated/graphql";

const windowHeight = Dimensions.get("window").height;

const ArticleContent = ({ route, navigation }: Props) => {
  const { data, loading, error } = useArticleQuery({
    variables: { id: route.params.articleId },
    fetchPolicy: "no-cache",
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

  useEffect(() => {
    setFontSize(
      data?.article?.title?.length
        ? data?.article?.title?.length > 54
          ? 28
          : 36
        : 36
    );
  }, [data?.article?.title]);
  useEffect(() => {
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

  function onSaveTitle(newTitle: string) {
    updateArticle({
      variables: {
        id: data?.article?.id,
        title: newTitle,
      },
    }).then(({ data }) => {
      setUpdatedTime(data?.updateArticle?.updatedAt);
    });
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
      contentContainerStyle={{ flexGrow: 1, minHeight: windowHeight * 0.8 }}
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
      <TitleEditText
        style={{ fontSize: fontSize }}
        multiline={true}
        scrollEnabled={false}
        value={title}
        blurOnSubmit={true}
        nestedScrollEnabled={false}
        onChangeText={(text: string) => {
          if (text.length <= 90) {
            if (text.length > 54) {
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
      <StyledText onPress={() => console.log(lastModificationTime)}>
        {updatedTime ? `Last modified ${lastModificationTime}` : ""}
      </StyledText>
    </StyledScrollView>
  ) : (
    <Text>{error?.message}</Text>
  );
};

const StyledScrollView = styled(ScrollView)`
  flex-grow: 1;
  background: #fff;
`;

const StyledText = styled(Text)`
  display: flex;
  font-size: 12px;
  padding: 16px;
  text-align: center;
  color: #bdbdbd;
`;

const TitleEditText = styled(TextInput)`
  margin-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  font-weight: bold;
  flex-wrap: wrap;
  padding-top: -1px;
`;

const StyledLoadingView = styled(View)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  route: any;
  navigation: any;
}

export default ArticleContent;
