import * as React from "react";
import { useState, useEffect } from "react";

import styled from "styled-components";
import { View, Text, Button, TextInput } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import moment from "moment";
import Breadcrumbs from "./Breadcrumbs";
import ArticleEditor from "./ArticleEditor";

import { useArticleQuery } from "../local_core/generated/graphql";
import { useUpdateArticleMutation } from "../local_core/generated/graphql";
import { DrawerActions } from "@react-navigation/native";

const StyledView = styled(View)`
  flex: 1;
  background: #fff;
`;

const StyledText = styled(Text)`
  width: 335px;
  height: 42px;
  left: 20px;

  font-size: 12px;
  line-height: 20px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #bdbdbd;
`;

const TitleEditText = styled(TextInput)`
  width: 100%;
  padding-top: 36px;
  left: 19px;
  font-weight: bold;
  font-size: 48px;
  letter-spacing: -1.5px;
  color: rgba(0, 0, 0, 0.87);
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

const ArticleContent = ({ route, navigation }: Props) => {
  const { data, loading, error } = useArticleQuery({
    variables: { id: route.params.articleId },
    fetchPolicy: "no-cache",
  });
  const [updateArticle] = useUpdateArticleMutation();

  const [title, setTitle] = useState(data?.article?.title);
  const [updatedTime, setUpdatedTime] = useState(
    data?.article?.updatedAt !== data?.article?.createdAt
      ? data?.article?.updatedAt
      : null
  );
  const [lastModificationTime, setLastModificationTime] = useState(
    updatedTime ? moment(updatedTime).fromNow() : ""
  );

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
    <StyledView>
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
        value={title}
        onChangeText={(text: string) => {
          setTitle(text);
          onSaveTitle(text);
        }}
      />
      <ArticleEditor content={data.article.body || ""} onSave={onSaveBody} />
      {updatedTime ? (
        <StyledText onPress={() => console.log(lastModificationTime)}>
          Last modified {lastModificationTime}
        </StyledText>
      ) : (
        <></>
      )}
    </StyledView>
  ) : (
    <Text>{error?.message}</Text>
  );
};

export default ArticleContent;
