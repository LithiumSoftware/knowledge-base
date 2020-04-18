import * as React from "react";
import { useState, useEffect } from "react";

import styled from "styled-components";
import { View, Text, SafeAreaView, Button, TextInput } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import moment from "moment";
import Breadcrumbs from "./Breadcrumbs";
import ArticleEditor from "./ArticleEditor";

import { useArticleQuery } from "../local_core/generated/graphql";

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
  articleId: string;
}

const ArticleContent = ({ route, navigation, articleId }: Props) => {
  const { data, loading, error } = useArticleQuery({
    variables: { id: articleId },
  });

  // const [updateArticle] = useMutation(UPDATE_ARTICLE_MUTATION);

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

  const onSave = (newContent: String) => {
    // updateArticle({
    //   variables: {
    //     newContent: newContent,
    //     articleId: data?.article?.id,
    //   },
    // }).then((response) => {
    //   setUpdatedTime(response.data.updateArticle.updatedAt);
    // });
  };

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
      <TitleEditText>{data.article.title}</TitleEditText>
      <ArticleEditor content={data.article.body || ""} onSave={onSave} />
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
