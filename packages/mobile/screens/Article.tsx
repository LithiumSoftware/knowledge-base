import React, { Component } from "react";
import ArticleContent from "mobile/components/ArticleContent";

interface Props {
  navigation: any;
  route: any;
  articleId: number;
}

export default function ArticleScreen({ route, navigation, articleId }: Props) {
  return (
    <ArticleContent
      route={route}
      navigation={navigation}
      articleId={articleId}
    />
  );
}
