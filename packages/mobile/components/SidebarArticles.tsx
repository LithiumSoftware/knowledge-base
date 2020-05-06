import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { List, Divider, Colors } from "react-native-paper";
import {
  useArticlesQuery,
  useFavouriteArticlesQuery,
  Article,
} from "../local_core/generated/graphql";
import DraggableFlatList from "react-native-draggable-flatlist";

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
  const [articles, setArticles] = useState(
    favourites ? data?.me?.favourites : data?.articles
  );
  useEffect(() => {
    setArticles(favourites ? data?.me?.favourites : data?.articles);
  }, [data]);

  const renderItem = ({ item, index, drag, isActive }: DraggableProps) => {
    return !item.parent || favourites ? (
      <TouchableOpacity
        style={{
          backgroundColor: isActive ? Colors.yellowA400 : "white",
          opacity: isActive ? 1.5 : 1,
          alignItems: "stretch",
          justifyContent: "center",
        }}
        onLongPress={drag}
      >
        <SideBarArticle
          hierarchy={0}
          id={item?.id}
          rootPath={
            item?.rootPath && `${item.title}-${item.id}` === item.rootPath[0]
              ? item.rootPath
              : undefined
          }
          drag={drag}
          navigation={navigation}
        />
        {favourites && <Divider />}
      </TouchableOpacity>
    ) : (
      <></>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {articles && (
        <DraggableFlatList
          data={articles}
          renderItem={renderItem}
          keyExtractor={(item) => "" + item.id}
          onDragEnd={({ data }) => setArticles(data)}
        />
      )}
    </View>
  );
};

interface DraggableProps {
  item: Article;
  index?: number | undefined;
  drag: any;
  isActive: boolean;
}

export default SidebarArticles;
