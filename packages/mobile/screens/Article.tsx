import React from "react";
import ArticleContent from "../components/ArticleContent";

interface Props {
  navigation: any;
  route: any;
}

const ArticleScreen = ({ route, navigation }: Props) => (
  <ArticleContent route={route} navigation={navigation} />
);

export default ArticleScreen;
