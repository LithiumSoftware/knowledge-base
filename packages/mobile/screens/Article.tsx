import React from "react";
import ArticleContent from "../components/ArticleContent";

interface Props {
  navigation: any;
  route: any;
}

export default function ArticleScreen({ route, navigation }: Props) {
  return <ArticleContent route={route} navigation={navigation} />;
}
