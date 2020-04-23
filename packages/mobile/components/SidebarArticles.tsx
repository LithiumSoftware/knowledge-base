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
  reload: Date | null;
}

const SidebarArticles = ({
  favourites,
  rootPath,
  selected,
  navigation,
  reload,
}: Props) => {
  const [reloadArticle, setReloadArticle] = useState<Date | null>(null);
  const { data, refetch, networkStatus } = favourites
    ? useFavouriteArticlesQuery({
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true,
      })
    : useArticlesQuery({
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true,
      });

  useEffect(() => {
    networkStatus === 4 && setReloadArticle(new Date());
  }, [networkStatus]);

  useEffect(() => {
    reload && refetch();
  }, [reload]);

  const articles = favourites ? data?.me?.favourites : data?.articles;

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
                reload={reloadArticle}
                selected={selected}
                mainRefetch={refetch}
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
