import React, { useState, FunctionComponent } from "react";
import { View } from "react-native";
import { List, Divider } from "react-native-paper";
import { useArticlesQuery, Article } from "@workspace-library/core";

import SideBarArticle from "./SidebarArticle";

const art1: Article = {
  id: "1",
  title: "Raiz",
  parent: null,
  favourited: false,
};
const art2: Article = {
  id: "2",
  title: "Hijo 1",
  parent: art1,
  favourited: false,
};
const art3: Article = {
  id: "3",
  title: "Hijo 2",
  parent: art1,
  favourited: false,
};
const art4: Article = {
  id: "4",
  title: "Nieto 11",
  parent: art2,
  favourited: false,
};
const art5: Article = {
  id: "5",
  title: "Nieto 21",
  parent: art3,
  favourited: false,
};
const art6: Article = {
  id: "6",
  title: "Nieto 22",
  parent: art3,
  favourited: false,
};
const art7: Article = {
  id: "7",
  title: "Nieot 23",
  parent: art3,
  favourited: false,
};
const art8: Article = {
  id: "8",
  title: "Hijo 3",
  parent: art1,
  favourited: false,
};

const hardCodedArticles = [art1, art2, art3, art4, art5, art6, art7, art8];
const hardCodedFavouriteArticles = [art3, art6];

const hardCodedArticleChildren = [
  [art2, art3, art8],
  [art4],
  [art5, art6, art7],
  [],
  [],
  [],
  [],
  [],
];

interface Props {
  favourites?: boolean;
  rootPath: string[];
  selected?: Object;
  navigation?: any;
}

const SidebarArticles = ({
  favourites,
  rootPath,
  selected,
  navigation,
}: Props) => {
  /*const data = useArticlesQuery({
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });*/

  console.log(favourites);

  const articles = favourites ? hardCodedFavouriteArticles : hardCodedArticles;
  console.log(articles);

  return (
    <List.Section>
      {articles.map(({ id, title, parent }: Article, key: number) => {
        return (
          (!parent || favourites) && (
            <View key={key}>
              <SideBarArticle
                //addSubArticle={addSubArticle}
                hierarchy={1}
                id={id}
                rootPath={
                  `${title}-${id}` === rootPath[0] ? rootPath : undefined
                }
                hardCodedArticle={articles[key]}
                hardCodedChildren={hardCodedArticleChildren}
                navigation={navigation}
                //mainRefetch={favourites && refetch}
                //reload={reload}
                //selected={selected}
              />
              {favourites && <Divider />}
            </View>
          )
        );
      })}
    </List.Section>
  );
};

export default SidebarArticles;
