import * as React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useState, useEffect } from "react";

import styled from "styled-components";
import { ActivityIndicator, Button } from "react-native-paper";
import { View, Text } from "react-native";
import moment from "moment";
import Breadcrumbs from "./Breadcrumbs";

import ARTICLES_QUERY from "../../kbcore/dist/queries/ARTICLES_QUERY";
import UPDATE_ARTICLE_MUTATION from "../../kbcore/dist/mutations/UPDATE_ARTICLE_MUTATION";

const StyledButton = styled(Button)`
  display: flex;
  text-transform: none;
`;

const TitleText = styled(Text)`
  color: #424242;
  font-weight: bold;
  padding-left: 16px;
  padding-right: 16px;
  padding-bot: 16px;
`;

const TopBar = styled(View)`
  display: flex;
  position: fixed;
  left: 0;
  top: 64px;
  padding-top: 12px;
  z-index: 1050;
  width: 80%;
  justify-content: space-between;
  padding-left: 255px;
  padding-right: 20px;
  background-color: #fff;
`;

const StyledLoadingView = styled(View)`
  width: 100%;
  height: 100%;
  display: flex;
  justifycontent: center;
  alignitems: center;
`;

const ArticleContent = (
  { articleId }: { articleId: Number },
  { route, navigation }: { route: any; navigation: any }
) => {
  const articleWithParents = useQuery(ARTICLES_QUERY, {
    variables: { id: articleId }
  });
  const [updateArticle] = useMutation(UPDATE_ARTICLE_MUTATION);
  const [updatedTime, setUpdatedTime] = useState(
    articleWithParents.data?.getArticleWithParents[
      articleWithParents.data?.getArticleWithParents.length - 1
    ]?.updatedAt !==
      articleWithParents.data?.getArticleWithParents[
        articleWithParents.data?.getArticleWithParents.length - 1
      ]?.createdAt
      ? articleWithParents.data?.getArticleWithParents[
          articleWithParents.data?.getArticleWithParents.length - 1
        ]?.updatedAt
      : null
  );
  const [lastModificationTime, setLastModificationTime] = useState(
    moment(updatedTime).fromNow()
  );
  useEffect(() => {
    setLastModificationTime(moment(updatedTime).fromNow());
    setUpdatedTime(
      articleWithParents.data?.getArticleWithParents[
        articleWithParents.data?.getArticleWithParents.length - 1
      ]?.updatedAt !==
        articleWithParents.data?.getArticleWithParents[
          articleWithParents.data?.getArticleWithParents.length - 1
        ]?.createdAt
        ? articleWithParents.data?.getArticleWithParents[
            articleWithParents.data?.getArticleWithParents.length - 1
          ]?.updatedAt
        : null
    );
    const timeOut = setInterval(() => {
      setLastModificationTime(moment(updatedTime).fromNow());
    }, 15 * 1000);
    return () => {
      clearInterval(timeOut);
    };
  }, [
    updatedTime,
    articleWithParents.data?.getArticleWithParents[
      articleWithParents.data?.getArticleWithParents.length - 1
    ]?.updatedAt
  ]);

  const onSave = (newContent: String) => {
    updateArticle({
      variables: {
        newContent: newContent,
        articleId:
          articleWithParents.data?.getArticleWithParents[
            articleWithParents.data?.getArticleWithParents.length - 1
          ]?.id
      }
    }).then(data => {
      setUpdatedTime(data.data.updateArticle.updatedAt);
    });
  };

  return articleWithParents.loading ? (
    <StyledLoadingView>
      <ActivityIndicator color="primary" />
    </StyledLoadingView>
  ) : (
    <View>
      <TopBar>
        <Breadcrumbs
          separator="/"
          items={articleWithParents.data?.getArticleWithParents?.map(
            (article: { title: String }) => ({
              title: article.title,
              action: navigation.push(article.title)
            })
          )}
        />
        {!lastModificationTime.includes("Invalid") && (
          <StyledButton color="secondary">
            Last modified {lastModificationTime}
          </StyledButton>
        )}
      </TopBar>
      <TitleText>
        {
          articleWithParents.data?.getArticleWithParents[
            articleWithParents.data?.getArticleWithParents.length - 1
          ]?.title
        }
      </TitleText>
      <Text>
        {
          articleWithParents.data?.getArticleWithParents[
            articleWithParents.data?.getArticleWithParents.length - 1
          ]?.content
        }
      </Text>
    </View>
  );
};

export default ArticleContent;
