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
  const dataFavourites = useFavouriteArticlesQuery({});
  const dataArticles = useArticlesQuery({});
  const [allFavourites, setAllFavourites] = useState(
    dataFavourites.data?.me?.favourites
  );
  const [articles, setArticles] = useState(dataArticles.data?.articles);

  useEffect(() => {
    setAllFavourites(dataFavourites.data?.me?.favourites);
  }, [dataFavourites.data?.me?.favourites]);

  useEffect(() => {
    setArticles(dataArticles.data?.articles);
  }, [dataArticles.data?.articles, dataFavourites.data?.me?.favourites]);

  return (
    <List.Section>
      {(favourites ? allFavourites : articles)?.map(
        ({ id, title, parent }: Article, key: number) => {
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
        }
      )}
    </List.Section>
  );
};

export default SidebarArticles;
