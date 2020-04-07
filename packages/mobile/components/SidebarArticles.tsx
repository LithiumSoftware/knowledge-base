import React, { useState, FunctionComponent } from "react";
import { Divider } from "react-native-paper";
import { useArticlesQuery } from "@workspace-library/core";

import SideBarArticle from "./SidebarArticle";

const hardCodedArticles = {
  0: { id: 1, title: "Raiz", parent: null },
  1: { id: 2, title: "Hijo 1", parent: { id: 1 } },
  2: { id: 3, title: "Hijo 2", parent: { id: 1 } },
  3: { id: 4, title: "Nieto 11", parent: { id: 2 } },
  4: { id: 5, title: "Nieto 21", parent: { id: 3 } },
  5: { id: 6, title: "Nieto 22", parent: { id: 3 } },
  6: { id: 7, title: "Nieot 23", parent: { id: 3 } },
  7: { id: 8, title: "Hijo 3", parent: { id: 1 } },
};

const hardCodedArticle = [
  { id: 1, title: "Raiz", parent: null, favourited: false },
  { id: 2, title: "Hijo 1", parent: { id: 1 }, favourited: false },
  { id: 3, title: "Hijo 2", parent: { id: 1 }, favourited: false },
  { id: 4, title: "Nieto 11", parent: { id: 2 }, favourited: false },
  { id: 5, title: "Nieto 21", parent: { id: 3 }, favourited: false },
  { id: 6, title: "Nieto 22", parent: { id: 3 }, favourited: false },
  { id: 7, title: "Nieot 23", parent: { id: 3 }, favourited: false },
  { id: 8, title: "Hijo 3", parent: { id: 1 }, favourited: false },
];

const hardCodedArticleChildren = [
  { 0: hardCodedArticle[1], 1: hardCodedArticle[2], 3: hardCodedArticle[7] },
  { 0: hardCodedArticle[3] },
  { 0: hardCodedArticle[4], 1: hardCodedArticle[5], 2: hardCodedArticle[6] },
  {},
  {},
  {},
  {},
  {},
];

interface Props {
  favourites?: boolean;
  rootPath: string[];
  selected?: Object;
}

const SidebarArticles = ({ favourites, rootPath, selected }: Props) => {
  /*const data = useArticlesQuery({
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });*/

  const articles = favourites
    ? hardCodedArticles
    : { 1: { id: 2, title: "Hijo 1", parent: { id: 1 } } };

  return (
    <>
      {Object.entries(articles).forEach(([key, value], index: number) => {
        const {
          id,
          title,
          parent,
        }: { id: number; title: string; parent: Object | null } = value;
        (!parent || favourites) && (
          <div key={index}>
            <SideBarArticle
              //addSubArticle={addSubArticle}
              hierarchy={1}
              id={id}
              rootPath={`${title}-${id}` === rootPath[0] ? rootPath : undefined}
              hardCodedArticle={hardCodedArticle[index]}
              hardCodedChildren={hardCodedArticleChildren[index]}
              //mainRefetch={favourites && refetch}
              //reload={reload}
              //selected={selected}
            />
            {favourites && <Divider />}
          </div>
        );
      })}
    </>
  );
};

export default SidebarArticles;
