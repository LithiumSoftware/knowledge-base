import * as React from "react";
import { useState, useEffect } from "react";

import styled from "styled-components";
import { View, Text, SafeAreaView, Button, TextInput } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import moment from "moment";
import Breadcrumbs from "./Breadcrumbs";
import ArticleEditor from "./ArticleEditor";

import { useArticleQuery } from "../local_core/generated/graphql";
import { useUpdateArticleMutation } from "../local_core/generated/graphql";

const StyledSafeAreaView = styled(SafeAreaView)`
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
  });

  const [updateArticle] = useUpdateArticleMutation();

  const [updatedTime, setUpdatedTime] = useState(
    data?.article?.updatedAt !== data?.article?.createdAt
      ? data?.article?.updatedAt
      : null
  );

  const [lastModificationTime, setLastModificationTime] = useState(
    moment(updatedTime).fromNow()
  );

  useEffect(() => {
    setLastModificationTime(moment(updatedTime).fromNow());
    setUpdatedTime(
      data?.article?.updatedAt !== data?.article?.createdAt
        ? data?.article?.updatedAt
        : null
    );
    const timeOut = setInterval(() => {
      setLastModificationTime(moment(updatedTime).fromNow());
    }, 15 * 1000);
    return () => {
      clearInterval(timeOut);
    };
  }, [updatedTime, data?.article?.updatedAt]);

  function onSaveTitle(newTitle: string) {
    updateArticle({
      variables: {
        id: data?.article?.id,
        title: newTitle,
      },
    }).then(({ data }) => setUpdatedTime(data?.updateArticle?.updatedAt));
  }

  function onSaveBody(newBody: string) {
    updateArticle({
      variables: {
        id: data?.article?.id,
        body: newBody,
      },
    }).then(({ data }) => setUpdatedTime(data?.updateArticle?.updatedAt));
  }

  return loading ? (
    <StyledLoadingView>
      <ActivityIndicator color="primary" />
    </StyledLoadingView>
  ) : data && data.article ? (
    <StyledSafeAreaView>
      <Breadcrumbs
        separator="/"
        titles={[
          ...(data.article.rootPath
            ? data.article.rootPath.map(
                (titleAndId) => titleAndId?.split("-")[0] || ""
              )
            : []),
          data.article.title,
        ]}
      />
      <TitleEditText
        value={data.article.title}
        onChangeText={(text: string) => onSaveTitle(text)}
      />
      <ArticleEditor content={data.article.body || ""} onSave={onSaveBody} />
      {lastModificationTime && !lastModificationTime?.includes("Invalid") && (
        <StyledText onPress={() => console.log(lastModificationTime)}>
          Last modified {lastModificationTime}
        </StyledText>
      )}
    </StyledSafeAreaView>
  ) : (
    <Text>{error?.message}</Text>
  );
};

export default ArticleContent;