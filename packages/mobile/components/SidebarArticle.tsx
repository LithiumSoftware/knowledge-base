import React, { useEffect } from "react";
import {
  useArticleQuery,
  ToggleFavouriteMutation,
} from "@workspace-library/core";

interface Props {
  addSubArticle?: Function;
  hierarchy: number;
  id: number;
  mainRefetch?: Function;
  reload?: any;
  rootPath?: string[];
  selected?: boolean;
  hardCodedArticle: Object;
  hardCodedChildren: Object;
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
}: Props) => {
  const [open, setOpen] = React.useState(!!rootPath);
  const [isFavourite, setFavourite] = React.useState("");

  /* const { loading, error, data, refetch } = useArticleQuery({
    variables: { id: id },
    fetchPolicy: "no-cache",
  }); */

  useEffect(() => {
    !!rootPath && !open && setOpen(true);
  }, [rootPath]);

  /*useEffect(() => {
    reload && refetch();
  }, [reload]);*/

  const handleOpen = (event) => {
    event.preventDefault();
    setOpen(!open);
  };

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
  const article = hardCodedArticle;
  const titleId = `${article?.title}-${article?.id}`;
  isFavourite === "" && article && setFavourite(article.favourited);

  return (
    <>
      <SideBarItem
        addSubArticle={() => addSubArticle(article?.id)}
        favourited={isFavourite}
        hierarchy={hierarchy}
        id={article?.id}
        refetch={mainRefetch}
        selected={titleId === selected}
        text={article?.title}
        toggleFavourite={toggleFavouriteAction}
        url={`/article/${titleId}`}
      >
        <StyledListItemIcon onClick={handleOpen}>
          {open ? <ShowLessIcon /> : <ShowMoreIcon />}
        </StyledListItemIcon>
        <ArticleIcon />
      </SideBarItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {article?.children.map(({ id, title }, index) => (
          <SideBarArticle
            addSubArticle={addSubArticle}
            hierarchy={hierarchy + 1}
            id={id}
            key={index}
            mainRefetch={mainRefetch}
            // rootPath && rootPath.includes(`${title}-${id}`)
            reload={reload}
            rootPath={
              rootPath && `${title}-${id}` === rootPath[hierarchy]
                ? rootPath
                : undefined
            }
            selected={selected}
          />
        ))}
      </Collapse>
    </>
  );
};

export default SidebarArticle;
