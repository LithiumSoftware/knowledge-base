import React, { useState, useEffect } from "react";
import { List, Divider, IconButton } from "react-native-paper";
import Collapsible from "react-native-collapsible";

import styled from "styled-components/native";
import { Heart, Plus, ChevronDown, ChevronRight, File } from "../assets/icons";

import {
  useArticleQuery,
  useToggleFavouriteMutation,
  useCreateArticleMutation,
  Article,
} from "../local_core/generated/graphql";

interface Props {
  hierarchy: number;
  id: string;
  reload?: any;
  mainRefetch: any;
  rootPath?: string[];
  selected: string | null;
  navigation: any;
}

const SidebarArticle = ({
  hierarchy,
  id,
  reload,
  mainRefetch,
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

  const [toggleFavouriteMutation] = useToggleFavouriteMutation();
  const [createArticle] = useCreateArticleMutation();

  useEffect(() => {
    !!rootPath && !collapsed && setCollapsed(true);
  }, [rootPath]);

  useEffect(() => {
    reload && refetch();
  }, [reload]);

  const toggleFavouriteAction = () =>
    toggleFavouriteMutation({
      variables: {
        articleId: article.id,
      },
    })
      .then(({ data: { toggleFavourite } }) => {
        setFavourite(toggleFavourite);
      })
      .catch((err) => console.log(`Error togglefavourite: ${err}`));

  const addSubArticle = () =>
    createArticle({
      variables: {
        parentId: article.id,
      },
    })
      .then(
        ({
          data: {
            createArticle: { id },
          },
        }) => {
          mainRefetch();
          navigation.navigate("article", { id: id });
        }
      )
      .catch((err) => {
        console.log(`Error create subArticle: ${err}`);
      });

  console.log(mainRefetch);

  const article = data?.article;
  const titleId = `${article?.title}-${article?.id}`;
  isFavourite === null && article && setFavourite(article?.favourited);

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
              onPress={() => toggleFavouriteAction()}
            />
            <NoMarginIcon
              {...props}
              icon={() => <Plus />}
              onPress={() => addSubArticle()}
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
              mainRefetch={mainRefetch}
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
