import React, { useState, useEffect } from "react";
import {
  useArticleQuery,
  ToggleFavouriteMutation,
  Article,
} from "../local_core/generated/graphql";
import { List, Divider, IconButton } from "react-native-paper";
import Collapsible from "react-native-collapsible";

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
        onPress={() => navigation.navigate("article", { id: article?.id })}
        left={(props: any) => (
          <IconButton
            {...props}
            icon={collapsed ? "chevron-down" : "chevron-right"}
            onPress={() => setCollapsed(!collapsed)}
          />
        )}
        right={(props: any) => (
          <>
            <IconButton
              {...props}
              color={isFavourite ? "#FFC200" : "#D6D6D6"}
              icon="heart"
              onPress={() => setFavourite(!isFavourite)}
            />
            <IconButton
              {...props}
              icon="plus"
              onPress={() => console.log("plus")}
            />
          </>
        )}
      />
      <Collapsible collapsed={!collapsed}>
        {article?.children?.map(
          (subArticle: { id: string; title: string }, index) => (
            <SidebarArticle
              hierarchy={hierarchy + 2}
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
