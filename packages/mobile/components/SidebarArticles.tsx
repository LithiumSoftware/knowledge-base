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
  const [reload, setReload] = useState<Date | null>(null);
  const { data, refetch, networkStatus } = favourites
    ? { data: null, refetch: null, networkStatus: null }
    : useArticlesQuery({
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true,
      });

  useEffect(() => {
    networkStatus === 4 && setReload(new Date());
  }, [networkStatus]);

  const articles = data?.articles;

  return (
    <List.Section>
      {articles?.map(({ id, title, parent }: Article, key: number) => {
        return (
          (!parent || favourites) && (
            <View key={key}>
              <SideBarArticle
                hierarchy={1}
                id={id}
                rootPath={
                  `${title}-${id}` === rootPath[0] ? rootPath : undefined
                }
                navigation={navigation}
                reload={reload}
                selected={selected}
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
