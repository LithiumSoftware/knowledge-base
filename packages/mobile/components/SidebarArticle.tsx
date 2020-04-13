import React, { useState, useEffect } from "react";
import {
  useArticleQuery,
  ToggleFavouriteMutation,
  Article,
} from "@workspace-library/core";
import { List, Divider, IconButton } from "react-native-paper";
import Collapsible from "react-native-collapsible";

interface Props {
  addSubArticle?: Function;
  hierarchy: number;
  id: string | undefined;
  mainRefetch?: Function;
  reload?: any;
  rootPath?: string[];
  selected?: boolean;
  hardCodedArticle: Article | null;
  hardCodedChildren: (Article | null)[][];
  navigation: any;
}

const SidebarArticle = ({
  addSubArticle,
  hierarchy,
  id,
  mainRefetch,
  reload,
  rootPath,
  selected,
  hardCodedArticle,
  hardCodedChildren,
  navigation,
}: Props) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [isFavourite, setFavourite] = useState<boolean | null>(
    Number(id) % 3 === 0
  );

  /* const { loading, error, data, refetch } = useArticleQuery({
    variables: { id: id },
    fetchPolicy: "no-cache",
  }); */

  /*useEffect(() => {
    !!rootPath && !collapsed && setCollapsed(true);
  }, [rootPath]);*/

  /*useEffect(() => {
    reload && refetch();
  }, [reload]);*/

  /*
  const [toggleFavourite] = ToggleFavouriteMutation;

  const toggleFavouriteAction = () => {
    toggleFavourite({
      variables: {
        articleId: article?.id,
      },
    })
      .then(({ data: { isFavourite } }) => setFavourite(isFavourite))
      .catch((err) => {
        //TODO: Add error management
        console.log(`Error Toggle Favourite: ${err}`);
      });
  };*/

  // const article = data?.article;
  const article: Article | null = hardCodedArticle;
  article && (article.children = hardCodedChildren[Number(id) - 1]);

  const titleId = `${article?.title}-${article?.id}`;
  isFavourite === null && article && setFavourite(article.favourited);

  return (
    <>
      <List.Item
        style={{ paddingLeft: hierarchy * 4 }}
        title={article?.title}
        onPress={() => navigation.push("article", { id: article?.id })}
        left={(props) => (
          <IconButton
            {...props}
            icon={collapsed ? "chevron-down" : "chevron-right"}
            onPress={() => setCollapsed(!collapsed)}
          />
        )}
        right={(props) => (
          <>
            <IconButton
              {...props}
              color={isFavourite ? "#FFC200" : "#D6D6D6"}
              icon={"heart"}
              onPress={() => setFavourite(!isFavourite)}
            />
            <IconButton
              {...props}
              icon={"plus"}
              onPress={() => console.log("plus")}
            />
          </>
        )}
      ></List.Item>
      <Collapsible collapsed={!collapsed}>
        {article?.children?.map((subArticle: Article | null, index) => (
          <SidebarArticle
            //addSubArticle={addSubArticle}
            hierarchy={hierarchy + 2}
            id={subArticle?.id}
            key={index}
            //mainRefetch={mainRefetch}
            // rootPath && rootPath.includes(`${title}-${id}`)
            //reload={reload}
            rootPath={
              rootPath &&
              `${subArticle?.title}-${subArticle?.id}` === rootPath[hierarchy]
                ? rootPath
                : undefined
            }
            //selected={selected}
            hardCodedArticle={subArticle}
            hardCodedChildren={hardCodedChildren}
            navigation={navigation}
          />
        ))}
      </Collapsible>
    </>
  );
};

export default SidebarArticle;
