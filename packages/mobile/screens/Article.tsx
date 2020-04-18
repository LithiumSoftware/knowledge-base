import React from "react";
import ArticleContent from "../components/ArticleContent";

interface Props {
  navigation: any;
  route: any;
}

export default function ArticleScreen({ route, navigation }: Props) {
  const { articleId } = route.params;
  console.log("articleId:" + articleId);
  return (
    <ArticleContent
      route={route}
      navigation={navigation}
      articleId={articleId}
    />
  );
}
