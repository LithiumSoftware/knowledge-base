import React, { useState, useEffect } from "react";
import { List, Divider, IconButton } from "react-native-paper";
import Collapsible from "react-native-collapsible";

import styled from "styled-components/native";
import { Heart, Plus, ChevronDown, ChevronRight, File } from "../assets/icons";

import {
  useArticleQuery,
  ToggleFavouriteMutation,
  Article,
} from "../local_core/generated/graphql";

interface Props {
  hierarchy: number;
  id: string;
  reload?: any;
  rootPath?: string[];
  selected: string | null;
  navigation: any;
}

const SidebarArticle = ({
  hierarchy,
  id,
  reload,
  rootPath,
  selected,
  navigation,
}: Props) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [isFavourite, setFavourite] = useState<boolean | null>(null);

  const { loading, error, data, refetch } = useArticleQuery({
    variables: { id: id },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    !!rootPath && !collapsed && setCollapsed(true);
  }, [rootPath]);

  useEffect(() => {
    reload && refetch();
  }, [reload]);

  const article = data?.article;
  const titleId = `${article?.title}-${article?.id}`;

  return (
    <>
      <List.Item
        style={{
          paddingLeft: hierarchy * 4,
          backgroundColor: selected === titleId ? "#CCC" : "#FFF",
        }}
        title={article?.title}
        onPress={() =>
          navigation.navigate("Article", { articleId: article?.id })
        }
        left={(props: any) => (
          <NoMarginIcon
            icon={() =>
              article?.children?.length ? (
                collapsed ? (
                  <ChevronDown />
                ) : (
                  <ChevronRight />
                )
              ) : (
                <File />
              )
            }
            onPress={() => setCollapsed(!collapsed)}
          />
        )}
        right={(props: any) => (
          <>
            <NoMarginIcon
              {...props}
              icon={() => <Heart fill={isFavourite ? "#FFC200" : "#D6D6D6"} />}
              onPress={() => setFavourite(!isFavourite)}
            />
            <NoMarginIcon
              {...props}
              icon={() => <Plus />}
              onPress={() => console.log("plus")}
            />
          </>
        )}
      />
      <Collapsible collapsed={!collapsed}>
        {article?.children?.map(
          (subArticle: { id: string; title: string }, index) => (
            <SidebarArticle
              hierarchy={hierarchy + 8}
              id={subArticle?.id}
              key={index}
              reload={reload}
              rootPath={
                rootPath &&
                `${subArticle?.title}-${subArticle?.id}` === rootPath[hierarchy]
                  ? rootPath
                  : undefined
              }
              selected={selected}
              navigation={navigation}
            />
          )
        )}
      </Collapsible>
    </>
  );
};

export default SidebarArticle;

const NoMarginIcon = styled(IconButton)`
  margin: 0px;
`;
