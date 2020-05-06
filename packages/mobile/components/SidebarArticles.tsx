import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { List, Divider } from "react-native-paper";
import {
  useArticlesQuery,
  useFavouriteArticlesQuery,
  Article,
} from "../local_core/generated/graphql";

import SideBarArticle from "./SidebarArticle";

interface Props {
  favourites?: boolean;
  rootPath: string[];
  selected: string | null;
  navigation?: any;
}

const SidebarArticles = ({
  favourites,
  rootPath,
  selected,
  navigation,
}: Props) => {
  const { data } = favourites
    ? useFavouriteArticlesQuery({})
    : useArticlesQuery({});

  const articles = favourites ? data?.me?.favourites : data?.articles;
  return (
    <List.Section>
      {articles?.map(({ id, title, parent }: Article, key: number) => {
        return (
          (!parent || favourites) && (
            <View key={key}>
              <SideBarArticle
                hierarchy={0}
                id={id}
                rootPath={
                  `${title}-${id}` === rootPath[0] ? rootPath : undefined
                }
                navigation={navigation}
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
